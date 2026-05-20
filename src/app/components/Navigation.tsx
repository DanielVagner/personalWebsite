import { useState, useEffect, useRef } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { FileUser, Globe } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';

const languages = [
  { code: 'en', country: 'GB', label: 'English' },
  { code: 'cs', country: 'CZ', label: 'Čeština' },
];

function LangToggle() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const currentLang = languages.find(l => i18n.language.startsWith(l.code)) ?? languages[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="p-1.5 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/80 dark:hover:bg-teal-950/50 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <Globe className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full mt-2 right-0 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/8 rounded-xl shadow-lg shadow-black/10 dark:shadow-black/40 overflow-hidden min-w-[130px] z-50"
          >
            {languages.map(lang => {
              const isActive = currentLang.code === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => { i18n.changeLanguage(lang.code); setOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5'
                  }`}
                >
                  <ReactCountryFlag countryCode={lang.country} svg style={{ width: '1.2em', height: '1.2em', borderRadius: '2px' }} />
                  <span>{lang.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const navItems = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };


  return (
    <>
      {/* ── Desktop: floating pill ─────────────────────────────── */}
      <div className="fixed top-5 left-0 right-0 z-50 hidden md:flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center gap-0.5 rounded-full px-3 py-2 transition-all duration-400 ${
            isScrolled
              ? 'bg-white/85 dark:bg-zinc-950/85 backdrop-blur-2xl shadow-xl shadow-black/8 dark:shadow-black/40 border border-zinc-200/70 dark:border-white/8'
              : 'bg-white/55 dark:bg-zinc-950/55 backdrop-blur-md border border-white/40 dark:border-white/5'
          }`}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-teal-500/10 dark:bg-teal-400/10 text-teal-600 dark:text-teal-400'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-500/8 dark:hover:bg-teal-400/8'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <button
            onClick={() => navigate('/cv')}
            className="px-3 py-1.5 rounded-full text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-500/8 dark:hover:bg-teal-400/8 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            CV
          </button>

          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-700 mx-1" />

          <LangToggle />

          <div className="ml-1">
            <ThemeToggle />
          </div>
        </motion.nav>
      </div>


      {/* ── Mobile ─────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className={`flex items-center justify-between px-5 py-3.5 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-200/50 dark:border-white/8'
            : 'bg-transparent'
        }`}>
          {/* Hamburger — left */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-5 flex flex-col justify-center items-center relative">
              <motion.span animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 0 : -5 }} transition={{ duration: 0.25 }} className="w-5 h-0.5 bg-current absolute" />
              <motion.span animate={{ opacity: isMobileMenuOpen ? 0 : 1 }} transition={{ duration: 0.15 }} className="w-5 h-0.5 bg-current absolute" />
              <motion.span animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? 0 : 5 }} transition={{ duration: 0.25 }} className="w-5 h-0.5 bg-current absolute" />
            </div>
          </button>

          {/* Lang + Theme — right */}
          <div className="flex items-center gap-1">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="bg-white/98 dark:bg-zinc-950/98 backdrop-blur-2xl border-b border-zinc-200/50 dark:border-white/8 px-5 pb-5"
            >
              {/* Nav items — single column */}
              <div className="flex flex-col pt-1">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.18 }}
                      onClick={() => scrollToSection(item.href)}
                      className={`flex items-center gap-3 py-3 text-sm font-medium text-left transition-colors cursor-pointer border-b border-zinc-100 dark:border-zinc-800/60 last:border-0 ${
                        isActive
                          ? 'text-teal-600 dark:text-teal-400'
                          : 'text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                        isActive ? 'bg-teal-500' : 'bg-zinc-300 dark:bg-zinc-700'
                      }`} />
                      {item.label}
                    </motion.button>
                  );
                })}
              </div>

              {/* Bottom row: site name + CV button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navItems.length * 0.03 + 0.05 }}
                className="flex items-center justify-between mt-4"
              >
                <span className="text-xs text-zinc-400 dark:text-zinc-600 font-mono">daniel-vagner.dev</span>
                <button
                  onClick={() => { navigate('/cv'); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-colors cursor-pointer"
                >
                  <FileUser className="w-3.5 h-3.5" />
                  CV
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
