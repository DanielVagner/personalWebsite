import { ChangeDetectionStrategy, Component, input } from '@angular/core';

let nextId = 0;

/**
 * The "V" mark: a terminal prompt ">" turned 90° with a blinking cursor underneath.
 * Decorative – always aria-hidden; pair it with visible text or an aria-label on the parent.
 */
@Component({
  selector: 'app-logo-mark',
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient [attr.id]="ids.v" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#E2E9FF" />
          <stop offset=".55" stop-color="#A8BDFF" />
          <stop offset="1" stop-color="#3D7BFF" />
        </linearGradient>
        <linearGradient [attr.id]="ids.bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#1A1F2B" />
          <stop offset="1" stop-color="#0D1016" />
        </linearGradient>
      </defs>
      @if (framed()) {
        <rect x=".5" y=".5" width="39" height="39" rx="11" [attr.fill]="'url(#' + ids.bg + ')'" stroke="rgba(168,189,255,.28)" />
      }
      <path
        d="M11 11.5L20 25l9-13.5"
        fill="none"
        [attr.stroke]="'url(#' + ids.v + ')'"
        stroke-width="3.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect class="cursor" [class.cursor--blink]="blink()" x="16" y="29.2" width="8" height="2.6" rx="1.3" fill="#A8BDFF" />
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      flex: 0 0 auto;
    }

    @media (prefers-reduced-motion: no-preference) {
      .cursor--blink {
        animation: blink 1.1s steps(1) infinite;
      }
    }

    @keyframes blink {
      50% {
        opacity: 0;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoMark {
  readonly size = input(34);
  readonly framed = input(true);
  readonly blink = input(true);

  protected readonly ids = { v: `lm-v-${nextId}`, bg: `lm-bg-${nextId++}` };
}
