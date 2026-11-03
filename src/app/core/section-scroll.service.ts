import { DOCUMENT, Injectable, inject } from '@angular/core';
import { MotionService } from './motion.service';

/** Sticky header height plus the gap the page's scroll-padding-top leaves. */
const HEADER_OFFSET = 80;
/** Longer jumps start this many viewport heights before the target. */
const GLIDE_VIEWPORTS = 1;

/**
 * Scrolls to an in-page section. Long jumps first move instantly to just before the
 * target and only glide the last stretch: a plain smooth scroll would crawl through the
 * tall pinned phone scene, where the screen barely changes and the page seems to stall.
 */
@Injectable({ providedIn: 'root' })
export class SectionScrollService {
  private readonly doc = inject(DOCUMENT);
  private readonly motion = inject(MotionService);

  scrollTo(target: HTMLElement, hash = target.id): void {
    const win = this.doc.defaultView;
    if (!win) return;

    const top = Math.max(0, target.getBoundingClientRect().top + win.scrollY - HEADER_OFFSET);
    if (this.motion.reduced()) {
      win.scrollTo({ top, behavior: 'instant' });
    } else {
      const glide = win.innerHeight * GLIDE_VIEWPORTS;
      const distance = top - win.scrollY;
      if (Math.abs(distance) > glide) {
        win.scrollTo({ top: top - Math.sign(distance) * glide, behavior: 'instant' });
      }
      win.scrollTo({ top, behavior: 'smooth' });
    }

    if (hash) win.history.pushState(null, '', `#${hash}`);
  }
}
