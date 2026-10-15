import { Fragment } from 'react';
import { EXTRA_LADDERS, LADDERS, PROFILES, SUCCESSION, TEC } from '../../data';
import { Badge, type Tone } from '../../ds/Badge';
import { H } from '../../ds/Hover';
import { Avatar } from '../../components/Avatar';
import { CloseButton } from '../../components/CloseButton';
import { caps, cardTitle, fill, track } from '../../components/styles';
import { OUT, revealT, rv } from '../../lib/anim';
import { sum } from '../../lib/format';
import {
  DIMS, EMPS, MOVE_TONE, STATUS_TONE, TEC_BY_ID, mobilityOf, readyLabel, readyTone, type Employee,
} from '../../lib/talent';
import { useMobile } from '../../lib/useMobile';
import { useApp } from '../../state/store';
import { Radar } from './Radar';

const MONTHS = ['junio', 'julio', 'agosto', 'septiembre'];
/** Roles de sucesión sin titular: se marcan como «Vacante» en movilidad interna. */
const VACANT_ROLES = new Set(SUCCESSION.filter((r) => !r.incumbent).map((r) => r.role));

type PathState = 'current' | 'next' | 'done' | 'future';
interface PathStep { title: string; state: PathState }
interface MobilityFit { role: string; fit: number; kind: 'Promoción' | 'Reubicación' | 'Lateral'; vacant: boolean; why: string }

/** Datos del perfil (el `ep` del prototipo), independientes de la animación. */
export function profileOf(e: Employee) {
  const ex = PROFILES[e.role];
  const nx = PROFILES[e.nextRole];
  const up = e.direction === 'up';
  const above = (i: number) => e.scores[i] >= ex[i] + 8;

  // Career path: la ruta que contiene su puesto y, de preferencia, su siguiente posición.
  const cands = [...LADDERS, ...EXTRA_LADDERS].filter((L) => L.steps.includes(e.role));
  const ladder = cands.find((L) => L.steps.includes(e.nextRole)) || cands[0] || { name: 'Ruta individual', steps: [e.role, e.nextRole] };
  const steps = ladder.steps.includes(e.nextRole) ? ladder.steps : ladder.steps.concat([e.nextRole]);
  const ci = steps.indexOf(e.role);
  const path: PathStep[] = steps.map((title, j) => {
    const isNext = title === e.nextRole;
    return { title, state: j === ci ? 'current' : isNext ? 'next' : j < ci ? 'done' : 'future' };
  });

  const course = TEC_BY_ID[e.course];
  const pct = 15 + ((e.index * 37) % 60);

  const base = sum(ex);
  const mobility: MobilityFit[] = Object.keys(PROFILES)
    .filter((r) => r !== e.role)
    .map((r) => ({ r, f: mobilityOf(e.scores, PROFILES[r]) }))
    .sort((a, b) => b.f - a.f)
    .slice(0, 4)
    .map((m) => {
      const ex2 = PROFILES[m.r];
      const si = steps.indexOf(m.r);
      const lv = sum(ex2);
      const kind = si > ci ? 'Promoción' : si >= 0 && si < ci ? 'Reubicación' : lv > base + 20 ? 'Promoción' : lv < base - 20 ? 'Reubicación' : 'Lateral';
      const strong = DIMS.filter((_, i) => e.scores[i] >= ex2[i]).slice(0, 2).map((d) => d.toLowerCase());
      return { role: m.r, fit: m.f, kind, vacant: VACANT_ROLES.has(m.r), why: strong.length ? 'Afinidad por ' + strong.join(' y ') : 'Requiere desarrollo en todas las dimensiones' };
    });

  return {
    emp: e,
    roleSite: e.role + ' · ' + e.site,
    meta: e.years + (e.years === 1 ? ' año' : ' años') + ' en Ahorramart · ' + e.education + ' · Cumplimiento ' + e.perf + '%',
    up,
    nextLabel: up ? 'Posición natural de promoción' : 'Posición de mejor ajuste',
    nextC: up ? 'var(--tu-success)' : 'var(--tu-warning)',
    highlights: DIMS.filter((_, i) => above(i)),
    dims: DIMS.map((n, i) => ({
      n, v: e.scores[i], e: ex[i], x: nx[i],
      c: above(i) ? 'var(--tu-cyan-700)' : e.scores[i] < ex[i] - 8 ? 'var(--tu-danger)' : 'var(--tu-grey-700)',
    })),
    pathName: ladder.name,
    path,
    cur: { name: course.name, level: course.level, url: course.url, meta: course.format + ' · inició en ' + MONTHS[e.index % 4] + ' de 2026', pct },
    mobility,
    route: [course].concat(TEC.filter((t) => t.id !== e.course && t.roles.includes(e.nextRole))).slice(0, 4),
  };
}
export type Profile = ReturnType<typeof profileOf>;

