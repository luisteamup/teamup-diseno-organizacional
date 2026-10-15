import { useSyncExternalStore } from 'react';
import { EMPS, type PerfStatus } from '../lib/talent';
import type { OrgVersion } from '../data';
import { ORG } from '../data';

export type View = 'resumen' | 'org' | 'puestos' | 'skills' | 'roi';
export type SkillTab = 'brechas' | 'tax' | 'career' | 'suc' | 'emp';
export type RoleTab = 'desc' | 'tareas' | 'kpis' | 'skills';

export interface AppState {
  view: View;
  /** Versión del organigrama */
  ver: OrgVersion;
  /** Nodo seleccionado del organigrama ('gg' = gerencia general) */
  sel: string | null;
  /** Filtro del catálogo de puestos */
  filter: string;
  /** Animación de entrada de la vista actual */
  entered: boolean;
  /** Animación de entrada del detalle del organigrama */
  sub: boolean;
  /** Progreso 0–1 del count-up de cifras */
  p: number;
  toast: boolean;
  /** Puesto abierto en el panel lateral (índice de ROLES) */
  role: number | null;
  dOpen: boolean;
  dtab: RoleTab;
  dsub: boolean;
  skCat: string;
  skSort: 'gap' | 'fort';
  skSel: string | null;
  sksub: boolean;
  skTab: SkillTab;
  roiDept: string;
  roiOpen: number | null;
  roiOS: boolean;
  roiSub: boolean;
  nbSel: string;
  tecLvl: string;
  tecSub: boolean;
  empSel: number;
  empDept: string;
  empSub: boolean;
  roiPop: boolean;
  empPop: boolean;
  tecPop: boolean;
  brand: boolean;
  /** Menú lateral abierto (solo móvil) */
  navOpen: boolean;
}

const initial: AppState = {
  view: 'resumen', ver: 'actual', sel: null, filter: 'Todos', entered: false, sub: false, p: 0, toast: false,
  role: null, dOpen: false, dtab: 'desc', dsub: false, skCat: 'Todas', skSort: 'gap', skSel: null, sksub: true,
  skTab: 'brechas', roiDept: 'ops', roiOpen: 1, roiOS: true, roiSub: true, nbSel: '2-2', tecLvl: 'Todas', tecSub: true,
  empSel: 0, empDept: 'Todas', empSub: true, roiPop: false, empPop: false, tecPop: false, brand: false, navOpen: false,
};

