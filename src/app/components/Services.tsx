import { useTranslation } from 'react-i18next';

/** Title parked in the left column, the list runs down the right. */
export function Services() {
  const { t } = useTranslation();

  return (
    <section
      id="services"
      className="border-y border-line bg-ground-2 py-12 md:pt-24 md:pb-25"
    >
      <div className="shell md:flex md:items-start md:gap-20">
        <div className="md:w-[340px] md:shrink-0">
          <span className="label text-accent-ink">{t('services.label')}</span>
          <h2 className="mt-4 text-[33px] leading-[1.02] font-semibold tracking-[-0.035em] md:mt-5.5 md:text-[46px]">
            {t('services.title')}
          </h2>
          <p className="mt-4 text-base leading-[1.6] text-muted md:mt-5.5 md:text-[16.5px]">
            {t('services.lead')}
          </p>
        </div>

        <div className="mt-8 md:mt-0 md:grow">
          {/* the first one is the one I most want to sell, so it is bigger */}
          <div className="border-b border-line pb-6 md:pb-7.5">
            <div className="flex items-baseline gap-3.5 md:gap-5.5">
              <span className="shrink-0 font-mono text-[11px] text-accent-ink md:text-xs">01</span>
              <h3 className="text-[25px] leading-[1.08] font-semibold tracking-[-0.03em] md:text-[34px] md:leading-[1.05]">
                {t('services.s1.title')}
              </h3>
            </div>
            <p className="mt-3 ml-[25px] max-w-[620px] text-base leading-[1.6] text-body md:mt-3.5 md:ml-[34px] md:text-[17px]">
              {t('services.s1.desc')}
            </p>
            <div className="mt-3 ml-[25px] font-mono text-[10px] tracking-[0.08em] text-faint uppercase md:mt-3.5 md:ml-[34px] md:text-[11px]">
              {t('services.s1.stack')}
            </div>
          </div>

          {(['s2', 's3', 's4'] as const).map((key, i) => (
            <div
              key={key}
              className={`border-line py-5.5 md:py-6.5 ${i < 2 ? 'border-b' : 'pb-0'}`}
            >
              <div className="flex items-baseline gap-3.5 md:gap-5.5">
                <span className="shrink-0 font-mono text-[11px] text-accent-ink md:text-xs">
                  0{i + 2}
                </span>
                <h3 className="text-xl leading-[1.1] font-semibold tracking-[-0.025em] md:text-[25px]">
                  {t(`services.${key}.title`)}
                </h3>
              </div>
              <p className="mt-2.5 ml-[25px] max-w-[620px] text-[15.5px] leading-[1.6] text-muted md:ml-[34px] md:text-[16.5px]">
                {t(`services.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
