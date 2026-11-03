import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AnalyticsService } from '../../../core/analytics.service';
import { LanguageService } from '../../../core/language.service';
import { MotionService } from '../../../core/motion.service';
import { ActivityId, HERO_EDITOR_TEXT } from '../../../i18n/hero-editor.i18n';
import { DemoFile, RevealId, TargetId, buildDemoFiles } from '../code-files';
import { EditorPreview } from '../editor-preview/editor-preview';
import { PreviewState } from '../editor-preview/preview-state';
import { DARK_PLUS, Token, highlight } from '../highlight';

interface EditorLine {
  readonly tokens: readonly Token[];
}

interface MiniBar {
  readonly width: number;
  readonly indent: number;
  readonly color: string;
}

type ActivityIcon = 'explorer' | 'search' | 'scm' | 'run' | 'extensions';

/** Activity bar: only Explorer and Run open a view, the rest is decoration. */
const ACTIVITY_BAR: readonly { readonly icon: ActivityIcon; readonly view?: ActivityId }[] = [
  { icon: 'explorer', view: 'explorer' },
  { icon: 'search' },
  { icon: 'scm' },
  { icon: 'run', view: 'run' },
  { icon: 'extensions' },
];

// Typing timing (ms): the hero window itself fades in at ~750 ms.
const FIRST_OPEN_DELAY = 1000;
const OPEN_DELAY = 150;
const LINE_STEP = 190;
/** How long a code line stays highlighted after its preview element is clicked. */
const LINK_MS = 1500;

/** The explorer fits next to the code and the preview from this width up. */
const WIDE_QUERY = '(min-width: 1024px)';

/**
 * Interactive VS Code look-alike shown in the hero: an example template is typed
 * line by line on the left while a live preview assembles the resulting screen
 * on the right. Clicking the preview highlights the code line that drives the
 * clicked element. Purely presentational – everything only changes local signals.
 */
@Component({
  selector: 'app-vscode-window',
  imports: [NgTemplateOutlet, EditorPreview],
  templateUrl: './vscode-window.html',
  styleUrl: './vscode-window.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PreviewState],
  host: {
    role: 'group',
    '[attr.aria-label]': 'ed().label',
  },
})
export class VscodeWindow {
  protected readonly ed = inject(LanguageService).select(HERO_EDITOR_TEXT);
  private readonly analytics = inject(AnalyticsService);
  private readonly reduced = inject(MotionService).reduced;
  private readonly win = inject(DOCUMENT).defaultView;
  private readonly injector = inject(Injector);
  protected readonly state = inject(PreviewState);

  protected readonly activityBar = ACTIVITY_BAR;
  protected readonly htmlIcon = '<>';
  protected readonly ids = {
    tab: 'hero-ed-tab-',
    panel: 'hero-ed-panel',
    preview: 'hero-ed-preview',
    sidebar: 'hero-ed-sidebar',
  };

  private readonly wideMq = this.win?.matchMedia?.(WIDE_QUERY);
  /** Below 1024 px the side bar is an overlay, so it starts closed there. */
  private readonly wide = signal(this.wideMq?.matches ?? true);

  protected readonly active = signal(0);
  protected readonly activity = signal<ActivityId>('explorer');
  protected readonly sidebarOpen = signal(this.wide());
  /** Screen-reader status for a user-triggered replay. */
  protected readonly liveStatus = signal('');
  /** Number of code lines typed so far. */
  private readonly typed = signal(0);
  private timer: ReturnType<typeof setTimeout> | undefined;
  private announcements = 0;

  /** Last clicked preview element; its line flashes (`seq` restarts the fade). */
  private readonly link = signal<{ readonly target: TargetId; readonly seq: number } | null>(null);
  private linkTimer: ReturnType<typeof setTimeout> | undefined;
  private linkSeq = 0;
  /** Element whose value is shown as an inlay hint (until the next reset). */
  private readonly hintTarget = signal<TargetId | null>(null);
  /** Caret moved to a clicked element's line; typing takes it back after the flash. */
  private readonly cursorLine = signal<number | null>(null);
  /** The visitor has tried the preview (this page view), which hides the hint pill. */
  private readonly interacted = signal(false);
  /** Targets already reported to analytics for the current file view. */
  private readonly tracked = new Set<TargetId>();

  private readonly tabEls = viewChildren<ElementRef<HTMLButtonElement>>('tab');
  private readonly actEls = viewChildren<ElementRef<HTMLButtonElement>>('act');
  private readonly codeLines = viewChildren<ElementRef<HTMLElement>>('codeLine');
  private readonly scrollBox = viewChild<ElementRef<HTMLElement>>('scrollBox');

  protected readonly files = computed(() => buildDemoFiles(this.ed()));
  protected readonly file = computed<DemoFile>(() => this.files()[this.active()]);
  protected readonly copy = computed(() => this.ed()[this.file().id]);

