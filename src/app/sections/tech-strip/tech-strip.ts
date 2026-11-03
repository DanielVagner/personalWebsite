import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { TECH_STRIP_TEXT } from '../../i18n/tech-strip.i18n';
import { TECH_LOGOS } from './tech-logos';

@Component({
  selector: 'app-tech-strip',
  templateUrl: './tech-strip.html',
  styleUrl: './tech-strip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStrip {
  protected readonly t = inject(LanguageService).select(TECH_STRIP_TEXT);
  protected readonly logos = TECH_LOGOS;
}
