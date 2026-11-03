import { Translated } from '../core/language.service';

export interface AboutFact {
  value: string;
  label: string;
}

export interface AboutText {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  lead: string;
  body: string;
  photoAlt: string;
  factsLabel: string;
  facts: AboutFact[];
}

export const ABOUT_TEXT: Translated<AboutText> = {
  cs: {
    eyebrow: 'Krátce o mně',
    titleLine1: '11+ let vývoje.',
    titleLine2: 'Pořád zvědavý.',
    lead:
      'Jsem Senior Software Engineer. Ve společnosti HTEC teď vyvíjím mobilní zdravotní aplikaci Tolion Health (Ionic, Angular, ASP.NET). Předtím jsem se v CertiConu postupně vypracoval na softwarového architekta, vedl menší týmy a pracoval na projektech pro Bosch, Medtronic a Embitron. Zkušenosti z velkých projektů využívám i u menších zakázek.',
    body:
      'Na volné noze vyvíjím od roku 2015 a nejvíc mě baví mít projekt celý v rukou a nést za něj odpovědnost od začátku do konce. Nejednáte s agenturou ani s prostředníkem, ale přímo s vývojářem, který bude váš projekt znát do detailu. Záleží mi na tom, aby se aplikace příjemně používala a aby se její kód dal snadno udržovat i za několik let.',
    photoAlt: 'Portrét Daniela Vágnera, vývojáře webových a mobilních aplikací',
    factsLabel: 'Ve zkratce',
    facts: [
      { value: 'Web · mobil · backend', label: 'kompletní vývoj' },
      { value: 'Od roku 2015', label: 'na volné noze' },
      { value: 'Bosch · Medtronic · Embitron', label: 'zkušenosti z velkých projektů' },
      { value: 'Praha · na dálku', label: 'česky i anglicky' },
    ],
  },
  en: {
    eyebrow: 'About me',
    titleLine1: '11+ years of building.',
    titleLine2: 'Still curious.',
    lead:
      'I’m a Senior Software Engineer. At HTEC, I’m currently building Tolion Health, a mobile health app (Ionic, Angular, ASP.NET). Before that I spent several years at CertiCon, where I grew into a Software Architect role, led smaller teams and worked on projects for Bosch, Medtronic and Embitron. What I learned on large projects, I bring to smaller ones too.',
    body:
      'I’ve been freelancing since 2015, and what I enjoy most is owning a project and taking responsibility for it from start to finish. You don’t deal with an agency or a middleman – you work directly with the developer who knows your project inside out. I care about apps that are a pleasure to use and code that stays easy to maintain years from now.',
    photoAlt: 'Portrait of Daniel Vágner, web and mobile app developer',
    factsLabel: 'At a glance',
    facts: [
      { value: 'Web · mobile · back end', label: 'across the stack' },
      { value: 'Since 2015', label: 'freelancing' },
      { value: 'Bosch · Medtronic · Embitron', label: 'large-project experience' },
      { value: 'Prague · remote', label: 'Czech & English' },
    ],
  },
};
