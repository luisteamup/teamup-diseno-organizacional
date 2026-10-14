import { ROLES, SKILLS, type SkillBaseline, type SkillCategory } from '../data';
import type { Tone } from '../ds/Badge';

export type SkillAction = 'Reskilling' | 'Upskilling' | 'Cubierta';

export interface SkillAggregate {
  name: string;
  category: SkillCategory;
  /** Dominio actual (1–4) */
  current: number;
  /** Nivel requerido, ponderado por ocupantes de los puestos que la piden */
  required: number;
  gap: number;
  /** Personas en puestos que piden más de lo que hay */
  people: number;
  roles: { roleIndex: number; level: number; hc: number }[];
  action: SkillAction;
  coverage: number;
}

export const SKILL_BY_NAME: Record<string, SkillBaseline> = Object.fromEntries(SKILLS.map((s) => [s.name, s]));

/** Color de brecha: rojo ≥ 1.2, ámbar ≥ 0.4, verde debajo. */
export const gapColor = (g: number) => (g >= 1.2 ? 'var(--tu-danger)' : g >= 0.4 ? 'var(--tu-warning)' : 'var(--tu-success)');

export const SKILL_AGG: SkillAggregate[] = SKILLS.map(({ name, category, current }) => {
  const roles: SkillAggregate['roles'] = [];
  ROLES.forEach((r, i) => {
    const f = r.skills.find((x) => x.name === name);
    if (f) roles.push({ roleIndex: i, level: f.level, hc: r.hc });
  });
  const hcT = roles.reduce((a, r) => a + r.hc, 0) || 1;
  const required = roles.reduce((a, r) => a + r.level * r.hc, 0) / hcT;
  const gap = Math.max(0, required - current);
  const people = roles.filter((r) => r.level > current).reduce((a, r) => a + r.hc, 0);
  const action: SkillAction = gap >= 1.2 ? 'Reskilling' : gap >= 0.4 ? 'Upskilling' : 'Cubierta';
  return { name, category, current, required, gap, people, roles: roles.sort((a, b) => b.hc - a.hc), action, coverage: Math.min(1, current / required) };
});

export const SKILL_COVERAGE = SKILL_AGG.reduce((a, k) => a + k.coverage, 0) / SKILL_AGG.length;
export const SKILL_CRITICAL = SKILL_AGG.filter((k) => k.action === 'Reskilling').length;
export const SKILL_PEOPLE = ROLES.reduce((a, r) => a + (r.skills.some((x) => x.level - SKILL_BY_NAME[x.name].current >= 0.5) ? r.hc : 0), 0);

export const SKILL_CATEGORIES: ('Todas' | SkillCategory)[] = ['Todas', 'Técnica', 'Servicio', 'Liderazgo', 'Digital', 'IA', 'Negocio'];

export const skillTone = (k: SkillAggregate): Tone =>
  k.action === 'Cubierta' ? 'success' : k.category === 'IA' ? 'ai' : k.action === 'Reskilling' ? 'danger' : 'warning';
export const skillColor = (category: SkillCategory) => (category === 'IA' ? 'var(--tu-violet)' : 'var(--tu-cyan)');

export function skillRecommendation(k: SkillAggregate) {
  if (k.category === 'IA') return 'Ruta de adopción de IA para ' + k.people + ' personas, ligada a los asistentes de la Propuesta +AI.';
  if (k.action === 'Reskilling') return 'Programa de reskilling de 8 a 12 semanas para ' + k.people + ' personas. Prioridad alta en la nueva estructura.';
  if (k.action === 'Upskilling') return 'Taller de upskilling de 2 a 4 semanas para ' + k.people + ' personas, dentro del turno.';
  return 'El nivel actual cubre lo que piden los puestos. Usa a los mejores perfiles como mentores internos.';
}
