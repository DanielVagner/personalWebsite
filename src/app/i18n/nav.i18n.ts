import { Lang, Translated } from '../core/language.service';

/** Section ids the header nav (and its scroll-spy) points at, in page order. */
export type NavSectionId = 'services' | 'projects' | 'process' | 'about' | 'contact';

export interface NavItem {
  id: NavSectionId;
  label: string;
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
    items: [
      { id: 'services', label: 'Služby' },
      { id: 'projects', label: 'Projekty' },
      { id: 'process', label: 'Spolupráce' },
      { id: 'about', label: 'O mně' },
      { id: 'contact', label: 'Kontakt' },
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
    items: [
      { id: 'services', label: 'Services' },
      { id: 'projects', label: 'Work' },
      { id: 'process', label: 'Process' },
      { id: 'about', label: 'About' },
      { id: 'contact', label: 'Contact' },
    ],
    cta: 'Discuss a project',
    langGroup: 'Language',
    langs: LANGS_EN,
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
  },
};
