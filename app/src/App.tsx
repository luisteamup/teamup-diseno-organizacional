import { useEffect } from 'react';
import { actions, useApp } from './state/store';
import { Sidebar, NAV } from './components/Sidebar';
import { Header } from './components/Header';
import { Toast } from './components/Toast';
import { RoleDrawer } from './views/RoleDrawer';
import { Resumen } from './views/Resumen';
import { Organigrama } from './views/Organigrama';
import { Puestos } from './views/Puestos';
import { SkillsView } from './views/skills/SkillsView';
import { Roi } from './views/Roi';
import { useMobile } from './lib/useMobile';

export function App() {
  const s = useApp();
  const mobile = useMobile();

  useEffect(() => {
    actions.start();
    window.addEventListener('keydown', actions.onKey);
    return () => {
      window.removeEventListener('keydown', actions.onKey);
      actions.dispose();
    };
  }, []);

  const title = (NAV.find((n) => n.id === s.view) ?? NAV[0]).title;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', overflowX: 'clip', background: 'var(--tu-grey-50)', fontFamily: "'Outfit',sans-serif", color: 'var(--tu-grey-700)' }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Header title={title} />
        <main style={{ flex: 1, padding: mobile ? '16px 16px 32px' : 28, boxSizing: 'border-box', width: '100%', maxWidth: 1280 }}>
          {s.view === 'resumen' && <Resumen />}
          {s.view === 'org' && <Organigrama />}
          {s.view === 'puestos' && <Puestos />}
          {s.view === 'skills' && <SkillsView />}
          {s.view === 'roi' && <Roi />}
        </main>
      </div>
      <RoleDrawer />
      <Toast />
    </div>
  );
}
