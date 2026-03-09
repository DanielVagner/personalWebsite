import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());

type ContactRequestBody = {
  name?: string;
  email?: string;
  message?: string;
};

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.post(
  '/api/contact',
  async (
    req: Request<unknown, unknown, ContactRequestBody>,
    res: Response,
  ): Promise<void> => {
    const { name, email, message } = req.body;

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
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Personal Website" <${process.env.SMTP_FROM}>`,
        to: process.env.CONTACT_TO_EMAIL,
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
      console.error('Send mail error:', error);
      res.status(500).json({
        message: 'Failed to send message.',
      });
    }
  },
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}