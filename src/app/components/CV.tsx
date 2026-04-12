import { useNavigate } from 'react-router';
import { ArrowLeft, Printer, Mail, MapPin, Globe } from 'lucide-react';
import { Badge } from './ui/badge';

export function CV() {
  const navigate = useNavigate();

  const skills = {
    Frontend: ['Angular', 'React', 'TypeScript', 'Ionic', 'RxJS', 'NgXs', 'HTML5', 'SCSS'],
    Mobile: ['React Native', 'Capacitor', 'iOS', 'Android', 'HealthKit', 'Garmin'],
    Backend: ['C#', 'ASP.NET Web API', '.NET', 'Node.js'],
    Cloud: ['Azure AD B2C', 'Microsoft Azure', 'Vercel'],
    Tools: ['Git', 'Figma', 'AdobeXD', 'Webpack'],
  };

  const experiences = [
    {
      company: 'HTEC',
      position: 'Senior Software Engineer',
      period: 'Nov 2025 - Present',
      location: 'Prague, Czechia - Remote',
      description: 'Building a mobile-first health product at Tolion Health. Full-stack across Ionic + Angular + Capacitor and ASP.NET Web API, with a focus on architecture, Azure AD B2C/PKCE auth, HealthKit/Garmin integration, performance, and UX.',
    },
    {
      company: 'Freelance Software Engineer',
      position: 'Software Engineer',
      period: '2015 - Present',
      location: 'Remote',
      description: 'Building native mobile apps for iOS and Android, primarily with Angular + Ionic and React Native, handling everything from development to App Store and Google Play deployment.',
    },
    {
      company: 'CertiCon a.s.',
      position: 'Software Architect → Senior Software Engineer',
      period: 'Aug 2020 - Dec 2025',
      location: 'Prague, Czechia',
      description: 'Led architecture and development of enterprise-grade Angular applications including Bosch diagnostics platform (Micro Frontends, module federation), Embitron healthcare cloud app (C#, ASP.NET, Azure), and internal ERP system.',
    },
    {
      company: 'CCVis s.r.o.',
      position: 'Senior Software Engineer',
      period: 'Oct 2022 - Dec 2022',
      location: 'Pardubice, Czechia',
      description: 'Web application development for SaaS subscription activation on Microsoft Azure Marketplace. Front-end standardization and performance refactoring.',
    },
    {
      company: 'Foxconn CZ s.r.o.',
      position: 'Front-end Developer',
      period: 'Sep 2018 - Dec 2019',
      location: 'Pardubice, Czechia',
      description: 'Developed front-end solutions for ERP system and production line management application with real-time monitoring of assembly lines.',
    },
    {
      company: 'EDUCA',
      position: 'IT',
      period: 'Sep 2017 - Sep 2018',
      location: 'Pardubice, Czechia',
      description: '',
    },
    {
      company: 'Web Developer a Servisní Technik',
      position: 'Web Developer',
      period: 'Jul 2016 - Dec 2016',
      location: 'Hradec Králové, Czechia',
      description: 'Angular 2+, HTML5, CSS3 (SCSS), JavaScript, PrestaShop.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <style>{`
        @page { margin: 0; size: A4; }
        @media print {
          .cv-toolbar { display: none !important; }
          body { background: white !important; }
          .cv-wrapper { box-shadow: none !important; border-radius: 0 !important; }
          .cv-exp-item { page-break-inside: avoid; break-inside: avoid; }
          .cv-section { page-break-inside: avoid; break-inside: avoid; }
        }
      `}</style>

      {/* Toolbar */}
      <div className="cv-toolbar max-w-4xl mx-auto mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Save as PDF
        </button>
      </div>

      {/* CV Content */}
      <div className="cv-wrapper max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 text-white px-10 py-8">
          <h1 className="text-3xl font-bold mb-1">Daniel Vágner</h1>
          <p className="text-blue-400 text-lg font-medium mb-4">Software Architect & Front-End Developer</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              danielvagner05@gmail.com
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Prague, Czechia
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              daniel-vagner.dev
            </span>
          </div>
        </div>

        <div className="px-10 py-8 space-y-8">
          {/* Summary */}
          <section className="cv-section">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3">Summary</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Software Architect with 10+ years of experience specializing in Angular, React, and modern front-end technologies.
              Experienced in building enterprise-grade applications, mobile apps (iOS & Android), and full-stack solutions
              using C#, .NET, and the Microsoft ecosystem. Passionate about clean architecture, performance, and developer experience.
            </p>
          </section>

          {/* Skills */}
          <section className="cv-section">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3">Skills</h2>
            <div className="space-y-2">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="flex gap-3 items-start">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-20 shrink-0 pt-0.5">{category}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="cv-section">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">Experience</h2>
            <div className="space-y-5">
              {experiences.map((exp, i) => (
                <div key={i} className="cv-exp-item flex gap-4">
                  <div className="w-1 bg-blue-200 rounded-full shrink-0 mt-1.5" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{exp.position}</p>
                        <p className="text-blue-600 text-sm font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-gray-500">{exp.period}</p>
                        <p className="text-xs text-gray-400">{exp.location}</p>
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{exp.description}</p>
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
