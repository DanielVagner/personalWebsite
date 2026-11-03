import { useTranslation } from 'react-i18next';
import { CodeEditor } from './CodeEditor';

export function AngularSection() {
  const { t } = useTranslation();
  const points = ['p1', 'p2', 'p3', 'p4', 'p5'] as const;

  return (
    <section
      id="angular"
      className="border-b border-line bg-ground-3 py-10 md:pt-13 md:pb-14"
    >
      <div className="shell lg:flex lg:items-start lg:gap-14">
      {/* the pitch reads first on a phone, the window first on a desktop */}
      <div className="lg:order-2 lg:grow lg:pt-1.5">
        <span className="label text-accent-ink">{t('angular.label')}</span>
        <h2 className="display mt-4 text-[38px] leading-[0.94] md:mt-5 md:text-[52px]">
          {t('angular.title1')}
          <br />
          {t('angular.title2')}
          <span className="text-accent-ink">.</span>
        </h2>
        <p className="mt-4 text-base leading-[1.6] text-body md:mt-6 md:text-[17px]">
          {t('angular.lead')}
        </p>
        <ul className="mt-6 list-none border-t border-line pl-0 md:mt-7">
          {points.map((key) => (
            <li key={key} className="border-b border-line py-3 text-[15px] md:py-3.5 md:text-[15.5px]">
              {t(`angular.${key}`)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-7 lg:order-1 lg:mt-0 lg:w-[756px] lg:shrink-0">
        <CodeEditor />
      </div>
      </div>
    </section>
  );
}
