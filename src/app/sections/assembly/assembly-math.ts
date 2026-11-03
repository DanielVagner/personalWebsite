/**
 * Pure scroll math for the sticky iPhone assembly scene.
 * Progress `p` runs 0..1 while the sticky stage travels through its section.
 */

export interface LayerState {
  x: number;
  y: number;
  z: number;
  rotate: number;
  opacity: number;
}

export interface PhoneState {
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  scale: number;
}

interface LayerKeyframe {
  start: number;
  end: number;
  from: LayerState;
}

/** Fly-in windows for layers 1..5 (header, ring card, stats, button, tab bar). */
const LAYER_KEYFRAMES: readonly LayerKeyframe[] = [
  { start: 0.14, end: 0.3, from: { x: -150, y: -40, z: 140, rotate: -8, opacity: 0.35 } },
  { start: 0.3, end: 0.46, from: { x: 170, y: -20, z: 180, rotate: 7, opacity: 0.35 } },
  { start: 0.46, end: 0.62, from: { x: -190, y: 30, z: 160, rotate: -6, opacity: 0.35 } },
  { start: 0.62, end: 0.78, from: { x: 110, y: 40, z: 120, rotate: 5, opacity: 0.35 } },
  { start: 0.66, end: 0.8, from: { x: -40, y: 80, z: 90, rotate: 0, opacity: 0.3 } },
];

export const LAYER_COUNT = LAYER_KEYFRAMES.length;

/** Step (0-based) on which each layer lands: header → Structure, ring → Content, stats → Data, button + tab bar → Controls. */
const LAYER_STEP: readonly number[] = [1, 2, 3, 4, 4];

const REST: LayerState = { x: 0, y: 0, z: 0, rotate: 0, opacity: 1 };

const PHONE_FROM: PhoneState = { rotateX: 12, rotateY: -30, rotateZ: -5, scale: 0.9 };
const PHONE_END = 0.85;
const GLOW_START = 0.8;

export function clamp(value: number, min = 0, max = 1): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function easeInOutCubic(t: number): number {
  const x = clamp(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

/** Local 0..1 progress of `p` inside the window [start, end]. */
export function segment(p: number, start: number, end: number): number {
  if (end <= start) return p >= end ? 1 : 0;
  return clamp((p - start) / (end - start));
}

function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

function round(value: number): number {
  return Math.round(value * 100) / 100 || 0; // `|| 0` normalises -0
}

/**
 * How far a tall section has scrolled past its sticky stage.
 * `viewportHeight` is the height of the sticky stage (normally the viewport).
 */
export function sectionProgress(rectTop: number, sectionHeight: number, viewportHeight: number): number {
  const travel = sectionHeight - viewportHeight;
  if (!(travel > 0)) return rectTop <= 0 ? 1 : 0;
  return clamp(-rectTop / travel);
}

/** Index of the active step (0..count-1) for progress `p`, evenly spaced. */
export function stepFromProgress(p: number, count: number): number {
  if (count <= 1) return 0;
  return Math.min(count - 1, Math.floor(clamp(p) * count));
}

/** Offset of layer `layerIndex` (1-based, 1..LAYER_COUNT); unknown layers are at rest. */
export function layerState(p: number, layerIndex: number): LayerState {
  const frame = LAYER_KEYFRAMES[layerIndex - 1];
  if (!frame) return { ...REST };
  const t = easeInOutCubic(segment(p, frame.start, frame.end));
  return {
    x: round(lerp(frame.from.x, REST.x, t)),
    y: round(lerp(frame.from.y, REST.y, t)),
    z: round(lerp(frame.from.z, REST.z, t)),
    rotate: round(lerp(frame.from.rotate, REST.rotate, t)),
    opacity: round(lerp(frame.from.opacity, REST.opacity, t)),
  };
}

/** Layer offset for a discrete step: off to the side until its step, then at rest. */
export function layerStateAtStep(step: number, layerIndex: number): LayerState {
  const frame = LAYER_KEYFRAMES[layerIndex - 1];
  if (!frame || step >= LAYER_STEP[layerIndex - 1]) return { ...REST };
  return { ...frame.from };
}

/** Phone tilt for a discrete step: flattens a bit more with every step, flat on the last one. */
export function phoneStateAtStep(step: number, count: number): PhoneState {
  return phoneState(count > 1 ? clamp(step / (count - 1)) * PHONE_END : 1);
}

/** Phone tilt: starts rotated in 3D and lies flat from 85 % on. */
export function phoneState(p: number): PhoneState {
  const t = easeInOutCubic(segment(p, 0, PHONE_END));
  return {
    rotateX: round(lerp(PHONE_FROM.rotateX, 0, t)),
    rotateY: round(lerp(PHONE_FROM.rotateY, 0, t)),
    rotateZ: round(lerp(PHONE_FROM.rotateZ, 0, t)),
    scale: Math.round(lerp(PHONE_FROM.scale, 1, t) * 1000) / 1000,
  };
}

/** Glow behind the phone fades in over the last fifth. */
export function glowOpacity(p: number): number {
  return round(easeInOutCubic(segment(p, GLOW_START, 1)));
}

export function layerTransform(s: LayerState): string {
  return `translate3d(${s.x}px, ${s.y}px, ${s.z}px) rotate(${s.rotate}deg)`;
}

export function phoneTransform(s: PhoneState): string {
  return `rotateY(${s.rotateY}deg) rotateX(${s.rotateX}deg) rotateZ(${s.rotateZ}deg) scale(${s.scale})`;
}
