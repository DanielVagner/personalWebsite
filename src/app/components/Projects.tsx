import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
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

export function Projects() {
  const { ref, isInView } = useScrollAnimation();
  const [showAll, setShowAll] = useState(false);

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
    },
    {
      title: 'Findtastic - Price Comparison App',
      description: 'Mobile application for finding the best prices worldwide for US customers. Features include cross-store price comparison, deal discovery, and real-time price tracking across multiple e-commerce platforms.',
      technologies: ['React Native', 'TypeScript', 'REST APIs', 'Mobile UI'],
      image: logoFindtastic,
      category: 'Mobile Application',
      multipleImages: true,
    },
    {
      title: 'MDAS - Data analysis software',
      description: 'Healthcare monitoring application for tracking medical device safety alerts and regulatory compliance. Focuses on critical issues with implantable devices including insulin pumps, pacemakers, and defibrillator systems, helping healthcare professionals stay informed about device recalls and safety notices.',
      technologies: ['Angular 2.0', 'TypeScript', 'C#', 'Electron', 'Figma'],
      image: mdasImage,
      category: 'Desktop Application',
    },
     {
      title: 'CCVision - Computer Vision Object Detection',
      description: 'Computer vision application for detecting and identifying objects in real-time. Features include image processing, object recognition, and integration with various hardware platforms.',
      technologies: ['Angular 2.0', 'TypeScript', 'AdobeXD'],
      image: ccvis,
      category: 'Web Application',
    },
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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="projects" className="min-h-screen py-20 px-6 bg-gray-50 dark:bg-gray-800" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl text-center mb-4">Projects</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
            A few things I've built over the years — from mobile apps to websites.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <AnimatePresence>
          {(showAll ? projects : projects.slice(0, INITIAL_COUNT)).map((project, index) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
                <motion.div
                  className="h-56 overflow-hidden bg-white dark:bg-white"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={project.image as string}
                    alt={project.title}
                    className={`w-full h-full ${
                      project.title === 'QR Ticketing System'
                        ? 'object-contain'
                        : 'object-cover'
                    }`}
                  />
                </motion.div>
                
                <CardHeader>
                  <motion.div
                    className="mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </motion.div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Badge variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>

        {projects.length > INITIAL_COUNT && (
          <motion.div
            className="flex justify-center mt-10"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button variant="outline" size="lg" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Show Less' : `Load More (${projects.length - INITIAL_COUNT} more)`}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}