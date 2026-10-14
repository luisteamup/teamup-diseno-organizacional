// Datos simulados del diagnóstico de Ahorramart Economax (corte: septiembre 2026).
// Reemplazar por la fuente real (nómina / HRIS) en src/data/index.ts.
import type { CareerLadder, Department, EmployeeSource, NineBoxCell, ProfileVector, SuccessionPlan } from './types';

/** Perfil esperado por puesto en las 5 dimensiones (ver DIMS en lib/talent.ts), escala 0–100. */
export const PROFILES: Record<string, ProfileVector> = {
  "Auxiliar de piso de venta": [45,50,30,60,30],
  "Cajero(a)": [55,55,30,60,30],
  "Carnicero(a)": [70,50,50,55,25],
  "Panadero(a)": [70,50,50,55,25],
  "Supervisor(a) de turno": [60,65,55,65,45],
  "Jefe(a) de piso": [65,70,65,70,50],
  "Jefe(a) de cajas": [65,70,60,70,50],
  "Jefe(a) de perecederos": [75,70,65,70,50],
  "Gerente de sucursal": [70,80,75,75,70],
  "Gerente de zona": [75,85,85,80,80],
  "Dirección de operaciones": [80,88,88,82,85],
  "Surtidor(a)": [50,50,35,60,30],
  "Auxiliar de recibo": [55,50,35,60,35],
  "Control de calidad CEDIS": [65,60,50,65,45],
  "Supervisor(a) de CEDIS": [65,70,60,70,50],
  "Jefatura de almacén y CEDIS": [75,75,75,75,65],
  "Técnico(a) de refrigeración": [80,55,55,60,45],
  "Jefatura de mantenimiento": [80,70,70,70,60],
  "Gerencia de administración y finanzas": [80,80,75,75,85],
  "Dirección de administración y finanzas": [85,85,80,78,88],
  "Analista de nómina": [75,60,50,65,65],
  "Coordinación de nómina y compensaciones": [78,68,55,68,70],
  "Auxiliar contable": [65,55,40,65,60],
  "Analista de datos": [80,65,50,65,75],
  "Jefatura de compras": [75,75,75,70,70],
  "Comprador(a) jr.": [65,60,50,65,60],
  "Jefatura de recursos humanos": [70,80,65,75,75],
  "Dirección de capital humano": [75,85,75,80,85],
  "Reclutador(a)": [60,70,50,70,60],
  "Instructor(a) de capacitación": [60,75,55,75,60],
  "Coordinación de sistemas": [85,70,55,70,75],
  "Coordinación de IA y datos": [88,75,55,75,82],
  "Soporte técnico": [70,55,40,65,55],
};

/** Áreas del organigrama actual con nómina y desempeño. */
export const DEPTS: Department[] = [
  {"id":"ops","name":"Operaciones","short":"Operaciones","full":"Gerencia de operaciones","hc":340,"avgSalary":10900,"perf":78,"roi":4.1,"mix":{"meets":208,"atRisk":82,"below":50},"lead":"Marisol Quintero"},
  {"id":"adm","name":"Administración y finanzas","short":"Administración","full":"Gerencia de administración y finanzas","hc":14,"avgSalary":17500,"perf":84,"roi":2.9,"mix":{"meets":9,"atRisk":3,"below":2},"lead":"Héctor Valenzuela"},
  {"id":"cedis","name":"Almacén y CEDIS","short":"CEDIS","full":"Jefatura de almacén y CEDIS","hc":23,"avgSalary":10600,"perf":71,"roi":2.6,"mix":{"meets":11,"atRisk":7,"below":5},"lead":"Ramón Esquer"},
  {"id":"mto","name":"Mantenimiento","short":"Mantenimiento","full":"Jefatura de mantenimiento","hc":14,"avgSalary":13900,"perf":66,"roi":1.8,"mix":{"meets":6,"atRisk":4,"below":4},"lead":"Gilberto Soto"},
  {"id":"com","name":"Compras","short":"Compras","full":"Jefatura de compras","hc":9,"avgSalary":18200,"perf":88,"roi":5.2,"mix":{"meets":7,"atRisk":2,"below":0},"lead":"Arturo Félix"},
  {"id":"rh","name":"Recursos humanos","short":"RH","full":"Jefatura de recursos humanos","hc":7,"avgSalary":15800,"perf":62,"roi":1.4,"mix":{"meets":3,"atRisk":2,"below":2},"lead":"Lucía Moreno"},
  {"id":"sis","name":"Sistemas","short":"Sistemas","full":"Coordinación de sistemas","hc":4,"avgSalary":19500,"perf":81,"roi":2.2,"mix":{"meets":3,"atRisk":1,"below":0},"lead":"Daniela Ruiz"},
];

