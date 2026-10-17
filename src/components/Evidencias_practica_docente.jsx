import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image as ImageIcon,
  Eye,
  MessagesSquare,
  ClipboardList,
  ChartGantt,
  BookOpen,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Camera,
  MapPin,
  CalendarDays,
  Layers,
  Footprints,
  MonitorSmartphone,
  Shapes,
  Hourglass,
  ArrowUpRight,
  CircleCheck,
  CircleDashed,
  Maximize2,
} from 'lucide-react';
import { PageShell, SectionHeader, Badge, SearchInput, FilterChips, Modal, EmptyState, Divider } from './ui/Primitives';
import { cx, normalize, fadeUp, stagger } from './ui/tokens';

/* =====================================================================
   EVIDENCIAS DE LA PRÁCTICA DOCENTE · Carrusel, galería y visor
   ===================================================================== */

const CATEGORIES = {
  campo: { label: 'Trabajo de Campo', icon: Footprints, toneName: 'violet' },
  instrumentos: { label: 'Instrumentos Digitales', icon: MonitorSmartphone, toneName: 'indigo' },
  materiales: { label: 'Materiales Didácticos', icon: Shapes, toneName: 'amber' },
  proximas: { label: 'Próximas Jornadas', icon: Hourglass, toneName: 'slate' },
};

/**
 * Evidencias documentadas. Para mostrar una fotografía, coloca el archivo en /public
 * y escribe su ruta en `image` (por ejemplo '/evidencias/observacion.jpg').
 */
const EVIDENCES = [
  {
    id: 'ev1',
    n: 1,
    category: 'campo',
    icon: Eye,
    title: 'Visita y observación sistemática',
    place: 'Instituto Nacional Dr. Francisco Martínez Suárez',
    date: '22/08/2026 · 10:30 a.m.',
    image: null,
    description:
      'Observación directa de la clase de Ciencias Naturales y Tecnología con la guía de 20 indicadores organizados en cuatro dimensiones: estudiantado, entorno físico y tecnológico, práctica pedagógica e interacción.',
    details: [
      'Instrumento 5.6.1: guía de observación sistemática.',
      'Docente observado: Lcdo. Amilcar Heriberto Sánchez.',
      '14 de los 20 indicadores se registraron en nivel óptimo.',
    ],
    link: { tab: 'planificacion', sub: 'diagnostico', label: 'Ver la guía en el diagnóstico' },
  },
  {
    id: 'ev2',
    n: 2,
    category: 'campo',
    icon: MessagesSquare,
    title: 'Entrevistas al coordinador y al docente tutor',
    place: 'Instituto Nacional Dr. Francisco Martínez Suárez',
    date: '12/09/2026',
    image: null,
    description:
      'Entrevistas presenciales con el coordinador de Modalidades Flexibles, Gerardo, y con el docente tutor, Lcdo. Amilcar Sánchez, de diez preguntas cada una, sobre la organización institucional, el perfil del grupo y las prácticas pedagógicas.',
    details: [
      'Instrumentos 5.6.3 y 5.6.4: guías de entrevista.',
      'Respuestas analizadas en las Tablas 1 y 2 del informe.',
      'Convergencias: perfil adulto y brecha de competencias digitales.',
    ],
    link: { tab: 'planificacion', sub: 'diagnostico', label: 'Ver las entrevistas' },
  },
  {
    id: 'ev3',
    n: 3,
    category: 'instrumentos',
    icon: ClipboardList,
    title: 'Cuestionario diagnóstico en Google Forms',
    place: '1.° Año de Bachillerato · Modalidad flexible',
    date: '12/09/2026',
    image: null,
    description:
      'Aplicación del cuestionario de 13 preguntas, organizadas en 8 secciones, a 11 estudiantes de Primer Año de Bachillerato, sobre perfil, hábitos, motivación, tecnología y apoyo docente.',
    details: ['Instrumento 5.6.2: encuesta en línea.', 'N = 11 estudiantes encuestados.', 'Resultados en las Tablas 3 a 14 del informe.'],
    link: { tab: 'planificacion', sub: 'diagnostico', label: 'Ver los resultados' },
  },
  {
    id: 'ev4',
    n: 4,
    category: 'instrumentos',
    icon: ChartGantt,
    title: 'Planificación y seguimiento con diagrama de Gantt',
    place: 'Gestión del proyecto diagnóstico',
    date: 'Agosto – septiembre 2026',
    image: null,
    description: 'Seguimiento del proyecto diagnóstico mediante un cronograma de 18 actividades en tres etapas (antes, durante y después) y su diagrama de Gantt con dependencias.',
    details: ['18 actividades del 12/08/2026 al 20/09/2026.', 'Tres hitos: observación, trabajo de campo y entrega.', 'Responsable: Stephanie Hernández.'],
    link: { tab: 'planificacion', sub: 'planeacion', label: 'Ver el cronograma' },
  },
  {
    id: 'ev5',
    n: 5,
    category: 'materiales',
    icon: BookOpen,
    title: 'Recurso “Guía de Éxito para el Aula Invertida”',
    place: 'Propuesta de mejora',
    date: 'Ciclo II-2026',
    image: null,
    description:
      'Diseño del recurso pedagógico digital de cuatro módulos (aula invertida, gestión del tiempo, estudio paso a paso y herramientas digitales) y de materiales de Ciencias Naturales para la propuesta de mejora.',
    details: ['Cuatro módulos con actividades interactivas.', 'Temporizador Pomodoro y reto semanal.', 'Diseño Mobile-First para estudiar desde el celular.'],
    link: { tab: 'cierre', sub: 'propuesta', label: 'Abrir la propuesta' },
  },
];

