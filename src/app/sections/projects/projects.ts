import { ChangeDetectionStrategy, Component, DOCUMENT, computed, inject, signal } from '@angular/core';

import { AnalyticsService } from '../../core/analytics.service';
import { LanguageService } from '../../core/language.service';
import { MotionService } from '../../core/motion.service';
import { RevealDirective } from '../../core/reveal.directive';
import { PROJECTS, PROJECTS_TEXT, Project, ProjectId } from '../../i18n/projects.i18n';
import { ProjectDialog, ProjectDialogClose } from './project-dialog/project-dialog';
import { ProjectPreview } from './project-preview/project-preview';

@Component({
  selector: 'app-projects',
  imports: [RevealDirective, ProjectPreview, ProjectDialog],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  private readonly doc = inject(DOCUMENT);
  private readonly motion = inject(MotionService);
  private readonly analytics = inject(AnalyticsService);

  protected readonly t = inject(LanguageService).select(PROJECTS_TEXT);

  protected readonly projects = computed<Project[]>(() => {
    const items = this.t().items;
    return PROJECTS.map((base) => {
      const copy = items[base.id];
      return { ...base, ...copy, tags: [...base.tags, ...(copy.extraTags ?? [])] };
    });
  });

  private readonly activeId = signal<ProjectId | null>(null);
  protected readonly active = computed(() => this.projects().find((p) => p.id === this.activeId()) ?? null);

  private opener: HTMLElement | null = null;

  protected open(id: ProjectId, event: Event): void {
    this.opener = event.currentTarget as HTMLElement;
    this.activeId.set(id);
    this.analytics.track('case_study_opened', { project: id });
  }

  protected onClosed({ toContact }: ProjectDialogClose): void {
    this.activeId.set(null);
    const opener = this.opener;
    this.opener = null;

    if (!toContact) {
      opener?.focus({ preventScroll: true });
      return;
    }

    const contact = this.doc.getElementById('contact');
    if (!contact) return;
    contact.scrollIntoView({ behavior: this.motion.reduced() ? 'auto' : 'smooth', block: 'start' });
    this.doc.defaultView?.history.replaceState(null, '', '#contact');
    // Move keyboard focus along with the scroll.
    const heading = contact.querySelector<HTMLElement>('h2');
    if (heading) {
      if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }
}
