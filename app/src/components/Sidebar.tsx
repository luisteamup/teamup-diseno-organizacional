import { H } from '../ds/Hover';
import { Icon, type IconName } from '../ds/Icon';
import { Logo } from '../ds/Logo';
import { OUT, STD } from '../lib/anim';
import { ease } from '../lib/format';
import { actions, useApp, type View } from '../state/store';
import { caps } from './styles';

export const NAV: { id: View; label: string; icon: IconName; title: string }[] = [
  { id: 'resumen', label: 'Resumen', icon: 'layout-dashboard', title: 'Diagnóstico organizacional' },
  { id: 'org', label: 'Organigrama', icon: 'network', title: 'Organigrama' },
  { id: 'puestos', label: 'Catálogo de puestos', icon: 'briefcase', title: 'Catálogo de puestos' },
  { id: 'skills', label: 'Skill Intelligence', icon: 'brain', title: 'Skill Intelligence Layer' },
  { id: 'roi', label: 'Rendimiento vs ROI', icon: 'trending-up', title: 'Rendimiento vs ROI' },
];

export function Sidebar() {
  const s = useApp();
  const navIdx = Math.max(0, NAV.findIndex((n) => n.id === s.view));
  const phase = Math.round(50 * ease(s.p));

  return (
    <aside style={{ width: 248, flex: '0 0 auto', background: '#fff', borderRight: '1px solid var(--tu-grey-200)', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', boxSizing: 'border-box' }}>
      <div style={{ padding: '20px 20px 16px' }}>
        <Logo variant="dark" height={24} />
      </div>

      {/* Logo del cliente: alterna entre la paleta TeamUp y la de Ahorramart. */}
      <H
        as="button"
        onClick={actions.toggleBrand}
        aria-pressed={s.brand}
        title="Cambiar a la paleta de la marca"
        style={{
          margin: '0 12px 16px', padding: '10px 12px', border: '1px solid var(--tu-grey-200)', borderRadius: 12,
          background: s.brand ? 'var(--tu-navy-50)' : '#fff', boxShadow: s.brand ? '0 0 0 2px var(--tu-navy-400)' : 'none',
          fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 6,
          transition: `border-color 140ms ${STD},background 220ms ${STD},box-shadow 220ms ${STD},transform 140ms ${STD}`,
        }}
        hover={{ borderColor: 'var(--tu-grey-300)', background: 'var(--tu-grey-25)' }}
        active={{ transform: 'scale(.985)' }}
      >
        <img src="assets/ahorramart-logo.png" alt="Ahorramart Economax" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: 58, objectFit: 'contain', objectPosition: 'left center' }} />
      </H>

      <div style={{ padding: '0 12px 6px', ...caps, color: 'var(--tu-grey-400)' }}>Diseño organizacional</div>
      <nav style={{ position: 'relative', padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ position: 'absolute', left: 12, right: 12, height: 40, top: navIdx * 42, background: 'var(--tu-navy-50)', borderRadius: 8, transition: `top 260ms ${OUT}` }} />
        {NAV.map((n) => {
          const on = n.id === s.view;
          return (
            <H
              key={n.id}
              as="button"
              onClick={() => actions.go(n.id)}
              aria-current={on ? 'page' : undefined}
              style={{
                position: 'relative', display: 'flex', alignItems: 'center', gap: 10, height: 40, padding: '0 12px', border: 'none', background: 'transparent', borderRadius: 8,
                cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, textAlign: 'left',
                color: on ? 'var(--tu-navy-600)' : 'var(--tu-grey-600)', fontWeight: on ? 600 : 500, transition: `color 140ms ${STD}`,
              }}
              hover={{ color: 'var(--tu-navy-600)' }}
            >
              <Icon name={n.icon} size={18} />
              <span>{n.label}</span>
            </H>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', padding: 16 }}>
        <div style={{ border: '1px solid var(--tu-grey-200)', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--tu-navy-600)', whiteSpace: 'nowrap' }}>Fase 2 de 4</span>
            <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>{phase}%</span>
          </div>
          <span style={{ fontSize: 12, color: 'var(--tu-grey-600)', marginTop: -6 }}>Diagnóstico</span>
          <div style={{ height: 6, borderRadius: 999, background: 'var(--tu-grey-100)', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 999, background: 'var(--tu-cyan)', width: s.entered ? '50%' : '0%', transition: `width 1100ms ${OUT}` }} />
          </div>
          <span style={{ fontSize: 12, color: 'var(--tu-grey-500)', lineHeight: 1.5 }}>Entrega de propuesta: 28 nov 2026</span>
        </div>
      </div>
    </aside>
  );
}
