import { Lang, Translated } from '../core/language.service';

/** Section ids the header nav (and its scroll-spy) points at, in page order. */
export type NavSectionId = 'services' | 'projects' | 'process' | 'about' | 'contact';

export interface NavItem {
  id: NavSectionId;
  label: string;
  /** One line in the mobile menu saying what the section holds. */
  desc: string;
}

export interface LangOption {
  code: Lang;
  /** Short visible code, e.g. "CZ". */
  short: string;
  /** Full language name for assistive tech. */
  name: string;
}

export interface NavText {
  brandName: string;
  brandTld: string;
  homeLabel: string;
  navLabel: string;
  mobileNavLabel: string;
  /** Tag on the mobile menu item of the section currently in view. */
  menuHere: string;
  items: NavItem[];
  cta: string;
  langGroup: string;
  langs: LangOption[];
  menuOpen: string;
  menuClose: string;
}

const LANGS_CS: LangOption[] = [
  { code: 'cs', short: 'CZ', name: 'čeština' },
  { code: 'en', short: 'EN', name: 'angličtina' },
];

const LANGS_EN: LangOption[] = [
  { code: 'cs', short: 'CZ', name: 'Czech' },
  { code: 'en', short: 'EN', name: 'English' },
];

export const NAV_TEXT: Translated<NavText> = {
  cs: {
    brandName: 'daniel-vagner',
    brandTld: '.dev',
    homeLabel: 'daniel-vagner.dev – úvod',
    navLabel: 'Hlavní navigace',
    mobileNavLabel: 'Menu',
    menuHere: 'Jste tady',
    items: [
      { id: 'services', label: 'Služby', desc: 'Webové a mobilní aplikace, architektura' },
      { id: 'projects', label: 'Projekty', desc: 'Aplikace pro mobil, web i desktop' },
      { id: 'process', label: 'Spolupráce', desc: 'Jak to probíhá od prvního hovoru po spuštění' },
      { id: 'about', label: 'O mně', desc: 'Přes 11 let praxe, na volné noze od roku 2015' },
      { id: 'contact', label: 'Kontakt', desc: 'Popište projekt, ozvu se do jednoho až dvou dnů' },
    ],
    cta: 'Probrat projekt',
    langGroup: 'Jazyk',
    langs: LANGS_CS,
    menuOpen: 'Otevřít menu',
    menuClose: 'Zavřít menu',
  },
  en: {
    brandName: 'daniel-vagner',
    brandTld: '.dev',
    homeLabel: 'daniel-vagner.dev – home',
    navLabel: 'Main navigation',
    mobileNavLabel: 'Menu',
    menuHere: 'You are here',
    items: [
      { id: 'services', label: 'Services', desc: 'Web and mobile apps, architecture' },
      { id: 'projects', label: 'Work', desc: 'Apps for mobile, web and desktop' },
      { id: 'process', label: 'Process', desc: 'How it goes from the first call to launch' },
      { id: 'about', label: 'About', desc: '11+ years of experience, freelancing since 2015' },
      { id: 'contact', label: 'Contact', desc: 'Send a brief – I reply within a day or two' },
    ],
    cta: 'Discuss a project',
    langGroup: 'Language',
    langs: LANGS_EN,
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
  },
};
