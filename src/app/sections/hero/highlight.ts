/**
 * Tiny syntax highlighter for the hero editor: Angular HTML templates (tags,
 * attributes, bindings, `@for`/`@if` blocks and `{{ }}` interpolation), coloured
 * with the VS Code Dark+ palette. Not a real parser – it only has to look right
 * for the handful of snippets shown in the hero.
 */

export interface Token {
  readonly text: string;
  readonly color: string;
}

export const DARK_PLUS = {
  text: '#D4D4D4',
  comment: '#6A9955',
  string: '#CE9178',
  control: '#C586C0',
  tag: '#569CD6',
  keyword: '#569CD6',
  fn: '#DCDCAA',
  number: '#B5CEA8',
  variable: '#9CDCFE',
  punct: '#808080',
} as const;

const C = DARK_PLUS;

type Mode = 'markup' | 'tag' | 'value' | 'binding' | 'interp' | 'paren' | 'comment';

interface Rule {
  /** Sticky regex; every capture group becomes one token. */
  readonly re: RegExp;
  readonly colors: readonly string[];
  readonly push?: Mode;
  readonly pop?: boolean;
}

const rule = (src: RegExp, colors: string[], extra: Partial<Rule> = {}): Rule => ({
  re: new RegExp(src.source, 'y'),
  colors,
  ...extra,
});

// Template expressions: interpolations, block conditions and bound attribute values.
const EXPR: Rule[] = [
  rule(/('(?:[^'\\]|\\.)*')/, [C.string]),
  rule(/(\()/, [C.text], { push: 'paren' }),
  rule(/(\|)(\s*)([A-Za-z_$][\w$]*)/, [C.text, C.text, C.fn]),
  rule(/(\b(?:track|of|let|as)\b)/, [C.control]),
  rule(/(\b(?:true|false|null|this)\b)/, [C.keyword]),
  rule(/([A-Za-z_$][\w$]*)(?=\s*\()/, [C.fn]),
  rule(/(\b\d+(?:\.\d+)?)/, [C.number]),
  rule(/([A-Za-z_$][\w$]*)/, [C.variable]),
  rule(/(\s+|.)/, [C.text]),
];

const RULES: Record<Mode, Rule[]> = {
  markup: [
    rule(/(<!--)/, [C.comment], { push: 'comment' }),
    rule(/(@(?:for|if|else|empty|switch|case|default|defer|let)\b)(\s*)(\()?/, [
      C.control,
      C.text,
      C.text,
    ]),
    rule(/(<\/?)([A-Za-z][\w-]*)/, [C.punct, C.tag], { push: 'tag' }),
    rule(/(\{\{)/, [C.text], { push: 'interp' }),
    rule(/([^<@{]+|.)/, [C.text]),
  ],
  tag: [
    rule(/(\/?>)/, [C.punct], { pop: true }),
    // [prop], (event), [(model)], *directive → value is an expression
    rule(/([[(*][\w.()[\]-]*)(=)(")/, [C.variable, C.text, C.string], { push: 'binding' }),
    rule(/([\w:.-]+)(=)(")/, [C.variable, C.text, C.string], { push: 'value' }),
    rule(/([\w:.[\]()*-]+)/, [C.variable]),
    rule(/(\s+|.)/, [C.text]),
  ],
  value: [rule(/([^"]*")/, [C.string], { pop: true }), rule(/(.+)/, [C.string])],
  binding: [rule(/(")/, [C.string], { pop: true }), ...EXPR],
  interp: [rule(/(\}\})/, [C.text], { pop: true }), ...EXPR],
  paren: [rule(/(\))/, [C.text], { pop: true }), ...EXPR],
  comment: [rule(/(.*?-->)/, [C.comment], { pop: true }), rule(/(.+)/, [C.comment])],
};

/** Highlights a whole file; open tags, strings and blocks carry across lines. */
export function highlight(lines: readonly string[]): Token[][] {
  const stack: Mode[] = ['markup'];
  return lines.map((line) => {
    const out: Token[] = [];
    let pos = 0;
    while (pos < line.length) {
      const mode = stack[stack.length - 1];
      let matched = false;
      for (const r of RULES[mode]) {
        r.re.lastIndex = pos;
        const m = r.re.exec(line);
        if (!m || m[0].length === 0) continue;
        r.colors.forEach((color, g) => {
          const text = m[g + 1];
          if (text) push(out, text, color);
        });
        pos += m[0].length;
        if (r.push) stack.push(r.push);
        else if (r.pop && stack.length > 1) stack.pop();
        // `@for (` / `@if (` opens the block condition
        if (mode === 'markup' && m[0].endsWith('(') && m[0].startsWith('@')) stack.push('paren');
        matched = true;
        break;
      }
      if (!matched) {
        push(out, line.slice(pos), C.text);
        break;
      }
    }
    return out;
  });
}

// Merges neighbouring tokens of the same colour to keep the DOM small.
function push(out: Token[], text: string, color: string): void {
  const last = out[out.length - 1];
  if (last && last.color === color) {
    out[out.length - 1] = { text: last.text + text, color };
  } else {
    out.push({ text, color });
  }
}
