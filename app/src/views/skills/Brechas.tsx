import { ROLES } from '../../data';
import { Badge } from '../../ds/Badge';
import { H } from '../../ds/Hover';
import { Icon } from '../../ds/Icon';
import { OUT, revealT, rv } from '../../lib/anim';
import { ease } from '../../lib/format';
import {
  SKILL_AGG, SKILL_CATEGORIES, SKILL_COVERAGE, SKILL_CRITICAL, SKILL_PEOPLE,
  gapColor, skillColor, skillRecommendation, skillTone,
} from '../../lib/skills';
import { actions, useApp } from '../../state/store';
import { Chips } from '../../components/Chips';
import { KpiCard, kpiGrid } from '../../components/KpiCard';
import { caps, card, h1, h1Strong, tableHead } from '../../components/styles';

const COLS = 'minmax(180px,1.5fr) minmax(180px,2fr) 60px 72px 108px';
const CAT_COUNTS = Object.fromEntries(SKILL_CATEGORIES.map((c) => [c, c === 'Todas' ? SKILL_AGG.length : SKILL_AGG.filter((k) => k.category === c).length]));
const SORTS = [['gap', 'Por desarrollar'], ['fort', 'Fortalezas']] as const;

/** Barra "tenemos" con marca vertical de "necesitamos" (escala 1–4). */
function GapBar({ current, required, color, width, ms, delay, markTransition }: { current: number; required: number; color: string; width: boolean; ms: number; delay?: string; markTransition?: string }) {
  return (
    <div style={{ position: 'relative', height: 10, borderRadius: 999, background: 'var(--tu-grey-100)' }}>
      <div style={{ height: '100%', borderRadius: 999, background: color, width: width ? (current / 4) * 100 + '%' : '0%', transition: `width ${ms}ms ${OUT}`, transitionDelay: delay }} />
      <div style={{ position: 'absolute', top: -4, bottom: -4, left: (required / 4) * 100 + '%', width: 2, marginLeft: -1, background: 'var(--tu-navy-600)', borderRadius: 1, transition: markTransition }} />
    </div>
  );
}

