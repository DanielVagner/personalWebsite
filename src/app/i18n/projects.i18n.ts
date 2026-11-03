import { Translated } from '../core/language.service';

export type ProjectId = 'tolion' | 'hudba' | 'mdas' | 'qrticket' | 'findtastic' | 'ccvision' | 'tpodlahy' | 'erp';

/** Background of the preview frame (see _project-themes.scss). */
export type ProjectTheme = 'teal' | 'plum' | 'slate' | 'berry' | 'blue' | 'navy' | 'earth';

/**
 * How the visuals are presented:
 * - browser: screenshot of a web/desktop UI inside a window frame
 * - plain: image that already contains devices, shown as a rounded card
 * - logo: logo only, on a light panel
 * - logo-phones: logo panel plus phone screenshots
 */
export type ProjectMediaKind = 'browser' | 'plain' | 'logo' | 'logo-phones';

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
}

/** Language independent part of a project. */
export interface ProjectBase {
  id: ProjectId;
  theme: ProjectTheme;
  media: ProjectMediaKind;
  image: ProjectImage;
  phones?: readonly ProjectImage[];
  /** Technology names, shared by all languages. */
  tags: readonly string[];
  url?: string;
  featured?: boolean;
}

/** Localized part of a project. */
export interface ProjectCopy {
  kicker: string;
  title: string;
  type: string;
  summary: string;
  alt: string;
  /** Shown under the project type in the case study, e.g. when the visuals are illustrative. */
  mediaNote?: string;
  phoneAlts?: readonly string[];
  brief: string;
  solution: string;
  features: readonly string[];
  role: string;
  /** Localized generic tags, appended after the shared technology tags. */
  extraTags?: readonly string[];
}

export type Project = ProjectBase & ProjectCopy;

export interface ProjectsText {
  eyebrow: string;
  title: string;
  titleMuted: string;
  intro: string;
  caseStudy: string;
  openSuffix: string;
  tagsLabel: string;
  dialog: {
    close: string;
    brief: string;
    solution: string;
    role: string;
    tech: string;
    visit: string;
    newTab: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
  };
  items: Record<ProjectId, ProjectCopy>;
}

const img = (name: string, width: number, height: number): ProjectImage => ({
  src: `/images/projects/${name}`,
  width,
  height,
});

export const PROJECTS: readonly ProjectBase[] = [
  {
    id: 'tolion',
    theme: 'teal',
    media: 'browser',
    image: img('tolion.webp', 1600, 879),
    tags: ['Angular', 'Ionic + Capacitor', 'ASP.NET', 'HealthKit', 'AI/ML'],
    featured: true,
  },
  {
    id: 'hudba',
    theme: 'plum',
    media: 'plain',
    image: img('hudba-vinice.webp', 1800, 1200),
    tags: ['React Native', 'TypeScript'],
  },
  {
    id: 'mdas',
    theme: 'slate',
    media: 'browser',
    image: img('mdas.webp', 1600, 899),
    tags: ['Angular', 'TypeScript', 'C#', 'Electron', 'Figma'],
  },
  {
    id: 'qrticket',
    theme: 'berry',
    media: 'logo',
    image: img('qr-ticket.webp', 533, 239),
    tags: ['React Native'],
  },
  {
    id: 'findtastic',
    theme: 'blue',
    media: 'logo-phones',
    image: img('logo-findtastic.webp', 913, 411),
    phones: [img('findtastic-1.webp', 499, 1080), img('findtastic-2.webp', 499, 1087)],
    tags: ['React Native', 'TypeScript'],
  },
  {
    id: 'ccvision',
    theme: 'navy',
    media: 'browser',
    image: img('CCVis.webp', 1600, 672),
    tags: ['Angular', 'TypeScript', 'Adobe XD'],
  },
  {
    id: 'tpodlahy',
    theme: 'earth',
    media: 'browser',
    image: img('tpodlahy-web.webp', 1800, 1125),
    tags: ['React', 'TypeScript', 'SCSS'],
    url: 'https://tpodlahy.cz',
  },
  {
    id: 'erp',
    theme: 'navy',
    media: 'plain',
    image: img('erp-systemy.webp', 1800, 1200),
    tags: ['Angular', 'TypeScript', 'RxJS', 'NgXs', 'Material CDK'],
    featured: true,
  },
];

