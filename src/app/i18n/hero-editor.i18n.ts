import { Translated } from '../core/language.service';

/** Side bar views that can be opened from the activity bar. */
export type ActivityId = 'explorer' | 'run';

/** Copy shared by every example file. */
export interface DemoCopy {
  /** Short name shown in the preview header ("Preview – …"). */
  readonly tab: string;
  /** Accessible description of the finished preview. */
  readonly label: string;
  /** Plain-language terminal output once the code has been typed. */
  readonly done: readonly [string, string];
}

/** Mobile booking app shown in a phone frame. */
export interface BookingCopy extends DemoCopy {
  readonly clock: string;
  readonly title: string;
  readonly days: readonly { readonly name: string; readonly date: string }[];
  readonly heading: string;
  readonly slots: readonly {
    readonly time: string;
    readonly service: string;
    readonly length: string;
  }[];
  readonly cta: string;
}

/** Web app dashboard shown in a mini browser. All figures are sample data. */
export interface DashboardCopy extends DemoCopy {
  readonly url: string;
  readonly title: string;
  readonly tag: string;
  readonly kpis: readonly { readonly label: string; readonly value: string }[];
  readonly chartTitle: string;
  readonly chartDays: readonly string[];
  readonly tableTitle: string;
  readonly orders: readonly {
    readonly id: string;
    readonly total: string;
    readonly status: string;
    readonly tone: 'paid' | 'shipped';
  }[];
}

/** E-shop product page shown in a mini browser. */
export interface ProductCopy extends DemoCopy {
  readonly url: string;
  readonly shop: string;
  readonly name: string;
  readonly rating: string;
  readonly price: string;
  readonly stock: string;
  readonly color: string;
  readonly cta: string;
}

export interface HeroEditorText {
  /** Accessible name of the whole editor mock-up. */
  readonly label: string;
  readonly menu: readonly string[];
  readonly commandCenter: string;
  readonly activities: Record<ActivityId, { readonly label: string; readonly title: string }>;
  readonly project: string;
  readonly filesLabel: string;
  readonly outline: string;
  readonly timeline: string;
  readonly openFiles: string;
  readonly run: { readonly button: string; readonly hint: string };
  /** Header of the preview pane, e.g. "Preview – Bookings". */
  readonly preview: (tab: string) => string;
  readonly reload: string;
  readonly panels: readonly string[];
  readonly activePanel: string;
  readonly terminalLabel: string;
  readonly term: { readonly user: string; readonly cwd: string; readonly command: string };
  readonly status: {
    readonly branch: string;
    readonly problems: string;
    readonly cursor: (line: number, col: number) => string;
    readonly spaces: string;
    readonly encoding: string;
  };
  readonly booking: BookingCopy;
  readonly dashboard: DashboardCopy;
  readonly product: ProductCopy;
}

const NB = ' ';

