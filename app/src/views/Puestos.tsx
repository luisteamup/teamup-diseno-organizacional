import { ROLES, type RoleStatus } from '../data';
import { Badge, type Tone } from '../ds/Badge';
import { H } from '../ds/Hover';
import { Icon } from '../ds/Icon';
import { OUT, revealT, rv } from '../lib/anim';
import { useMobile } from '../lib/useMobile';
import { actions, useApp } from '../state/store';
import { Chips } from '../components/Chips';
import { card, tableHead } from '../components/styles';

export const STATUS_TONE: Record<RoleStatus, Tone> = { 'Validado': 'success', 'En revisión': 'warning', 'Pendiente': 'neutral', 'Duplicidad': 'danger' };
const FILTERS = ['Todos', 'Validado', 'En revisión', 'Pendiente', 'Duplicidad'] as const;
const COLS = 'minmax(200px,2fr) minmax(130px,1.2fr) 52px 84px minmax(150px,1.3fr) 120px 104px 16px';
const COUNTS = Object.fromEntries(FILTERS.map((f) => [f, f === 'Todos' ? ROLES.length : ROLES.filter((r) => r.status === f).length]));

export function Puestos() {
  const s = useApp();
  const mobile = useMobile();
  const on = s.entered;
  const rows = ROLES.map((r, idx) => ({ r, idx })).filter(({ r }) => s.filter === 'Todos' || r.status === s.filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Chips options={FILTERS} active={s.filter} counts={COUNTS} onPick={actions.setFilter} />
      <span style={{ fontSize: 13, color: 'var(--tu-grey-500)', marginTop: -6 }}>Selecciona un puesto para ver descripción, tareas, KPIs y skills.</span>
      {mobile ? (
        // Móvil: una tarjeta por puesto.
        <div style={{ ...card(), overflow: 'hidden' }}>
          {rows.map(({ r, idx }, i) => {
            const reveal = rv(on, i, 40, 0);
            return (
              <button
                key={r.title}
                type="button"
                onClick={() => actions.openRole(idx)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', border: 'none', borderBottom: '1px solid var(--tu-grey-100)', background: '#fff', fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer', transition: revealT(360), ...reveal }}
              >
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--tu-navy-600)' }}>{r.title}</span>
                    <Badge tone={STATUS_TONE[r.status]} size="sm">{r.status}</Badge>
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>{r.area} · {r.level} · {r.hc} ocupantes</span>
                  <span style={{ fontSize: 13, color: 'var(--tu-grey-700)', fontVariantNumeric: 'tabular-nums' }}>{r.band} <span style={{ color: 'var(--tu-grey-500)', fontSize: 12 }}>MXN/mes</span></span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--tu-grey-500)', whiteSpace: 'nowrap' }}>Potencial IA</span>
                    <div style={{ flex: 1, height: 6, borderRadius: 999, background: 'var(--tu-grey-100)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: 999, background: 'var(--tu-violet)', width: on ? r.aiPct + '%' : '0%', transition: `width 800ms ${OUT}`, transitionDelay: reveal.transitionDelay }} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--tu-violet-600)', fontVariantNumeric: 'tabular-nums' }}>{r.aiPct}%</span>
                  </div>
                </div>
                <span style={{ display: 'flex', color: 'var(--tu-grey-400)' }}><Icon name="chevron-right" size={16} /></span>
              </button>
            );
          })}
        </div>
      ) : (
        <div style={{ ...card(), overflowX: 'auto', overflowY: 'hidden' }}>
          <div style={{ minWidth: 1000 }}>
            <div style={tableHead(COLS)}>
              <span>Puesto</span><span>Área</span><span>Nivel</span><span>Ocupantes</span><span>Banda mensual (MXN)</span><span>Potencial IA</span><span>Estado</span><span />
            </div>
            {rows.map(({ r, idx }, i) => {
              const reveal = rv(on, i, 40, 0);
              return (
                <H
                  key={r.title}
                  role="button"
                  tabIndex={0}
                  onClick={() => actions.openRole(idx)}
                  onKeyDown={(ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); actions.openRole(idx); } }}
                  style={{ cursor: 'pointer', display: 'grid', gridTemplateColumns: COLS, gap: 16, alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid var(--tu-grey-100)', fontSize: 14, transition: `${revealT(360)},background 140ms`, ...reveal }}
                  hover={{ background: 'var(--tu-grey-25)' }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--tu-navy-600)' }}>{r.title}</span>
                  <span style={{ color: 'var(--tu-grey-600)' }}>{r.area}</span>
                  <span style={{ color: 'var(--tu-grey-600)' }}>{r.level}</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>{r.hc}</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--tu-grey-700)' }}>{r.band}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1, height: 6, borderRadius: 999, background: 'var(--tu-grey-100)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: 999, background: 'var(--tu-violet)', width: on ? r.aiPct + '%' : '0%', transition: `width 800ms ${OUT}`, transitionDelay: reveal.transitionDelay }} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--tu-violet-600)', fontVariantNumeric: 'tabular-nums', width: 34, textAlign: 'right' }}>{r.aiPct}%</span>
                  </div>
                  <span style={{ display: 'flex' }}>
                    <Badge tone={STATUS_TONE[r.status]} size="sm">{r.status}</Badge>
                  </span>
                  <span style={{ display: 'flex', color: 'var(--tu-grey-400)' }}><Icon name="chevron-right" size={16} /></span>
                </H>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
