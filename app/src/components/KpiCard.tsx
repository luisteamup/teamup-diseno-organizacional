import type { ReactNode } from 'react';
import { revealT, rv } from '../lib/anim';
import { useMobile } from '../lib/useMobile';
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
  const mobile = useMobile();
  return (
    <div style={{ ...card(), padding: mobile ? 14 : 20, minWidth: mobile ? 0 : undefined, display: 'flex', flexDirection: 'column', gap: 4, transition: revealT(duration), ...rv(on, index, 70, 80) }}>
      <span style={{ fontSize: mobile ? Math.round(valueSize * 0.68) : valueSize, fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.05, color: valueColor, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
      <span style={{ fontSize: mobile ? 13 : 14, lineHeight: mobile ? 1.3 : undefined, color: 'var(--tu-grey-700)' }}>{label}</span>
      <span style={{ marginTop: mobile ? 6 : 8, paddingTop: mobile ? 8 : 10, borderTop: '1px solid var(--tu-grey-100)', fontSize: mobile ? 11 : 12, lineHeight: mobile ? 1.4 : undefined, color: noteColor }}>{note}</span>
    </div>
  );
}

/** Rejilla de tarjetas de cifra: se acomoda sola en escritorio; dos columnas en móvil. */
export function KpiGrid({ children }: { children: ReactNode }) {
  const mobile = useMobile();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2,minmax(0,1fr))' : 'repeat(auto-fit,minmax(min(210px,100%),1fr))', gap: mobile ? 10 : 16 }}>
      {children}
    </div>
  );
}