  protected readonly lines = computed<EditorLine[]>(() =>
    highlight(this.file().lines.map((l) => l.text)).map((tokens) => ({ tokens })),
  );
  protected readonly lineCount = computed(() => this.file().lines.length);

  /** Lines visible right now – all of them when motion is reduced. */
  protected readonly shown = computed(() =>
    this.reduced() ? this.lineCount() : Math.min(this.typed(), this.lineCount()),
  );
  protected readonly done = computed(() => this.shown() >= this.lineCount());
  /** Index of the line holding the caret. */
  protected readonly current = computed(() => this.cursorLine() ?? Math.max(this.shown() - 1, 0));
  protected readonly column = computed(() =>
    this.shown() ? (this.file().lines[this.current()]?.text.length ?? 0) + 1 : 1,
  );

  /** Preview elements whose code line has been typed. */
  protected readonly revealed = computed<ReadonlySet<RevealId>>(() => {
    const set = new Set<RevealId>();
    for (const line of this.file().lines.slice(0, this.shown())) {
      if (line.reveals) set.add(line.reveals);
    }
    return set;
  });

  protected readonly linkedLine = computed(() => this.lineOf(this.link()?.target));
  /** Alternates on every click so the same line can flash again. */
  protected readonly linkAgain = computed(() => (this.link()?.seq ?? 0) % 2 === 0);
  protected readonly hoverLine = computed(() => this.lineOf(this.state.hovered()));
  protected readonly hintLine = computed(() => this.lineOf(this.hintTarget()));
  protected readonly hintText = computed(() => {
    const target = this.hintTarget();
    return target ? this.state.hint(target) : '';
  });
  protected readonly showTryIt = computed(() => this.done() && !this.interacted());

  protected readonly minimap = computed<MiniBar[]>(() =>
    this.file().lines.map(({ text }, i) => {
      const trimmed = text.trimStart();
      const first = this.lines()[i].tokens.find((tk) => tk.text.trim() !== '');
      return {
        width: trimmed.length ? Math.max(2, Math.min(56, trimmed.trimEnd().length * 1.05)) : 0,
        indent: Math.min(22, (text.length - trimmed.length) * 1.4),
        color: first?.color ?? DARK_PLUS.text,
      };
    }),
  );

  constructor() {
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => {
      this.stop();
      this.clearLink();
    });

    const mq = this.wideMq;
    if (mq) {
      const onWide = (e: MediaQueryListEvent) => {
        this.wide.set(e.matches);
        this.sidebarOpen.set(e.matches);
      };
      mq.addEventListener('change', onWide);
      destroyRef.onDestroy(() => mq.removeEventListener('change', onWide));
    }

