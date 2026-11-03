import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormField, FormRoot, email, form, required, validate } from '@angular/forms/signals';
import { Lang, LanguageService } from '../../core/language.service';
import { RevealDirective } from '../../core/reveal.directive';
import { CONTACT_TEXT, ContactText } from '../../i18n/contact.i18n';
import { LogoMark } from '../../shared/logo-mark';
import {
  CONTACT_EMAIL,
  CONTACT_ENDPOINT,
  CONTACT_TIMEOUT_MS,
  DEADLINES,
  DESCRIPTION_MIN_LENGTH,
  Deadline,
  LINKEDIN_URL,
  PROJECT_TYPES,
  ProjectType,
} from './contact.config';

interface Brief {
  name: string;
  email: string;
  company: string;
  projectType: ProjectType | '';
  deadline: Deadline | '';
  description: string;
}

type ValidatedField = 'name' | 'email' | 'projectType' | 'description';
type Status = 'idle' | 'sending' | 'success' | 'error';
type CopyState = 'idle' | 'copied' | 'failed';

const EMPTY_BRIEF: Brief = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  deadline: '',
  description: '',
};

/** Order in which invalid fields receive focus after a failed submit. */
const FIELD_ORDER: readonly ValidatedField[] = ['name', 'email', 'projectType', 'description'];

/**
 * Plain-text version of the brief. Field labels come from `labels`, option values from
 * `options` (the language the visitor saw).
 */
function composeMessage(data: Brief, labels: ContactText, options: ContactText, lang?: Lang): string {
  const s = labels.summary;
  const none = '–';
  const lines = [
    `${s.company}: ${data.company.trim() || none}`,
    `${s.projectType}: ${data.projectType ? options.projectTypes[data.projectType] : none}`,
    `${s.deadline}: ${data.deadline ? options.deadlines[data.deadline] : none}`,
  ];
  if (lang) lines.push(`${s.language}: ${CONTACT_TEXT[lang].languageName}`);
  return [...lines, '', `${s.description}:`, data.description.trim()].join('\n');
}

@Component({
  selector: 'app-contact',
  imports: [FormField, FormRoot, RevealDirective, LogoMark],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly language = inject(LanguageService);
  private readonly injector = inject(Injector);
  private readonly doc = inject(DOCUMENT);

  protected readonly t = this.language.select(CONTACT_TEXT);

  protected readonly contactEmail = CONTACT_EMAIL;
  // Split so the address can only wrap right before the "@".
  protected readonly emailLocal = CONTACT_EMAIL.slice(0, CONTACT_EMAIL.indexOf('@'));
  protected readonly emailDomain = CONTACT_EMAIL.slice(CONTACT_EMAIL.indexOf('@'));
  protected readonly linkedinUrl = LINKEDIN_URL;
  protected readonly projectTypes = PROJECT_TYPES;
  protected readonly deadlines = DEADLINES;

  protected readonly status = signal<Status>('idle');
  protected readonly copyState = signal<CopyState>('idle');
  /** Snapshot of the last successfully sent brief, shown in the thank-you panel. */
  protected readonly sent = signal<Brief | null>(null);

  protected readonly model = signal<Brief>({ ...EMPTY_BRIEF });

  protected readonly brief = form(
    this.model,
    (p) => {
      required(p.name);
      validate(p.name, ({ value }) => (value().length > 0 && !value().trim() ? { kind: 'required' } : undefined));
      required(p.email);
      email(p.email);
      required(p.projectType);
      required(p.description);
      validate(p.description, ({ value }) => {
        const length = value().trim().length;
        if (value().length > 0 && length === 0) return { kind: 'required' };
        return length > 0 && length < DESCRIPTION_MIN_LENGTH ? { kind: 'minLength' } : undefined;
      });
    },
    {
      name: 'brief',
      submission: {
        action: () => this.send(),
        onInvalid: () => this.focusFirstInvalid(),
      },
    },
  );

  private readonly nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput');
  private readonly successHeading = viewChild<ElementRef<HTMLElement>>('successHeading');

  /** Text for the polite live region. */
  protected readonly liveMessage = computed(() => {
    const t = this.t();
    switch (this.status()) {
      case 'sending':
        return t.sending;
      case 'success':
        return t.successTitle;
      case 'error':
        return `${t.errorTitle} ${t.errorText}`;
      default:
        return '';
    }
  });

  protected readonly mailtoHref = computed(() => {
    const t = this.t();
    const data = this.model();
    const type = data.projectType ? t.projectTypes[data.projectType] : null;
    const body = [
      `${t.summary.name}: ${data.name.trim()}`,
      `${t.summary.email}: ${data.email.trim()}`,
      composeMessage(data, t, t),
    ].join('\n');
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.mailSubject(type))}&body=${encodeURIComponent(body)}`;
  });

  private copyTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.copyTimer));
  }

  /** Localized error for a field, or null while it shouldn't be shown yet. */
  protected errorFor(field: ValidatedField): string | null {
    const state = this.brief[field]();
    if (!state.touched() || !state.invalid()) return null;
    const errors = this.t().errors;
    const kind = state.errors()[0]?.kind;
    if (field === 'email' && kind === 'email') return errors.emailInvalid;
    if (field === 'description' && kind === 'minLength') return errors.descriptionShort;
    return errors[field];
  }

  protected startOver(): void {
    this.model.set({ ...EMPTY_BRIEF });
    this.brief().reset();
    this.sent.set(null);
    this.copyState.set('idle');
    this.status.set('idle');
    afterNextRender({ write: () => this.nameInput()?.nativeElement.focus() }, { injector: this.injector });
  }

  protected async copyEmail(): Promise<void> {
    let ok = false;
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      ok = true;
    } catch {
      ok = this.legacyCopy(CONTACT_EMAIL);
    }
    this.copyState.set(ok ? 'copied' : 'failed');
    clearTimeout(this.copyTimer);
    if (ok) this.copyTimer = setTimeout(() => this.copyState.set('idle'), 3000);
  }

  private async send(): Promise<undefined> {
    const data = this.model();
    this.status.set('sending');
    this.copyState.set('idle');
    // Option values as the visitor saw them; the API lays them out with Czech labels.
    const seen = this.t();
    const lang = this.language.lang();
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          company: data.company.trim(),
          projectType: data.projectType ? seen.projectTypes[data.projectType] : '',
          deadline: data.deadline ? seen.deadlines[data.deadline] : '',
          language: CONTACT_TEXT[lang].languageName,
          description: data.description.trim(),
          // Plain-text summary for older versions of the endpoint.
          message: composeMessage(data, CONTACT_TEXT.cs, seen, lang),
        }),
        signal: AbortSignal.timeout(CONTACT_TIMEOUT_MS),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      this.sent.set(data);
      this.status.set('success');
      afterNextRender({ write: () => this.successHeading()?.nativeElement.focus() }, { injector: this.injector });
    } catch {
      this.status.set('error');
    }
    return undefined;
  }

  private focusFirstInvalid(): void {
    const field = FIELD_ORDER.find((key) => this.brief[key]().invalid());
    if (field) this.brief[field]().focusBoundControl();
  }

  private legacyCopy(text: string): boolean {
    const area = this.doc.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    this.doc.body.appendChild(area);
    area.select();
    let ok = false;
    try {
      ok = this.doc.execCommand('copy');
    } catch {
      ok = false;
    }
    area.remove();
    return ok;
  }
}
