import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { LanguageService } from '../../../core/language.service';
import { HERO_EDITOR_TEXT } from '../../../i18n/hero-editor.i18n';
import type { TargetId } from '../code-files';

/** Mug colours (body + rim/handle); names live in the i18n file, same order. */
export const SWATCHES = [
  { fill: '#d8c3a0', rim: '#c9ad85' },
  { fill: '#7d97ad', rim: '#68829a' },
  { fill: '#3a3b40', rim: '#2a2b2f' },
] as const;

export const STAR_COUNT = 5;

// Sample state the mock screens start from.
const START_DAY = 1;
const START_SLOT = 1;
const TOAST_MS = 2500;
const MAX_LOG = 3;

type LogData =
  | { readonly kind: 'book'; readonly day: number; readonly slot: number }
  | { readonly kind: 'cart'; readonly count: number };

type LogEntry = LogData & { readonly id: number };

/**
 * What the visitor has clicked in the live preview (selected day, colour, cart…).
 * Provided by the editor window and shared with its preview, so the code side can
 * show which line drives each element. Everything is sample data.
 */
@Injectable()
export class PreviewState {
  private readonly t = inject(LanguageService).select(HERO_EDITOR_TEXT);

  readonly day = signal(START_DAY);
  readonly slot = signal(START_SLOT);
  readonly bar = signal<number | null>(null);
  readonly kpi = signal<number | null>(null);
  readonly row = signal<number | null>(null);
  readonly swatch = signal(0);
  /** Stars picked by the visitor (1–5); null shows the shop's average. */
  readonly rating = signal<number | null>(null);
  readonly cart = signal(0);
  /** Confirmed booking shown as a toast in the phone; null when hidden. */
  readonly booked = signal<{ readonly day: number; readonly slot: number } | null>(null);
  /** Preview element under the mouse / keyboard focus (soft code-line highlight). */
  readonly hovered = signal<TargetId | null>(null);
  /** Element whose code line is under the mouse (outlined in the preview). */
  readonly inspected = signal<TargetId | null>(null);

  private readonly entries = signal<readonly LogEntry[]>([]);
  private nextId = 0;
  private toastTimer: ReturnType<typeof setTimeout> | undefined;

  readonly toast = computed(() => {
    const b = this.booked();
    return b ? this.bookingText(b.day, b.slot, this.t().booking.booked) : '';
  });

  /** Terminal lines for `book()` / `addToCart()`, re-rendered on a language switch. */
  readonly log = computed(() => {
    const t = this.t();
    return this.entries().map((e) => ({
      id: e.id,
      fn: e.kind === 'book' ? 'book()' : 'addToCart()',
      result:
        e.kind === 'book'
          ? this.bookingText(e.day, e.slot, t.interact.log.booked)
          : t.interact.log.cart(e.count),
    }));
  });

  constructor() {
    inject(DestroyRef).onDestroy(() => this.clearToast());
  }

  /** Applies a click on a preview element (`index` = which day, bar, star…). */
  apply(target: TargetId, index = 0): void {
    switch (target) {
      case 'day':
        return this.day.set(index);
      case 'slot':
        return this.slot.set(index);
      case 'bar':
        return this.bar.set(index);
      case 'kpi':
        return this.kpi.set(index);
      case 'row':
        return this.row.set(index);
      case 'swatch':
        return this.swatch.set(index);
      case 'star':
        return this.rating.set(index);
      case 'book': {
        const booking = { day: this.day(), slot: this.slot() };
        this.booked.set(booking);
        this.clearToast();
        this.toastTimer = setTimeout(() => this.booked.set(null), TOAST_MS);
        return this.addLog({ kind: 'book', ...booking });
      }
      case 'cart':
        this.cart.update((n) => n + 1);
        return this.addLog({ kind: 'cart', count: this.cart() });
    }
  }

  /** Inlay hint for the code line that drives `target`, in plain words. */
  hint(target: TargetId): string {
    const t = this.t();
    const h = t.interact.hint;
    switch (target) {
      case 'day':
        return h.selected(t.booking.days[this.day()]?.name ?? '');
      case 'slot':
        return h.selected(t.booking.slots[this.slot()]?.time ?? '');
      case 'book':
        return this.bookingText(this.day(), this.slot(), h.booked);
      case 'bar': {
        const i = this.bar() ?? 0;
        return h.bar(t.dashboard.chartDays[i] ?? '', t.dashboard.chartValues[i] ?? '');
      }
      case 'kpi':
        return h.selected(t.dashboard.kpis[this.kpi() ?? 0]?.label ?? '');
      case 'row':
        return h.selected(t.dashboard.orders[this.row() ?? 0]?.id ?? '');
      case 'swatch':
        return h.color(t.product.colors[this.swatch()] ?? '');
      case 'star':
        return h.rating(this.rating() ?? STAR_COUNT);
      case 'cart':
        return h.cart(this.cart());
    }
  }

  /** Text for the screen-reader live region, only for actions with an outcome. */
  announcement(target: TargetId): string | null {
    if (target === 'book') return this.toast();
    if (target === 'cart') return this.t().interact.addedToCart(this.cart());
    return null;
  }

  /** Back to the sample state (another file opened or the demo replayed). */
  reset(): void {
    this.clearToast();
    this.day.set(START_DAY);
    this.slot.set(START_SLOT);
    this.bar.set(null);
    this.kpi.set(null);
    this.row.set(null);
    this.swatch.set(0);
    this.rating.set(null);
    this.cart.set(0);
    this.booked.set(null);
    this.hovered.set(null);
    this.inspected.set(null);
    this.entries.set([]);
  }

  private bookingText(day: number, slot: number, fn: (day: string, time: string) => string) {
    const b = this.t().booking;
    return fn(b.days[day]?.name ?? '', b.slots[slot]?.time ?? '');
  }

  /** Keeps only the newest few lines, like a scrolling terminal. */
  private addLog(data: LogData): void {
    const entry: LogEntry = { ...data, id: this.nextId++ };
    this.entries.update((list) => [...list, entry].slice(-MAX_LOG));
  }

  private clearToast(): void {
    if (this.toastTimer !== undefined) clearTimeout(this.toastTimer);
    this.toastTimer = undefined;
  }
}
