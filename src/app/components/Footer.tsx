import { useTranslation } from 'react-i18next';
import { CONTACT } from '../data/site';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ground-2">
      <div className="shell">
      <div className="flex flex-col gap-1.5 border-t border-line py-6 font-mono text-[10px] leading-[1.9] tracking-[0.04em] text-faint md:flex-row md:items-center md:justify-between md:gap-4 md:py-6.5 md:text-[11px] md:leading-normal">
        <span>{CONTACT.site}</span>
        <span>{t('footer.legal')}</span>
        <span>© {year}</span>
      </div>
      </div>
    </footer>
  );
}
