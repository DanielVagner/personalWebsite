import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  computed,
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { LanguageService } from '../../../core/language.service';
import { MotionService } from '../../../core/motion.service';
import { ActivityId, HERO_EDITOR_TEXT } from '../../../i18n/hero-editor.i18n';
import { DemoFile, RevealId, buildDemoFiles } from '../code-files';
import { EditorPreview } from '../editor-preview/editor-preview';
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

/** The explorer fits next to the code and the preview from this width up. */
const WIDE_QUERY = '(min-width: 1024px)';

/**
 * Interactive VS Code look-alike shown in the hero: an example template is typed
 * line by line on the left while a live preview assembles the resulting screen
 * on the right. Purely presentational – everything only changes local signals.
 */
@Component({
  selector: 'app-vscode-window',
  imports: [NgTemplateOutlet, EditorPreview],
  templateUrl: './vscode-window.html',
  styleUrl: './vscode-window.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'group',
    '[attr.aria-label]': 'ed().label',
  },
})
export class VscodeWindow {
  protected readonly ed = inject(LanguageService).select(HERO_EDITOR_TEXT);
  private readonly reduced = inject(MotionService).reduced;
  private readonly win = inject(DOCUMENT).defaultView;

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
  private replays = 0;

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
  protected readonly current = computed(() => Math.max(this.shown() - 1, 0));
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
    destroyRef.onDestroy(() => this.stop());

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
    this.typed.set(0);
    this.liveStatus.set('');
    const box = this.scrollBox()?.nativeElement;
    if (box) box.scrollTop = 0;

    const total = this.lineCount();
    const finish = () => {
      if (!announce) return;
      // Snapshot the text so a later language switch does not re-announce it;
      // the alternating trailing space makes repeated replays announce again.
      this.replays++;
      this.liveStatus.set(this.copy().done.join('. ') + (this.replays % 2 ? '' : ' '));
    };
    if (this.reduced()) {
      this.typed.set(total);
      finish();
      return;
    }
    const tick = (n: number) => {
      this.typed.set(n);
      this.follow(n);
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
