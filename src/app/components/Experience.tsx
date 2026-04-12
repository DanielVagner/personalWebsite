import { Briefcase } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function Experience() {
  const { ref, isInView } = useScrollAnimation();

  const experiences = [
    {
      company: 'HTEC',
      position: 'Senior Software Engineer',
      type: 'Full-time',
      period: 'Nov 2025 - Present',
      duration: '4 mos',
      location: 'Prague, Czechia - Remote',
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
      positions: [
        {
          title: 'Software Architect',
          period: 'Jun 2024 - Dec 2025',
          duration: '1 yr 7 mos',
          location: 'Remote',
        },
        {
          title: 'Senior Software Engineer',
          period: 'Aug 2020 - Jun 2024',
          duration: '3 yrs 11 mos',
          location: 'Remote',
        },
      ],
      type: 'Full-time',
      totalDuration: '6 yrs 1 mo',
      location: 'Prague, Czechia',
      projects: [
        {
          name: 'Bosch',
          description: 'Contributed to Bosch, a greenfield project leveraging Angular and TypeScript, designed with cutting-edge technologies such as RxJS, NRWL NGXS, and a custom component utilizing Material CDK. Focused on automobile diagnostics, the application\'s development embraced the Micro Frontends architecture within the Angular ecosystem, facilitated by module federation and webpack. Ensured quality through comprehensive front-end testing with Karma and Jasmine.',
        },
        {
          name: 'Embitron',
          description: 'A cloud application for recording and managing healthcare devices. Working with technologies like C#, ASP.NET 6.0, Angular, Swagger - documentation, Git, Clickup and Microsoft azure cloud - services, storage etc.',
        },
        {
          name: 'ERP',
          description: 'Contributed to the ERP project, utilizing Angular and TypeScript and integrating state-of-the-art technologies such as RxJS, NRWL NGXS, along with custom Angular components based on the Material CDK. This initiative aimed to streamline and optimize internal processes, enhancing efficiency and productivity.',
        },
      ],
      skills: ['Angular', 'TypeScript', 'Design systémů', '.NET', 'Git', 'Programy Adobe Design', 'C#'],
    },
    {
      company: 'CCVis s.r.o.',
      position: 'Senior Software Engineer',
      type: 'Part-time',
      period: 'Oct 2022 - Dec 2022',
      duration: '3 mos',
      location: 'Pardubice, Pardubický, Česko',
      description: 'At CCVis s.r.o. (CertiCon computer vision), I contributed to the development of a web application for SaaS subscription activation on the Microsoft Azure Marketplace. My role involved enhancing a modular platform with essential features, creating reusable components, and ensuring the application adhered to high development standards.',
      skills: ['Angular', 'Git', 'TypeScript'],
    },
    {
      company: 'Foxconn CZ s.r.o.',
      position: 'Front-end Developer',
      type: 'Full-time',
      period: 'Sep 2018 - Dec 2019',
      duration: '1 yr 4 mos',
      location: 'Okres Pardubice, Česká republika',
      description: 'Developed front-end solutions for enterprise resource planning (ERP) system and production line management application. The production line management tool enabled real-time monitoring and control of assembly lines, tracking component flow, quality metrics, and optimizing manufacturing processes on the production floor.',
      skills: ['Angular', 'TypeScript', 'HTML5', 'CSS3'],
    },
    {
      company: 'EDUCA',
      position: 'IT',
      type: 'Full-time',
      period: 'Sep 2017 - Sep 2018',
      duration: '1 yr 1 mo',
      location: 'Okres Pardubice, Česká republika',
      skills: ['Angular', 'Web Development'],
    },
    {
      company: 'Web Developer a Servisní Technik',
      position: 'Web Developer',
      type: 'Full-time',
      period: 'Jul 2016 - Dec 2016',
      duration: '6 mos',
      location: 'Okres Hradec Králové, Česká republika',
      description: 'Angular 2+, HTML5, CSS3 (SCSS), JavaScript, PrestaShop',
      skills: ['Angular 2+', 'HTML5', 'CSS3', 'SCSS', 'JavaScript', 'PrestaShop'],
    },
  ];

  return (
    <section id="experience" className="py-20 px-6 bg-white dark:bg-gray-900 " ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl text-center mb-4">My Journey</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
            From writing my first lines of code to architecting enterprise-grade applications — here's where I've been.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 -translate-x-1/2 hidden md:block" />

          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            const period = exp.positions ? exp.positions[0].period : exp.period;
            const duration = exp.positions ? exp.totalDuration : exp.duration;
            const position = exp.positions ? exp.positions[0].title : exp.position;

            return (
              <motion.div
                key={index}
                className="relative flex items-start mb-12 md:mb-16"
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* LEFT SIDE */}
                <div className={`hidden md:flex w-5/12 ${isLeft ? 'justify-end pr-8' : 'justify-end pr-2 items-start pt-[14px]'}`}>
                  {isLeft ? (
                    <TimelineCard exp={exp} position={position} period={period} duration={duration} isInView={isInView} index={index} />
                  ) : (
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{period}</span>
                  )}
                </div>

                {/* CENTER DOT */}
                <div className="hidden md:flex w-2/12 justify-center relative z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
                    exp.current
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                  }`}>
                    <Briefcase className="w-5 h-5" />
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className={`hidden md:flex w-5/12 ${!isLeft ? 'justify-start pl-8' : 'justify-start pl-2 items-start pt-[14px]'}`}>
                  {!isLeft ? (
                    <TimelineCard exp={exp} position={position} period={period} duration={duration} isInView={isInView} index={index} />
                  ) : (
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{period}</span>
                  )}
                </div>

                {/* MOBILE layout — single column */}
                <div className="flex md:hidden w-full gap-4">
                  <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center shadow-md mt-1 ${
                    exp.current
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-500'
                  }`}>
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <TimelineCard exp={exp} position={position} period={period} duration={duration} isInView={isInView} index={index} />
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

