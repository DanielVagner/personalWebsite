import hnv01 from '../../assets/hnv-01.webp';
import hnv02 from '../../assets/hnv-02.webp';
import hnv03 from '../../assets/hnv-03.webp';
import hnv04 from '../../assets/hnv-04.webp';
import hnv05 from '../../assets/hnv-05.webp';
import tolionImg from '../../assets/tolion.png';
import qrTicketImg from '../../assets/qr-ticket.png';
import tpodlahyImg from '../../assets/tpodlahy.png';
import mdasImg from '../../assets/mdas.png';
import findtasticImg from '../../assets/logo-findtastic.png';

export const CONTACT = {
  email: 'danielvagner05@gmail.com',
  linkedin: 'https://www.linkedin.com/in/danielvagner/',
  linkedinLabel: 'linkedin.com/in/danielvagner',
  github: 'https://github.com/danielvagner',
  githubLabel: 'github.com/danielvagner',
  site: 'daniel-vagner.dev',
} as const;

/** Companies whose products my code runs in. Order is deliberate. */
export const CLIENTS = ['Bosch', 'Medtronic', 'Foxconn', 'Tolion', 'CertiCon'] as const;

/**
 * The lead project is shown as a row of real store screenshots rather than one
 * flattened image: tops aligned, bottoms running out of the band. Sourced from
 * the App Store listing at 440px wide, which is 2x the rendered width.
 */
export const FEATURED = {
  id: 'hudba',
  shots: [hnv01, hnv02, hnv03, hnv04, hnv05],
} as const;

export const SECONDARY = [
  { id: 'tolion', image: tolionImg, contain: false },
  { id: 'qrticket', image: qrTicketImg, contain: true },
] as const;

export const INDEXED = [
  { id: 'tpodlahy', image: tpodlahyImg, contain: false },
  { id: 'mdas', image: mdasImg, contain: false },
  { id: 'findtastic', image: findtasticImg, contain: true },
] as const;

export const CAREER = [
  { id: 'htec', period: '2025 —', accent: true },
  { id: 'freelance', period: '2015 —', accent: true },
  { id: 'certicon', period: '2019–25', accent: false },
  { id: 'foxconn', period: '2018–19', accent: false },
] as const;

/**
 * The hero backdrop. A generic offline-sync routine — never a client's code —
 * `accent: true` lifts a line out of the texture so it reads as a pulse.
 */
export const BACKDROP: { text: string; accent?: boolean }[] = [
  { text: 'export async function flushOutbox() {' },
  { text: "  const pending = await db.outbox.where('sent').equals(0).toArray();" },
  { text: '  if (!pending.length) return { sent: 0 };' },
  { text: '' },
  { text: '  for (const batch of chunk(pending, 50)) {' },
  { text: "    const res = await api.post('/sync', { batch });", accent: true },
  { text: '    await db.outbox.bulkUpdate(res.accepted, { sent: 1 });' },
  { text: '  }' },
  { text: '  return { sent: pending.length };' },
  { text: '}' },
  { text: '' },
  { text: 'useEffect(() => {' },
  { text: '  const unsub = NetInfo.addEventListener(state => {' },
  { text: '    if (state.isConnected) flushOutbox();', accent: true },
  { text: '  });' },
  { text: '  return unsub;' },
  { text: '}, []);' },
  { text: '' },
];

export type Token = 'kw' | 'type' | 'str' | 'punct' | 'id';
export type Segment = [text: string, token: Token];

/**
 * The Angular component the editor types out. Deliberately a plain metric card:
 * it demonstrates signals, standalone, OnPush and inject without putting any
 * client's domain model, schema or service names on a public page.
 */
