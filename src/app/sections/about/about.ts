import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { RevealDirective } from '../../core/reveal.directive';
import { ABOUT_TEXT } from '../../i18n/about.i18n';
import { LogoMark } from '../../shared/logo-mark';

@Component({
  selector: 'app-about',
  imports: [RevealDirective, LogoMark],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly t = inject(LanguageService).select(ABOUT_TEXT);
}
