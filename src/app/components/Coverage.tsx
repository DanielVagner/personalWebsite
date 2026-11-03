import { useTranslation } from 'react-i18next';

/** The four things a client can actually buy, then the stack underneath. */
export function Coverage() {
  const { t } = useTranslation();

  const pillars = [
    { title: t('coverage.mobile'), note: t('coverage.mobileNote') },
    { title: t('coverage.webapps'), note: t('coverage.webappsNote') },
    { title: t('coverage.sites'), note: t('coverage.sitesNote') },
    { title: t('coverage.backend'), note: t('coverage.backendNote') },
  ];

  const rows = [
    { label: t('coverage.rowMobile'), value: t('coverage.rowMobileValue') },
    { label: t('coverage.rowWeb'), value: t('coverage.rowWebValue') },
    { label: t('coverage.rowBackend'), value: t('coverage.rowBackendValue') },
    { label: t('coverage.rowAlso'), value: t('coverage.rowAlsoValue') },
  ];

  return (
    <section className="border-b border-line py-10 md:pt-[72px] md:pb-[76px]">
      <div className="shell">
      <div className="mb-8 md:mb-10 md:flex md:items-end md:justify-between md:gap-10">
        <span className="label text-accent-ink">{t('coverage.label')}</span>
        <p className="mt-4 max-w-[470px] text-base leading-[1.55] text-muted md:mt-0 md:text-right md:text-[16.5px]">
          {t('coverage.lead')}
        </p>
      </div>

      <div className="border-t border-line-strong md:flex md:border-b md:border-b-line">
        {pillars.map((p, i) => (
          <div
            key={p.title}
            className={`flex items-baseline justify-between gap-3 border-b border-line py-[18px] md:block md:grow md:border-b-0 md:py-[26px] md:pb-7 ${
              i > 0 ? 'md:border-l md:border-l-line md:pl-[34px]' : ''
            }`}
          >
            <span className="display text-[27px] leading-none tracking-[-0.035em] md:text-4xl">
              {p.title}
            </span>
            <span className="shrink-0 font-mono text-[10px] tracking-[0.08em] text-faint uppercase md:mt-3.5 md:block md:text-[11px]">
              {p.note}
            </span>
          </div>
        ))}
      </div>

      <dl className="mt-0 md:mt-0">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`border-b border-line py-4 last:border-b-0 md:flex md:gap-10 md:py-0 ${
              i === 0 ? 'md:pt-5' : ''
            }`}
          >
            <dt className="mb-2 w-[150px] shrink-0 font-mono text-[10px] tracking-[0.1em] text-faint uppercase md:mb-0 md:pt-[19px] md:text-[11px]">
              {row.label}
            </dt>
            <dd
              className={`m-0 grow text-[15.5px] leading-[1.55] text-body md:border-b md:border-line md:pt-[18px] md:pb-3.5 md:text-[16.5px] ${
                i === rows.length - 1 ? 'md:border-b-0' : ''
              }`}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
      </div>
    </section>
  );
}
