import { useEffect, useReducer, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Segment, Token } from '../data/site';
import {
  ANGULAR_SOURCE,
  ANGULAR_SOURCE_COMPACT,
  BUILD_LOG,
  BUILD_LOG_COMPACT,
  METRIC_FEED_SOURCE,
} from '../data/site';

const FILES = [
  { name: 'metric-card.component.ts', source: ANGULAR_SOURCE },
  { name: 'metric-feed.service.ts', source: METRIC_FEED_SOURCE },
] as const;

const TOKEN_VAR: Record<Token, string> = {
  kw: 'var(--code-kw)',
  type: 'var(--code-type)',
  str: 'var(--code-str)',
  punct: 'var(--code-punct)',
  id: 'var(--code-id)',
};

const TICK_MS = 34;
const CODE_CHARS_PER_TICK = 4;
const LOG_CHARS_PER_TICK = 2;
const HOLD_TICKS = 80;

type Phase = 'writing' | 'building' | 'holding';
type State = { phase: Phase; line: number; ch: number; hold: number };

const START: State = { phase: 'writing', line: 0, ch: 0, hold: 0 };

function lineLength(segments: Segment[]) {
  return segments.reduce((n, [text]) => n + text.length, 0);
}

function advance(state: State, ctx: { code: Segment[][]; log: { text: string }[] }): State {
  if (state.hold > 0) {
    return state.hold === 1 ? START : { ...state, hold: state.hold - 1 };
  }

  if (state.phase === 'writing') {
    if (state.line >= ctx.code.length) return { phase: 'building', line: 0, ch: 0, hold: 0 };
    const len = lineLength(ctx.code[state.line]);
    if (state.ch < len) {
      return { ...state, ch: Math.min(len, state.ch + CODE_CHARS_PER_TICK) };
    }
    return { ...state, line: state.line + 1, ch: 0 };
  }

  if (state.phase === 'building') {
    if (state.line >= ctx.log.length) return { ...state, phase: 'holding', hold: HOLD_TICKS };
    const len = ctx.log[state.line].text.length;
    if (state.ch < len) {
      return { ...state, ch: Math.min(len, state.ch + LOG_CHARS_PER_TICK) };
    }
    return { ...state, line: state.line + 1, ch: 0 };
  }

  return state;
}

/** Reveal a line up to `upto` characters, keeping each segment's colour. */
function sliceLine(segments: Segment[], upto: number) {
  const out: { text: string; token: Token }[] = [];
  let seen = 0;
  for (const [text, token] of segments) {
    if (seen >= upto) break;
    out.push({ text: text.slice(0, Math.max(0, upto - seen)), token });
    seen += text.length;
  }
  return out;
}

function Caret() {
  return (
    <span
      className="animate-blink ml-[2px] inline-block h-[0.95em] w-[6px] translate-y-[2px] bg-accent"
      aria-hidden="true"
    />
  );
}

export function CodeEditor({ compact = false }: { compact?: boolean }) {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);

  const code = compact ? ANGULAR_SOURCE_COMPACT : FILES[active].source;
  const log = compact ? BUILD_LOG_COMPACT : BUILD_LOG;

  const ctx = useRef({ code, log });
  ctx.current = { code, log };

  const [state, tick] = useReducer(
    (s: State, action?: 'reset') => (action === 'reset' ? START : advance(s, ctx.current)),
    START,
  );

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const id = window.setInterval(tick, TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  // Opening the other file starts it from a blank buffer, the way a real one would.
  function openFile(index: number) {
    if (index === active) return;
    setActive(index);
    tick('reset');
  }

  const writing = state.phase === 'writing';
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // With motion off the whole thing is simply shown finished.
  const codeLineCount = writing && !reducedMotion ? state.line : code.length;
  const logLineCount = reducedMotion ? log.length : writing ? 0 : state.line;

  return (
    <div className="border border-editor-border bg-window">
      {/* title bar */}
      <div className="relative flex h-9 items-center border-b border-editor-border bg-editor-titlebar px-3.5">
        <div className="flex gap-2" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="pointer-events-none absolute inset-x-0 text-center font-mono text-[10px] text-faint sm:text-[11.5px]">
          {compact ? 'metric-card.component.ts' : `angular-playground — ${FILES[active].name}`}
        </span>
      </div>

      {/* tab bar — desktop only, it has no room on a phone */}
      {!compact && (
        <div className="hidden h-[34px] items-stretch border-b border-editor-border bg-editor-tabbar sm:flex">
          {FILES.map((file, i) => {
            const isActive = i === active;
            return (
              <button
                key={file.name}
                type="button"
                onClick={() => openFile(i)}
                aria-current={isActive ? 'true' : undefined}
                className={`flex cursor-pointer items-center gap-2.5 border-r border-editor-border border-t-2 px-4 font-mono text-[11.5px] transition-colors ${
                  isActive
                    ? 'border-t-accent bg-window text-ink'
                    : 'border-t-transparent text-faint hover:bg-window/40 hover:text-body'
                }`}
              >
                <span className={`font-medium ${isActive ? 'text-[#E0514A]' : 'opacity-70'}`}>TS</span>
                {file.name}
              </button>
            );
          })}
        </div>
      )}

      {/* code */}
      <div className="overflow-hidden py-3 font-mono text-[10.5px] leading-[18px] sm:py-3.5 sm:text-[12.5px] sm:leading-[21px]">
        {code.slice(0, codeLineCount).map((segments, i) => (
          <div key={i} className="flex">
            <span className="w-[34px] shrink-0 pr-3 text-right text-code-gutter sm:w-[46px] sm:pr-4">
              {i + 1}
            </span>
            <span className="whitespace-pre">
              {sliceLine(segments, Infinity).map((part, j) => (
                <span key={j} style={{ color: TOKEN_VAR[part.token] }}>
                  {part.text}
                </span>
              ))}
            </span>
          </div>
        ))}

        {writing && !reducedMotion && state.line < code.length && (
          <div className="flex">
            <span className="w-[34px] shrink-0 pr-3 text-right text-code-gutter sm:w-[46px] sm:pr-4">
              {state.line + 1}
            </span>
            <span className="whitespace-pre">
              {sliceLine(code[state.line], state.ch).map((part, j) => (
                <span key={j} style={{ color: TOKEN_VAR[part.token] }}>
                  {part.text}
                </span>
              ))}
              <Caret />
            </span>
          </div>
        )}
      </div>

      {/* integrated terminal */}
      <div className="border-t border-editor-border bg-editor-terminal px-3 pt-2.5 pb-3 sm:px-4 sm:pt-3 sm:pb-3.5">
        <div className="label mb-2 text-[9px] text-faint sm:text-[10px]">{t('angular.terminal')}</div>
        <div className="min-h-[68px] font-mono text-[10px] leading-[17px] sm:min-h-[80px] sm:text-[12px] sm:leading-5">
          {log.slice(0, logLineCount).map((entry, i) => (
            <div
              key={i}
              className="whitespace-pre"
              style={{ color: entry.cmd ? 'var(--ink)' : 'var(--accent-ink)' }}
            >
              {entry.text}
              {i === logLineCount - 1 && state.phase === 'holding' && <Caret />}
            </div>
          ))}

          {state.phase === 'building' && state.line < log.length && (
            <div
              className="whitespace-pre"
              style={{ color: log[state.line].cmd ? 'var(--ink)' : 'var(--accent-ink)' }}
            >
              {log[state.line].text.slice(0, state.ch)}
              <Caret />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
