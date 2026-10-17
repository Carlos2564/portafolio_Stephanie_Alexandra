import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target,
  BookMarked,
  Crosshair,
  Users,
  Wifi,
  Flame,
  HeartHandshake,
  Building2,
  Laptop,
  Lightbulb,
  CircleCheck,
  ClipboardList,
  Eye,
  GraduationCap,
  UserCog,
  Search as SearchIcon,
  Telescope,
  FileSearch,
  Grid2x2,
  Check,
  Minus,
} from 'lucide-react';
import { PageShell, GlassCard, SectionHeader, Badge, PlumBand } from './ui/Primitives';
import { cx, fadeUp, stagger } from './ui/tokens';

/* =====================================================================
   OBJETIVOS Y DIMENSIONES ANALIZADAS
   ===================================================================== */

const PORTFOLIO_OBJECTIVE =
  'Documentar, organizar y analizar las experiencias de la práctica docente, reflexionar sobre ellas y proponer mejoras, fortaleciendo las competencias pedagógicas y tecnológicas.';

const GENERAL_OBJECTIVE =
  'Analizar el ambiente educativo de los estudiantes de primer año de Bachillerato del Instituto Nacional Dr. Francisco Martínez Suárez, en modalidad a distancia, considerando condiciones institucionales, tecnológicas, pedagógicas y las características de los estudiantes, con la finalidad de identificar las fortalezas, necesidades y barreras.';

const SPECIFIC = [
  {
    n: 1,
    verb: 'Identificar',
    icon: SearchIcon,
    text: 'Identificar las principales características, fortalezas, intereses, dificultades, necesidades y formas de participación de los estudiantes de primer año de Bachillerato.',
    indicators: [
      'Perfil etario y de género del grupo caracterizado (encuesta P1 y P2).',
      'Autonomía, participación y preferencias de aprendizaje identificadas (P4 a P6).',
      'Dificultades de lectura, escritura y participación documentadas por el tutor.',
      'Formas de participación registradas en la guía de observación (dimensión 1).',
    ],
    instruments: ['Encuesta', 'Observación', 'Entrevista al tutor'],
    result: { value: '90.9%', label: 'motivado para continuar sus estudios' },
    dims: [1, 3, 7],
  },
  {
    n: 2,
    verb: 'Conocer',
    icon: Telescope,
    text: 'Conocer las condiciones de acceso a dispositivos tecnológicos, Internet y herramientas digitales, así como su utilización durante el proceso de aprendizaje de los estudiantes.',
    indicators: [
      'Acceso a Internet y calidad de conexión en el hogar cuantificados (P3 y P9).',
      'Dispositivo principal de estudio identificado (P8).',
      'Herramientas digitales más utilizadas para revisar las materias (P12).',
      'Infraestructura TIC institucional inventariada con el coordinador.',
    ],
    instruments: ['Encuesta', 'Entrevista al coordinador', 'Observación'],
    result: { value: '90.9%', label: 'utiliza Classroom o Moodle' },
    dims: [2, 5, 6],
  },
  {
    n: 3,
    verb: 'Describir',
    icon: FileSearch,
    text: 'Describir las condiciones del acompañamiento docente y las necesidades de apoyo que presentan los estudiantes.',
    indicators: [
      'Claridad de las instrucciones valorada por los estudiantes (P10).',
      'Disponibilidad del docente ante dudas valorada (P11).',
      'Estrategias de evaluación y retroalimentación descritas por el tutor.',
      'Necesidades y sugerencias del estudiantado sistematizadas (P13).',
    ],
    instruments: ['Encuesta', 'Entrevista al tutor', 'Observación'],
    result: { value: '90.9%', label: 'percibe al docente disponible para ayudar' },
    dims: [4, 7],
  },
];

