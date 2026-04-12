import { Briefcase, MapPin, Calendar } from 'lucide-react';
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
      description: 'At CCVis s.r.o. (CertiCon computer vision), I contributed to the development of a web application for SaaS subscription activation on the Microsoft Azure Marketplace. My role involved enhancing a modular platform with essential features, creating reusable components, and ensuring the application adhered to high development standards. I also played a key role in the front-end standardization process and significantly improved application performance through targeted refactoring.',
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="experience" className="py-20 px-6 bg-white dark:bg-gray-900" ref={ref}>
      <div className="max-w-6xl mx-auto">
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

        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <Card className={exp.current ? 'border-2 border-teal-200 dark:border-teal-800' : ''}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <motion.div
                        className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg h-fit"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Briefcase className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-xl">
                            {exp.positions ? exp.positions[0].title : exp.position}
                          </CardTitle>
                          {exp.current && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3, type: 'spring' }}
                            >
                              <Badge variant="default" className="bg-green-600">Current</Badge>
                            </motion.div>
                          )}
                        </div>
                        <CardDescription className="text-base font-semibold text-gray-900 dark:text-gray-100">
                          {exp.company}
                        </CardDescription>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {exp.positions ? exp.positions[0].period : exp.period} · {exp.positions ? exp.totalDuration : exp.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {exp.location}
                          </span>
                          <Badge variant="outline">{exp.type}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Additional positions for same company */}
                  {exp.positions && exp.positions.length > 1 && (
                    <motion.div
                      className="pl-14 space-y-3 border-l-2 border-gray-200 dark:border-gray-700 ml-5"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ delay: 0.2 }}
                    >
                      {exp.positions.slice(1).map((pos, idx) => (
                        <div key={idx} className="pl-4">
                          <h4 className="font-semibold">{pos.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {pos.period} · {pos.duration}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{pos.location}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Description */}
                  {exp.description && (
                    <motion.p
                      className="text-gray-600 dark:text-gray-400 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {exp.description}
                    </motion.p>
                  )}

                  {/* Projects */}
                  {exp.projects && (
                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {exp.projects.map((project, idx) => (
                        <motion.div
                          key={idx}
                          className="border-l-4 border-blue-200 dark:border-blue-800 pl-4"
                          whileHover={{ x: 5, borderColor: '#3b82f6' }}
                          transition={{ duration: 0.2 }}
                        >
                          <h4 className="font-semibold mb-1">{project.name}:</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {project.description}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Skills */}
                  {exp.skills && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.skills.map((skill, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + idx * 0.05 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge variant="secondary">
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}