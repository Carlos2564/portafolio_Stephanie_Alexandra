import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  School,
  FlaskConical,
  GraduationCap,
  UserRound,
  PenLine,
  Target,
  House,
  Presentation,
  Repeat,
  Package,
  MonitorSmartphone,
  Beaker,
  ClipboardCheck,
  Smartphone,
  Image as ImageIcon,
  CalendarClock,
  MousePointerClick,
  ArrowRight,
  CircleCheck,
  Clock,
  Atom,
  Zap,
  Microscope,
  TriangleAlert,
  ListOrdered,
  HelpCircle,
} from 'lucide-react';
import { PageShell, GlassCard, SectionHeader, Badge, Divider } from './ui/Primitives';
import { cx, fadeUp, stagger } from './ui/tokens';

/* =====================================================================
   PLANIFICACIONES DE CLASE · Apartados 7.a y 7.b
   ===================================================================== */

const FICHA = [
  { icon: School, label: 'Institución', value: 'Instituto Nacional Dr. Francisco Martínez Suárez' },
  { icon: FlaskConical, label: 'Asignatura', value: 'Ciencias Naturales y Tecnología' },
  { icon: GraduationCap, label: 'Nivel', value: '1.° Año de Bachillerato (Modalidad Flexible)' },
  { icon: UserRound, label: 'Docente tutor', value: 'Lcdo. Amilcar Heriberto Sánchez' },
  { icon: PenLine, label: 'Practicante', value: 'Stephanie Alexandra Hernández Sibrián' },
];

