# Daniel Vágner — daniel-vagner.dev

Website for winning freelance projects: web apps, mobile apps and architecture.

**Live:** [daniel-vagner.dev](https://daniel-vagner.dev)

## Tech stack

- **Angular 22**: standalone components, signals, zoneless change detection, Signal Forms
- **SCSS**: design tokens in `src/styles.scss`, breakpoint mixins in `src/styles/_mixins.scss`
- **CZ / EN**: `LanguageService` (signal) with all copy in `src/app/i18n/*.i18n.ts`; the choice is stored in `localStorage` and defaults to the browser language
- **Vercel**: static hosting, Web Analytics and the `api/contact.ts` serverless function that e-mails project briefs via nodemailer/Gmail

## Getting started

Requires Node.js 24 (`^24.15`).

```bash
npm install
npm start          # http://localhost:4200
```

The contact form posts to `/api/contact`, which only exists on Vercel (or `vercel dev`).
On `ng serve` the form shows its error state with an e-mail fallback.

## Scripts

```bash
npm run build      # production build → dist/daniel-vagner-dev/browser
npm test           # unit tests (Vitest)
npm run check:api  # type-check the serverless function
```

## Structure

- `src/app/layout`: header (navigation, CZ/EN switch, mobile menu) and footer
- `src/app/sections`: hero with the VS Code demo, tech strip, services, iPhone assembly scene, case studies, process, about, contact
- `src/app/core`: language and reduced-motion services, scroll reveal directive
- `src/app/i18n`: all copy, one file per section
- `public/images`: project screenshots and profile photo (WebP)
- `api/contact.ts`: Vercel function, needs `EMAIL_USER` and `EMAIL_PASS` environment variables

## Deployment

Vercel deploys every push: `main` goes to production, other branches get preview URLs.
Build settings live in `vercel.json` (Angular framework preset, output `dist/daniel-vagner-dev/browser`, SPA fallback, `/cv` redirects to `/`).
