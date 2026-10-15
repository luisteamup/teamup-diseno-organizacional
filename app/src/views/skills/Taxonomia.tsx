import { useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import { Badge, type Tone } from '../../ds/Badge';
import { OUT, STD, revealT, rv } from '../../lib/anim';
import { fmt } from '../../lib/format';
import { useMobile } from '../../lib/useMobile';
import {
  CX, CY, DEMAND_COLOR, DEMAND_LABEL, DEMAND_TONE, P, R0, RE, RF, TAX_FAMS, TAX_LINES, angleDiff, pt,
} from '../../lib/taxonomy';
import { useApp } from '../../state/store';
import { caps, card, h2, lead } from '../../components/styles';

interface Tip { name: string; dem: string; tone: Tone; meta: string; a: string; aL: string; b: string; bL: string }
const EMPTY_TIP: Tip = { name: '', dem: '', tone: 'neutral', meta: '', a: '', aL: '', b: '', bL: '' };

/** Detecta la familia (tramo centro → familia) o la habilidad (abanico) bajo el cursor. */
function hitTest(e: MouseEvent<SVGSVGElement>): { line: number | null; fam: number | null } {
  const b = e.currentTarget.getBoundingClientRect();
  if (!b.width) return { line: null, fam: null };
  const x = ((e.clientX - b.left) / b.width) * 1000;
  const y = ((e.clientY - b.top) / b.height) * 900;
  const rad = Math.hypot(x - CX, y - CY);
  const ang = (Math.atan2(y - CY, x - CX) * 180) / Math.PI;
  let line: number | null = null;
  let fam: number | null = null;
  if (rad > R0 && rad <= RF + 14) {
    let best = 99;
    TAX_FAMS.forEach((F, i) => { const d = Math.abs(angleDiff(ang, F.angle)); if (d < best) { best = d; fam = i; } });
    if (best > 12) fam = null;
  } else if (rad > RF + 14 && rad <= RE + 24) {
    // Las líneas son curvas: interpola el ángulo esperado a este radio (smoothstep).
    const t = Math.min(1, Math.max(0, (rad - RF) / (RE - RF)));
    const t2 = t * t * (3 - 2 * t);
    let best = 99;
    TAX_LINES.forEach((l, i) => {
      const la = TAX_FAMS[l.family].angle + (l.endAngle - TAX_FAMS[l.family].angle) * t2;
      const d = Math.abs(angleDiff(ang, la));
      if (d < best) { best = d; line = i; }
    });
    if (best > 3.5) line = null;
    else fam = TAX_LINES[line!].family;
  }
  return { line, fam };
}

export function Taxonomia() {
  const s = useApp();
  const mobile = useMobile();
  const on = s.entered;
  const [hov, setHov] = useState<{ line: number | null; fam: number | null }>({ line: null, fam: null });
  const lastTip = useRef<Tip>(EMPTY_TIP);

  // Eventos de puntero: con mouse se comportan como hover (move/leave); con el dedo,
  // tocar selecciona la habilidad o familia y tocar el espacio vacío la limpia.
  const apply = (e: PointerEvent<SVGSVGElement>) => {
    const h = hitTest(e);
    if (h.line !== hov.line || h.fam !== hov.fam) setHov(h);
  };
  const onMove = (e: PointerEvent<SVGSVGElement>) => { if (e.pointerType === 'mouse') apply(e); };
  const onDown = (e: PointerEvent<SVGSVGElement>) => apply(e);
  const onLeave = (e: PointerEvent<SVGSVGElement>) => {
    if (e.pointerType !== 'mouse') return;
    if (hov.line !== null || hov.fam !== null) setHov({ line: null, fam: null });
  };

  // La ficha conserva su último contenido mientras se desvanece.
  let tip: Tip | null = null;
  if (hov.line !== null) {
    const l = TAX_LINES[hov.line];
    const F = TAX_FAMS[l.family];
    tip = { name: l.name, dem: DEMAND_LABEL[l.demand], tone: DEMAND_TONE[l.demand], meta: F.name + ' · ' + F.type, a: String(l.candidates), aL: 'candidatos', b: '$' + fmt(l.salary), bL: 'salario prom.' };
  } else if (hov.fam !== null) {
    const F = TAX_FAMS[hov.fam];
    tip = { name: F.name, dem: F.skills.length + ' skills', tone: 'neutral', meta: 'Familia · ' + F.type, a: String(F.high), aL: 'más demandadas', b: '$' + fmt(F.avgSalary), bL: 'salario prom.' };
  }
  if (tip) lastTip.current = tip;
  const t = lastTip.current;

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, transition: revealT(420), ...rv(on) }}>
        <h2 style={h2}>Mapa de habilidades · Personal operativo</h2>
        <p style={lead(760)}>{TAX_LINES.length} competencias en 12 familias de retail y operación. {mobile ? 'Toca una habilidad del abanico para ver su detalle.' : 'Pasa el cursor sobre una habilidad del abanico para ver su detalle.'}</p>
      </div>
      <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', ...card(16), transition: revealT(420), ...rv(on, 0, 0, 120) }}>
        {mobile ? (
          <div style={{ flex: '1 1 100%', padding: '14px 16px 0', display: 'flex', flexWrap: 'wrap', gap: '8px 14px', fontSize: 13, color: 'var(--tu-grey-700)' }}>
            {(['alta', 'media', 'baja'] as const).map((d) => (
              <span key={d} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: 3, background: DEMAND_COLOR[d] }} />
                {DEMAND_LABEL[d]}
              </span>
            ))}
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 999, background: 'var(--tu-navy-600)' }} />Hard skills</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 999, background: 'var(--tu-cyan-600)' }} />Soft skills</span>
          </div>
        ) : (
          <div style={{ flex: '0 0 204px', padding: 20, display: 'flex', flexDirection: 'column', gap: 22, boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={caps}>Demanda</span>
              {(['alta', 'media', 'baja'] as const).map((d) => (
                <span key={d} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--tu-grey-700)' }}>
                  <span style={{ width: 14, height: 14, borderRadius: 3, background: DEMAND_COLOR[d] }} />
                  {DEMAND_LABEL[d]}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={caps}>Tipo de familia</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--tu-grey-700)' }}><span style={{ width: 12, height: 12, borderRadius: 999, background: 'var(--tu-navy-600)' }} />Hard skills</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--tu-grey-700)' }}><span style={{ width: 12, height: 12, borderRadius: 999, background: 'var(--tu-cyan-600)' }} />Soft skills</span>
            </div>
          </div>
        )}
        <div style={{ flex: '1 1 520px', minWidth: 0, padding: mobile ? '4px 2px 8px' : '12px 16px 20px', display: 'flex', justifyContent: 'center', boxSizing: 'border-box' }}>
          <div style={{ width: '100%', maxWidth: 780, aspectRatio: '1000/900' }}>
            <TaxonomySvg on={on} line={hov.line} fam={hov.fam} onMove={onMove} onDown={onDown} onLeave={onLeave} big={mobile} />
          </div>
        </div>
        <div
          aria-live="polite"
          style={mobile
            ? { flex: '1 1 100%', margin: '0 12px 12px', boxSizing: 'border-box', background: tip ? '#fff' : 'var(--tu-grey-50)', border: '1px solid var(--tu-grey-200)', borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12, transition: `background 180ms ${OUT}` }
            : { position: 'absolute', top: 20, right: 20, width: 280, maxWidth: 'calc(100% - 40px)', boxSizing: 'border-box', background: '#fff', border: '1px solid var(--tu-grey-200)', borderRadius: 16, boxShadow: 'var(--shadow-lg)', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12, pointerEvents: 'none', opacity: tip ? 1 : 0, transform: tip ? 'none' : 'translateY(8px)', transition: `opacity 180ms ${OUT},transform 180ms ${OUT}` }}
        >
          {mobile && !tip ? (
            <span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--tu-grey-500)' }}>Toca una habilidad o familia del abanico para ver su detalle.</span>
          ) : (<>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <span style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.25, letterSpacing: '-.015em', color: 'var(--tu-navy-600)' }}>{t.name}</span>
            <span style={{ display: 'flex', flex: '0 0 auto' }}><Badge tone={t.tone} size="sm">{t.dem}</Badge></span>
          </div>
          <span style={{ fontSize: 13, color: 'var(--tu-grey-500)', marginTop: -6 }}>{t.meta}</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, borderTop: '1px solid var(--tu-grey-100)', paddingTop: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--tu-navy-600)', fontVariantNumeric: 'tabular-nums' }}>{t.a}</span>
              <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>{t.aL}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--tu-navy-600)', fontVariantNumeric: 'tabular-nums' }}>{t.b}</span>
              <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>{t.bL}</span>
            </div>
          </div>
          </>)}
        </div>
      </div>
    </>
  );
}