const PLANS = [
  {
    id: 'p1',
    n: 1,
    icon: Microscope,
    title: 'El método científico en problemas cotidianos',
    axis: 'La ciencia y la investigación',
    duration: '1 semana · estudio autónomo + tutoría sabatina',
    objectives: [
      'Identificar las etapas del método científico en situaciones cotidianas.',
      'Formular una pregunta de investigación y una hipótesis sencilla.',
      'Registrar y analizar los datos de un experimento casero.',
    ],
    before: [
      'Ver la cápsula “¿Cómo piensa un científico?” (6 min) en Classroom.',
      'Leer la guía PDF de dos páginas y anotar dos dudas en el Banco de Dudas.',
      'Observar una situación cotidiana y escribir una pregunta sobre ella.',
    ],
    during: [
      'Inicio: socialización de las preguntas del Banco de Dudas.',
      'Desarrollo: experimento en equipos con roles rotativos.',
      'Cierre: cuestionario en Kahoot! y autoevaluación.',
    ],
    after: [
      'Completar un informe breve de laboratorio en Google Docs o en el cuaderno.',
      'Elaborar un mapa mental del método científico en Canva o a mano.',
      'Consultar dudas por WhatsApp en el horario acordado.',
    ],
    resources: {
      didactic: ['Guía PDF ligera', 'Banco de Dudas', 'Materiales caseros', 'Hoja de registro de datos'],
      digital: ['Google Classroom', 'Cápsula de video', 'Kahoot!', 'Canva'],
    },
    practice: {
      question: '¿Influye la temperatura del agua en la rapidez con que se disuelve el azúcar?',
      materials: ['Tres vasos', 'Agua fría, tibia y caliente', 'Azúcar', 'Cuchara', 'Cronómetro del celular'],
      steps: ['Formular la hipótesis en equipo.', 'Agregar la misma cantidad de azúcar a cada vaso.', 'Medir el tiempo de disolución.', 'Registrar los datos en una tabla y concluir.'],
    },
    evaluation: [
      { criterion: 'Formula una pregunta y una hipótesis coherentes', instrument: 'Lista de cotejo', evidence: 'Hoja de trabajo del equipo' },
      { criterion: 'Registra y organiza los datos en una tabla', instrument: 'Rúbrica del informe', evidence: 'Informe breve de laboratorio' },
      { criterion: 'Explica las etapas del método científico', instrument: 'Kahoot! y autoevaluación', evidence: 'Resultados del cuestionario' },
    ],
  },
  {
    id: 'p2',
    n: 2,
    icon: Atom,
    title: 'La materia: propiedades, estados y cambios',
    axis: 'La materia y sus transformaciones',
    duration: '1 semana · estudio autónomo + tutoría sabatina',
    objectives: [
      'Describir las propiedades generales y los estados de agregación de la materia.',
      'Diferenciar cambios físicos y químicos a partir de evidencias observables.',
      'Representar los cambios de estado en un esquema o infografía.',
    ],
    before: [
      'Ver la cápsula “Estados de la materia en mi cocina” (7 min).',
      'Revisar la infografía PDF de propiedades de la materia.',
      'Anotar tres ejemplos de cambios que ocurren en casa.',
    ],
    during: [
      'Inicio: clasificación colectiva de los ejemplos traídos de casa.',
      'Desarrollo: estaciones de observación de cambios físicos y químicos.',
      'Cierre: Quizizz de comprobación y preguntas de cierre.',
    ],
    after: [
      'Elaborar una infografía de los cambios de estado en Canva o en papel.',
      'Responder la actividad del final de la lección del módulo.',
      'Publicar una foto de un cambio químico observado en casa en el Padlet del grupo.',
    ],
    resources: {
      didactic: ['Infografía PDF', 'Tarjetas de clasificación', 'Materiales de cocina', 'Tabla de observación'],
      digital: ['Google Classroom', 'Cápsula de video', 'Quizizz', 'Padlet', 'Canva'],
    },
    practice: {
      question: '¿Qué evidencias nos permiten distinguir un cambio físico de un cambio químico?',
      materials: ['Cubos de hielo', 'Vinagre y bicarbonato', 'Sal y agua', 'Una manzana partida', 'Vasos transparentes'],
      steps: ['Observar el hielo al derretirse.', 'Disolver sal en agua.', 'Mezclar vinagre con bicarbonato.', 'Observar la manzana partida tras 20 minutos y clasificar cada cambio.'],
    },
    evaluation: [
      { criterion: 'Identifica propiedades y estados de la materia', instrument: 'Quizizz', evidence: 'Reporte de resultados' },
      { criterion: 'Clasifica cambios físicos y químicos con evidencias', instrument: 'Rúbrica de observación', evidence: 'Tabla de observación del equipo' },
      { criterion: 'Representa los cambios de estado', instrument: 'Rúbrica de infografía', evidence: 'Infografía individual' },
    ],
  },
  {
    id: 'p3',
    n: 3,
    icon: Zap,
    title: 'La energía: formas, transformaciones y uso responsable',
    axis: 'Energía y tecnología',
    duration: '1 semana · estudio autónomo + tutoría sabatina',
    objectives: [
      'Reconocer las principales formas de energía presentes en la vida diaria.',
      'Explicar transformaciones de energía en aparatos y objetos cotidianos.',
      'Proponer acciones de uso responsable de la energía en el hogar y el trabajo.',
    ],
    before: [
      'Ver la cápsula “¿A dónde va la energía?” (6 min) o la simulación sugerida.',
      'Leer la guía PDF de formas de energía.',
      'Hacer una lista de cinco aparatos que usas en casa o en tu trabajo.',
    ],
    during: [
      'Inicio: lluvia de ideas con la lista de aparatos.',
      'Desarrollo: análisis en equipos de cadenas de transformación de energía.',
      'Cierre: Kahoot! y compromiso personal de ahorro energético.',
    ],
    after: [
      'Elaborar un diagrama de flujo de las transformaciones de energía de un aparato.',
      'Revisar el recibo de energía de casa e identificar una medida de ahorro.',
      'Compartir la medida elegida en el grupo de WhatsApp.',
    ],
    resources: {
      didactic: ['Guía PDF de formas de energía', 'Tarjetas de aparatos', 'Plantilla de diagrama de flujo'],
      digital: ['Google Classroom', 'Cápsula o simulación interactiva', 'Kahoot!', 'WhatsApp'],
    },
    practice: {
      question: '¿Qué transformaciones de energía ocurren en una linterna, una licuadora y una calculadora solar?',
      materials: ['Linterna de baterías', 'Calculadora solar', 'Imágenes de aparatos', 'Hoja de registro'],
      steps: ['Observar el funcionamiento de cada objeto.', 'Identificar la energía de entrada y de salida.', 'Dibujar la cadena de transformaciones.', 'Proponer cómo reducir el desperdicio de energía.'],
    },
    evaluation: [
      { criterion: 'Reconoce las formas de energía', instrument: 'Kahoot!', evidence: 'Resultados del cuestionario' },
      { criterion: 'Explica cadenas de transformación', instrument: 'Rúbrica del diagrama', evidence: 'Diagrama de flujo' },
      { criterion: 'Propone acciones de uso responsable', instrument: 'Lista de cotejo', evidence: 'Compromiso personal' },
    ],
  },
];

