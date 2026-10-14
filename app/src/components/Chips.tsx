import { STD } from '../lib/anim';

interface ChipsProps {
  options: readonly string[];
  active: string;
  counts: Record<string, number>;
  onPick: (value: string) => void;
}

/** Fila de chips de filtro con contador (activo = navy relleno). */
export function Chips({ options, active, counts, onPick }: ChipsProps) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {options.map((f) => {
        const a = f === active;
        return (
          <button
            key={f}
            type="button"
            onClick={() => { if (!a) onPick(f); }}
            style={{
              whiteSpace: 'nowrap', flex: '0 0 auto', height: 32, padding: '0 14px', borderRadius: 999, fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              border: '1px solid ' + (a ? 'var(--tu-navy-600)' : 'var(--tu-grey-300)'),
              background: a ? 'var(--tu-navy-600)' : '#fff', color: a ? '#fff' : 'var(--tu-grey-700)',
              transition: `background 140ms ${STD},color 140ms,border-color 140ms`,
            }}
          >
            <span>{f}</span>
            <span style={{ fontWeight: 500, color: a ? 'var(--tu-navy-100)' : 'var(--tu-grey-400)' }}>{counts[f]}</span>
          </button>
        );
      })}
    </div>
  );
}
