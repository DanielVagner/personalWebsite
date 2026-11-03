import { Trans, useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import profilePic from '../../assets/profilpicture.jpg';
import { CodeBackdrop } from './CodeBackdrop';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section id="top" className="border-b border-line">
      <div className="shell-flush md:flex md:h-[686px]">
      {/* type column */}
      <div className="relative overflow-hidden md:w-[62%] md:shrink-0 lg:w-[790px]">
        <CodeBackdrop />

        <div className="relative flex h-full flex-col px-5 pt-8 pb-9 md:px-14 md:pt-11 md:pb-12">
          <div className="flex items-center gap-2.5">
            <span className="h-[7px] w-[7px] bg-accent" aria-hidden="true" />
            <span className="font-mono text-[10.5px] tracking-[0.09em] text-muted uppercase sm:text-[11.5px]">
              {t('hero.available')}
            </span>
          </div>

          <h1 className="display mt-7 text-[clamp(3rem,11vw,7.25rem)] leading-[0.88] md:mt-auto md:mb-0">
            {t('hero.title1')}
            <br />
            {t('hero.title2')}
            <br />
            {t('hero.title3')}
            <span className="text-accent-ink">.</span>
          </h1>

          <p className="mt-6 max-w-[540px] text-[17px] leading-[1.5] tracking-[-0.005em] text-body md:mt-8 md:text-xl">
            <Trans
              i18nKey="hero.lead"
              components={{ 1: <span className="text-ink" /> }}
            />
          </p>

          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row md:mt-9">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 bg-accent px-7 py-[18px] text-[13.5px] font-semibold tracking-[0.06em] text-on-accent uppercase transition-opacity hover:opacity-85"
            >
              {t('hero.cta')}
              <ArrowRight className="h-[15px] w-[15px]" strokeWidth={2.4} />
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center border border-line-strong px-7 py-[18px] text-[13.5px] font-semibold tracking-[0.06em] text-ink uppercase transition-colors hover:border-accent hover:text-accent-ink"
            >
              {t('hero.ctaSecondary')}
            </a>
          </div>
        </div>
      </div>

      {/* portrait, full-bleed to the edge */}
      <div className="relative overflow-hidden border-line md:grow md:border-l">
        <img
          src={profilePic}
          alt={t('hero.photoAlt')}
          className="block h-[330px] w-full object-cover md:h-full"
          style={{ objectPosition: '50% 18%' }}
        />
        <div className="absolute bottom-0 left-0 bg-ground px-5 py-4 md:px-6 md:py-5">
          <div className="text-base font-semibold tracking-[-0.01em] md:text-[17px]">Daniel Vágner</div>
          <div className="mt-1.5 font-mono text-[10px] tracking-[0.06em] text-muted uppercase md:text-[11px]">
            {t('hero.location')}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