const ADAPTATIONS = [
  {
    n: 1,
    icon: Smartphone,
    need: { value: '27.3% · 45.5%', label: 'estudia solo en celular · conexión limitada al subir tareas' },
    title: 'Formato Mobile-First y ligero',
    text: 'Cápsulas breves en baja resolución, guías PDF de una o dos páginas legibles en pantallas pequeñas y descargables para trabajar sin conexión.',
    applied: 'Todas las actividades del “Antes” se pueden realizar desde el celular.',
  },
  {
    n: 2,
    icon: ImageIcon,
    need: { value: 'Tutor', label: 'identifica pereza a la lectura y la escritura' },
    title: 'Apoyo visual e infográfico',
    text: 'Infografías, esquemas y mapas mentales acompañan los textos; la producción escrita se gradúa con plantillas y preguntas guía.',
    applied: 'Cada plan incluye un producto visual (mapa mental, infografía o diagrama).',
  },
  {
    n: 3,
    icon: CalendarClock,
    need: { value: 'P13', label: 'piden dosificar tareas por la jornada laboral' },
    title: 'Dosificación de actividades exaula',
    text: 'Se mantiene una actividad integradora de fin de lección por semana, con tiempos de entrega realistas que respetan la jornada laboral de los estudiantes adultos.',
    applied: 'Las actividades del “Después” se limitan a tres y una es opcional o de socialización.',
  },
  {
    n: 4,
    icon: MousePointerClick,
    need: { value: '2 de 2', label: 'actores clave señalan poco manejo de la computadora' },
    title: 'Inducción paso a paso en herramientas TIC',
    text: 'Antes de usar una herramienta nueva (Canva, Quizizz, Padlet) se realiza una demostración guiada en la tutoría y se comparte un tutorial visual.',
    applied: 'Cada herramienta se presenta primero en la tutoría sabatina con acompañamiento.',
  },
];

const PHASES = [
  { key: 'before', label: 'Antes de la tutoría', hint: 'Entre semana, en casa', icon: House, tone: 'bg-lilac border-lilac-line text-plum' },
  { key: 'during', label: 'Durante la tutoría', hint: 'Sábado presencial', icon: Presentation, tone: 'bg-plum border-plum text-white' },
  { key: 'after', label: 'Después de la tutoría', hint: 'Seguimiento semanal', icon: Repeat, tone: 'bg-sand border-sand-line text-bronze-dark' },
];

/* ---------------------------------------------------------------------
   Visor del plan
   --------------------------------------------------------------------- */

function SectionLabel({ icon: Icon, children }) {
  return (
    <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold mb-3">
      <Icon size={14} /> {children}
    </p>
  );
}

