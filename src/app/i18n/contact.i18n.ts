import { Translated } from '../core/language.service';
import { Deadline, ProjectType } from '../sections/contact/contact.config';

export interface ContactText {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  replyNote: string;

  formTitle: string;
  formIntro: string;
  optional: string;
  fields: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    company: string;
    companyPlaceholder: string;
    projectType: string;
    deadline: string;
    selectPlaceholder: string;
    description: string;
    descriptionPlaceholder: string;
    descriptionHelp: string;
  };
  projectTypes: Record<ProjectType, string>;
  deadlines: Record<Deadline, string>;
  errors: {
    name: string;
    email: string;
    emailInvalid: string;
    projectType: string;
    description: string;
    descriptionShort: string;
  };
  privacy: string;
  submit: string;
  sending: string;

  successTitle: string;
  successText: (email: string) => string;
  summaryLabel: string;
  sendAnother: string;

  errorTitle: string;
  errorText: string;
  mailFallback: string;
  copyEmail: string;
  copied: string;
  copyFailed: (email: string) => string;
  mailSubject: (projectType: string | null) => string;

  /** Labels used in the summary and in the composed e-mail text. */
  summary: {
    name: string;
    email: string;
    company: string;
    projectType: string;
    deadline: string;
    description: string;
    language: string;
  };
  languageName: string;

  directTitle: string;
  directText: string;
  emailAria: (email: string) => string;
  linkedin: string;
  newTab: string;
  nextTitle: string;
  nextSteps: string[];
}