const fitColor = (f: number) => (f >= 90 ? 'var(--tu-success)' : f >= 80 ? 'var(--tu-navy-600)' : 'var(--tu-warning)');
const KIND_TONE: Record<MobilityFit['kind'], Tone> = { 'Promoción': 'success', 'Lateral': 'info', 'Reubicación': 'warning' };
const sectionHead = { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' } as const;
const dimGrid = { display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 44px 48px 44px', gap: 8 } as const;

/** Encabezado: avatar, nombre, puesto, meta y badges (más cierre en el pop-up). */
export function ProfileHeader({ ep, onClose }: { ep: Profile; onClose?: () => void }) {
  const e = ep.emp;
  const mobile = useMobile();
  if (mobile) {
    return (
      <div style={{ padding: 16, borderBottom: '1px solid var(--tu-grey-100)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <Avatar ini={e.ini} size={48} fontSize={18} solid />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.2, color: 'var(--tu-navy-600)' }}>{e.name}</span>
          <span style={{ fontSize: 14, color: 'var(--tu-grey-600)' }}>{ep.roleSite}</span>
          <span style={{ fontSize: 12, lineHeight: 1.45, color: 'var(--tu-grey-500)' }}>{ep.meta}</span>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
            <Badge tone={STATUS_TONE[e.status]} size="sm">{e.status}</Badge>
            <Badge tone={MOVE_TONE[e.move]} size="sm">{e.move}</Badge>
          </div>
        </div>
        {onClose && <CloseButton onClick={onClose} />}
      </div>
    );
  }
  return (
    <div style={{ padding: 20, borderBottom: '1px solid var(--tu-grey-100)', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
      <Avatar ini={e.ini} size={52} fontSize={20} solid />
      <div style={{ flex: '1 1 220px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-.02em', color: 'var(--tu-navy-600)' }}>{e.name}</span>
        <span style={{ fontSize: 14, color: 'var(--tu-grey-600)' }}>{ep.roleSite}</span>
        <span style={{ fontSize: 13, color: 'var(--tu-grey-500)' }}>{ep.meta}</span>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Badge tone={STATUS_TONE[e.status]} size="sm">{e.status}</Badge>
        <Badge tone={MOVE_TONE[e.move]} size="sm">{e.move}</Badge>
      </div>
      {onClose && <CloseButton onClick={onClose} />}
    </div>
  );
}

/** Radar + leyenda, caja de siguiente posición, «Destaca en» y tabla de dimensiones. */
function Comparison({ ep, showRadar, on2 }: { ep: Profile; showRadar: boolean; on2: boolean }) {
  const e = ep.emp;
  const legendRow = { display: 'flex', alignItems: 'center', gap: 10 } as const;
  const mobile = useMobile();
  return (
    <div style={mobile ? { padding: 16, display: 'flex', flexDirection: 'column', gap: 16 } : { padding: 20, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      <div style={{ flex: mobile ? '0 0 auto' : '1 1 340px', minWidth: 0 }}>
        <div style={{ width: '100%', maxWidth: 540, margin: '0 auto', aspectRatio: '520/440' }}>{showRadar && <Radar emp={e} on={on2} />}</div>
      </div>
      <div style={{ flex: mobile ? '0 0 auto' : '1 1 260px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'var(--tu-grey-700)' }}>
          <span style={legendRow}>
            <span style={{ width: 14, height: 14, flex: '0 0 auto', borderRadius: 3, background: 'var(--tu-cyan-100)', border: '2px solid var(--tu-cyan)', boxSizing: 'border-box' }} />
            <span>{e.first} hoy</span>
          </span>
          <span style={legendRow}>
            <span style={{ width: 18, flex: '0 0 auto', borderTop: '2px solid var(--tu-navy-600)' }} />
            <span>Esperado en {e.role}</span>
          </span>
          <span style={legendRow}>
            <span style={{ width: 18, flex: '0 0 auto', borderTop: '2px dashed ' + ep.nextC }} />
            <span>{ep.nextLabel}: {e.nextRole}</span>
          </span>
        </div>
        <div style={{ border: '2px solid ' + ep.nextC, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ ...caps, color: ep.nextC }}>{ep.nextLabel}</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--tu-navy-600)' }}>{e.nextRole}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-.03em', color: 'var(--tu-navy-600)', fontVariantNumeric: 'tabular-nums' }}>{e.fitNext}%</span>
            <Badge tone={readyTone(e.fitNext)} size="sm">{readyLabel(e.fitNext)}</Badge>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={caps}>Destaca en</span>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {ep.highlights.map((n) => (
              <Badge key={n} tone="info" size="sm">{n}</Badge>
            ))}
            {ep.highlights.length === 0 && <span style={{ fontSize: 13, color: 'var(--tu-grey-500)' }}>Ninguna dimensión por arriba de lo esperado</span>}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ ...dimGrid, paddingBottom: 6, borderBottom: '1px solid var(--tu-grey-200)', ...caps }}>
            <span>Dimensión</span>
            <span style={{ textAlign: 'right' }}>Tiene</span>
            <span style={{ textAlign: 'right' }}>Puesto</span>
            <span style={{ textAlign: 'right' }}>Sig.</span>
          </div>
          {ep.dims.map((dm) => (
            <div key={dm.n} style={{ ...dimGrid, padding: '7px 0', borderBottom: '1px solid var(--tu-grey-100)', fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>
              <span style={{ color: 'var(--tu-grey-700)' }}>{dm.n}</span>
              <span style={{ textAlign: 'right', fontWeight: 700, color: dm.c }}>{dm.v}</span>
              <span style={{ textAlign: 'right', color: 'var(--tu-navy-600)' }}>{dm.e}</span>
              <span style={{ textAlign: 'right', color: ep.nextC }}>{dm.x}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Estilo de cada paso del career path según su estado. */
function pathStyle(state: PathState, up: boolean) {
  const nC = up ? 'var(--tu-success)' : 'var(--tu-warning)';
  const cur = state === 'current', nx = state === 'next', done = state === 'done';
  return {
    label: cur ? 'Puesto actual' : nx ? (up ? 'Siguiente paso' : 'Mejor ajuste') : done ? 'Recorrido' : 'Futuro',
    bg: cur ? 'var(--tu-navy-600)' : done ? 'var(--tu-grey-50)' : '#fff',
    border: cur ? '1px solid var(--tu-navy-600)' : nx ? '2px solid ' + nC : '1px solid var(--tu-grey-200)',
    capC: cur ? 'var(--tu-cyan-200)' : nx ? nC : 'var(--tu-grey-500)',
    titleC: cur ? '#fff' : done ? 'var(--tu-grey-600)' : 'var(--tu-navy-600)',
  };
}

function CareerPathNow({ ep, on2 }: { ep: Profile; on2: boolean }) {
  const ci = ep.path.findIndex((p) => p.state === 'current');
  const cur = ep.cur;
  const mobile = useMobile();
  return (
    <div style={{ padding: mobile ? 16 : 20, borderTop: '1px solid var(--tu-grey-100)', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={sectionHead}>
        <span style={cardTitle}>Career path actual</span>
        <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>Ruta: {ep.pathName}</span>
      </div>
      <div style={mobile ? undefined : { overflowX: 'auto', overflowY: 'hidden', paddingBottom: 4 }}>
        <div style={mobile ? { display: 'flex', flexDirection: 'column', alignItems: 'stretch' } : { display: 'flex', alignItems: 'center', width: 'max-content' }}>
          {ep.path.map((ps, j) => {
            const st = pathStyle(ps.state, ep.up);
            return (
              <Fragment key={j}>
                {j > 0 && <span style={{ width: mobile ? 2 : 28, height: mobile ? 12 : 2, flex: '0 0 auto', alignSelf: mobile ? 'center' : undefined, background: j <= ci ? 'var(--tu-navy-200)' : 'var(--tu-grey-200)' }} />}
                <div
                  style={{
                    width: mobile ? '100%' : 156, flex: '0 0 auto', boxSizing: 'border-box', padding: '10px 12px', borderRadius: 12, border: st.border, background: st.bg,
                    display: 'flex', flexDirection: 'column', gap: 3, transition: revealT(), ...rv(on2, j, 60, 100),
                  }}
                >
                  <span style={{ fontSize: mobile ? 11 : 10, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: st.capC }}>{st.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3, color: st.titleC }}>{ps.title}</span>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
      <H
        as="a"
        href={cur.url}
        target="_blank"
        rel="noopener"
        style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, padding: '12px 14px', border: '1px solid var(--tu-grey-200)', borderRadius: 12, background: 'var(--tu-grey-25)', textDecoration: 'none', transition: 'border-color 140ms' }}
        hover={{ borderColor: 'var(--tu-cyan-600)' }}
      >
        <div style={{ flex: '1 1 240px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={caps}>Cursando · {cur.level}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--tu-navy-600)' }}>{cur.name} ↗</span>
          <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>{cur.meta}</span>
        </div>
        <div style={{ flex: '1 1 180px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={track()}>
            <div style={fill('var(--tu-cyan)', on2 ? cur.pct + '%' : '0%', `width 900ms ${OUT} 200ms`)} />
          </div>
          <span style={{ fontSize: 12, color: 'var(--tu-grey-600)' }}>{cur.pct}% de avance</span>
        </div>
      </H>
    </div>
  );
}

function Mobility({ ep, on2 }: { ep: Profile; on2: boolean }) {
  const mobile = useMobile();
  return (
    <div style={{ padding: mobile ? 16 : 20, borderTop: '1px solid var(--tu-grey-100)', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={sectionHead}>
        <span style={cardTitle}>Movilidad interna</span>
        <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>Puestos donde sus habilidades encajan hoy</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(200px,100%),1fr))', gap: 10 }}>
        {ep.mobility.map((mb, j) => {
          const c = fitColor(mb.fit);
          const r = rv(on2, j, 60, 160);
          return (
            <div
              key={mb.role}
              style={{ border: '1px solid var(--tu-grey-200)', borderRadius: 12, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8, transition: revealT(), ...r }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3, color: 'var(--tu-navy-600)' }}>{mb.role}</span>
                <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-.02em', color: c, fontVariantNumeric: 'tabular-nums' }}>{mb.fit}%</span>
              </div>
              <div style={track()}>
                <div style={{ ...fill(c, on2 ? mb.fit + '%' : '0%', `width 800ms ${OUT}`), transitionDelay: r.transitionDelay }} />
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <Badge tone={KIND_TONE[mb.kind]} size="sm">{mb.kind}</Badge>
                {mb.vacant && <Badge tone="info" size="sm">Vacante</Badge>}
              </div>
              <span style={{ fontSize: 12, lineHeight: 1.45, color: 'var(--tu-grey-500)' }}>{mb.why}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TecRoute({ ep }: { ep: Profile }) {
  const mobile = useMobile();
  return (
    <div style={{ padding: mobile ? 16 : '16px 20px', borderTop: '1px solid var(--tu-grey-100)', background: 'var(--tu-grey-25)', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <span style={caps}>Ruta sugerida en Tecmilenio</span>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {ep.route.map((t) => (
          <H
            key={t.id}
            as="a"
            href={t.url}
            target="_blank"
            rel="noopener"
            style={{ display: 'flex', flexDirection: 'column', gap: 1, padding: '8px 12px', border: '1px solid var(--tu-grey-200)', borderRadius: 8, background: '#fff', textDecoration: 'none', transition: 'border-color 140ms', ...(mobile ? { flex: '1 1 100%', minWidth: 0, boxSizing: 'border-box' } : {}) }}
            hover={{ borderColor: 'var(--tu-cyan-600)' }}
          >
            <span style={{ fontSize: mobile ? 11 : 10, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--tu-grey-500)' }}>{t.level} · {t.type}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--tu-navy-600)' }}>{t.name} ↗</span>
          </H>
        ))}
      </div>
    </div>
  );
}

interface EmployeeProfileProps {
  /** Muestra el botón de cierre en el encabezado (pop-up de Sucesión). */
  onClose?: () => void;
  /** El radar solo se monta mientras es visible (en el pop-up: mientras está abierto). */
  showRadar?: boolean;
}

/** Perfil completo del colaborador seleccionado (`empSel`), compartido por Sucesión y Empleados. */
export function EmployeeProfile({ onClose, showRadar = true }: EmployeeProfileProps) {
  const s = useApp();
  const ep = profileOf(EMPS[s.empSel]);
  const on2 = s.entered && s.empSub;
  return (
    <>
      <ProfileHeader ep={ep} onClose={onClose} />
      <Comparison ep={ep} showRadar={showRadar} on2={on2} />
      <CareerPathNow ep={ep} on2={on2} />
      <Mobility ep={ep} on2={on2} />
      <TecRoute ep={ep} />
    </>
  );
}
