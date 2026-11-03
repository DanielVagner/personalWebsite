import { useEffect } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Download } from 'lucide-react';
import { CONTACT } from '../data/site';
import profilePic from '../../assets/profilpicture.jpg';

const JOBS = [
  { id: 'htec', period: '2025 —', current: true },
  { id: 'freelance', period: '2015 —', current: true },
  { id: 'certicon', period: '2019 – 2025', duration: '6 yrs 1 mo' },
  { id: 'ccvis', period: '2022', duration: '3 mos' },
  { id: 'foxconn', period: '2018 – 2019', duration: '1 yr 4 mos' },
  { id: 'educa', period: '2016 – 2018' },
] as const;

const STACK = {
  frontend: ['Angular', 'React', 'TypeScript', 'RxJS', 'NGXS', 'Micro-frontends', 'SCSS'],
  mobile: ['Ionic', 'React Native', 'Capacitor', 'HealthKit', 'Garmin SDK'],
  backend: ['C# / .NET', 'ASP.NET Web API', 'Azure', 'Azure AD B2C'],
  tools: ['Figma', 'Git', 'Azure DevOps', 'Karma / Jasmine'],
} as const;

const SHIPPED = [
  'Hudba na vinicích',
  'Tolion — Brain Health Coach',
  'QR Ticketing System',
  'Findtastic',
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="cv-label label mb-4.5 border-b border-line pb-3.5 text-accent-ink">{children}</div>
  );
}

