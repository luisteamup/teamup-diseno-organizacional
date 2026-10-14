import type { CSSProperties } from 'react';
import {
  Bot, Brain, Briefcase, ChevronDown, ChevronRight, CircleCheck, Download, FileDown,
  GraduationCap, LayoutDashboard, Network, Sparkles, TrendingUp, X, type LucideIcon,
} from 'lucide-react';

/** Lucide icons used by the app, keyed by their kebab-case Lucide name. */
const ICONS = {
  'bot': Bot,
  'brain': Brain,
  'briefcase': Briefcase,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  'circle-check': CircleCheck,
  'download': Download,
  'file-down': FileDown,
  'graduation-cap': GraduationCap,
  'layout-dashboard': LayoutDashboard,
  'network': Network,
  'sparkles': Sparkles,
  'trending-up': TrendingUp,
  'x': X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

interface IconProps {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  color?: string;
  style?: CSSProperties;
}

/** TeamUp DS `Icon`: Lucide glyph, 2px stroke, inherits text colour. */
export function Icon({ name, size = 20, strokeWidth = 2, color = 'currentColor', style }: IconProps) {
  const Glyph = ICONS[name];
  return (
    <span
      aria-hidden="true"
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, color, flex: '0 0 auto', ...style }}
    >
      <Glyph size={size} strokeWidth={strokeWidth} />
    </span>
  );
}
