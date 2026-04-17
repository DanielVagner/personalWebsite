import { Briefcase } from 'lucide-react';
import { motion } from 'motion/react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const experiences = [
  {
    company: 'HTEC',
    position: 'Senior Software Engineer',
    type: 'Full-time',
    period: 'Nov 2025 - Present',
    duration: '4 mos',
    location: 'Prague, Czechia · Remote',
    description: 'Building a mobile-first health product at Tolion Health. Full-stack across Ionic + Angular + Capacitor and ASP.NET Web API, with a focus on architecture, Azure AD B2C/PKCE auth, HealthKit/Garmin integration, performance, and UX.',
    skills: ['Ionic', 'Angular', 'Capacitor', 'ASP.NET Web API', 'Azure AD B2C', 'HealthKit', 'Garmin'],
    current: true,
  },
  {
    company: 'Freelance Software Engineer',
    position: 'Software Engineer',
    type: 'Self Employed',
    period: '2015 - Present',
    duration: '11 yrs 2 mos',
    location: 'Remote',
    description: 'Coding has always been my passion, not just my profession — so a few years ago I decided to take on freelance work on the side. I build native mobile apps for iOS and Android, primarily with Angular + Ionic and React Native, handling everything from development to App Store and Google Play deployment.',
    skills: ['Angular', 'TypeScript', 'Ionic', 'RxJS', 'NgXs'],
    current: true,
  },
  {
    company: 'CertiCon a.s.',
    position: 'Software Architect',
    positions: [
      { title: 'Software Architect', period: 'Jun 2024 - Dec 2025', duration: '1 yr 7 mos' },
      { title: 'Senior Software Engineer', period: 'Aug 2020 - Jun 2024', duration: '3 yrs 11 mos' },
    ],
    type: 'Full-time',
    period: 'Jun 2024 - Dec 2025',
    totalDuration: '6 yrs 1 mo',
    location: 'Prague, Czechia',
    projects: [
      {
        name: 'Bosch',
        description: 'Greenfield Angular + TypeScript project for automobile diagnostics. Micro Frontends via module federation, RxJS, NRWL NGXS, Material CDK, Karma/Jasmine testing.',
      },
      {
        name: 'Embitron',
        description: 'Cloud application for recording and managing healthcare devices. C#, ASP.NET 6.0, Angular, Azure cloud services and storage.',
      },
      {
        name: 'ERP',
        description: 'Internal ERP initiative using Angular, TypeScript, RxJS, NRWL NGXS and custom Material CDK components to streamline and optimise internal processes.',
      },
    ],
    skills: ['Angular', 'TypeScript', 'Design Systems', '.NET', 'C#', 'Git'],
  },
  {
    company: 'CCVis s.r.o.',
    position: 'Senior Software Engineer',
    type: 'Part-time',
    period: 'Oct 2022 - Dec 2022',
    duration: '3 mos',
    location: 'Pardubice, Czechia',
    description: 'Developed a web application for SaaS subscription activation on the Microsoft Azure Marketplace — modular platform, reusable components, high development standards.',
    skills: ['Angular', 'TypeScript', 'Git'],
  },
  {
    company: 'Foxconn CZ s.r.o.',
    position: 'Front-end Developer',
    type: 'Full-time',
    period: 'Sep 2018 - Dec 2019',
    duration: '1 yr 4 mos',
    location: 'Pardubice, Czechia',
    description: 'Front-end for an ERP system and real-time production line management tool — tracking component flow, quality metrics, and optimising manufacturing processes.',
    skills: ['Angular', 'TypeScript', 'HTML5', 'CSS3'],
  },
  {
    company: 'EDUCA',
    position: 'IT',
    type: 'Full-time',
    period: 'Sep 2017 - Sep 2018',
    duration: '1 yr 1 mo',
    location: 'Pardubice, Czechia',
    skills: ['Angular', 'Web Development'],
  },
  {
    company: 'Web Developer & Service Technician',
    position: 'Web Developer',
    type: 'Full-time',
    period: 'Jul 2016 - Dec 2016',
    duration: '6 mos',
    location: 'Hradec Králové, Czechia',
    description: 'Angular 2+, HTML5, CSS3 (SCSS), JavaScript, PrestaShop',
    skills: ['Angular 2+', 'HTML5', 'CSS3', 'JavaScript', 'PrestaShop'],
  },
];

