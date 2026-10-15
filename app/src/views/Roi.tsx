import type { CSSProperties } from 'react';
import { actions, useApp } from '../state/store';
import { OUT, STD, revealT, rv } from '../lib/anim';
import { ease, fmt } from '../lib/format';
import { EMPS, STATUS_COLOR, STATUS_TONE, STRATEGIES, TEC_BY_ID, readyLabel, type Employee } from '../lib/talent';
import { CARGA, DEPTS, type Department } from '../data';
import { Badge } from '../ds/Badge';
import { Icon } from '../ds/Icon';
import { H } from '../ds/Hover';
import { Modal } from '../components/Modal';
import { CloseButton } from '../components/CloseButton';
import { Avatar } from '../components/Avatar';
import { KpiCard, kpiGrid } from '../components/KpiCard';
import { caps, card, cardTitle, h1, h1Strong, lead, linkBtn, track } from '../components/styles';

const M = '$';
const DEPT_BY_ID: Record<string, Department> = Object.fromEntries(DEPTS.map((d) => [d.id, d]));

const mixTotal = (d: Department) => d.mix.meets + d.mix.atRisk + d.mix.below;
const perfColor = (perf: number) => (perf >= 80 ? 'var(--tu-success)' : perf >= 70 ? 'var(--tu-warning)' : 'var(--tu-danger)');
/** Anchos de la barra apilada cumplen / en riesgo / no cumplen. */
const mixWidths = (d: Department, on: boolean) => {
  const t = mixTotal(d);
  return [d.mix.meets, d.mix.atRisk, d.mix.below].map((n) => (on ? (n / t) * 100 + '%' : '0%'));
};
const MIX_COLORS = ['var(--tu-success)', 'var(--tu-warning)', 'var(--tu-danger)'];

// ── Totales de la organización ─────────────────────────────────────────
const TOTAL = DEPTS.reduce((a, d) => a + d.hc * d.avgSalary, 0);
const HC_TOTAL = DEPTS.reduce((a, d) => a + d.hc, 0);
const PERF_WEIGHTED = DEPTS.reduce((a, d) => a + d.perf * d.hc, 0) / HC_TOTAL;
const BELOW_COST = DEPTS.reduce((a, d) => a + d.mix.below * d.avgSalary, 0) * 12 * CARGA;

