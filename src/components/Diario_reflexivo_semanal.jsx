import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  NotebookPen,
  CalendarDays,
  ListChecks,
  Puzzle,
  Lightbulb,
  Heart,
  ChevronDown,
  Maximize2,
  Minimize2,
  CircleCheck,
  CircleDashed,
  ArrowRight,
  Eye,
  MessagesSquare,
  GitMerge,
  CalendarClock,
  PenLine,
  Quote,
  HelpCircle,
} from 'lucide-react';
import { PageShell, SectionHeader, Badge, ProgressBar } from './ui/Primitives';
import { cx } from './ui/tokens';

/* =====================================================================
   DIARIO REFLEXIVO SEMANAL · Apartados 9.a a 9.d
   ===================================================================== */

const SECTIONS = [
  { key: 'activities', code: '9.a', label: 'Actividades realizadas', icon: ListChecks },
  { key: 'challenges', code: '9.b', label: 'Retos enfrentados y soluciones', icon: Puzzle },
  { key: 'learnings', code: '9.c', label: 'Aprendizajes obtenidos', icon: Lightbulb },
  { key: 'reflection', code: '9.d', label: 'Reflexión personal de la semana', icon: Heart },
];

const JOURNAL = [
  {
    id: 'j1',
    n: 1,
    icon: Eye,
    date: '22/08/2026',
    title: 'Inmersión en el contexto y observación sistemática',
    tags: ['Observación', 'Entorno físico y tecnológico', 'Trabajo en equipo'],
    activities: [
      'Visita al Instituto Nacional Dr. Francisco Martínez Suárez durante la jornada sabatina de la modalidad flexible.',
      'Observación de la clase de Ciencias Naturales y Tecnología del Lcdo. Amilcar Heriberto Sánchez, a partir de las 10:30 a.m.',
      'Registro de los 20 indicadores de la guía de observación en sus cuatro dimensiones.',
      'Análisis del entorno físico y tecnológico: iluminación, ventilación, mobiliario, computadoras, Internet y proyector.',
      'Observación de la dinámica de trabajo en equipo y de las prácticas de laboratorio.',
    ],
    challenges: [
      {
        challenge: 'Registrar de forma objetiva sin interferir en la dinámica de la clase.',
        solution: 'Me ubiqué en un punto discreto del aula, usé la escala de la guía y dejé las notas interpretativas para el final de la sesión.',
      },
      {
        challenge: 'Valorar condiciones que se cumplían solo en parte (iluminación, ventilación, mobiliario y equipos).',
        solution: 'Utilicé la opción “Parcialmente” de la escala y anoté qué elementos faltaban para no perder matices.',
      },
      {
        challenge: 'Diferenciar la interacción docente-estudiante de la interacción entre pares.',
        solution: 'Registré ambos indicadores por separado, lo que mostró que el respeto entre pares solo se observa algunas veces.',
      },
    ],
    learnings: [
      'La participación del grupo es alta: preguntan, trabajan en equipo y piden apoyo al docente.',
      'La iniciativa propia aparece solo algunas veces, lo que orienta a reforzar la autorregulación.',
      'El docente integra materiales, experimentos y plataformas digitales de forma constante.',
      'Observar con un instrumento estructurado permite ver lo que a simple vista pasaría desapercibido.',
    ],
    reflection:
      'Esta primera jornada me permitió conocer al grupo más allá de los datos. Ver a personas adultas que, después de una semana de trabajo, dedican su sábado a aprender Ciencias me hizo comprender que mi práctica debe partir de esa motivación y, al mismo tiempo, considerar condiciones físicas y tecnológicas que no siempre son las ideales.',
  },
  {
    id: 'j2',
    n: 2,
    icon: MessagesSquare,
    date: '12/09/2026',
    title: 'Aplicación de instrumentos: voces de estudiantes, tutor y coordinación',
    tags: ['Encuesta N = 11', 'Entrevista al tutor', 'Entrevista al coordinador'],
    activities: [
      'Aplicación del cuestionario diagnóstico en Google Forms a 11 estudiantes de 1.° Año de Bachillerato.',
      'Entrevista al docente tutor, Lcdo. Amilcar Heriberto Sánchez, con una guía de 10 preguntas.',
      'Entrevista al coordinador de Modalidades Flexibles, Gerardo, con una guía de 10 preguntas.',
      'Registro literal de las respuestas para su análisis posterior.',
    ],
    challenges: [
      {
        challenge: 'Aplicar tres instrumentos en una misma jornada sin restar tiempo a la clase.',
        solution: 'Seguí la secuencia del cronograma (cuestionario, tutor y coordinador) y preparé con anticipación el enlace y las guías.',
      },
      {
        challenge: 'Facilitar que todos los estudiantes respondieran el formulario desde sus dispositivos.',
        solution: 'Usé un cuestionario breve, de 13 preguntas y mayormente cerradas, que puede responderse desde el celular.',
      },
      {
        challenge: 'Registrar las respuestas abiertas sin perder su sentido.',
        solution: 'Transcribí las respuestas de forma literal y las organicé por pregunta y por dimensión.',
      },
    ],
    learnings: [
      'El tutor y el coordinador coinciden en la madurez del grupo y en su dificultad para usar la computadora.',
      'El 90.9% del grupo se siente motivado, pese a sus responsabilidades laborales y familiares.',
      'La institución tiene equipo y red; la brecha está en el hogar y en las competencias de uso.',
    ],
    reflection:
      'Escuchar al tutor y al coordinador me ayudó a entender el contexto desde dos miradas complementarias: la pedagógica y la institucional. Las respuestas de los estudiantes me recordaron que detrás de cada porcentaje hay personas que trabajan, cuidan a sus hijos y viajan desde otros municipios para estudiar.',
  },
  {
    id: 'j3',
    n: 3,
    icon: GitMerge,
    date: '13/09/2026 – 20/09/2026',
    title: 'Triangulación diagnóstica, matriz FODA y propuesta pedagógica',
    tags: ['Triangulación', 'Matriz FODA', 'Propuesta de mejora'],
    activities: [
      'Integración y organización de la información de los cuatro instrumentos.',
      'Análisis e interpretación de las 12 preguntas cerradas y de la pregunta abierta.',
      'Elaboración de las Tablas 1 y 2 de análisis de las entrevistas.',
      'Construcción de la matriz FODA (Tabla 15), las conclusiones y las recomendaciones.',
      'Redacción, revisión y entrega del informe diagnóstico el 20/09/2026.',
    ],
    challenges: [
      {
        challenge: 'Contrastar datos cuantitativos y cualitativos de cuatro fuentes distintas.',
        solution: 'Construí una matriz de triangulación por hallazgo y por fuente para identificar convergencias y contrastes.',
      },
      {
        challenge: 'Interpretar la tensión entre la alta motivación y la brecha digital.',
        solution: 'Separé el acceso institucional del acceso en el hogar, lo que aclaró dónde está realmente la brecha.',
      },
      {
        challenge: 'Concentrar el análisis y la redacción en una sola semana.',
        solution: 'Seguí la ruta del cronograma con sus dependencias, cerrando cada producto antes de iniciar el siguiente.',
      },
    ],
    learnings: [
      'La triangulación evita conclusiones basadas en una sola fuente.',
      'Una propuesta es coherente solo si cada acción responde a un hallazgo concreto.',
      'La tecnología debe elegirse por su propósito didáctico y no por tendencia (TPACK).',
    ],
    reflection:
      'Esta etapa me mostró el valor del diagnóstico como punto de partida. Diseñar la propuesta pensando en estudiantes que estudian desde el celular y con poco tiempo me obligó a priorizar lo esencial y a pensar en recursos sencillos, accesibles y realmente útiles.',
  },
  ...[4, 5, 6].map((n) => ({
    id: `j${n}`,
    n,
    icon: CalendarClock,
    date: 'Por registrar',
    title: `Jornada ${n} de práctica docente`,
    tags: ['Plantilla de registro'],
    pending: true,
  })),
];

