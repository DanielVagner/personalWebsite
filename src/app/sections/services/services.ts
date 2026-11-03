import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { RevealDirective } from '../../core/reveal.directive';
import { SERVICES_TEXT } from '../../i18n/services.i18n';

@Component({
  selector: 'app-services',
  imports: [RevealDirective],
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
  protected readonly t = inject(LanguageService).select(SERVICES_TEXT);

  protected readonly cards = computed(() =>
    this.t().cards.map((card, i) => ({ ...card, no: String(i + 1).padStart(2, '0') })),
  );
}
