import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Landmark,
  BookOpen,
  GraduationCap,
  School,
  UserRound,
  FlaskConical,
  ArrowRight,
  ChartPie,
  Lightbulb,
  ScrollText,
  Sparkles,
  Compass,
  Target,
  Laptop,
  NotebookPen,
  Smartphone,
  Clock,
  Wifi,
  Briefcase,
  PenLine,
  Layers,
  MonitorSmartphone,
  HeartHandshake,
  Atom,
  CalendarRange,
  Presentation,
  Star,
  Camera,
} from 'lucide-react';
import { PageShell, GlassCard, SectionHeader, Badge, TabBar, Button, EditorialQuote, Divider } from './ui/Primitives';
import { cx, fadeUp, stagger } from './ui/tokens';

/* =====================================================================
   PORTADA · Presentación personal, introducción y justificación
   ===================================================================== */

/** Ruta de la fotografía profesional (por ejemplo '/foto-stephanie.jpg' dentro de /public). */
const PHOTO_URL = null;

const SEAL = ['Universidad de El Salvador', 'Facultad de Ciencias Naturales y Matemática', 'Escuela de Matemática', 'Licenciatura en Informática Educativa'];

const META = [
  { icon: BookOpen, label: 'Asignatura', value: 'Práctica Docente (DDP1109) · Grupo GT-01 · Ciclo II-2026' },
  { icon: GraduationCap, label: 'Coordinador y docente tutor UES', value: 'Ing. Misael Enrique Juárez Blanco' },
  { icon: School, label: 'Institución de práctica', value: 'Instituto Nacional Dr. Francisco Martínez Suárez (Chalatenango)' },
  { icon: UserRound, label: 'Docente tutor institucional', value: 'Lcdo. Amilcar Heriberto Sánchez' },
  {
    icon: FlaskConical,
    label: 'Nivel y asignatura atendida',
    value: 'Primer Año de Bachillerato (Modalidad Flexible / A distancia) · Ciencias Naturales y Tecnología',
    wide: true,
  },
];

const PROFILE = [
  { label: 'Carné', value: 'HS22003' },
  { label: 'Carrera', value: 'Lic. en Informática Educativa' },
  { label: 'Grupo', value: 'GT-01' },
  { label: 'Ciclo', value: 'II-2026' },
];

const PRESENTATION = [
  {
    id: 'biografia',
    label: 'Biografía académica',
    shortLabel: 'Biografía',
    icon: GraduationCap,
    title: 'Formación en Informática Educativa',
    paragraphs: [
      'Stephanie Alexandra Hernández Sibrián cursa la Licenciatura en Informática Educativa en la Facultad de Ciencias Naturales y Matemática de la Universidad de El Salvador, una carrera que integra la formación pedagógica con el dominio de las tecnologías de la información aplicadas a la enseñanza.',
      'Su preparación abarca el diseño instruccional, el desarrollo de recursos educativos digitales, la gestión de entornos virtuales de aprendizaje y la mediación pedagógica, competencias que hoy pone en práctica en un contexto real de educación media en modalidad flexible.',
    ],
    highlights: [
      { icon: PenLine, label: 'Diseño instruccional' },
      { icon: Layers, label: 'Recursos educativos digitales' },
      { icon: MonitorSmartphone, label: 'Gestión de entornos virtuales' },
      { icon: HeartHandshake, label: 'Mediación pedagógica' },
    ],
  },
  {
    id: 'intereses',
    label: 'Intereses en Informática Educativa',
    shortLabel: 'Intereses',
    icon: Atom,
    title: 'Tecnología con propósito didáctico',
    paragraphs: [
      'Le interesa la integración pedagógica de las TIC bajo el modelo TPACK, en la que la tecnología se elige a partir de lo que el contenido exige y de la metodología que mejor lo media, y no por simple tendencia.',
      'Su foco está en reducir la brecha digital en las modalidades flexibles de educación media: diseñar materiales Mobile-First y con opción offline, y promover el aprendizaje activo para estudiantes que estudian desde el teléfono y con conexión limitada.',
    ],
    highlights: [
      { icon: Atom, label: 'Modelo TPACK' },
      { icon: Wifi, label: 'Reducción de la brecha digital' },
      { icon: Smartphone, label: 'Materiales Mobile-First y offline' },
      { icon: Sparkles, label: 'Aprendizaje activo' },
    ],
  },
  {
    id: 'expectativas',
    label: 'Expectativas de la práctica',
    shortLabel: 'Expectativas',
    icon: Target,
    title: 'Aportar soluciones reales al grupo',
    paragraphs: [
      'Espera aportar soluciones didácticas y tecnológicas reales para los estudiantes adultos de Primer Año de Bachillerato en Ciencias Naturales y Tecnología, quienes combinan el estudio con el trabajo y las responsabilidades familiares.',
      'Su meta es fortalecer a la vez sus competencias científicas, su alfabetización digital y su confianza académica, aprendiendo de la experiencia del docente tutor y del contexto de la modalidad flexible.',
    ],
    highlights: [
      { icon: FlaskConical, label: 'Competencias científicas' },
      { icon: Laptop, label: 'Alfabetización digital' },
      { icon: Star, label: 'Confianza académica' },
      { icon: Briefcase, label: 'Estudiantes adultos que trabajan' },
    ],
  },
];

