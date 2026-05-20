import { Mail, Linkedin, Github, Send } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import { motion } from 'motion/react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from 'react-i18next';
const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'danielvagner05@gmail.com',
    href: 'mailto:danielvagner05@gmail.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/danielvagner',
    href: 'https://www.linkedin.com/in/danielvagner/',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/danielvagner',
    href: 'https://github.com/danielvagner',
  },
];


export function Contact() {
  const { ref, isInView } = useScrollAnimation();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 px-6 bg-transparent overflow-hidden"
    >

      {/* Decorative floating mail icon */}
      <motion.div
        className="absolute left-12 top-14 pointer-events-none hidden lg:block"
        initial={{ x: -140, opacity: 0, rotate: -18 }}
        animate={isInView ? { x: 0, opacity: 1, rotate: 8 } : { x: -140, opacity: 0, rotate: -18 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Mail className="w-28 h-28 text-teal-500/[0.08] dark:text-teal-400/[0.07] stroke-[0.75]" />
        </motion.div>
      </motion.div>

      {/* Small send particle */}
      <motion.div
        className="absolute left-32 top-36 pointer-events-none hidden lg:block"
        initial={{ x: -80, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: -80, opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      >
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <Send className="w-8 h-8 text-teal-500/[0.12] dark:text-teal-400/[0.1] stroke-[1]" />
        </motion.div>
      </motion.div>

      <div className="max-w-5xl mx-auto relative">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-teal-500 dark:text-teal-400 mb-4">
            {t('contact.label')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
            {t('contact.title')}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed text-base">
            {t('contact.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">

          {/* Form */}
          <motion.div
            className="rounded-2xl bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] p-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm mb-1">
              {t('contact.formTitle')}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">
              {t('contact.formDesc')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 block">
                  {t('contact.name')}
                </label>
                <Input
                  id="name"
                  placeholder={t('contact.namePlaceholder')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 block">
                  {t('contact.email')}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('contact.emailPlaceholder')}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 block">
                  {t('contact.message')}
                </label>
                <Textarea
                  id="message"
                  placeholder={t('contact.messagePlaceholder')}
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              {status === 'success' && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 text-center">
                  {t('contact.success')}
                </p>
              )}
              {status === 'error' && (
                <p className="text-xs text-red-500 dark:text-red-400 text-center">
                  {t('contact.error')}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-teal-600 text-white hover:bg-teal-700 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send className="w-4 h-4" />
                {status === 'loading' ? t('contact.sending') : t('contact.send')}
              </button>
            </form>
          </motion.div>

          {/* Right column */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Connect links */}
            <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] p-6">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm mb-4">
                {t('contact.connectTitle')}
              </h3>
              <div className="space-y-2">
                {contactLinks.map((link, i) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-white/[0.04] transition-colors group"
                      initial={{ opacity: 0, x: 16 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                    >
                      <div className="w-9 h-9 rounded-xl bg-teal-500/10 dark:bg-teal-500/15 flex items-center justify-center shrink-0 group-hover:bg-teal-500/20 transition-colors">
                        <Icon className="w-4 h-4 text-teal-500 dark:text-teal-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{link.label}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-500">{link.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              <div className="mt-5 pt-5 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{t('contact.availableTitle')}</p>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
                  {t('contact.availableDesc')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Remote', 'Full-time', 'Živnost'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>

        </div>

</div>
    </section>
  );
}
