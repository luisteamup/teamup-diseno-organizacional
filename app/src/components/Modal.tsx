import type { ReactNode } from 'react';
import { OUT, STD } from '../lib/anim';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  maxWidth: number;
  children: ReactNode;
  label: string;
}

/**
 * Pop-up centrado con velo navy. Se mantiene montado para animar la salida:
 * fade + 16px / .98 de escala; la visibilidad se apaga al terminar (340ms).
 */
export function Modal({ open, onClose, maxWidth, children, label }: ModalProps) {
  return (
    <>
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 45, background: 'rgba(0,0,60,.32)', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: `opacity 240ms ${STD}` }}
      />
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', boxSizing: 'border-box', pointerEvents: 'none', visibility: open ? 'visible' : 'hidden', transition: `visibility 0s linear ${open ? '0s' : '340ms'}` }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          style={{
            pointerEvents: 'auto', width: '100%', maxWidth, maxHeight: '100%', overflowY: 'auto', background: '#fff', border: '1px solid var(--tu-grey-200)', borderRadius: 16, boxShadow: 'var(--shadow-xl)',
            opacity: open ? 1 : 0, transform: open ? 'none' : 'translateY(16px) scale(.98)', transition: `opacity 260ms ${OUT},transform 340ms ${OUT}`,
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
