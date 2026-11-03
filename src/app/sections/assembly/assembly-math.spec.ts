import {
  LAYER_COUNT,
  clamp,
  easeInOutCubic,
  glowOpacity,
  layerState,
  layerTransform,
  phoneState,
  phoneTransform,
  sectionProgress,
  segment,
  stepFromProgress,
  layerStateAtStep,
  phoneStateAtStep,
} from './assembly-math';

describe('assembly-math', () => {
  describe('clamp', () => {
    it('keeps values inside the range', () => {
      expect(clamp(-1)).toBe(0);
      expect(clamp(0.4)).toBe(0.4);
      expect(clamp(3)).toBe(1);
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it('treats NaN as the minimum', () => {
      expect(clamp(Number.NaN)).toBe(0);
    });
  });

  describe('easeInOutCubic', () => {
    it('is pinned at the ends and symmetric in the middle', () => {
      expect(easeInOutCubic(0)).toBe(0);
      expect(easeInOutCubic(1)).toBe(1);
      expect(easeInOutCubic(0.5)).toBeCloseTo(0.5);
      expect(easeInOutCubic(0.25) + easeInOutCubic(0.75)).toBeCloseTo(1);
    });
  });

  describe('segment', () => {
    it('maps a window to 0..1', () => {
      expect(segment(0.1, 0.2, 0.4)).toBe(0);
      expect(segment(0.3, 0.2, 0.4)).toBeCloseTo(0.5);
      expect(segment(0.9, 0.2, 0.4)).toBe(1);
    });

    it('handles an empty window as a step', () => {
      expect(segment(0.4, 0.5, 0.5)).toBe(0);
      expect(segment(0.5, 0.5, 0.5)).toBe(1);
    });
  });

  describe('sectionProgress', () => {
    it('is 0 before the stage sticks', () => {
      expect(sectionProgress(200, 5000, 800)).toBe(0);
      expect(sectionProgress(0, 5000, 800)).toBe(0);
    });

    it('grows linearly with the scrolled distance', () => {
      expect(sectionProgress(-2100, 5000, 800)).toBeCloseTo(0.5);
    });

    it('is 1 once the section has scrolled through', () => {
      expect(sectionProgress(-4200, 5000, 800)).toBe(1);
      expect(sectionProgress(-9000, 5000, 800)).toBe(1);
    });

    it('does not divide by zero when the section is not taller than the viewport', () => {
      expect(sectionProgress(10, 800, 800)).toBe(0);
      expect(sectionProgress(-10, 600, 800)).toBe(1);
    });
  });

  describe('stepFromProgress', () => {
    it('splits progress into evenly sized steps', () => {
      expect(stepFromProgress(0, 6)).toBe(0);
      expect(stepFromProgress(0.16, 6)).toBe(0);
      expect(stepFromProgress(0.17, 6)).toBe(1);
      expect(stepFromProgress(0.5, 6)).toBe(3);
      expect(stepFromProgress(0.99, 6)).toBe(5);
    });

    it('stays within bounds', () => {
      expect(stepFromProgress(1, 6)).toBe(5);
      expect(stepFromProgress(2, 6)).toBe(5);
      expect(stepFromProgress(-1, 6)).toBe(0);
      expect(stepFromProgress(0.7, 1)).toBe(0);
    });
  });

  describe('layerState', () => {
    it('starts every layer offset and semi-transparent', () => {
      for (let i = 1; i <= LAYER_COUNT; i++) {
        const s = layerState(0, i);
        expect(Math.abs(s.x) + Math.abs(s.y)).toBeGreaterThan(0);
        expect(s.z).toBeGreaterThan(0);
        expect(s.opacity).toBeLessThan(0.5);
      }
    });

    it('holds a layer still until its window starts', () => {
      expect(layerState(0.14, 1)).toEqual(layerState(0, 1));
      expect(layerState(0.3, 2)).toEqual(layerState(0, 2));
    });

    it('moves a layer half way at the middle of its window', () => {
      const s = layerState(0.22, 1);
      expect(s.x).toBeCloseTo(-75);
      expect(s.y).toBeCloseTo(-20);
      expect(s.z).toBeCloseTo(70);
      expect(s.opacity).toBeCloseTo(0.675, 1);
    });

    it('rests every layer once assembled', () => {
      for (let i = 1; i <= LAYER_COUNT; i++) {
        expect(layerState(0.8, i)).toEqual({ x: 0, y: 0, z: 0, rotate: 0, opacity: 1 });
        expect(layerState(1, i)).toEqual({ x: 0, y: 0, z: 0, rotate: 0, opacity: 1 });
      }
    });

    it('assembles layers in order', () => {
      expect(layerState(0.3, 1).opacity).toBe(1);
      expect(layerState(0.3, 2).opacity).toBeLessThan(1);
      expect(layerState(0.62, 3).opacity).toBe(1);
      expect(layerState(0.62, 4).opacity).toBeLessThan(1);
    });

    it('treats unknown layers as resting', () => {
      expect(layerState(0, 0)).toEqual({ x: 0, y: 0, z: 0, rotate: 0, opacity: 1 });
      expect(layerState(0, 99).opacity).toBe(1);
    });
  });

  describe('phoneState', () => {
    it('starts tilted and lies flat from 85 %', () => {
      expect(phoneState(0)).toEqual({ rotateX: 12, rotateY: -30, rotateZ: -5, scale: 0.9 });
      expect(phoneState(0.85)).toEqual({ rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1 });
      expect(phoneState(1)).toEqual({ rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1 });
    });

    it('eases monotonically towards flat', () => {
      const a = phoneState(0.2).rotateY;
      const b = phoneState(0.5).rotateY;
      expect(a).toBeLessThan(b);
      expect(b).toBeLessThan(0);
    });
  });

  describe('glowOpacity', () => {
    it('only appears over the last fifth', () => {
      expect(glowOpacity(0.5)).toBe(0);
      expect(glowOpacity(0.8)).toBe(0);
      expect(glowOpacity(0.9)).toBeCloseTo(0.5);
      expect(glowOpacity(1)).toBe(1);
    });
  });

  describe('css helpers', () => {
    it('formats transforms', () => {
      expect(layerTransform({ x: 1, y: -2, z: 3, rotate: 4, opacity: 1 })).toBe(
        'translate3d(1px, -2px, 3px) rotate(4deg)',
      );
      expect(phoneTransform({ rotateX: 1, rotateY: 2, rotateZ: 3, scale: 0.5 })).toBe(
        'rotateY(2deg) rotateX(1deg) rotateZ(3deg) scale(0.5)',
      );
    });
  });

  describe('discrete steps', () => {
    const REST = { x: 0, y: 0, z: 0, rotate: 0, opacity: 1 };

    it('lands each layer on its step and keeps it there', () => {
      expect(layerStateAtStep(0, 1)).toEqual(layerState(0, 1));
      expect(layerStateAtStep(1, 1)).toEqual(REST);
      expect(layerStateAtStep(1, 2)).toEqual(layerState(0, 2));
      expect(layerStateAtStep(2, 2)).toEqual(REST);
      expect(layerStateAtStep(3, 3)).toEqual(REST);
      expect(layerStateAtStep(3, 4)).toEqual(layerState(0, 4));
      expect(layerStateAtStep(4, 4)).toEqual(REST);
      expect(layerStateAtStep(4, 5)).toEqual(REST);
      for (let i = 1; i <= 5; i++) expect(layerStateAtStep(5, i)).toEqual(REST);
    });

    it('flattens the phone step by step, flat on the last one', () => {
      expect(phoneStateAtStep(0, 6)).toEqual(phoneState(0));
      expect(phoneStateAtStep(5, 6)).toEqual({ rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1 });
      expect(Math.abs(phoneStateAtStep(2, 6).rotateY)).toBeLessThan(Math.abs(phoneStateAtStep(1, 6).rotateY));
    });

    it('maps the snap positions (k / 5) to steps 0..5', () => {
      for (let k = 0; k <= 5; k++) expect(stepFromProgress(k / 5, 6)).toBe(k);
    });
  });
});
