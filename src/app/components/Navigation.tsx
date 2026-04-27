import { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const navItems = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language.startsWith('cs') ? 'en' : 'cs');
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['home', 'skills', 'about', 'experience', 'projects', 'contact'];
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

  const isCS = i18n.language.startsWith('cs');

  const LangToggle = () => (
    <button
      onClick={toggleLang}
      className="px-2.5 py-1.5 rounded-full text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/50 transition-all duration-200 cursor-pointer tracking-wide"
      title={isCS ? 'Switch to English' : 'Přepnout do češtiny'}
    >
      {isCS ? 'EN' : 'CS'}
    </button>
  );

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
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <button
            onClick={() => navigate('/cv')}
            className="px-4 py-1.5 rounded-full text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-sm shadow-indigo-500/25 cursor-pointer"
          >
            CV
          </button>

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
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
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
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-200/50 dark:border-white/8 px-4 pb-4"
            >
              <div className="grid grid-cols-2 gap-1.5 pt-3">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.035 }}
                      onClick={() => scrollToSection(item.href)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400'
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
              </div>
              <motion.button
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.035 }}
                onClick={() => { navigate('/cv'); setIsMobileMenuOpen(false); }}
                className="mt-2 w-full px-4 py-3 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-all text-center cursor-pointer"
              >
                CV
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