/** Factor de carga social sobre la nómina. */
export const CARGA = 1.35;

/** Colaboradores clave evaluados. */
export const EMPLOYEES: EmployeeSource[] = [
  {"name":"Karla Méndez","role":"Gerente de sucursal","dept":"ops","site":"Sucursal Centro","perf":104,"salary":39500,"years":9,"education":"Lic. en Administración","scores":[82,86,88,84,72],"potential":"alto","nextRole":"Gerente de zona","direction":"up","causeType":null,"cause":"","focus":"","kpi":"","mentor":"","course":"mbacal"},
  {"name":"Jorge Acuña","role":"Gerente de sucursal","dept":"ops","site":"Sucursal Colosio","perf":71,"salary":36000,"years":4,"education":"Preparatoria","scores":[74,56,72,54,45],"potential":"bajo","nextRole":"Jefe(a) de piso","direction":"down","causeType":"liderazgo","cause":"La rotación de su sucursal es 61%, el doble de la meta, y tres jefaturas renunciaron este año.","focus":"la retención de su equipo","kpi":"Rotación anual de sucursal","mentor":"Karla Méndez","course":"schd"},
  {"name":"Daniel Ortega","role":"Jefe(a) de piso","dept":"ops","site":"Sucursal Kennedy","perf":83,"salary":16800,"years":5,"education":"Preparatoria","scores":[70,68,66,72,48],"potential":"alto","nextRole":"Gerente de sucursal","direction":"up","causeType":"proceso","cause":"Planograma al 72%: dedica 15% de su semana a programar turnos a mano.","focus":"la programación de turnos","kpi":"Cumplimiento de planograma","mentor":"Karla Méndez","course":"lae"},
  {"name":"Ana Lucía Ramos","role":"Supervisor(a) de turno","dept":"ops","site":"Sucursal Centro","perf":97,"salary":15200,"years":3,"education":"Lic. en Mercadotecnia (trunca)","scores":[68,78,52,86,58],"potential":"alto","nextRole":"Jefe(a) de piso","direction":"up","causeType":null,"cause":"","focus":"","kpi":"","mentor":"","course":"schd"},
  {"name":"Brenda Saucedo","role":"Jefe(a) de cajas","dept":"ops","site":"Sucursal Obregón","perf":68,"salary":15900,"years":6,"education":"Secundaria","scores":[66,54,62,58,30],"potential":"bajo","nextRole":"Cajero(a)","direction":"down","causeType":"tecnica","cause":"Diferencias por turno de 0.5%, cinco veces la meta; no usa el arqueo digital.","focus":"arqueo y control de efectivo","kpi":"Diferencias por turno","mentor":"la jefa de cajas de Centro","course":"scdig"},
  {"name":"Luis Fernando Gil","role":"Cajero(a)","dept":"ops","site":"Sucursal Kennedy","perf":92,"salary":10100,"years":4,"education":"Preparatoria","scores":[72,66,52,80,40],"potential":"alto","nextRole":"Jefe(a) de cajas","direction":"up","causeType":null,"cause":"","focus":"","kpi":"","mentor":"","course":"schd"},
  {"name":"Mariana Torres","role":"Auxiliar de piso de venta","dept":"ops","site":"Sucursal Los Álamos","perf":64,"salary":9100,"years":1,"education":"Secundaria","scores":[40,42,25,38,22],"potential":"bajo","nextRole":"Surtidor(a)","direction":"lateral","causeType":"actitud","cause":"Ausentismo de 4 días al mes en los últimos 3 meses; su pasillo tiene huecos en anaquel.","focus":"","kpi":"Disponibilidad en anaquel","mentor":"su jefe de piso","course":"scsoft"},
  {"name":"Rubén Castro","role":"Carnicero(a)","dept":"ops","site":"Sucursal Mascareñas","perf":81,"salary":12100,"years":7,"education":"Secundaria","scores":[74,52,64,60,24],"potential":"medio","nextRole":"Jefe(a) de perecederos","direction":"up","causeType":"tecnica","cause":"Merma de cárnicos de 3.4%; el rendimiento por canal está 5 puntos abajo de la meta.","focus":"despiece y rendimiento por canal","kpi":"Merma de cárnicos","mentor":"el maestro carnicero de Centro","course":"scgas"},
  {"name":"Sofía Navarro","role":"Panadero(a)","dept":"ops","site":"Sucursal Centro","perf":101,"salary":11800,"years":6,"education":"Preparatoria","scores":[82,62,70,78,40],"potential":"medio","nextRole":"Jefe(a) de perecederos","direction":"up","causeType":null,"cause":"","focus":"","kpi":"","mentor":"","course":"scgas"},
  {"name":"Iván Robles","role":"Supervisor(a) de turno","dept":"ops","site":"Sucursal Colosio","perf":58,"salary":14300,"years":2,"education":"Preparatoria","scores":[52,50,40,62,42],"potential":"medio","nextRole":"Jefe(a) de piso","direction":"up","causeType":"carga","cause":"Cubre dos turnos por falta de plantilla; la cobertura de su turno es 79%.","focus":"la programación de turnos y ausentismo","kpi":"Cobertura de plantilla por turno","mentor":"Ana Lucía Ramos","course":"scdig"},
  {"name":"Ramón Esquer","role":"Jefatura de almacén y CEDIS","dept":"cedis","site":"CEDIS Nogales","perf":77,"salary":24500,"years":11,"education":"Preparatoria","scores":[72,66,84,64,40],"potential":"medio","nextRole":"Dirección de operaciones","direction":"up","causeType":"proceso","cause":"Exactitud de inventario de 91%: los conteos se hacen en papel y se capturan al día siguiente.","focus":"el conteo cíclico","kpi":"Exactitud de inventario","mentor":"la directora de operaciones","course":"mimc"},
  {"name":"Paola Villa","role":"Surtidor(a)","dept":"cedis","site":"CEDIS Nogales","perf":99,"salary":10400,"years":3,"education":"Preparatoria","scores":[70,68,48,84,42],"potential":"alto","nextRole":"Supervisor(a) de CEDIS","direction":"up","causeType":null,"cause":"","focus":"","kpi":"","mentor":"","course":"sclog"},
  {"name":"Héctor Lugo","role":"Auxiliar de recibo","dept":"cedis","site":"CEDIS Nogales","perf":62,"salary":9800,"years":2,"education":"Secundaria","scores":[44,48,30,56,24],"potential":"medio","nextRole":"Control de calidad CEDIS","direction":"up","causeType":"tecnica","cause":"Solo 70% de las entradas se capturan el mismo día; no domina la terminal RF.","focus":"captura en terminal RF","kpi":"Entradas capturadas el mismo día","mentor":"Alma Rosas","course":"scexcel"},
  {"name":"Alma Rosas","role":"Auxiliar de recibo","dept":"cedis","site":"CEDIS Nogales","perf":90,"salary":10200,"years":5,"education":"Preparatoria","scores":[68,64,52,74,44],"potential":"medio","nextRole":"Control de calidad CEDIS","direction":"up","causeType":null,"cause":"","focus":"","kpi":"","mentor":"","course":"sclog"},
  {"name":"Gilberto Soto","role":"Jefatura de mantenimiento","dept":"mto","site":"Corporativo","perf":69,"salary":22800,"years":14,"education":"Técnico en electricidad","scores":[84,52,80,58,38],"potential":"bajo","nextRole":"Técnico(a) de refrigeración","direction":"down","causeType":"proceso","cause":"Preventivos al 78%: atiende fallas él mismo en lugar de planear el trabajo del equipo.","focus":"el plan preventivo","kpi":"Preventivos cumplidos","mentor":"la directora de operaciones","course":"schd"},
  {"name":"Óscar Leyva","role":"Técnico(a) de refrigeración","dept":"mto","site":"Sucursales","perf":61,"salary":14200,"years":1,"education":"Técnico en refrigeración","scores":[58,50,34,60,40],"potential":"medio","nextRole":"Jefatura de mantenimiento","direction":"up","causeType":"tecnica","cause":"Tiempo de respuesta de 3.5 horas; no está capacitado en los equipos de frío nuevos.","focus":"refrigeración comercial","kpi":"Tiempo de respuesta a fallas","mentor":"Efraín Duarte","course":"ii"},
  {"name":"Efraín Duarte","role":"Técnico(a) de refrigeración","dept":"mto","site":"Sucursales","perf":95,"salary":15800,"years":8,"education":"Técnico en refrigeración","scores":[90,70,72,78,50],"potential":"alto","nextRole":"Jefatura de mantenimiento","direction":"up","causeType":null,"cause":"","focus":"","kpi":"","mentor":"","course":"ii"},
  {"name":"Héctor Valenzuela","role":"Gerencia de administración y finanzas","dept":"adm","site":"Corporativo","perf":86,"salary":52000,"years":12,"education":"Lic. en Contaduría","scores":[84,80,78,74,80],"potential":"medio","nextRole":"Dirección de administración y finanzas","direction":"up","causeType":"proceso","cause":"El cierre mensual se entrega el día 9; la meta es el día 5.","focus":"la conciliación bancaria y de cajas","kpi":"Día de cierre mensual","mentor":"el gerente general","course":"ef"},
  {"name":"Claudia Peña","role":"Analista de nómina","dept":"adm","site":"Corporativo","perf":63,"salary":15400,"years":3,"education":"Lic. en Contaduría","scores":[70,56,44,62,66],"potential":"medio","nextRole":"Coordinación de nómina y compensaciones","direction":"up","causeType":"carga","cause":"Comete 11 errores por nómina: captura a mano las incidencias de 412 personas.","focus":"la captura de incidencias","kpi":"Errores por nómina","mentor":"Héctor Valenzuela","course":"scexcel"},
  {"name":"Miguel Ángel Ríos","role":"Auxiliar contable","dept":"adm","site":"Corporativo","perf":93,"salary":13200,"years":2,"education":"Lic. en Finanzas","scores":[72,68,40,80,76],"potential":"alto","nextRole":"Analista de datos","direction":"up","causeType":null,"cause":"","focus":"","kpi":"","mentor":"","course":"ecd"},
  {"name":"Arturo Félix","role":"Jefatura de compras","dept":"com","site":"Corporativo","perf":91,"salary":34000,"years":10,"education":"Lic. en Comercio Internacional","scores":[80,78,82,76,72],"potential":"medio","nextRole":"Dirección de administración y finanzas","direction":"up","causeType":null,"cause":"","focus":"","kpi":"","mentor":"","course":"mbalog"},
  {"name":"Diana Corral","role":"Comprador(a) jr.","dept":"com","site":"Corporativo","perf":77,"salary":16500,"years":2,"education":"Lic. en Administración","scores":[60,64,40,72,64],"potential":"alto","nextRole":"Jefatura de compras","direction":"up","causeType":"tecnica","cause":"Quiebres de abasto de 6% en perecederos; compra con base en el pedido anterior.","focus":"pronóstico de demanda","kpi":"Quiebres de abasto","mentor":"Arturo Félix","course":"sclog"},
  {"name":"Lucía Moreno","role":"Jefatura de recursos humanos","dept":"rh","site":"Corporativo","perf":72,"salary":28500,"years":6,"education":"Lic. en Psicología","scores":[64,78,60,76,74],"potential":"alto","nextRole":"Dirección de capital humano","direction":"up","causeType":"carga","cause":"La rotación de 47% obliga a RH a dedicar 80% de su tiempo a reclutar.","focus":"el filtro de CVs y la agenda de entrevistas","kpi":"Retención a 90 días","mentor":"el gerente general","course":"ech"},
  {"name":"Fernanda Ibarra","role":"Reclutador(a)","dept":"rh","site":"Corporativo","perf":66,"salary":14100,"years":1,"education":"Lic. en Psicología","scores":[52,64,30,70,62],"potential":"medio","nextRole":"Jefatura de recursos humanos","direction":"up","causeType":"proceso","cause":"Tarda 19 días en cubrir una vacante de tienda; la meta es 7.","focus":"filtro de CVs y agenda","kpi":"Días para cubrir vacante","mentor":"Lucía Moreno","course":"scth"},
  {"name":"Jesús Cota","role":"Instructor(a) de capacitación","dept":"rh","site":"Corporativo","perf":94,"salary":15000,"years":4,"education":"Lic. en Educación","scores":[66,80,58,86,70],"potential":"alto","nextRole":"Jefatura de recursos humanos","direction":"up","causeType":null,"cause":"","focus":"","kpi":"","mentor":"","course":"ladt"},
  {"name":"Daniela Ruiz","role":"Coordinación de sistemas","dept":"sis","site":"Corporativo","perf":92,"salary":26000,"years":5,"education":"Ing. en Sistemas","scores":[86,72,56,78,78],"potential":"alto","nextRole":"Coordinación de IA y datos","direction":"up","causeType":null,"cause":"","focus":"","kpi":"","mentor":"","course":"miaa"},
  {"name":"Alan Quiroz","role":"Soporte técnico","dept":"sis","site":"Corporativo","perf":76,"salary":13800,"years":2,"education":"Técnico en informática","scores":[62,56,42,66,46],"potential":"medio","nextRole":"Coordinación de sistemas","direction":"up","causeType":"tecnica","cause":"Resuelve tickets en 9 horas en promedio; la meta es 4.","focus":"soporte a punto de venta","kpi":"Tiempo de resolución de tickets","mentor":"Daniela Ruiz","course":"ittd"},
];

