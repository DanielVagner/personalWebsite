import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { HERO_TEXT } from '../../i18n/hero.i18n';
import { LogoMark } from '../../shared/logo-mark';
import { VscodeWindow } from './vscode-window/vscode-window';

@Component({
  selector: 'app-hero',
  imports: [VscodeWindow, LogoMark],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly t = inject(LanguageService).select(HERO_TEXT);
}