type Exp = typeof experiences[number];

function TimelineCard({ exp }: { exp: Exp }) {
  const period = 'positions' in exp && exp.positions ? exp.positions[0].period : exp.period;
  const duration = 'totalDuration' in exp ? exp.totalDuration : exp.duration;

  return (
    <div
      className={`w-full rounded-2xl p-5 border transition-colors duration-300 ${
        exp.current
          ? 'bg-white dark:bg-white/[0.04] border-indigo-200 dark:border-indigo-500/25'
          : 'bg-white dark:bg-white/[0.03] border-zinc-200/80 dark:border-white/[0.06]'
      }`}
    >
      {/* Card header */}
      <div className="flex items-start justify-between gap-3 mb-1">
        <div className="min-w-0">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm leading-tight">
            {exp.position}
          </p>
          <p className="text-indigo-500 dark:text-indigo-400 text-sm font-medium mt-0.5">
            {exp.company}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          {exp.current && (
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20">
              Current
            </span>
          )}
          <span className="px-2 py-0.5 rounded-full text-xs text-zinc-500 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-700/60">
            {exp.type}
          </span>
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-zinc-400 dark:text-zinc-500 mb-4">
        <span>{period}{duration ? ` · ${duration}` : ''}</span>
        <span>{exp.location}</span>
      </div>

      {/* Multiple positions */}
      {'positions' in exp && exp.positions && exp.positions.length > 1 && (
        <div className="space-y-2 border-l-2 border-indigo-300/40 dark:border-indigo-500/25 pl-3 mb-3">
          {exp.positions.slice(1).map((pos, i) => (
            <div key={i}>
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{pos.title}</p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">{pos.period} · {pos.duration}</p>
            </div>
          ))}
        </div>
      )}

      {/* Description */}
      {'description' in exp && exp.description && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
          {exp.description}
        </p>
      )}

      {/* Projects */}
      {'projects' in exp && exp.projects && (
        <div className="space-y-2.5 mb-3">
          {exp.projects.map((project, i) => (
            <div key={i} className="border-l-2 border-indigo-400/30 dark:border-indigo-500/25 pl-3">
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-0.5">{project.name}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{project.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {exp.skills && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {exp.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/50"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function Experience() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-24 px-6 bg-zinc-50 dark:bg-zinc-950 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_35%_at_50%_0%,rgba(99,102,241,0.06),transparent)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-indigo-500 dark:text-indigo-400 mb-4">
            My Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
            Experience
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed text-base">
            From writing my first lines of code to architecting enterprise-grade applications — here's where I've been.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2 hidden md:block" />

          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                className="relative flex items-start mb-10 md:mb-12"
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -40 : 40 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                {/* LEFT */}
                <div className={`hidden md:flex w-5/12 ${isLeft ? 'justify-end pr-8' : 'justify-end pr-4 items-start pt-3'}`}>
                  {isLeft ? (
                    <TimelineCard exp={exp} />
                  ) : (
                    <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                      {('positions' in exp && exp.positions) ? exp.positions[0].period : exp.period}
                    </span>
                  )}
                </div>

                {/* CENTER DOT */}
                <div className="hidden md:flex w-2/12 justify-center relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    exp.current
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                      : 'bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-400 dark:text-zinc-500'
                  }`}>
                    <Briefcase className="w-4 h-4" />
                  </div>
                </div>

                {/* RIGHT */}
                <div className={`hidden md:flex w-5/12 ${!isLeft ? 'justify-start pl-8' : 'justify-start pl-4 items-start pt-3'}`}>
                  {!isLeft ? (
                    <TimelineCard exp={exp} />
                  ) : (
                    <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                      {('positions' in exp && exp.positions) ? exp.positions[0].period : exp.period}
                    </span>
                  )}
                </div>

                {/* MOBILE */}
                <div className="flex md:hidden w-full gap-4">
                  <div className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center mt-1 ${
                    exp.current
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                      : 'bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-400'
                  }`}>
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <TimelineCard exp={exp} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
