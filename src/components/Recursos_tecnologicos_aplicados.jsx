import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Laptop,
  MonitorSmartphone,
  FileText,
  PlayCircle,
  Palette,
  Gamepad2,
  Video,
  MessageCircle,
  Building2,
  Layers,
  BookOpen,
  PenTool,
  Trophy,
  Radio,
  Atom,
  ArrowUpRight,
  Accessibility,
  Check,
  Minus,
  ChartBar,
  CircleCheck,
} from 'lucide-react';
import { PageShell, GlassCard, SectionHeader, Badge, SearchInput, FilterChips, Modal, HorizontalBars, EmptyState, Divider } from './ui/Primitives';
import { cx, normalize, fadeUp, stagger } from './ui/tokens';

/* =====================================================================
   RECURSOS TECNOLÓGICOS APLICADOS · Catálogo TPACK
   ===================================================================== */

const CATEGORIES = {
  plataformas: { label: 'Plataformas EVA', icon: MonitorSmartphone },
  contenidos: { label: 'Contenidos', icon: BookOpen },
  creacion: { label: 'Creación', icon: PenTool },
  gamificacion: { label: 'Gamificación', icon: Trophy },
  comunicacion: { label: 'Comunicación', icon: Radio },
  infraestructura: { label: 'Infraestructura', icon: Building2 },
};

const STATUS = {
  institucion: { label: 'En uso en la institución', toneName: 'emerald' },
  propuesta: { label: 'Integrado en la propuesta', toneName: 'violet' },
  propuesto: { label: 'Propuesto', toneName: 'amber' },
};

const MOMENTS = {
  antes: { label: 'Antes', hint: 'En casa, antes de la tutoría' },
  durante: { label: 'Durante', hint: 'Tutoría sabatina' },
  despues: { label: 'Después', hint: 'Seguimiento entre semana' },
};