export const CONTACT_TEXT: Translated<ContactText> = {
  cs: {
    eyebrow: 'Začněme rozhovorem',
    titleLine1: 'Máte nápad?',
    titleLine2: 'Udělejme z něj aplikaci.',
    replyNote: 'Obvykle se ozvu do jednoho až dvou dnů.',

    formTitle: 'Popište mi svůj projekt',
    formIntro:
      'Pár vět stačí. Čím víc toho budu vědět, tím konkrétněji vám odpovím – a nevadí, když zatím máte jen nápad.',
    optional: '(nepovinné)',
    fields: {
      name: 'Jméno',
      namePlaceholder: 'Vaše jméno',
      email: 'E-mail',
      emailPlaceholder: 'vas@firma.cz',
      company: 'Firma',
      companyPlaceholder: 'Název firmy nebo projektu',
      projectType: 'Typ projektu',
      deadline: 'Termín',
      selectPlaceholder: 'Vyberte…',
      description: 'Popis projektu',
      descriptionPlaceholder: 'Co má aplikace umět, pro koho je a co už máte hotové…',
      descriptionHelp:
        'Alespoň 20 znaků. Uveďte třeba cíl projektu, hlavní funkce a to, co už máte (design, backend, podklady).',
    },
    projectTypes: {
      'web-app': 'Webová aplikace',
      'mobile-app': 'Mobilní aplikace',
      website: 'Webová prezentace',
      consulting: 'Architektura a konzultace',
      other: 'Něco jiného',
    },
    deadlines: {
      asap: 'Co nejdříve',
      month: 'Do měsíce',
      quarter: 'Za 1–3 měsíce',
      later: 'Za více než 3 měsíce',
      flexible: 'Nespěchá',
    },
    errors: {
      name: 'Vyplňte prosím své jméno.',
      email: 'Vyplňte prosím e-mail, abych vám mohl odpovědět.',
      emailInvalid: 'Zkontrolujte prosím e-mailovou adresu – nevypadá úplně správně.',
      projectType: 'Vyberte prosím typ projektu.',
      description: 'Napište prosím pár vět o projektu.',
      descriptionShort: 'Popis je zatím moc krátký – napište prosím alespoň 20 znaků.',
    },
    privacy: 'Vyplněné údaje použiji pouze k odpovědi na vaši poptávku.',
    submit: 'Odeslat poptávku',
    sending: 'Odesílám…',

    successTitle: 'Děkuji, poptávka dorazila.',
    successText: (email) => `Ozvu se vám na adresu ${email}, obvykle do jednoho až dvou dnů.`,
    summaryLabel: 'Shrnutí poptávky',
    sendAnother: 'Poslat další poptávku',

    errorTitle: 'Poptávku se nepodařilo odeslat.',
    errorText:
      'Zkuste to prosím znovu nebo mi napište e-mailem – údaje z formuláře se do něj doplní automaticky.',
    mailFallback: 'Napsat e-mailem',
    copyEmail: 'Zkopírovat adresu',
    copied: 'Adresa zkopírována',
    copyFailed: (email) => `Kopírování se nepovedlo. Adresa je ${email}.`,
    mailSubject: (type) => (type ? `Poptávka – ${type}` : 'Nová poptávka'),

    summary: {
      name: 'Jméno',
      email: 'E-mail',
      company: 'Firma',
      projectType: 'Typ projektu',
      deadline: 'Termín',
      description: 'Popis projektu',
      language: 'Jazyk webu',
    },
    languageName: 'čeština',

    directTitle: 'Raději napřímo?',
    directText:
      'Napište mi rovnou e-mail nebo se ozvěte na LinkedInu.',
    emailAria: (email) => `Napsat e-mail na ${email}`,
    linkedin: 'LinkedIn',
    newTab: '(otevře se na nové kartě)',
    nextTitle: 'Co bude dál',
    nextSteps: [
      'Přečtu si vaši poptávku a ozvu se vám.',
      'Domluvíme si krátký úvodní hovor o tom, čeho chcete dosáhnout.',
      'Pošlu vám návrh postupu a odhad času i nákladů.',
    ],
  },
  en: {
    eyebrow: 'It starts with a conversation',
    titleLine1: 'Your idea.',
    titleLine2: 'Let’s build it.',
    replyNote: 'I usually reply within a day or two.',

    formTitle: 'Tell me about your project',
    formIntro:
      'A few sentences are enough. The more I know, the more specific my reply can be – and it’s fine if all you have so far is an idea.',
    optional: '(optional)',
    fields: {
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@company.com',
      company: 'Company',
      companyPlaceholder: 'Company or project name',
      projectType: 'Project type',
      deadline: 'Timeline',
      selectPlaceholder: 'Choose…',
      description: 'Project description',
      descriptionPlaceholder: 'What should it do, who is it for and what do you already have…',
      descriptionHelp:
        'At least 20 characters. Useful: the goal, key features and what already exists (design, backend, content).',
    },
    projectTypes: {
      'web-app': 'Web app',
      'mobile-app': 'Mobile app',
      website: 'Website',
      consulting: 'Architecture & consulting',
      other: 'Something else',
    },
    deadlines: {
      asap: 'As soon as possible',
      month: 'Within a month',
      quarter: 'In 1–3 months',
      later: 'In more than 3 months',
      flexible: 'No rush',
    },
    errors: {
      name: 'Please enter your name.',
      email: 'Please enter your email so I can reply.',
      emailInvalid: 'That email address doesn’t look quite right.',
      projectType: 'Please choose a project type.',
      description: 'Please write a few sentences about the project.',
      descriptionShort: 'That’s a bit short – please write at least 20 characters.',
    },
    privacy: 'I’ll only use these details to reply to your inquiry.',
    submit: 'Send inquiry',
    sending: 'Sending…',

    successTitle: 'Thank you – your inquiry is in.',
    successText: (email) => `I’ll reply to ${email}, usually within a day or two.`,
    summaryLabel: 'Inquiry summary',
    sendAnother: 'Send another inquiry',

    errorTitle: 'The message couldn’t be sent.',
    errorText: 'Please try again or email me instead – your details will be filled in automatically.',
    mailFallback: 'Send by email',
    copyEmail: 'Copy email address',
    copied: 'Email address copied',
    copyFailed: (email) => `Copying didn’t work. The address is ${email}.`,
    mailSubject: (type) => (type ? `Project inquiry – ${type}` : 'Project inquiry'),

    summary: {
      name: 'Name',
      email: 'Email',
      company: 'Company',
      projectType: 'Project type',
      deadline: 'Timeline',
      description: 'Project description',
      language: 'Site language',
    },
    languageName: 'English',

    directTitle: 'Prefer to reach out directly?',
    directText: 'Send me an email or reach out on LinkedIn.',
    emailAria: (email) => `Email me at ${email}`,
    linkedin: 'LinkedIn',
    newTab: '(opens in a new tab)',
    nextTitle: 'What happens next',
    nextSteps: [
      'I’ll read your inquiry and get back to you.',
      'We’ll set up a short intro call about your goals and options.',
      'I’ll send you a proposed approach with an estimate of time and cost.',
    ],
  },
};