export function Brechas() {
  const s = useApp();
  const on = s.entered;
  const e = ease(s.p);

  const list = SKILL_AGG.filter((k) => s.skCat === 'Todas' || k.category === s.skCat)
    .slice()
    .sort(s.skSort === 'gap' ? (a, b) => b.gap - a.gap : (a, b) => b.coverage - a.coverage || b.current - a.current);
  const selName = list.some((k) => k.name === s.skSel) ? s.skSel : list[0]?.name ?? null;
  const K = SKILL_AGG.find((k) => k.name === selName) ?? SKILL_AGG[0];
  const isAi = K.category === 'IA';

  const kpis = [
    { value: String(Math.round(SKILL_AGG.length * e)), label: 'Habilidades identificadas', note: 'Extraídas de 13 descripciones de puesto', valueColor: 'var(--tu-navy-600)' },
    { value: Math.round(SKILL_COVERAGE * 100 * e) + '%', label: 'Cobertura promedio', note: 'Dominio actual contra el requerido', valueColor: 'var(--tu-navy-600)' },
    { value: String(Math.round(SKILL_CRITICAL * e)), label: 'Brechas críticas', note: 'Requieren reskilling de 8 a 12 semanas', valueColor: 'var(--tu-danger)' },
    { value: String(Math.round(SKILL_PEOPLE * e)), label: 'Personas por desarrollar', note: 'Con al menos una brecha de medio nivel', valueColor: 'var(--tu-navy-600)' },
  ];

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, transition: revealT(420), ...rv(on) }}>
        <h1 style={h1}>Lo que tu gente sabe hacer, contra lo que <strong style={h1Strong}>tu operación necesita</strong>.</h1>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: 'var(--tu-grey-600)', maxWidth: 720 }}>Mapa de habilidades inferido de 13 descripciones de puesto y 313 perfiles del catálogo. Dominio en escala de 1 a 4.</p>
      </div>

      <div style={kpiGrid}>
        {kpis.map((k, i) => <KpiCard key={k.label} {...k} on={on} index={i} />)}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <Chips options={SKILL_CATEGORIES} active={s.skCat} counts={CAT_COUNTS} onPick={actions.setSkCat} />
        <span style={{ flex: 1 }} />
        <div style={{ display: 'flex', padding: 4, gap: 4, background: '#fff', border: '1px solid var(--tu-grey-200)', borderRadius: 10, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 4, bottom: 4, width: 132, left: s.skSort === 'gap' ? 4 : 140, background: 'var(--tu-navy-600)', borderRadius: 8, transition: `left 260ms ${OUT}` }} />
          {SORTS.map(([id, label]) => (
            <button key={id} type="button" aria-pressed={id === s.skSort} onClick={() => actions.setSkSort(id)} style={{ position: 'relative', width: 132, height: 32, border: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: id === s.skSort ? '#fff' : 'var(--tu-grey-600)', transition: 'color 220ms', whiteSpace: 'nowrap' }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Tabla de brechas */}
        <div style={{ flex: '1 1 600px', minWidth: 0, ...card(), overflow: 'hidden', transition: revealT(420), ...rv(on, 0, 0, 240) }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--tu-grey-100)', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', fontSize: 12, color: 'var(--tu-grey-600)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 8, borderRadius: 999, background: 'var(--tu-cyan)' }} />Tenemos: dominio actual</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 2, height: 14, borderRadius: 1, background: 'var(--tu-navy-600)' }} />Necesitamos: lo que piden los puestos</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 8, borderRadius: 999, background: 'var(--tu-violet)' }} />Habilidades IA</span>
          </div>
          <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
            <div style={{ minWidth: 660 }}>
              <div style={tableHead(COLS)}>
                <span>Habilidad</span><span>Tenemos vs. necesitamos</span><span>Brecha</span><span>Personas</span><span>Acción</span>
              </div>
              {list.map((k, i) => {
                const reveal = rv(on, i, 40, 200);
                return (
                  <div
                    key={k.name}
                    role="button"
                    tabIndex={0}
                    aria-pressed={k.name === selName}
                    onClick={() => actions.pickSkill(k.name)}
                    onKeyDown={(ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); actions.pickSkill(k.name); } }}
                    style={{ display: 'grid', gridTemplateColumns: COLS, gap: 16, alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid var(--tu-grey-100)', cursor: 'pointer', background: k.name === selName ? 'var(--tu-navy-50)' : '#fff', transition: `${revealT(420)},background 140ms`, ...reveal }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--tu-navy-600)' }}>{k.name}</span>
                      <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>{k.category}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <GapBar current={k.current} required={k.required} color={skillColor(k.category)} width={on} ms={900} delay={reveal.transitionDelay as string} />
                      <span style={{ fontSize: 12, color: 'var(--tu-grey-500)', fontVariantNumeric: 'tabular-nums' }}>{k.current.toFixed(1) + ' / ' + k.required.toFixed(1)}</span>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: gapColor(k.gap), fontVariantNumeric: 'tabular-nums' }}>{k.gap > 0.05 ? '−' + k.gap.toFixed(1) : '—'}</span>
                    <span style={{ fontSize: 14, fontVariantNumeric: 'tabular-nums' }}>{k.people}</span>
                    <span style={{ display: 'flex' }}><Badge tone={skillTone(k)} size="sm">{k.action}</Badge></span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Panel de la habilidad seleccionada */}
        <div style={{ flex: '1 1 300px', maxWidth: 400, ...card(16), overflow: 'hidden', position: 'sticky', top: 88, transition: revealT(420), ...rv(on, 0, 0, 320) }}>
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 8, borderBottom: '1px solid var(--tu-grey-100)' }}>
            <span style={caps}>{K.category}</span>
            <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-.018em', lineHeight: 1.2, color: 'var(--tu-navy-600)' }}>{K.name}</span>
            <span style={{ fontSize: 13, color: 'var(--tu-grey-500)' }}>{K.roles.length + (K.roles.length === 1 ? ' descripción de puesto la menciona' : ' descripciones de puesto la mencionan')}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--tu-grey-100)' }}>
            <div style={{ padding: '16px 20px', borderRight: '1px solid var(--tu-grey-100)', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-.03em', color: skillColor(K.category), fontVariantNumeric: 'tabular-nums' }}>{K.current.toFixed(1)}</span>
              <span style={{ fontSize: 13, color: 'var(--tu-grey-600)' }}>Tenemos</span>
            </div>
            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-.03em', color: 'var(--tu-navy-600)', fontVariantNumeric: 'tabular-nums' }}>{K.required.toFixed(1)}</span>
              <span style={{ fontSize: 13, color: 'var(--tu-grey-600)' }}>Necesitamos</span>
            </div>
          </div>
          <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12, borderBottom: '1px solid var(--tu-grey-100)' }}>
            <GapBar current={K.current} required={K.required} color={skillColor(K.category)} width={on && s.sksub} ms={800} markTransition={`left 400ms ${OUT}`} />
            <div style={{ border: '2px solid ' + (isAi ? 'var(--tu-violet-200)' : 'var(--tu-navy-600)'), borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ display: 'flex' }}><Badge tone={skillTone(K)} size="sm">{K.action}</Badge></span>
              <span style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--tu-grey-700)', textWrap: 'pretty' }}>{skillRecommendation(K)}</span>
              {isAi && (
                <H as="button" onClick={actions.goAi} style={{ alignSelf: 'flex-start', border: 'none', background: 'none', padding: 0, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: 'var(--tu-violet-600)', cursor: 'pointer', transition: 'color 140ms' }} hover={{ color: 'var(--tu-navy-600)' }}>
                  Ver Propuesta +AI →
                </H>
              )}
            </div>
          </div>
          <div style={{ padding: '16px 20px 8px', ...caps }}>Puestos que la requieren</div>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '0 8px 8px' }}>
            {K.roles.map((r, j) => (
              <H
                key={r.roleIndex}
                as="button"
                onClick={() => actions.openRole(r.roleIndex)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', border: 'none', background: 'transparent', borderRadius: 8, fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer', transition: revealT(420), ...rv(on && s.sksub, j, 50, 0) }}
                hover={{ background: 'var(--tu-grey-50)' }}
              >
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--tu-navy-600)' }}>{ROLES[r.roleIndex].title}</span>
                  <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>{'Nivel requerido ' + r.level + ' · ' + r.hc + (r.hc === 1 ? ' persona' : ' personas')}</span>
                </div>
                <span style={{ display: 'flex', color: 'var(--tu-grey-400)' }}><Icon name="chevron-right" size={16} /></span>
              </H>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
