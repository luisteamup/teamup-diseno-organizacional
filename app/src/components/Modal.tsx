import type { ReactNode } from 'react';
import { OUT, STD } from '../lib/anim';
import { useMobile } from '../lib/useMobile';

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
  // En móvil se comporta como hoja inferior: ocupa el ancho y sube desde abajo.
  const mobile = useMobile();
  return (
    <>
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 45, background: 'rgba(0,0,60,.32)', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: `opacity 240ms ${STD}` }}
      />
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 46, display: 'flex', alignItems: mobile ? 'flex-end' : 'center', justifyContent: 'center', padding: mobile ? '12px 0 0' : '32px 24px', boxSizing: 'border-box', pointerEvents: 'none', visibility: open ? 'visible' : 'hidden', transition: `visibility 0s linear ${open ? '0s' : '340ms'}` }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          style={{
            pointerEvents: 'auto', width: '100%', maxWidth, maxHeight: mobile ? '92dvh' : '100%', overflowY: 'auto', overscrollBehavior: 'contain', background: '#fff', border: '1px solid var(--tu-grey-200)', borderRadius: mobile ? '16px 16px 0 0' : 16, boxShadow: 'var(--shadow-xl)',
            opacity: open ? 1 : 0, transform: open ? 'none' : mobile ? 'translateY(40px)' : 'translateY(16px) scale(.98)', transition: `opacity 260ms ${OUT},transform 340ms ${OUT}`,
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
