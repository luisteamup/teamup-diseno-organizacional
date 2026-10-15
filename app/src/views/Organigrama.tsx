import { AI_COST, AUTOMATIONS, ORG, ROLES, type OrgNode, type OrgUnit, type OrgVersion } from '../data';
import { Badge } from '../ds/Badge';
import { H } from '../ds/Hover';
import { Icon } from '../ds/Icon';
import { OUT, STD, revealT, rv } from '../lib/anim';
import { ease, fmt, initials } from '../lib/format';
import { useMobile } from '../lib/useMobile';
import { actions, useApp } from '../state/store';
import { caps, card, cardTitle } from '../components/styles';

const SEGS: [OrgVersion, string][] = [['actual', 'Actual'], ['propuesta', 'Propuesta'], ['ai', 'Propuesta +AI']];
const AI_COLS = 'minmax(220px,2fr) minmax(180px,1.4fr) minmax(160px,1.2fr) 84px minmax(170px,1.3fr) 110px';
const RING = '0 0 0 2px var(--tu-navy-600), var(--shadow-md)';

const isAiUnit = (u: OrgUnit): u is Extract<OrgUnit, { kind: 'ai' }> => u.kind === 'ai';
const humansOf = (n: Pick<OrgNode, 'children'>) => n.children.filter((u): u is Exclude<OrgUnit, { kind: 'ai' }> => !isAiUnit(u));

const TOT_H = AUTOMATIONS.reduce((a, r) => a + r.hoursPerMonth, 0);
const TOT_P = AUTOMATIONS.reduce((a, r) => a + r.positions, 0);
const TOT_S = AUTOMATIONS.reduce((a, r) => a + r.monthlySavings, 0);
const NET = TOT_S - AI_COST;

