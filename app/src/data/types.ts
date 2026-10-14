import type { Tone } from '../ds/Badge';

export type OrgVersion = 'actual' | 'propuesta' | 'ai';

export interface AreaHeadcount { label: string; hc: number }
export interface StoreTurnover { name: string; hc: number; /** Rotación anual, % */ turnover: number }

/** Unidad que reporta a un nodo N2: equipo humano, puesto nuevo o asistente IA. */
export type OrgUnit =
  | { title: string; hc: number; kind?: undefined }
  | { title: string; hc: number; kind: 'new' }
  | { title: string; hoursPerMonth: number; kind: 'ai' };

export interface OrgNode {
  id: string;
  title: string;
  name: string;
  level: string;
  hc: number;
  tag?: string;
  tagTone?: Tone;
  children: OrgUnit[];
}

export type RoleStatus = 'Validado' | 'En revisión' | 'Pendiente' | 'Duplicidad';

export interface RoleTask { name: string; freq: string; /** % del tiempo semanal */ pct: number; automatable: boolean }
export interface RoleKpi { name: string; actual: string; target: string; /** % de avance contra la meta */ progress: number }

export interface Role {
  title: string;
  area: string;
  level: string;
  hc: number;
  band: string;
  status: RoleStatus;
  reportsTo: string;
  /** % del tiempo del puesto que puede absorber un asistente IA */
  aiPct: number;
  purpose: string;
  tasks: RoleTask[];
  kpis: RoleKpi[];
  results: string[];
  /** Nivel requerido por la descripción, escala 1–4 */
  skills: { name: string; level: number }[];
}

export type SkillCategory = 'Técnica' | 'Servicio' | 'Liderazgo' | 'Digital' | 'IA' | 'Negocio';
export interface SkillBaseline { name: string; category: SkillCategory; /** Dominio actual, escala 1–4 */ current: number }

export interface Automation {
  activity: string;
  assistant: string;
  area: string;
  fromRole: string;
  hoursPerMonth: number;
  positions: number;
  /** Ahorro mensual bruto (MXN) */
  monthlySavings: number;
  destination: string;
}

export interface TaxFamilySource { name: string; type: 'hard' | 'soft'; baseSalary: number; skills: string[] }

export type TecLevel = 'Preparatoria' | 'Profesional' | 'Posgrado' | 'Skilling Center';
export interface TecProgram {
  id: string;
  level: TecLevel;
  name: string;
  format: string;
  type: 'Upskilling' | 'Reskilling' | 'Diagnóstico';
  roles: string[];
  url: string;
}

/** [Hard skills, Core skills, Experiencia de industria, Actitudes, Trayectoria académica], 0–100 */
export type ProfileVector = [number, number, number, number, number];

export interface Department {
  id: string;
  name: string;
  short: string;
  full: string;
  hc: number;
  avgSalary: number;
  /** % de cumplimiento de resultados */
  perf: number;
  /** Valor generado por cada peso de nómina */
  roi: number;
  mix: { meets: number; atRisk: number; below: number };
  lead: string;
}

export type StrategyType = 'tecnica' | 'proceso' | 'actitud' | 'liderazgo' | 'carga';
export type Potential = 'alto' | 'medio' | 'bajo';

export interface EmployeeSource {
  name: string;
  role: string;
  dept: string;
  site: string;
  perf: number;
  /** Sueldo mensual (MXN) */
  salary: number;
  years: number;
  education: string;
  scores: ProfileVector;
  potential: Potential;
  /** Posición natural de promoción (dir 'up') o de mejor ajuste */
  nextRole: string;
  direction: 'up' | 'down' | 'lateral';
  causeType: StrategyType | null;
  cause: string;
  focus: string;
  kpi: string;
  mentor: string;
  /** id del programa Tecmilenio que cursa / se sugiere */
  course: string;
}

export type Move = 'Sube' | 'Se desarrolla' | 'Se mantiene' | 'Se reubica';
export interface NineBoxCell { title: string; action: string; move: Move; description: string }

export interface SuccessionPlan {
  position: string;
  area: string;
  role: string;
  incumbent: string | null;
  risk: 'Alto' | 'Medio' | 'Vacante';
  successors: string[];
}

export interface CareerLadder { name: string; steps: string[]; bridges: string[][] }
