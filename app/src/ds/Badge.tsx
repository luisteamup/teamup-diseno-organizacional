import type { CSSProperties, ReactNode } from 'react';

export type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'ai' | 'brand';

const TONES: Record<Tone, { background: string; color: string; border: string }> = {
  neutral: { background: 'var(--tu-grey-100)', color: 'var(--tu-grey-600)', border: 'var(--tu-grey-200)' },
  info: { background: 'var(--tu-info-bg)', color: 'var(--tu-cyan-700)', border: 'var(--tu-info-border)' },
  success: { background: 'var(--tu-success-bg)', color: 'var(--tu-success)', border: 'var(--tu-success-border)' },
  warning: { background: 'var(--tu-warning-bg)', color: 'var(--tu-warning)', border: 'var(--tu-warning-border)' },
  danger: { background: 'var(--tu-danger-bg)', color: 'var(--tu-danger)', border: 'var(--tu-danger-border)' },
  ai: { background: 'var(--tu-violet-50)', color: 'var(--tu-violet-600)', border: 'var(--tu-violet-200)' },
  brand: { background: 'var(--tu-navy-600)', color: '#fff', border: 'var(--tu-navy-600)' },
};

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  size?: 'sm' | 'md';
  uppercase?: boolean;
  bordered?: boolean;
  style?: CSSProperties;
}

/** TeamUp DS `Badge`: fully rounded status pill. */
export function Badge({ children, tone = 'neutral', size = 'md', uppercase = false, bordered = true, style }: BadgeProps) {
  const t = TONES[tone] ?? TONES.neutral;
  const sm = size === 'sm';
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: sm ? '2px 8px' : '3px 11px',
        fontSize: sm ? 'var(--fs-3xs)' : 'var(--fs-xs)',
        fontWeight: 'var(--fw-semibold)' as CSSProperties['fontWeight'],
        letterSpacing: uppercase ? 'var(--ls-caps)' : '0',
        textTransform: uppercase ? 'uppercase' : 'none',
        lineHeight: 1.5, whiteSpace: 'nowrap', borderRadius: 'var(--radius-pill)',
        background: t.background, color: t.color,
        border: bordered ? '1px solid ' + t.border : '1px solid transparent',
        ...style,
      }}
    >
      {children}
    </span>
  );
}