export function Roi() {
  const s = useApp();
  const on = s.entered;
  const e = ease(s.p);

  const kpis = [
    { value: M + ((TOTAL * e) / 1e6).toFixed(2) + 'M', label: 'Nómina mensual', note: HC_TOTAL + ' colaboradores, sin gerencia general', vc: 'var(--tu-navy-600)' },
    { value: M + ((TOTAL * 12 * CARGA * e) / 1e6).toFixed(1) + 'M', label: 'Costo anual con carga social', note: 'Factor de carga 1.35', vc: 'var(--tu-navy-600)' },
    { value: Math.round(PERF_WEIGHTED * e) + '%', label: 'Cumplimiento promedio', note: 'Ponderado por plantilla · meta 80%', vc: 'var(--tu-warning)' },
    { value: M + ((BELOW_COST * e) / 1e6).toFixed(1) + 'M', label: 'Costo anual en «No cumple»', note: 'Nómina de quienes no entregan resultados', vc: 'var(--tu-danger)' },
  ];

  const legendDot = (background: string, label: string) => (
    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--tu-grey-600)' }}>
      <span style={{ width: 10, height: 10, borderRadius: 999, background }} />
      {label}
    </span>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Hero */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, transition: revealT(), ...rv(on) }}>
        <h1 style={h1}>
          Cuánto cuesta cada área y <strong style={h1Strong}>cuánto devuelve</strong>.
        </h1>
        <p style={lead()}>
          Organigrama actual. Nómina de septiembre 2026 con carga social de 35%. Selecciona un área para ver quién cumple los resultados esperados.
        </p>
      </div>

      {/* KPIs */}
      <div style={kpiGrid}>
        {kpis.map((k, i) => (
          <KpiCard key={k.label} value={k.value} label={k.label} note={k.note} valueColor={k.vc} valueSize={36} on={on} index={i} />
        ))}
      </div>

      {/* Gráfica de burbujas */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 560px', minWidth: 0, ...card(16), padding: 20, display: 'flex', flexDirection: 'column', gap: 8, transition: revealT(), ...rv(on, 0, 0, 200) }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
            <span style={cardTitle}>Rendimiento vs ROI por área</span>
            <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>Tamaño de la burbuja: costo de nómina · clic para ver el detalle</span>
          </div>
          <div style={{ width: '100%', maxWidth: 860, margin: '0 auto', aspectRatio: '760/440' }}>
            <RoiChart on={on} selected={s.roiPop ? s.roiDept : null} />
          </div>
        </div>
      </div>

      {/* Áreas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, transition: revealT(), ...rv(on, 0, 0, 260) }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
          <span style={cardTitle}>Áreas</span>
          {legendDot('var(--tu-success)', 'Cumplen')}
          {legendDot('var(--tu-warning)', 'En riesgo')}
          {legendDot('var(--tu-danger)', 'No cumplen')}
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>Clic para ver el detalle · doble clic para cerrarlo</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 12 }}>
          {DEPTS.map((d, i) => (
            <AreaCard key={d.id} dept={d} index={i} on={on} selected={s.roiPop && d.id === s.roiDept} />
          ))}
        </div>
      </div>

      <DrillDown />
    </div>
  );
}

// ── Mini tarjeta de área ───────────────────────────────────────────────
function AreaCard({ dept: d, index, on, selected }: { dept: Department; index: number; on: boolean; selected: boolean }) {
  const reveal = rv(on, index, 50, 300);
  const widths = mixWidths(d, on);
  return (
    <H
      as="button"
      onClick={() => actions.selectDept(d.id)}
      onDoubleClick={() => actions.closePop()}
      style={{
        display: 'flex', flexDirection: 'column', gap: 10, padding: 16, borderRadius: 12, border: '1px solid var(--tu-grey-200)',
        background: selected ? 'var(--tu-navy-50)' : '#fff',
        boxShadow: selected ? '0 0 0 2px var(--tu-navy-600), var(--shadow-md)' : 'var(--shadow-sm)',
        fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer', userSelect: 'none',
        transition: `opacity 420ms ${OUT},transform 220ms ${STD},box-shadow 220ms ${STD},background 140ms`,
        ...reveal,
      }}
      hover={{ transform: 'translateY(-3px)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.25, color: 'var(--tu-navy-600)' }}>{d.name}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--tu-navy-600)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>ROI {d.roi.toFixed(1)}x</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1, color: perfColor(d.perf), fontVariantNumeric: 'tabular-nums' }}>{d.perf}%</span>
        <span style={{ fontSize: 12, color: 'var(--tu-grey-600)' }}>cumplimiento</span>
      </div>
      <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>
        {d.hc} personas · {M}
        {fmt(d.hc * d.avgSalary)}/mes
      </span>
      <div style={{ display: 'flex', height: 6, borderRadius: 999, overflow: 'hidden', background: 'var(--tu-grey-100)' }}>
        {widths.map((w, j) => (
          <div key={j} style={{ width: w, background: MIX_COLORS[j], transition: `width 800ms ${OUT}`, transitionDelay: reveal.transitionDelay }} />
        ))}
      </div>
    </H>
  );
}

// ── Gráfica de burbujas (SVG 760×440) ──────────────────────────────────
const FONT = 'Outfit, sans-serif';
const X = (v: number) => 90 + ((v - 1) / 5) * 630;
const Y = (p: number) => 380 - ((p - 55) / 45) * 340;
const axisText: CSSProperties = { fontSize: 12, fill: 'var(--tu-grey-500)', fontFamily: FONT };
const gridLine: CSSProperties = { stroke: 'var(--tu-grey-100)', strokeWidth: 1 };
const QUADRANTS: [string, number, number, 'start' | 'end'][] = [
  ['CUMPLE, BAJO RETORNO', 96, 56, 'start'],
  ['RINDE Y DEVUELVE', 714, 56, 'end'],
  ['PRIORIDAD DE INTERVENCIÓN', 96, 372, 'start'],
  ['DEVUELVE, PERO NO CUMPLE', 714, 372, 'end'],
];
const MAX_COST = Math.max(...DEPTS.map((d) => d.hc * d.avgSalary));
/** Burbujas de mayor a menor costo, para que las pequeñas queden encima. */
const BY_COST = DEPTS.slice().sort((a, b) => b.hc * b.avgSalary - a.hc * a.avgSalary);

function RoiChart({ on, selected }: { on: boolean; selected: string | null }) {
  return (
    <svg viewBox="0 0 760 440" style={{ display: 'block', width: '100%', height: '100%', overflow: 'visible' }}>
      {[1, 2, 3, 4, 5, 6].map((v) => (
        <g key={'x' + v}>
          <line x1={X(v)} x2={X(v)} y1={40} y2={380} style={gridLine} />
          <text x={X(v)} y={400} textAnchor="middle" style={axisText}>{v}x</text>
        </g>
      ))}
      {[60, 70, 80, 90, 100].map((p) => (
        <g key={'y' + p}>
          <line x1={90} x2={720} y1={Y(p)} y2={Y(p)} style={gridLine} />
          <text x={80} y={Y(p) + 4} textAnchor="end" style={axisText}>{p}%</text>
        </g>
      ))}
      <line x1={X(3)} x2={X(3)} y1={40} y2={380} style={{ stroke: 'var(--tu-grey-300)', strokeWidth: 1.5, strokeDasharray: '5 5' }} />
      <line x1={90} x2={720} y1={Y(80)} y2={Y(80)} style={{ stroke: 'var(--tu-navy-200)', strokeWidth: 1.5, strokeDasharray: '5 5' }} />
      <text x={716} y={Y(80) - 6} textAnchor="end" style={{ fontSize: 11, fontWeight: 600, fill: 'var(--tu-navy-400)', fontFamily: FONT, letterSpacing: '.06em' }}>META 80%</text>
      {QUADRANTS.map(([label, x, y, anchor]) => (
        <text key={label} x={x} y={y} textAnchor={anchor} style={{ fontSize: 11, fontWeight: 600, fill: 'var(--tu-grey-400)', fontFamily: FONT, letterSpacing: '.08em' }}>{label}</text>
      ))}
      <text x={405} y={428} textAnchor="middle" style={{ fontSize: 12, fill: 'var(--tu-grey-600)', fontFamily: FONT }}>ROI de nómina: valor generado por cada 1 peso de nómina</text>
      <text x={0} y={0} transform="translate(22,210) rotate(-90)" textAnchor="middle" style={{ fontSize: 12, fill: 'var(--tu-grey-600)', fontFamily: FONT }}>Cumplimiento de resultados</text>
      {BY_COST.map((d, i) => {
        const cx = X(d.roi), cy = Y(d.perf);
        const r = 12 + Math.sqrt((d.hc * d.avgSalary) / MAX_COST) * 40;
        const sel = selected === d.id;
        const col = perfColor(d.perf);
        const right = cx < 620;
        return (
          <g key={d.id} onClick={() => actions.selectDept(d.id)} style={{ cursor: 'pointer' }}>
            <circle
              cx={cx} cy={cy} r={r}
              style={{
                fill: col, fillOpacity: sel ? 0.32 : 0.16, stroke: sel ? 'var(--tu-navy-600)' : col, strokeWidth: sel ? 3 : 2,
                transform: on ? 'scale(1)' : 'scale(0)', transformOrigin: cx.toFixed(1) + 'px ' + cy.toFixed(1) + 'px',
                transition: `transform 560ms ${OUT} ${200 + i * 70}ms, fill-opacity 160ms, stroke 160ms`,
              }}
            />
            <text
              x={right ? cx + r + 6 : cx - r - 6} y={cy + 4} textAnchor={right ? 'start' : 'end'}
              style={{ fontSize: 13, fontWeight: sel ? 700 : 600, fill: 'var(--tu-navy-600)', fontFamily: FONT, opacity: on ? 1 : 0, transition: `opacity 400ms ${400 + i * 70}ms` }}
            >
              {d.short}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Drill down del área seleccionada ───────────────────────────────────
function DrillDown() {
  const s = useApp();
  const D = DEPT_BY_ID[s.roiDept];
  const ds = s.entered && s.roiSub;
  const emps = EMPS.filter((x) => x.dept === D.id);
  const widths = mixWidths(D, ds);
  const annual = (D.hc * D.avgSalary * 12 * CARGA) / 1e6;
  const stats: [string, string, string][] = [
    [String(D.hc), 'Plantilla', 'var(--tu-navy-600)'],
    [M + fmt(D.hc * D.avgSalary), 'Nómina mensual', 'var(--tu-navy-600)'],
    [M + annual.toFixed(2) + 'M', 'Costo anual con carga', 'var(--tu-navy-600)'],
    [D.perf + '%', 'Cumplimiento', perfColor(D.perf)],
    [D.roi.toFixed(1) + 'x', 'ROI de nómina', 'var(--tu-navy-600)'],
  ];

  return (
    <Modal open={s.roiPop} onClose={actions.closePop} maxWidth={1040} label={D.full}>
      <div style={{ padding: 20, borderBottom: '1px solid var(--tu-grey-100)', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
          <span style={caps}>Drill down</span>
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-.018em', color: 'var(--tu-navy-600)' }}>{D.full}</span>
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: 13, color: 'var(--tu-grey-500)' }}>Titular: {D.lead}</span>
          <CloseButton onClick={actions.closePop} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12 }}>
          {stats.map(([v, l, c], i) => (
            <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: 2, transition: revealT(), ...rv(ds, i, 50, 0) }}>
              <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-.03em', color: c, fontVariantNumeric: 'tabular-nums' }}>{v}</span>
              <span style={{ fontSize: 12, color: 'var(--tu-grey-600)' }}>{l}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', height: 10, borderRadius: 999, overflow: 'hidden', background: 'var(--tu-grey-100)' }}>
            {widths.map((w, j) => (
              <div key={j} style={{ width: w, background: MIX_COLORS[j], transition: `width 800ms ${OUT}` + (j ? ` ${j * 80}ms` : '') }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, color: 'var(--tu-grey-700)' }}>
            <span>{D.mix.meets} cumplen</span>
            <span>{D.mix.atRisk} en riesgo</span>
            <span>{D.mix.below} no cumplen</span>
          </div>
        </div>
      </div>
      <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--tu-grey-100)', background: 'var(--tu-grey-25)', ...caps }}>
        Colaboradores clave evaluados · {emps.length} de {D.hc}
      </div>
      <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
        <div style={{ minWidth: 700 }}>
          {emps.map((x, i) => (
            <EmployeeRow key={x.index} emp={x} index={i} on={ds} open={s.roiOpen === x.index} subOn={s.roiOS} />
          ))}
        </div>
      </div>
    </Modal>
  );
}

// ── Fila expandible de colaborador ─────────────────────────────────────
function EmployeeRow({ emp: x, index, on, open, subOn }: { emp: Employee; index: number; on: boolean; open: boolean; subOn: boolean }) {
  const reveal = rv(on, index, 50, 60);
  const ok = x.status === 'Cumple';
  const c = TEC_BY_ID[x.course];
  const strategy = !ok && x.causeType ? STRATEGIES[x.causeType] : null;
  const steps = ok || !strategy
    ? ['Asignar como mentor(a) de su equipo durante 90 días.', 'Inscribir en ' + c.name + ' (' + c.level + ') como preparación para ' + x.nextRole + '.', 'Revisar su banda salarial en el siguiente ciclo para retenerle.']
    : strategy.steps(x);
  const perfC = STATUS_COLOR[x.status];

  return (
    <div style={{ borderBottom: '1px solid var(--tu-grey-100)', transition: revealT(), ...reveal }}>
      <H
        as="button"
        onClick={() => actions.toggleRoi(x.index)}
        style={{
          width: '100%', display: 'grid', gridTemplateColumns: 'minmax(220px,1.6fr) minmax(110px,.8fr) minmax(170px,1.2fr) 100px 20px', gap: 16, alignItems: 'center',
          padding: '14px 20px', border: 'none', background: open ? 'var(--tu-grey-25)' : '#fff', fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer', transition: 'background 140ms',
        }}
        hover={{ background: 'var(--tu-grey-25)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <Avatar ini={x.ini} />
          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--tu-navy-600)' }}>{x.name}</span>
            <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>{x.role} · {x.site}</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--tu-navy-600)', fontVariantNumeric: 'tabular-nums' }}>{M + fmt(x.salary * CARGA)}</span>
          <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>costo mensual</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={track(6, { flex: 1 })}>
            <div style={{ height: '100%', borderRadius: 999, background: perfC, width: on ? Math.min(100, x.perf) + '%' : '0%', transition: `width 800ms ${OUT}`, transitionDelay: reveal.transitionDelay }} />
          </div>
          <span style={{ width: 42, textAlign: 'right', fontSize: 13, fontWeight: 700, color: perfC, fontVariantNumeric: 'tabular-nums' }}>{x.perf}%</span>
        </div>
        <span style={{ display: 'flex' }}>
          <Badge tone={STATUS_TONE[x.status]} size="sm">{x.status}</Badge>
        </span>
        <span style={{ display: 'flex', color: 'var(--tu-grey-400)', transform: open ? 'rotate(180deg)' : 'none', transition: `transform 220ms ${STD}` }}>
          <Icon name="chevron-down" size={16} />
        </span>
      </H>
      {open && (
        <div style={{ padding: '4px 20px 20px 62px', display: 'flex', flexWrap: 'wrap', gap: 20, opacity: subOn ? 1 : 0, transform: subOn ? 'none' : 'translateY(8px)', transition: `opacity 320ms ${OUT},transform 320ms ${OUT}` }}>
          <div style={{ flex: '1 1 380px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={caps}>Diagnóstico</span>
            <p style={{ margin: '-6px 0 0', fontSize: 14, lineHeight: 1.6, color: 'var(--tu-grey-700)', textWrap: 'pretty' } as CSSProperties}>
              {ok ? 'Cumple ' + x.perf + '% de sus resultados esperados. Perfil con ' + x.fitNext + '% de preparación para ' + x.nextRole + '.' : x.cause}
            </p>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--tu-navy-600)' }}>
              {ok || !strategy ? 'Plan de retención y crecimiento' : 'Mini estrategia · ' + strategy.title}
            </span>
            {steps.map((text, j) => (
              <div key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span
                  style={{
                    width: 24, height: 24, flex: '0 0 auto', borderRadius: 999, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: ok ? 'var(--tu-success-bg)' : 'var(--tu-navy-50)', color: ok ? 'var(--tu-success)' : 'var(--tu-navy-600)',
                  }}
                >
                  {j + 1}
                </span>
                <span style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--tu-grey-700)' }}>{text}</span>
              </div>
            ))}
          </div>
          <div style={{ flex: '1 1 240px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <H
              as="a"
              href={c.url}
              target="_blank"
              rel="noopener"
              style={{ border: '2px solid var(--tu-navy-600)', borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 4, textDecoration: 'none', transition: 'border-color 140ms' }}
              hover={{ borderColor: 'var(--tu-cyan-600)' }}
            >
              <span style={caps}>Formación sugerida · {c.level}</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--tu-navy-600)' }}>{c.name} ↗</span>
              <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>{c.format}</span>
            </H>
            <span style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--tu-grey-700)' }}>
              {ok
                ? 'Siguiente paso: ' + x.nextRole + ' · ' + readyLabel(x.fitNext).toLowerCase() + '.'
                : 'Meta: pasar de ' + x.perf + '% a 90% de cumplimiento en 90 días.'}
            </span>
            <H as="button" onClick={() => actions.goEmp(x.index)} style={{ ...linkBtn, textAlign: 'left' }} hover={{ color: 'var(--tu-navy-600)' }}>
              Ver perfil de skills →
            </H>
          </div>
        </div>
      )}
    </div>
  );
}
