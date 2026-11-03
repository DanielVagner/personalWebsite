import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { HeroEditorText } from '../../../i18n/hero-editor.i18n';
import { DemoFile, RevealId, TargetId } from '../code-files';
import { PreviewState, STAR_COUNT, SWATCHES } from './preview-state';

/** Weekly revenue bars, in % of the chart height (sample data). */
const BARS = [46, 62, 40, 78, 70, 94, 56];
const STARS = Array.from({ length: STAR_COUNT }, (_, i) => i + 1);

/**
 * Live preview of the example file open in the hero editor. Elements appear as
 * the matching code lines are typed; once visible, days, times, bars, colours,
 * stars and the main buttons can be clicked and the editor shows which code line
 * drives them. Hidden (not yet typed) parts are inert.
 */
@Component({
  selector: 'app-editor-preview',
  templateUrl: './editor-preview.html',
  styleUrl: './editor-preview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'group',
    '[attr.aria-label]': 'label()',
    '[attr.data-frame]': 'file().frame',
  },
})
export class EditorPreview {
  readonly file = input.required<DemoFile>();
  readonly text = input.required<HeroEditorText>();
  readonly revealed = input.required<ReadonlySet<RevealId>>();
  /** A preview element was clicked (its state is already updated). */
  readonly interacted = output<TargetId>();

  protected readonly s = inject(PreviewState);
  protected readonly label = computed(() => this.text()[this.file().id].label);

  protected readonly swatches = SWATCHES;
  protected readonly stars = STARS;
  protected readonly bars = computed(() => {
    const d = this.text().dashboard;
    return d.chartDays.map((day, i) => ({
      day,
      height: BARS[i] ?? 50,
      value: d.chartValues[i] ?? '',
      // Visible text first (voice control), then the full day name for screen readers.
      label: `${day} – ${d.chartDaysFull[i] ?? day}: ${d.chartValues[i] ?? ''}`,
    }));
  });
  protected readonly mug = computed(() => SWATCHES[this.s.swatch()] ?? SWATCHES[0]);
  /** Cart badge text; a mock shop does not need three digits. */
  protected readonly cartBadge = computed(() => (this.s.cart() > 9 ? '9+' : String(this.s.cart())));

  protected on(id: RevealId): boolean {
    return this.revealed().has(id);
  }

  /** `inert` until the element has been typed, so it cannot be focused or clicked. */
  protected inert(id: RevealId): '' | null {
    return this.on(id) ? null : '';
  }

  protected act(target: TargetId, index = 0): void {
    this.s.apply(target, index);
    this.interacted.emit(target);
  }

  /**
   * Radio groups (WAI-ARIA APG): only the checked item – or the first one while
   * nothing is checked – is in the tab order.
   */
  protected tabStop(target: TargetId, index: number): number {
    const selected: Partial<Record<TargetId, number | null>> = {
      day: this.s.day(),
      slot: this.s.slot(),
      bar: this.s.bar(),
      kpi: this.s.kpi(),
      row: this.s.row(),
      swatch: this.s.swatch(),
      star: this.s.rating() === null ? null : this.s.rating()! - 1,
    };
    return index === (selected[target] ?? 0) ? 0 : -1;
  }

  /**
   * Arrow keys / Home / End move between the radios of one group (wrapping) and
   * select the focused one, so its code line lights up as the visitor arrows.
   */
  protected moveFocus(event: KeyboardEvent): void {
    const group = event.currentTarget as HTMLElement;
    const items = Array.from(group.children).filter(
      (el): el is HTMLButtonElement => el instanceof HTMLButtonElement,
    );
    const from = items.indexOf(event.target as HTMLButtonElement);
    if (from < 0) return;
    const count = items.length;
    const to =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? (from + 1) % count
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? (from - 1 + count) % count
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? count - 1
              : -1;
    if (to < 0) return;
    event.preventDefault();
    items[to]?.focus();
    items[to]?.click();
  }

  /** Mouse only: touch has no hover, and a tap already highlights the line. */
  protected hover(event: PointerEvent, target: TargetId): void {
    if (event.pointerType === 'mouse') this.s.hovered.set(target);
  }

  protected focusIn(event: FocusEvent, target: TargetId): void {
    const el = event.target as HTMLElement | null;
    if (el?.matches(':focus-visible')) this.s.hovered.set(target);
  }

  protected leave(target: TargetId): void {
    if (this.s.hovered() === target) this.s.hovered.set(null);
  }
}