const RESOURCES = [
  {
    id: 'eva',
    name: 'Google Classroom y Moodle',
    icon: MonitorSmartphone,
    category: 'plataformas',
    status: 'institucion',
    metric: { value: 90.9, display: '90.9%', label: 'de los estudiantes recurre a estas plataformas para revisar sus materias', source: 'Encuesta · P12' },
    summary: 'Entorno virtual principal para distribuir los módulos, publicar las cápsulas y recibir las actividades exaula.',
    application:
      'Se utilizan para publicar los materiales del “Antes” de cada lección de Ciencias Naturales, entregar las actividades del final de cada lección y devolver retroalimentación escrita.',
    tpack: {
      C: 'Organización del módulo por lecciones y temas científicos.',
      P: 'Secuencia del aula invertida y seguimiento del trabajo autónomo.',
      T: 'Aplicación móvil, notificaciones y entrega de archivos.',
    },
    access: 'Disponible como aplicación móvil y en el navegador; los archivos pueden descargarse para estudiar sin conexión.',
    moments: ['antes', 'despues'],
  },
  {
    id: 'pdf',
    name: 'Módulos digitales e impresos en PDF',
    icon: FileText,
    category: 'contenidos',
    status: 'institucion',
    metric: { value: 45.5, display: '45.5%', label: 'usa lecturas o archivos PDF para revisar sus materias', source: 'Encuesta · P12' },
    summary: 'Material base de cada asignatura, entregado en formato impreso y digital.',
    application:
      'Sostienen la lectura activa de los contenidos científicos y permiten estudiar sin consumir datos una vez descargados, una alternativa clave para quienes tienen conexión inestable.',
    tpack: {
      C: 'Contenidos oficiales de Ciencias Naturales y Tecnología.',
      P: 'Lectura activa: subrayado, notas y resúmenes.',
      T: 'Archivos ligeros, descargables e imprimibles.',
    },
    access: 'Funcionan sin conexión y en cualquier dispositivo; la versión impresa elimina la barrera tecnológica.',
    moments: ['antes', 'despues'],
  },
  {
    id: 'videos',
    name: 'Videos explicativos y simulaciones interactivas',
    icon: PlayCircle,
    category: 'contenidos',
    status: 'propuesta',
    metric: { value: 45.5, display: '45.5%', label: 'señala que los videos explicativos le ayudan a entender mejor los temas', source: 'Encuesta · P6' },
    summary: 'Primer contacto visual con los conceptos y experimentos en el modelo de aula invertida.',
    application:
      'Cápsulas breves para visualizar conceptos y experimentos científicos antes de la tutoría, y simulaciones interactivas para observar fenómenos difíciles de reproducir en el aula.',
    tpack: {
      C: 'Fenómenos físicos, químicos y biológicos observables.',
      P: 'Aprendizaje visual y a ritmo propio (pausar y repetir).',
      T: 'Videos cortos y simulaciones que funcionan en el navegador.',
    },
    access: 'Cápsulas de 5 a 8 minutos y en baja resolución para reducir el consumo de datos.',
    moments: ['antes', 'durante'],
  },
  {
    id: 'canva',
    name: 'Canva y Genially',
    icon: Palette,
    category: 'creacion',
    status: 'propuesta',
    metric: null,
    summary: 'Herramientas de creación visual para que el estudiantado produzca y no solo consuma contenidos.',
    application:
      'Elaboración de infografías científicas, presentaciones interactivas y mapas mentales como productos de aprendizaje y como apoyo visual ante las dificultades de lectoescritura.',
    tpack: {
      C: 'Síntesis de conceptos y procesos científicos.',
      P: 'Aprendizaje por producto y organización visual de ideas.',
      T: 'Plantillas editables desde el celular o la computadora.',
    },
    access: 'Versiones gratuitas y plantillas que reducen la dificultad de diseño.',
    moments: ['despues'],
  },
  {
    id: 'kahoot',
    name: 'Kahoot! y Quizizz',
    icon: Gamepad2,
    category: 'gamificacion',
    status: 'propuesta',
    metric: { value: 45.5, display: '45.5%', label: 'prefiere dinámicas o juegos interactivos para aprender', source: 'Encuesta · P6' },
    summary: 'Evaluación formativa gamificada para el cierre de cada tutoría.',
    application:
      'Cuestionarios en vivo al final de la tutoría sabatina para comprobar la comprensión, y en modo tarea para quienes no pudieron asistir.',
    tpack: {
      C: 'Preguntas sobre los conceptos clave de la lección.',
      P: 'Evaluación formativa con retroalimentación inmediata.',
      T: 'Participación desde el celular con un código.',
    },
    access: 'Se juega desde el navegador del celular; Quizizz permite responder a tu ritmo y sin presión de tiempo.',
    moments: ['durante', 'despues'],
  },
  {
    id: 'meet',
    name: 'Google Meet',
    icon: Video,
    category: 'comunicacion',
    status: 'propuesto',
    metric: { value: 0, display: '0%', label: 'usa actualmente videollamadas para estudiar', source: 'Encuesta · P12' },
    summary: 'Propuesto por el docente tutor para reforzar entre semana, fuera del horario sabatino.',
    application: 'Sesiones opcionales de refuerzo de 30 a 40 minutos entre semana, grabadas para quienes no puedan conectarse en el horario acordado.',
    tpack: {
      C: 'Temas con mayor dificultad detectada en la tutoría.',
      P: 'Acompañamiento síncrono y resolución de dudas.',
      T: 'Videollamada desde el celular con la cuenta institucional.',
    },
    access: 'Asistencia voluntaria y grabación como alternativa ante conexión limitada.',
    moments: ['despues'],
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp académico',
    icon: MessageCircle,
    category: 'comunicacion',
    status: 'institucion',
    metric: null,
    summary: 'Canal directo de comunicación con el docente durante la semana.',
    application: 'Resolución de dudas entre semana, avisos de publicación de materiales y recordatorios de fechas de entrega.',
    tpack: {
      C: 'Dudas puntuales sobre actividades y contenidos.',
      P: 'Acompañamiento cercano y comunicación oportuna.',
      T: 'Aplicación ya conocida y usada por todo el grupo.',
    },
    access: 'Consumo de datos muy bajo; funciona en cualquier smartphone.',
    moments: ['antes', 'despues'],
  },
  {
    id: 'lab',
    name: 'Laboratorio de informática y equipo audiovisual',
    icon: Building2,
    category: 'infraestructura',
    status: 'institucion',
    metric: { value: null, display: '30 PC', label: '6 + 1 proyectores, bocinas y red del MINED', source: 'Entrevista al coordinador' },
    summary: 'Infraestructura institucional disponible durante la jornada sabatina.',
    application:
      'Talleres exprés de alfabetización digital, proyección de cápsulas y simulaciones, y prácticas guiadas con documentos y presentaciones.',
    tpack: {
      C: 'Demostraciones y prácticas de Ciencias Naturales.',
      P: 'Práctica guiada y trabajo en equipo.',
      T: 'Computadoras, proyectores, audio e Internet institucional.',
    },
    access: 'Compensa la falta de computadora en el hogar; requiere actualización de software y planificar su uso compartido.',
    moments: ['durante'],
  },
];

const TPACK_LABELS = { C: 'Contenido', P: 'Pedagogía', T: 'Tecnología' };

/* ---------------------------------------------------------------------
   Sub-componentes
   --------------------------------------------------------------------- */