export function CV() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'Daniel Vágner — CV';
    return () => {
      document.title = 'Daniel Vágner — I build web and mobile apps';
    };
  }, []);

  function print() {
    const previous = document.title;
    document.title = 'Daniel_Vagner_CV';
    window.print();
    document.title = previous;
  }

  return (
    <div className="min-h-screen bg-ground print:bg-white">
      {/*
        On screen this is the site's CV. On paper it has to be an A4 document:
        white, two real columns inside 186mm, and typeset in points so it holds
        its shape at any printer DPI. The screen layout's fixed 700px column is
        wider than the printable area, which is what pushed it to three pages.
      */}
      <style>{`
        /*
          Zero page margin on purpose: browsers draw their own URL/title/date
          headers into the page margin, so removing the margin removes them.
          The document's real margin then comes from padding on .cv-root.
        */
        @page { size: A4; margin: 0; }

        @media print {
          .cv-toolbar { display: none !important; }
          html, body { background: #fff !important; }

          .cv-root {
            --ground: #fff; --ground-2: #fff; --window: #fff;
            --ink: #0c0c0d; --body: #2b2b30; --muted: #45454b; --faint: #5c5c63;
            --line: #d5d5da; --line-strong: #0c0c0d; --accent-ink: #4d6b0f;
            padding: 13mm 13mm 12mm !important;
            max-width: none !important;
            font-size: 9.5pt;
            line-height: 1.4;
          }

          .cv-root * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

          /* two columns, sized to the page rather than to a breakpoint */
          .cv-cols { display: flex !important; gap: 6% !important; padding-top: 6mm !important; }
          .cv-main { width: 60% !important; flex: none !important; margin-top: 0 !important; }
          .cv-side { width: 34% !important; flex: none !important; margin-top: 0 !important; }

          .cv-head { padding-bottom: 4mm !important; margin-bottom: 0 !important;
                     border-bottom: 1.5pt solid #0c0c0d !important; gap: 6mm !important;
                     flex-direction: row !important; align-items: flex-end !important; }
          .cv-photo { width: 62px !important; height: 62px !important; }
          .cv-name { font-size: 26pt !important; line-height: 0.92 !important; }
          .cv-role { font-size: 10pt !important; margin-bottom: 2mm !important; }
          .cv-contact { font-size: 7.6pt !important; line-height: 1.7 !important; text-align: right !important; }

          .cv-summary { font-size: 9pt !important; line-height: 1.45 !important; margin-bottom: 5mm !important; }
          .cv-label { font-size: 7.5pt !important; margin-bottom: 3mm !important; padding-bottom: 2mm !important; }

          .cv-entry { margin-bottom: 4mm !important; gap: 4mm !important;
                      flex-direction: row !important; break-inside: avoid; page-break-inside: avoid; }
          .cv-period { width: 22mm !important; font-size: 7.6pt !important; padding-top: 0.5mm !important; }
          .cv-job { font-size: 10.5pt !important; }
          .cv-org { font-size: 7.8pt !important; margin-top: 0.8mm !important; }
          .cv-desc { font-size: 8.6pt !important; line-height: 1.4 !important; margin-top: 1.2mm !important; }

          .cv-group { margin-bottom: 3.5mm !important; }
          .cv-group-title { font-size: 8.5pt !important; margin-bottom: 1.5mm !important; }
          .cv-chip { font-size: 7.4pt !important; padding: 1pt 4pt !important;
                     border: 0.5pt solid #b9b9bf !important; background: #fff !important; }
          .cv-list { font-size: 8.6pt !important; line-height: 1.6 !important; }
          .cv-block { margin-bottom: 5mm !important; }
        }
      `}</style>

      <div className="cv-toolbar border-b border-line">
        <div className="shell flex h-[72px] items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.08em] text-muted uppercase no-underline transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.2} />
            <span className="hidden sm:inline">{t('cv.back')}</span>
          </Link>
          <button
            type="button"
            onClick={print}
            className="inline-flex items-center gap-2.5 bg-accent px-5 py-3 text-[13px] font-semibold tracking-[0.06em] text-on-accent uppercase transition-opacity hover:opacity-85"
          >
            <Download className="h-[15px] w-[15px]" strokeWidth={2.2} />
            {t('cv.download')}
          </button>
        </div>
      </div>

      <div className="cv-root shell py-10 md:pt-14 md:pb-15">
        {/* name block — the one round thing on an otherwise square site */}
        <div className="cv-head flex flex-col gap-5 border-b-2 border-accent pb-7 md:flex-row md:items-end md:justify-between md:gap-10 md:pb-8">
          <div className="flex items-center gap-5 md:items-end">
            <img
              src={profilePic}
              alt="Daniel Vágner"
              className="cv-photo h-[76px] w-[76px] shrink-0 rounded-full object-cover md:h-[92px] md:w-[92px]"
              style={{ objectPosition: '50% 18%' }}
            />
            <h1 className="cv-name display m-0 text-[38px] leading-[0.9] md:text-[64px]">
              Daniel
              <br />
              Vágner
            </h1>
          </div>

          <div className="md:text-right">
            <div className="cv-role text-[17px] font-semibold tracking-[-0.01em] md:mb-4 md:text-[19px]">
              {t('cv.role')}
            </div>
            <div className="cv-contact mt-2 font-mono text-[11.5px] leading-[1.9] tracking-[0.03em] text-muted md:mt-0 md:text-xs md:leading-[2]">
              <div>{CONTACT.email}</div>
              <div>
                {CONTACT.linkedinLabel} · {CONTACT.githubLabel}
              </div>
              <div>Prague, Czechia · Remote · CS / EN</div>
            </div>
          </div>
        </div>

        <div className="cv-cols pt-8 md:flex md:gap-14 md:pt-10">
          <div className="cv-main md:w-[700px] md:shrink-0">
            <p className="cv-summary m-0 mb-8 text-base leading-[1.65] text-body md:mb-10 md:text-[17px]">
              {t('cv.summary')}
            </p>

            <SectionLabel>{t('cv.experience')}</SectionLabel>

            {JOBS.map((job) => (
              <div key={job.id} className="cv-entry mb-6 flex flex-col gap-2 md:mb-6.5 md:flex-row md:gap-6">
                <div className="cv-period shrink-0 pt-1 font-mono text-[11.5px] leading-[1.7] tracking-[0.03em] text-faint md:w-28">
                  {job.period}
                  {'current' in job && job.current ? (
                    <>
                      <br />
                      <span className="text-accent-ink">{t('cv.current')}</span>
                    </>
                  ) : 'duration' in job && job.duration ? (
                    <>
                      <br />
                      {job.duration}
                    </>
                  ) : null}
                </div>
                <div>
                  <div className="cv-job text-[18px] font-semibold tracking-[-0.015em] md:text-[19px]">
                    {t(`cv.jobs.${job.id}.role`)}{' '}
                    {t(`cv.jobs.${job.id}.roleNote`, { defaultValue: '' }) && (
                      <span className="font-normal text-muted">
                        {t(`cv.jobs.${job.id}.roleNote`, { defaultValue: '' })}
                      </span>
                    )}
                  </div>
                  <div className="cv-org mt-1.5 font-mono text-xs tracking-[0.06em] text-accent-ink uppercase">
                    {t(`cv.jobs.${job.id}.org`)}
                  </div>
                  <p className="cv-desc m-0 mt-2.5 text-[15px] leading-[1.65] text-muted">
                    {t(`cv.jobs.${job.id}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="cv-side mt-10 md:mt-0 md:grow">
            <SectionLabel>{t('cv.stack')}</SectionLabel>

            {(
              [
                ['frontend', STACK.frontend],
                ['mobile', STACK.mobile],
                ['backend', STACK.backend],
                ['tools', STACK.tools],
              ] as const
            ).map(([key, items]) => (
              <div key={key} className="cv-group mb-5.5">
                <div className="cv-group-title mb-2.5 text-sm font-semibold">{t(`cv.${key}`)}</div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="cv-chip border border-line px-2.5 py-1.5 font-mono text-[11px] text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div className="cv-block mt-8.5">
              <SectionLabel>{t('cv.shipped')}</SectionLabel>
              <div className="cv-list mb-8.5 text-[15px] leading-[1.9] text-body">
                {SHIPPED.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </div>

            <div className="cv-block">
              <SectionLabel>{t('cv.education')}</SectionLabel>
              <div className="mb-8.5">
                <div className="cv-group-title text-[15px] leading-[1.5] font-semibold">
                  {t('cv.school')}
                </div>
                <div className="cv-list mt-1.5 text-[14.5px] text-muted">{t('cv.field')}</div>
                <div className="cv-period mt-2 font-mono text-[11.5px] text-faint">2010 – 2013</div>
              </div>
            </div>

            <div className="cv-block">
              <SectionLabel>{t('cv.languages')}</SectionLabel>
              <div className="cv-list flex flex-col gap-2.5 text-[15px] text-body">
                <div className="flex justify-between">
                  <span>{t('cv.czech')}</span>
                  <span className="font-mono text-xs text-muted">{t('cv.native')}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('cv.english')}</span>
                  <span className="font-mono text-xs text-muted">{t('cv.englishLevel')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
