import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LanguageService } from './core/language.service';
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
})
export class App {
  protected readonly t = inject(LanguageService).select(SITE_TEXT);

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
}