/** Cuadrantes de la matriz 9-box, clave "potencial-desempeño" (0 bajo · 2 alto). */
export const NINE_BOX: Record<string, NineBoxCell> = {
  "2-2": {"title":"Estrella","action":"Promover","move":"Sube","description":"Desempeño alto y potencial alto. Listos para el siguiente puesto o para cubrir una sucesión."},
  "2-1": {"title":"Alto potencial","action":"Desarrollar para subir","move":"Sube","description":"Potencial alto con desempeño en desarrollo. Suben con un plan de formación de 6 a 12 meses."},
  "2-0": {"title":"Enigma","action":"Acompañar de cerca","move":"Se desarrolla","description":"Potencial alto, pero hoy no entregan resultados. Revisar carga y entorno antes de decidir."},
  "1-2": {"title":"Alto desempeño","action":"Ampliar su rol","move":"Sube","description":"Entregan resultados con potencial medio. Crecen ampliando responsabilidades en su área."},
  "1-1": {"title":"Profesional clave","action":"Mantener","move":"Se mantiene","description":"Base estable de la operación. Mantener y reforzar con upskilling puntual."},
  "1-0": {"title":"Dilema","action":"Plan de mejora","move":"Se desarrolla","description":"Potencial medio y desempeño bajo. Plan de mejora de 90 días con seguimiento."},
  "0-2": {"title":"Experto","action":"Reconocer en su rol","move":"Se mantiene","description":"Expertos técnicos en su puesto actual. Reconocer y usar como mentores."},
  "0-1": {"title":"Efectivo","action":"Mantener","move":"Se mantiene","description":"Cumplen lo básico en su puesto actual."},
  "0-0": {"title":"Bajo ajuste","action":"Reubicar","move":"Se reubica","description":"Desempeño y potencial bajos en su puesto actual. Mover a una posición con mejor ajuste."},
};

