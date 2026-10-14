/**
 * Capa de acceso a datos.
 *
 * Hoy todo sale de módulos estáticos con datos simulados. Para conectar la
 * fuente real (nómina, HRIS, evaluaciones de desempeño), sustituye estas
 * exportaciones; las vistas y los cálculos de `src/lib` solo dependen de los
 * tipos de `./types`.
 */
export * from './types';
export { AREAS, STORES, ORG } from './org';
export { ROLES } from './roles';
export { SKILLS, AUTOMATIONS, AI_COST, TAX_FAMILIES } from './skills';
export { TEC } from './tecmilenio';
export { PROFILES, DEPTS, CARGA, EMPLOYEES, NINE_BOX, SUCCESSION, LADDERS, EXTRA_LADDERS } from './talent';
