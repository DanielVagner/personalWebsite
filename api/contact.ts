import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer, { type Transporter } from 'nodemailer';

/** Upper bounds keep a single request from producing a huge e-mail. */
const LIMITS = {
  name: 100,
  email: 200,
  company: 150,
  option: 80,
  text: 5000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Browsers send an Origin header; requests from other sites are refused. */
const ALLOWED_ORIGIN = /^https:\/\/(www\.)?daniel-vagner\.dev$|^https:\/\/[a-z0-9-]+\.vercel\.app$|^http:\/\/localhost(:\d+)?$/;

/**
 * Best-effort throttle per IP. Serverless instances are short-lived, so this only slows
 * down a single client hammering one warm instance; the real limit is a Vercel Firewall
 * rate-limit rule on /api/contact.
 */
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string, now = Date.now()): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) hits.clear();
  return recent.length > RATE_MAX;
}

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

/** Safe for a header value such as the Reply-To display name or the subject. */
function headerSafe(value: string): string {
  return value.replace(/[\r\n"<>]/g, ' ').replace(/\s+/g, ' ').trim();
}

let transporter: Transporter | undefined;

function mailer(user: string, pass: string): Transporter {
  transporter ??= nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  return transporter;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // JSON only: plain HTML forms on other sites cannot post here without a CORS preflight.
  const contentType = String(req.headers?.['content-type'] ?? '');
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return res.status(415).json({ error: 'Unsupported Media Type' });
  }

  const origin = req.headers?.origin;
  if (origin && !ALLOWED_ORIGIN.test(origin)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const forwarded = String(req.headers?.['x-forwarded-for'] ?? '');
  const ip = forwarded.split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    res.setHeader('Retry-After', String(RATE_WINDOW_MS / 1000));
    return res.status(429).json({ error: 'Too many requests' });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  // Honeypot: the field is invisible to people, so anything in it comes from a bot.
  // Answer like a success so the bot has nothing to learn from.
  if (field(body.hp_field, 200)) {
    return res.status(200).json({ success: true });
  }

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

  try {
    await mailer(user, pass).sendMail({
      // Fixed sender name: the visitor cannot make a message from this account look like it came from someone else.
      from: { name: 'daniel-vagner.dev – poptávka', address: user },
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
