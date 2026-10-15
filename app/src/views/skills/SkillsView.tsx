import { useEffect, useRef } from 'react';
import { H } from '../../ds/Hover';
import { OUT } from '../../lib/anim';
import { actions, useApp, type SkillTab } from '../../state/store';
import { Brechas } from './Brechas';
import { Taxonomia } from './Taxonomia';
import { CareerPath } from './CareerPath';
import { Sucesion } from './Sucesion';
import { Empleados } from './Empleados';

/** [id, etiqueta, ancho fijo del botón en px] — el indicador se desliza con esos anchos. */
const TABS: [SkillTab, string, number][] = [['brechas', 'Brechas', 104], ['tax', 'Taxonomía', 120], ['career', 'Career path', 124], ['suc', 'Sucesión', 108], ['emp', 'Empleados', 116]];

export function SkillsView() {
  const s = useApp();
  const ti = Math.max(0, TABS.findIndex((t) => t[0] === s.skTab));
  const left = TABS.slice(0, ti).reduce((a, t) => a + t[2] + 4, 0);
  const bar = useRef<HTMLDivElement>(null);

  // En pantallas angostas la barra se desplaza: mantiene visible la pestaña activa.
  useEffect(() => {
    const el = bar.current;
    if (el && el.scrollWidth > el.clientWidth) el.scrollTo({ left: Math.max(0, left - (el.clientWidth - TABS[ti][2]) / 2), behavior: 'smooth' });
  }, [left, ti]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div ref={bar} role="tablist" style={{ position: 'relative', scrollbarWidth: 'none', display: 'flex', gap: 4, borderBottom: '1px solid var(--tu-grey-200)', overflowX: 'auto', overflowY: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: -1, height: 2, width: TABS[ti][2], left, background: 'var(--tu-navy-600)', transition: `left 260ms ${OUT},width 260ms ${OUT}` }} />
        {TABS.map(([id, label, w]) => (
          <H
            key={id}
            as="button"
            role="tab"
            aria-selected={id === s.skTab}
            onClick={() => actions.setSkTab(id)}
            style={{ width: w, whiteSpace: 'nowrap', flex: '0 0 auto', height: 44, border: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: id === s.skTab ? 'var(--tu-navy-600)' : 'var(--tu-grey-500)', transition: 'color 140ms' }}
            hover={{ color: 'var(--tu-navy-600)' }}
          >
            {label}
          </H>
        ))}
      </div>
      {s.skTab === 'brechas' && <Brechas />}
      {s.skTab === 'tax' && <Taxonomia />}
      {s.skTab === 'career' && <CareerPath />}
      {s.skTab === 'suc' && <Sucesion />}
      {s.skTab === 'emp' && <Empleados />}
    </div>
  );
}
