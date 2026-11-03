import { Injectable } from '@angular/core';
import { track } from '@vercel/analytics';

/** Custom events shown in Vercel Web Analytics (recorded on the Pro plan). */
export type AnalyticsEvent =
  | 'cta_click'
  | 'brief_submitted'
  | 'brief_failed'
  | 'brief_mail_fallback'
  | 'case_study_opened'
  | 'language_changed'
  | 'platform_switched'
  | 'demo_file_opened';

type EventProps = Record<string, string | number | boolean>;

/**
 * Thin wrapper around Vercel's `track()`. Never pass personal data (names, e-mails,
 * free text) – only enum-like values such as a section, project id or option key.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  track(event: AnalyticsEvent, props?: EventProps): void {
    try {
      track(event, props);
    } catch {
      // Analytics must never break the page.
    }
  }
}
