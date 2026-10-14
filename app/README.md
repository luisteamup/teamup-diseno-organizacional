# Diseño Organizacional · prototipo funcional

React 18 + TypeScript + Vite implementation of the Claude Design prototype `project/Diseño Organizacional App v3.dc.html` (TeamUp × Ahorramart Economax).

```bash
cd app
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build in dist/
```

## Modules

| Menu | View | Highlights |
| --- | --- | --- |
| Resumen | `views/Resumen.tsx` | KPIs with count-up, headcount by area, Deep Insights, turnover by store |
| Organigrama | `views/Organigrama.tsx` | Actual / Propuesta / Propuesta +AI, selectable nodes, AI-assistant savings table |
| Catálogo de puestos | `views/Puestos.tsx` + `views/RoleDrawer.tsx` | Status filters; side panel with Descripción · Tareas · KPIs · Skills |
| Skill Intelligence | `views/skills/*` | Brechas, Taxonomía (radial map), Career path, Sucesión (9-box + Tecmilenio and profile pop-ups), Empleados (radar) |
| Rendimiento vs ROI | `views/Roi.tsx` | Bubble chart by area, area mini-cards, drill-down pop-up with 90-day mini strategies |

The Ahorramart logo in the sidebar toggles between the TeamUp palette and the client's palette (`actions.toggleBrand`). `Esc` closes the drawer and pop-ups.

## Structure

```
src/
  data/        Simulated typed data + data-access layer (data/index.ts)
  lib/         Pure calculations: skill gaps, taxonomy, fit/readiness, strategies
  state/       Global store (useSyncExternalStore) + actions: navigation, animations, pop-ups
  ds/          TeamUp design-system components: Badge, Button, Icon (lucide-react), Logo, H (hover)
  components/  Layout and shared pieces (Sidebar, Header, Modal, Chips, KpiCard, styles)
  views/       One file per module
  styles/      TeamUp DS tokens (colours, type, spacing, motion) + Outfit
```

## Connecting real data

Every view reads from `src/data/index.ts`. To replace the simulated data with payroll, HRIS, job descriptions and performance reviews, change those exports while keeping the types in `data/types.ts`. Derived values (skill gaps, job fit, readiness, ROI, AI savings) are computed in `src/lib` and recalculate on their own.

Individual payroll and performance data need access control and handling that complies with the LFPDPPP before you connect them.
