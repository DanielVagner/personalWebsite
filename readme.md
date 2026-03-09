# Portfolio Website

Personal portfolio website built with Vite, React, Tailwind CSS, and deployed on Vercel.

## Features

- Responsive portfolio website
- Dark / light theme toggle
- Smooth scrolling navigation
- Projects, experience, skills, and contact sections
- Contact form handled through Vercel serverless function with Nodemailer

## Tech Stack

- React
- Vite
- Tailwind CSS
- Motion
- Radix UI
- MUI
- Nodemailer
- Vercel

## Development

Install dependencies:

```bash
npm install
```

Run local development server:

```bash
npm run dev
```

Run Vercel locally:

```bash
npm run vercel:dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Environment Variables

Create a `.env.local` file for local development.

Example:

```env
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
```

Do not commit `.env.local` to git.

## Deployment

The project is deployed on Vercel.

After the initial setup, deployment is automatic on every push to the connected Git repository.

## Notes


- Frontend is built with Vite
- Backend email handling is in `api/contact.ts`
- Production environment variables should be configured in Vercel project settings
