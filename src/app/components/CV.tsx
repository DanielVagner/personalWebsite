import { useNavigate } from 'react-router';
import { ArrowLeft, Printer, Mail, MapPin, Globe } from 'lucide-react';
import profilePic from '../../assets/profilpicture.jpg';

const skills: Record<string, string[]> = {
  'Front-End': ['Angular', 'React', 'TypeScript', 'Ionic', 'RxJS', 'NgXs', 'HTML5', 'SCSS'],
  'Mobile': ['React Native', 'Capacitor', 'iOS', 'Android', 'HealthKit', 'Garmin SDK'],
  'Back-End': ['C#', 'ASP.NET Web API', '.NET', 'Node.js'],
  'Cloud & Tools': ['Azure AD B2C', 'Microsoft Azure', 'Git', 'Figma', 'Webpack', 'Vercel'],
};

const experiences = [
  {
    company: 'HTEC',
    position: 'Senior Software Engineer',
    period: 'Nov 2025 – Present',
    location: 'Prague · Remote',
    current: true,
    description: 'Building a mobile-first health product (Tolion Health). Full-stack across Ionic + Angular + Capacitor and ASP.NET Web API — architecture, Azure AD B2C/PKCE auth, HealthKit/Garmin integration, performance and UX.',
  },
  {
    company: 'Freelance',
    position: 'Mobile & Web Developer',
    period: '2015 – Present',
    location: 'Remote',
    current: true,
    description: 'End-to-end development of web and mobile applications. On mobile, I work primarily with Ionic + Capacitor (formerly Cordova) and React Native, delivering native apps for both iOS and Android — from development through App Store and Google Play deployment.',
  },
  {
    company: 'CertiCon a.s.',
    position: 'Software Architect / Senior Software Engineer',
    period: 'Aug 2020 – Dec 2025',
    location: 'Prague',
    description: 'Architecture and development of large Angular enterprise apps. Bosch diagnostics platform (Micro Frontends, module federation), Embitron healthcare cloud (C#, ASP.NET, Azure), and internal ERP system. Technical direction, code quality, team mentoring.',
  },
  {
    company: 'CCVis s.r.o.',
    position: 'Senior Software Engineer',
    period: 'Oct – Dec 2022',
    location: 'Pardubice',
    description: 'SaaS subscription activation app on Microsoft Azure Marketplace. Front-end standardisation and performance refactoring.',
  },
  {
    company: 'Foxconn CZ s.r.o.',
    position: 'Front-End Developer',
    period: 'Sep 2018 – Dec 2019',
    location: 'Pardubice',
    description: 'ERP and production line management app with real-time assembly line monitoring, component tracking, and quality metrics.',
  },
];

const education = [
  {
    school: 'Secondary School, Malé Svatoňovice',
    degree: 'Security and Protection Studies',
    credential: 'Secondary School Leaving Certificate',
    period: '2010 – 2013',
  },
];