export const HERO_EDITOR_TEXT: Translated<HeroEditorText> = {
  cs: {
    label: `Ukázka vývoje aplikace: kód a${NB}živý náhled výsledku`,
    menu: ['Soubor', 'Úpravy', 'Výběr', 'Zobrazit', 'Přejít', 'Spustit', 'Terminál', 'Nápověda'],
    commandCenter: 'daniel-vagner.dev',
    activities: {
      explorer: { label: 'Průzkumník', title: 'Průzkumník' },
      run: { label: 'Spustit ukázku', title: 'Spustit' },
    },
    project: 'UKÁZKY',
    filesLabel: 'Soubory ukázek',
    outline: 'OSNOVA',
    timeline: 'ČASOVÁ OSA',
    openFiles: 'Otevřené soubory',
    run: {
      button: 'Přehrát ukázku znovu',
      hint: `Kód se napíše znovu a${NB}náhled se poskládá od začátku.`,
    },
    preview: (tab) => `Náhled – ${tab}`,
    reload: 'Načíst náhled znovu',
    panels: ['PROBLÉMY', 'VÝSTUP', 'KONZOLA LADĚNÍ', 'TERMINÁL', 'PORTY'],
    activePanel: 'TERMINÁL',
    terminalLabel: 'Terminál',
    term: { user: 'daniel@dev', cwd: '~/ukazky', command: 'ng build' },
    status: {
      branch: 'main',
      problems: `0${NB}chyb, 0${NB}varování`,
      cursor: (l, c) => `Ř${NB}${l}, sl.${NB}${c}`,
      spaces: 'Mezery: 2',
      encoding: 'UTF-8',
    },
    booking: {
      tab: 'Rezervace',
      label: `Náhled mobilní aplikace pro rezervace: výběr dne, volné termíny a${NB}tlačítko Rezervovat`,
      done: [
        `Rezervační aplikace je připravená k${NB}testování`,
        `Hotovo – běží na iOS, Androidu i${NB}webu`,
      ],
      clock: '9:41',
      title: 'Rezervace',
      days: [
        { name: 'Po', date: '14' },
        { name: 'Út', date: '15' },
        { name: 'St', date: '16' },
        { name: 'Čt', date: '17' },
        { name: 'Pá', date: '18' },
      ],
      heading: 'Volné termíny',
      slots: [
        { time: '9:00', service: 'Střih', length: `45${NB}min` },
        { time: '10:30', service: 'Střih a barva', length: `90${NB}min` },
        { time: '14:15', service: 'Konzultace', length: `20${NB}min` },
      ],
      cta: 'Rezervovat',
    },
    dashboard: {
      tab: 'Objednávky',
      label: `Náhled webové aplikace: přehled objednávek se třemi ukazateli, grafem týdenních tržeb a${NB}posledními objednávkami (ukázková data)`,
      done: [
        `Přehled objednávek je připravený k${NB}testování`,
        `Hotovo – funguje v${NB}prohlížeči na počítači i${NB}tabletu`,
      ],
      url: 'admin.vase-firma.cz',
      title: 'Přehled objednávek',
      tag: 'Ukázková data',
      kpis: [
        { label: 'Objednávky', value: '128' },
        { label: 'Tržby', value: `84${NB}200${NB}Kč` },
        { label: 'Průměr', value: `658${NB}Kč` },
      ],
      chartTitle: 'Tržby za týden',
      chartDays: ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'],
      tableTitle: 'Poslední objednávky',
      orders: [
        { id: '#1042', total: `1${NB}290${NB}Kč`, status: 'Zaplaceno', tone: 'paid' },
        { id: '#1041', total: `860${NB}Kč`, status: 'Odesláno', tone: 'shipped' },
      ],
    },
    product: {
      tab: 'Produkt',
      label: `Náhled produktové stránky e-shopu: fotka hrnku, název, hodnocení, cena, výběr barvy a${NB}tlačítko Přidat do košíku`,
      done: [
        `Produktová stránka je připravená k${NB}testování`,
        `Hotovo – e-shop funguje na mobilu i${NB}počítači`,
      ],
      url: 'vas-eshop.cz/hrnek',
      shop: 'Váš e-shop',
      name: 'Keramický hrnek',
      rating: `4,9 · 126${NB}hodnocení`,
      price: `490${NB}Kč`,
      stock: 'Skladem',
      color: 'Barva: písková',
      cta: 'Přidat do košíku',
    },
  },
  en: {
    label: 'App development demo: code and a live preview of the result',
    menu: ['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'],
    commandCenter: 'daniel-vagner.dev',
    activities: {
      explorer: { label: 'Explorer', title: 'Explorer' },
      run: { label: 'Run the demo', title: 'Run' },
    },
    project: 'EXAMPLES',
    filesLabel: 'Example files',
    outline: 'OUTLINE',
    timeline: 'TIMELINE',
    openFiles: 'Open files',
    run: {
      button: 'Replay the demo',
      hint: 'The code is typed again and the preview rebuilds from the start.',
    },
    preview: (tab) => `Preview – ${tab}`,
    reload: 'Reload preview',
    panels: ['PROBLEMS', 'OUTPUT', 'DEBUG CONSOLE', 'TERMINAL', 'PORTS'],
    activePanel: 'TERMINAL',
    terminalLabel: 'Terminal',
    term: { user: 'daniel@dev', cwd: '~/examples', command: 'ng build' },
    status: {
      branch: 'main',
      problems: '0 errors, 0 warnings',
      cursor: (l, c) => `Ln ${l}, Col ${c}`,
      spaces: 'Spaces: 2',
      encoding: 'UTF-8',
    },
    booking: {
      tab: 'Bookings',
      label: 'Preview of a mobile booking app: day picker, available times and a Book now button',
      done: ['Booking app ready for testing', 'Done – runs on iOS, Android and the web'],
      clock: '9:41',
      title: 'Bookings',
      days: [
        { name: 'Mon', date: '14' },
        { name: 'Tue', date: '15' },
        { name: 'Wed', date: '16' },
        { name: 'Thu', date: '17' },
        { name: 'Fri', date: '18' },
      ],
      heading: 'Available times',
      slots: [
        { time: `9:00${NB}am`, service: 'Haircut', length: `45${NB}min` },
        { time: `10:30${NB}am`, service: 'Cut & color', length: `90${NB}min` },
        { time: `2:15${NB}pm`, service: 'Consultation', length: `20${NB}min` },
      ],
      cta: 'Book now',
    },
    dashboard: {
      tab: 'Orders',
      label:
        'Preview of a web app: an orders dashboard with three key figures, a weekly revenue chart and the latest orders (sample data)',
      done: ['Orders dashboard ready for testing', 'Done – works in the browser on desktop and tablet'],
      url: 'admin.your-company.com',
      title: 'Orders overview',
      tag: 'Sample data',
      kpis: [
        { label: 'Orders', value: '128' },
        { label: 'Revenue', value: '€3,420' },
        { label: 'Average', value: '€26.72' },
      ],
      chartTitle: 'Weekly revenue',
      chartDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      tableTitle: 'Latest orders',
      orders: [
        { id: '#1042', total: '€52.00', status: 'Paid', tone: 'paid' },
        { id: '#1041', total: '€34.50', status: 'Shipped', tone: 'shipped' },
      ],
    },
    product: {
      tab: 'Product',
      label:
        'Preview of an online store product page: photo, name, rating, price, color options and an Add to cart button',
      done: ['Product page ready for testing', 'Done – the store works on mobile and desktop'],
      url: 'your-shop.com/mug',
      shop: 'Your shop',
      name: 'Ceramic mug',
      rating: '4.9 · 126 reviews',
      price: '€19.90',
      stock: 'In stock',
      color: 'Color: Sand',
      cta: 'Add to cart',
    },
  },
};
