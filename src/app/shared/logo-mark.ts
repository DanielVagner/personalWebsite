import { ChangeDetectionStrategy, Component, input } from '@angular/core';

let nextId = 0;

/**
 * The DV monogram: a solid D with a symmetric V cut into it from the top.
 * Decorative – always aria-hidden; pair it with visible text or an aria-label on the parent.
 * `framed` puts it on a dark rounded tile (same geometry as the favicon) for busy backgrounds.
 */
@Component({
  selector: 'app-logo-mark',
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.viewBox]="framed() ? '0 0 32 32' : '0 0 40 40'"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient [attr.id]="gradientId" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stop-color="#DCE5FF" />
          <stop offset="1" stop-color="#AFC3FF" />
        </linearGradient>
      </defs>
      @if (framed()) {
        <rect width="32" height="32" rx="7" fill="#15171C" />
        <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" fill="none" stroke="#FFFFFF" stroke-opacity="0.08" />
        <path [attr.fill]="fill" d="M4 5.5A1.5 1.5 0 0 1 5.5 4 L7.64 4A0.5 0.5 0 0 1 8.114 4.342 L14 22 L19.886 4.342A0.5 0.5 0 0 1 20.36 4 L24 4C26.79 4 28.5 7.8 28.5 14 L28.5 16C28.5 22.72 23 28 16 28 L5.5 28A1.5 1.5 0 0 1 4 26.5Z" />
      } @else {
        <path [attr.fill]="fill" d="M6 8A2 2 0 0 1 8 6 L10.279 6A1 1 0 0 1 11.228 6.684 L18 27 L24.772 6.684A1 1 0 0 1 25.721 6 L30 6C32.79 6 34.5 10.56 34.5 18 L34.5 20C34.5 27.84 28.12 34 20 34 L8 34A2 2 0 0 1 6 32Z" />
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      flex: 0 0 auto;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoMark {
  readonly size = input(34);
  readonly framed = input(false);

  protected readonly gradientId = `dv-mark-${nextId++}`;
  protected readonly fill = `url(#${this.gradientId}) #C4D3FF`;
}
