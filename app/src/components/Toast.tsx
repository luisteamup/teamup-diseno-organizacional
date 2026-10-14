import { Icon } from '../ds/Icon';
import { OUT } from '../lib/anim';
import { useApp } from '../state/store';

export function Toast() {
  const { toast } = useApp();
  return (
    <div
      role="status"
      style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 50, background: 'var(--tu-navy-600)', color: '#fff', borderRadius: 12, boxShadow: 'var(--shadow-lg)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, pointerEvents: 'none', opacity: toast ? 1 : 0, transform: toast ? 'none' : 'translateY(12px)', transition: `opacity 220ms ${OUT},transform 220ms ${OUT}` }}
    >
      <Icon name="file-down" size={18} />
      <span>Preparando el PDF del diagnóstico…</span>
    </div>
  );
}
