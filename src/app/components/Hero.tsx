import { Github, Linkedin, Mail, ChevronDown, Code2 } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export function Hero() {
  const [codeIndex, setCodeIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const codeSnippets = [
    { 
      lang: 'TypeScript/React',
      code: 'const solution = () => elegantCode;'
    },
    { 
      lang: 'Angular',
      code: '@Component({ innovation: true })'
    },
    { 
      lang: 'C#/.NET',
      code: 'var architecture = new Scalable();'
    },
  ];

  useEffect(() => {
    const currentSnippet = codeSnippets[codeIndex].code;
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseAfterTyping = 2000;
    const pauseAfterDeleting = 500;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentSnippet.length) {
        setCharIndex(charIndex + 1);
      } else if (!isDeleting && charIndex === currentSnippet.length) {
        setTimeout(() => setIsDeleting(true), pauseAfterTyping);
      } else if (isDeleting && charIndex > 0) {
        setCharIndex(charIndex - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTimeout(() => {
          setCodeIndex((codeIndex + 1) % codeSnippets.length);
        }, pauseAfterDeleting);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, codeIndex]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  const avatarVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated Background Code Particles */}
      <div className="absolute inset-0 overflow-hidden opacity-20 dark:opacity-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-600 dark:text-blue-400 font-mono text-sm opacity-30"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: -20,
            }}
            animate={{
              y: window.innerHeight + 20,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          >
            {['</>','{ }','[ ]','=>','()','||','&&','==='][Math.floor(Math.random() * 8)]}
          </motion.div>
        ))}
      </div>

      {/* Large Background Code Editor */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center px-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="w-full max-w-5xl opacity-30 dark:opacity-20 blur-[2px]">
          <div className="bg-gray-900 dark:bg-gray-950 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
            {/* Window Header */}
            <div className="bg-gray-800 dark:bg-gray-900 px-6 py-3 flex items-center gap-3 border-b border-gray-700">
              <div className="flex gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm text-gray-400 ml-3 font-mono">
                {codeSnippets[codeIndex].lang}
              </span>
            </div>
            
            {/* Code Content - Much Larger */}
            <div className="p-12 font-mono">
              <div className="space-y-4 text-2xl md:text-3xl">
                <div className="flex items-start gap-4">
                  <span className="text-gray-500 select-none min-w-[3ch]">1</span>
                  <span className="text-green-400">
                    {codeSnippets[codeIndex].code.substring(0, charIndex)}
                    <motion.span
                      className="inline-block w-3 h-8 md:h-10 bg-blue-400 ml-1"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  </span>
                </div>
                <div className="flex items-start gap-4 opacity-30">
                  <span className="text-gray-500 select-none min-w-[3ch]">2</span>
                  <span className="text-gray-600">
                    {/* Empty line for realistic look */}
                  </span>
                </div>
                <div className="flex items-start gap-4 opacity-30">
                  <span className="text-gray-500 select-none min-w-[3ch]">3</span>
                  <span className="text-purple-400">// Building the future...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto px-6 py-20 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-6" variants={itemVariants}>
          <motion.div
            className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-5xl shadow-2xl"
            variants={avatarVariants}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            DV
          </motion.div>
        </motion.div>
        
        <motion.h1 className="text-5xl md:text-6xl mb-4" variants={itemVariants}>
          Daniel Vágner
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
          variants={itemVariants}
        >
          Software Architect | Front-End Specialist
        </motion.p>
        
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12"
          variants={itemVariants}
        >
          Crafting exceptional user experiences with Angular, React, and modern web technologies. 
          Building scalable architectures across the full Microsoft ecosystem.
        </motion.p>
        
        <motion.div className="flex gap-4 justify-center mb-12" variants={itemVariants}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" onClick={() => scrollToSection('projects')}>
              View Projects
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')}>
              Get in Touch
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="flex gap-6 justify-center text-gray-600 dark:text-gray-400"
          variants={itemVariants}
        >
          {[
            { href: 'https://stackoverflow.com/users/8366174/daniel-v%c3%a1gner', icon: Code2 },
            { href: 'https://www.linkedin.com/in/danielvagner/', icon: Linkedin },
            { href: 'mailto:daniel.vagner@example.com', icon: Mail },
          ].map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            );
          })}
        </motion.div>
        
        <motion.button
          onClick={() => scrollToSection('skills')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileHover={{ scale: 1.2 }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </motion.div>
    </section>
  );
}