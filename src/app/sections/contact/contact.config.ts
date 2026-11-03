/** Vercel serverless function, accepts POST JSON `{ name, email, message }`. */
export const CONTACT_ENDPOINT = '/api/contact';

export const CONTACT_EMAIL = 'danielvagner05@gmail.com';

export const LINKEDIN_URL = 'https://www.linkedin.com/in/danielvagner/';

/** Request timeout for the form submission. */
export const CONTACT_TIMEOUT_MS = 15000;

export const DESCRIPTION_MIN_LENGTH = 20;

// Option values are language-independent keys, so a selection survives a language switch.
export const PROJECT_TYPES = ['web-app', 'mobile-app', 'website', 'consulting', 'other'] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export const DEADLINES = ['asap', 'month', 'quarter', 'later', 'flexible'] as const;
export type Deadline = (typeof DEADLINES)[number];
