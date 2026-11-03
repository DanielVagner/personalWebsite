import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HeroEditorText } from '../../../i18n/hero-editor.i18n';
import { DemoFile, RevealId } from '../code-files';

// Fixed sample state of the mock screens (no visible text here – that lives in the i18n file).
const ACTIVE_DAY = 1;
const PICKED_SLOT = 1;
/** Weekly revenue bars, in % of the chart height. */
const BARS = [46, 62, 40, 78, 70, 94, 56];
const SWATCHES = ['#d8c3a0', '#7d97ad', '#3a3b40'];
const STARS = [0, 1, 2, 3, 4];

/**
 * Live preview of the example file open in the hero editor. Purely decorative
 * (one labelled image for assistive tech, nothing focusable inside); elements
 * appear as the matching code lines are typed.
 */
@Component({
  selector: 'app-editor-preview',
  templateUrl: './editor-preview.html',
  styleUrl: './editor-preview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'img',
    '[attr.aria-label]': 'label()',
    '[attr.data-frame]': 'file().frame',
  },
})
export class EditorPreview {
  readonly file = input.required<DemoFile>();
  readonly text = input.required<HeroEditorText>();
  readonly revealed = input.required<ReadonlySet<RevealId>>();

  protected readonly label = computed(() => this.text()[this.file().id].label);

  protected readonly activeDay = ACTIVE_DAY;
  protected readonly pickedSlot = PICKED_SLOT;
  protected readonly swatches = SWATCHES;
  protected readonly stars = STARS;
  protected readonly bars = computed(() =>
    this.text().dashboard.chartDays.map((day, i) => ({ day, height: BARS[i] ?? 50 })),
  );

  protected on(id: RevealId): boolean {
    return this.revealed().has(id);
  }
}
