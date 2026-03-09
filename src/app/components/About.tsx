import { Briefcase, GraduationCap, Award, Code } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { motion } from 'motion/react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function About() {
  const { ref, isInView } = useScrollAnimation();

  const highlights = [
    {
      icon: Briefcase,
      title: '9+ Years Experience',
      description: 'Leading front-end architecture and development teams',
    },
    {
      icon: Code,
      title: 'Architecture Excellence',
      description: 'Software Architect at CertiCon, building enterprise solutions',
    },
    {
      icon: Award,
      title: 'Full-Stack Capability',
      description: 'Expert in Angular, React, TypeScript, and .NET ecosystem',
    },
    {
      icon: GraduationCap,
      title: 'Continuous Innovation',
      description: 'Pioneering Micro Frontend architectures and modern patterns',
    },
  ];

  return (
    <section id="about" className="py-20 px-6 bg-white dark:bg-gray-900" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl text-center mb-4">About Me</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
            Passionate software architect and engineer specializing in front-end excellence and scalable architectures.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl">My Journey</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              As a Software Architect currently at HTEC and with extensive experience at CertiCon, I specialize 
              in building mobile-first health applications and enterprise solutions. My expertise spans the full 
              stack, from Angular and React on the front-end to ASP.NET and Azure services on the back-end.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              I've contributed to major projects at companies like Bosch, implementing cutting-edge Micro Frontend 
              architectures and Material Design systems. My work focuses on delivering high-performance, scalable 
              applications with exceptional user experiences.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Since 2015, I've also been running a successful freelance practice, specializing in mobile application 
              development with Ionic and Angular. This dual perspective - enterprise architecture and hands-on 
              development - allows me to create solutions that are both technically robust and user-focused.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="text-center hover:shadow-md transition-shadow h-full">
                    <CardContent className="pt-6">
                      <motion.div
                        className="inline-flex p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                      <h4 className="font-semibold mb-2">{highlight.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {highlight.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl mb-4 text-center">Philosophy</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { emoji: '🎯', title: 'User-Centric', desc: 'Every architectural decision considers the end-user experience' },
              { emoji: '🏗️', title: 'Scalable Design', desc: 'Building systems that grow with business needs' },
              { emoji: '⚡', title: 'Performance First', desc: 'Optimizing for speed without compromising quality' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-3xl mb-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  {item.emoji}
                </motion.div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}