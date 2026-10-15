import { SUCCESSION, TEC, type TecProgram } from '../../data';
import { Badge } from '../../ds/Badge';
import { H } from '../../ds/Hover';
import { Chips } from '../../components/Chips';
import { CloseButton } from '../../components/CloseButton';
import { Modal } from '../../components/Modal';
import { cardTitle, tableHead } from '../../components/styles';
import { revealT, rv } from '../../lib/anim';
import { EMPS, TEC_LEVELS, tecTone } from '../../lib/talent';
import { useMobile } from '../../lib/useMobile';
import { actions, useApp } from '../../state/store';

const COLS = 'minmax(240px,1.8fr) 124px minmax(170px,1.2fr) 108px minmax(220px,1.8fr) 76px';
const SUCC_ROLES = new Set(SUCCESSION.map((r) => r.role));
/** Programas ligados a alguna posición del plan de sucesión. */
const TEC_SUCC = TEC.filter((t) => t.roles.some((r) => SUCC_ROLES.has(r)));

interface Row { program: TecProgram; roles: string; count: number }

/** Career: todos los programas; elegibles = colaboradores cuyo puesto actual o siguiente aplica. */
const careerRow = (t: TecProgram): Row => ({
  program: t,
  roles: t.roles.join(' · '),
  count: t.roles[0] === 'Todos los puestos' ? EMPS.length : EMPS.filter((x) => t.roles.includes(x.role) || t.roles.includes(x.nextRole)).length,
});

/** Sucesión: solo puestos de sucesión; cuenta sucesores únicos de esas posiciones. */
const succRow = (t: TecProgram): Row => {
  const names = new Set<string>();
  SUCCESSION.forEach((r) => { if (t.roles.includes(r.role)) r.successors.forEach((n) => names.add(n)); });
  return { program: t, roles: t.roles.filter((r) => SUCC_ROLES.has(r)).join(' · '), count: names.size };
};

const VARIANTS = {
  career: { list: TEC, row: careerRow, title: 'Oferta Tecmilenio aplicable', note: ' programas ligados a los puestos actuales', countCol: 'Elegibles' },
  suc: { list: TEC_SUCC, row: succRow, title: 'Oferta Tecmilenio para preparar sucesores', note: ' programas ligados a las posiciones clave', countCol: 'Sucesores' },
};

/** Pop-up «Oferta académica»: catálogo Tecmilenio filtrable por nivel. */
export function TecPopup({ variant }: { variant: keyof typeof VARIANTS }) {
  const s = useApp();
  const V = VARIANTS[variant];
  const on = s.entered && s.tecSub;
  const counts = Object.fromEntries(TEC_LEVELS.map((l) => [l, l === 'Todas' ? V.list.length : V.list.filter((t) => t.level === l).length]));
  const rows = V.list.filter((t) => s.tecLvl === 'Todas' || t.level === s.tecLvl).map(V.row);
  const mobile = useMobile();

  return (
    <Modal open={s.tecPop} onClose={actions.closeTec} maxWidth={1180} label={V.title}>
      <div style={{ padding: mobile ? 16 : '16px 20px', borderBottom: '1px solid var(--tu-grey-100)', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {mobile ? (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={cardTitle}>{V.title}</span>
              <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>{V.list.length}{V.note}</span>
            </div>
            <CloseButton onClick={actions.closeTec} />
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={cardTitle}>{V.title}</span>
            <span style={{ flex: 1 }} />
            <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>{V.list.length}{V.note}</span>
            <CloseButton onClick={actions.closeTec} />
          </div>
        )}
        <Chips options={TEC_LEVELS} active={s.tecLvl} counts={counts} onPick={actions.setTecLvl} />
      </div>
      {mobile ? (
        <div>
          {rows.map(({ program: t, roles, count }, i) => (
            <div
              key={t.id}
              style={{ padding: '14px 16px', borderBottom: '1px solid var(--tu-grey-100)', display: 'flex', flexDirection: 'column', gap: 6, transition: revealT(), ...rv(on, i, 30, 0) }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <H
                  as="a"
                  href={t.url}
                  target="_blank"
                  rel="noopener"
                  style={{ flex: 1, minWidth: 0, fontSize: 14, fontWeight: 600, lineHeight: 1.35, color: 'var(--tu-navy-600)', textDecoration: 'none', transition: 'color 140ms' }}
                  hover={{ color: 'var(--tu-cyan-600)' }}
                >
                  {t.name} ↗
                </H>
                <span style={{ flex: '0 0 auto', display: 'flex' }}><Badge tone={tecTone(t)} size="sm">{t.type}</Badge></span>
              </div>
              <span style={{ fontSize: 13, color: 'var(--tu-grey-600)' }}>{t.level} · {t.format}</span>
              <span style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--tu-grey-600)' }}>{roles}</span>
              <span style={{ fontSize: 12, color: 'var(--tu-grey-500)' }}>
                {V.countCol}: <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--tu-navy-600)', fontVariantNumeric: 'tabular-nums' }}>{count}</span>
              </span>
            </div>
          ))}
        </div>
      ) : (
      <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
        <div style={{ minWidth: 1000 }}>
          <div style={tableHead(COLS)}>
            <span>Programa</span><span>Nivel</span><span>Formato</span><span>Tipo</span><span>Puestos que aplica</span><span>{V.countCol}</span>
          </div>
          {rows.map(({ program: t, roles, count }, i) => (
            <div
              key={t.id}
              style={{
                display: 'grid', gridTemplateColumns: COLS, gap: 16, alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid var(--tu-grey-100)', fontSize: 14,
                transition: revealT(), ...rv(on, i, 30, 0),
              }}
            >
              <H
                as="a"
                href={t.url}
                target="_blank"
                rel="noopener"
                style={{ fontWeight: 600, color: 'var(--tu-navy-600)', textDecoration: 'none', transition: 'color 140ms' }}
                hover={{ color: 'var(--tu-cyan-600)' }}
              >
                {t.name} ↗
              </H>
              <span style={{ color: 'var(--tu-grey-700)' }}>{t.level}</span>
              <span style={{ fontSize: 13, color: 'var(--tu-grey-600)' }}>{t.format}</span>
              <span style={{ display: 'flex' }}><Badge tone={tecTone(t)} size="sm">{t.type}</Badge></span>
              <span style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--tu-grey-600)' }}>{roles}</span>
              <span style={{ fontWeight: 700, color: 'var(--tu-navy-600)', fontVariantNumeric: 'tabular-nums' }}>{count}</span>
            </div>
          ))}
        </div>
      </div>
      )}
      <div style={{ padding: mobile ? '12px 16px' : '12px 20px', fontSize: 12, lineHeight: 1.5, color: 'var(--tu-grey-500)' }}>
        Catálogo tomado de tecmilenio.mx y skillingcenter.com (octubre 2026). Modalidad y campus por confirmar con Tecmilenio; Skilling Center es en línea.
      </div>
    </Modal>
  );
}
