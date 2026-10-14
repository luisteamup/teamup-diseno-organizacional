import { Button } from '../ds/Button';
import { actions } from '../state/store';

/** Encabezado sticky con vidrio (blur 12px): título de la vista y acciones globales. */
export function Header({ title }: { title: string }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, height: 64, boxSizing: 'border-box', background: 'rgba(255,255,255,.86)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid var(--tu-grey-200)', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: '0 1 auto' }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--tu-navy-600)', letterSpacing: '-.018em', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span>
      </div>
      <div style={{ flex: 1 }} />
      <Button variant="secondary" size="sm" icon="download" onClick={actions.exportPdf}>Exportar</Button>
      <Button variant="ai" size="sm" icon="sparkles" onClick={actions.openProposal}>Ver propuesta</Button>
    </header>
  );
}