const PROMPTS = {
  activities: ['¿Qué actividades planifiqué y desarrollé en la tutoría?', '¿Qué recursos y herramientas digitales utilicé?'],
  challenges: ['¿Qué dificultades surgieron durante la semana?', '¿Cómo las resolví o qué haría diferente?'],
  learnings: ['¿Qué aprendí sobre la enseñanza de las Ciencias Naturales?', '¿Qué descubrí sobre el grupo y sus necesidades?'],
  reflection: ['¿Cómo me sentí en esta jornada?', '¿Qué fortalezas y áreas de mejora identifico en mi práctica?'],
};

/* ---------------------------------------------------------------------
   Sub-componentes
   --------------------------------------------------------------------- */

function SectionBody({ entry, section }) {
  if (entry.pending) {
    return (
      <div className="space-y-3">
        <ul className="space-y-2">
          {PROMPTS[section.key].map((p) => (
            <li key={p} className="flex gap-2.5 text-sm text-body">
              <HelpCircle size={16} className="shrink-0 mt-0.5 text-plum" />
              {p}
            </li>
          ))}
        </ul>
        <div className="rounded-2xl border border-dashed border-line-strong bg-ivory px-4 py-6 text-center text-sm text-muted">
          <PenLine size={18} className="mx-auto mb-2 text-line-strong" />
          Espacio para el registro de esta jornada
        </div>
      </div>
    );
  }

  if (section.key === 'activities' || section.key === 'learnings') {
    return (
      <ul className="space-y-2.5">
        {entry[section.key].map((it) => (
          <li key={it} className="flex gap-2.5 text-[15px] text-body leading-relaxed">
            <CircleCheck size={17} className="shrink-0 mt-0.5 text-sage" />
            {it}
          </li>
        ))}
      </ul>
    );
  }

  if (section.key === 'challenges') {
    return (
      <div className="space-y-3">
        {entry.challenges.map((c, i) => (
          <div key={c.challenge} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-2 md:gap-3 items-stretch">
            <div className="rounded-2xl border border-wine-line bg-wine-soft p-4">
              <span className="text-[10px] uppercase tracking-[0.18em] text-wine font-bold">Reto {i + 1}</span>
              <p className="text-sm text-ink leading-relaxed mt-1">{c.challenge}</p>
            </div>
            <div className="flex items-center justify-center text-line-strong" aria-hidden="true">
              <ArrowRight size={18} className="rotate-90 md:rotate-0" />
            </div>
            <div className="rounded-2xl border border-sage-line bg-sage-soft p-4">
              <span className="text-[10px] uppercase tracking-[0.18em] text-sage font-bold">Solución</span>
              <p className="text-sm text-ink leading-relaxed mt-1">{c.solution}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <figure className="relative rounded-2xl border border-sand-line bg-sand p-5 sm:p-6 pl-12 sm:pl-14">
      <Quote size={20} className="absolute left-4 sm:left-5 top-5 text-bronze" />
      <blockquote className="font-serif italic text-lg sm:text-xl leading-snug text-ink">{entry.reflection}</blockquote>
    </figure>
  );
}

function EntryViewer({ entry }) {
  const [open, setOpen] = useState(() => new Set(['activities', 'reflection']));
  const allOpen = SECTIONS.every((s) => open.has(s.key));
  const toggle = (key) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  const Icon = entry.icon;

  return (
    <div className="space-y-5">
      <div className={cx('rounded-3xl p-6 sm:p-8', entry.pending ? 'border border-dashed border-line-strong bg-ivory' : 'bg-abyss text-on-plum')}>
        <div className="flex flex-col sm:flex-row sm:items-start gap-5">
          <span
            className={cx(
              'shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-2xl border',
              entry.pending ? 'bg-white border-line text-muted' : 'bg-plum-deep border-white/20 text-[#E5D5B5]'
            )}
          >
            <Icon size={26} />
          </span>
          <div className="flex-1 min-w-0">
            <p className={cx('text-[11px] uppercase tracking-[0.24em] font-semibold', entry.pending ? 'text-bronze' : 'text-[#E5D5B5]')}>
              Jornada {entry.n} · {entry.date}
            </p>
            <h3 className={cx('mt-2 font-serif text-3xl sm:text-4xl font-semibold leading-tight', entry.pending ? 'text-ink' : 'text-on-plum')}>{entry.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {entry.tags.map((t) => (
                <span key={t} className={cx('rounded-full border px-3 py-1 text-xs', entry.pending ? 'border-line text-muted' : 'border-white/25 text-on-plum')}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(SECTIONS.map((s) => s.key)))}
          className="min-h-[42px] inline-flex items-center gap-2 rounded-2xl border border-lilac-line bg-white px-4 text-sm font-semibold text-plum hover:bg-lilac transition-colors"
        >
          {allOpen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          {allOpen ? 'Contraer todo' : 'Expandir todo'}
        </button>
      </div>

      <div className="space-y-3">
        {SECTIONS.map((s) => {
          const SIcon = s.icon;
          const isOpen = open.has(s.key);
          return (
            <div key={s.key} className={cx('rounded-3xl border bg-white overflow-hidden transition-all', isOpen ? 'border-line-strong shadow-paper-lg' : 'border-line shadow-paper')}>
              <button type="button" onClick={() => toggle(s.key)} aria-expanded={isOpen} className="w-full min-h-[64px] flex items-center gap-4 px-5 sm:px-6 py-4 text-left">
                <span className="font-serif text-xl font-semibold text-bronze w-10">{s.code}</span>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lilac border border-lilac-line text-plum">
                  <SIcon size={18} />
                </span>
                <span className="flex-1 font-semibold text-ink">{s.label}</span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-plum">
                  <ChevronDown size={20} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6">
                      <SectionBody entry={entry} section={s} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Diario_reflexivo_semanal() {
  const [active, setActive] = useState('j1');
  const entry = JOURNAL.find((j) => j.id === active);
  const registered = JOURNAL.filter((j) => !j.pending).length;

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Apartado 9 · Bitácora"
        icon={NotebookPen}
        title="Diario reflexivo"
        highlight="semanal"
        description="Registro de cada jornada: actividades realizadas, retos y soluciones, aprendizajes obtenidos y reflexión personal."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.key} className="rounded-2xl border border-line bg-white shadow-paper p-3">
                <span className="font-serif text-lg font-semibold text-bronze">{s.code}</span>
                <p className="flex items-center gap-1.5 text-xs font-medium text-ink leading-tight mt-1">
                  <Icon size={13} className="shrink-0 text-plum" /> {s.label}
                </p>
              </div>
            );
          })}
        </div>
        <div className="lg:col-span-4 rounded-3xl border border-line bg-white shadow-paper p-5">
          <ProgressBar label="Jornadas registradas" value={registered} max={JOURNAL.length} suffix={` de ${JOURNAL.length}`} toneName="violet" />
        </div>
      </div>

      <section className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5" role="tablist" aria-label="Jornadas">
          {JOURNAL.map((j) => {
            const isActive = j.id === active;
            return (
              <button
                key={j.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(j.id)}
                className={cx(
                  'rounded-2xl border p-3.5 text-left transition-all',
                  isActive
                    ? 'border-plum bg-plum text-white shadow-sm'
                    : j.pending
                      ? 'border-dashed border-line-strong bg-ivory hover:border-plum'
                      : 'border-line bg-white shadow-paper hover:border-line-strong'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cx('font-serif text-2xl font-semibold leading-none', isActive ? 'text-[#E5D5B5]' : 'text-bronze')}>{j.n}</span>
                  {j.pending ? (
                    <CircleDashed size={16} className={isActive ? 'text-on-plum-muted' : 'text-muted'} />
                  ) : (
                    <CircleCheck size={16} className={isActive ? 'text-white' : 'text-sage'} />
                  )}
                </div>
                <p className={cx('mt-2 text-xs font-semibold leading-snug line-clamp-2', isActive ? 'text-white' : 'text-ink')}>{j.pending ? `Jornada ${j.n}` : j.title}</p>
                <p className={cx('mt-1 flex items-center gap-1 text-[11px]', isActive ? 'text-on-plum-muted' : 'text-muted')}>
                  <CalendarDays size={11} /> {j.pending ? 'Plantilla' : j.date.split(' – ')[0]}
                </p>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={entry.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <EntryViewer entry={entry} />
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          <Badge toneName="emerald" icon={CircleCheck}>
            Registrada
          </Badge>
          <Badge toneName="slate" icon={CircleDashed}>
            Plantilla pendiente
          </Badge>
          <span>Las jornadas 4, 5 y 6 se completarán semana a semana durante la práctica.</span>
        </div>
      </section>
    </PageShell>
  );
}
