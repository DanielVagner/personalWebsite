import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { FOOTER_TEXT } from '../../i18n/footer.i18n';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly t = inject(LanguageService).select(FOOTER_TEXT);
  protected readonly year = new Date().getFullYear();
}
