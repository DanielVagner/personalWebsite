import { Translated } from '../core/language.service';

export type ServiceId = 'web' | 'mobile' | 'lead';

export interface ServiceCard {
  id: ServiceId;
  title: string;
  text: string;
  /** What the client gets – short bullet points. */
  points: string[];
  tags: string[];
}

export interface ServicesText {
  eyebrow: string;
  titleTop: string;
  titleBottom: string;
  intro: string;
  cards: ServiceCard[];
}

export const SERVICES_TEXT: Translated<ServicesText> = {
  cs: {
    eyebrow: 'Co pro vás udělám',
    titleTop: 'Web, mobil i architektura.',
    titleBottom: 'Z jedné ruky.',
    intro:
      'Vyberu technologie, které váš produkt opravdu potřebuje – ne ty, které jsou zrovna v módě. A postarám se, aby výsledek fungoval spolehlivě a dobře vypadal na každé obrazovce.',
    cards: [
      {
        id: 'web',
        title: 'Webové aplikace',
        text: 'Klientské portály, administrace a dashboardy v Angularu nebo Reactu. Rychlé, přehledné a postavené tak, aby se s nimi lidem dobře pracovalo každý den.',
        points: [
          'Architektura, která unese další rozvoj',
          'Rychlé načítání a plynulé ovládání',
          'Čitelný kód, na který naváže i další vývojář',
        ],
        tags: ['Angular', 'React', 'TypeScript', 'Micro Frontends'],
      },
      {
        id: 'mobile',
        title: 'Mobilní aplikace',
        text: 'Aplikace pro iOS i Android v Ionicu s Capacitorem nebo v React Native. O celý projekt se postarám od prvního commitu až po vydání v App Storu a na Google Play.',
        points: [
          'Jeden společný kód pro iOS i Android',
          'Nativní integrace: HealthKit, Garmin, poloha, platby',
          'Offline režim tam, kde na signál není spolehnutí',
        ],
        tags: ['Ionic', 'React Native', 'Capacitor', 'HealthKit'],
      },
      {
        id: 'lead',
        title: 'Architektura a vedení vývoje',
        text: 'Technická rozhodnutí, díky kterým zůstane kód přehledný a udržitelný, i když produkt i tým porostou. Opírám se o zkušenosti z role softwarového architekta a z vedení menších týmů.',
        points: [
          'Audit stávajícího kódu a code review s konkrétními doporučeními',
          'Technické vedení a mentoring vývojářů',
          'Backend a API v .NETu, provoz v Azure',
        ],
        tags: ['.NET', 'Azure', 'Code review', 'Tech lead'],
      },
    ],
  },
  en: {
    eyebrow: 'What I can do for you',
    titleTop: 'Web, mobile and architecture.',
    titleBottom: 'Under one roof.',
    intro:
      'I pick the technology your product actually needs, not whatever happens to be trending. And I make sure the result is reliable and looks great on every screen.',
    cards: [
      {
        id: 'web',
        title: 'Web apps',
        text: 'Client portals, admin systems and dashboards in Angular or React. Fast, clear and built so people genuinely enjoy using them every day.',
        points: [
          'Architecture that leaves room to grow',
          'Fast loading and smooth interactions',
          'Readable code the next developer can pick up',
        ],
        tags: ['Angular', 'React', 'TypeScript', 'Micro Frontends'],
      },
      {
        id: 'mobile',
        title: 'Mobile apps',
        text: 'iOS and Android apps built with Ionic and Capacitor or React Native. I take care of the whole project, from the first commit to release on the App Store and Google Play.',
        points: [
          'One shared codebase for iOS and Android',
          'Native integrations: HealthKit, Garmin, location, payments',
          'Offline mode where the signal can’t be trusted',
        ],
        tags: ['Ionic', 'React Native', 'Capacitor', 'HealthKit'],
      },
      {
        id: 'lead',
        title: 'Architecture & tech leadership',
        text: 'Technical decisions that keep your codebase clear and maintainable as the product and team grow – backed by my experience as a software architect and team lead.',
        points: [
          'Code audits and code reviews with concrete recommendations',
          'Technical leadership and developer mentoring',
          'Back end and APIs in .NET, hosted on Azure',
        ],
        tags: ['.NET', 'Azure', 'Code review', 'Tech lead'],
      },
    ],
  },
};
