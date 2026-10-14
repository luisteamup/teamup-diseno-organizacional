// Datos simulados del diagnóstico de Ahorramart Economax (corte: septiembre 2026).
// Reemplazar por la fuente real (nómina / HRIS) en src/data/index.ts.
import type { AreaHeadcount, OrgVersion, OrgNode, StoreTurnover } from './types';

export const AREAS: AreaHeadcount[] = [
  {"label":"Piso de venta","hc":144},
  {"label":"Cajas","hc":96},
  {"label":"Perecederos","hc":64},
  {"label":"Almacén y CEDIS","hc":52},
  {"label":"Administración","hc":22},
  {"label":"Mantenimiento","hc":14},
  {"label":"Compras","hc":9},
  {"label":"Recursos Humanos","hc":7},
  {"label":"Sistemas","hc":4},
];

export const STORES: StoreTurnover[] = [
  {"name":"Sucursal Centro","hc":64,"turnover":38},
  {"name":"Sucursal Kennedy","hc":58,"turnover":52},
  {"name":"Sucursal Colosio","hc":56,"turnover":61},
  {"name":"Sucursal Obregón","hc":55,"turnover":44},
  {"name":"Sucursal Los Álamos","hc":54,"turnover":41},
  {"name":"Sucursal Mascareñas","hc":52,"turnover":49},
];

export const ORG: Record<OrgVersion, OrgNode[]> = {
  actual: [
    {"id":"ops","title":"Gerencia de operaciones","name":"Marisol Quintero","level":"N2","hc":340,"children":[{"title":"Sucursal Centro","hc":64},{"title":"Sucursal Kennedy","hc":58},{"title":"Sucursal Colosio","hc":56},{"title":"Sucursal Obregón","hc":55},{"title":"Sucursal Los Álamos","hc":54},{"title":"Sucursal Mascareñas","hc":52}]},
    {"id":"adm","title":"Gerencia de administración y finanzas","name":"Héctor Valenzuela","level":"N2","hc":14,"children":[{"title":"Contabilidad","hc":6},{"title":"Nóminas","hc":4},{"title":"Tesorería","hc":3}]},
    {"id":"cedis","title":"Jefatura de almacén y CEDIS","name":"Ramón Esquer","level":"N3","hc":23,"children":[{"title":"Surtido","hc":10},{"title":"Recepción","hc":8},{"title":"Tráfico","hc":4}]},
    {"id":"mto","title":"Jefatura de mantenimiento","name":"Gilberto Soto","level":"N3","hc":14,"children":[{"title":"Mantenimiento de tiendas","hc":9},{"title":"Refrigeración","hc":4}]},
    {"id":"com","title":"Jefatura de compras","name":"Arturo Félix","level":"N3","hc":9,"children":[{"title":"Compras abarrotes","hc":4},{"title":"Compras perecederos","hc":4}]},
    {"id":"rh","title":"Jefatura de recursos humanos","name":"Lucía Moreno","level":"N3","hc":7,"children":[{"title":"Reclutamiento","hc":3},{"title":"Capacitación","hc":2},{"title":"Relaciones laborales","hc":1}]},
    {"id":"sis","title":"Coordinación de sistemas","name":"Daniela Ruiz","level":"N3","hc":4,"children":[{"title":"Soporte","hc":2},{"title":"Punto de venta","hc":1}]},
  ],
  propuesta: [
    {"id":"dop","title":"Dirección de operaciones","name":"Marisol Quintero","level":"N2","hc":379,"tag":"Integrada","tagTone":"info","children":[{"title":"Gerencia zona norte","hc":179},{"title":"Gerencia zona sur","hc":162},{"title":"Almacén y CEDIS","hc":23},{"title":"Mantenimiento","hc":14}]},
    {"id":"daf","title":"Dirección de administración y finanzas","name":"Héctor Valenzuela","level":"N2","hc":23,"tag":"Ampliada","tagTone":"info","children":[{"title":"Finanzas","hc":9},{"title":"Compras","hc":9},{"title":"Sistemas","hc":4}]},
    {"id":"dch","title":"Dirección de capital humano","name":"Lucía Moreno","level":"N2","hc":11,"tag":"Nueva","tagTone":"success","children":[{"title":"Nómina y compensaciones","hc":4},{"title":"Atracción de talento","hc":3},{"title":"Desarrollo y capacitación","hc":2},{"title":"Relaciones laborales","hc":1}]},
  ],
  ai: [
    {"id":"dop","title":"Dirección de operaciones","name":"Marisol Quintero","level":"N2","hc":372,"tag":"+2 asistentes IA","tagTone":"ai","children":[{"title":"Gerencia zona norte","hc":176},{"title":"Gerencia zona sur","hc":159},{"title":"Almacén y CEDIS","hc":19},{"title":"Mantenimiento","hc":14},{"title":"Control de calidad CEDIS","hc":4,"kind":"new"},{"title":"Asistente IA de inventarios","hoursPerMonth":680,"kind":"ai"},{"title":"Asistente IA de turnos","hoursPerMonth":520,"kind":"ai"}]},
    {"id":"daf","title":"Dirección de administración y finanzas","name":"Héctor Valenzuela","level":"N2","hc":23,"tag":"+2 asistentes IA","tagTone":"ai","children":[{"title":"Finanzas","hc":7},{"title":"Compras","hc":9},{"title":"Sistemas","hc":4},{"title":"Analítica de datos","hc":3,"kind":"new"},{"title":"Asistente IA de conciliación","hoursPerMonth":340,"kind":"ai"},{"title":"Asistente IA de compras","hoursPerMonth":300,"kind":"ai"}]},
    {"id":"dch","title":"Dirección de capital humano","name":"Lucía Moreno","level":"N2","hc":12,"tag":"+2 asistentes IA","tagTone":"ai","children":[{"title":"Nómina y compensaciones","hc":4},{"title":"Atracción de talento","hc":2},{"title":"Desarrollo y capacitación","hc":4},{"title":"Relaciones laborales","hc":1},{"title":"Adopción de IA","hc":1,"kind":"new"},{"title":"Asistente IA de reclutamiento","hoursPerMonth":260,"kind":"ai"},{"title":"Asistente IA de nómina","hoursPerMonth":220,"kind":"ai"}]},
  ],
};
