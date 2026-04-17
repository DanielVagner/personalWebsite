import { Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="text-xs text-zinc-600">
          © {currentYear} Daniel Vágner · {t('footer.built')}
        </span>
        <a
          href="https://github.com/DanielVagner/personalWebsite"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-indigo-400 transition-colors"
        >
          <Github className="w-3.5 h-3.5" />
          {t('footer.source')}
        </a>
      </div>
    </footer>
  );
}