type Exp = {
  company: string;
  position?: string;
  positions?: { title: string; period: string; duration: string; location: string }[];
  type: string;
  period?: string;
  duration?: string;
  totalDuration?: string;
  location: string;
  description?: string;
  projects?: { name: string; description: string }[];
  skills?: string[];
  current?: boolean;
};

function TimelineCard({
  exp,
  position,
  period,
  duration,
  isInView,
  index,
}: {
  exp: Exp;
  position: string;
  period: string;
  duration?: string;
  isInView: boolean;
  index: number;
}) {
  return (
    <Card className={`w-full ${exp.current ? 'border-blue-200 dark:border-blue-800 border-2' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-lg">{position}</CardTitle>
            <CardDescription className="text-base font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
              {exp.company}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            {exp.current && <Badge className="bg-green-600 text-xs">Current</Badge>}
            <Badge variant="outline" className="text-xs">{exp.type}</Badge>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>{period}{duration ? ` · ${duration}` : ''}</span>
          <span>{exp.location}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        {exp.positions && exp.positions.length > 1 && (
          <div className="space-y-2 border-l-2 border-gray-200 dark:border-gray-700 pl-3">
            {exp.positions.slice(1).map((pos, idx) => (
              <div key={idx}>
                <p className="text-sm font-semibold">{pos.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{pos.period} · {pos.duration}</p>
              </div>
            ))}
          </div>
        )}

        {exp.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {exp.description}
          </p>
        )}

        {exp.projects && (
          <div className="space-y-2">
            {exp.projects.map((project, idx) => (
              <div key={idx} className="border-l-4 border-blue-200 dark:border-blue-800 pl-3">
                <p className="text-sm font-semibold">{project.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        )}

        {exp.skills && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {exp.skills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 + idx * 0.04 }}
              >
                <Badge variant="secondary" className="text-xs">{skill}</Badge>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
