import { ROLES } from '../data';
import { Badge } from '../ds/Badge';
import { H } from '../ds/Hover';
import { Icon } from '../ds/Icon';
import { OUT, STD, revealT, rv } from '../lib/anim';
import { SKILL_BY_NAME, gapColor, skillColor } from '../lib/skills';
import { useMobile } from '../lib/useMobile';
import { actions, useApp, type RoleTab } from '../state/store';
import { CloseButton } from '../components/CloseButton';
import { caps, linkBtn } from '../components/styles';
import { STATUS_TONE } from './Puestos';

const TABS: [RoleTab, string][] = [['desc', 'Descripción'], ['tareas', 'Tareas'], ['kpis', 'KPIs'], ['skills', 'Skills']];

const sectionCard = { display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 16, borderBottom: '1px solid var(--tu-grey-100)' } as const;
const note = { fontSize: 13, color: 'var(--tu-grey-500)', marginTop: -4 } as const;

/** Panel lateral (600px) con el detalle de un puesto: descripción, tareas, KPIs y skills. */
export function RoleDrawer() {
  const s = useApp();
  const hasRole = s.role !== null;
  const tabIdx = Math.max(0, TABS.findIndex((t) => t[0] === s.dtab));

  return (
    <>
      <div onClick={actions.closeRole} style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,60,.28)', opacity: s.dOpen ? 1 : 0, pointerEvents: s.dOpen ? 'auto' : 'none', transition: `opacity 260ms ${STD}` }} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={hasRole ? ROLES[s.role!].title : undefined}
        style={{ position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 41, width: 600, maxWidth: '100vw', background: '#fff', borderLeft: '1px solid var(--tu-grey-200)', boxShadow: 'var(--shadow-xl)', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', transform: s.dOpen ? 'none' : 'translateX(100%)', visibility: hasRole ? 'visible' : 'hidden', transition: `transform 340ms ${OUT}` }}
      >
        {hasRole && <RoleDetail index={s.role!} tabIdx={tabIdx} />}
      </aside>
    </>
  );
}

function RoleDetail({ index, tabIdx }: { index: number; tabIdx: number }) {
  const s = useApp();
  const r = ROLES[index];
  const ds = s.dsub;
  const mobile = useMobile();
  const px = mobile ? 16 : 24;

  return (
    <>
      <div style={{ padding: `${mobile ? 16 : 20}px ${px}px 16px`, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={caps}>{r.level} · {r.area}</span>
          <span style={{ flex: 1 }} />
          <CloseButton onClick={actions.closeRole} />
        </div>
        <span style={{ fontSize: mobile ? 22 : 26, fontWeight: 700, letterSpacing: '-.025em', lineHeight: 1.15, color: 'var(--tu-navy-600)' }}>{r.title}</span>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Badge tone={STATUS_TONE[r.status]} size="sm">{r.status}</Badge>
          <Badge tone="ai" size="sm">{r.aiPct}% automatizable</Badge>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', borderTop: '1px solid var(--tu-grey-100)', borderBottom: '1px solid var(--tu-grey-100)' }}>
        <div style={{ padding: `14px ${mobile ? 16 : 24}px`, borderRight: '1px solid var(--tu-grey-100)', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-.03em', color: 'var(--tu-navy-600)', fontVariantNumeric: 'tabular-nums' }}>{r.hc}</span>
          <span style={{ fontSize: 12, color: 'var(--tu-grey-600)' }}>Ocupantes</span>
        </div>
        <div style={{ padding: '14px 16px', borderRight: '1px solid var(--tu-grey-100)', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--tu-navy-600)', lineHeight: 1.3, paddingTop: 4, fontVariantNumeric: 'tabular-nums' }}>{r.band}</span>
          <span style={{ fontSize: 12, color: 'var(--tu-grey-600)' }}>Banda mensual (MXN)</span>
        </div>
        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--tu-navy-600)', lineHeight: 1.3, paddingTop: 4 }}>{r.reportsTo}</span>
          <span style={{ fontSize: 12, color: 'var(--tu-grey-600)' }}>Reporta a</span>
        </div>
      </div>

      <div role="tablist" style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', borderBottom: '1px solid var(--tu-grey-200)', padding: '0 12px' }}>
        <div style={{ position: 'absolute', bottom: -1, height: 2, background: 'var(--tu-navy-600)', left: `calc(12px + (100% - 24px) * ${tabIdx / 4})`, width: 'calc((100% - 24px) / 4)', transition: `left 260ms ${OUT}` }} />
        {TABS.map(([id, label]) => (
          <H
            key={id}
            as="button"
            role="tab"
            aria-selected={id === s.dtab}
            onClick={() => actions.setDtab(id)}
            style={{ height: 44, border: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: id === s.dtab ? 'var(--tu-navy-600)' : 'var(--tu-grey-500)', transition: 'color 140ms' }}
            hover={{ color: 'var(--tu-navy-600)' }}
          >
            {label}
          </H>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', overscrollBehavior: 'contain', padding: px, paddingBottom: mobile ? 32 : px, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {s.dtab === 'desc' && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, transition: revealT(420), ...rv(ds) }}>
              <span style={caps}>Propósito del puesto</span>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: 'var(--tu-grey-700)', textWrap: 'pretty' }}>{r.purpose}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={caps}>Resultados esperados</span>
              {r.results.map((t, j) => (
                <div key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', transition: revealT(420), ...rv(ds, j, 60, 80) }}>
                  <span style={{ display: 'flex', color: 'var(--tu-success)', paddingTop: 2 }}><Icon name="circle-check" size={18} /></span>
                  <span style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--tu-grey-700)' }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ border: '2px solid var(--tu-violet-200)', borderRadius: 16, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center', transition: revealT(420), ...rv(ds, 0, 0, 260) }}>
              <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-.03em', color: 'var(--tu-violet)', fontVariantNumeric: 'tabular-nums' }}>{r.aiPct}%</span>
              <span style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--tu-grey-700)', textWrap: 'pretty' }}>del tiempo de este puesto lo puede absorber un asistente IA. Revisa la pestaña Tareas.</span>
            </div>
          </>
        )}

        {s.dtab === 'tareas' && (
          <>
            <span style={note}>Distribución del tiempo semanal. Las tareas marcadas las puede absorber un asistente IA.</span>
            {r.tasks.map((tk, j) => (
              <div key={tk.name} style={{ ...sectionCard, transition: revealT(420), ...rv(ds, j, 60, 0) }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ flex: '1 1 200px', fontSize: 15, fontWeight: 600, color: 'var(--tu-navy-600)', lineHeight: 1.35 }}>{tk.name}</span>
                  {tk.automatable && <Badge tone="ai" size="sm">Automatizable</Badge>}
                  <Badge tone="neutral" size="sm">{tk.freq}</Badge>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, height: 6, borderRadius: 999, background: 'var(--tu-grey-100)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 999, background: tk.automatable ? 'var(--tu-violet)' : 'var(--tu-cyan)', width: ds ? tk.pct + '%' : '0%', transition: `width 700ms ${OUT}`, transitionDelay: j * 60 + 'ms' }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--tu-grey-700)', width: 36, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{tk.pct}%</span>
                </div>
              </div>
            ))}
          </>
        )}

        {s.dtab === 'kpis' &&
          r.kpis.map((kp, j) => {
            const color = kp.progress >= 90 ? 'var(--tu-success)' : kp.progress >= 70 ? 'var(--tu-warning)' : 'var(--tu-danger)';
            return (
              <div key={kp.name} style={{ background: '#fff', border: '1px solid var(--tu-grey-200)', borderRadius: 12, boxShadow: 'var(--shadow-sm)', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 8, transition: revealT(420), ...rv(ds, j, 80, 0) }}>
                <span style={{ fontSize: 14, color: 'var(--tu-grey-700)' }}>{kp.name}</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.05, color: 'var(--tu-navy-600)', fontVariantNumeric: 'tabular-nums' }}>{kp.actual}</span>
                  <span style={{ fontSize: 13, color: 'var(--tu-grey-500)' }}>Meta: {kp.target}</span>
                </div>
                <div style={{ height: 6, borderRadius: 999, background: 'var(--tu-grey-100)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 999, background: color, width: ds ? kp.progress + '%' : '0%', transition: `width 800ms ${OUT}`, transitionDelay: j * 80 + 'ms' }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color }}>{kp.progress}% de la meta</span>
              </div>
            );
          })}

        {s.dtab === 'skills' && (
          <>
            <span style={note}>Barra: dominio promedio de quienes ocupan el puesto. Marca: nivel que pide la descripción.</span>
            {r.skills.map((sk, j) => {
              const base = SKILL_BY_NAME[sk.name];
              const g = Math.max(0, sk.level - base.current);
              return (
                <div key={sk.name} style={{ ...sectionCard, transition: revealT(420), ...rv(ds, j, 60, 0) }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: 'var(--tu-navy-600)' }}>{sk.name}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: gapColor(g), fontVariantNumeric: 'tabular-nums' }}>Actual {base.current.toFixed(1)} · Requerido {sk.level}</span>
                  </div>
                  <div style={{ position: 'relative', height: 10, borderRadius: 999, background: 'var(--tu-grey-100)' }}>
                    <div style={{ height: '100%', borderRadius: 999, background: skillColor(base.category), width: ds ? (base.current / 4) * 100 + '%' : '0%', transition: `width 800ms ${OUT}`, transitionDelay: j * 60 + 'ms' }} />
                    <div style={{ position: 'absolute', top: -4, bottom: -4, left: (sk.level / 4) * 100 + '%', width: 2, marginLeft: -1, background: 'var(--tu-navy-600)', borderRadius: 1 }} />
                  </div>
                  <H
                    as="button"
                    onClick={() => { actions.closeRole(); actions.go('skills', { skSel: sk.name, skCat: 'Todas', skTab: 'brechas' }); }}
                    style={linkBtn}
                    hover={{ color: 'var(--tu-navy-600)' }}
                  >
                    Ver en Skill Intelligence →
                  </H>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
