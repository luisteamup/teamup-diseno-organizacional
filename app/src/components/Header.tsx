import { Button } from '../ds/Button';
import { H } from '../ds/Hover';
import { Icon } from '../ds/Icon';
import { useMobile } from '../lib/useMobile';
import { actions } from '../state/store';

/** Encabezado sticky con vidrio (blur 12px): título de la vista y acciones globales. En móvil suma el botón de menú y deja las acciones solo con icono. */
export function Header({ title }: { title: string }) {
  const mobile = useMobile();
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, height: mobile ? 56 : 64, boxSizing: 'border-box', background: 'rgba(255,255,255,.86)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid var(--tu-grey-200)', padding: mobile ? '0 12px 0 8px' : '0 28px', display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12 }}>
      {mobile && (
        <H
          as="button"
          onClick={actions.openNav}
          aria-label="Abrir menú"
          style={{ width: 44, height: 44, flex: '0 0 auto', border: 'none', background: 'transparent', borderRadius: 8, color: 'var(--tu-navy-600)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 140ms' }}
          hover={{ background: 'var(--tu-grey-50)' }}
        >
          <Icon name="menu" size={22} />
        </H>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: '0 1 auto' }}>
        <span style={{ fontSize: mobile ? 16 : 18, fontWeight: 700, color: 'var(--tu-navy-600)', letterSpacing: '-.018em', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span>
      </div>
      <div style={{ flex: 1 }} />
      {mobile ? (
        <>
          <Button variant="secondary" size="sm" icon="download" onClick={actions.exportPdf} ariaLabel="Exportar" style={{ width: 40, height: 40, padding: 0 }} />
          <Button variant="ai" size="sm" icon="sparkles" onClick={actions.openProposal} ariaLabel="Ver propuesta" style={{ width: 40, height: 40, padding: 0 }} />
        </>
      ) : (
        <>
          <Button variant="secondary" size="sm" icon="download" onClick={actions.exportPdf}>Exportar</Button>
          <Button variant="ai" size="sm" icon="sparkles" onClick={actions.openProposal}>Ver propuesta</Button>
        </>
      )}
    </header>
  );
}