function PlanViewer({ plan }) {
  const Icon = plan.icon;
  return (
    <GlassCard hover={false} padded={false} className="overflow-hidden">
      <div className="bg-silk border-b border-line p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start gap-5">
          <span className="shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-line text-plum">
            <Icon size={26} />
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2">
              <Badge toneName="violet">Plan de clase {plan.n}</Badge>
              <Badge toneName="amber">Eje: {plan.axis}</Badge>
              <Badge toneName="slate" icon={Clock}>
                {plan.duration}
              </Badge>
            </div>
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold text-ink leading-tight">{plan.title}</h3>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-10">
        <div>
          <SectionLabel icon={Target}>Objetivos de aprendizaje</SectionLabel>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {plan.objectives.map((o, i) => (
              <li key={o} className="flex gap-3 rounded-2xl border border-line bg-ivory p-4 text-sm text-body leading-relaxed">
                <span className="font-serif text-2xl font-semibold text-bronze leading-none">{i + 1}</span>
                {o}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <SectionLabel icon={Repeat}>Metodología de aula invertida</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PHASES.map((ph, i) => {
              const PIcon = ph.icon;
              return (
                <motion.div
                  key={ph.key}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="rounded-3xl border border-line bg-white shadow-paper overflow-hidden"
                >
                  <div className={cx('flex items-center gap-3 border-b px-4 py-3', ph.tone)}>
                    <PIcon size={18} />
                    <div>
                      <p className="text-sm font-semibold leading-tight">{ph.label}</p>
                      <p className="text-[11px] opacity-80">{ph.hint}</p>
                    </div>
                  </div>
                  <ul className="p-4 space-y-2.5">
                    {plan[ph.key].map((a) => (
                      <li key={a} className="flex gap-2.5 text-sm text-body leading-relaxed">
                        <CircleCheck size={16} className="shrink-0 mt-0.5 text-sage" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <SectionLabel icon={Package}>Recursos didácticos y digitales</SectionLabel>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-muted mb-2">Didácticos</p>
                <div className="flex flex-wrap gap-2">
                  {plan.resources.didactic.map((r) => (
                    <span key={r} className="rounded-full border border-sand-line bg-sand px-3 py-1 text-xs font-medium text-bronze-dark">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted mb-2 flex items-center gap-1.5">
                  <MonitorSmartphone size={13} /> Digitales
                </p>
                <div className="flex flex-wrap gap-2">
                  {plan.resources.digital.map((r) => (
                    <span key={r} className="rounded-full border border-lilac-line bg-lilac px-3 py-1 text-xs font-medium text-plum">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 rounded-3xl border border-line bg-ivory p-5 sm:p-6">
            <SectionLabel icon={Beaker}>Actividad práctica / experimento</SectionLabel>
            <p className="flex gap-2 font-serif text-xl font-semibold text-ink leading-snug">
              <HelpCircle size={20} className="shrink-0 mt-1 text-plum" />
              {plan.practice.question}
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-muted mb-2">Materiales</p>
                <ul className="space-y-1.5">
                  {plan.practice.materials.map((m) => (
                    <li key={m} className="flex gap-2 text-sm text-body">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-bronze" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted mb-2 flex items-center gap-1.5">
                  <ListOrdered size={13} /> Procedimiento
                </p>
                <ol className="space-y-1.5">
                  {plan.practice.steps.map((s, i) => (
                    <li key={s} className="flex gap-2 text-sm text-body">
                      <span className="shrink-0 inline-flex h-5 w-5 items-center justify-center rounded-full bg-plum text-[10px] font-bold text-white">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div>
          <SectionLabel icon={ClipboardCheck}>Evaluación</SectionLabel>
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {plan.evaluation.map((e) => (
              <div key={e.criterion} className="rounded-2xl border border-line bg-white shadow-paper p-4 space-y-2">
                <p className="font-semibold text-ink leading-snug">{e.criterion}</p>
                <p className="text-sm text-body">
                  <span className="text-muted">Instrumento:</span> {e.instrument}
                </p>
                <p className="text-sm text-body">
                  <span className="text-muted">Evidencia:</span> {e.evidence}
                </p>
              </div>
            ))}
          </div>
          <div className="hidden md:block overflow-x-auto rounded-3xl border border-line bg-white shadow-paper">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="bg-silk text-left text-[11px] uppercase tracking-[0.16em] text-muted">
                  <th className="px-5 py-3.5 font-semibold">Criterio de evaluación</th>
                  <th className="px-5 py-3.5 font-semibold w-56">Instrumento</th>
                  <th className="px-5 py-3.5 font-semibold w-64">Evidencia</th>
                </tr>
              </thead>
              <tbody>
                {plan.evaluation.map((e) => (
                  <tr key={e.criterion} className="border-t border-line hover:bg-ivory transition-colors">
                    <td className="px-5 py-4 font-medium text-ink">{e.criterion}</td>
                    <td className="px-5 py-4 text-body">{e.instrument}</td>
                    <td className="px-5 py-4 text-body">{e.evidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Planificaciones_de_clases() {
  const [active, setActive] = useState('p1');
  const plan = PLANS.find((p) => p.id === active);

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Apartado 7 · Planificación didáctica"
        icon={FileText}
        title="Planificaciones de"
        highlight="clase"
        description="Planes de clase en el modelo de aula invertida y las adaptaciones realizadas a partir de las necesidades identificadas en el diagnóstico."
      />

      <GlassCard hover={false} padded={false} className="overflow-hidden">
        <div className="px-5 sm:px-6 py-3 border-b border-line bg-silk text-[11px] uppercase tracking-[0.22em] text-plum font-semibold">Ficha oficial</div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {FICHA.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.label} className="flex items-start gap-3 p-4 sm:p-5 border-b lg:border-b-0 lg:border-r last:border-r-0 border-line">
                <Icon size={17} className="shrink-0 mt-0.5 text-plum" />
                <div className="min-w-0">
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">{f.label}</dt>
                  <dd className="text-sm font-medium text-ink leading-snug mt-0.5">{f.value}</dd>
                </div>
              </div>
            );
          })}
        </dl>
      </GlassCard>

      <section className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">7.a Planes de clase</p>
            <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-ink">Selecciona un plan</h3>
          </div>
          <p className="flex items-center gap-2 rounded-2xl border border-sand-line bg-sand px-4 py-2.5 text-xs sm:text-sm text-bronze-dark">
            <TriangleAlert size={15} className="shrink-0" /> Planes propuestos, sujetos a validación con el docente tutor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3" role="tablist" aria-label="Planes de clase">
          {PLANS.map((p) => {
            const Icon = p.icon;
            const isActive = p.id === active;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(p.id)}
                className={cx(
                  'flex items-start gap-4 rounded-3xl border p-5 text-left transition-all',
                  isActive ? 'border-plum bg-plum text-white shadow-sm' : 'border-line bg-white shadow-paper hover:border-line-strong'
                )}
              >
                <span className={cx('font-serif text-4xl font-semibold leading-none', isActive ? 'text-[#E5D5B5]' : 'text-bronze')}>{p.n}</span>
                <div className="min-w-0">
                  <Icon size={18} className={isActive ? 'text-white' : 'text-plum'} />
                  <p className={cx('mt-2 font-semibold leading-snug', isActive ? 'text-white' : 'text-ink')}>{p.title}</p>
                  <p className={cx('mt-1 text-xs', isActive ? 'text-on-plum-muted' : 'text-muted')}>{p.axis}</p>
                </div>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={plan.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <PlanViewer plan={plan} />
          </motion.div>
        </AnimatePresence>
      </section>

      <Divider />

      <section className="space-y-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">7.b Adaptaciones realizadas</p>
          <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-ink">Según las necesidades del grupo</h3>
          <p className="mt-2 text-[15px] text-body max-w-3xl">Cada adaptación responde a un hallazgo concreto del diagnóstico y se aplica de forma transversal en los tres planes.</p>
        </div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ADAPTATIONS.map((a) => {
            const Icon = a.icon;
            return (
              <motion.article key={a.n} variants={fadeUp}>
                <GlassCard className="h-full" padded={false}>
                  <div className="p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-4xl font-semibold text-bronze leading-none">{a.n}</span>
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-lilac border border-lilac-line text-plum">
                          <Icon size={20} />
                        </span>
                      </div>
                    </div>
                    <div className="mt-5 rounded-2xl border border-wine-line bg-wine-soft px-4 py-3">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-wine font-bold">Necesidad detectada</span>
                      <p className="text-sm text-ink mt-0.5">
                        <span className="font-semibold">{a.need.value}</span> · {a.need.label}
                      </p>
                    </div>
                    <div className="my-3 flex justify-center text-line-strong" aria-hidden="true">
                      <ArrowRight size={18} className="rotate-90" />
                    </div>
                    <p className="font-serif text-2xl font-semibold text-ink leading-snug">{a.title}</p>
                    <p className="mt-2 text-sm text-body leading-relaxed">{a.text}</p>
                  </div>
                  <div className="border-t border-line bg-sage-soft px-6 sm:px-7 py-4 rounded-b-3xl flex gap-2.5">
                    <CircleCheck size={17} className="shrink-0 mt-0.5 text-sage" />
                    <p className="text-sm text-ink">{a.applied}</p>
                  </div>
                </GlassCard>
              </motion.article>
            );
          })}
        </motion.div>
      </section>
    </PageShell>
  );
}