const INTRODUCTION = [
  'El presente portafolio documenta la práctica docente desarrollada en el Instituto Nacional Dr. Francisco Martínez Suárez, de Chalatenango, con el grupo de Primer Año de Bachillerato de la modalidad flexible, en la asignatura de Ciencias Naturales y Tecnología.',
  'Como punto de partida se realizó un diagnóstico educativo que permitió comprender la realidad específica del grupo: un estudiantado mayoritariamente adulto, que combina el estudio con el trabajo y las responsabilidades familiares, y que asiste a jornadas semipresenciales los días sábados mientras organiza su aprendizaje de forma autónoma entre semana.',
  'Para conocer esa realidad se aplicaron una guía de observación sistemática durante una clase, un cuestionario en Google Forms a 11 estudiantes y entrevistas al docente tutor y al coordinador de la modalidad flexible. La triangulación de estos instrumentos permitió identificar las fortalezas, necesidades y barreras del proceso de enseñanza-aprendizaje y orientar tanto la planificación de la práctica como la propuesta de mejora.',
];

const JUSTIFICATION_FACTORS = [
  {
    icon: Laptop,
    title: 'Manejo tecnológico',
    text: 'Saber qué dispositivos y plataformas dominan los estudiantes evita diseñar actividades que no puedan realizar por falta de competencias digitales.',
  },
  {
    icon: NotebookPen,
    title: 'Hábitos de lectura y escritura',
    text: 'Conocer sus dificultades permite graduar los textos, apoyar con recursos visuales y acompañar la producción escrita.',
  },
  {
    icon: Clock,
    title: 'Disponibilidad de tiempo',
    text: 'El trabajo semanal limita el estudio en casa: la carga de tareas debe ser realista y priorizar lo formativo.',
  },
  {
    icon: Wifi,
    title: 'Conectividad',
    text: 'Las diferencias de conexión en el hogar exigen recursos ligeros, descargables y accesibles desde el teléfono.',
  },
  {
    icon: Briefcase,
    title: 'Responsabilidades laborales y familiares',
    text: 'El cuidado de hijos y el traslado desde otros municipios afectan la asistencia y deben considerarse al planificar.',
  },
];

const JUSTIFICATION = [
  'Planificar la práctica docente sin conocer el contexto implicaría diseñar actividades que podrían resultar inaccesibles o poco pertinentes para el grupo. En la modalidad flexible, donde el aprendizaje se sostiene en gran medida en el trabajo autónomo entre semana, es indispensable conocer previamente las condiciones reales del estudiantado.',
  'Este conocimiento permite seleccionar estrategias, recursos y tiempos coherentes con la realidad del grupo, de modo que la integración de la tecnología responda a un propósito didáctico (Mishra y Koehler, 2006) y contribuya a reducir, y no a ampliar, la brecha digital (Van Dijk, 2005).',
];

const PORTFOLIO_MAP = [
  { tab: 'contexto', sub: 'objetivos', icon: Target, title: 'Objetivos y contexto', text: 'Objetivos, dimensiones analizadas e institución.' },
  { tab: 'planificacion', sub: 'planeacion', icon: CalendarRange, title: 'Planeación', text: 'Cronograma de 18 actividades y Gantt.' },
  { tab: 'planificacion', sub: 'diagnostico', icon: ChartPie, title: 'Diagnóstico', text: 'Instrumentos, resultados y matriz FODA.' },
  { tab: 'practica', sub: 'planificaciones', icon: Presentation, title: 'Práctica', text: 'Evidencias y planes de clase.' },
  { tab: 'evaluacion', sub: 'diario', icon: BookOpen, title: 'Reflexión', text: 'Diario reflexivo y evaluación.' },
  { tab: 'cierre', sub: 'propuesta', icon: Lightbulb, title: 'Mejora y cierre', text: 'Propuesta, recursos y anexos.' },
];

/* ---------------------------------------------------------------------
   Sub-componentes
   --------------------------------------------------------------------- */

