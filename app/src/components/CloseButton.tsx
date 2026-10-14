import { H } from '../ds/Hover';
import { Icon } from '../ds/Icon';

/** Botón cuadrado de cierre (32px) usado en pop-ups y panel lateral. */
export function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <H
      as="button"
      onClick={onClick}
      aria-label="Cerrar"
      style={{ width: 32, height: 32, flex: '0 0 auto', borderRadius: 8, border: '1px solid var(--tu-grey-200)', background: '#fff', color: 'var(--tu-grey-600)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 140ms,background 140ms' }}
      hover={{ color: 'var(--tu-navy-600)', background: 'var(--tu-grey-50)' }}
    >
      <Icon name="x" size={16} />
    </H>
  );
}