function ResourceCard({ item, onOpen }) {
  const Icon = item.icon;
  const status = STATUS[item.status];
  return (
    <motion.article variants={fadeUp} layout className="h-full">
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="group h-full w-full text-left rounded-3xl border border-line bg-white shadow-paper hover:shadow-paper-lg hover:border-line-strong transition-all flex flex-col overflow-hidden"
      >
        <div className="p-5 sm:p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-lilac border border-lilac-line text-plum group-hover:bg-plum group-hover:text-white transition-colors">
              <Icon size={22} />
            </span>
            <Badge toneName={status.toneName}>{status.label}</Badge>
          </div>
          <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold">{CATEGORIES[item.category].label}</p>
          <h3 className="mt-1 font-serif text-2xl font-semibold text-ink leading-tight">{item.name}</h3>
          <p className="mt-2 text-sm text-body leading-relaxed flex-1">{item.summary}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.moments.map((m) => (
              <span key={m} className="rounded-full border border-line bg-ivory px-2.5 py-0.5 text-[11px] font-semibold text-plum">
                {MOMENTS[m].label}
              </span>
            ))}
          </div>
        </div>
        <div className="border-t border-line bg-ivory px-5 sm:px-6 py-4">
          {item.metric ? (
            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl font-semibold text-plum leading-none tabular-nums">{item.metric.display}</span>
              <span className="text-xs text-body leading-snug">{item.metric.label}</span>
            </div>
          ) : (
            <span className="text-xs text-muted">Recurso de apoyo sin indicador cuantitativo en el diagnóstico</span>
          )}
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-plum">
            Ver aplicación TPACK <ArrowUpRight size={14} />
          </span>
        </div>
      </button>
    </motion.article>
  );
}

function ResourceDetail({ item }) {
  if (!item) return null;
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Badge toneName={STATUS[item.status].toneName}>{STATUS[item.status].label}</Badge>
        <Badge toneName="slate">{CATEGORIES[item.category].label}</Badge>
      </div>
      {item.metric && (
        <div className="rounded-2xl border border-sand-line bg-sand p-4 flex items-center gap-4">
          <span className="font-serif text-4xl font-semibold text-bronze-dark leading-none">{item.metric.display}</span>
          <div>
            <p className="text-sm text-ink leading-snug">{item.metric.label}</p>
            <p className="text-xs text-muted mt-0.5">{item.metric.source}</p>
          </div>
        </div>
      )}
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-2">Aplicación en Ciencias Naturales</p>
        <p className="text-[15px] text-body leading-relaxed">{item.application}</p>
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-3 flex items-center gap-2">
          <Atom size={14} /> Lectura TPACK
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Object.entries(item.tpack).map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-lilac-line bg-lilac p-4">
              <span className="font-serif text-2xl font-semibold text-plum leading-none">{k}</span>
              <p className="text-[11px] uppercase tracking-[0.16em] text-plum font-semibold mt-1">{TPACK_LABELS[k]}</p>
              <p className="text-sm text-ink leading-relaxed mt-2">{v}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-2">Momento del aula invertida</p>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(MOMENTS).map(([k, m]) => {
            const on = item.moments.includes(k);
            return (
              <div key={k} className={cx('rounded-xl border p-3 text-center', on ? 'border-plum bg-plum text-white' : 'border-line bg-ivory text-muted')}>
                <p className="text-sm font-semibold">{m.label}</p>
                <p className={cx('text-[11px] leading-tight mt-0.5', on ? 'text-on-plum-muted' : 'text-muted')}>{m.hint}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="rounded-2xl border border-sage-line bg-sage-soft p-4 flex gap-3">
        <Accessibility size={18} className="shrink-0 mt-0.5 text-sage" />
        <p className="text-sm text-ink leading-relaxed">{item.access}</p>
      </div>
    </div>
  );
}

