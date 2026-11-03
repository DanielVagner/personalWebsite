import { Translated } from '../core/language.service';

export interface AssemblyStep {
  /** Short step name used in the step list and progress labels. */
  name: string;
  /** Light-blue line under the heading. */
  title: string;
  text: string;
}

/** Copy shown inside the phone mockup (decorative app "move"). */
export interface AssemblyMockText {
  time: string;
  signal: string;
  brand: string;
  avatar: string;
  date: string;
  title: string;
  subtitle: string;
  goalLabel: string;
  more: string;
  ringValue: string;
  ringSub: string;
  goalProgress: string;
  statSteps: string;
  statStepsLabel: string;
  statMinutes: string;
  statMinutesUnit: string;
  statMinutesLabel: string;
  cta: string;
  ctaIcon: string;
  tabs: [string, string, string, string];
}

export interface AssemblyText {
  sectionLabel: string;
  eyebrow: string;
  heading: string;
  stepsLabel: string;
  steps: AssemblyStep[];
  phoneLabel: string;
  mock: AssemblyMockText;
}

export const ASSEMBLY_TEXT: Translated<AssemblyText> = {
  cs: {
    sectionLabel: 'Jak vzniká obrazovka aplikace',
    eyebrow: 'Krok za krokem',
    heading: 'Na detailech záleží.',
    stepsLabel: 'Postup od záměru po spuštění',
    steps: [
      {
        name: 'Záměr',
        title: 'Na začátku je záměr.',
        text: 'Každá obrazovka má mít jeden jasný úkol – tahle má na první pohled ukázat dnešní aktivitu. Než cokoli nakreslím, ujasníme si, co má uživatel zjistit a co udělat.',
      },
      {
        name: 'Struktura',
        title: 'Snadná orientace.',
        text: 'Datum a krátký nadpis prozradí, o čem obrazovka je. Co k sobě patří, stojí pohromadě, takže uživatel hned ví, kde je.',
      },
      {
        name: 'Obsah',
        title: 'To hlavní uprostřed.',
        text: 'Kruh ukazuje, kolik procent cíle už máte splněno, a přesná čísla ho doplňují, aby nikdo nemusel hádat. Barva pomáhá, ale to podstatné řekne text.',
      },
      {
        name: 'Data',
        title: 'Skutečná data, skutečné stavy.',
        text: 'Čísla se načítají ze serveru a aplikace přepočítá jen to, co se změnilo. Předem myslím i na to, jak bude obrazovka vypadat při načítání, bez dat nebo když něco selže.',
      },
      {
        name: 'Ovládání',
        title: 'Všechno na dosah.',
        text: 'Aktivitu zaznamenáte jedním klepnutím. Hlavní sekce jsou ve spodní liště, kam palec snadno dosáhne.',
      },
      {
        name: 'Spuštění',
        title: 'Připraveno na každý den.',
        text: 'Design, obsah i chování teď do sebe zapadají. Aplikace je plynulá, spolehlivá a snadno ji ovládne každý. Teprve takhle může jít mezi lidi.',
      },
    ],
    phoneLabel:
      'Ukázková obrazovka mobilní aplikace pro sledování denní aktivity. Skládá se vrstvu po vrstvě: nadpis, kruh ukazující plnění denního cíle, statistiky, tlačítko pro záznam aktivity a spodní navigace.',
    mock: {
      time: '9:41',
      signal: '●●● ▰',
      brand: 'move',
      avatar: 'D',
      date: 'Středa · 30. září',
      title: 'Dnešní aktivita',
      subtitle: 'Váš pohyb na první pohled.',
      goalLabel: 'Denní cíl kroků',
      more: '•••',
      ringValue: '84 %',
      ringSub: 'z cíle',
      goalProgress: '8 420 z 10 000 kroků',
      statSteps: '8 420',
      statStepsLabel: 'kroků dnes',
      statMinutes: '42',
      statMinutesUnit: 'min',
      statMinutesLabel: 'v pohybu',
      cta: 'Zaznamenat aktivitu',
      ctaIcon: '+',
      tabs: ['Přehled', 'Aktivita', 'Pokrok', 'Profil'],
    },
  },
  en: {
    sectionLabel: 'How an app screen comes together',
    eyebrow: 'Step by step',
    heading: 'Built detail by detail.',
    stepsLabel: 'Steps from intent to launch',
    steps: [
      {
        name: 'Intent',
        title: 'It starts with intent.',
        text: 'Every screen should do one clear job – here, show today’s activity at a glance. Before I draw anything, we pin down what the user needs to know and do.',
      },
      {
        name: 'Structure',
        title: 'Clear orientation.',
        text: 'A date and a short heading give the screen context. Things that belong together sit together, so people know where they are instantly.',
      },
      {
        name: 'Content',
        title: 'What matters, front and center.',
        text: 'The ring shows how close you are to the goal, and exact numbers back it up, so nobody has to guess. Color helps; the text carries the meaning.',
      },
      {
        name: 'Data',
        title: 'Real data, real states.',
        text: 'Numbers come from the API, and only what has changed gets recomputed. Loading, empty and error states are designed up front, not left to chance.',
      },
      {
        name: 'Controls',
        title: 'Everything within reach.',
        text: 'Logging an activity takes a single tap. The bottom navigation keeps the main sections right under your thumb.',
      },
      {
        name: 'Launch',
        title: 'Ready for every day.',
        text: 'Design, content and behavior now work as one – accessible, smooth and reliable. That’s when an app is ready for real people.',
      },
    ],
    phoneLabel:
      'Sample screen of a daily activity app, assembled layer by layer: header, a ring showing progress toward the daily goal, stats, a button to log an activity and the bottom navigation bar.',
    mock: {
      time: '9:41',
      signal: '●●● ▰',
      brand: 'move',
      avatar: 'D',
      date: 'Wednesday · Sep 30',
      title: 'Today’s activity',
      subtitle: 'Your movement at a glance.',
      goalLabel: 'Daily step goal',
      more: '•••',
      ringValue: '84%',
      ringSub: 'of goal',
      goalProgress: '8,420 of 10,000 steps',
      statSteps: '8,420',
      statStepsLabel: 'steps today',
      statMinutes: '42',
      statMinutesUnit: 'min',
      statMinutesLabel: 'active',
      cta: 'Log activity',
      ctaIcon: '+',
      tabs: ['Overview', 'Activity', 'Progress', 'Profile'],
    },
  },
};