interface SvgProps {
  on: boolean;
  line: number | null;
  fam: number | null;
  onMove: (e: PointerEvent<SVGSVGElement>) => void;
  onDown: (e: PointerEvent<SVGSVGElement>) => void;
  onLeave: (e: PointerEvent<SVGSVGElement>) => void;
  /** Textos más grandes para pantallas de teléfono (el SVG se reduce a ~390px). */
  big?: boolean;
}

const FS_MOBILE = 1.5;

/** Mapa radial: centro "Retail", 12 rayos de familia y abanicos de habilidades que se dibujan al entrar. */
function TaxonomySvg({ on, line, fam, onMove, onDown, onLeave, big }: SvgProps) {
  const any = line !== null || fam !== null;
  const font = 'Outfit, sans-serif';
  const k = big ? FS_MOBILE : 1;
  return (
    <svg viewBox="0 0 1000 900" onPointerMove={onMove} onPointerDown={onDown} onPointerLeave={onLeave} role="img" aria-label="Mapa radial de habilidades" style={{ display: 'block', width: '100%', height: '100%', overflow: 'visible', cursor: 'crosshair' }}>
      {TAX_LINES.map((l, i) => (
        <path
          key={'l' + i}
          d={l.d}
          pathLength={1}
          style={{ fill: 'none', stroke: DEMAND_COLOR[l.demand], strokeWidth: 1.1, opacity: any ? (i === line ? 1 : l.family === fam ? 0.8 : 0.12) : 0.5, strokeDasharray: 1, strokeDashoffset: on ? 0 : 1, transition: `stroke-dashoffset 900ms ${OUT} ${l.delay}ms, opacity 160ms ${STD}` }}
        />
      ))}
      {line !== null && <path d={TAX_LINES[line].d} style={{ fill: 'none', stroke: 'var(--tu-cyan-600)', strokeWidth: 2.6, strokeLinecap: 'round' }} />}
      {TAX_FAMS.map((F, i) => {
        const lbl = F.name === 'Inteligencia emocional' ? 'Intel. emocional' : F.name;
        const a = pt(R0 + 2, F.angle);
        const b = pt(RF, F.angle);
        const m = pt((R0 + RF) / 2 + 6, F.angle);
        // Voltea las etiquetas del lado izquierdo para que no queden de cabeza.
        const rot = Math.cos((F.angle * Math.PI) / 180) < -0.01 ? F.angle + 180 : F.angle;
        const dim = any && fam !== i;
        return (
          <g key={'f' + i}>
            <path d={'M' + P(a) + ' L' + P(b)} pathLength={1} style={{ fill: 'none', stroke: 'var(--tu-cyan-200)', strokeWidth: 2, strokeDasharray: 1, strokeDashoffset: on ? 0 : 1, transition: `stroke-dashoffset 600ms ${OUT} ${120 + i * 40}ms` }} />
            <circle cx={b[0]} cy={b[1]} r={fam === i ? 9 : 7} style={{ fill: F.color, transform: on ? 'scale(1)' : 'scale(0)', transformOrigin: b[0].toFixed(1) + 'px ' + b[1].toFixed(1) + 'px', transition: `transform 420ms ${OUT} ${260 + i * 45}ms, r 160ms` }} />
            <text
              x={0} y={0} dy={-8} textAnchor="middle"
              transform={'translate(' + P(m).replace(' ', ',') + ') rotate(' + rot.toFixed(1) + ')'}
              style={{ fontFamily: font, fontSize: (lbl.length > 14 ? 12 : 13) * (big && lbl.length > 12 ? 1.35 : k), fontWeight: 700, letterSpacing: lbl.length > 14 ? '.03em' : '.06em', fill: F.color, opacity: on ? (dim ? 0.35 : 1) : 0, transition: `opacity 400ms ${STD} ${on && !any ? 300 + i * 45 : 0}ms` }}
            >
              {lbl.toUpperCase()}
            </text>
          </g>
        );
      })}
      <circle cx={CX} cy={CY} r={R0} style={{ fill: 'var(--tu-navy-600)', transform: on ? 'scale(1)' : 'scale(.6)', opacity: on ? 1 : 0, transformOrigin: CX + 'px ' + CY + 'px', transition: `transform 520ms ${OUT}, opacity 320ms` }} />
      <text x={CX} y={CY + 2} textAnchor="middle" style={{ fontFamily: font, fontSize: 24 * (big ? 1.25 : 1), fontWeight: 700, fill: '#fff', letterSpacing: '-.02em', opacity: on ? 1 : 0, transition: 'opacity 400ms 200ms' }}>Retail</text>
      <text x={CX} y={CY + 24} textAnchor="middle" style={{ fontFamily: font, fontSize: 11 * (big ? 1.4 : 1), fontWeight: 600, fill: 'var(--tu-navy-100)', letterSpacing: '.1em', opacity: on ? 1 : 0, transition: 'opacity 400ms 260ms' }}>{TAX_LINES.length + ' SKILLS'}</text>
    </svg>
  );
}
