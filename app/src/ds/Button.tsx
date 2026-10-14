import { useState, type CSSProperties, type MouseEventHandler, type ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

const SIZES = {
  sm: { height: 'var(--control-height-sm)', padding: '0 14px', fontSize: 'var(--fs-sm)', gap: 6, icon: 16 },
  md: { height: 'var(--control-height)', padding: '0 20px', fontSize: 'var(--fs-sm)', gap: 8, icon: 18 },
  lg: { height: 'var(--control-height-lg)', padding: '0 26px', fontSize: 'var(--fs-base)', gap: 8, icon: 20 },
};

type Variant = 'primary' | 'secondary' | 'ai' | 'cyan' | 'ghost';

const VARIANTS: Record<Variant, { base: CSSProperties; hover: CSSProperties }> = {
  primary: { base: { background: 'var(--tu-navy-600)', color: '#fff', border: '1px solid var(--tu-navy-600)' }, hover: { background: 'var(--tu-navy-700)', borderColor: 'var(--tu-navy-700)' } },
  secondary: { base: { background: '#fff', color: 'var(--tu-navy-600)', border: '1px solid var(--tu-grey-300)' }, hover: { background: 'var(--tu-grey-50)', borderColor: 'var(--tu-grey-400)' } },
  ai: { base: { background: 'var(--tu-violet-50)', color: 'var(--tu-violet-600)', border: '1px solid var(--tu-violet-200)' }, hover: { background: 'var(--tu-violet-100)', borderColor: 'var(--tu-violet-300)' } },
  cyan: { base: { background: 'var(--tu-cyan-500)', color: '#fff', border: '1px solid var(--tu-cyan-500)' }, hover: { background: 'var(--tu-cyan-600)', borderColor: 'var(--tu-cyan-600)' } },
  ghost: { base: { background: 'transparent', color: 'var(--tu-grey-600)', border: '1px solid transparent' }, hover: { background: 'var(--tu-grey-50)', color: 'var(--tu-navy-600)' } },
};

interface ButtonProps {
  children?: ReactNode;
  variant?: Variant;
  size?: keyof typeof SIZES;
  icon?: IconName;
  iconRight?: IconName;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
}

/** TeamUp DS `Button`. Hover darkens one ramp step, press scales to .985. */
export function Button({ children, variant = 'primary', size = 'md', icon, iconRight, fullWidth = false, disabled = false, onClick, style }: ButtonProps) {
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const s = SIZES[size] ?? SIZES.md;
  const v = VARIANTS[variant] ?? VARIANTS.primary;
  const css: CSSProperties = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : undefined,
    alignItems: 'center', justifyContent: 'center',
    gap: s.gap, height: s.height, padding: s.padding, fontSize: s.fontSize,
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--fw-semibold)' as CSSProperties['fontWeight'],
    letterSpacing: '-0.005em',
    borderRadius: 'var(--radius-control)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none', whiteSpace: 'nowrap',
    transition: 'var(--transition-control), transform var(--dur-instant) var(--ease-standard)',
    transform: down && !disabled ? 'scale(var(--press-scale))' : 'none',
    ...v.base,
    ...(hover && !disabled ? v.hover : null),
    ...(disabled ? { background: 'var(--tu-grey-100)', color: 'var(--tu-grey-400)', border: '1px solid var(--tu-grey-200)' } : null),
    ...style,
  };
  return (
    <button
      type="button"
      style={css}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setDown(false); }}
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
    >
      {icon ? <Icon name={icon} size={s.icon} /> : null}
      {children}
      {iconRight ? <Icon name={iconRight} size={s.icon} /> : null}
    </button>
  );
}
