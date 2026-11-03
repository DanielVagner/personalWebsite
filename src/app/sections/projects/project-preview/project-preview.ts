import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Project } from '../../../i18n/projects.i18n';

/**
 * Real project imagery on a themed gradient.
 * `card`: fixed-height, tilted "peek" used on the grid cards.
 * `detail`: everything fully visible, used in the case study dialog.
 */
@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.html',
  styleUrl: './project-preview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-theme]': 'project().theme',
    '[attr.data-media]': 'project().media',
    '[attr.data-variant]': 'variant()',
    '[class.is-featured]': 'variant() === "card" && !!project().featured',
  },
})
export class ProjectPreview {
  readonly project = input.required<Project>();
  readonly variant = input<'card' | 'detail'>('card');
}
