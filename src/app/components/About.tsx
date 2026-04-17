import { Briefcase, Code2, Award, Lightbulb, Target, Building2, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from 'react-i18next';

export function About() {
  const { ref, isInView } = useScrollAnimation();
  const { t } = useTranslation();

  const highlights = [
    { icon: Briefcase, title: t('about.h1Title'), description: t('about.h1Desc') },
    { icon: Code2, title: t('about.h2Title'), description: t('about.h2Desc') },
    { icon: Award, title: t('about.h3Title'), description: t('about.h3Desc') },
    { icon: Lightbulb, title: t('about.h4Title'), description: t('about.h4Desc') },
  ];

  const philosophy = [
    { icon: Target, title: t('about.uc'), desc: t('about.ucDesc') },
    { icon: Building2, title: t('about.sd'), desc: t('about.sdDesc') },
    { icon: Zap, title: t('about.pf'), desc: t('about.pfDesc') },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 px-6 bg-white dark:bg-zinc-950 overflow-hidden"
    >
      {/* Subtle glow — bottom of section, mirroring Skills from top */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_30%_at_50%_105%,rgba(99,102,241,0.07),transparent)] dark:bg-[radial-gradient(ellipse_60%_30%_at_50%_105%,rgba(99,102,241,0.1),transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-indigo-500 dark:text-indigo-400 mb-4">
            {t('about.label')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
            {t('about.title')}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed text-base">
            {t('about.description')}
          </p>
        </motion.div>

        {/* Journey + highlight cards */}
        <div className="grid md:grid-cols-2 gap-10 mb-6">

          {/* Left: text */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              {t('about.journeyTitle')}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-base">{t('about.p1')}</p>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-base">{t('about.p2')}</p>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-base">{t('about.p3')}</p>
          </motion.div>

          {/* Right: 2×2 highlight cards */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={h.title}
                  className="rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] p-5 flex flex-col"
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 flex items-center justify-center mb-3 shrink-0">
                    <Icon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm mb-1 leading-tight">
                    {h.title}
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {h.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Philosophy strip */}
        <motion.div
          className="rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] p-8"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.55, delay: 0.45 }}
        >
          <h3 className="text-base font-semibold text-center text-zinc-900 dark:text-zinc-100 mb-8 tracking-wide uppercase text-xs text-indigo-500 dark:text-indigo-400 tracking-[0.2em]">
            {t('about.philosophyTitle')}
          </h3>
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800/80">
            {philosophy.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="flex flex-col items-center text-center px-8 py-4 md:py-0 first:pt-0 last:pb-0 md:first:pl-0 md:last:pr-0"
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[200px]">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