let state = initial;
const listeners = new Set<() => void>();
const get = () => state;
const set = (patch: Partial<AppState>) => {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useApp(): AppState {
  return useSyncExternalStore(subscribe, get);
}

// ── Animation plumbing ──────────────────────────────────────────────────
const timers: Record<string, ReturnType<typeof setTimeout>> = {};
let progress: ReturnType<typeof setInterval> | undefined;
const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const instant = () => reducedMotion() || document.hidden;
const later = (key: string, fn: () => void, ms: number) => {
  clearTimeout(timers[key]);
  timers[key] = setTimeout(fn, ms);
};

type Flag = 'sub' | 'dsub' | 'sksub' | 'empSub' | 'roiSub' | 'roiOS' | 'tecSub';
/** Replays a sub-section entrance: flag off, then on after `ms`. */
const replay = (key: Flag, ms = 30) => {
  if (instant()) { set({ [key]: true }); return; }
  set({ [key]: false });
  later('replay-' + key, () => set({ [key]: true }), ms);
};

/** Replays the view entrance and the 1.2s number count-up. */
function run() {
  clearTimeout(timers.run);
  clearInterval(progress);
  if (instant()) { set({ entered: true, sub: true, p: 1 }); return; }
  set({ entered: false, sub: false, p: 0 });
  timers.run = setTimeout(() => {
    set({ entered: true, sub: true });
    const t0 = performance.now();
    progress = setInterval(() => {
      const t = Math.min(1, (performance.now() - t0) / 1200);
      set({ p: t });
      if (t >= 1) clearInterval(progress);
    }, 16);
  }, 40);
}

// ── Brand palette (Ahorramart Economax) ─────────────────────────────────
const BRAND_PALETTE: Record<string, string> = {
  '--tu-navy': '#2F6A14', '--tu-navy-50': '#EEF6E5', '--tu-navy-100': '#D9EDC4', '--tu-navy-200': '#B5DA8A', '--tu-navy-300': '#8FC65A',
  '--tu-navy-400': '#6AB42D', '--tu-navy-500': '#4E9221', '--tu-navy-600': '#3B7A18', '--tu-navy-700': '#2F6213', '--tu-navy-800': '#234A0E',
  '--tu-cyan': '#EE7A0A', '--tu-cyan-50': '#FEF2E6', '--tu-cyan-100': '#FDE0C2', '--tu-cyan-200': '#FAC287', '--tu-cyan-300': '#F6A24A',
  '--tu-cyan-400': '#F28C1E', '--tu-cyan-500': '#EE7A0A', '--tu-cyan-600': '#E2580F', '--tu-cyan-700': '#B8450B', '--tu-cyan-800': '#8A3408',
};
function applyBrand(on: boolean) {
  const r = document.documentElement.style;
  Object.keys(BRAND_PALETTE).forEach((k) => (on ? r.setProperty(k, BRAND_PALETTE[k]) : r.removeProperty(k)));
}

const deptIdOfShort = (short: string, depts: { id: string; short: string }[]) => depts.find((d) => d.short === short)?.id;

// ── Actions ─────────────────────────────────────────────────────────────
export const actions = {
  start: run,

  go(view: View, extra?: Partial<AppState>) {
    set({ view, navOpen: false, ...extra });
    window.scrollTo(0, 0);
    run();
  },

  setVer(ver: OrgVersion) {
    if (ver === state.ver) return;
    set({ ver, sel: null });
    run();
  },

  /** Selecciona un nodo del organigrama y re-anima su detalle. */
  pick(sel: string) {
    if (sel === state.sel) return;
    set({ sel });
    replay('sub');
  },

  setFilter(filter: string) {
    set({ filter });
    run();
  },

  openRole(i: number) {
    if (i < 0) return;
    if (instant()) { set({ role: i, dtab: 'desc', dOpen: true, dsub: true }); return; }
    set({ role: i, dtab: 'desc', dsub: false, dOpen: false });
    later('drawer', () => set({ dOpen: true }), 20);
    later('dsub', () => set({ dsub: true }), 200);
  },

  closeRole() {
    clearTimeout(timers.dsub);
    set({ dOpen: false });
    later('drawer', () => set({ role: null }), instant() ? 0 : 360);
  },

  setDtab(t: RoleTab) {
    if (t === state.dtab) return;
    if (instant()) { set({ dtab: t }); return; }
    set({ dtab: t, dsub: false });
    later('dsub', () => set({ dsub: true }), 30);
  },

  pickSkill(name: string) {
    if (name === state.skSel) return;
    if (instant()) { set({ skSel: name }); return; }
    set({ skSel: name, sksub: false });
    later('sksub', () => set({ sksub: true }), 30);
  },

  setSkCat(skCat: string) { set({ skCat }); run(); },
  setSkSort(skSort: AppState['skSort']) { if (skSort !== state.skSort) { set({ skSort }); run(); } },

  setSkTab(skTab: SkillTab) {
    if (skTab === state.skTab) return;
    set({ skTab, empPop: false, tecPop: false });
    run();
  },

  setNbSel(nbSel: string) { set({ nbSel }); },
  setTecLvl(tecLvl: string) { set({ tecLvl }); },

  setEmpDept(label: string, depts: { id: string; short: string }[]) {
    const id = deptIdOfShort(label, depts);
    const first = EMPS.find((x) => label === 'Todas' || x.dept === id);
    set({ empDept: label, empSel: first ? first.index : 0 });
    run();
    replay('empSub', 120);
  },

  pickEmp(i: number) {
    if (i === state.empSel) return;
    set({ empSel: i });
    replay('empSub');
  },

  /** Desde Rendimiento vs ROI: abre el perfil de skills del colaborador. */
  goEmp(i: number) {
    set({ empSel: i, empDept: 'Todas', roiPop: false });
    actions.go('skills', { skTab: 'emp' });
    replay('empSub', 120);
  },

  openEmpPop(i: number) { set({ empSel: i, empPop: true }); replay('empSub', 140); },
  closeEmpPop() { if (state.empPop) set({ empPop: false }); },
  openTec() { set({ tecPop: true }); replay('tecSub', 120); },
  closeTec() { if (state.tecPop) set({ tecPop: false }); },

  /** Clic en un área de ROI: abre el drill down con el primer colaborador que no cumple. */
  selectDept(id: string) {
    if (id === state.roiDept && state.roiPop) return;
    const f = EMPS.find((e) => e.dept === id && (e.status as PerfStatus) !== 'Cumple');
    set({ roiDept: id, roiOpen: f ? f.index : null, roiPop: true });
    replay('roiSub', 140);
    replay('roiOS', 140);
  },
  closePop() { if (state.roiPop) set({ roiPop: false }); },
  toggleRoi(i: number) {
    set({ roiOpen: state.roiOpen === i ? null : i });
    replay('roiOS');
  },

  toggleBrand() {
    const on = !state.brand;
    applyBrand(on);
    set({ brand: on });
  },

  exportPdf() {
    set({ toast: true });
    later('toast', () => set({ toast: false }), 2600);
  },

  openNav() { set({ navOpen: true }); },
  closeNav() { if (state.navOpen) set({ navOpen: false }); },

  openProposal() { actions.go('org', { ver: 'propuesta', sel: null }); },
  goAi() { actions.go('org', { ver: 'ai', sel: null }); },

  onKey(e: KeyboardEvent) {
    if (e.key !== 'Escape') return;
    if (state.navOpen) actions.closeNav();
    else if (state.role !== null) actions.closeRole();
    else { actions.closePop(); actions.closeEmpPop(); actions.closeTec(); }
  },

  /** Limpia timers y paleta (desmontaje). */
  dispose() {
    applyBrand(false);
    Object.values(timers).forEach(clearTimeout);
    clearInterval(progress);
  },
};

/** Primer nodo N2 de la versión actual: selección por defecto del organigrama. */
export const defaultSel = (ver: OrgVersion) => ORG[ver][0].id;
