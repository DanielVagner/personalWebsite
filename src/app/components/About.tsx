import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { CAREER } from '../data/site';

export function About() {
  const { t } = useTranslation();

  const stats = [
    { value: '11', label: t('about.stat1'), accent: false },
    { value: '2016', label: t('about.stat2'), accent: false },
    { value: '1', label: t('about.stat3'), accent: true },
  ];

  const hires = [
    { title: t('about.hire1'), note: t('about.hire1Note') },
    { title: t('about.hire2'), note: t('about.hire2Note') },
    { title: t('about.hire3'), note: t('about.hire3Note') },
  ];

  return (
    <section id="about" className="py-12 md:pt-25 md:pb-26">
      <div className="shell md:flex md:items-start md:gap-20">
        <div className="md:w-[660px] md:shrink-0">
          <span className="label text-accent-ink">{t('about.label')}</span>

          <p className="mt-5 text-2xl leading-[1.32] font-medium tracking-[-0.025em] md:mt-6.5 md:text-[29px]">
            {t('about.pull')}
          </p>
          <p className="mt-5 text-base leading-[1.7] text-muted md:mt-6.5 md:text-[17px]">
            {t('about.p1')}
          </p>
          <p className="mt-4 text-base leading-[1.7] text-muted md:mt-4.5 md:text-[17px]">
            {t('about.p2')}
          </p>

          <div className="mt-8 flex border-t border-line pt-6 md:mt-11 md:pt-7">
            {stats.map((s) => (
              <div key={s.label} className="grow">
                <div
                  className={`text-[34px] leading-none font-bold tracking-[-0.04em] md:text-[44px] ${
                    s.accent ? 'text-accent-ink' : ''
                  }`}
                >
                  {s.value}
                </div>
                <div className="mt-2 font-mono text-[9.5px] tracking-[0.09em] text-faint uppercase md:mt-2.5 md:text-[10.5px]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 md:mt-0 md:grow">
          <span className="label text-faint">{t('about.career')}</span>

          <div className="mt-4 border-t border-line md:mt-5.5">
            {CAREER.map((job) => (
              <div key={job.id} className="flex gap-4 border-b border-line py-4 md:gap-5">
                <span
                  className={`w-[74px] shrink-0 pt-1 font-mono text-[11px] md:w-[82px] md:text-[11.5px] ${
                    job.accent ? 'text-accent-ink' : 'text-faint'
                  }`}
                >
                  {job.period}
                </span>
                <span>
                  <span className="block text-[15.5px] font-semibold md:text-[16.5px]">
                    {t(`about.jobs.${job.id}`)}
                  </span>
                  <span className="block text-sm text-muted md:text-[14.5px]">
                    {job.id === 'htec' && 'HTEC'}
                    {job.id === 'freelance' && t('about.jobs.freelanceNote')}
                    {job.id === 'certicon' && 'CertiCon'}
                    {job.id === 'foxconn' && 'Foxconn CZ'}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <Link
            to="/cv"
            className="mt-5 block border border-line-strong py-4 text-center font-mono text-[11px] tracking-[0.1em] text-ink uppercase transition-colors hover:border-accent hover:text-accent-ink md:mt-6.5 md:inline-block md:border-0 md:border-b md:px-0 md:py-2 md:pb-2"
          >
            {t('about.fullCv')}
          </Link>

          <div className="mt-10 border-t border-line pt-6 md:mt-13 md:pt-7">
            <span className="label text-faint">{t('about.hire')}</span>
            <dl className="mt-4.5 flex flex-col gap-3.5 md:mt-5 md:gap-4">
              {hires.map((h) => (
                <div key={h.title} className="flex items-baseline justify-between gap-4 md:gap-5">
                  <dt className="text-base font-semibold md:text-[16.5px]">{h.title}</dt>
                  <dd className="m-0 shrink-0 font-mono text-[10.5px] whitespace-nowrap text-muted md:text-[11px]">
                    {h.note}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4.5 text-[15px] leading-[1.6] text-faint md:mt-5">
              {t('about.priceNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
