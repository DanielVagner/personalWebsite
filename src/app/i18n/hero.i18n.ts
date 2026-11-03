import { Translated } from '../core/language.service';

export interface HeroText {
  kicker: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  scroll: string;
  badgeTitle: string;
  badgeSub: string;
}

export const HERO_TEXT: Translated<HeroText> = {
  cs: {
    kicker: 'Daniel Vágner · vývojář na volné noze',
    titleLine1: 'Aplikace na míru.',
    titleLine2: 'Od nápadu po spuštění.',
    subtitle:
      'Navrhuji a vyvíjím webové aplikace v Angularu nebo Reactu a mobilní aplikace v Ionicu nebo React Native – včetně architektury, která celek drží pohromadě. Pro firmy i startupy – s více než 11 lety zkušeností.',
    ctaPrimary: 'Probrat projekt',
    ctaSecondary: 'Prohlédnout projekty',
    scroll: 'Dolů',
    badgeTitle: 'Design, který funguje.',
    badgeSub: 'Od rozhraní po kód.',
  },
  en: {
    kicker: 'Daniel Vágner · freelance developer',
    titleLine1: 'Apps built to last.',
    titleLine2: 'From idea to launch.',
    subtitle:
      'I design and build web apps in Angular or React and mobile apps in Ionic or React Native – including the architecture that holds it all together. For companies and startups, backed by more than 11 years of experience.',
    ctaPrimary: 'Discuss a project',
    ctaSecondary: 'See my work',
    scroll: 'Scroll',
    badgeTitle: 'Design that works.',
    badgeSub: 'From interface to code.',
  },
};
