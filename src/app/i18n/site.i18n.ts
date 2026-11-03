import { Translated } from '../core/language.service';

export interface SiteText {
  title: string;
  description: string;
  skipLink: string;
}

export const SITE_TEXT: Translated<SiteText> = {
  cs: {
    title: 'Daniel Vágner – webové a mobilní aplikace na zakázku',
    description:
      'Webové a mobilní aplikace v Angularu, Reactu, Ionicu a React Native od vývojáře na volné noze. Navrhnu a vyvinu vaši aplikaci od nápadu po spuštění. V Praze i na dálku.',
    skipLink: 'Přeskočit na obsah',
  },
  en: {
    title: 'Daniel Vágner – custom web & mobile apps',
    description:
      'Freelance web and mobile app developer working with Angular, React, Ionic and React Native. Design, architecture and development from idea to launch. Based in Prague, working remotely.',
    skipLink: 'Skip to content',
  },
};
