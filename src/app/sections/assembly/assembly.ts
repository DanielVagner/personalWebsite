import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { MotionService } from '../../core/motion.service';
import { ASSEMBLY_TEXT } from '../../i18n/assembly.i18n';
import { ASSEMBLY_PLATFORM_TEXT, Platform } from '../../i18n/assembly-platform.i18n';
import {
  LAYER_COUNT,
  layerStateAtStep,
  layerTransform,
  phoneStateAtStep,
  phoneTransform,
  sectionProgress,
  stepFromProgress,
} from './assembly-math';

/** Unscaled size of the phone box (phone + platform switch) the slot has to fit. */
const DEVICE_W = 420;
const DEVICE_H = 660;
/** The phone may grow a little beyond its design size when there is room. */
const MAX_SCALE = 1.18;

/** Viewports too short for a pinned stage (e.g. landscape phones) get the static layout. */
const SHORT_QUERY = '(max-height: 420px)';

@Component({
  selector: 'app-assembly',
  templateUrl: './assembly.html',
  styleUrl: './assembly.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Assembly {
  protected readonly t = inject(LanguageService).select(ASSEMBLY_TEXT);
  protected readonly pt = inject(LanguageService).select(ASSEMBLY_PLATFORM_TEXT);
  protected readonly platforms: readonly Platform[] = ['ios', 'android'];
  protected readonly platform = signal<Platform>('ios');
  private readonly reduced = inject(MotionService).reduced;
  private readonly win = inject(DOCUMENT).defaultView;
  private readonly short = signal(this.win?.matchMedia?.(SHORT_QUERY).matches ?? false);

  /** No scroll choreography: a regular section with the phone shown assembled. */
  protected readonly isStatic = computed(() => this.reduced() || this.short());

  private readonly section = viewChild.required<ElementRef<HTMLElement>>('section');
  private readonly stage = viewChild.required<ElementRef<HTMLElement>>('stage');
  private readonly slot = viewChild.required<ElementRef<HTMLElement>>('slot');

  private readonly scrollProgress = signal(0);
  protected readonly deviceScale = signal(1);

  private readonly stepCount = computed(() => this.t().steps.length);

  /**
   * Scrolling picks the step; moving between steps is a timed CSS transition, so every
   * step plays its full animation however fast the page is scrolled. Snap points in the
   * template make one short scroll land on the next step.
   */
  protected readonly step = computed(() =>
    this.isStatic() ? this.stepCount() - 1 : stepFromProgress(this.scrollProgress(), this.stepCount()),
  );
  private readonly isLast = computed(() => this.step() === this.stepCount() - 1);
  protected readonly phone = computed(() => phoneTransform(phoneStateAtStep(this.step(), this.stepCount())));
  protected readonly glow = computed(() => (this.isLast() ? 1 : 0));
  protected readonly bar = computed(() => `scaleX(${this.step() / Math.max(1, this.stepCount() - 1)})`);
  protected readonly layers = computed(() =>
    Array.from({ length: LAYER_COUNT }, (_, i) => {
      const s = layerStateAtStep(this.step(), i + 1);
      return { transform: layerTransform(s), opacity: s.opacity };
    }),
  );

  constructor() {
    const destroyRef = inject(DestroyRef);

    const shortMq = this.win?.matchMedia?.(SHORT_QUERY);
    if (shortMq) {
      const onShort = (e: MediaQueryListEvent) => this.short.set(e.matches);
      shortMq.addEventListener('change', onShort);
      destroyRef.onDestroy(() => shortMq.removeEventListener('change', onShort));
    }

    afterNextRender(() => {
      const win = this.win;
      if (!win) return;
      const section = this.section().nativeElement;
      const stage = this.stage().nativeElement;
      const slot = this.slot().nativeElement;

      let frame = 0;
      let listening = false;

      const measure = () => {
        frame = 0;
        if (this.isStatic()) return;
        const rect = section.getBoundingClientRect();
        this.scrollProgress.set(sectionProgress(rect.top, rect.height, stage.offsetHeight));
      };
      const schedule = () => {
        if (!frame) frame = win.requestAnimationFrame(measure);
      };
      const start = () => {
        if (listening) return;
        listening = true;
        win.addEventListener('scroll', schedule, { passive: true });
        win.addEventListener('resize', schedule, { passive: true });
        schedule();
      };
      const detach = () => {
        listening = false;
        win.removeEventListener('scroll', schedule);
        win.removeEventListener('resize', schedule);
      };
      const stop = () => {
        if (!listening) return;
        detach();
        // settle at 0 or 1 after a fast jump past the section
        schedule();
      };

      let io: IntersectionObserver | undefined;
      if (typeof IntersectionObserver === 'undefined') {
        start();
      } else {
        io = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) start();
              else stop();
            }
          },
          { rootMargin: '25% 0px 25% 0px' },
        );
        io.observe(section);
      }

      // Scale the phone so it always fits the space left next to / under the copy.
      let ro: ResizeObserver | undefined;
      const fit = (width: number, height: number) => {
        const scale = Math.min(MAX_SCALE, width / DEVICE_W, height / DEVICE_H);
        this.deviceScale.set(Math.max(0.3, Math.round(scale * 1000) / 1000));
      };
      if (typeof ResizeObserver === 'undefined') {
        fit(slot.clientWidth, slot.clientHeight);
      } else {
        ro = new ResizeObserver((entries) => {
          const box = entries[entries.length - 1].contentRect;
          fit(box.width, box.height);
        });
        ro.observe(slot);
      }

      destroyRef.onDestroy(() => {
        io?.disconnect();
        ro?.disconnect();
        detach();
        if (frame) win.cancelAnimationFrame(frame);
        frame = 0;
      });
    });
  }
}
