import { useTranslation } from 'react-i18next';
import { CLIENTS } from '../data/site';

/** Deliberately quiet: no heading, one line, let the names do the work. */
export function Clients() {
  const { t } = useTranslation();

  return (
    <section className="border-b border-line bg-ground-2 py-6 md:py-0">
      <div className="shell md:flex md:h-24 md:items-center md:justify-between">
      <span className="label text-[10px] tracking-[0.09em] text-faint md:text-[11px]">
        {t('clients.label')}
      </span>

      <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2 md:mt-0 md:flex-1 md:justify-between md:gap-0 md:pl-10">
        {CLIENTS.map((name) => (
          <span key={name} className="text-[19px] font-semibold tracking-[0.01em] text-muted">
            {name}
          </span>
        ))}

        <span className="hidden h-[30px] w-px bg-editor-border md:block" aria-hidden="true" />

        <span className="text-[19px] font-semibold tracking-[0.01em] whitespace-nowrap text-accent-ink">
          {t('clients.own')}{' '}
          <span className="font-mono text-[10.5px] font-normal tracking-[0.06em] text-faint uppercase">
            {t('clients.ownNote')}
          </span>
        </span>
      </div>
      </div>
    </section>
  );
}
