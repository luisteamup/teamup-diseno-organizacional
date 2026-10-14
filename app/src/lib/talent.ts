import { EMPLOYEES, NINE_BOX, PROFILES, TEC, type EmployeeSource, type Move, type ProfileVector, type StrategyType, type TecLevel, type TecProgram } from '../data';
import type { Tone } from '../ds/Badge';

export const DIMS = ['Hard skills', 'Core skills', 'Experiencia de industria', 'Actitudes', 'Trayectoria académica'] as const;
export const DIM_LINES = [['Hard skills'], ['Core skills'], ['Experiencia', 'de industria'], ['Actitudes'], ['Trayectoria', 'académica']];

/** Ajuste al puesto: promedio por dimensión de min(1, tiene / esperado), en %. */
export const fitOf = (s: ProfileVector, e: ProfileVector) => Math.round((s.reduce((a, v, i) => a + Math.min(1, v / e[i]), 0) / s.length) * 100);

/** Movilidad: como fitOf, pero penaliza estar muy por arriba del perfil (sobrecalificación). */
export const mobilityOf = (s: ProfileVector, e: ProfileVector) =>
  Math.round((s.reduce((a, v, i) => a + (v >= e[i] ? 1 - Math.min(0.5, (v - e[i]) / 100) : v / e[i]), 0) / s.length) * 100);

export const readyLabel = (f: number) => (f >= 90 ? 'Lista ahora' : f >= 75 ? '1 a 2 años' : '3+ años');
export const readyTone = (f: number): Tone => (f >= 90 ? 'success' : f >= 75 ? 'warning' : 'neutral');
export const readyColor = (f: number) => (f >= 90 ? 'var(--tu-success)' : f >= 75 ? 'var(--tu-warning)' : 'var(--tu-grey-500)');

export type PerfStatus = 'Cumple' | 'En riesgo' | 'No cumple';
export const statusOf = (p: number): PerfStatus => (p >= 90 ? 'Cumple' : p >= 75 ? 'En riesgo' : 'No cumple');
export const STATUS_TONE: Record<PerfStatus, Tone> = { 'Cumple': 'success', 'En riesgo': 'warning', 'No cumple': 'danger' };
export const STATUS_COLOR: Record<PerfStatus, string> = { 'Cumple': 'var(--tu-success)', 'En riesgo': 'var(--tu-warning)', 'No cumple': 'var(--tu-danger)' };

export const MOVE_TONE: Record<Move, Tone> = { 'Sube': 'success', 'Se desarrolla': 'warning', 'Se mantiene': 'neutral', 'Se reubica': 'danger' };
export const MOVE_COLOR: Record<Move, string> = { 'Sube': 'var(--tu-success)', 'Se desarrolla': 'var(--tu-warning)', 'Se mantiene': 'var(--tu-grey-500)', 'Se reubica': 'var(--tu-danger)' };

const POTENTIAL_ROW = { alto: 2, medio: 1, bajo: 0 } as const;

export interface Employee extends EmployeeSource {
  index: number;
  first: string;
  ini: string;
  /** Clave del cuadrante 9-box: "potencial-desempeño" */
  box: string;
  move: Move;
  status: PerfStatus;
  fitCurrent: number;
  fitNext: number;
}

export const EMPS: Employee[] = EMPLOYEES.map((e, i) => {
  const box = POTENTIAL_ROW[e.potential] + '-' + (e.perf >= 90 ? 2 : e.perf >= 75 ? 1 : 0);
  return {
    ...e, index: i, first: e.name.split(' ')[0], ini: e.name.split(' ').map((w) => w[0]).slice(0, 2).join(''),
    box, move: NINE_BOX[box].move, status: statusOf(e.perf),
    fitCurrent: fitOf(e.scores, PROFILES[e.role]), fitNext: fitOf(e.scores, PROFILES[e.nextRole]),
  };
});
export const EMP_BY_NAME: Record<string, Employee> = Object.fromEntries(EMPS.map((e) => [e.name, e]));

export const TEC_BY_ID: Record<string, TecProgram> = Object.fromEntries(TEC.map((t) => [t.id, t]));
export const TEC_LEVELS: ('Todas' | TecLevel)[] = ['Todas', 'Preparatoria', 'Profesional', 'Posgrado', 'Skilling Center'];
export const TEC_ABBR: Record<TecLevel, string> = { 'Preparatoria': 'Prepa', 'Profesional': 'Profesional', 'Posgrado': 'Posgrado', 'Skilling Center': 'Skilling Center' };
export const tecTone = (t: TecProgram): Tone => (t.type === 'Reskilling' ? 'warning' : t.type === 'Upskilling' ? 'info' : 'neutral');

/** Mini estrategias de 90 días según la causa del bajo desempeño. */
export const STRATEGIES: Record<StrategyType, { title: string; steps: (e: Employee) => string[] }> = {
  tecnica: { title: 'Cerrar la brecha técnica', steps: (e) => ['Días 1–30: Skilling Test para medir su nivel y microcredencial en ' + e.focus + '.', 'Días 31–60: práctica guiada con ' + e.mentor + ', dos horas por semana dentro de su turno.', 'Días 61–90: revisión de «' + e.kpi + '» contra la meta. Si la alcanza, se cierra el plan.'] },
  proceso: { title: 'Rediseñar su proceso', steps: (e) => ['Días 1–30: mapear con ' + e.mentor + ' el proceso de ' + e.focus + ' y quitar pasos manuales.', 'Días 31–60: el asistente IA de la Propuesta +AI absorbe la parte repetitiva.', 'Días 61–90: medir «' + e.kpi + '» cada semana en el tablero del área.'] },
  actitud: { title: 'Acuerdo de expectativas', steps: (e) => ['Días 1–30: conversación 1:1 con ' + e.mentor + ' y acuerdo por escrito de lo que se espera.', 'Días 31–60: reconocimiento semanal visible cada vez que cumple «' + e.kpi + '».', 'Días 61–90: evaluación. Si no mejora, reubicación a ' + e.nextRole + ', con mejor ajuste a su perfil.'] },
  liderazgo: { title: 'Fortalecer su liderazgo', steps: (e) => ['Días 1–30: inicia el certificado Habilidades Directivas de Skilling Center.', 'Días 31–60: coaching quincenal con ' + e.mentor + ' sobre ' + e.focus + '.', 'Días 61–90: medir «' + e.kpi + '» y el ausentismo de su equipo. Sin mejora, mover a ' + e.nextRole + '.'] },
  carga: { title: 'Liberar carga operativa', steps: (e) => ['Días 1–30: redistribuir tareas; el asistente IA absorbe ' + e.focus + '.', 'Días 31–60: usar el tiempo liberado en lo que mueve «' + e.kpi + '».', 'Días 61–90: revisión con ' + e.mentor + '; ajustar plantilla si el problema persiste.'] },
};
