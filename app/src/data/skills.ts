// Datos simulados del diagnóstico de Ahorramart Economax (corte: septiembre 2026).
// Reemplazar por la fuente real (nómina / HRIS) en src/data/index.ts.
import type { Automation, SkillBaseline, TaxFamilySource } from './types';

/** Dominio actual promedio (escala 1–4) de cada habilidad extraída de las descripciones de puesto. */
export const SKILLS: SkillBaseline[] = [
  {"name":"Atención al cliente","category":"Servicio","current":2.6},
  {"name":"Operación de punto de venta","category":"Técnica","current":3.1},
  {"name":"Manejo de efectivo","category":"Técnica","current":2.7},
  {"name":"Control de inventarios","category":"Técnica","current":1.8},
  {"name":"Inocuidad alimentaria","category":"Técnica","current":2.2},
  {"name":"Exhibición de producto","category":"Técnica","current":2.4},
  {"name":"Seguridad e higiene","category":"Técnica","current":2.5},
  {"name":"Refrigeración industrial","category":"Técnica","current":3.4},
  {"name":"Liderazgo de equipos","category":"Liderazgo","current":1.7},
  {"name":"Planeación de turnos","category":"Liderazgo","current":1.6},
  {"name":"Comunicación efectiva","category":"Liderazgo","current":2.4},
  {"name":"Análisis de datos","category":"Digital","current":1.2},
  {"name":"Hojas de cálculo","category":"Digital","current":2.1},
  {"name":"Uso de asistentes IA","category":"IA","current":0.4},
  {"name":"Supervisión de flujos con IA","category":"IA","current":0.3},
  {"name":"Legislación laboral","category":"Negocio","current":2.6},
];

/** Actividades que absorben los asistentes IA de la Propuesta +AI. */
export const AUTOMATIONS: Automation[] = [
  {"activity":"Conteo cíclico y sugerido de pedido","assistant":"Asistente IA de inventarios","area":"Almacén y CEDIS","fromRole":"Auxiliar de recibo","hoursPerMonth":680,"positions":4,"monthlySavings":52800,"destination":"Control de calidad CEDIS"},
  {"activity":"Programación de turnos y ausentismo","assistant":"Asistente IA de turnos","area":"Piso de venta","fromRole":"Supervisor(a) de turno","hoursPerMonth":520,"positions":3,"monthlySavings":64200,"destination":"Jefe(a) de piso"},
  {"activity":"Conciliación bancaria y de cajas","assistant":"Asistente IA de conciliación","area":"Finanzas","fromRole":"Auxiliar contable","hoursPerMonth":340,"positions":2,"monthlySavings":38400,"destination":"Analítica de datos"},
  {"activity":"Órdenes de compra recurrentes","assistant":"Asistente IA de compras","area":"Compras","fromRole":"Comprador(a) jr.","hoursPerMonth":300,"positions":2,"monthlySavings":41600,"destination":"Gestión de proveedores"},
  {"activity":"Filtro de CVs y agenda de entrevistas","assistant":"Asistente IA de reclutamiento","area":"Capital humano","fromRole":"Reclutador(a)","hoursPerMonth":260,"positions":1,"monthlySavings":21400,"destination":"Desarrollo y capacitación"},
  {"activity":"Cálculo de incidencias de nómina","assistant":"Asistente IA de nómina","area":"Capital humano","fromRole":"Analista de nómina","hoursPerMonth":220,"positions":2,"monthlySavings":36800,"destination":"Adopción de IA"},
];

/** Costo mensual de la plataforma IA (MXN). */
export const AI_COST = 38000;

