import { BACKDROP } from '../data/site';

/**
 * The quiet layer: real code drifting up behind the hero type.
 * Rendered twice so the loop seams cleanly at -50%.
 */
export function CodeBackdrop({ className = '' }: { className?: string }) {
  const lines = [...BACKDROP, ...BACKDROP];

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="animate-drift absolute top-0 left-4 whitespace-pre font-mono text-[11px] leading-[2.1] md:left-10 md:text-[12.5px] md:leading-[2.06]">
        {lines.map((line, i) => (
          <div key={i} style={{ color: line.accent ? 'var(--texture-accent)' : 'var(--texture)' }}>
            {line.text === '' ? ' ' : line.text}
          </div>
        ))}
      </div>
    </div>
  );
}