export function Organigrama() {
  const s = useApp();
  const mobile = useMobile();
  const on = s.entered;
  const e = ease(s.p);
  const ver = s.ver;
  const l2 = ORG[ver];
  const isProp = ver === 'propuesta';
  const isAi = ver === 'ai';
  const sel = s.sel ?? l2[0].id;
  const isRoot = sel === 'gg';

  // Nodo seleccionado: la gerencia general agrega a todas las áreas N2.
  const node: Pick<OrgNode, 'title' | 'name' | 'level' | 'hc' | 'tag' | 'children'> = isRoot
    ? { title: 'Gerencia general', name: 'Rogelio Ibarra', level: 'N1', hc: 412, children: l2.map((n) => ({ title: n.title, hc: n.hc })) }
    : l2.find((n) => n.id === sel) ?? l2[0];
  const humans = humansOf(node);
  const ais = node.children.filter(isAiUnit);
  const maxC = Math.max(1, ...humans.map((c) => c.hc));

  const propStats = (isAi
    ? [
        { v: '$' + ((NET * 12 * e) / 1e6).toFixed(2) + 'M', l: 'Ahorro neto anual (MXN), ya descontado el costo de IA' },
        { v: fmt(TOT_H * e), l: 'Horas al mes que absorben 6 asistentes IA' },
        { v: String(Math.round(TOT_P * e)), l: 'Posiciones cubiertas por asistentes IA' },
        { v: '0', l: 'Bajas: quienes las ocupaban pasan a puestos nuevos' },
      ]
    : [
        { v: '7 → 3', l: 'Reportes directos a gerencia general' },
        { v: '+2', l: 'Gerencias de zona para agrupar sucursales' },
        { v: '1', l: 'Dirección nueva de capital humano' },
      ]);

  const verIdx = SEGS.findIndex((x) => x[0] === ver);
  const caption = isAi
    ? 'Seis asistentes IA absorben tareas repetitivas; las personas pasan a puestos nuevos. Selecciona un área.'
    : isProp
      ? 'Tres direcciones y dos gerencias de zona. Selecciona un área para ver su equipo.'
      : 'Estructura vigente, septiembre 2026. Selecciona un área para ver su equipo.';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Selector de versión */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', padding: 4, gap: 4, background: '#fff', border: '1px solid var(--tu-grey-200)', borderRadius: 10, position: 'relative', width: mobile ? '100%' : undefined, boxSizing: 'border-box' }}>
          <div style={{ position: 'absolute', top: 4, bottom: 4, width: mobile ? 'calc((100% - 16px) / 3)' : 132, left: mobile ? `calc(4px + ${verIdx} * ((100% - 16px) / 3 + 4px))` : 4 + verIdx * 136, background: isAi ? 'var(--tu-violet)' : 'var(--tu-navy-600)', borderRadius: 8, transition: `left 260ms ${OUT},background 260ms ${STD}` }} />
          {SEGS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => actions.setVer(id)}
              aria-pressed={id === ver}
              style={{ position: 'relative', width: mobile ? undefined : 132, flex: mobile ? '1 1 0' : undefined, minWidth: mobile ? 0 : undefined, height: mobile ? 40 : 32, border: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: mobile ? 13 : 14, fontWeight: 600, cursor: 'pointer', color: id === ver ? '#fff' : id === 'ai' ? 'var(--tu-violet-600)' : 'var(--tu-grey-600)', transition: 'color 220ms', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, whiteSpace: 'nowrap' }}
            >
              {id === 'ai' && <Icon name="sparkles" size={14} />}
              <span>{label}</span>
            </button>
          ))}
        </div>
        <span style={{ fontSize: mobile ? 13 : 14, lineHeight: mobile ? 1.5 : undefined, color: 'var(--tu-grey-600)' }}>{caption}</span>
      </div>

      {(isProp || isAi) && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(210px,100%),1fr))', gap: 12 }}>
          {propStats.map((ps, i) => (
            <div key={ps.l} style={{ border: '2px solid ' + (isAi ? 'var(--tu-violet)' : 'var(--tu-navy-600)'), borderRadius: mobile ? 16 : 20, padding: mobile ? '12px 14px' : '14px 18px', display: 'flex', alignItems: 'baseline', gap: mobile ? 10 : 12, transition: revealT(420), ...rv(on, i, 80, 60) }}>
              <span style={{ fontSize: mobile ? 22 : 26, fontWeight: 800, letterSpacing: '-.03em', color: isAi ? 'var(--tu-violet)' : 'var(--tu-blue)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{ps.v}</span>
              <span style={{ fontSize: 14, lineHeight: 1.35, color: 'var(--tu-grey-700)' }}>{ps.l}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Árbol */}
        <div style={{ flex: '1 1 560px', minWidth: 0, ...card(16), padding: mobile ? '20px 12px' : '28px 20px', display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'center', transition: revealT(420), ...rv(on) }}>
            <H
              as="button"
              onClick={() => actions.pick('gg')}
              style={{ width: mobile ? '100%' : 240, maxWidth: 280, padding: '14px 16px', borderRadius: 12, border: '1px solid var(--tu-grey-200)', background: 'var(--tu-navy-600)', color: '#fff', fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 2, boxShadow: isRoot ? '0 0 0 3px var(--tu-cyan), var(--shadow-md)' : 'var(--shadow-sm)', transition: `box-shadow 220ms ${STD},transform 220ms ${STD}` }}
              hover={{ transform: 'translateY(-3px)' }}
            >
              <span style={{ ...caps, color: 'var(--tu-cyan-200)' }}>N1 · 412 personas</span>
              <span style={{ fontSize: 15, fontWeight: 700 }}>Gerencia general</span>
              <span style={{ fontSize: 13, color: 'var(--tu-navy-100)' }}>Rogelio Ibarra</span>
            </H>
          </div>
          <div style={{ alignSelf: 'center', width: 2, height: mobile ? 16 : 24, background: 'var(--tu-grey-300)', marginBottom: mobile ? 10 : 0 }} />
          <div style={{ overflowX: mobile ? 'visible' : 'auto', overflowY: mobile ? 'visible' : 'hidden', padding: '4px 4px 8px', margin: '-4px -4px 0' }}>
            <div style={{ position: 'relative', minWidth: mobile ? 0 : l2.length * 150, paddingTop: mobile ? 0 : 20 }}>
              {!mobile && <div style={{ position: 'absolute', top: 0, height: 2, background: 'var(--tu-grey-300)', left: 50 / l2.length + '%', right: 50 / l2.length + '%' }} />}
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2, minmax(0,1fr))' : `repeat(${l2.length}, minmax(0,1fr))`, gap: 10 }}>
                {l2.map((n, i) => {
                  const active = n.id === sel;
                  return (
                    <div key={n.id} style={{ position: 'relative', transition: revealT(420), ...rv(on, i, 60, 140) }}>
                      {!mobile && <div style={{ position: 'absolute', top: -20, left: '50%', width: 2, height: 20, marginLeft: -1, background: 'var(--tu-grey-300)' }} />}
                      <H
                        as="button"
                        onClick={() => actions.pick(n.id)}
                        style={{ width: '100%', minHeight: mobile ? 104 : 118, height: mobile ? '100%' : undefined, boxSizing: 'border-box', padding: 12, borderRadius: 12, border: '1px solid var(--tu-grey-200)', background: active ? 'var(--tu-navy-50)' : '#fff', boxShadow: active ? RING : 'none', fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 4, transition: `box-shadow 220ms ${STD},background 220ms,transform 220ms ${STD}` }}
                        hover={{ transform: 'translateY(-3px)' }}
                      >
                        <span style={caps}>{n.level + ' · ' + n.hc + ' personas'}</span>
                        <span style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.25, color: 'var(--tu-navy-600)' }}>{n.title}</span>
                        <span style={{ fontSize: 12, color: 'var(--tu-grey-600)' }}>{n.name}</span>
                        {n.tag && (
                          <span style={{ marginTop: 'auto', paddingTop: 6, display: 'flex' }}>
                            <Badge tone={n.tagTone ?? 'neutral'} size="sm">{n.tag}</Badge>
                          </span>
                        )}
                      </H>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {!isRoot && (
            <div style={{ marginTop: 20, padding: mobile ? 12 : 16, borderRadius: 12, background: 'var(--tu-grey-50)', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={caps}>{'Reportan a ' + node.title.toLowerCase()}</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(150px,100%),1fr))', gap: 10 }}>
                {node.children.map((c, i) => {
                  const ai = isAiUnit(c);
                  const isNew = c.kind === 'new';
                  return (
                    <div
                      key={c.title}
                      style={{
                        background: ai ? 'var(--tu-violet-50)' : '#fff',
                        border: '1px solid ' + (ai ? 'var(--tu-violet-200)' : isNew ? 'var(--tu-success-border)' : 'var(--tu-grey-200)'),
                        borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column', gap: 4,
                        transition: revealT(380), ...rv(s.sub, i, 50, on ? 0 : 400),
                      }}
                    >
                      {ai && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, ...caps, color: 'var(--tu-violet-600)' }}>
                          <Icon name="sparkles" size={12} />
                          <span>Asistente IA</span>
                        </span>
                      )}
                      {isNew && <span style={{ ...caps, color: 'var(--tu-success)' }}>Puesto nuevo</span>}
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--tu-navy-600)', lineHeight: 1.3 }}>{c.title}</span>
                      <span style={{ fontSize: 12, color: ai ? 'var(--tu-violet-600)' : 'var(--tu-grey-500)' }}>
                        {ai ? 'Absorbe ' + fmt(c.hoursPerMonth) + ' h/mes' : c.hc + (c.hc === 1 ? ' persona' : ' personas')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Panel del nodo seleccionado */}
        <div style={{ flex: '1 1 280px', maxWidth: mobile ? 'none' : 380, ...card(16), display: 'flex', flexDirection: 'column', overflow: 'hidden', position: mobile ? 'static' : 'sticky', top: 88, transition: revealT(380), ...rv(on, 0, 0, 200) }}>
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12, borderBottom: '1px solid var(--tu-grey-100)' }}>
            <span style={caps}>{node.level + (node.tag ? ' · ' + node.tag : '')}</span>
            <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-.018em', lineHeight: 1.2, color: 'var(--tu-navy-600)' }}>{node.title}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 32, height: 32, borderRadius: 999, background: 'var(--tu-grey-100)', color: 'var(--tu-grey-600)', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{initials(node.name)}</span>
              <span style={{ fontSize: 14, color: 'var(--tu-grey-700)' }}>{node.name}</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--tu-grey-100)' }}>
            <div style={{ padding: '16px 20px', borderRight: '1px solid var(--tu-grey-100)', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-.03em', color: 'var(--tu-navy-600)', fontVariantNumeric: 'tabular-nums' }}>{node.hc}</span>
              <span style={{ fontSize: 13, color: 'var(--tu-grey-600)' }}>Personas en su estructura</span>
            </div>
            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-.03em', color: 'var(--tu-navy-600)', fontVariantNumeric: 'tabular-nums' }}>{humans.length}</span>
              <span style={{ fontSize: 13, color: 'var(--tu-grey-600)' }}>Reportes directos</span>
            </div>
          </div>
          <div style={{ padding: '16px 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={caps}>Distribución de plantilla</span>
            {humans.map((r, i) => (
              <div key={r.title} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 13 }}>
                  <span style={{ color: 'var(--tu-grey-700)' }}>{r.title}</span>
                  <span style={{ fontWeight: 600, color: 'var(--tu-navy-600)', fontVariantNumeric: 'tabular-nums' }}>{r.hc}</span>
                </div>
                <div style={{ height: 6, borderRadius: 999, background: 'var(--tu-grey-100)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 999, background: 'var(--tu-cyan)', width: s.sub ? (r.hc / maxC) * 100 + '%' : '0%', transition: `width 700ms ${OUT}`, transitionDelay: i * 50 + 'ms' }} />
                </div>
              </div>
            ))}
          </div>
          {ais.length > 0 && (
            <div style={{ padding: '16px 20px 20px', borderTop: '1px solid var(--tu-violet-100)', background: 'var(--tu-violet-50)', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--tu-violet-600)' }}>
                <Icon name="sparkles" size={14} />
                <span style={{ ...caps, color: undefined }}>Asistentes IA en esta área</span>
              </div>
              {ais.map((a) => (
                <div key={a.title} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 13 }}>
                  <span style={{ color: 'var(--tu-grey-700)' }}>{a.title}</span>
                  <span style={{ fontWeight: 600, color: 'var(--tu-violet-600)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{fmt(a.hoursPerMonth) + ' h/mes'}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isAi && <AutomationTable on={on} mobile={mobile} />}
    </div>
  );
}

/** Tabla "Actividades que absorben los asistentes IA" (Propuesta +AI). */
function AutomationTable({ on, mobile }: { on: boolean; mobile: boolean }) {
  const row = { display: 'grid', gridTemplateColumns: AI_COLS, gap: 16, alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid var(--tu-grey-100)', fontSize: 14 } as const;
  return (
    <div style={{ ...card(), overflow: 'hidden', transition: revealT(420), ...rv(on, 0, 0, 260) }}>
      <div style={{ padding: mobile ? '14px 16px' : '16px 20px', borderBottom: '1px solid var(--tu-grey-100)', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ display: 'flex', color: 'var(--tu-violet)' }}><Icon name="sparkles" size={18} /></span>
        <span style={cardTitle}>Actividades que absorben los asistentes IA</span>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>Montos mensuales en MXN</span>
      </div>
      {mobile ? (
        // Móvil: una tarjeta por actividad automatizada y el total al final.
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {AUTOMATIONS.map((au, i) => {
            const ri = ROLES.findIndex((r) => r.title === au.fromRole);
            return (
              <div key={au.activity} style={{ padding: '14px 16px', borderBottom: '1px solid var(--tu-grey-100)', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, transition: revealT(420), ...rv(on, i, 50, 320) }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--tu-navy-600)' }}>{au.activity}</span>
                    <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>{au.area} · {fmt(au.hoursPerMonth)} h/mes</span>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--tu-navy-600)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{'$' + fmt(au.monthlySavings)}</span>
                </div>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--tu-violet-600)', fontWeight: 500 }}>
                  <Icon name="bot" size={16} />
                  <span>{au.assistant}</span>
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '2px 6px', color: 'var(--tu-grey-700)' }}>
                  {ri >= 0 ? (
                    <button type="button" onClick={() => actions.openRole(ri)} style={{ border: 'none', background: 'none', padding: 0, fontFamily: 'inherit', fontSize: 13, color: 'var(--tu-cyan-600)', cursor: 'pointer', textAlign: 'left' }}>{au.fromRole}</button>
                  ) : (
                    <span>{au.fromRole}</span>
                  )}
                  <span style={{ color: 'var(--tu-grey-500)' }}>({au.positions + (au.positions === 1 ? ' posición' : ' posiciones')})</span>
                  <span>→ {au.destination}</span>
                </div>
              </div>
            );
          })}
          <div style={{ padding: '14px 16px', background: 'var(--tu-grey-25)', display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--tu-grey-600)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><span>6 asistentes · {TOT_P} posiciones · {fmt(TOT_H)} h/mes</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><span>Costo de plataforma IA</span><span style={{ fontVariantNumeric: 'tabular-nums' }}>{'−$' + fmt(AI_COST)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, paddingTop: 6, borderTop: '1px solid var(--tu-grey-200)' }}>
              <span style={{ fontWeight: 700, color: 'var(--tu-navy-600)' }}>Ahorro neto mensual</span>
              <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-.02em', fontVariantNumeric: 'tabular-nums', color: 'var(--tu-violet)' }}>{'$' + fmt(NET)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
          <div style={{ minWidth: 960 }}>
            <div style={{ display: 'grid', gridTemplateColumns: AI_COLS, gap: 16, padding: '12px 20px', borderBottom: '1px solid var(--tu-grey-200)', background: 'var(--tu-grey-25)', ...caps }}>
              <span>Actividad automatizada</span><span>Asistente IA</span><span>Puesto liberado</span><span>Horas/mes</span><span>Reubicación</span><span style={{ textAlign: 'right' }}>Ahorro</span>
            </div>
            {AUTOMATIONS.map((au, i) => {
              const ri = ROLES.findIndex((r) => r.title === au.fromRole);
              return (
                <div key={au.activity} style={{ ...row, transition: revealT(420), ...rv(on, i, 50, 320) }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                    <span style={{ fontWeight: 600, color: 'var(--tu-navy-600)' }}>{au.activity}</span>
                    <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>{au.area}</span>
                  </div>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--tu-violet-600)', fontWeight: 500 }}>
                    <Icon name="bot" size={16} />
                    <span>{au.assistant}</span>
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                    {ri >= 0 ? (
                      <H as="button" onClick={() => actions.openRole(ri)} style={{ alignSelf: 'flex-start', border: 'none', background: 'none', padding: 0, fontFamily: 'inherit', fontSize: 14, textAlign: 'left', color: 'var(--tu-cyan-600)', cursor: 'pointer', transition: 'color 140ms' }} hover={{ color: 'var(--tu-navy-600)' }}>
                        {au.fromRole}
                      </H>
                    ) : (
                      <span style={{ color: 'var(--tu-grey-700)' }}>{au.fromRole}</span>
                    )}
                    <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>{au.positions + (au.positions === 1 ? ' posición' : ' posiciones')}</span>
                  </div>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fmt(au.hoursPerMonth)}</span>
                  <span style={{ color: 'var(--tu-grey-700)' }}>→ {au.destination}</span>
                  <span style={{ textAlign: 'right', fontWeight: 700, color: 'var(--tu-navy-600)', fontVariantNumeric: 'tabular-nums' }}>{'$' + fmt(au.monthlySavings)}</span>
                </div>
              );
            })}
            <div style={{ ...row, background: 'var(--tu-grey-25)' }}>
              <span style={{ fontWeight: 700, color: 'var(--tu-navy-600)' }}>Total</span>
              <span style={{ color: 'var(--tu-grey-600)' }}>6 asistentes</span>
              <span style={{ color: 'var(--tu-grey-600)' }}>{TOT_P} posiciones</span>
              <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: 'var(--tu-navy-600)' }}>{fmt(TOT_H)}</span>
              <span style={{ color: 'var(--tu-grey-600)' }}>Costo de plataforma IA</span>
              <span style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: 'var(--tu-grey-600)' }}>{'−$' + fmt(AI_COST)}</span>
            </div>
            <div style={{ ...row, padding: '14px 20px', borderBottom: 'none' }}>
              <span style={{ fontWeight: 700, color: 'var(--tu-navy-600)' }}>Ahorro neto mensual</span>
              <span /><span /><span /><span />
              <span style={{ textAlign: 'right', fontSize: 18, fontWeight: 800, letterSpacing: '-.02em', fontVariantNumeric: 'tabular-nums', color: 'var(--tu-violet)' }}>{'$' + fmt(NET)}</span>
            </div>
          </div>
        </div>
      )}
      <div style={{ padding: '14px 20px', borderTop: '1px solid var(--tu-grey-100)', background: 'var(--tu-violet-50)', fontSize: 13, lineHeight: 1.55, color: 'var(--tu-grey-700)', textWrap: 'pretty' }}>
        Los asistentes no sustituyen personas: quienes ocupan las posiciones liberadas pasan a puestos nuevos, y las vacantes por rotación (47% anual) ya no se vuelven a abrir.
      </div>
    </div>
  );
}
