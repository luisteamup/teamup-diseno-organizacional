import { Fragment, type CSSProperties } from 'react';
import { NINE_BOX, PROFILES, SUCCESSION, type Move } from '../../data';
import { Badge, type Tone } from '../../ds/Badge';
import { Button } from '../../ds/Button';
import { H } from '../../ds/Hover';
import { Avatar } from '../../components/Avatar';
import { Modal } from '../../components/Modal';
import { caps, card, cardTitle, h2, lead, tableHead } from '../../components/styles';
import { OUT, STD, revealT, rv } from '../../lib/anim';
import { ease } from '../../lib/format';
import { EMPS, EMP_BY_NAME, MOVE_COLOR, MOVE_TONE, fitOf, readyColor, readyLabel, readyTone } from '../../lib/talent';
import { actions, useApp } from '../../state/store';
import { EmployeeProfile } from './EmployeeProfile';
import { TecPopup } from './TecPopup';

const MOVE_STATS: [Move, string, string][] = [
  ['Sube', 'Suben', 'Promoción o sucesión'],
  ['Se desarrolla', 'Se desarrollan', 'Plan de 90 días'],
  ['Se mantiene', 'Se mantienen', 'Upskilling puntual'],
  ['Se reubica', 'Se reubican', 'Puesto con mejor ajuste'],
];
const NINE_ROWS: [number, string][] = [[2, 'Potencial alto'], [1, 'Potencial medio'], [0, 'Potencial bajo']];
const PERF_COLS = ['Desempeño bajo · <75%', 'Medio · 75–89%', 'Alto · ≥90%'];
const SUCC_COLS = 'minmax(200px,1.3fr) minmax(190px,1.1fr) 104px minmax(320px,2.2fr)';
const RISK_TONE: Record<string, Tone> = { 'Alto': 'danger', 'Medio': 'warning', 'Vacante': 'info' };
/** Transición de tarjetas clicables: reveal lento + hover rápido. */
const liftT = `opacity 420ms ${OUT},transform 220ms ${STD},box-shadow 220ms ${STD}`;

function MoveStats({ on, e }: { on: boolean; e: number }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
      {MOVE_STATS.map(([k, label, sub], i) => {
        const n = EMPS.filter((x) => x.move === k).length;
        const keep = k === 'Se mantiene';
        return (
          <div
            key={k}
            style={{
              border: '2px solid ' + (keep ? 'var(--tu-grey-300)' : MOVE_COLOR[k]), borderRadius: 20, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14,
              transition: revealT(), ...rv(on, i, 70, 80),
            }}
          >
            <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-.03em', color: keep ? 'var(--tu-navy-600)' : MOVE_COLOR[k], fontVariantNumeric: 'tabular-nums' }}>{Math.round(n * e)}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--tu-navy-600)' }}>{label}</span>
              <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>{sub}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function NineBox({ on, sel }: { on: boolean; sel: string }) {
  return (
    <div style={{ flex: '1 1 100%', minWidth: 0, ...card(16), padding: 20, display: 'flex', flexDirection: 'column', gap: 14, transition: revealT(), ...rv(on, 0, 0, 140) }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
        <span style={cardTitle}>Matriz de talento 9-box</span>
        <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>Desempeño vs. potencial · selecciona un cuadrante</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '24px repeat(3,minmax(0,1fr))', gap: 8 }}>
        {NINE_ROWS.map(([pt, label], ri) => (
          <Fragment key={pt}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', ...caps, whiteSpace: 'nowrap' }}>{label}</span>
            </div>
            {[0, 1, 2].map((pf) => {
              const key = pt + '-' + pf;
              const B = NINE_BOX[key];
              const ppl = EMPS.filter((x) => x.box === key);
              return (
                <H
                  key={key}
                  as="button"
                  onClick={() => actions.setNbSel(key)}
                  style={{
                    minHeight: 132, boxSizing: 'border-box', padding: 14, borderRadius: 12, border: '1px solid var(--tu-grey-200)',
                    background: B.move === 'Sube' ? 'var(--tu-cyan-50)' : B.move === 'Se reubica' ? 'var(--tu-danger-bg)' : '#fff',
                    boxShadow: sel === key ? '0 0 0 2px var(--tu-navy-600), var(--shadow-md)' : 'none',
                    fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 4,
                    transition: liftT, ...rv(on, ri * 3 + pf, 40, 160),
                  }}
                  hover={{ transform: 'translateY(-2px)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--tu-navy-600)' }}>{B.title}</span>
                    <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-.03em', color: ppl.length ? MOVE_COLOR[B.move] : 'var(--tu-grey-300)', fontVariantNumeric: 'tabular-nums' }}>{ppl.length}</span>
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--tu-grey-600)' }}>{B.action}</span>
                  <span style={{ marginTop: 'auto', fontSize: 12, lineHeight: 1.4, color: 'var(--tu-grey-500)' }}>
                    {ppl.slice(0, 3).map((x) => x.first).join(', ') + (ppl.length > 3 ? ' +' + (ppl.length - 3) : '')}
                  </span>
                </H>
              );
            })}
          </Fragment>
        ))}
        <span />
        {PERF_COLS.map((l) => (
          <span key={l} style={{ textAlign: 'center', ...caps }}>{l}</span>
        ))}
      </div>
    </div>
  );
}

/** Detalle del cuadrante seleccionado con tarjetas de personas. */
function QuadrantPeople({ on, sel }: { on: boolean; sel: string }) {
  const B = NINE_BOX[sel];
  const people = EMPS.filter((x) => x.box === sel);
  return (
    <div style={{ flex: '1 1 100%', minWidth: 0, ...card(16), overflow: 'hidden', transition: revealT(), ...rv(on, 0, 0, 220) }}>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 8, borderBottom: '1px solid var(--tu-grey-100)' }}>
        <span style={{ display: 'flex' }}><Badge tone={MOVE_TONE[B.move]} size="sm">{B.move}</Badge></span>
        <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-.018em', color: 'var(--tu-navy-600)' }}>{B.title} · {B.action}</span>
        <span style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--tu-grey-600)', textWrap: 'pretty' } as CSSProperties}>{B.description}</span>
      </div>
      <div style={{ padding: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))', gap: 12 }}>
        {people.map((x, j) => (
          <H
            key={x.index}
            as="button"
            onClick={() => actions.openEmpPop(x.index)}
            style={{
              display: 'flex', flexDirection: 'column', gap: 6, padding: 12, borderRadius: 12, border: '1px solid var(--tu-grey-200)', background: '#fff', boxShadow: 'var(--shadow-xs)',
              fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer', transition: liftT, ...rv(on, j, 50, 0),
            }}
            hover={{ transform: 'translateY(-3px)', boxShadow: 'var(--shadow-md)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <Avatar ini={x.ini} />
              <Badge tone={readyTone(x.fitNext)} size="sm">{readyLabel(x.fitNext)}</Badge>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.25, color: 'var(--tu-navy-600)' }}>{x.name}</span>
            <span style={{ fontSize: 12, lineHeight: 1.35, color: 'var(--tu-grey-500)' }}>{x.role} · {x.site}</span>
            <span style={{ marginTop: 'auto', paddingTop: 6, borderTop: '1px solid var(--tu-grey-100)', fontSize: 12, color: 'var(--tu-grey-700)' }}>→ {x.nextRole}</span>
          </H>
        ))}
      </div>
      {people.length === 0 && <div style={{ padding: 20, fontSize: 14, color: 'var(--tu-grey-500)' }}>Nadie en este cuadrante.</div>}
    </div>
  );
}