export function CV() {
  const navigate = useNavigate();

  return (
    <div className="cv-wrapper min-h-screen bg-zinc-100 dark:bg-zinc-900 py-8 px-4">
      <style>{`
        @page { margin: 0; size: A4; }
        @media print {
          .cv-toolbar { display: none !important; }
          html, body { background: white !important; margin: 0; padding: 0; }
          .cv-wrapper { background: white !important; padding: 0 !important; margin: 0 !important; }
          .cv-page {
            box-shadow: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
            max-width: none !important;
            width: 100% !important;
            min-height: 297mm;
          }
          .cv-sidebar {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            min-height: 297mm;
          }
          .cv-exp-item { page-break-inside: avoid; break-inside: avoid; }
          .cv-section { page-break-inside: avoid; break-inside: avoid; }
        }
      `}</style>

      {/* Toolbar */}
      <div className="cv-toolbar max-w-[900px] mx-auto mb-5 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={() => {
            const prev = document.title;
            document.title = 'Daniel_Vagner_CV';
            window.print();
            document.title = prev;
          }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Save as PDF
        </button>
      </div>

      {/* CV Document */}
      <div className="cv-page max-w-[900px] mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex items-stretch">

        {/* Sidebar */}
        <div className="cv-sidebar w-[220px] shrink-0 bg-zinc-900 text-white flex flex-col">

          {/* Photo */}
          <div className="px-6 pt-6 pb-4 flex flex-col items-center text-center border-b border-white/10">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-indigo-500/40 mb-3 shrink-0">
              <img src={profilePic} alt="Daniel Vágner" className="w-full h-full object-cover object-top" />
            </div>
            <h1 className="text-base font-bold tracking-tight leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Daniel Vágner
            </h1>
            <p className="text-[11px] text-indigo-400 font-medium mt-1 leading-snug">
              Senior Software Engineer
            </p>
          </div>

          {/* Contact */}
          <div className="px-5 py-3.5 border-b border-white/10 space-y-2">
            <SideLabel>Contact</SideLabel>
            <SideItem icon={<Mail className="w-3 h-3" />}>
              <span className="break-all">danielvagner05@gmail.com</span>
            </SideItem>
            <SideItem icon={<MapPin className="w-3 h-3" />}>Prague, Czechia</SideItem>
            <SideItem icon={<Globe className="w-3 h-3" />}>daniel-vagner.dev</SideItem>
            <SideItem icon={
              <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            }>
              linkedin.com/in/danielvagner
            </SideItem>
          </div>

          {/* Skills */}
          <div className="px-5 py-3.5 border-b border-white/10">
            <SideLabel>Skills</SideLabel>
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat} className="mb-2.5 last:mb-0">
                <p className="text-[9px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">{cat}</p>
                <div className="flex flex-wrap gap-1">
                  {items.map((s) => (
                    <span key={s} className="px-1.5 py-0.5 rounded text-[9px] bg-white/10 text-zinc-300 border border-white/10">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="px-5 py-3.5 flex-1">
            <SideLabel>Education</SideLabel>
            {education.map((ed, i) => (
              <div key={i}>
                <p className="text-[11px] font-semibold text-zinc-200 leading-snug">{ed.school}</p>
                <p className="text-[10px] text-zinc-400 mt-0.5">{ed.degree}</p>
                {'credential' in ed && <p className="text-[10px] text-zinc-500">{(ed as typeof ed & { credential: string }).credential}</p>}
                <p className="text-[10px] text-zinc-500">{ed.period}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 px-8 py-6 space-y-4 flex flex-col">

          {/* Profile */}
          <section className="cv-section">
            <SectionTitle>Profile</SectionTitle>
            <div className="text-[12px] text-zinc-600 leading-relaxed space-y-2">
              <p>I'm a Senior Software Engineer with a background in front-end development, mobile apps, and software architecture. Most of my work has been with Angular and TypeScript — building single-page applications where I care a lot about clean code, good architecture, and performance. I've also spent time on the back-end with ASP.NET Core and had a stint with NestJS, which gave me a solid feel for structured backend development in TypeScript.</p>
              <p>For mobile, I mostly work with Ionic + Capacitor and React Native — cross-platform apps for iOS and Android. A lot of my freelance projects have been on the mobile side, which I've been doing since 2015.</p>
              <p>At CertiCon I eventually moved into a Software Architect role, which meant taking ownership of technical direction, reviewing code, and working closely with the team on bigger decisions. It was a good few years and taught me a lot about how to build things that last.</p>
              <p>I also care about the design side — I use Figma for prototyping and design handoffs, and I think good UX and good code go hand in hand.</p>
            </div>
          </section>

          {/* Experience */}
          <section className="cv-section">
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-3">
              {experiences.map((exp, i) => (
                <div key={i} className="cv-exp-item">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-zinc-900 text-[12px] leading-tight">{exp.position}</p>
                      <p className="text-indigo-600 text-[11px] font-medium mt-0.5 flex items-center gap-1.5">
                        {exp.company}
                        {exp.current && (
                          <span className="px-1.5 py-px rounded-full text-[8px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                            Current
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[11px] text-zinc-500 font-medium">{exp.period}</p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">{exp.location}</p>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">{exp.description}</p>
                  )}
                  {i < experiences.length - 1 && (
                    <div className="mt-2.5 border-b border-zinc-100" />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Footer note */}
          <div className="mt-auto pt-3 border-t border-zinc-100 flex justify-end">
            <p className="text-[10px] text-zinc-400">
              Generated from{' '}
              <span className="text-indigo-500">daniel-vagner.dev</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-2.5">
      <h2 className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em] whitespace-nowrap">
        {children}
      </h2>
      <div className="flex-1 h-px bg-zinc-100" />
    </div>
  );
}

function SideLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-2">
      {children}
    </p>
  );
}

function SideItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-[10px] text-zinc-400 leading-snug">
      <span className="mt-0.5 text-zinc-500 shrink-0">{icon}</span>
      <span>{children}</span>
    </div>
  );
}
