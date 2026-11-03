import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { RevealDirective } from '../../core/reveal.directive';
import { PROCESS_TEXT } from '../../i18n/process.i18n';

let nextId = 0;

@Component({
  selector: 'app-process',
  imports: [RevealDirective],
  templateUrl: './process.html',
  styleUrl: './process.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Process {
  protected readonly t = inject(LanguageService).select(PROCESS_TEXT);

  protected readonly idPrefix = `process-${nextId++}`;

  /** Open state per step; steps toggle independently, the first starts open. */
  protected readonly open = signal<readonly boolean[]>([true, false, false, false]);

  protected toggle(index: number): void {
    this.open.update((state) => {
      const next = [...state];
      next[index] = !next[index];
      return next;
    });
  }

  protected stepNumber(index: number): string {
    return String(index + 1).padStart(2, '0');
  }
}