function SuccessionTable({ on }: { on: boolean }) {
  return (
    <div style={{ ...card(16), overflow: 'hidden', transition: revealT(), ...rv(on, 0, 0, 300) }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--tu-grey-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
        <span style={cardTitle}>Plan de sucesión · posiciones clave</span>
        <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>Preparación calculada contra el perfil del puesto destino</span>
      </div>
      <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
        <div style={{ minWidth: 900 }}>
          <div style={tableHead(SUCC_COLS)}>
            <span>Posición</span><span>Titular</span><span>Riesgo</span><span>Sucesores</span>
          </div>
          {SUCCESSION.map((r, i) => {
            const inc = r.incumbent ? EMP_BY_NAME[r.incumbent] : null;
            return (
              <div
                key={r.position}
                style={{
                  display: 'grid', gridTemplateColumns: SUCC_COLS, gap: 16, alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid var(--tu-grey-100)',
                  transition: revealT(), ...rv(on, i, 50, 320),
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--tu-navy-600)' }}>{r.position}</span>
                  <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>{r.area}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 14, color: 'var(--tu-grey-700)' }}>{inc ? inc.name : 'Sin titular'}</span>
                  <Badge tone={inc ? MOVE_TONE[inc.move] : 'info'} size="sm">{inc ? inc.move : 'Puesto nuevo'}</Badge>
                </div>
                <span style={{ display: 'flex' }}><Badge tone={RISK_TONE[r.risk]} size="sm">{r.risk}</Badge></span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {r.successors.map((n) => {
                    const x = EMP_BY_NAME[n];
                    const f = fitOf(x.scores, PROFILES[r.role]);
                    return (
                      <H
                        key={n}
                        as="button"
                        onClick={() => actions.openEmpPop(x.index)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px 4px 4px', borderRadius: 999, border: '1px solid var(--tu-grey-300)', background: '#fff',
                          fontFamily: 'inherit', cursor: 'pointer', transition: 'border-color 140ms,background 140ms',
                        }}
                        hover={{ borderColor: 'var(--tu-navy-600)', background: 'var(--tu-navy-50)' }}
                      >
                        <Avatar ini={x.ini} size={26} fontSize={10} />
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--tu-navy-600)', whiteSpace: 'nowrap' }}>{x.name}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: readyColor(f), whiteSpace: 'nowrap' }}>{readyLabel(f)} · {f}%</span>
                      </H>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Pestaña Sucesión: movimientos, 9-box, plan de sucesión y pop-ups de oferta y perfil. */
export function Sucesion() {
  const s = useApp();
  const on = s.entered;
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, transition: revealT(), ...rv(on) }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <h2 style={h2}>Plan de sucesión</h2>
          <Button variant="secondary" size="sm" icon="graduation-cap" onClick={() => actions.openTec()}>Oferta académica</Button>
        </div>
        <p style={lead()}>
          Quién está listo para subir, quién necesita desarrollo y quién tendría mejor ajuste en otro puesto. Evaluación de {EMPS.length} colaboradores clave y 7 posiciones críticas. Haz clic en una persona para ver su perfil.
        </p>
      </div>
      <MoveStats on={on} e={ease(s.p)} />
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <NineBox on={on} sel={s.nbSel} />
        <QuadrantPeople on={on} sel={s.nbSel} />
      </div>
      <SuccessionTable on={on} />
      <TecPopup variant="suc" />
      <Modal open={s.empPop} onClose={actions.closeEmpPop} maxWidth={980} label="Perfil del colaborador">
        <EmployeeProfile onClose={actions.closeEmpPop} showRadar={s.empPop} />
      </Modal>
    </>
  );
}
