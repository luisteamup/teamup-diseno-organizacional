import { revealT, rv } from '../lib/anim';
import { card } from './styles';

interface KpiCardProps {
  value: string;
  label: string;
  note: string;
  valueColor?: string;
  noteColor?: string;
  valueSize?: number;
  on: boolean;
  index: number;
  duration?: number;
}

/** Tarjeta de cifra: número grande, etiqueta y nota bajo un divisor. */
export function KpiCard({ value, label, note, valueColor = 'var(--tu-navy-600)', noteColor = 'var(--tu-grey-500)', valueSize = 40, on, index, duration = 420 }: KpiCardProps) {
  return (
    <div style={{ ...card(), padding: 20, display: 'flex', flexDirection: 'column', gap: 4, transition: revealT(duration), ...rv(on, index, 70, 80) }}>
      <span style={{ fontSize: valueSize, fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.05, color: valueColor, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
      <span style={{ fontSize: 14, color: 'var(--tu-grey-700)' }}>{label}</span>
      <span style={{ marginTop: 8, paddingTop: 10, borderTop: '1px solid var(--tu-grey-100)', fontSize: 12, color: noteColor }}>{note}</span>
    </div>
  );
}

export const kpiGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 16 } as const;
