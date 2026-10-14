import type { CSSProperties } from 'react';
import { PROFILES, type ProfileVector } from '../../data';
import { OUT } from '../../lib/anim';
import { DIMS, DIM_LINES, type Employee } from '../../lib/talent';

const F = 'Outfit, sans-serif';
/** Centro y radio del radar en el viewBox 520×440. */
const RC: [number, number] = [260, 215];
const RR = 150;

/** Punto de la dimensión `i` (5 ejes, el primero hacia arriba) al valor `v` (0–100). */
const rpt = (v: number, i: number): [number, number] => {
  const a = ((-90 + i * 72) * Math.PI) / 180;
  return [RC[0] + ((RR * v) / 100) * Math.cos(a), RC[1] + ((RR * v) / 100) * Math.sin(a)];
};
const poly = (vals: readonly number[]) => vals.map((v, i) => rpt(v, i).map((n) => n.toFixed(1)).join(',')).join(' ');

interface RadarProps {
  emp: Employee;
  /** Entrada animada: polígonos crecen desde el centro. */
  on: boolean;
}

/** Radar de 5 dimensiones: la persona hoy, lo esperado en su puesto y su siguiente posición. */
export function Radar({ emp, on }: RadarProps) {
  const exp = PROFILES[emp.role];
  const nx = PROFILES[emp.nextRole];
  const nc = emp.direction === 'up' ? 'var(--tu-success)' : 'var(--tu-warning)';

  const shape = (pts: ProfileVector, st: CSSProperties, delay: number) => (
    <polygon
      points={poly(pts)}
      style={{
        transform: on ? 'scale(1)' : 'scale(.25)', opacity: on ? 1 : 0, transformOrigin: RC[0] + 'px ' + RC[1] + 'px',
        transition: `transform 620ms ${OUT} ${delay}ms, opacity 300ms ${delay}ms`, ...st,
      }}
    />
  );

  return (
    <svg viewBox="0 0 520 440" style={{ display: 'block', width: '100%', height: '100%', overflow: 'visible' }}>
      {[25, 50, 75, 100].map((lv) => (
        <polygon
          key={'g' + lv}
          points={poly([lv, lv, lv, lv, lv])}
          style={{ fill: lv === 100 ? 'var(--tu-grey-25)' : 'none', stroke: lv === 100 ? 'var(--tu-grey-300)' : 'var(--tu-grey-200)', strokeWidth: 1 }}
        />
      ))}
      {DIMS.map((_, i) => {
        const p = rpt(100, i);
        const l = rpt(116, i);
        const c = Math.cos(((-90 + i * 72) * Math.PI) / 180);
        const anchor = c > 0.3 ? 'start' : c < -0.3 ? 'end' : 'middle';
        const hl = emp.scores[i] >= exp[i] + 8;
        const lines = DIM_LINES[i];
        // Ajuste vertical por posición del eje y por número de renglones.
        const y0 = l[1] + (i === 0 ? -6 : i === 2 || i === 3 ? 10 : 4) - (lines.length - 1) * 7;
        return [
          <line key={'a' + i} x1={RC[0]} y1={RC[1]} x2={p[0]} y2={p[1]} style={{ stroke: 'var(--tu-grey-200)', strokeWidth: 1 }} />,
          <text
            key={'l' + i}
            x={l[0]}
            y={y0}
            textAnchor={anchor}
            style={{ fontFamily: F, fontSize: 13, fontWeight: hl ? 700 : 500, fill: hl ? 'var(--tu-cyan-700)' : 'var(--tu-grey-700)' }}
          >
            {lines.map((t, j) => (
              <tspan key={j} x={l[0]} dy={j ? 15 : 0}>{t}</tspan>
            ))}
          </text>,
        ];
      })}
      {shape(nx, { fill: 'none', stroke: nc, strokeWidth: 2, strokeDasharray: '6 5' }, 160)}
      {shape(exp, { fill: 'var(--tu-navy-600)', fillOpacity: 0.05, stroke: 'var(--tu-navy-600)', strokeWidth: 2 }, 80)}
      {shape(emp.scores, { fill: 'var(--tu-cyan)', fillOpacity: 0.22, stroke: 'var(--tu-cyan)', strokeWidth: 2.5, strokeLinejoin: 'round' }, 0)}
      {emp.scores.map((v, i) => {
        const p = rpt(v, i);
        const hl = v >= exp[i] + 8;
        return (
          <circle
            key={'v' + i}
            cx={p[0]}
            cy={p[1]}
            r={hl ? 6 : 4}
            style={{ fill: hl ? 'var(--tu-cyan)' : '#fff', stroke: 'var(--tu-cyan)', strokeWidth: 2, opacity: on ? 1 : 0, transition: 'opacity 300ms ' + (300 + i * 40) + 'ms' }}
          />
        );
      })}
    </svg>
  );
}
