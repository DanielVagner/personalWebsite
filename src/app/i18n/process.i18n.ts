import { Translated } from '../core/language.service';

export interface ProcessStep {
  title: string;
  text: string;
}

export interface ProcessText {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  intro: string;
  steps: ProcessStep[];
}

export const PROCESS_TEXT: Translated<ProcessText> = {
  cs: {
    eyebrow: 'Jak spolupráce probíhá',
    titleLine1: 'Jasný postup.',
    titleLine2: 'Žádná překvapení.',
    intro:
      'Během celé spolupráce víte, v jaké fázi projekt je, co se právě dělá a co přijde dál. A jednáte přímo se mnou.',
    steps: [
      {
        title: 'Úvodní hovor',
        text: 'Probereme, čeho chcete dosáhnout, kdo bude aplikaci používat a s jakými omezeními je potřeba počítat. Upřímně vám řeknu, jestli má smysl projekt stavět a jak do toho jít – i kdyby to nebyla odpověď, kterou čekáte.',
      },
      {
        title: 'Návrh a odhad',
        text: 'Upřesníme rozsah, vybereme vhodné technologie a navrhnu architekturu v hrubých rysech. Dostanete odhad času a nákladů, a pokud to pomůže, i klikací prototyp ve Figmě, na kterém si vše vyzkoušíte ještě před začátkem vývoje.',
      },
      {
        title: 'Vývoj po etapách',
        text: 'Pracuji v krátkých cyklech a pravidelně vám ukazuji, co je hotové. Během vývoje máte přístup k funkční verzi, takže pokrok vidíte na vlastní oči, ne jen v mých zprávách.',
      },
      {
        title: 'Spuštění a podpora',
        text: 'Aplikaci uvedu do ostrého provozu a u mobilních aplikací zajistím i vydání v App Storu a na Google Play. Předám vám zdrojový kód i dokumentaci, a pokud budete chtít, budu aplikaci dál rozvíjet a udržovat.',
      },
    ],
  },
  en: {
    eyebrow: 'How we’ll work together',
    titleLine1: 'A clear process.',
    titleLine2: 'No surprises.',
    intro:
      'From the first call to launch, you always know where the project stands, what’s being built right now and what comes next. And you deal with me directly the whole way.',
    steps: [
      {
        title: 'Intro call',
        text: 'We talk through what you want to achieve, who will use the app and what constraints we need to work with. I’ll tell you honestly whether it’s worth building and how – even if the answer isn’t the one you expected.',
      },
      {
        title: 'Proposal & estimate',
        text: 'We pin down the scope and choose the right technology, and I sketch out the architecture. You get an estimate of time and cost and, if it helps, a clickable Figma prototype to try out before development starts.',
      },
      {
        title: 'Built in stages',
        text: 'I work in short iterations and regularly show you what’s done. You have access to a working version throughout development, so you can see real progress for yourself, not just read about it in status reports.',
      },
      {
        title: 'Launch & support',
        text: 'I take care of deployment and, for mobile apps, the release on the App Store and Google Play. You get the source code and documentation, and if you like, I’ll keep developing and maintaining the app.',
      },
    ],
  },
};
