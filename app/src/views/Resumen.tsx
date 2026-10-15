import { AREAS, STORES } from '../data';
import { Badge, type Tone } from '../ds/Badge';
import { H } from '../ds/Hover';
import { Icon } from '../ds/Icon';
import { OUT, revealT, rv } from '../lib/anim';
import { ease } from '../lib/format';
import { useMobile } from '../lib/useMobile';
import { actions, useApp } from '../state/store';
import { KpiCard, KpiGrid } from '../components/KpiCard';
import { caps, card, cardTitle, h1, h1Strong, linkBtn } from '../components/styles';

const STORE_COLS = 'minmax(140px,1fr) 100px minmax(200px,2fr) 56px';

export function Resumen() {
  const s = useApp();
  const on = s.entered;
  const e = ease(s.p);
  const mobile = useMobile();

  const kpis = [
    { value: String(Math.round(412 * e)), label: 'Colaboradores activos', note: '6 sucursales, CEDIS y corporativo', noteColor: 'var(--tu-grey-500)' },
    { value: String(Math.round(6 * e)), label: 'Niveles jerárquicos', note: 'De gerencia general a piso de venta', noteColor: 'var(--tu-grey-500)' },
    { value: '1:' + (4.8 * e).toFixed(1), label: 'Tramo de control promedio', note: 'Referencia del proyecto: 1:8', noteColor: 'var(--tu-warning)' },
    { value: Math.round(47 * e) + '%', label: 'Rotación anual', note: '61% de las bajas ocurre antes de 90 días', noteColor: 'var(--tu-danger)' },
  ];

  const insights: { sev: string; tone: Tone; title: string; text: string; cta: string; go: () => void }[] = [
    { sev: 'Alta', tone: 'danger', title: 'Duplicidad de funciones en piso', text: 'Jefe de piso y supervisor de turno comparten 70% de sus responsabilidades en 4 de 6 sucursales.', cta: 'Ver puestos →', go: () => actions.go('puestos', { filter: 'Duplicidad' }) },
    { sev: 'Media', tone: 'warning', title: 'Siete reportes directos a gerencia general', text: 'Operación, soporte y áreas corporativas escalan al mismo nivel. La gerencia general resuelve lo operativo.', cta: 'Ver organigrama →', go: () => actions.go('org', { ver: 'actual', sel: 'gg' }) },
    { sev: 'Media', tone: 'warning', title: 'Rotación concentrada en tienda', text: 'Cajas y piso de venta suman 8 de cada 10 bajas. Kennedy y Colosio superan 50% anual.', cta: 'Ver puestos →', go: () => actions.go('puestos', { filter: 'Todos' }) },
  ];

  const maxA = AREAS[0].hc;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, transition: revealT(480), ...rv(on) }}>
        <h1 style={mobile ? { ...h1, fontSize: 26 } : h1}>Una estructura que creció <strong style={h1Strong}>tienda por tienda</strong>, no por diseño.</h1>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: 'var(--tu-grey-600)', maxWidth: 720 }}>Diagnóstico con datos de nómina y entrevistas en 6 sucursales y CEDIS. Corte: septiembre 2026.</p>
      </div>

      <KpiGrid>
        {kpis.map((k, i) => (
          <KpiCard key={k.label} {...k} on={on} index={i} duration={480} />
        ))}
      </KpiGrid>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(360px,100%),1fr))', gap: 16 }}>
        {/* Plantilla por área */}
        <div style={{ ...card(), padding: 20, display: 'flex', flexDirection: 'column', gap: 16, transition: revealT(480), ...rv(on, 0, 0, 300) }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
            <span style={cardTitle}>Plantilla por área</span>
            <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>412 colaboradores</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {AREAS.map((a, i) => (
              <div key={a.label} style={{ display: 'grid', gridTemplateColumns: mobile ? '112px minmax(0,1fr) 32px' : '132px minmax(0,1fr) 36px', alignItems: 'center', gap: mobile ? 10 : 12 }}>
                <span style={{ fontSize: 13, color: 'var(--tu-grey-700)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.label}</span>
                <div style={{ height: 10, borderRadius: 999, background: 'var(--tu-grey-100)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 999, background: i === 0 ? 'var(--tu-navy-600)' : 'var(--tu-cyan)', width: on ? (a.hc / maxA) * 100 + '%' : '0%', transition: `width 900ms ${OUT}`, transitionDelay: 300 + i * 60 + 'ms' }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--tu-navy-600)', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{a.hc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Insights */}
        <div style={{ ...card(), border: '1px solid var(--tu-violet-100)', display: 'flex', flexDirection: 'column', overflow: 'hidden', transition: revealT(480), ...rv(on, 0, 0, 380) }}>
          <div style={{ padding: '16px 20px', background: 'var(--tu-violet-50)', borderBottom: '1px solid var(--tu-violet-100)', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--tu-violet-600)' }}>
            <Icon name="sparkles" size={18} />
            <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-.018em' }}>Deep Insights</span>
            <span style={{ flex: 1 }} />
            <span style={{ fontSize: 12, color: 'var(--tu-grey-600)' }}>3 patrones detectados</span>
          </div>
          {insights.map((f, i) => (
            <div key={f.title} style={{ padding: '16px 20px', borderBottom: '1px solid var(--tu-grey-100)', display: 'flex', flexDirection: 'column', gap: 6, transition: revealT(420), ...rv(on, i, 90, 420) }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Badge tone={f.tone} size="sm">{f.sev}</Badge>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--tu-navy-600)' }}>{f.title}</span>
              </div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--tu-grey-600)', textWrap: 'pretty' }}>{f.text}</p>
              <H as="button" onClick={f.go} style={linkBtn} hover={{ color: 'var(--tu-navy-600)' }}>{f.cta}</H>
            </div>
          ))}
        </div>
      </div>

      {/* Rotación anual por sucursal */}
      <div style={{ ...card(), padding: 20, display: 'flex', flexDirection: 'column', gap: 14, transition: revealT(480), ...rv(on, 0, 0, 460) }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
          <span style={cardTitle}>Rotación anual por sucursal</span>
          <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>Referencia del proyecto: 30%</span>
        </div>
        {mobile ? (
          // Móvil: una fila por sucursal, con la barra a todo el ancho debajo del nombre.
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {STORES.map((st, i) => {
              const high = st.turnover >= 50;
              return (
                <div key={st.name} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '12px 0', borderBottom: '1px solid var(--tu-grey-100)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--tu-navy-600)' }}>{st.name}</span>
                    <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>{st.hc} personas</span>
                    <span style={{ flex: 1 }} />
                    <span style={{ fontSize: 15, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: high ? 'var(--tu-danger)' : 'var(--tu-navy-600)' }}>{Math.round(st.turnover * e)}%</span>
                  </div>
                  <div style={{ position: 'relative', height: 8, borderRadius: 999, background: 'var(--tu-grey-100)' }}>
                    <div style={{ height: '100%', borderRadius: 999, background: high ? 'var(--tu-danger)' : 'var(--tu-cyan)', width: on ? st.turnover + '%' : '0%', transition: `width 900ms ${OUT}`, transitionDelay: 500 + i * 70 + 'ms' }} />
                    <div style={{ position: 'absolute', top: -4, bottom: -4, left: '30%', width: 2, background: 'var(--tu-navy-600)', borderRadius: 1 }} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
            <div style={{ minWidth: 560, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'grid', gridTemplateColumns: STORE_COLS, gap: 16, padding: '0 0 8px', borderBottom: '1px solid var(--tu-grey-200)', ...caps }}>
                <span>Sucursal</span><span>Plantilla</span><span>Rotación</span><span style={{ textAlign: 'right' }}>%</span>
              </div>
              {STORES.map((st, i) => {
                const high = st.turnover >= 50;
                return (
                  <H key={st.name} style={{ display: 'grid', gridTemplateColumns: STORE_COLS, gap: 16, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--tu-grey-100)', fontSize: 14, transition: 'background 140ms' }} hover={{ background: 'var(--tu-grey-25)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--tu-navy-600)' }}>{st.name}</span>
                    <span style={{ fontVariantNumeric: 'tabular-nums' }}>{st.hc}</span>
                    <div style={{ position: 'relative', height: 8, borderRadius: 999, background: 'var(--tu-grey-100)' }}>
                      <div style={{ height: '100%', borderRadius: 999, background: high ? 'var(--tu-danger)' : 'var(--tu-cyan)', width: on ? st.turnover + '%' : '0%', transition: `width 900ms ${OUT}`, transitionDelay: 500 + i * 70 + 'ms' }} />
                      {/* Referencia del proyecto: 30% */}
                      <div style={{ position: 'absolute', top: -4, bottom: -4, left: '30%', width: 2, background: 'var(--tu-navy-600)', borderRadius: 1 }} />
                    </div>
                    <span style={{ textAlign: 'right', fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: high ? 'var(--tu-danger)' : 'var(--tu-navy-600)' }}>{Math.round(st.turnover * e)}%</span>
                  </H>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
