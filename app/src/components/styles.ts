import type { CSSProperties } from 'react';

/** Estilos repetidos del prototipo, como objetos reutilizables. */

/** Micro-label en mayúsculas: 11px · 600 · +0.08em. */
export const caps: CSSProperties = { fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--tu-grey-500)' };

/** Tarjeta base: blanco, hairline grey-200, sombra sm. */
export const card = (radius = 12): CSSProperties => ({ background: '#fff', border: '1px solid var(--tu-grey-200)', borderRadius: radius, boxShadow: 'var(--shadow-sm)' });

/** Título de tarjeta: 16px · 700. */
export const cardTitle: CSSProperties = { fontSize: 16, fontWeight: 700, letterSpacing: '-.018em', color: 'var(--tu-navy-600)' };

/** Subtítulo de sección: h2 24px. */
export const h2: CSSProperties = { margin: 0, fontSize: 24, lineHeight: 1.2, letterSpacing: '-.02em', fontWeight: 700, color: 'var(--tu-navy-600)' };

/** Titular de vista: h1 32px regular con frase en negrita cian. */
export const h1: CSSProperties = { margin: 0, fontSize: 32, lineHeight: 1.15, letterSpacing: '-.03em', fontWeight: 400, color: 'var(--tu-navy-600)', textWrap: 'pretty' };
export const h1Strong: CSSProperties = { fontWeight: 800, color: 'var(--tu-cyan)' };

/** Párrafo de introducción bajo un titular. */
export const lead = (maxWidth = 780): CSSProperties => ({ margin: 0, fontSize: 15, lineHeight: 1.65, color: 'var(--tu-grey-600)', maxWidth, textWrap: 'pretty' });

/** Encabezado de tabla en grid (fondo grey-25, caps). */
export const tableHead = (cols: string, extra?: CSSProperties): CSSProperties => ({
  display: 'grid', gridTemplateColumns: cols, gap: 16, padding: '12px 20px', borderBottom: '1px solid var(--tu-grey-200)', background: 'var(--tu-grey-25)', ...caps, ...extra,
});

/** Pista de barra de progreso. */
export const track = (height = 6, extra?: CSSProperties): CSSProperties => ({ height, borderRadius: 999, background: 'var(--tu-grey-100)', overflow: 'hidden', ...extra });

/** Relleno de barra de progreso. */
export const fill = (background: string, width: string, transition: string): CSSProperties => ({ height: '100%', borderRadius: 999, background, width, transition });

/** Botón de enlace de texto (cian → navy al pasar el cursor). */
export const linkBtn: CSSProperties = { alignSelf: 'flex-start', border: 'none', background: 'none', padding: 0, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: 'var(--tu-cyan-600)', cursor: 'pointer', transition: 'color 140ms' };

export const tabular: CSSProperties = { fontVariantNumeric: 'tabular-nums' };