/** Czech typography: non-breaking space after one-letter prepositions and conjunctions. */
function nbsp<T>(value: T): T {
  if (typeof value === 'string') {
    return value.replace(/(?<=^|[\s(„])([aiouvkszAIOUVKSZ]) /g, '$1 ') as T;
  }
  if (Array.isArray(value)) return value.map(nbsp) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, nbsp(v)])) as T;
  }
  return value;
}

export const PROJECTS_TEXT: Translated<ProjectsText> = {
  cs: nbsp<ProjectsText>({
    eyebrow: 'Vybrané projekty',
    title: 'Různé produkty.',
    titleMuted: 'Stejná pečlivost.',
    intro: 'Aplikace pro zdraví mozku, koncerty a vstupenky, zdravotnické přístroje, řízení výroby, nakupování online i počítačové vidění – a k tomu firemní web. Na mobilu, na webu i na desktopu.',
    caseStudy: 'Případová studie',
    openSuffix: ' – otevřít případovou studii',
    tagsLabel: 'Použité technologie',
    dialog: {
      close: 'Zavřít případovou studii',
      brief: 'Zadání',
      solution: 'Řešení',
      role: 'Moje role',
      tech: 'Technologie',
      visit: 'Navštívit web',
      newTab: '(otevře se na nové kartě)',
      ctaTitle: 'Máte podobný projekt?',
      ctaText: 'Ozvěte se a společně vymyslíme, jak ho postavit.',
      ctaButton: 'Probrat projekt',
    },
    items: {
      tolion: {
        kicker: 'TOLION / ZDRAVÍ MOZKU',
        title: 'Tolion – Brain Health Coach',
        type: 'Mobilní aplikace',
        summary:
          'Aplikace pro zdraví mozku s AI koučem, osobními doporučeními aktivit a sledováním kognitivní výkonnosti.',
        alt: 'Webové stránky aplikace Tolion se dvěma obrazovkami v telefonu: rizikové faktory a věk mozku',
        brief:
          'Dát lidem do ruky osobního kouče pro zdraví mozku – aplikaci, která poradí, co pro svůj mozek dělat, a ukáže, jak se jim daří. Aplikace přitom musí spolehlivě běžet na telefonu, bezpečně pracovat se zdravotními daty a napojit se na služby a zařízení, které lidé už používají: Apple HealthKit a hodinky Garmin.',
        solution:
          'Mobilní aplikace postavená na Ionicu, Angularu a Capacitoru s backendem v ASP.NET Web API. Je dostupná v App Storu.',
        features: [
          'AI kouč s doporučeními aktivit na míru',
          'Sledování kognitivní výkonnosti a ukazatel věku mozku (Brain Age)',
          'Týdenní přehledy pokroku',
          'Napojení na Apple HealthKit a Garmin Health',
        ],
        role: 'Na projektu pracuji ve společnosti HTEC jako Senior Software Engineer a vyvíjím mobilní aplikaci i API. Mám na starosti architekturu, přihlašování přes Azure AD B2C s PKCE, napojení na HealthKit a Garmin, výkon i to, aby se aplikace dobře používala.',
      },
      hudba: {
        kicker: 'KONCERTY / OPEN AIR',
        title: 'Hudba na vinicích',
        type: 'Mobilní aplikace',
        summary:
          'Aplikace pro koncerty pod širým nebem na vinicích: program, nákup vstupenek, hledání akcí podle polohy a navigace na místo.',
        alt: 'Tři obrazovky aplikace Hudba na vinicích: úvod s nejbližším koncertem, odpočtem a počasím, přehled koncertů s filtry a seznam vinařství',
        brief:
          'Série koncertů pod širým nebem na českých vinicích potřebovala aplikaci, ve které návštěvníci najdou program, koupí si vstupenky a bez bloudění dojedou až na místo.',
        solution:
          'Mobilní aplikace v React Native, která návštěvníka provede od výběru koncertu až na místo konání.',
        features: [
          'Přehled koncertů a vyhledávání akcí podle polohy',
          'Nákup vstupenek přes platební bránu',
          'Odpočet do nejbližšího koncertu a předpověď počasí',
          'Detail vinařství s GPS souřadnicemi, navigací a programem dne',
          'Vstupenky s QR kódem přímo v aplikaci',
          'Filtrování koncertů podle data, místa a interpreta',
        ],
        role: 'Šlo o zakázku na volné noze. Celou aplikaci jsem sám napsal v React Native a TypeScriptu, včetně práce s polohou, navigace a napojení na platební bránu.',
        extraTags: ['Geolokace', 'Platební brána'],
      },
      mdas: {
        kicker: 'ZDRAVOTNICTVÍ / BEZPEČNOST',
        title: 'MDAS – Data Analysis Software',
        type: 'Desktopová aplikace',
        summary:
          'Desktopová aplikace, která u implantabilních zdravotnických přístrojů hlídá bezpečnostní upozornění a soulad s předpisy.',
        alt: 'Rozhraní aplikace MDAS se souhrnem záznamu a přehledem kanálů EKG a EGM',
        brief:
          'U implantabilních zdravotnických přístrojů, jako jsou inzulínové pumpy, kardiostimulátory a defibrilátory, je nutné hlídat bezpečnostní upozornění a soulad s předpisy. Cílem bylo vytvořit desktopovou aplikaci, která záznamy z přístrojů přehledně zpracuje a zobrazí.',
        solution: 'Desktopová aplikace postavená na Angularu a Electronu s částmi napsanými v C#.',
        features: [
          'Sledování bezpečnostních upozornění a souladu s předpisy',
          'Souhrn záznamu z přístroje',
          'Přehled kanálů EKG a EGM',
        ],
        role: 'Podílel jsem se na vývoji aplikace: psal jsem frontend v Angularu a TypeScriptu, který běží v Electronu, pracoval na části v C# a převáděl návrhy z Figmy do funkčního rozhraní.',
      },
      qrticket: {
        kicker: 'AKCE / ODBAVENÍ',
        title: 'QR Ticketing System',
        type: 'Mobilní aplikace',
        summary:
          'Aplikace pro odbavení návštěvníků na akcích: skenování QR vstupenek online i offline, přehled návštěvnosti a exporty pro pořadatele.',
        alt: 'Logo xticket.cz',
        brief:
          'Pořadatelé akcí potřebovali rychle a spolehlivě odbavovat návštěvníky u vstupu – i tam, kde je slabý nebo žádný signál – a mít po akci k dispozici přehled o návštěvnosti.',
        solution: 'Mobilní aplikace v React Native navržená tak, aby fungovala i bez připojení (offline-first).',
        features: [
          'Skenování QR kódů vstupenek',
          'Online i offline režim',
          'Průběžný přehled návštěvnosti',
          'Export přehledů pro pořadatele',
        ],
        role: 'Vyvíjel jsem mobilní aplikaci v React Native, včetně skenování QR kódů, práce s daty bez připojení, přehledů návštěvnosti a exportů.',
        extraTags: ['Offline režim', 'Skenování QR', 'Analytika', 'Exporty'],
      },
      findtastic: {
        kicker: 'NAKUPOVÁNÍ / USA',
        title: 'Findtastic',
        type: 'Mobilní aplikace',
        summary:
          'Srovnávač cen pro zákazníky v USA – sleduje ceny v různých e-shopech a průběžně ukazuje nejlepší nabídky.',
        alt: 'Logo Findtastic',
        phoneAlts: [
          'Úvodní obrazovka aplikace Findtastic s přihlášením, registrací a vyhledávacím formulářem',
          'Výsledky hledání ve Findtasticu: nabídky produktu z různých e-shopů seřazené podle ceny',
        ],
        brief:
          'Ušetřit lidem při nakupování online čas i peníze: místo procházení jednoho e-shopu za druhým jim nabídnout přehled, kde je produkt právě nejvýhodnější.',
        solution: 'Mobilní aplikace v React Native a TypeScriptu napojená přes REST API na data o cenách.',
        features: [
          'Sledování cen v různých e-shopech',
          'Aktuálně nejvýhodnější nabídky',
          'Vyhledávání produktů podle názvu a cenového rozpětí',
          'Funguje s registrací i bez ní',
        ],
        role: 'Vyvíjel jsem mobilní aplikaci v React Native a TypeScriptu včetně napojení na REST API.',
        extraTags: ['REST API'],
      },
      ccvision: {
        kicker: 'POČÍTAČOVÉ VIDĚNÍ / HARDWARE',
        title: 'CCVision – Computer Vision',
        type: 'Webová aplikace',
        summary:
          'Webová aplikace, která v reálném čase vyhledává a rozpoznává objekty v obraze a dá se propojit s různým hardwarem.',
        alt: 'Úvodní stránka CCVis: pokročilá analýza videa a přehled nabízených řešení',
        brief:
          'Vytvořit jedno webové rozhraní pro počítačové vidění, které funguje bez ohledu na to, na jakém hardwaru analýza obrazu běží.',
        solution: 'Webová aplikace v Angularu a TypeScriptu s rozhraním navrženým v Adobe XD.',
        features: [
          'Detekce a rozpoznávání objektů v reálném čase',
          'Propojení s různým hardwarem',
        ],
        role: 'Podílel jsem se na vývoji frontendu v Angularu a TypeScriptu podle návrhů z Adobe XD.',
      },
      erp: {
        kicker: 'ERP / VÝROBA',
        title: 'ERP systémy a řízení výroby',
        type: 'Webové aplikace',
        summary:
          'Interní ERP systémy a nástroj pro řízení výrobní linky: průběžný přehled výroby i kvality a podklady pro rozhodování.',
        mediaNote: 'Ilustrační náhled – skutečné systémy jsou interní a neveřejné.',
        alt: 'Ilustrační náhled dvou interních systémů: přehled ERP s tržbami, objednávkami a sklady a řízení výrobní linky s výkonem, stavem stanic a vadami',
        brief:
          'Firmy potřebovaly interní systémy pro každodenní provoz – na běžnou administrativu i na sledování výrobní linky. Zaměstnanci se v nich měli rychle zorientovat a mít potřebná data vždy po ruce.',
        solution:
          'Webové aplikace v Angularu a TypeScriptu. Tok dat a stav aplikace řeší RxJS a NgXs, rozhraní je složené z vlastních komponent postavených na Angular Material CDK.',
        features: [
          'Interní ERP systém s vlastní knihovnou komponent nad Material CDK',
          'Řízení výrobní linky v reálném čase',
          'Sledování toku dílů a ukazatelů kvality',
          'Podklady pro zlepšování výroby',
        ],
        role: 'Na ERP systémech jsem pracoval opakovaně – jako frontendový vývojář ve Foxconnu a později jako Senior Engineer v CertiConu. Stavěl jsem uživatelská rozhraní i znovupoužitelné komponenty a řešil práci s daty.',
      },
      tpodlahy: {
        kicker: 'PODLAHY / WEB',
        title: 'TPodlahy.cz',
        type: 'Webová prezentace',
        summary:
          'Web pro podlahářskou firmu: přehled služeb, fotogalerie, kontaktní formulář a informace o vinylu, laminátu i renovaci parket.',
        alt: 'Úvodní stránka webu TPodlahy.cz s nadpisem „Podlahy, které vydrží celý život.“ a fotkou pokládky parket',
        brief:
          'Podlahářská firma potřebovala web, který srozumitelně představí její služby, ukáže hotovou práci a zákazníkům usnadní první kontakt.',
        solution: 'Web v Reactu a TypeScriptu, který dobře funguje na mobilu i na počítači.',
        features: [
          'Přehled služeb',
          'Fotogalerie',
          'Kontaktní formulář',
          'Informace o vinylových podlahách, laminátu a renovaci parket',
        ],
        role: 'Web jsem vyvinul v Reactu a TypeScriptu, styly napsal v SCSS a rozvržení přizpůsobil všem velikostem obrazovek.',
        extraTags: ['Responzivní design'],
      },
    },
  }),
  en: {
    eyebrow: 'Selected work',
    title: 'Different products.',
    titleMuted: 'Same level of care.',
    intro: 'Brain health, concerts and ticketing, medical devices, ERP and manufacturing, online shopping, computer vision and a company website – on mobile, web and desktop.',
    caseStudy: 'Case study',
    openSuffix: ' – open case study',
    tagsLabel: 'Technologies used',
    dialog: {
      close: 'Close case study',
      brief: 'The brief',
      solution: 'The solution',
      role: 'My role',
      tech: 'Tech stack',
      visit: 'Visit website',
      newTab: '(opens in a new tab)',
      ctaTitle: 'Got a similar project?',
      ctaText: 'Get in touch and we’ll work out the best way to build it.',
      ctaButton: 'Discuss a project',
    },
    items: {
      tolion: {
        kicker: 'TOLION / BRAIN HEALTH',
        title: 'Tolion – Brain Health Coach',
        type: 'Mobile app',
        summary:
          'Brain health app with an AI coach, personalized activity recommendations and cognitive performance tracking.',
        alt: 'Tolion app website with two phone screens showing risk factors and Brain Age',
        brief:
          'Give people a personal brain health coach: an app that suggests what to do for their brain and shows how they’re doing. It has to run reliably on a phone, handle health data securely and connect to the sources people already use – Apple HealthKit and Garmin watches.',
        solution:
          'A mobile app built with Ionic, Angular and Capacitor, backed by an ASP.NET Web API. It is available on the App Store.',
        features: [
          'AI coach and personalized activity recommendations',
          'Cognitive performance tracking and a Brain Age indicator',
          'Weekly progress summaries',
          'Apple HealthKit and Garmin Health integration',
        ],
        role: 'I work on the app at HTEC as a Senior Software Engineer across the whole stack, from the mobile app to the API. I’m responsible for the architecture, sign-in with Azure AD B2C and PKCE, the HealthKit and Garmin integrations, performance and UX.',
      },
      hudba: {
        kicker: 'CONCERTS / OPEN AIR',
        title: 'Hudba na vinicích',
        type: 'Mobile app',
        summary:
          'App for open-air concerts in vineyards: lineup, ticket sales, location-based event search and directions to the venue.',
        alt: 'Three Hudba na vinicích app screens: home with the nearest concert, countdown and weather, the concert list with filters, and the list of wineries',
        brief:
          'A Czech series of open-air concerts held in vineyards needed an app where visitors can find concerts, buy tickets and get to the right vineyard without getting lost.',
        solution: 'A React Native app that takes visitors from picking a concert all the way to the venue.',
        features: [
          'Concert listing and location-based event search',
          'Ticket purchase through a payment gateway',
          'Countdown to your nearest concert and a weather forecast',
          'Winery detail with GPS coordinates, navigation and the day schedule',
          'Tickets right in the app with a QR code for entry',
          'Concert filters by date, venue and artist',
        ],
        role: 'A freelance project I built entirely on my own in React Native and TypeScript – from the screens through geolocation and navigation to the payment gateway integration.',
        extraTags: ['Geolocation', 'Payment gateway'],
      },
      mdas: {
        kicker: 'MEDICAL / SAFETY',
        title: 'MDAS – Data Analysis Software',
        type: 'Desktop app',
        summary:
          'Desktop app for monitoring safety alerts and regulatory compliance of implantable medical devices.',
        alt: 'MDAS interface with a recording summary and an overview of ECG and EGM channels',
        brief:
          'Implantable medical devices such as insulin pumps, pacemakers and defibrillators require close monitoring of safety alerts and regulatory compliance. The goal was a desktop application that processes device recordings and presents them clearly.',
        solution: 'A desktop application built with Angular and Electron, with parts written in C#.',
        features: [
          'Safety alert and regulatory compliance monitoring',
          'Device recording summary',
          'ECG and EGM channel overview',
        ],
        role: 'I contributed to the development: the Angular and TypeScript front end running in Electron, work on the C# side, and turning Figma designs into a working interface.',
      },
      qrticket: {
        kicker: 'EVENTS / CHECK-IN',
        title: 'QR Ticketing System',
        type: 'Mobile app',
        summary:
          'Event check-in app: QR ticket scanning online or offline, attendance tracking and exports for organizers.',
        alt: 'xticket.cz logo',
        brief:
          'Event organizers needed fast, reliable check-in at the entrance – even where the signal is weak or missing – and a clear picture of attendance once the event is over.',
        solution: 'A React Native mobile app designed to work without a connection (offline-first).',
        features: [
          'QR ticket scanning',
          'Online and offline mode',
          'Real-time attendance tracking',
          'Exportable reports for organizers',
        ],
        role: 'Development of the React Native app: QR scanning, offline-first data handling, attendance overviews and exports.',
        extraTags: ['Offline mode', 'QR scanning', 'Analytics', 'Exports'],
      },
      findtastic: {
        kicker: 'RETAIL / US',
        title: 'Findtastic',
        type: 'Mobile app',
        summary:
          'Price comparison for US shoppers – tracks prices across online stores and surfaces the best deals in real time.',
        alt: 'Findtastic logo',
        phoneAlts: [
          'Findtastic welcome screen with log-in, registration and the product search form',
          'Findtastic search results: offers for one product from different stores, sorted by price',
        ],
        brief:
          'Save people time and money when shopping online: instead of checking store after store, give them one place that shows where a product is cheapest right now.',
        solution: 'A React Native and TypeScript app that pulls price data through REST APIs.',
        features: [
          'Price tracking across online stores',
          'Best deals in real time',
          'Product search by name and price range',
          'Works with or without an account',
        ],
        role: 'Development of the React Native and TypeScript app and its REST API integration.',
        extraTags: ['REST APIs'],
      },
      ccvision: {
        kicker: 'COMPUTER VISION / HARDWARE',
        title: 'CCVision – Computer Vision',
        type: 'Web app',
        summary:
          'Web app for real-time object detection and recognition, integrated with various hardware platforms.',
        alt: 'CCVis landing page about advanced video analytics with an overview of solutions',
        brief:
          'Bring computer vision to users through a single web interface, whatever hardware the image analysis runs on.',
        solution: 'A web application in Angular and TypeScript, with the interface designed in Adobe XD.',
        features: ['Real-time object detection and recognition', 'Integration with various hardware platforms'],
        role: 'I contributed to the Angular and TypeScript front end, built from Adobe XD designs.',
      },
      erp: {
        kicker: 'ERP / MANUFACTURING',
        title: 'ERP and production systems',
        type: 'Web apps',
        summary:
          'Internal ERP systems and a real-time production line tool: production overview, quality metrics and the data to run day-to-day operations.',
        mediaNote: 'Illustrative preview – the real systems are internal and not public.',
        alt: 'Illustrative preview of two internal systems: an ERP overview with revenue, orders and warehouses, and production line monitoring with output, station status and defects',
        brief:
          'Companies needed internal systems for day-to-day operations – from records and business processes to monitoring a production line in real time. People have to find their way around quickly and have the data they need at hand.',
        solution:
          'Web apps in Angular and TypeScript, with RxJS and NgXs for state management and custom components built on the Angular Material CDK.',
        features: [
          'Internal ERP system with a custom component library on the Material CDK',
          'Real-time production line management',
          'Tracking of component flow and quality metrics',
          'Data for optimizing manufacturing processes',
        ],
        role: 'I have worked on ERP systems several times – as a front-end developer at Foxconn and later as a senior engineer at CertiCon – building the user interfaces, application state management and reusable components.',
      },
      tpodlahy: {
        kicker: 'FLOORING / WEB',
        title: 'TPodlahy.cz',
        type: 'Website',
        summary:
          'Website for a flooring company: services, photo gallery, contact form and information on vinyl, laminate and parquet renovation.',
        alt: 'TPodlahy.cz homepage with the headline “Floors that last a lifetime.” and a photo of parquet being laid',
        brief:
          'A flooring company needed a website that explains its services clearly, shows finished work and makes it easy for customers to get in touch.',
        solution: 'A responsive website in React and TypeScript that works well on phones and desktops alike.',
        features: [
          'Services overview',
          'Photo gallery',
          'Contact form',
          'Information on vinyl floors, laminate and parquet renovation',
        ],
        role: 'Development of the site in React and TypeScript, styling in SCSS and a responsive layout for every screen size.',
        extraTags: ['Responsive design'],
      },
    },
  },
};
