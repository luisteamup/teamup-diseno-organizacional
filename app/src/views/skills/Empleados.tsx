import { DEPTS } from '../../data';
import { Avatar } from '../../components/Avatar';
import { Chips } from '../../components/Chips';
import { card, h2, lead } from '../../components/styles';
import { revealT, rv } from '../../lib/anim';
import { EMPS } from '../../lib/talent';
import { actions, useApp } from '../../state/store';
import { EmployeeProfile } from './EmployeeProfile';

const DEPT_CHIPS = ['Todas', ...DEPTS.map((d) => d.short)];
const deptId = (short: string) => DEPTS.find((d) => d.short === short)?.id;
const inDept = (label: string) => (x: { dept: string }) => label === 'Todas' || x.dept === deptId(label);
const COUNTS = Object.fromEntries(DEPT_CHIPS.map((l) => [l, EMPS.filter(inDept(l)).length]));
const fitColor = (f: number) => (f >= 90 ? 'var(--tu-success)' : f >= 80 ? 'var(--tu-navy-600)' : 'var(--tu-warning)');

/** Pestaña Empleados: lista filtrable por área y perfil del colaborador seleccionado. */
export function Empleados() {
  const s = useApp();
  const on = s.entered;
  const rows = EMPS.filter(inDept(s.empDept));
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, transition: revealT(), ...rv(on) }}>
        <h2 style={h2}>Perfil de colaboradores</h2>
        <p style={lead()}>Compara a cada persona contra lo que pide su puesto y contra su posición natural de promoción o de mejor ajuste.</p>
      </div>
      <Chips options={DEPT_CHIPS} active={s.empDept} counts={COUNTS} onPick={(l) => actions.setEmpDept(l, DEPTS)} />
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', maxWidth: 380, minWidth: 0, ...card(16), overflow: 'hidden', transition: revealT(), ...rv(on, 0, 0, 100) }}>
          {rows.map((x, i) => (
            <button
              key={x.index}
              type="button"
              onClick={() => actions.pickEmp(x.index)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', border: 'none', borderBottom: '1px solid var(--tu-grey-100)',
                background: x.index === s.empSel ? 'var(--tu-navy-50)' : '#fff', fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer',
                transition: `${revealT()},background 140ms`, ...rv(on, i, 30, 120),
              }}
            >
              <Avatar ini={x.ini} />
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--tu-navy-600)' }}>{x.name}</span>
                <span style={{ fontSize: 12, color: 'var(--tu-grey-500)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{x.role} · {x.site}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: fitColor(x.fitCurrent), fontVariantNumeric: 'tabular-nums' }}>{x.fitCurrent}%</span>
                <span style={{ fontSize: 11, color: 'var(--tu-grey-500)' }}>ajuste</span>
              </div>
            </button>
          ))}
        </div>
        <div style={{ flex: '1 1 560px', minWidth: 0, ...card(16), overflow: 'hidden', transition: revealT(), ...rv(on, 0, 0, 180) }}>
          <EmployeeProfile />
        </div>
      </div>
    </>
  );
}
