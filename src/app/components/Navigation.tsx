import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Mail, Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { CONTACT } from '../data/site';

const SECTIONS = [
  { id: 'work', key: 'nav.work' },
  { id: 'services', key: 'nav.services' },
  { id: 'about', key: 'nav.about' },
] as const;

function LangSwitch({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith('cs') ? 'cs' : 'en';

  if (size === 'lg') {
    return (
      <div className="flex gap-px">
        {(['en', 'cs'] as const).map((lng) => (
          <button
            key={lng}
            type="button"
            onClick={() => i18n.changeLanguage(lng)}
            aria-pressed={current === lng}
            className={`px-5 py-3.5 font-mono text-xs tracking-[0.06em] uppercase transition-colors ${
              current === lng ? 'bg-ink text-ground' : 'bg-ground-2 text-muted hover:text-ink'
            }`}
          >
            {lng}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-0.5">
      {(['en', 'cs'] as const).map((lng, i) => (
        <span key={lng} className="flex items-center">
          {i === 1 && <span className="px-0.5 text-[11px] text-line-strong">/</span>}
          <button
            type="button"
            onClick={() => i18n.changeLanguage(lng)}
            aria-pressed={current === lng}
            className={`px-1 py-1.5 font-mono text-[11.5px] uppercase transition-colors ${
              current === lng ? 'text-ink' : 'text-faint hover:text-ink'
            }`}
          >
            {lng}
          </button>
        </span>
      ))}
    </div>
  );
}

function ThemeSwitch({ className = '' }: { className?: string }) {
  const { t } = useTranslation();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? t('nav.toLight') : t('nav.toDark')}
      className={`flex p-1.5 text-muted transition-colors hover:text-ink ${className}`}
    >
      {mounted && isDark ? (
        <Sun className="h-4 w-4" strokeWidth={1.7} />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={1.7} />
      )}
    </button>
  );
}

export function Navigation() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  // The sheet owns the screen while it is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-ground">
        <div className="shell flex h-[58px] items-center justify-between md:h-[72px]">
        <a
          href="#top"
          className="text-[14.5px] font-bold tracking-[-0.01em] text-ink uppercase no-underline md:text-base"
        >
          Daniel Vágner
        </a>

        <nav className="hidden items-center gap-7.5 md:flex">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-[13px] font-medium tracking-[0.06em] text-muted uppercase no-underline transition-colors hover:text-ink"
            >
              {t(s.key)}
            </a>
          ))}
          <Link
            to="/cv"
            className="text-[13px] font-medium tracking-[0.06em] text-muted uppercase no-underline transition-colors hover:text-ink"
          >
            {t('nav.cv')}
          </Link>

          <span className="h-4 w-px bg-line" aria-hidden="true" />
          <LangSwitch />
          <ThemeSwitch />

          <a
            href="#contact"
            className="bg-accent px-[18px] py-[11px] text-[12.5px] font-semibold tracking-[0.06em] text-on-accent uppercase no-underline transition-opacity hover:opacity-85"
          >
            {t('nav.start')}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t('nav.menu')}
          aria-expanded={open}
          className="-mr-2 flex p-3 text-ink md:hidden"
        >
          <Menu className="h-5.5 w-5.5" strokeWidth={1.8} />
        </button>
        </div>
      </header>

      {/* full-screen sheet, not a dropdown */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ground md:hidden">
          <div className="flex h-[58px] shrink-0 items-center justify-between border-b border-line px-5">
            <span className="text-[14.5px] font-bold tracking-[-0.01em] uppercase">Daniel Vágner</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t('nav.close')}
              className="-mr-1 flex items-center gap-2.5 py-3.5 font-mono text-[11px] tracking-[0.1em] text-muted uppercase"
            >
              {t('nav.close')}
              <X className="h-5 w-5 text-ink" strokeWidth={1.8} />
            </button>
          </div>

          <nav className="flex grow flex-col overflow-y-auto px-5 pt-2">
            {[...SECTIONS.map((s) => ({ href: `#${s.id}`, label: t(s.key) })), { href: '/cv', label: t('nav.cv') }].map(
              (item, i) =>
                item.href.startsWith('#') ? (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4.5 border-b border-line py-[18px] text-ink no-underline"
                  >
                    <span className="w-6 shrink-0 font-mono text-[11.5px] text-accent-ink">
                      0{i + 1}
                    </span>
                    <span className="display text-[32px] leading-none">{item.label}</span>
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4.5 border-b border-line py-[18px] text-ink no-underline"
                  >
                    <span className="w-6 shrink-0 font-mono text-[11.5px] text-accent-ink">
                      0{i + 1}
                    </span>
                    <span className="display text-[32px] leading-none">{item.label}</span>
                  </Link>
                ),
            )}

            <div className="mt-6.5 flex items-center justify-between">
              <LangSwitch size="lg" />
              <ThemeSwitch className="bg-ground-2 p-3.5" />
            </div>

            <div className="mt-auto pb-5">
              <div className="flex gap-5 pb-5.5">
                <a href={`mailto:${CONTACT.email}`} aria-label="Email" className="text-muted">
                  <Mail className="h-5 w-5" strokeWidth={1.7} />
                </a>
                <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted">
                  <Linkedin className="h-5 w-5" strokeWidth={1.7} />
                </a>
                <a href={CONTACT.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted">
                  <Github className="h-5 w-5" strokeWidth={1.7} />
                </a>
              </div>

              <div className="border-t border-line pt-5">
                <div className="mb-3.5 flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
                  <span className="font-mono text-[10.5px] tracking-[0.08em] text-ink uppercase">
                    {t('hero.available')}
                  </span>
                </div>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block bg-accent py-[18px] text-center text-[13.5px] font-semibold tracking-[0.06em] text-on-accent uppercase no-underline"
                >
                  {t('hero.cta')}
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
