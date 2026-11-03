import { Translated } from '../core/language.service';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterText {
  owner: string;
  city: string;
  linksLabel: string;
  links: FooterLink[];
}

const EMAIL_HREF = 'mailto:danielvagner05@gmail.com';

const PROFILE_LINKS: FooterLink[] = [
  { label: 'GitHub', href: 'https://github.com/danielvagner' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/danielvagner/' },
  { label: 'Stack Overflow', href: 'https://stackoverflow.com/users/8366174/daniel-v%c3%a1gner' },
];

export const FOOTER_TEXT: Translated<FooterText> = {
  cs: {
    owner: 'Daniel Vágner',
    city: 'Praha',
    linksLabel: 'Profily a kontakt',
    links: [...PROFILE_LINKS, { label: 'E-mail', href: EMAIL_HREF }],
  },
  en: {
    owner: 'Daniel Vágner',
    city: 'Prague',
    linksLabel: 'Profiles and contact',
    links: [...PROFILE_LINKS, { label: 'Email', href: EMAIL_HREF }],
  },
};
