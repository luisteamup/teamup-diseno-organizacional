import { Fragment } from 'react';
import { LADDERS, ROLES } from '../../data';
import { Button } from '../../ds/Button';
import { H } from '../../ds/Hover';
import { caps, card, cardTitle, h2, lead } from '../../components/styles';
import { revealT, rv } from '../../lib/anim';
import { EMPS, TEC_ABBR, TEC_BY_ID } from '../../lib/talent';
import { useMobile } from '../../lib/useMobile';
import { actions, useApp } from '../../state/store';
import { TecPopup } from './TecPopup';

/** Subtítulo de cada paso: plantilla del catálogo, o si está ocupado / es nuevo. */
const headcountOf = (role: string) => {
  const r = ROLES.find((x) => x.title === role);
  return r ? r.hc + ' en plantilla' : EMPS.some((x) => x.role === role) ? 'Ocupado' : 'Puesto nuevo o sin ocupar';
};

function Step({ index, title, top, bridge, mobile }: { index: number; title: string; top: boolean; bridge?: string[]; mobile?: boolean }) {
  return (
    <div
      style={{
        width: mobile ? '100%' : 230, flex: '0 0 auto', boxSizing: 'border-box', padding: 12, borderRadius: 12,
        border: '1px solid ' + (top ? 'var(--tu-navy-600)' : 'var(--tu-grey-200)'), background: top ? 'var(--tu-navy-600)' : '#fff',
        display: 'flex', flexDirection: 'column', gap: 4,
      }}
    >
      <span style={{ ...caps, color: top ? 'var(--tu-cyan-200)' : 'var(--tu-grey-500)' }}>Paso {index + 1}</span>
      <span style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3, color: top ? '#fff' : 'var(--tu-navy-600)' }}>{title}</span>
      <span style={{ fontSize: 12, color: top ? 'var(--tu-navy-100)' : 'var(--tu-grey-500)' }}>{headcountOf(title)}</span>
      {bridge && (
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--tu-grey-100)', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: mobile ? 11 : 10, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--tu-cyan-700)' }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--tu-cyan)' }} />
            Capacitación sugerida
          </span>
          {bridge.map((id) => {
            const t = TEC_BY_ID[id];
            return (
              <H
                key={id}
                as="a"
                href={t.url}
                target="_blank"
                rel="noopener"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: mobile ? '8px 10px' : '6px 8px', minHeight: mobile ? 44 : undefined, boxSizing: 'border-box', border: '1px solid var(--tu-cyan-100)', borderRadius: 8,
                  background: 'var(--tu-cyan-50)', textDecoration: 'none', transition: 'border-color 140ms,background 140ms',
                }}
                hover={{ borderColor: 'var(--tu-cyan-600)', background: '#fff' }}
              >
                <span style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
                  <span style={{ fontSize: mobile ? 11 : 10, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--tu-grey-500)' }}>{TEC_ABBR[t.level]}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3, color: 'var(--tu-navy-600)' }}>{t.name}</span>
                </span>
                <span style={{ flex: '0 0 auto', fontSize: 12, color: 'var(--tu-cyan-600)' }}>↗</span>
              </H>
            );
          })}
        </div>
      )}
    </div>
  );
}

const Bridge = ({ mobile }: { mobile?: boolean }) => mobile ? (
  <div style={{ height: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--tu-cyan-600)' }}>
    <span style={{ width: 2, height: 8, background: 'var(--tu-cyan-200)' }} />
    <span style={{ fontSize: 14, fontWeight: 700, lineHeight: 1 }}>↓</span>
  </div>
) : (
  <div style={{ width: 40, flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--tu-cyan-600)' }}>
    <span style={{ width: 14, height: 2, background: 'var(--tu-cyan-200)' }} />
    <span style={{ fontSize: 14, fontWeight: 700 }}>→</span>
  </div>
);

/** Pestaña Career path: rutas por familia de puestos con los programas Tecmilenio de cada salto. */
export function CareerPath() {
  const s = useApp();
  const on = s.entered;
  const mobile = useMobile();
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, transition: revealT(), ...rv(on) }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <h2 style={h2}>Career path</h2>
          <Button variant="secondary" size="sm" icon="graduation-cap" onClick={() => actions.openTec()}>Oferta académica</Button>
        </div>
        <p style={lead()}>Rutas de crecimiento por familia de puestos. Cada salto indica los programas de Tecmilenio que lo habilitan, para upskilling y reskilling.</p>
      </div>
      <div style={{ ...card(16), overflow: 'hidden', transition: revealT(), ...rv(on, 0, 0, 360) }}>
        <div style={{ padding: mobile ? 16 : '16px 20px', borderBottom: '1px solid var(--tu-grey-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: mobile ? 8 : 12, flexWrap: 'wrap' }}>
          <span style={cardTitle}>Rutas de carrera con Tecmilenio</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--tu-grey-600)' }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--tu-cyan-50)', border: '1px solid var(--tu-cyan-600)', boxSizing: 'border-box' }} />
            Capacitación sugerida: programas de Tecmilenio para avanzar al siguiente paso
          </span>
        </div>
        {LADDERS.map((L, li) => (
          <div
            key={L.name}
            style={{ padding: mobile ? 16 : '16px 20px', borderBottom: '1px solid var(--tu-grey-100)', display: 'flex', flexDirection: 'column', gap: 10, transition: revealT(), ...rv(on, li, 70, 380) }}
          >
            <span style={caps}>{L.name}</span>
            <div style={mobile ? undefined : { overflowX: 'auto', overflowY: 'hidden', paddingBottom: 4 }}>
              <div style={mobile ? { display: 'flex', flexDirection: 'column' } : { display: 'flex', alignItems: 'stretch', width: 'max-content' }}>
                {L.steps.map((st, j) => {
                  const bridge = j < L.bridges.length ? L.bridges[j] : undefined;
                  return (
                    <Fragment key={st}>
                      <Step index={j} title={st} top={j === L.steps.length - 1} bridge={bridge} mobile={mobile} />
                      {bridge && <Bridge mobile={mobile} />}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
      <TecPopup variant="career" />
    </>
  );
}