const RESERVED = [
  { id: 'r4', n: 6, title: 'Jornada 4 de práctica docente', hint: 'Fotografías de la primera tutoría a cargo de la practicante.' },
  { id: 'r5', n: 7, title: 'Jornada 5 de práctica docente', hint: 'Evidencias de la práctica experimental y del trabajo en equipo.' },
  { id: 'r6', n: 8, title: 'Jornada 6 de práctica docente', hint: 'Productos del estudiantado y cierre de la secuencia didáctica.' },
].map((r) => ({
  ...r,
  category: 'proximas',
  icon: CalendarClock,
  place: 'Instituto Nacional Dr. Francisco Martínez Suárez',
  date: 'Por registrar',
  image: null,
  reserved: true,
  description: `${r.hint} Este espacio está reservado para documentar la jornada cuando se realice.`,
  details: ['Fotografías de la sesión (con consentimiento).', 'Materiales utilizados y productos del grupo.', 'Breve descripción de lo realizado.'],
}));

const ALL = [...EVIDENCES, ...RESERVED];

/* ---------------------------------------------------------------------
   Sub-componentes
   --------------------------------------------------------------------- */

function EvidenceVisual({ item, large = false }) {
  const Icon = item.icon;
  if (item.image) {
    return <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />;
  }
  return (
    <div className={cx('absolute inset-0 flex flex-col items-center justify-center text-center p-6', item.reserved ? 'bg-ivory' : 'bg-silk')}>
      <div className="absolute inset-4 rounded-2xl border border-dashed border-line-strong" aria-hidden="true" />
      <span
        className={cx(
          'relative inline-flex items-center justify-center rounded-full border bg-white',
          large ? 'h-24 w-24' : 'h-16 w-16',
          item.reserved ? 'border-line-strong text-muted' : 'border-plum text-plum'
        )}
      >
        <Icon size={large ? 40 : 28} />
      </span>
      <span className="relative mt-3 inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-muted font-semibold">
        <Camera size={13} /> {item.reserved ? 'Reservado para fotografías' : 'Fotografía por incorporar'}
      </span>
    </div>
  );
}

