import { DOCUMENT, Injectable, Signal, computed, effect, inject, signal } from '@angular/core';

export type Lang = 'cs' | 'en';

/** A piece of copy available in every supported language. */
export type Translated<T> = Record<Lang, T>;

export const LANGS: readonly Lang[] = ['cs', 'en'];

const STORAGE_KEY = 'dv.lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly doc = inject(DOCUMENT);

  readonly lang = signal<Lang>(this.initialLang());

  constructor() {
    effect(() => {
      const lang = this.lang();
      this.doc.documentElement.lang = lang;
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        // storage unavailable (private mode) – the choice just isn't remembered
      }
    });
  }

  set(lang: Lang): void {
    this.lang.set(lang);
  }

  toggle(): void {
    this.lang.update((l) => (l === 'cs' ? 'en' : 'cs'));
  }

  /** Returns a signal with the copy for the active language. */
  select<T>(dict: Translated<T>): Signal<T> {
    return computed(() => dict[this.lang()]);
  }

  private initialLang(): Lang {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'cs' || saved === 'en') return saved;
    } catch {
      // ignore
    }
    // Czech/Slovak browsers get Czech, everyone else English.
    const nav = this.doc.defaultView?.navigator;
    const first = nav?.languages?.[0] ?? nav?.language ?? 'cs';
    return /^(cs|sk)\b/i.test(first) ? 'cs' : 'en';
  }
}