const DIMENSIONS = [
  {
    n: 1,
    icon: Users,
    title: 'Características generales de los estudiantes',
    scope: 'Edad, sexo, hábitos de estudio y nivel de autonomía del grupo, junto con su situación laboral y familiar.',
    questions: ['¿Quiénes son los estudiantes y en qué etapa de vida se encuentran?', '¿Con qué autonomía organizan su estudio?'],
    finding: '81.8% tiene 19 años o más y 81.9% estudia por su cuenta siempre o casi siempre.',
    instruments: ['enc', 'tut', 'coo'],
  },
  {
    n: 2,
    icon: Wifi,
    title: 'Accesibilidad a Internet',
    scope: 'Disponibilidad y calidad de la conexión en el hogar y en la institución para estudiar y entregar tareas.',
    questions: ['¿Cuentan con Internet en casa?', '¿Es suficiente para subir tareas?'],
    finding: '72.7% tiene Internet en casa, pero 45.5% enfrenta una red limitada o insuficiente al subir tareas.',
    instruments: ['enc', 'coo', 'obs'],
  },
  {
    n: 3,
    icon: Flame,
    title: 'Motivación',
    scope: 'Disposición para continuar los estudios, participación en clase y actividades que favorecen la comprensión.',
    questions: ['¿Qué tan motivados se sienten?', '¿Qué actividades les ayudan a aprender?'],
    finding: '90.9% se siente motivado; destacan videos, trabajo en equipo y juegos (45.5% cada uno).',
    instruments: ['enc', 'obs'],
  },
  {
    n: 4,
    icon: HeartHandshake,
    title: 'Apoyo docente',
    scope: 'Claridad de las instrucciones, disponibilidad del docente y estrategias de acompañamiento y retroalimentación.',
    questions: ['¿Las instrucciones son claras?', '¿El docente está disponible ante las dudas?'],
    finding: '90.9% percibe instrucciones claras y 90.9% siente al docente disponible.',
    instruments: ['enc', 'tut', 'obs'],
  },
  {
    n: 5,
    icon: Building2,
    title: 'Entorno institucional',
    scope: 'Organización de la modalidad flexible, horarios, espacios físicos, servicios de apoyo y soporte técnico.',
    questions: ['¿Cómo se organiza la modalidad?', '¿Con qué espacios y apoyos cuenta?'],
    finding: 'Aulas asignadas, biblioteca y apoyo psicológico; sin soporte técnico permanente.',
    instruments: ['coo', 'obs'],
  },
  {
    n: 6,
    icon: Laptop,
    title: 'Herramientas tecnológicas',
    scope: 'Dispositivos, plataformas y recursos digitales que usan estudiantes y docentes en el proceso de aprendizaje.',
    questions: ['¿Qué dispositivo usan para estudiar?', '¿A qué herramientas digitales recurren?'],
    finding: '72.7% usa computadora y 27.3% solo el smartphone; las videollamadas no se utilizan (0%).',
    instruments: ['enc', 'tut', 'coo', 'obs'],
  },
  {
    n: 7,
    icon: Lightbulb,
    title: 'Necesidades o mejoras',
    scope: 'Sugerencias del estudiantado y prioridades identificadas por el tutor y el coordinador.',
    questions: ['¿Qué necesitan para aprender mejor?', '¿Qué debería reforzarse?'],
    finding: 'Dosificar tareas, materiales prácticos, fechas realistas y formación en informática.',
    instruments: ['enc', 'tut', 'coo'],
  },
];

const INSTRUMENTS = {
  enc: { label: 'Encuesta', icon: ClipboardList },
  obs: { label: 'Observación', icon: Eye },
  tut: { label: 'Entrevista al tutor', icon: GraduationCap },
  coo: { label: 'Entrevista al coordinador', icon: UserCog },
};

/* ---------------------------------------------------------------------
   Sub-componentes
   --------------------------------------------------------------------- */

