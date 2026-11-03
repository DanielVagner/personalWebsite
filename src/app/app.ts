import { ChangeDetectionStrategy, Component, DOCUMENT, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LanguageService } from './core/language.service';
import { SectionScrollService } from './core/section-scroll.service';
import { SITE_TEXT } from './i18n/site.i18n';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { About } from './sections/about/about';
import { Assembly } from './sections/assembly/assembly';
import { Contact } from './sections/contact/contact';
import { Hero } from './sections/hero/hero';
import { Process } from './sections/process/process';
import { Projects } from './sections/projects/projects';
import { Services } from './sections/services/services';
import { TechStrip } from './sections/tech-strip/tech-strip';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, TechStrip, Services, Assembly, Projects, Process, About, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class App {
  protected readonly t = inject(LanguageService).select(SITE_TEXT);
  private readonly doc = inject(DOCUMENT);
  private readonly sectionScroll = inject(SectionScrollService);

  constructor() {
    const title = inject(Title);
    const meta = inject(Meta);
    effect(() => {
      const { title: text, description } = this.t();
      title.setTitle(text);
      meta.updateTag({ name: 'description', content: description });
      meta.updateTag({ property: 'og:title', content: text });
      meta.updateTag({ property: 'og:description', content: description });
    });
  }

  /** In-page links (#section) use the shared section scroll instead of the native jump. */
  protected onDocumentClick(event: MouseEvent): void {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    const link = (event.target as Element | null)?.closest?.('a[href^="#"]');
    const id = link?.getAttribute('href')?.slice(1);
    const target = id ? this.doc.getElementById(id) : null;
    if (!target) return;

    event.preventDefault();
    this.sectionScroll.scrollTo(target);
    // Keyboard focus follows, like with a native anchor jump; otherwise the next Tab would
    // start over from the link, which may sit in a menu that is closing.
    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
    target.focus({ preventScroll: true });
  }
}
