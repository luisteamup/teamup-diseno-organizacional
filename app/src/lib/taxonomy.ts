import { TAX_FAMILIES } from '../data';
import type { Tone } from '../ds/Badge';

/** Geometría del mapa radial (viewBox 1000×900). */
export const CX = 500, CY = 450, R0 = 76, RF = 240, RE = 432, HW = 13.5;

export type Demand = 'alta' | 'media' | 'baja';
export const DEMAND_LABEL: Record<Demand, string> = { alta: 'Más demandada', media: 'Demanda media', baja: 'Menos demandada' };
export const DEMAND_COLOR: Record<Demand, string> = { alta: 'var(--tu-navy-400)', media: 'var(--tu-cyan-500)', baja: 'var(--tu-cyan-200)' };
export const DEMAND_TONE: Record<Demand, Tone> = { alta: 'brand', media: 'info', baja: 'neutral' };

export const pt = (r: number, a: number): [number, number] => [CX + r * Math.cos((a * Math.PI) / 180), CY + r * Math.sin((a * Math.PI) / 180)];
export const P = (p: [number, number]) => p[0].toFixed(1) + ' ' + p[1].toFixed(1);
export const angleDiff = (a: number, b: number) => ((a - b + 540) % 360) - 180;

/** Deterministic PRNG seeded by a string (FNV-1a + murmur finaliser), so simulated values are stable. */
const rng = (str: string) => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
};

export interface TaxFamily {
  name: string;
  type: 'hard' | 'soft';
  skills: string[];
  /** Ángulo del rayo de la familia, en grados */
  angle: number;
  color: string;
  /** Skills de alta demanda */
  high: number;
  avgSalary: number;
}

export interface TaxLine {
  family: number;
  name: string;
  /** Ángulo final del abanico */
  endAngle: number;
  demand: Demand;
  d: string;
  candidates: number;
  salary: number;
  delay: number;
}

export const TAX_FAMS: TaxFamily[] = TAX_FAMILIES.map((f, i) => ({
  name: f.name, type: f.type, skills: f.skills, angle: -90 + i * 30,
  color: f.type === 'soft' ? 'var(--tu-cyan-600)' : 'var(--tu-navy-600)', high: 0, avgSalary: 0,
}));

export const TAX_LINES: TaxLine[] = [];
TAX_FAMS.forEach((F, fi) => {
  const n = F.skills.length;
  const base = TAX_FAMILIES[fi].baseSalary;
  F.skills.forEach((nm, j) => {
    const as = F.angle - HW + (2 * HW * (j + 0.5)) / n;
    const R = rng(nm);
    const u = R();
    const demand: Demand = u < 0.3 ? 'alta' : u < 0.75 ? 'media' : 'baja';
    TAX_LINES.push({
      family: fi, name: nm, endAngle: as, demand,
      d: 'M' + P(pt(RF, F.angle)) + ' C' + P(pt(RF + 80, F.angle)) + ' ' + P(pt(RE - 120, as)) + ' ' + P(pt(RE, as)),
      candidates: Math.round(24 + R() * 290 * (demand === 'alta' ? 1 : demand === 'media' ? 0.65 : 0.35)),
      salary: Math.round(base * (0.88 + R() * 0.24)),
      delay: 320 + fi * 60 + j * 9,
    });
  });
});
TAX_FAMS.forEach((F, fi) => {
  const ls = TAX_LINES.filter((l) => l.family === fi);
  F.high = ls.filter((l) => l.demand === 'alta').length;
  F.avgSalary = Math.round(ls.reduce((a, l) => a + l.salary, 0) / ls.length);
});
