import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import findtasticImage1 from 'figma:asset/198ad7e8b1e0ffd4f2c4919c90d97ec787a9d91b.png';
import findtasticImage2 from 'figma:asset/ef1fa665ee5e0741fd13988651650148a0d1db5d.png';
import hudbaNavinicichImage from 'figma:asset/17050c05bfb73ff7c841fb49068ca6c1e6c2f372.png';
import tolionImage from 'figma:asset/20e2a7db992580d415c3eefb289a2ea82c5037d2.png';
import tpodlahyImage from 'figma:asset/263189b62ab1dc784dfd163c0dd2bd020e79383f.png';
import qrTicketImage from 'figma:asset/f2a2b3f8ac4d20e3ae7fe14be0a65877e649245d.png';

export function Projects() {
  const { ref, isInView } = useScrollAnimation();

  const projects = [
    {
      title: 'Findtastic - Price Comparison App',
      description: 'Mobile application for finding the best prices worldwide for US customers. Features include cross-store price comparison, deal discovery, and real-time price tracking across multiple e-commerce platforms.',
      technologies: ['React Native', 'TypeScript', 'REST APIs', 'Mobile UI'],
      images: [findtasticImage1, findtasticImage2],
      category: 'Mobile Application',
      useDirectImage: true,
      multipleImages: true,
    },
    {
      title: 'Hudba na vinicích',
      description: 'Concert discovery app featuring ticket purchasing, location-based event search, and concert tracking. Users can save favorite events, buy tickets directly, view schedules, and navigate to vineyard venues.',
      technologies: ['React Native', 'TypeScript', 'Geolocation', 'Payment Gateway', 'Mobile UI'],
      image: hudbaNavinicichImage,
      category: 'Mobile Application',
      useDirectImage: true,
    },
    {
      title: 'Tolion - Brain Health Coach',
      description: 'AI-powered brain health platform with conversational coaching, personalized activity recommendations, and advanced risk assessment. Features unique Brain Age indicator, weekly progress summaries, and science-based cognitive performance tracking.',
      technologies: ['React Native', 'AI/ML', 'HealthKit', 'Data Analytics', 'Mobile UI'],
      image: tolionImage,
      category: 'Mobile Application',
      useDirectImage: true,
    },
    {
      title: 'TPodlahy.cz - Professional Flooring Services',
      description: 'Modern responsive website for professional flooring installation company. Features include service showcase, gallery, contact forms, and detailed information about vinyl flooring, laminate, parquet renovation, and professional installations.',
      technologies: ['React', 'TypeScript', 'HTML5', 'SCSS', 'Responsive Design'],
      image: tpodlahyImage,
      category: 'Website',
      useDirectImage: true,
    },
    {
      title: 'QR Ticketing System',
      description: 'Private event ticketing solution for faster check-in at turnstiles. Features QR code scanning with online/offline mode, real-time attendance tracking, capacity monitoring, and exportable reports for event organizers.',
      technologies: ['React Native', 'Offline-First', 'QR Scanning', 'Analytics', 'Export'],
      image: qrTicketImage,
      category: 'Mobile Application',
      useDirectImage: true,
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
        ease: 'easeOut',
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
          <h2 className="text-4xl text-center mb-4">Featured Projects</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
            A selection of projects showcasing architecture, front-end excellence, and full-stack capabilities.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
                <motion.div
                  className={`h-56 overflow-hidden ${project.useDirectImage ? 'bg-white dark:bg-gray-900' : 'bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900'}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.useDirectImage ? (
                    project.multipleImages ? (
                      <div className="flex h-full gap-0">
                        {project.images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`${project.title} ${i + 1}`}
                            className="w-1/2 h-full object-cover"
                          />
                        ))}
                      </div>
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-contain"
                      />
                    )
                  ) : (
                    <ImageWithFallback
                      src={`https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop`}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}
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
                
                <CardFooter className="flex gap-2">
                  <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="sm" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Project
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}