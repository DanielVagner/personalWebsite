# Daniel Vágner — Personal Website

Personal portfolio website built with React, TypeScript, and Tailwind CSS.

**Live:** [daniel-vagner.dev](https://daniel-vagner.dev)

## About

A single-page portfolio showcasing my experience as a Senior Software Engineer — projects, skills, work history, and a printable CV. Built with performance and clean UI in mind.

## Features

- Dark mode by default
- Smooth scroll animations (Framer Motion)
- Active section highlighting in navigation
- Printable / PDF-exportable CV page
- Contact form with email delivery
- Vercel Analytics
- Fully responsive (mobile + desktop)
- SEO optimised (Open Graph, JSON-LD, sitemap)

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool and dev server
- **Tailwind CSS v4** — styling
- **Framer Motion** (`motion/react`) — animations
- **react-i18next** — internationalisation
- **shadcn/ui** + **Radix UI** — UI components
- **Lucide React** — icons
- **Vercel** — hosting and analytics

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`. Preview the production build locally:

```bash
npm run preview
```

## Deployment

Deployed on [Vercel](https://vercel.com). Every push to `main` triggers an automatic deployment.
