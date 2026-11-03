import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { CONTACT } from '../data/site';

type Status = 'idle' | 'loading' | 'success' | 'error';

const KINDS = ['mobile', 'web', 'mvp', 'rescue', 'unsure'] as const;

const fieldClass =
  'w-full border-0 border-b border-line-strong bg-transparent px-0 py-3 text-[17px] text-ink outline-none transition-colors focus:border-accent';

export function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [kind, setKind] = useState<(typeof KINDS)[number]>('mobile');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          message: `[${t(`contact.kinds.${kind}`)}]\n\n${form.message}`,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  const links = [
    { href: `mailto:${CONTACT.email}`, label: CONTACT.email },
    { href: CONTACT.linkedin, label: CONTACT.linkedinLabel },
    { href: CONTACT.github, label: CONTACT.githubLabel },
  ];

  return (
    <section
      id="contact"
      className="border-t border-line bg-ground-2 pt-12 md:pt-23"
    >
      <div className="shell md:flex md:gap-20">
        <div className="md:w-[540px] md:shrink-0">
          <span className="label text-accent-ink">{t('contact.label')}</span>
          <h2 className="display mt-5 text-[44px] leading-[0.92] md:mt-6.5 md:text-[66px]">
            {t('contact.title1')}
            <br />
            {t('contact.title2')}
            <br />
            {t('contact.title3')}
            <span className="text-accent-ink">.</span>
          </h2>
          <p className="mt-5 max-w-[420px] text-[16.5px] leading-[1.6] text-muted md:mt-7 md:text-[17.5px]">
            {t('contact.lead')}
          </p>

          <div className="mt-8 flex flex-col md:mt-11">
            {links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noreferrer'}
                className={`group flex items-center justify-between border-t border-line py-[17px] text-[15.5px] text-ink no-underline transition-colors hover:text-accent-ink md:py-[18px] md:text-[16.5px] ${
                  i === links.length - 1 ? 'border-b' : ''
                }`}
              >
                {link.label}
                <ArrowUpRight
                  className="h-4 w-4 text-faint transition-colors group-hover:text-accent-ink"
                  strokeWidth={2}
                />
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 grow md:mt-11">
          <div className="md:flex md:gap-5">
            <div className="grow">
              <label htmlFor="name" className="label mb-2.5 block text-[10.5px] text-faint">
                {t('contact.name')}
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={t('contact.namePlaceholder')}
                className={fieldClass}
              />
            </div>
            <div className="mt-6 grow md:mt-0">
              <label htmlFor="email" className="label mb-2.5 block text-[10.5px] text-faint">
                {t('contact.email')}
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={t('contact.emailPlaceholder')}
                className={fieldClass}
              />
            </div>
          </div>

          <fieldset className="mt-7 border-0 p-0 md:mt-7.5">
            <legend className="label mb-3 block text-[10.5px] text-faint">{t('contact.kind')}</legend>
            <div className="flex flex-wrap gap-2">
              {KINDS.map((k) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={kind === k}
                  onClick={() => setKind(k)}
                  className={`border px-4 py-2.5 text-[14.5px] transition-colors ${
                    kind === k
                      ? 'border-accent bg-accent font-semibold text-on-accent'
                      : 'border-line text-muted hover:border-line-strong hover:text-ink'
                  }`}
                >
                  {t(`contact.kinds.${k}`)}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-7 md:mt-7.5">
            <label htmlFor="message" className="label mb-2.5 block text-[10.5px] text-faint">
              {t('contact.message')}
            </label>
            <textarea
              id="message"
              rows={4}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder={t('contact.messagePlaceholder')}
              className={`${fieldClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="mt-8 w-full bg-accent px-8 py-[19px] text-[13.5px] font-semibold tracking-[0.06em] text-on-accent uppercase transition-opacity hover:opacity-85 disabled:opacity-60 md:mt-8.5 md:w-auto"
          >
            {status === 'loading' ? t('contact.sending') : t('contact.send')}
          </button>

          {status === 'success' && (
            <p role="status" className="mt-4 text-[15px] text-accent-ink">
              {t('contact.success')}
            </p>
          )}
          {status === 'error' && (
            <p role="alert" className="mt-4 text-[15px] text-[#E0514A]">
              {t('contact.error')}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
