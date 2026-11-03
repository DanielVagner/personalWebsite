import { DOCUMENT, DestroyRef, Injectable, inject, signal } from '@angular/core';

/** Tracks the user's `prefers-reduced-motion` setting as a signal. */
@Injectable({ providedIn: 'root' })
export class MotionService {
  private readonly win = inject(DOCUMENT).defaultView;

  readonly reduced = signal(false);

  constructor() {
    const mq = this.win?.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return;
    this.reduced.set(mq.matches);
    const onChange = (e: MediaQueryListEvent) => this.reduced.set(e.matches);
    mq.addEventListener('change', onChange);
    inject(DestroyRef).onDestroy(() => mq.removeEventListener('change', onChange));
  }
}
