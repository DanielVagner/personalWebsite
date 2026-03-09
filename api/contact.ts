import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

type ContactRequestBody = {
  name?: string;
  email?: string;
  message?: string;
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed.' });
    return;
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    CONTACT_TO_EMAIL,
  } = process.env;

  if (
    !SMTP_HOST ||
    !SMTP_PORT ||
    !SMTP_USER ||
    !SMTP_PASS ||
    !SMTP_FROM ||
    !CONTACT_TO_EMAIL
  ) {
    res.status(500).json({
      message: 'SMTP environment variables are missing.',
    });
    return;
  }

  const { name, email, message } = req.body as ContactRequestBody;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({
      message: 'Name, email and message are required.',
    });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    res.status(400).json({
      message: 'Invalid email address.',
    });
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE === 'true',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Personal Website" <${SMTP_FROM}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `.trim(),
      html: `
        <h2>New message from personal website</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    res.status(200).json({
      message: 'Message sent successfully.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Failed to send message.',
    });
  }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}