/** Taxonomía de competencias del personal operativo: 12 familias. */
export const TAX_FAMILIES: TaxFamilySource[] = [
  {"name":"Retail","type":"hard","baseSalary":9800,"skills":["Acomodo de mercancía","Exhibición en cabeceras","Lectura de planogramas","Etiquetado de precios","Control de caducidades","Rotación PEPS","Surtido de anaquel","Atención en piso","Venta sugerida","Manejo de promociones","Detección de faltantes","Merchandising visual","Control de merma","Conteo de anaquel","Inventario por departamento","Montaje de temporada"]},
  {"name":"Cajas y cobro","type":"hard","baseSalary":9600,"skills":["Operación de terminal POS","Cobro con tarjeta","Manejo de efectivo","Arqueo de caja","Corte de turno","Devoluciones y cambios","Facturación electrónica","Pago de servicios","Recargas telefónicas","Detección de billetes falsos","Programas de lealtad","Cobro con vales","Atención en fila"]},
  {"name":"Perecederos","type":"hard","baseSalary":11500,"skills":["Despiece de res","Despiece de cerdo","Fileteado de pescado","Preparación de cortes","Panificación","Repostería","Operación de horno","Manejo de rebanadora","Cadena de frío","Registro de temperaturas","Selección de frutas y verduras","Maduración controlada","Empaque al vacío","Rotisería"]},
  {"name":"Almacén","type":"hard","baseSalary":10200,"skills":["Recepción de mercancía","Verificación contra factura","Conteo cíclico","Acomodo en racks","Manejo de montacargas","Manejo de patín hidráulico","Surtido por pedido","Etiquetado de tarimas","Devoluciones a proveedor","Uso de terminal RF","Embalaje","Gestión de ubicaciones"]},
  {"name":"Logística","type":"hard","baseSalary":12000,"skills":["Ruteo de reparto","Carga y estiba","Documentación de embarque","Coordinación con transportistas","Control de entregas","Manejo de unidades","Logística inversa","Cross-docking","Citas de recibo","Control de combustible"]},
  {"name":"Calidad","type":"hard","baseSalary":12500,"skills":["Higiene NOM-251","Inspección de producto","Buenas prácticas de manufactura","Control de plagas","Muestreo de calidad","Auditoría interna","Trazabilidad de lotes","Producto no conforme","Limpieza y sanitización","Metodología 5S"]},
  {"name":"Seguridad","type":"hard","baseSalary":10800,"skills":["Prevención de robo hormiga","Uso de EPP","Protección civil","Primeros auxilios","Manejo de extintores","Plan de evacuación","Monitoreo de CCTV","Bloqueo y etiquetado","Trabajo en alturas","Manejo de químicos"]},
  {"name":"Mantenimiento","type":"hard","baseSalary":14000,"skills":["Refrigeración comercial","Electricidad básica","Plomería","Mantenimiento de montacargas","Mantenimiento preventivo","Aire acondicionado","Soldadura","Diagnóstico de fallas","Bitácora de mantenimiento","Pintura y obra menor"]},
  {"name":"Tecnología","type":"hard","baseSalary":13500,"skills":["Uso de ERP","Hojas de cálculo","Terminal de inventario","Uso de asistentes IA","Validación de resultados de IA","Reportes en tablero","Correo y mensajería","Escaneo de códigos","Apps de reclutamiento","Ciberseguridad básica","Captura de datos","Actualización de precios"]},
  {"name":"Liderazgo","type":"soft","baseSalary":15500,"skills":["Liderazgo de turno","Delegación","Planeación de turnos","Retroalimentación","Coaching en piso","Resolución de conflictos","Toma de decisiones","Gestión del desempeño","Inducción de personal nuevo","Manejo de ausentismo","Motivación de equipo"]},
  {"name":"Comunicación","type":"soft","baseSalary":10000,"skills":["Comunicación con clientes","Manejo de quejas","Comunicación asertiva","Escucha activa","Trabajo en equipo","Reporte de incidencias","Instrucciones claras","Negociación básica","Comunicación por radio","Atención telefónica"]},
  {"name":"Inteligencia emocional","type":"soft","baseSalary":9900,"skills":["Manejo del estrés","Empatía","Autocontrol","Tolerancia a la frustración","Adaptabilidad","Resiliencia","Orientación al servicio","Responsabilidad","Puntualidad","Actitud de aprendizaje"]},
];