export const ANGULAR_SOURCE: Segment[][] = [
  [['@Component', 'kw'], ['({', 'punct']],
  [['  selector: ', 'id'], ["'app-metric-card'", 'str'], [',', 'punct']],
  [['  standalone: ', 'id'], ['true', 'kw'], [',', 'punct']],
  [['  changeDetection: ', 'id'], ['ChangeDetectionStrategy', 'type'], ['.OnPush,', 'punct']],
  [['  imports: [', 'id'], ['DecimalPipe, TrendArrow', 'type'], ['],', 'punct']],
  [['  template: ', 'id'], ['`', 'str']],
  [['    <article class="card">', 'str']],
  [['      <strong>{{ value() | number }}</strong>', 'str']],
  [['      <app-trend-arrow [delta]="delta()" />', 'str']],
  [['    </article>', 'str']],
  [['  `,', 'str']],
  [['})', 'punct']],
  [['export class', 'kw'], [' MetricCardComponent', 'type'], [' {', 'punct']],
  [
    ['  private readonly', 'kw'],
    [' feed = ', 'id'],
    ['inject', 'kw'],
    ['(', 'punct'],
    ['MetricFeed', 'type'],
    [');', 'punct'],
  ],
  [
    ['  readonly', 'kw'],
    [' value = ', 'id'],
    ['toSignal', 'kw'],
    ['(', 'punct'],
    ['this.feed.latest$', 'id'],
    [');', 'punct'],
  ],
  [
    ['  readonly', 'kw'],
    [' delta = ', 'id'],
    ['computed', 'kw'],
    ['(() => ', 'punct'],
    ['this.value() - this.feed.baseline()', 'id'],
    [');', 'punct'],
  ],
  [['}', 'punct']],
];

/** The second tab: the service the card injects. Same rule — nothing client-specific. */
export const METRIC_FEED_SOURCE: Segment[][] = [
  [['@Injectable', 'kw'], ['({ ', 'punct'], ['providedIn: ', 'id'], ["'root'", 'str'], [' })', 'punct']],
  [['export class', 'kw'], [' MetricFeed', 'type'], [' {', 'punct']],
  [
    ['  private readonly', 'kw'],
    [' http = ', 'id'],
    ['inject', 'kw'],
    ['(', 'punct'],
    ['HttpClient', 'type'],
    [');', 'punct'],
  ],
  [['', 'punct']],
  [
    ['  readonly', 'kw'],
    [' latest$ = ', 'id'],
    ['timer', 'kw'],
    ['(0, 15_000).', 'punct'],
    ['pipe', 'kw'],
    ['(', 'punct'],
  ],
  [
    ['    switchMap', 'kw'],
    ['(() => ', 'punct'],
    ['this.http.get', 'id'],
    ['<', 'punct'],
    ['Metric', 'type'],
    ['>(', 'punct'],
    ["'/api/metrics'", 'str'],
    [')),', 'punct'],
  ],
  [
    ['    shareReplay', 'kw'],
    ['({ bufferSize: 1, refCount: ', 'punct'],
    ['true', 'kw'],
    [' }),', 'punct'],
  ],
  [['  );', 'punct']],
  [['', 'punct']],
  [
    ['  private readonly', 'kw'],
    [' snapshot = ', 'id'],
    ['toSignal', 'kw'],
    ['(', 'punct'],
    ['this.latest$', 'id'],
    [');', 'punct'],
  ],
  [['', 'punct']],
  [['  baseline', 'kw'], ['() {', 'punct']],
  [['    return', 'kw'], [' this.snapshot()?.baseline ?? 0;', 'id']],
  [['  }', 'punct']],
  [['}', 'punct']],
];

/** …and the build that follows it, all the way to the store. */
export const BUILD_LOG: { text: string; cmd: boolean }[] = [
  { text: '$ ng build --configuration production', cmd: true },
  { text: '  ✓ Application bundle generation complete [8.412 s]', cmd: false },
  { text: '$ npx cap sync ios && eas submit --platform ios', cmd: true },
  { text: '  ✓ Uploaded to App Store Connect', cmd: false },
];

export const ANGULAR_SOURCE_COMPACT: Segment[][] = [
  [['@Component', 'kw'], ['({', 'punct']],
  [['  selector: ', 'id'], ["'app-metric-card'", 'str'], [',', 'punct']],
  [['  standalone: ', 'id'], ['true', 'kw'], [',', 'punct']],
  [['  template: ', 'id'], ['`', 'str']],
  [['    <app-trend-arrow', 'str']],
  [['      [delta]="delta()" />', 'str']],
  [['  `,', 'str']],
  [['})', 'punct']],
  [['export class', 'kw'], [' MetricCard', 'type'], [' {', 'punct']],
  [
    ['  readonly', 'kw'],
    [' delta = ', 'id'],
    ['computed', 'kw'],
    ['(fn);', 'punct'],
  ],
  [['}', 'punct']],
];

export const BUILD_LOG_COMPACT: { text: string; cmd: boolean }[] = [
  { text: '$ ng build --configuration prod', cmd: true },
  { text: '  ✓ Bundle complete [8.412 s]', cmd: false },
  { text: '$ npx cap sync && eas submit', cmd: true },
  { text: '  ✓ Uploaded to App Store', cmd: false },
];