function Carousel({ items, onOpen }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const item = items[index];

  const go = (delta) => {
    setDirection(delta);
    setIndex((i) => (i + delta + items.length) % items.length);
  };

  return (
    <div
      className="rounded-[2rem] border border-line bg-white shadow-paper-lg overflow-hidden"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Evidencias destacadas"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
    >
      <div className="relative">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={item.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              if (info.offset.x > 60) go(-1);
            }}
            className="grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[420px]">
              <EvidenceVisual item={item} large />
              <span className="absolute left-4 top-4 rounded-full bg-white border border-line px-3 py-1 text-xs font-semibold text-plum">
                Evidencia {item.n} de {items.length}
              </span>
            </div>
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col">
              <Badge toneName={CATEGORIES[item.category].toneName} icon={CATEGORIES[item.category].icon} className="self-start">
                {CATEGORIES[item.category].label}
              </Badge>
              <h3 className="mt-4 font-serif text-3xl sm:text-4xl font-semibold text-ink leading-tight">{item.title}</h3>
              <div className="mt-3 space-y-1 text-sm text-muted">
                <p className="flex items-center gap-2">
                  <CalendarDays size={15} className="text-bronze" /> {item.date}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={15} className="text-bronze" /> {item.place}
                </p>
              </div>
              <p className="mt-4 text-[15px] text-body leading-relaxed flex-1">{item.description}</p>
              <button
                type="button"
                onClick={() => onOpen(item)}
                className="mt-6 self-start min-h-[44px] inline-flex items-center gap-2 rounded-2xl bg-plum hover:bg-plum-dark px-5 text-sm font-semibold text-white shadow-sm transition-colors"
              >
                <Maximize2 size={16} /> Abrir en el visor
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-line bg-ivory px-4 sm:px-6 py-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Evidencia anterior"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-plum hover:bg-lilac transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          {items.map((it, i) => (
            <button
              key={it.id}
              type="button"
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              aria-label={`Ir a la evidencia ${i + 1}`}
              aria-current={i === index}
              className={cx('h-2.5 rounded-full transition-all', i === index ? 'w-8 bg-plum' : 'w-2.5 bg-line-strong hover:bg-muted')}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Evidencia siguiente"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-plum hover:bg-lilac transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

function GalleryCard({ item, onOpen }) {
  const cat = CATEGORIES[item.category];
  return (
    <motion.article variants={fadeUp} layout>
      <button
        type="button"
        onClick={() => onOpen(item)}
        className={cx(
          'group w-full text-left rounded-3xl border overflow-hidden transition-all',
          item.reserved ? 'border-dashed border-line-strong bg-ivory hover:border-plum' : 'border-line bg-white shadow-paper hover:shadow-paper-lg hover:border-line-strong'
        )}
      >
        <div className="relative aspect-[4/3]">
          <EvidenceVisual item={item} />
          <span className="absolute right-3 top-3 font-serif text-2xl font-semibold text-bronze bg-white/90 rounded-xl px-2.5 py-0.5 border border-line">
            {String(item.n).padStart(2, '0')}
          </span>
        </div>
        <div className="p-5">
          <Badge toneName={cat.toneName} icon={cat.icon}>
            {cat.label}
          </Badge>
          <p className="mt-3 font-serif text-xl font-semibold text-ink leading-snug">{item.title}</p>
          <p className="mt-1 text-xs text-muted flex items-center gap-1.5">
            <CalendarDays size={13} /> {item.date}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-plum">
            {item.reserved ? 'Ver qué documentar' : 'Ver detalle'} <ArrowUpRight size={15} />
          </span>
        </div>
      </button>
    </motion.article>
  );
}

function EvidenceViewer({ item, onPrev, onNext, onNavigate, position }) {
  if (!item) return null;
  return (
    <div className="space-y-6">
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-line">
        <EvidenceVisual item={item} large />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge toneName={CATEGORIES[item.category].toneName}>{CATEGORIES[item.category].label}</Badge>
        <Badge toneName="slate" icon={CalendarDays}>
          {item.date}
        </Badge>
      </div>
      <p className="text-[15px] text-body leading-relaxed">{item.description}</p>
      <ul className="space-y-2">
        {item.details.map((d) => (
          <li key={d} className="flex gap-2.5 text-sm text-body">
            {item.reserved ? <CircleDashed size={16} className="shrink-0 mt-0.5 text-muted" /> : <CircleCheck size={16} className="shrink-0 mt-0.5 text-sage" />}
            {d}
          </li>
        ))}
      </ul>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-line pt-5">
        <div className="flex gap-2">
          <button type="button" onClick={onPrev} className="min-h-[42px] inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 text-sm font-semibold text-plum hover:bg-lilac">
            <ChevronLeft size={16} /> Anterior
          </button>
          <button type="button" onClick={onNext} className="min-h-[42px] inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 text-sm font-semibold text-plum hover:bg-lilac">
            Siguiente <ChevronRight size={16} />
          </button>
          <span className="self-center text-xs text-muted tabular-nums">{position}</span>
        </div>
        {item.link && onNavigate && (
          <button
            type="button"
            onClick={() => onNavigate(item.link.tab, item.link.sub)}
            className="min-h-[42px] inline-flex items-center justify-center gap-1.5 rounded-xl bg-plum hover:bg-plum-dark px-4 text-sm font-semibold text-white"
          >
            {item.link.label} <ArrowUpRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Evidencias_practica_docente({ onNavigate }) {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(null);
  const q = normalize(query.trim());

  const filtered = useMemo(
    () => ALL.filter((e) => (category === 'all' || e.category === category) && (!q || normalize(`${e.title} ${e.description} ${e.date} ${e.place}`).includes(q))),
    [category, q]
  );

  const openIndex = filtered.findIndex((e) => e.id === openId);
  const openItem = openIndex >= 0 ? filtered[openIndex] : ALL.find((e) => e.id === openId) || null;
  const step = (delta) => {
    const list = openIndex >= 0 ? filtered : ALL;
    const i = list.findIndex((e) => e.id === openId);
    setOpenId(list[(i + delta + list.length) % list.length].id);
  };

  const options = [
    { id: 'all', label: 'Todas', icon: Layers, count: ALL.length },
    ...Object.entries(CATEGORIES).map(([id, c]) => ({ id, label: c.label, icon: c.icon, count: ALL.filter((e) => e.category === id).length })),
  ];

  const documented = EVIDENCES.length;

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Evidencias de la práctica"
        icon={ImageIcon}
        title="Evidencias de la"
        highlight="práctica docente"
        description="Registro visual y documental del trabajo de campo, los instrumentos digitales y los materiales elaborados durante la práctica."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {[
          { v: documented, l: 'Evidencias documentadas', d: 'Trabajo de campo, instrumentos y materiales' },
          { v: RESERVED.length, l: 'Espacios reservados', d: 'Para las próximas jornadas de práctica' },
          { v: 'Ago – Sep', l: 'Periodo documentado', d: 'Del 22/08/2026 al cierre del informe diagnóstico' },
        ].map((s) => (
          <div key={s.l} className="rounded-3xl border border-line bg-white shadow-paper p-5">
            <span className="block font-serif text-4xl font-semibold text-plum leading-none">{s.v}</span>
            <span className="block mt-2 text-sm font-semibold text-ink">{s.l}</span>
            <span className="block text-xs text-muted mt-0.5">{s.d}</span>
          </div>
        ))}
      </div>

      <section className="space-y-5">
        <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-ink">Evidencias destacadas</h3>
        <Carousel items={EVIDENCES} onOpen={(it) => setOpenId(it.id)} />
        <p className="text-xs text-muted">Usa las flechas, los puntos, el teclado o desliza con el dedo para recorrer las evidencias.</p>
      </section>

      <Divider />

      <section className="space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-ink">Galería completa</h3>
            <p className="text-sm text-muted mt-1">
              <span className="font-semibold text-plum tabular-nums">{filtered.length}</span> elementos visibles
            </p>
          </div>
          <SearchInput value={query} onChange={setQuery} placeholder="Buscar evidencia..." className="lg:max-w-sm" />
        </div>
        <FilterChips options={options} value={category} onChange={setCategory} />
        {filtered.length === 0 ? (
          <EmptyState title="Sin evidencias" description="Ninguna evidencia coincide con la categoría o la búsqueda." />
        ) : (
          <motion.div key={`${category}-${q}`} initial="hidden" animate="show" variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((e) => (
              <GalleryCard key={e.id} item={e} onOpen={(it) => setOpenId(it.id)} />
            ))}
          </motion.div>
        )}
      </section>

      <Modal open={Boolean(openItem)} onClose={() => setOpenId(null)} title={openItem?.title} subtitle={openItem?.place} icon={openItem?.icon} size="lg">
        <EvidenceViewer
          item={openItem}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          onNavigate={
            onNavigate
              ? (tab, sub) => {
                  setOpenId(null);
                  onNavigate(tab, sub);
                }
              : null
          }
          position={openIndex >= 0 ? `${openIndex + 1} / ${filtered.length}` : ''}
        />
      </Modal>
    </PageShell>
  );
}