function SpecificCard({ item }) {
  const Icon = item.icon;
  return (
    <motion.article variants={fadeUp} className="h-full">
      <GlassCard className="h-full flex flex-col" padded={false}>
        <div className="p-6 sm:p-7 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <span className="font-serif text-6xl font-semibold leading-none text-bronze">{String(item.n).padStart(2, '0')}</span>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-lilac border border-lilac-line text-plum">
              <Icon size={20} />
            </span>
          </div>
          <p className="mt-5 text-[11px] uppercase tracking-[0.22em] text-plum font-bold">{item.verb}</p>
          <p className="mt-2 font-serif text-xl sm:text-[1.4rem] font-semibold leading-snug text-ink">“{item.text}”</p>

          <div className="mt-6 rounded-2xl border border-line bg-ivory p-4 flex-1">
            <p className="text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold mb-3">Indicadores de logro</p>
            <ul className="space-y-2.5">
              {item.indicators.map((ind) => (
                <li key={ind} className="flex gap-2.5 text-sm text-body leading-relaxed">
                  <CircleCheck size={16} className="shrink-0 mt-0.5 text-sage" />
                  {ind}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.instruments.map((ins) => (
              <Badge key={ins} toneName="violet">
                {ins}
              </Badge>
            ))}
          </div>
        </div>
        <div className="border-t border-line bg-sand px-6 sm:px-7 py-4 flex items-center gap-4 rounded-b-3xl">
          <span className="font-serif text-3xl font-semibold text-bronze-dark leading-none">{item.result.value}</span>
          <span className="text-sm text-body leading-snug">{item.result.label}</span>
        </div>
      </GlassCard>
    </motion.article>
  );
}

function DimensionsExplorer() {
  const [active, setActive] = useState(1);
  const dim = DIMENSIONS.find((d) => d.n === active);
  const Icon = dim.icon;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
        {DIMENSIONS.map((d) => {
          const DIcon = d.icon;
          const isActive = d.n === active;
          return (
            <button
              key={d.n}
              type="button"
              onClick={() => setActive(d.n)}
              aria-pressed={isActive}
              className={cx(
                'flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all',
                isActive ? 'border-plum bg-plum text-white shadow-sm' : 'border-line bg-white text-ink hover:border-line-strong shadow-paper'
              )}
            >
              <span className={cx('font-serif text-2xl font-semibold leading-none w-6 tabular-nums', isActive ? 'text-[#E5D5B5]' : 'text-bronze')}>{d.n}</span>
              <DIcon size={17} className={cx('shrink-0', isActive ? 'text-white' : 'text-plum')} />
              <span className="text-sm font-medium leading-snug">{d.title}</span>
            </button>
          );
        })}
      </div>

      <GlassCard hover={false} className="lg:col-span-7">
        <AnimatePresence mode="wait">
          <motion.div key={dim.n} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }} className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-lilac border border-lilac-line text-plum">
                <Icon size={26} />
              </span>
              <div>
                <span className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">Dimensión {dim.n} de 7</span>
                <h4 className="font-serif text-2xl sm:text-3xl font-semibold text-ink leading-tight">{dim.title}</h4>
              </div>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-2">Alcance</p>
              <p className="text-[15px] leading-relaxed text-body">{dim.scope}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-2">Preguntas que orientan el análisis</p>
              <ul className="space-y-2">
                {dim.questions.map((q) => (
                  <li key={q} className="flex gap-2.5 text-sm text-body">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-bronze" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-2">Instrumentos que la abordan</p>
              <div className="flex flex-wrap gap-2">
                {dim.instruments.map((k) => {
                  const IIcon = INSTRUMENTS[k].icon;
                  return (
                    <span key={k} className="inline-flex items-center gap-1.5 rounded-full border border-lilac-line bg-lilac px-3 py-1.5 text-xs font-semibold text-plum">
                      <IIcon size={13} /> {INSTRUMENTS[k].label}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="rounded-2xl border border-sand-line bg-sand p-4 sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold mb-1.5">Hallazgo principal</p>
              <p className="text-[15px] font-medium text-ink leading-relaxed">{dim.finding}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </GlassCard>
    </div>
  );
}

function AlignmentMatrix() {
  return (
    <div className="space-y-4">
      {/* Móvil: tarjetas */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {SPECIFIC.map((o) => (
          <div key={o.n} className="rounded-2xl border border-line bg-white shadow-paper p-4">
            <p className="text-sm font-semibold text-ink">
              Objetivo {o.n} · <span className="text-plum">{o.verb}</span>
            </p>
            <ul className="mt-3 space-y-1.5">
              {o.dims.map((d) => (
                <li key={d} className="flex items-center gap-2 text-sm text-body">
                  <Check size={15} className="text-sage shrink-0" /> {d}. {DIMENSIONS[d - 1].title}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Escritorio: tabla */}
      <div className="hidden md:block overflow-x-auto rounded-3xl border border-line bg-white shadow-paper">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="bg-silk text-[11px] uppercase tracking-[0.14em] text-muted">
              <th className="px-4 py-3.5 text-left font-semibold w-48">Objetivo específico</th>
              {DIMENSIONS.map((d) => (
                <th key={d.n} className="px-2 py-3.5 text-center font-semibold" title={d.title}>
                  D{d.n}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SPECIFIC.map((o) => (
              <tr key={o.n} className="border-t border-line hover:bg-ivory transition-colors">
                <td className="px-4 py-4">
                  <span className="font-serif text-xl font-semibold text-bronze mr-2">{o.n}</span>
                  <span className="font-semibold text-ink">{o.verb}</span>
                </td>
                {DIMENSIONS.map((d) => (
                  <td key={d.n} className="px-2 py-4 text-center">
                    {o.dims.includes(d.n) ? (
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-plum text-white">
                        <Check size={15} />
                      </span>
                    ) : (
                      <Minus size={15} className="inline text-line-strong" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 border-t border-line bg-ivory px-4 py-3 text-xs text-muted">
          {DIMENSIONS.map((d) => (
            <span key={d.n}>
              <span className="font-semibold text-plum">D{d.n}</span> {d.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Objetivos() {
  return (
    <PageShell>
      <SectionHeader
        eyebrow="Apartado 3 · Propósitos"
        icon={Target}
        title="Objetivos de la"
        highlight="práctica docente"
        description="Lo que persigue el portafolio, el diagnóstico y la práctica, y las siete dimensiones desde las que se analizó el ambiente educativo."
      />

      {/* Objetivo del portafolio + general */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <GlassCard hover={false} className="lg:col-span-4 flex flex-col">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sand border border-sand-line text-bronze">
            <BookMarked size={20} />
          </span>
          <p className="mt-5 text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">Objetivo de aprendizaje del portafolio</p>
          <p className="mt-3 text-[15px] leading-relaxed text-body flex-1">{PORTFOLIO_OBJECTIVE}</p>
        </GlassCard>
        <PlumBand className="lg:col-span-8">
          <div className="flex items-center gap-3">
            <Crosshair size={20} className="text-[#E5D5B5]" />
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#E5D5B5] font-semibold">Objetivo general del diagnóstico y la práctica</span>
          </div>
          <p className="mt-5 font-serif text-2xl sm:text-3xl leading-snug text-on-plum">“{GENERAL_OBJECTIVE}”</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['Condiciones institucionales', 'Tecnológicas', 'Pedagógicas', 'Características de los estudiantes'].map((t) => (
              <span key={t} className="rounded-full border border-white/25 px-3 py-1 text-xs text-on-plum">
                {t}
              </span>
            ))}
          </div>
        </PlumBand>
      </div>

      {/* Específicos */}
      <section className="space-y-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">Objetivos específicos</p>
          <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-ink">Tres metas con indicadores de logro</h3>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
        >
          {SPECIFIC.map((s) => (
            <SpecificCard key={s.n} item={s} />
          ))}
        </motion.div>
      </section>

      {/* Dimensiones */}
      <section className="space-y-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">Sección 5.5 del informe</p>
          <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-ink">Las 7 dimensiones analizadas</h3>
          <p className="text-sm text-muted mt-2">Selecciona una dimensión para conocer su alcance, los instrumentos que la abordan y su hallazgo principal.</p>
        </div>
        <DimensionsExplorer />
      </section>

      {/* Alineación */}
      <section className="space-y-6">
        <div className="flex items-start gap-3">
          <span className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-lilac border border-lilac-line text-plum">
            <Grid2x2 size={19} />
          </span>
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">Alineación objetivos–dimensiones</h3>
            <p className="text-sm text-muted mt-1">Qué dimensiones aportan evidencia a cada objetivo específico.</p>
          </div>
        </div>
        <AlignmentMatrix />
      </section>
    </PageShell>
  );
}
