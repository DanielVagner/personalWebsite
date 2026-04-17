import { useNavigate } from 'react-router';
import { ArrowLeft, Printer, Mail, MapPin, Globe } from 'lucide-react';

const skills: Record<string, string[]> = {
  Frontend: ['Angular', 'React', 'TypeScript', 'Ionic', 'RxJS', 'NgXs', 'HTML5', 'SCSS'],
  Mobile: ['React Native', 'Capacitor', 'iOS', 'Android', 'HealthKit', 'Garmin SDK'],
  Backend: ['C#', 'ASP.NET Web API', '.NET', 'Node.js'],
  Cloud: ['Azure AD B2C', 'Microsoft Azure', 'Vercel'],
  Tools: ['Git', 'Figma', 'AdobeXD', 'Webpack', 'Azure DevOps'],
};

const experiences = [
  {
    company: 'HTEC',
    position: 'Senior Software Engineer',
    period: 'Nov 2025 – Present',
    location: 'Prague, Czechia · Remote',
    description: 'Building a mobile-first health product at Tolion Health. Full-stack across Ionic + Angular + Capacitor and ASP.NET Web API, with a focus on architecture, Azure AD B2C/PKCE auth, HealthKit/Garmin integration, performance, and UX.',
  },
  {
    company: 'Freelance Software Engineer',
    position: 'Software Engineer',
    period: '2015 – Present',
    location: 'Remote',
    description: 'Building native mobile apps for iOS and Android, primarily with Angular + Ionic and React Native, handling everything from development to App Store and Google Play deployment.',
  },
  {
    company: 'CertiCon a.s.',
    position: 'Software Architect → Senior Software Engineer',
    period: 'Aug 2020 – Dec 2025',
    location: 'Prague, Czechia',
    description: 'Led architecture and development of enterprise Angular applications: Bosch diagnostics platform (Micro Frontends, module federation), Embitron healthcare cloud app (C#, ASP.NET, Azure), and internal ERP system.',
  },
  {
    company: 'CCVis s.r.o.',
    position: 'Senior Software Engineer',
    period: 'Oct 2022 – Dec 2022',
    location: 'Pardubice, Czechia',
    description: 'Web application for SaaS subscription activation on the Microsoft Azure Marketplace. Front-end standardisation and performance refactoring.',
  },
  {
    company: 'Foxconn CZ s.r.o.',
    position: 'Front-End Developer',
    period: 'Sep 2018 – Dec 2019',
    location: 'Pardubice, Czechia',
    description: 'Front-end for ERP system and production line management application with real-time monitoring of assembly lines, component flow, and quality metrics.',
  },
  {
    company: 'EDUCA',
    position: 'IT',
    period: 'Sep 2017 – Sep 2018',
    location: 'Pardubice, Czechia',
    description: '',
  },
  {
    company: 'Web Developer & Service Technician',
    position: 'Web Developer',
    period: 'Jul 2016 – Dec 2016',
    location: 'Hradec Králové, Czechia',
    description: 'Angular 2+, HTML5, CSS3 (SCSS), JavaScript, PrestaShop.',
  },
];

export function CV() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 py-8 px-4">
      <style>{`
        @page { margin: 12mm 14mm; size: A4; }
        @media print {
          .cv-toolbar { display: none !important; }
          body { background: white !important; -webkit-print-color-adjust: exact; }
          .cv-page { box-shadow: none !important; border-radius: 0 !important; margin: 0 !important; max-width: none !important; }
          .cv-exp-item { page-break-inside: avoid; break-inside: avoid; }
          .cv-section { page-break-inside: avoid; break-inside: avoid; }
        }
      `}</style>

      {/* Toolbar */}
      <div className="cv-toolbar max-w-4xl mx-auto mb-5 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Save as PDF
        </button>
      </div>

      {/* CV Document */}
      <div className="cv-page max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="px-10 py-9 border-b border-zinc-100">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1
                className="text-4xl font-bold text-zinc-900 mb-1 tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Daniel Vágner
              </h1>
              <p className="text-base text-indigo-600 font-medium mb-4">
                Software Architect & Front-End Developer
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-zinc-400" />
                  danielvagner05@gmail.com
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-zinc-400" />
                  Prague, Czechia
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-zinc-400" />
                  daniel-vagner.dev
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-zinc-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  linkedin.com/in/danielvagner
                </span>
              </div>
            </div>
            {/* Accent block */}
            <div className="w-1.5 self-stretch rounded-full bg-gradient-to-b from-indigo-500 to-violet-500 shrink-0 hidden sm:block" />
          </div>
        </div>

        <div className="px-10 py-8 space-y-7">

          {/* Summary */}
          <section className="cv-section">
            <SectionTitle>Summary</SectionTitle>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Software Architect / Senior Software Engineer with 10+ years of experience specialising in Angular,
              React, and modern front-end technologies. Experienced in building enterprise-grade applications,
              mobile apps (iOS & Android), and full-stack solutions using C#, .NET, and the Microsoft ecosystem.
              Passionate about clean architecture, performance, and developer experience.
            </p>
          </section>

          {/* Skills */}
          <section className="cv-section">
            <SectionTitle>Skills</SectionTitle>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="flex gap-4 items-start">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest w-16 shrink-0 pt-0.5">
                    {category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md text-xs bg-zinc-100 text-zinc-700 border border-zinc-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="cv-section">
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-5">
              {experiences.map((exp, i) => (
                <div key={i} className="cv-exp-item flex gap-4">
                  <div className="w-0.5 bg-indigo-200 rounded-full shrink-0 mt-1.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <p className="font-semibold text-zinc-900 text-sm">{exp.position}</p>
                        <p className="text-indigo-600 text-xs font-medium mt-0.5">{exp.company}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-zinc-500 font-medium">{exp.period}</p>
                        <p className="text-xs text-zinc-400 mt-0.5">{exp.location}</p>
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-xs font-bold text-zinc-400 uppercase tracking-[0.18em] border-b border-zinc-100 pb-2 mb-3"
      style={{ fontFamily: 'var(--font-display)' }}
    >
      {children}
    </h2>
  );
}