/** Posiciones clave del plan de sucesión. */
export const SUCCESSION: SuccessionPlan[] = [
  {"position":"Gerente de zona norte","area":"Dirección de operaciones · puesto nuevo","role":"Gerente de zona","incumbent":null,"risk":"Vacante","successors":["Karla Méndez","Daniel Ortega"]},
  {"position":"Gerente de sucursal · Colosio","area":"Operaciones","role":"Gerente de sucursal","incumbent":"Jorge Acuña","risk":"Alto","successors":["Daniel Ortega","Ana Lucía Ramos"]},
  {"position":"Jefe(a) de cajas · Obregón","area":"Operaciones","role":"Jefe(a) de cajas","incumbent":"Brenda Saucedo","risk":"Alto","successors":["Luis Fernando Gil"]},
  {"position":"Jefatura de almacén y CEDIS","area":"Operaciones","role":"Jefatura de almacén y CEDIS","incumbent":"Ramón Esquer","risk":"Medio","successors":["Paola Villa","Alma Rosas"]},
  {"position":"Jefatura de mantenimiento","area":"Operaciones","role":"Jefatura de mantenimiento","incumbent":"Gilberto Soto","risk":"Alto","successors":["Efraín Duarte","Óscar Leyva"]},
  {"position":"Jefatura de recursos humanos","area":"Capital humano","role":"Jefatura de recursos humanos","incumbent":"Lucía Moreno","risk":"Medio","successors":["Jesús Cota","Fernanda Ibarra"]},
  {"position":"Coordinación de IA y datos","area":"Administración y finanzas · puesto nuevo","role":"Coordinación de IA y datos","incumbent":null,"risk":"Vacante","successors":["Daniela Ruiz","Miguel Ángel Ríos"]},
];

