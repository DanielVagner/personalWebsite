import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

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
    title: 'Hudba na vinicích',
    description: 'Concert discovery app featuring ticket purchasing, location-based event search, and concert tracking. Users can save favorite events, buy tickets directly, view schedules, and navigate to vineyard venues.',
    technologies: ['React Native', 'TypeScript', 'Geolocation', 'Payment Gateway', 'Mobile UI'],
    image: hudbaNavinicichImage,
    category: 'Mobile Application',
  },
  {
    title: 'Tolion - Brain Health Coach',
    description: 'AI-powered brain health platform with conversational coaching, personalized activity recommendations, and advanced risk assessment. Features unique Brain Age indicator, weekly progress summaries, and science-based cognitive performance tracking.',
    technologies: ['Angular', 'Ionic + Capacitor', 'AI/ML', 'HealthKit', 'Mobile UI'],
    image: tolionImage,
    category: 'Mobile Application',
  },
  {
    title: 'TPodlahy.cz - Professional Flooring Services',
    description: 'Modern responsive website for professional flooring installation company. Features include service showcase, gallery, contact forms, and detailed information about vinyl flooring, laminate, parquet renovation, and professional installations.',
    technologies: ['React', 'TypeScript', 'HTML5', 'SCSS', 'Responsive Design'],
    image: tpodlahyImage,
    category: 'Website',
  },
  {
    title: 'QR Ticketing System',
    description: 'Private event ticketing solution for faster check-in at turnstiles. Features QR code scanning with online/offline mode, real-time attendance tracking, capacity monitoring, and exportable reports for event organizers.',
    technologies: ['React Native', 'Offline-First', 'QR Scanning', 'Analytics', 'Export'],
    image: qrTicketImage,
    category: 'Mobile Application',
    contain: true,
  },
  {
    title: 'Findtastic - Price Comparison App',
    description: 'Mobile application for finding the best prices worldwide for US customers. Features include cross-store price comparison, deal discovery, and real-time price tracking across multiple e-commerce platforms.',
    technologies: ['React Native', 'TypeScript', 'REST APIs', 'Mobile UI'],
    image: logoFindtastic,
    category: 'Mobile Application',
    contain: true,
  },
  {
    title: 'MDAS - Data Analysis Software',
    description: 'Healthcare monitoring application for tracking medical device safety alerts and regulatory compliance. Focuses on critical issues with implantable devices including insulin pumps, pacemakers, and defibrillators.',
    technologies: ['Angular 2.0', 'TypeScript', 'C#', 'Electron', 'Figma'],
    image: mdasImage,
    category: 'Desktop Application',
  },
  {
    title: 'CCVision - Computer Vision',
    description: 'Computer vision application for detecting and identifying objects in real-time. Features include image processing, object recognition, and integration with various hardware platforms.',
    technologies: ['Angular 2.0', 'TypeScript', 'AdobeXD'],
    image: ccvis,
    category: 'Web Application',
  },
];

export function Projects() {
  const { ref, isInView } = useScrollAnimation();
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
            What I've built
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
            Projects
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed text-base">
            A few things I've built over the years — from mobile apps to websites.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {visible.map((project, index) => (
              <motion.div
                key={project.title}
                className="rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] overflow-hidden flex flex-col group"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                {/* Image */}
                <div className="h-48 overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0">
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
                    {project.description}
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

        {/* Load more */}
        {projects.length > INITIAL_COUNT && (
          <motion.div
            className="flex justify-center mt-10"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2.5 rounded-full text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-sm shadow-indigo-500/25 cursor-pointer"
            >
              {showAll ? 'Show Less' : `Show ${projects.length - INITIAL_COUNT} More`}
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
