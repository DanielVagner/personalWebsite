import { Code2, Database, Wrench } from 'lucide-react';
import { motion } from 'motion/react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from 'react-i18next';


export function Skills() {
  const { ref, isInView } = useScrollAnimation();
  const { t } = useTranslation();

  const categories = [
    {
      id: 'frontend', icon: Code2,
      title: t('skills.frontend.title'), subtitle: t('skills.frontend.subtitle'),
      iconBg: 'bg-indigo-500/15', iconColor: 'text-indigo-500 dark:text-indigo-400',
      hoverBorder: 'hover:border-indigo-500/50 hover:text-indigo-400 dark:hover:border-indigo-400/50 dark:hover:text-indigo-300',
      colSpan: 'md:col-span-2',
      skills: ['React','Angular','TypeScript','JavaScript','HTML5','SCSS/CSS','RxJS','Redux/NgRx','Ionic','Capacitor','Material Design','Micro Frontends'],
    },
    {
      id: 'backend', icon: Database,
      title: t('skills.backend.title'), subtitle: t('skills.backend.subtitle'),
      iconBg: 'bg-violet-500/15', iconColor: 'text-violet-500 dark:text-violet-400',
      hoverBorder: 'hover:border-violet-500/50 hover:text-violet-400 dark:hover:border-violet-400/50 dark:hover:text-violet-300',
      colSpan: 'md:col-span-1',
      skills: ['C#','.NET Core','ASP.NET','REST APIs','SignalR','Azure Services'],
    },
    {
      id: 'tools', icon: Wrench,
      title: t('skills.tools.title'), subtitle: t('skills.tools.subtitle'),
      iconBg: 'bg-emerald-500/15', iconColor: 'text-emerald-500 dark:text-emerald-400',
      hoverBorder: 'hover:border-emerald-500/50 hover:text-emerald-400 dark:hover:border-emerald-400/50 dark:hover:text-emerald-300',
      colSpan: 'md:col-span-3',
      skills: ['Figma','Azure DevOps','Visual Studio','VS Code','Git','Azure AD B2C','Microsoft 365','Webpack','Karma/Jasmine','HealthKit','Garmin SDK'],
    },
  ];

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-24 px-6 bg-zinc-50 dark:bg-zinc-950 overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_35%_at_50%_0%,rgba(99,102,241,0.07),transparent)] dark:bg-[radial-gradient(ellipse_70%_35%_at_50%_0%,rgba(99,102,241,0.1),transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-indigo-500 dark:text-indigo-400 mb-4">
            {t('skills.label')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
            {t('skills.title')}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed text-base">
            {t('skills.description')}
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                className={`${cat.colSpan} rounded-2xl bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] p-6 transition-colors duration-300`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-9 h-9 rounded-xl ${cat.iconBg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-4 h-4 ${cat.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm leading-tight">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ delay: idx * 0.1 + i * 0.03, duration: 0.25 }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/50 ${cat.hoverBorder} transition-all duration-200 cursor-default`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
