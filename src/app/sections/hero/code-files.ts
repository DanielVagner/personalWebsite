import type {
  BookingCopy,
  DashboardCopy,
  HeroEditorText,
  ProductCopy,
} from '../../i18n/hero-editor.i18n';

export type DemoId = 'booking' | 'dashboard' | 'product';

/** Ids of the preview elements; a code line can bring one of them in. */
export type RevealId =
  | 'bar'
  | 'days'
  | 'heading'
  | 'slots'
  | 'title'
  | 'tag'
  | 'kpis'
  | 'chart'
  | 'tableTitle'
  | 'rows'
  | 'nav'
  | 'gallery'
  | 'rating'
  | 'price'
  | 'stock'
  | 'colors'
  | 'cta';

/** Preview elements a visitor can click; each one is driven by one code line. */
export type TargetId = 'day' | 'slot' | 'book' | 'bar' | 'kpi' | 'row' | 'swatch' | 'star' | 'cart';

export interface CodeLine {
  readonly text: string;
  /** Preview element that appears together with this line. */
  readonly reveals?: RevealId;
  /** Clickable preview element this line drives (highlighted when it is clicked). */
  readonly binds?: TargetId;
}

/** An example file: a short Angular template and the screen it produces. */
export interface DemoFile {
  readonly id: DemoId;
  readonly name: string;
  readonly folder: string;
  readonly language: string;
  /** How the live preview is framed. */
  readonly frame: 'phone' | 'browser';
  readonly lines: readonly CodeLine[];
}

// Lines stay within 39 characters so the code column fits without scrolling from
// tablet width up (and on most phones).
const booking = (c: BookingCopy): CodeLine[] => [
  { text: `<h1 class="app-bar">${c.title}</h1>`, reveals: 'bar' },
  { text: '@for (d of week(); track d) {' },
  { text: '  <span [class.active]="d === day()">', reveals: 'days', binds: 'day' },
  { text: '    {{ d }}' },
  { text: '  </span>' },
  { text: '}' },
  { text: `<h2>${c.heading}</h2>`, reveals: 'heading' },
  { text: '@for (s of slots(); track s.id) {' },
  { text: '  <slot-card [slot]="s"' },
  { text: '    [active]="s === time()" />', reveals: 'slots', binds: 'slot' },
  { text: '}' },
  { text: '<button (click)="book()">', binds: 'book' },
  { text: `  ${c.cta}`, reveals: 'cta' },
  { text: '</button>' },
];

const dashboard = (c: DashboardCopy): CodeLine[] => [
  { text: `<h1>${c.title}</h1>`, reveals: 'title' },
  { text: `<span class="tag">${c.tag}</span>`, reveals: 'tag' },
  { text: '<section class="kpis">' },
  { text: '  @for (kpi of kpis(); track kpi.id) {' },
  { text: '    <kpi-card [kpi]="kpi" />', reveals: 'kpis', binds: 'kpi' },
  { text: '  }' },
  { text: '</section>' },
  { text: `<bar-chart title="${c.chartTitle}"` },
  { text: '           [data]="sales()" />', reveals: 'chart', binds: 'bar' },
  { text: `<h2>${c.tableTitle}</h2>`, reveals: 'tableTitle' },
  { text: '@for (o of orders(); track o.id) {' },
  { text: '  <order-row [order]="o" />', reveals: 'rows', binds: 'row' },
  { text: '}' },
];

const product = (c: ProductCopy): CodeLine[] => [
  { text: `<nav class="shop-bar">${c.shop}</nav>`, reveals: 'nav' },
  { text: '<product-gallery [photos]="photos()" />', reveals: 'gallery' },
  { text: '<h1>{{ product().name }}</h1>', reveals: 'title' },
  { text: '<star-rating [(value)]="rating" />', reveals: 'rating', binds: 'star' },
  { text: '<p class="price">' },
  { text: '  {{ product().price | currency }}', reveals: 'price' },
  { text: '</p>' },
  { text: '@if (product().inStock) {' },
  { text: `  <span class="stock">${c.stock}</span>`, reveals: 'stock' },
  { text: '}' },
  { text: '@for (c of colors; track c) {' },
  { text: '  <swatch [color]="c" />', reveals: 'colors', binds: 'swatch' },
  { text: '}' },
  { text: '<button (click)="addToCart()">', binds: 'cart' },
  { text: `  ${c.cta}`, reveals: 'cta' },
  { text: '</button>' },
];

/** Builds the three example files; code stays English, the visible texts follow the site language. */
export function buildDemoFiles(t: HeroEditorText): DemoFile[] {
  return [
    {
      id: 'booking',
      name: 'booking.html',
      folder: 'mobile-app',
      language: 'HTML',
      frame: 'phone',
      lines: booking(t.booking),
    },
    {
      id: 'dashboard',
      name: 'dashboard.html',
      folder: 'web-app',
      language: 'HTML',
      frame: 'browser',
      lines: dashboard(t.dashboard),
    },
    {
      id: 'product',
      name: 'product.html',
      folder: 'e-shop',
      language: 'HTML',
      frame: 'browser',
      lines: product(t.product),
    },
  ];
}