function PortraitFrame() {
  return (
    <motion.div variants={fadeUp} className="w-full max-w-sm mx-auto lg:max-w-none">
      <div className="rounded-[2rem] border border-plum bg-white p-2.5 shadow-paper-lg">
        <div className="rounded-[1.6rem] border-[6px] border-lilac overflow-hidden">
          <div className="relative aspect-[4/5] bg-silk flex items-center justify-center">
            {PHOTO_URL ? (
              <img src={PHOTO_URL} alt="Stephanie Alexandra Hernández Sibrián" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="flex flex-col items-center text-center px-6">
                <span className="inline-flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-full border border-plum bg-white">
                  <span className="font-serif text-5xl sm:text-6xl font-semibold text-plum">SH</span>
                </span>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted font-semibold">
                  <Camera size={14} /> Espacio para fotografía profesional
                </span>
              </div>
            )}
            <span className="absolute left-4 top-4 rounded-full bg-white/90 border border-line px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-plum font-semibold">
              Practicante
            </span>
          </div>
        </div>
        <div className="px-3 sm:px-4 pt-5 pb-3">
          <p className="font-serif text-2xl font-semibold text-ink leading-tight">Stephanie Alexandra Hernández Sibrián</p>
          <p className="text-sm text-muted mt-1">Futura Licenciada en Informática Educativa</p>
          <dl className="mt-4 grid grid-cols-2 gap-2">
            {PROFILE.map((p) => (
              <div key={p.label} className="rounded-xl border border-line bg-ivory px-3 py-2">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">{p.label}</dt>
                <dd className="text-sm font-semibold text-ink leading-snug">{p.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </motion.div>
  );
}

function PresentationTabs() {
  const [active, setActive] = useState(PRESENTATION[0].id);
  const current = PRESENTATION.find((p) => p.id === active);
  const Icon = current.icon;
  return (
    <div className="space-y-6">
      <TabBar
        tabs={PRESENTATION.map(({ id, label, shortLabel, icon }) => ({ id, label, shortLabel, icon }))}
        active={active}
        onChange={setActive}
        layoutId="portada-presentacion"
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <GlassCard hover={false} padded={false} className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8 p-6 sm:p-8 md:p-10 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-lilac border border-lilac-line text-plum">
                    <Icon size={20} />
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">{current.label}</span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-ink leading-tight">{current.title}</h3>
                {current.paragraphs.map((p) => (
                  <p key={p.slice(0, 30)} className="text-[15px] sm:text-base leading-relaxed text-body">
                    {p}
                  </p>
                ))}
              </div>
              <div className="lg:col-span-4 bg-silk border-t lg:border-t-0 lg:border-l border-line p-6 sm:p-8">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-4">Ejes principales</p>
                <ul className="space-y-3">
                  {current.highlights.map((h) => {
                    const HIcon = h.icon;
                    return (
                      <li key={h.label} className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3">
                        <HIcon size={17} className="shrink-0 text-plum" />
                        <span className="text-sm font-medium text-ink">{h.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Portada({ onNavigate }) {
  return (
    <PageShell>
      {/* Hero editorial */}
      <motion.section initial="hidden" animate="show" variants={stagger} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-7 space-y-7">
          <motion.div variants={fadeUp} className="flex items-start gap-3">
            <span className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sand border border-sand-line text-bronze">
              <Landmark size={19} />
            </span>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] leading-relaxed text-bronze font-semibold">
              {SEAL.map((s, i) => (
                <span key={s}>
                  {s}
                  {i < SEAL.length - 1 && <span className="mx-2 text-sand-line">·</span>}
                </span>
              ))}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4">
            <h1 className="font-serif text-[2.6rem] leading-[1.02] sm:text-6xl md:text-7xl font-semibold text-ink">
              Portafolio Digital de <span className="italic text-plum">Práctica Docente</span>
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-lg sm:text-xl font-semibold text-body">Stephanie Alexandra Hernández Sibrián</p>
              <Badge toneName="amber">Carné HS22003</Badge>
            </div>
          </motion.div>

          <motion.dl variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {META.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className={cx('flex items-start gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 shadow-paper', m.wide && 'sm:col-span-2')}>
                  <Icon size={17} className="shrink-0 mt-0.5 text-plum" />
                  <div className="min-w-0">
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">{m.label}</dt>
                    <dd className="text-sm text-ink leading-snug mt-0.5">{m.value}</dd>
                  </div>
                </div>
              );
            })}
          </motion.dl>

          <motion.div variants={fadeUp} className="rounded-3xl border border-sand-line bg-sand px-5 sm:px-7 py-6">
            <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold mb-4">Lema docente</p>
            <EditorialQuote author="Stephanie A. Hernández Sibrián">
              “La educación transforma vidas cuando la tecnología se adapta, con empatía, a la realidad de cada estudiante.”
            </EditorialQuote>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
            <Button icon={ChartPie} iconRight={ArrowRight} onClick={() => onNavigate?.('planificacion', 'diagnostico')} className="sm:flex-1">
              Explorar Diagnóstico Educativo
            </Button>
            <Button variant="secondary" icon={Lightbulb} onClick={() => onNavigate?.('cierre', 'propuesta')} className="sm:flex-1">
              Ver Propuesta de Mejora
            </Button>
          </motion.div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <PortraitFrame />
        </div>
      </motion.section>

      <Divider />

      {/* Presentación personal y profesional */}
      <section className="space-y-8">
        <SectionHeader
          eyebrow="Apartado 2 · Presentación"
          icon={UserRound}
          title="Presentación personal y"
          highlight="profesional"
          description="Formación académica, intereses en Informática Educativa y expectativas de la practicante frente a la práctica docente."
        />
        <PresentationTabs />
      </section>

      {/* Introducción y justificación */}
      <section className="space-y-8">
        <SectionHeader
          eyebrow="Secciones 1 y 2 del informe diagnóstico"
          icon={ScrollText}
          title="Introducción y"
          highlight="justificación"
          description="Por qué y cómo se estudió la realidad del grupo antes de planificar la práctica docente."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <GlassCard hover={false} className="lg:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold mb-4">1 · Introducción</p>
            <div className="space-y-4">
              {INTRODUCTION.map((p, i) => (
                <p
                  key={p.slice(0, 30)}
                  className={cx(
                    'text-[15px] sm:text-base leading-relaxed text-body',
                    i === 0 && 'first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-plum'
                  )}
                >
                  {p}
                </p>
              ))}
            </div>
          </GlassCard>
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {[
              { v: '4', l: 'Instrumentos aplicados', d: 'Observación, cuestionario y dos entrevistas' },
              { v: 'N = 11', l: 'Estudiantes encuestados', d: 'Primer Año de Bachillerato' },
              { v: '7', l: 'Dimensiones analizadas', d: 'Del perfil estudiantil a las necesidades' },
            ].map((s) => (
              <div key={s.l} className="rounded-3xl border border-line bg-white shadow-paper p-5">
                <span className="block font-serif text-4xl font-semibold text-plum leading-none">{s.v}</span>
                <span className="block mt-2 text-sm font-semibold text-ink">{s.l}</span>
                <span className="block text-xs text-muted mt-0.5">{s.d}</span>
              </div>
            ))}
          </div>
        </div>

        <GlassCard hover={false} padded={false} className="overflow-hidden">
          <div className="p-6 sm:p-8 md:p-10 space-y-6">
            <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">2 · Justificación</p>
            <p className="font-serif text-xl sm:text-2xl leading-snug text-ink max-w-4xl">{JUSTIFICATION[0]}</p>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3"
            >
              {JUSTIFICATION_FACTORS.map((f) => {
                const Icon = f.icon;
                return (
                  <motion.div key={f.title} variants={fadeUp} className="rounded-2xl border border-line bg-ivory p-4">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-lilac border border-lilac-line text-plum">
                      <Icon size={17} />
                    </span>
                    <p className="mt-3 text-sm font-semibold text-ink leading-snug">{f.title}</p>
                    <p className="mt-1.5 text-sm text-body leading-relaxed">{f.text}</p>
                  </motion.div>
                );
              })}
            </motion.div>
            <p className="text-[15px] sm:text-base leading-relaxed text-body max-w-4xl">{JUSTIFICATION[1]}</p>
          </div>
        </GlassCard>
      </section>

      {/* Mapa del portafolio */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Compass size={20} className="text-bronze" />
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">Recorrido del portafolio</h3>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {PORTFOLIO_MAP.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.button
                key={m.title}
                type="button"
                variants={fadeUp}
                onClick={() => onNavigate?.(m.tab, m.sub)}
                className="group text-left rounded-3xl border border-line bg-white p-5 shadow-paper hover:shadow-paper-lg hover:border-line-strong transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-semibold text-bronze leading-none">{String(i + 1).padStart(2, '0')}</span>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lilac border border-lilac-line text-plum group-hover:bg-plum group-hover:text-white transition-colors">
                    <Icon size={18} />
                  </span>
                </div>
                <p className="mt-4 font-semibold text-ink">{m.title}</p>
                <p className="mt-1 text-sm text-muted">{m.text}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-plum">
                  Abrir sección <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </section>
    </PageShell>
  );
}
