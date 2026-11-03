import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

/** Upper bounds keep a single request from producing a huge e-mail. */
const LIMITS = {
  name: 100,
  email: 200,
  company: 150,
  option: 80,
  text: 5000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trimmed string or '' for anything that is not a string; cut to `max` characters. */
function field(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

/** Like `field`, but whitespace runs (incl. line breaks) collapse to one space. */
function line(value: unknown, max: number): string {
  return field(typeof value === 'string' ? value.replace(/\s+/g, ' ') : value, max);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Safe for a header value such as the From display name or the subject. */
function headerSafe(value: string): string {
  return value.replace(/[\r\n"<>]/g, ' ').replace(/\s+/g, ' ').trim();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const name = line(body.name, LIMITS.name);
  const email = field(body.email, LIMITS.email);
  const company = line(body.company, LIMITS.company);
  const projectType = line(body.projectType, LIMITS.option);
  const deadline = line(body.deadline, LIMITS.option);
  const language = line(body.language, LIMITS.option);
  // `message` is the older plain-text payload; `description` comes from the project brief form.
  const description = field(body.description, LIMITS.text) || field(body.message, LIMITS.text);

  if (!name || !email || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) {
    console.error('Email error: EMAIL_USER or EMAIL_PASS is not configured');
    return res.status(500).json({ error: 'Failed to send' });
  }

  const details: [string, string][] = [
    ['Jméno', name],
    ['E-mail', email],
    ['Firma', company],
    ['Typ projektu', projectType],
    ['Termín', deadline],
    ['Jazyk webu', language],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  const text = [...details.map(([label, value]) => `${label}: ${value}`), '', 'Popis projektu:', description].join(
    '\n',
  );

  const html = `
    <table cellpadding="4" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${details
        .map(
          ([label, value]) =>
            `<tr><th align="left" style="color:#555;padding-right:16px">${escapeHtml(label)}</th><td>${
              label === 'E-mail'
                ? `<a href="mailto:${escapeHtml(value)}">${escapeHtml(value)}</a>`
                : escapeHtml(value)
            }</td></tr>`,
        )
        .join('')}
    </table>
    <hr />
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(description)}</p>
  `;

  const subject = headerSafe(`Poptávka: ${projectType || 'projekt'} – ${name}`);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: { name: headerSafe(name) || 'daniel-vagner.dev', address: user },
      to: user,
      replyTo: { name: headerSafe(name), address: email },
      subject,
      text,
      html,
    });

    return res.status(200).json({ success: true });
  } catch (err: unknown) {
    // Details stay in the server log; the visitor only learns that sending failed.
    console.error('Email error:', err instanceof Error ? err.message : err);
    return res.status(500).json({ error: 'Failed to send' });
  }
}
