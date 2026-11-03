import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Lang, LanguageService } from '../../core/language.service';
import { NAV_TEXT, NavSectionId } from '../../i18n/nav.i18n';
import { LogoMark } from '../../shared/logo-mark';

/** Width from which the full nav is shown in the bar. Keep in sync with $bp-nav in header.scss. */
const NAV_BREAKPOINT = 1080;

const SPY_IDS: readonly NavSectionId[] = ['services', 'projects', 'process', 'about', 'contact'];

@Component({
  selector: 'app-header',
  imports: [LogoMark],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'onEscape()',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class Header {
  private readonly languages = inject(LanguageService);
  private readonly doc = inject(DOCUMENT);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly toggleBtn = viewChild.required<ElementRef<HTMLButtonElement>>('toggle');

  protected readonly t = this.languages.select(NAV_TEXT);
  protected readonly lang = this.languages.lang;
  protected readonly open = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly active = signal<NavSectionId | null>(null);

  private readonly visible = new Set<NavSectionId>();

  constructor() {
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => this.lockScroll(false));

    afterNextRender(() => {
      const win = this.doc.defaultView;
      if (!win) return;

      const onScroll = () => {
        this.scrolled.set(win.scrollY > 8);
        this.updateActive();
      };
      win.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      // Leaving the mobile layout closes the panel.
      const desktop = win.matchMedia(`(min-width: ${NAV_BREAKPOINT}px)`);
      const onBreakpoint = (e: MediaQueryListEvent) => {
        if (e.matches) this.setOpen(false);
      };
      desktop.addEventListener('change', onBreakpoint);

      // Scroll-spy: a section is "current" while it crosses a band just below the header.
      let observer: IntersectionObserver | undefined;
      if ('IntersectionObserver' in win) {
        observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              const id = entry.target.id as NavSectionId;
              if (entry.isIntersecting) this.visible.add(id);
              else this.visible.delete(id);
            }
            this.updateActive();
          },
          { rootMargin: '-80px 0px -55% 0px', threshold: 0 },
        );
        for (const id of SPY_IDS) {
          const el = this.doc.getElementById(id);
          if (el) observer.observe(el);
        }
      }

      destroyRef.onDestroy(() => {
        win.removeEventListener('scroll', onScroll);
        desktop.removeEventListener('change', onBreakpoint);
        observer?.disconnect();
      });
    });
  }

  protected setLang(lang: Lang): void {
    this.languages.set(lang);
  }

  protected toggleMenu(): void {
    this.setOpen(!this.open());
  }

  protected close(): void {
    this.setOpen(false);
  }

  protected onEscape(): void {
    if (!this.open()) return;
    this.setOpen(false);
    this.toggleBtn().nativeElement.focus();
  }

  protected onFocusOut(event: Event): void {
    const next = (event as FocusEvent).relatedTarget;
    if (this.open() && next instanceof Node && !this.host.nativeElement.contains(next)) {
      this.setOpen(false);
    }
  }

  private setOpen(open: boolean): void {
    if (this.open() === open) return;
    this.open.set(open);
    // Applied synchronously so an anchor click that closes the menu can scroll right away.
    this.lockScroll(open);
  }

  private updateActive(): void {
    const win = this.doc.defaultView;
    const root = this.doc.documentElement;
    // The last section may never reach the spy band; pin it once the page bottom is reached.
    if (win && win.scrollY > 0 && win.innerHeight + win.scrollY >= root.scrollHeight - 2 && this.doc.getElementById('contact')) {
      this.active.set('contact');
      return;
    }
    this.active.set(SPY_IDS.find((id) => this.visible.has(id)) ?? null);
  }

  private lockScroll(lock: boolean): void {
    const body = this.doc.body;
    if (!body) return;
    if (lock) {
      const gap = (this.doc.defaultView?.innerWidth ?? 0) - this.doc.documentElement.clientWidth;
      body.style.overflow = 'hidden';
      if (gap > 0) body.style.paddingRight = `${gap}px`;
    } else {
      body.style.removeProperty('overflow');
      body.style.removeProperty('padding-right');
    }
  }
}
