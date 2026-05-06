import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from 'react-i18next';

import hudbaNavinicichImage from '../../assets/hudba-na-vinicich.png';
import tolionImage from '../../assets/tolion.png';
import tpodlahyImage from '../../assets/tpodlahy.png';
import qrTicketImage from '../../assets/qr-ticket.png';
import logoFindtastic from '../../assets/logo-findtastic.png';
import ccvis from '../../assets/CCVis.png';
import mdasImage from '../../assets/mdas.png';

const INITIAL_COUNT = 3;

const projects = [
  {
    id: 'hudba',
    title: 'Hudba na vinicích',
    technologies: ['React Native', 'TypeScript', 'Geolocation', 'Payment Gateway', 'Mobile UI'],
    image: hudbaNavinicichImage,
    category: 'Mobile Application',
  },
  {
    id: 'tolion',
    title: 'Tolion - Brain Health Coach',
    technologies: ['Angular', 'Ionic + Capacitor', 'AI/ML', 'HealthKit', 'Mobile UI'],
    image: tolionImage,
    category: 'Mobile Application',
  },
  {
    id: 'tpodlahy',
    title: 'TPodlahy.cz',
    technologies: ['React', 'TypeScript', 'HTML5', 'SCSS', 'Responsive Design'],
    image: tpodlahyImage,
    category: 'Website',
  },
  {
    id: 'qrticket',
    title: 'QR Ticketing System',
    technologies: ['React Native', 'Offline-First', 'QR Scanning', 'Analytics', 'Export'],
    image: qrTicketImage,
    category: 'Mobile Application',
    contain: true,
  },
  {
    id: 'findtastic',
    title: 'Findtastic',
    technologies: ['React Native', 'TypeScript', 'REST APIs', 'Mobile UI'],
    image: logoFindtastic,
    category: 'Mobile Application',
    contain: true,
  },
  {
    id: 'mdas',
    title: 'MDAS - Data Analysis Software',
    technologies: ['Angular 2.0', 'TypeScript', 'C#', 'Electron', 'Figma'],
    image: mdasImage,
    category: 'Desktop Application',
  },
  {
    id: 'ccvision',
    title: 'CCVision - Computer Vision',
    technologies: ['Angular 2.0', 'TypeScript', 'AdobeXD'],
    image: ccvis,
    category: 'Web Application',
  },
];

export function Projects() {
  const { ref, isInView } = useScrollAnimation();
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24 px-6 bg-white dark:bg-zinc-950 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_30%_at_50%_105%,rgba(99,102,241,0.06),transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-indigo-500 dark:text-indigo-400 mb-4">
            {t('projects.label')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
            {t('projects.title')}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed text-base">
            {t('projects.description')}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="sync">
            {visible.map((project, index) => (
              <motion.div
                key={project.title}
                custom={index}
                className="rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] overflow-hidden flex flex-col group"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: index * 0.06 } }}
                exit={{ opacity: 0, y: 16, scale: 0.97, transition: { duration: 0.25, delay: (visible.length - 1 - index) * 0.05 } }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                {/* Image */}
                <div className="h-48 overflow-hidden bg-zinc-100 shrink-0">
                  <img
                    src={project.image as string}
                    alt={project.title}
                    className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                      project.contain ? 'object-contain p-4' : 'object-cover'
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <span className="inline-block self-start px-2.5 py-0.5 rounded-full text-xs font-medium text-zinc-500 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-700/60 mb-3">
                    {project.category}
                  </span>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm leading-snug mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 flex-1">
                    {t(`projects.items.${project.id}`)}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

          </AnimatePresence>
        </div>

        {/* Show more button */}
        <AnimatePresence>
          {!showAll && projects.length > INITIAL_COUNT && (
            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={() => setShowAll(true)}
                className="group flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-indigo-500 hover:text-indigo-500 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200 cursor-pointer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {t('projects.showMore', { count: projects.length - INITIAL_COUNT })}
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <path d="M6 9l6 6 6-6" />
                </motion.svg>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse button */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              className="flex justify-center mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.button
                onClick={() => {
                  setShowAll(false);
                  setTimeout(() => {
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                }}
                className="group flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-indigo-500 hover:text-indigo-500 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200 cursor-pointer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <path d="M18 15l-6-6-6 6" />
                </motion.svg>
                {t('projects.showLess')}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
