import { Mail, Linkedin, Github, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import { motion } from 'motion/react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function Contact() {
  const { ref, isInView } = useScrollAnimation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitSuccess('');
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message.');
      }

      setSubmitSuccess('Your message has been sent successfully.');
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Unexpected error occurred.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: 'daniel.vagner@example.com',
      href: 'mailto:daniel.vagner@example.com',
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-100 dark:bg-red-900',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/danielvagner',
      href: 'https://www.linkedin.com/in/danielvagner/',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/danielvagner',
      href: 'https://github.com/danielvagner',
      color: 'text-gray-900 dark:text-gray-100',
      bg: 'bg-gray-200 dark:bg-gray-700',
    },
  ];

  return (
    <section
      id="contact"
      className="min-h-screen py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center"
      ref={ref}
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl text-center mb-4">Get In Touch</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
            Interested in collaborating on a project or discussing architecture opportunities?
            I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form and I'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label htmlFor="name" className="text-sm font-medium mb-2 block">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label htmlFor="email" className="text-sm font-medium mb-2 block">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label htmlFor="message" className="text-sm font-medium mb-2 block">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project or inquiry..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </motion.div>

                  {submitSuccess && (
                    <p className="text-sm text-green-600 dark:text-green-400">
                      {submitSuccess}
                    </p>
                  )}

                  {submitError && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {submitError}
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Connect With Me</CardTitle>
                <CardDescription>
                  Find me on these platforms or reach out directly.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {contactLinks.map((link, index) => {
                  const Icon = link.icon;

                  return (
                    <motion.a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        className={`p-3 rounded-lg ${link.bg}`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className={`w-5 h-5 ${link.color}`} />
                      </motion.div>

                      <div>
                        <div className="font-medium">{link.label}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {link.value}
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </CardContent>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">Available for Opportunities</h3>
                  <p className="text-blue-100 mb-4">
                    Currently open to consulting projects and full-time positions focusing on
                    front-end architecture and leadership roles.
                  </p>

                  <div className="flex gap-2 text-sm">
                    {['Remote', 'Hybrid', 'Consulting'].map((tag, i) => (
                      <motion.span
                        key={tag}
                        className="px-3 py-1 bg-white/20 rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}