    this.play(FIRST_OPEN_DELAY);
  }

  protected open(index: number): void {
    if (index === this.active()) return;
    this.active.set(index);
    this.analytics.track('demo_file_opened', { file: this.files()[index]?.name ?? String(index) });
    this.play(OPEN_DELAY);
  }

  /** File picked in the explorer; the overlay explorer (< 1024 px) closes again. */
  protected openFromExplorer(index: number): void {
    this.open(index);
    if (!this.wide()) {
      this.sidebarOpen.set(false);
      this.tabEls()[index]?.nativeElement.focus();
    }
  }

  protected replay(): void {
    this.play(OPEN_DELAY, true);
  }

  /**
   * A preview element was clicked: flash its code line, move the caret there, show
   * the new value as an inlay hint and scroll the code box (never the page) to it.
   */
  protected onInteract(target: TargetId): void {
    const line = this.lineOf(target);
    if (line < 0) return;
    this.interacted.set(true);
    this.hintTarget.set(target);
    this.cursorLine.set(line);

    this.clearLink();
    this.link.set({ target, seq: ++this.linkSeq });
    this.linkTimer = setTimeout(() => {
      this.linkTimer = undefined;
      this.link.set(null);
      // Still typing: the caret and the code box catch up with the newest line.
      if (!this.done()) {
        this.cursorLine.set(null);
        this.follow(this.shown());
      }
    }, LINK_MS);

    const message = this.state.announcement(target);
    if (message) this.announce(message);

    if (!this.tracked.has(target)) {
      this.tracked.add(target);
      this.analytics.track('demo_interaction', { demo: this.file().id, target });
    }

    afterNextRender(
      {
        earlyRead: () => this.revealTarget(line),
        write: (pos) => {
          if (pos) {
            this.scrollBox()?.nativeElement.scrollTo({
              ...pos,
              behavior: this.reduced() ? 'auto' : 'smooth',
            });
          }
        },
      },
      { injector: this.injector },
    );
  }

  /** Mouse over a code line that drives a preview element → outline that element. */
  protected inspect(event: PointerEvent, index: number): void {
    if (event.pointerType !== 'mouse' || index >= this.shown()) return;
    this.state.inspected.set(this.file().lines[index]?.binds ?? null);
  }

  protected selectActivity(id: ActivityId): void {
    if (this.activity() === id) {
      this.sidebarOpen.update((open) => !open);
    } else {
      this.activity.set(id);
      this.sidebarOpen.set(true);
    }
  }

  protected closeOverlay(): void {
    if (this.wide() || !this.sidebarOpen()) return;
    this.sidebarOpen.set(false);
    const index = this.activityBar
      .filter((a) => a.view)
      .findIndex((a) => a.view === this.activity());
    this.actEls()[index]?.nativeElement.focus();
  }

  protected onTabKeydown(event: KeyboardEvent, index: number): void {
    const count = this.files().length;
    let next: number;
    switch (event.key) {
      case 'ArrowRight':
        next = (index + 1) % count;
        break;
      case 'ArrowLeft':
        next = (index - 1 + count) % count;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = count - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    this.open(next);
    this.tabEls()[next]?.nativeElement.focus();
  }

  /**
   * (Re)starts typing the active file from its first line. Each tick reveals one
   * line – and with it the matching preview element. Reduced motion: all at once.
   */
  private play(delay: number, announce = false): void {
    this.stop();
    this.clearLink();
    this.typed.set(0);
    this.liveStatus.set('');
    this.state.reset();
    this.hintTarget.set(null);
    this.cursorLine.set(null);
    this.tracked.clear();
    const box = this.scrollBox()?.nativeElement;
    if (box) {
      box.scrollTop = 0;
      box.scrollLeft = 0;
    }

    const total = this.lineCount();
    const finish = () => {
      if (announce) this.announce(this.copy().done.join('. '));
    };
    if (this.reduced()) {
      this.typed.set(total);
      finish();
      return;
    }
    const tick = (n: number) => {
      this.typed.set(n);
      // While a clicked line flashes it keeps the caret and the code box scroll;
      // typing goes on underneath and catches up when the flash ends.
      if (this.linkTimer === undefined) {
        this.cursorLine.set(null);
        this.follow(n);
      }
      if (n >= total) {
        this.timer = undefined;
        finish();
      } else {
        this.timer = setTimeout(() => tick(n + 1), LINE_STEP);
      }
    };
    this.timer = setTimeout(() => tick(1), delay);
  }

  private stop(): void {
    if (this.timer !== undefined) clearTimeout(this.timer);
    this.timer = undefined;
  }

  private clearLink(): void {
    if (this.linkTimer !== undefined) clearTimeout(this.linkTimer);
    this.linkTimer = undefined;
    this.link.set(null);
  }

  /**
   * Polite screen-reader message. The text is a snapshot, so a later language
   * switch does not re-announce it; the alternating trailing space makes a
   * repeated message announce again.
   */
  private announce(text: string): void {
    this.announcements++;
    this.liveStatus.set(text + (this.announcements % 2 ? '' : ' '));
  }

  private lineOf(target: TargetId | null | undefined): number {
    return target ? this.file().lines.findIndex((l) => l.binds === target) : -1;
  }

  /**
   * Where the code box itself (never the page) has to scroll so a line and its
   * inlay hint are visible – on phones the box shows only a few lines. Sideways it
   * never goes past the line's first character (it would slide under the sticky
   * gutter): the code that drives the element matters more than the hint, which
   * may then be cut off at the edge. Null when no scrolling is needed.
   */
  private revealTarget(index: number): { top: number; left: number } | null {
    const box = this.scrollBox()?.nativeElement;
    const line = this.codeLines()[index]?.nativeElement;
    if (!box || !line) return null;
    const pad = 8;
    const top = pad + line.offsetTop;
    let y = box.scrollTop;
    if (top < y || top + line.offsetHeight > y + box.clientHeight) {
      y = Math.max(0, Math.round(top - (box.clientHeight - line.offsetHeight) / 2));
    }
    let x = box.scrollLeft;
    const hint = line.querySelector<HTMLElement>('.vs-hint');
    if (hint) {
      const right = hint.getBoundingClientRect().right - box.getBoundingClientRect().left + x;
      const text = this.file().lines[index]?.text ?? '';
      const indent = text.length - text.trimStart().length;
      // Monospace: any token's width / length is the character width.
      const token = line.firstElementChild;
      const chars = token?.textContent?.length ?? 0;
      const charWidth = token && chars ? token.getBoundingClientRect().width / chars : 0;
      x = Math.max(
        0,
        Math.min(Math.ceil(right + 12 - box.clientWidth), Math.floor(indent * charWidth)),
      );
    }
    return x === box.scrollLeft && y === box.scrollTop ? null : { top: y, left: x };
  }

  /** Keeps the newest line in view when the code box is shorter than the file (phones). */
  private follow(n: number): void {
    const box = this.scrollBox()?.nativeElement;
    const line = this.codeLines()[n - 1]?.nativeElement;
    if (!box || !line || box.scrollHeight <= box.clientHeight + 1) return;
    const pad = 8;
    const top = pad + line.offsetTop + line.offsetHeight + pad - box.clientHeight;
    if (top > box.scrollTop) box.scrollTo({ top, behavior: 'smooth' });
  }
}
