import { Code2, Palette, Database, Layout } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function Skills() {
  const { ref, isInView } = useScrollAnimation();

  const frontendSkills = [
    'React',
    'Angular',
    'TypeScript',
    'JavaScript',
    'HTML5',
    'SCSS/CSS',
    'RxJS',
    'Redux/NgRx',
    'Ionic',
    'Capacitor',
    'Material Design',
    'Micro Frontends',
  ];

  const backendSkills = [
    'C#',
    '.NET Core',
    'ASP.NET',
    'REST APIs',
    'SignalR',
    'Azure Services',
  ];

  const toolsSkills = [
    'Figma',
    'Azure DevOps',
    'Visual Studio',
    'VS Code',
    'Git',
    'Azure AD B2C',
    'Microsoft 365',
    'Webpack',
    'Karma/Jasmine',
    'HealthKit',
    'Garmin SDK',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section id="skills" className="min-h-screen py-20 px-6 bg-white dark:bg-gray-900" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl text-center mb-4">Technical Expertise</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
            Deep expertise in front-end architecture and modern web development, 
            with solid back-end capabilities in the Microsoft ecosystem.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Front-End Skills - Primary Focus */}
          <motion.div variants={cardVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
            <Card className="border-2 border-blue-200 dark:border-blue-800 h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <motion.div
                    className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  <div>
                    <CardTitle>Front-End Development</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Primary Expertise</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {frontendSkills.map((skill, i) => (
                    <motion.div
                      key={skill}
                      custom={i}
                      variants={badgeVariants}
                      initial="hidden"
                      animate={isInView ? 'visible' : 'hidden'}
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Badge variant="default" className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Back-End Skills */}
          <motion.div variants={cardVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <motion.div
                    className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Database className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </motion.div>
                  <div>
                    <CardTitle>Back-End Development</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Microsoft Stack</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {backendSkills.map((skill, i) => (
                    <motion.div
                      key={skill}
                      custom={i}
                      variants={badgeVariants}
                      initial="hidden"
                      animate={isInView ? 'visible' : 'hidden'}
                      whileHover={{ scale: 1.1, rotate: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Badge variant="default" className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 cursor-pointer">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Design & Tools */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-3 bg-green-100 dark:bg-green-900 rounded-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Layout className="w-6 h-6 text-green-600 dark:text-green-400" />
                </motion.div>
                <div>
                  <CardTitle>Design Tools & Ecosystem</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Figma & Microsoft Ecosystem</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {toolsSkills.map((tool, i) => (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge variant="secondary" className="px-4 py-2 text-sm cursor-pointer">
                      {tool}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