/** Rutas de carrera con programas Tecmilenio que habilitan cada salto (bridges[i] = paso i → i+1). */
export const LADDERS: CareerLadder[] = [
  {"name":"Tienda · piso de venta","steps":["Auxiliar de piso de venta","Supervisor(a) de turno","Jefe(a) de piso","Gerente de sucursal","Gerente de zona"],"bridges":[["prepa","scven"],["schd","scdig"],["lae","schd"],["mbacal","scfin"]]},
  {"name":"Tienda · cajas","steps":["Cajero(a)","Jefe(a) de cajas","Gerente de sucursal"],"bridges":[["prepa","scdig"],["lae","scfin"]]},
  {"name":"CEDIS","steps":["Auxiliar de recibo","Control de calidad CEDIS","Supervisor(a) de CEDIS","Jefatura de almacén y CEDIS"],"bridges":[["sclog","scexcel"],["ilcs","schd"],["mbalog","mimc"]]},
  {"name":"Talento","steps":["Reclutador(a)","Jefatura de recursos humanos","Dirección de capital humano"],"bridges":[["ladt","scth"],["ech","mdch"]]},
];

/** Rutas adicionales usadas para ubicar el career path de cada colaborador. */
export const EXTRA_LADDERS: CareerLadder[] = [
  {"name":"Perecederos · carnicería","steps":["Carnicero(a)","Jefe(a) de perecederos","Gerente de sucursal"],"bridges":[]},
  {"name":"Perecederos · panadería","steps":["Panadero(a)","Jefe(a) de perecederos","Gerente de sucursal"],"bridges":[]},
  {"name":"CEDIS · surtido","steps":["Surtidor(a)","Supervisor(a) de CEDIS","Jefatura de almacén y CEDIS","Dirección de operaciones"],"bridges":[]},
  {"name":"CEDIS · liderazgo","steps":["Supervisor(a) de CEDIS","Jefatura de almacén y CEDIS","Dirección de operaciones"],"bridges":[]},
  {"name":"Mantenimiento","steps":["Técnico(a) de refrigeración","Jefatura de mantenimiento","Dirección de operaciones"],"bridges":[]},
  {"name":"Finanzas y datos","steps":["Auxiliar contable","Analista de datos","Coordinación de IA y datos"],"bridges":[]},
  {"name":"Nómina","steps":["Analista de nómina","Coordinación de nómina y compensaciones","Dirección de capital humano"],"bridges":[]},
  {"name":"Administración","steps":["Gerencia de administración y finanzas","Dirección de administración y finanzas"],"bridges":[]},
  {"name":"Compras","steps":["Comprador(a) jr.","Jefatura de compras","Dirección de administración y finanzas"],"bridges":[]},
  {"name":"Capacitación","steps":["Instructor(a) de capacitación","Jefatura de recursos humanos","Dirección de capital humano"],"bridges":[]},
  {"name":"Sistemas","steps":["Soporte técnico","Coordinación de sistemas","Coordinación de IA y datos"],"bridges":[]},
];
