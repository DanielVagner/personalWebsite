import { useTranslation } from 'react-i18next';
import { FEATURED, INDEXED, SECONDARY } from '../data/site';

export function Work() {
  const { t } = useTranslation();

  return (
    <section id="work" className="py-12 md:pt-26 md:pb-28">
      <div className="shell-flush">
      <div className="mb-8 px-5 md:mb-14 md:flex md:items-start md:gap-20 md:px-14">
        <span className="label w-[120px] shrink-0 text-accent-ink md:pt-3.5">{t('work.label')}</span>
        <h2 className="mt-4 max-w-[900px] text-[33px] leading-[1.06] font-semibold tracking-[-0.035em] md:mt-0 md:text-[62px] md:leading-[1.02]">
          {t('work.title')}
        </h2>
      </div>

      {/* lead project: store screenshots stood in a row, bottoms running out of the band */}
      <article className="mb-11 md:mb-16">
        <div className="h-[230px] overflow-hidden bg-ground-2 md:h-[400px]">
          <div className="flex h-full items-start gap-[3%] px-[5%] md:gap-[2.2%] md:px-[4%]">
            {FEATURED.shots.map((shot, i) => (
              <img
                key={shot}
                src={shot}
                alt=""
                loading={i === 0 ? undefined : 'lazy'}
                className={`block w-[29%] flex-none md:w-[17.2%] ${i > 2 ? 'hidden md:block' : ''}`}
              />
            ))}
          </div>
        </div>
        <div className="px-5 pt-5 md:flex md:gap-20 md:px-14 md:pt-8">
          <div className="md:w-[480px] md:shrink-0">
            <h3 className="display text-[30px] leading-none md:text-[42px]">
              {t(`work.items.${FEATURED.id}.title`)}
            </h3>
            <div className="mt-3 font-mono text-[10.5px] tracking-[0.08em] text-accent-ink uppercase md:mt-4 md:text-[11.5px]">
              {t(`work.items.${FEATURED.id}.stack`)}
            </div>
          </div>
          <p className="mt-3.5 grow text-[16.5px] leading-[1.6] text-body md:mt-0 md:pt-1 md:text-[18px]">
            {t(`work.items.${FEATURED.id}.desc`)}
          </p>
        </div>
      </article>

      {/* uneven pair */}
      <div className="px-5 md:flex md:gap-5 md:px-14">
        {SECONDARY.map((project, i) => (
          <article key={project.id} className={i === 0 ? 'md:w-[700px] md:shrink-0' : 'mt-10 md:mt-0 md:grow'}>
            {project.contain ? (
              <div className="flex h-[200px] items-center justify-center bg-ground-2 md:h-[340px]">
                <img
                  src={project.image}
                  alt={t(`work.items.${project.id}.title`)}
                  className="max-h-[46%] max-w-[54%] object-contain"
                />
              </div>
            ) : (
              <img
                src={project.image}
                alt={t(`work.items.${project.id}.title`)}
                className="block h-[210px] w-full object-cover md:h-[340px]"
              />
            )}
            <h3 className="display mt-5 text-2xl leading-[1.02] md:mt-6 md:text-[28px]">
              {t(`work.items.${project.id}.title`)}
            </h3>
            <p className="mt-3 text-base leading-[1.6] text-muted md:text-[16.5px]">
              {t(`work.items.${project.id}.desc`)}
            </p>
            <div className="mt-3 font-mono text-[10px] tracking-[0.08em] text-faint uppercase md:mt-3.5 md:text-[11px]">
              {t(`work.items.${project.id}.stack`)}
            </div>
          </article>
        ))}
      </div>

      {/* compact index of the rest */}
      <div className="mt-11 px-5 md:mt-17 md:px-14">
        <div className="flex items-center justify-between border-b border-line pb-3.5 md:pb-4">
          <span className="label text-[10px] text-faint md:text-[11px]">{t('work.also')}</span>
          <a
            href="#work"
            className="hidden font-mono text-[11px] tracking-[0.1em] text-ink uppercase transition-colors hover:text-accent-ink md:inline"
          >
            {t('work.all')}
          </a>
        </div>

        {INDEXED.map((project) => (
          <a
            key={project.id}
            href="#work"
            className="group flex items-center gap-4 border-b border-line py-[18px] text-ink no-underline md:gap-8 md:py-[22px]"
          >
            <img
              src={project.image}
              alt=""
              className={`block h-[42px] w-[62px] shrink-0 md:h-14 md:w-[92px] ${
                project.contain ? 'bg-ground-2 object-contain' : 'object-cover object-top'
              }`}
            />
            <span className="grow md:flex md:items-center md:gap-8">
              <span className="block text-[18px] font-semibold tracking-[-0.025em] transition-colors group-hover:text-accent-ink md:w-[320px] md:shrink-0 md:text-2xl">
                {t(`work.items.${project.id}.title`)}
              </span>
              <span className="mt-1 block font-mono text-[10px] tracking-[0.08em] text-faint uppercase md:hidden">
                {t(`work.items.${project.id}.kind`)}
              </span>
              <span className="hidden grow text-[16.5px] text-muted md:block">
                {t(`work.items.${project.id}.desc`)}
              </span>
              <span className="hidden shrink-0 font-mono text-[11px] tracking-[0.08em] text-faint uppercase md:block">
                {t(`work.items.${project.id}.kind`)}
              </span>
            </span>
          </a>
        ))}

        <a
          href="#work"
          className="mt-5 block border border-line-strong py-4 text-center font-mono text-[11px] tracking-[0.1em] text-ink uppercase transition-colors hover:border-accent hover:text-accent-ink md:hidden"
        >
          {t('work.all')}
        </a>
      </div>
      </div>
    </section>
  );
}
