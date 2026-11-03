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
import { NgTemplateOutlet } from '@angular/common';
import { AnalyticsService } from '../../core/analytics.service';
import { Lang, LanguageService } from '../../core/language.service';
import { NAV_TEXT, NavSectionId } from '../../i18n/nav.i18n';
import { LogoMark } from '../../shared/logo-mark';
import { CONTACT_EMAIL } from '../../sections/contact/contact.config';

/** Width from which the full nav is shown in the bar. Keep in sync with $bp-nav in header.scss. */
const NAV_BREAKPOINT = 1080;

const SPY_IDS: readonly NavSectionId[] = ['services', 'projects', 'process', 'about', 'contact'];
/** Sticky header height plus the page's scroll-padding gap. */
const HEADER_OFFSET = 80;

@Component({
  selector: 'app-header',
  imports: [LogoMark, NgTemplateOutlet],
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
  private readonly analytics = inject(AnalyticsService);
  private readonly doc = inject(DOCUMENT);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly toggleBtn = viewChild.required<ElementRef<HTMLButtonElement>>('toggle');

  protected readonly t = this.languages.select(NAV_TEXT);
  protected readonly lang = this.languages.lang;
  protected readonly open = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly active = signal<NavSectionId | null>(null);
  protected readonly email = CONTACT_EMAIL;

  constructor() {
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => {
      this.lockScroll(false);
      this.setPageInert(false);
    });

    afterNextRender(() => {
      const win = this.doc.defaultView;
      if (!win) return;

      let frame = 0;
      const update = () => {
        frame = 0;
        this.scrolled.set(win.scrollY > 8);
        this.updateActive();
      };
      const onScroll = () => {
        if (!frame) frame = win.requestAnimationFrame(update);
      };
      win.addEventListener('scroll', onScroll, { passive: true });
      win.addEventListener('resize', onScroll, { passive: true });
      update();

      // Leaving the mobile layout closes the panel.
      const desktop = win.matchMedia(`(min-width: ${NAV_BREAKPOINT}px)`);
      const onBreakpoint = (e: MediaQueryListEvent) => {
        if (e.matches) this.setOpen(false);
      };
      desktop.addEventListener('change', onBreakpoint);

      destroyRef.onDestroy(() => {
        win.removeEventListener('scroll', onScroll);
        win.removeEventListener('resize', onScroll);
        desktop.removeEventListener('change', onBreakpoint);
        if (frame) win.cancelAnimationFrame(frame);
      });
    });
  }

  protected setLang(lang: Lang): void {
    if (lang !== this.lang()) this.analytics.track('language_changed', { to: lang });
    this.languages.set(lang);
  }

  protected toggleMenu(): void {
    this.setOpen(!this.open());
  }

  protected close(): void {
    this.setOpen(false);
  }

  /** Taps on the dimmed area below the tablet panel close the menu. */
  protected onMenuBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.setOpen(false);
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
    this.setPageInert(open);
  }

  /** While the full-screen menu is open, the page behind it is out of reach for Tab and screen readers. */
  private setPageInert(inert: boolean): void {
    const host = this.host.nativeElement;
    for (const el of Array.from(host.parentElement?.children ?? [])) {
      if (el !== host && el instanceof HTMLElement) el.inert = inert;
    }
  }

  /**
   * Scroll-spy: the current section is the one crossing a probe line a third of the way
   * down the viewport. A section that ends a pixel inside the header band (as after an
   * anchor jump to the next one) can no longer win.
   */
  private updateActive(): void {
    const win = this.doc.defaultView;
    if (!win) return;
    const root = this.doc.documentElement;
    // The last section may never reach the probe line; pin it once the page bottom is reached.
    if (win.scrollY > 0 && win.innerHeight + win.scrollY >= root.scrollHeight - 2 && this.doc.getElementById('contact')) {
      this.active.set('contact');
      return;
    }
    const probe = HEADER_OFFSET + (win.innerHeight - HEADER_OFFSET) / 3;
    const current = SPY_IDS.find((id) => {
      const rect = this.doc.getElementById(id)?.getBoundingClientRect();
      if (!rect) return false;
      // The phone scene right after Services shows how the services are done, so it
      // counts as part of that section rather than having a menu item of its own.
      const extension = id === 'services' ? this.doc.querySelector('app-assembly')?.getBoundingClientRect() : undefined;
      const bottom = Math.max(rect.bottom, extension?.bottom ?? rect.bottom);
      return rect.top <= probe && bottom > probe;
    });
    this.active.set(current ?? null);
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

  protected trackCta(location: string): void {
    this.analytics.track('cta_click', { location });
  }
}