function MomentsMatrix() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {RESOURCES.map((r) => (
          <div key={r.id} className="rounded-2xl border border-line bg-white shadow-paper p-4">
            <p className="font-semibold text-ink">{r.name}</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {Object.entries(MOMENTS).map(([k, m]) => {
                const on = r.moments.includes(k);
                return (
                  <span key={k} className={cx('rounded-lg border px-2 py-1.5 text-center text-xs font-semibold', on ? 'border-plum bg-plum text-white' : 'border-line bg-ivory text-muted')}>
                    {m.label}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="hidden md:block overflow-x-auto rounded-3xl border border-line bg-white shadow-paper">
        <table className="w-full min-w-[680px] text-sm">
          <thead>
            <tr className="bg-silk text-[11px] uppercase tracking-[0.14em] text-muted">
              <th className="px-5 py-3.5 text-left font-semibold">Recurso</th>
              {Object.entries(MOMENTS).map(([k, m]) => (
                <th key={k} className="px-4 py-3.5 text-center font-semibold w-36">
                  {m.label}
                  <span className="block normal-case tracking-normal font-normal text-[11px] text-muted">{m.hint}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RESOURCES.map((r) => {
              const Icon = r.icon;
              return (
                <tr key={r.id} className="border-t border-line hover:bg-ivory transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-2.5 font-medium text-ink">
                      <Icon size={16} className="text-plum" /> {r.name}
                    </span>
                  </td>
                  {Object.keys(MOMENTS).map((k) => (
                    <td key={k} className="px-4 py-3.5 text-center">
                      {r.moments.includes(k) ? (
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-plum text-white">
                          <Check size={15} />
                        </span>
                      ) : (
                        <Minus size={15} className="inline text-line-strong" />
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Recursos_tecnologicos_aplicados() {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const q = normalize(query.trim());

  const filtered = useMemo(
    () =>
      RESOURCES.filter(
        (r) =>
          (category === 'all' || r.category === category) &&
          (!q || normalize([r.name, r.summary, r.application, ...Object.values(r.tpack)].join(' ')).includes(q))
      ),
    [category, q]
  );

  const options = [
    { id: 'all', label: 'Todos', icon: Layers, count: RESOURCES.length },
    ...Object.entries(CATEGORIES).map(([id, c]) => ({ id, label: c.label, icon: c.icon, count: RESOURCES.filter((r) => r.category === id).length })),
  ];

  const chartData = RESOURCES.filter((r) => r.metric && typeof r.metric.value === 'number').map((r) => ({
    label: r.name,
    value: r.metric.source.replace('Encuesta · ', ''),
    percent: r.metric.value,
  }));

  const statusCounts = Object.keys(STATUS).map((k) => ({ id: k, ...STATUS[k], count: RESOURCES.filter((r) => r.status === k).length }));

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Apartado 12 · Recursos tecnológicos"
        icon={Laptop}
        title="Catálogo"
        highlight="TPACK"
        description="Herramientas digitales e infraestructura que sostienen el proceso de enseñanza-aprendizaje de Ciencias Naturales, con los indicadores reales del diagnóstico y su lectura desde el modelo TPACK."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <GlassCard hover={false} className="lg:col-span-7">
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-5">
            <ChartBar size={14} /> Adopción y preferencia estudiantil
          </p>
          <HorizontalBars data={chartData} max={100} />
          <p className="mt-4 text-xs text-muted">Porcentajes sobre N = 11 estudiantes. El número junto a cada barra indica la pregunta de la encuesta.</p>
        </GlassCard>
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
          {statusCounts.map((s) => (
            <div key={s.id} className="rounded-3xl border border-line bg-white shadow-paper p-5 flex items-center gap-4">
              <span className="font-serif text-5xl font-semibold text-plum leading-none">{s.count}</span>
              <div>
                <Badge toneName={s.toneName}>{s.label}</Badge>
                <p className="text-xs text-muted mt-1.5">de {RESOURCES.length} recursos del catálogo</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <section className="space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-ink">Explorar el catálogo</h3>
            <p className="text-sm text-muted mt-1">
              <span className="font-semibold text-plum tabular-nums">{filtered.length}</span> recursos · selecciona uno para ver su aplicación
            </p>
          </div>
          <SearchInput value={query} onChange={setQuery} placeholder="Buscar herramienta o uso..." className="lg:max-w-sm" />
        </div>
        <FilterChips options={options} value={category} onChange={setCategory} />

        {filtered.length === 0 ? (
          <EmptyState title="Sin recursos" description="Prueba con otra categoría o término de búsqueda." />
        ) : (
          <motion.div key={`${category}-${q}`} initial="hidden" animate="show" variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            <AnimatePresence>
              {filtered.map((r) => (
                <ResourceCard key={r.id} item={r} onOpen={setSelected} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <section className="space-y-5">
        <div className="flex items-start gap-3">
          <span className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-lilac border border-lilac-line text-plum">
            <CircleCheck size={19} />
          </span>
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">Recursos por momento del aula invertida</h3>
            <p className="text-sm text-muted mt-1">Cómo se distribuyen las herramientas antes, durante y después de la tutoría sabatina.</p>
          </div>
        </div>
        <MomentsMatrix />
      </section>

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title={selected?.name} subtitle={selected?.summary} icon={selected?.icon} size="lg">
        <ResourceDetail item={selected} />
      </Modal>
    </PageShell>
  );
}
