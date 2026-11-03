import { useTranslation } from 'react-i18next';

/** The one inverted band on the page — it splits the dark in half. */
export function Process() {
  const { t } = useTranslation();
  const steps = ['s1', 's2', 's3', 's4'] as const;

  return (
    <section id="process" className="bg-accent py-10 text-on-accent md:pt-15 md:pb-16">
      <div className="shell">
      <div className="mb-8 md:mb-11 md:flex md:items-baseline md:justify-between md:gap-10">
        <h2 className="display text-[32px] leading-none md:text-[40px]">{t('process.title')}</h2>
        <p className="mt-3.5 max-w-[420px] text-base leading-[1.5] font-medium md:mt-0 md:text-right md:text-[16.5px]">
          {t('process.lead')}
        </p>
      </div>

      <ol className="m-0 list-none p-0 md:flex">
        {steps.map((key, i) => (
          <li
            key={key}
            className={`border-accent-edge py-5.5 first:pt-0 last:pb-0 md:grow md:basis-0 md:py-0 ${
              i < 3 ? 'border-b md:border-b-0' : ''
            } ${i > 0 ? 'md:border-l md:pl-7.5' : ''} ${i < 3 ? 'md:pr-7.5' : ''}`}
          >
            <div className="text-[40px] leading-none font-bold tracking-[-0.04em] md:text-[52px]">
              0{i + 1}
            </div>
            <h3 className="mt-3 text-lg font-bold tracking-[-0.01em] md:mt-4 md:text-[19px]">
              {t(`process.${key}.title`)}
            </h3>
            <p className="mt-1.5 text-[15px] leading-[1.55] text-on-accent-soft md:mt-2 md:text-[15.5px]">
              {t(`process.${key}.desc`)}
            </p>
          </li>
        ))}
      </ol>
      </div>
    </section>
  );
}
