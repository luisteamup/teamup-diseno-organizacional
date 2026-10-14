import type { CSSProperties } from 'react';

/** Curvas del sistema: entrada y estándar. */
export const OUT = 'cubic-bezier(.16,1,.3,1)';
export const STD = 'cubic-bezier(.4,0,.2,1)';

/**
 * Scroll/entrance reveal: 12px rise + fade, staggered by index.
 * `on` false = estado previo a la animación.
 */
export function rv(on: boolean, i = 0, step = 70, base = 0): CSSProperties {
  return { opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(12px)', transitionDelay: base + i * step + 'ms' };
}

/** Transición estándar de un reveal (opacity + transform). */
export const revealT = (ms = 420) => `opacity ${ms}ms ${OUT},transform ${ms}ms ${OUT}`;
