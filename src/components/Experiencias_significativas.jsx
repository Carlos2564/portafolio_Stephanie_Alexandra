import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  Sparkles,
  Flame,
  Handshake,
  Repeat,
  Briefcase,
  WifiOff,
  Bus,
  HeartHandshake,
  Accessibility,
  Timer,
  Flag,
  Trophy,
  TrendingUp,
  Rocket,
  Paperclip,
  CalendarRange,
  ChartGantt,
  Eye,
  ClipboardList,
  GraduationCap,
  UserCog,
  FileText,
  ArrowUpRight,
  CircleCheck,
  Quote,
  ThumbsUp,
  Mountain,
  Compass,
  Telescope,
} from 'lucide-react';
import { PageShell, GlassCard, SectionHeader, Badge, Modal, DataTable, PlumBand } from './ui/Primitives';
import { cx, fadeUp, stagger } from './ui/tokens';
import {
  CRONOGRAMA,
  CRONOGRAMA_STAGES,
  OBSERVATION_ITEMS,
  OBSERVATION_DIMENSION_LABELS,
  SURVEY_QUESTIONS,
  SURVEY_OPEN_QUESTION,
  SURVEY_SECTION_LABELS,
  TUTOR_QA,
  COORDINATOR_QA,
  formatDate,
} from '../data/diagnostico';

/* =====================================================================
   EXPERIENCIAS SIGNIFICATIVAS, CONCLUSIONES Y ANEXOS · Apartados 13 y 14
   ===================================================================== */

const INDEX = [
  { id: 'relato', code: '13.a', label: 'Relato' },
  { id: 'aprendizajes', code: '13.b', label: 'Aprendizajes' },
  { id: 'conclusiones', code: '13.c', label: 'Conclusiones' },
  { id: 'valoracion', code: '13.d', label: 'Valoración' },
  { id: 'logros', code: '13.e · 13.f', label: 'Logros y mejora' },
  { id: 'proyeccion', code: '13.g', label: 'Proyección' },
  { id: 'anexos', code: '14.a', label: 'Anexos' },
];

const SITUATIONS = {
  positive: [
    {
      icon: Flame,
      title: 'Un grupo que elige aprender',
      text: 'Personas adultas que, después de una semana de trabajo o de cuidar a su familia, dedican el sábado a estudiar. El 90.9% se declara motivado para continuar.',
    },
    {
      icon: Handshake,
      title: 'Apertura del tutor y de la coordinación',
      text: 'El docente tutor y el coordinador compartieron con detalle su experiencia, lo que permitió comprender la modalidad desde la mirada pedagógica e institucional.',
    },
    {
      icon: Repeat,
      title: 'Una metodología que ya funciona',
      text: 'El aula invertida es valorada por el tutor como una estrategia que ha funcionado bastante bien: una base sólida sobre la cual construir la propuesta.',
    },
  ],
  challenging: [
    {
      icon: Briefcase,
      title: 'Estudiar mientras se trabaja y se cría',
      text: 'El trabajo, el cuidado de los hijos o su enfermedad provocan inasistencias, y el estudiantado pide dosificar las tareas para poder cumplir.',
    },
    {
      icon: WifiOff,
      title: 'La brecha en el hogar',
      text: 'Un 27.3% estudia solo desde el celular y un 45.5% enfrenta una red limitada al subir tareas, lo que exige repensar cada recurso digital.',
    },
    {
      icon: Bus,
      title: 'Distancias y transporte',
      text: 'Parte del grupo viaja desde otros municipios de Chalatenango con transporte inestable, lo que condiciona la puntualidad y la asistencia.',
    },
  ],
};

const LEARNINGS = [
  {
    icon: Repeat,
    title: 'Mediación en el aula invertida',
    text: 'El valor del modelo no está en el video, sino en convertir la tutoría en un espacio de práctica, diálogo y andamiaje dentro de la Zona de Desarrollo Próximo.',
  },
  {
    icon: HeartHandshake,
    title: 'Empatía pedagógica',
    text: 'Conocer la vida del estudiante adulto, su trabajo y su familia cambia la forma de planificar: tiempos realistas, flexibilidad y reconocimiento del esfuerzo.',
  },
  {
    icon: Accessibility,
    title: 'Diseño universal para el aprendizaje',
    text: 'Ofrecer múltiples formas de acceder al contenido (video, PDF, impreso, infografía) permite que nadie quede fuera por su dispositivo o su conexión.',
  },
  {
    icon: Timer,
    title: 'Microaprendizaje',
    text: 'Cápsulas breves y actividades acotadas se adaptan mejor al tiempo disponible de quienes estudian después del trabajo.',
  },
];

const CONCLUSIONS = [
  'El diagnóstico confirmó que el punto de partida de toda práctica docente es el conocimiento del contexto: el grupo de Primer Año de Bachillerato es adulto, motivado (90.9%) y autónomo (81.9%), pero condicionado por el tiempo, la conectividad del hogar y las competencias digitales.',
  'La triangulación de la observación, el cuestionario y las entrevistas permitió pasar de datos aislados a una lectura integral, identificar dónde está realmente la brecha (en el hogar y en el uso, no en el acceso institucional) y orientar la propuesta de mejora.',
  'El portafolio digital se convirtió en una herramienta para documentar, organizar y reflexionar sobre cada etapa de la práctica, y en un ejemplo concreto de integración de la tecnología con propósito didáctico.',
];

const ACHIEVEMENTS = [
  'Diseño, validación y aplicación de cuatro instrumentos de diagnóstico.',
  'Cumplimiento del cronograma de 18 actividades con entrega del informe el 20/09/2026.',
  'Análisis triangulado con matriz FODA, conclusiones y recomendaciones.',
  'Propuesta de mejora con cinco acciones y un recurso digital de cuatro módulos.',
  'Construcción de un portafolio digital interactivo y accesible desde el celular.',
];

const IMPROVEMENTS = [
  'Gestionar mejor el tiempo en jornadas con varios instrumentos y actividades.',
  'Documentar fotográficamente cada sesión de forma sistemática.',
  'Diseñar indicadores para evaluar el impacto de la propuesta.',
  'Fortalecer estrategias de manejo de grupos adultos y heterogéneos.',
  'Solicitar retroalimentación del tutor con mayor frecuencia.',
];

const PROJECTION = [
  {
    icon: Compass,
    horizon: 'Corto plazo',
    title: 'Culminar la práctica',
    text: 'Implementar la propuesta de mejora, completar el diario reflexivo y evaluar los resultados con el docente tutor.',
  },
  {
    icon: Mountain,
    horizon: 'Mediano plazo',
    title: 'Diseñar para las modalidades flexibles',
    text: 'Desarrollar recursos educativos digitales accesibles y acompañar a docentes en la integración de la tecnología bajo el modelo TPACK.',
  },
  {
    icon: Telescope,
    horizon: 'Largo plazo',
    title: 'Contribuir a cerrar la brecha digital',
    text: 'Especializarse en tecnología educativa y aportar a una educación salvadoreña más inclusiva, donde la tecnología abra oportunidades reales.',
  },
];

const ANNEXES = [
  { id: 'cronograma', code: 'A1', icon: CalendarRange, title: 'Cronograma de actividades', meta: '18 actividades · 12/08 – 20/09/2026' },
  { id: 'gantt', code: 'A2', icon: ChartGantt, title: 'Diagrama de Gantt', meta: 'Tres etapas: antes, durante y después' },
  { id: 'observacion', code: 'A3', icon: Eye, title: 'Guía de observación sistemática', meta: '20 indicadores · 4 dimensiones' },
  { id: 'cuestionario', code: 'A4', icon: ClipboardList, title: 'Cuestionario para estudiantes', meta: '13 preguntas · Google Forms' },
  { id: 'tutor', code: 'A5', icon: GraduationCap, title: 'Guía de entrevista al docente tutor', meta: '10 preguntas' },
  { id: 'coordinador', code: 'A6', icon: UserCog, title: 'Guía de entrevista al coordinador', meta: '10 preguntas' },
];

/* ---------------------------------------------------------------------
   Contenido de los anexos
   --------------------------------------------------------------------- */

const STAGE_FILL = { antes: 'bg-plum', durante: 'bg-bronze', despues: 'bg-sage' };

const toDay = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, m - 1, d) / 86400000;
};
const START = toDay(CRONOGRAMA[0].start);
const SPAN = toDay(CRONOGRAMA[CRONOGRAMA.length - 1].end) - START + 1;

function AnnexCronograma() {
  return (
    <DataTable
      rows={CRONOGRAMA}
      minWidth={680}
      columns={[
        { key: 'id', label: 'N.°', className: 'w-14 font-semibold text-plum' },
        { key: 'name', label: 'Actividad' },
        { key: 'stage', label: 'Etapa', className: 'w-24', render: (r) => CRONOGRAMA_STAGES[r.stage].label },
        { key: 'dates', label: 'Fechas', className: 'w-48', render: (r) => (r.start === r.end ? formatDate(r.start) : `${formatDate(r.start)} – ${formatDate(r.end)}`) },
        { key: 'days', label: 'Días', className: 'w-16' },
        { key: 'deps', label: 'Depende de', className: 'w-24', render: (r) => (r.deps.length ? r.deps.join(', ') : '—') },
      ]}
    />
  );
}

function AnnexGantt() {
  return (
    <div className="space-y-2">
      {CRONOGRAMA.map((a) => {
        const left = ((toDay(a.start) - START) / SPAN) * 100;
        const width = ((toDay(a.end) - toDay(a.start) + 1) / SPAN) * 100;
        return (
          <div key={a.id} className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
            <span className="sm:w-72 shrink-0 text-xs text-ink leading-snug">
              <span className="font-semibold text-bronze mr-1">{a.id}.</span>
              {a.name}
            </span>
            <div className="relative h-5 flex-1 rounded-md bg-silk">
              <span className={cx('absolute top-0.5 h-4 rounded', STAGE_FILL[a.stage])} style={{ left: `${left}%`, width: `max(${width}%, 6px)` }} />
            </div>
          </div>
        );
      })}
      <div className="flex flex-wrap gap-4 pt-3 text-xs text-body">
        {Object.entries(CRONOGRAMA_STAGES).map(([k, v]) => (
          <span key={k} className="inline-flex items-center gap-1.5">
            <span className={cx('h-2.5 w-2.5 rounded-sm', STAGE_FILL[k])} /> {v.label}
          </span>
        ))}
        <span className="text-muted">12/08/2026 → 20/09/2026</span>
      </div>
    </div>
  );
}

function AnnexObservacion() {
  return (
    <div className="space-y-6">
      {Object.entries(OBSERVATION_DIMENSION_LABELS).map(([key, dim]) => (
        <div key={key}>
          <p className="font-semibold text-ink">
            Dimensión {dim.num}: {dim.label}
          </p>
          <p className="text-xs text-muted mb-3">Escala: {dim.scale}</p>
          <ol className="space-y-2">
            {OBSERVATION_ITEMS.filter((it) => it.dim === key).map((it) => (
              <li key={it.n} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 rounded-xl border border-line bg-ivory px-3 py-2.5">
                <span className="text-sm text-body flex-1">
                  <span className="font-semibold text-plum mr-1.5">{it.n}.</span>
                  {it.text}
                </span>
                <Badge toneName={it.value === 'Siempre' || it.value === 'Sí' ? 'emerald' : 'amber'}>{it.value}</Badge>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

function AnnexCuestionario() {
  return (
    <div className="space-y-6">
      {SURVEY_SECTION_LABELS.map((label, i) => {
        const section = i + 1;
        const questions = SURVEY_QUESTIONS.filter((q) => q.section === section);
        return (
          <div key={label}>
            <p className="text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold mb-2">
              Sección {section} · {label}
            </p>
            {section === 8 ? (
              <div className="rounded-xl border border-line bg-ivory px-4 py-3">
                <p className="text-sm font-semibold text-ink">13. {SURVEY_OPEN_QUESTION}</p>
                <p className="text-xs text-muted mt-1">Pregunta abierta</p>
              </div>
            ) : (
              <div className="space-y-2">
                {questions.map((q) => (
                  <div key={q.id} className="rounded-xl border border-line bg-ivory px-4 py-3">
                    <p className="text-sm font-semibold text-ink">
                      {q.id}. {q.title}
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {q.options.map((o) => (
                        <li key={o.label} className="rounded-full border border-line bg-white px-2.5 py-0.5 text-xs text-body">
                          {o.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function AnnexInterview({ qa }) {
  const [showAnswers, setShowAnswers] = useState(false);
  return (
    <div className="space-y-4">
      <label className="inline-flex items-center gap-2.5 text-sm font-medium text-plum cursor-pointer">
        <input type="checkbox" checked={showAnswers} onChange={(e) => setShowAnswers(e.target.checked)} className="h-4 w-4 accent-[#4A2574]" />
        Mostrar las respuestas registradas
      </label>
      <ol className="space-y-2.5">
        {qa.map((it) => (
          <li key={it.n} className="rounded-xl border border-line bg-ivory px-4 py-3">
            <p className="text-sm font-semibold text-ink">
              {it.n}. {it.question}
            </p>
            {showAnswers && <p className="mt-2 border-l-2 border-bronze pl-3 font-serif italic text-[15px] text-body">{it.answer}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}

const ANNEX_CONTENT = {
  cronograma: () => <AnnexCronograma />,
  gantt: () => <AnnexGantt />,
  observacion: () => <AnnexObservacion />,
  cuestionario: () => <AnnexCuestionario />,
  tutor: () => <AnnexInterview qa={TUTOR_QA} />,
  coordinador: () => <AnnexInterview qa={COORDINATOR_QA} />,
};

/* ---------------------------------------------------------------------
   Utilidades de presentación
   --------------------------------------------------------------------- */

function Block({ id, code, title, children }) {
  return (
    <section id={id} className="scroll-mt-32 space-y-6">
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">{code}</p>
        <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-ink leading-tight">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function SituationCard({ item, positive }) {
  const Icon = item.icon;
  return (
    <motion.div variants={fadeUp} className={cx('rounded-3xl border p-5 h-full', positive ? 'border-sage-line bg-sage-soft' : 'border-wine-line bg-wine-soft')}>
      <span className={cx('inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white border', positive ? 'border-sage-line text-sage' : 'border-wine-line text-wine')}>
        <Icon size={18} />
      </span>
      <p className="mt-3 font-semibold text-ink">{item.title}</p>
      <p className="mt-1.5 text-sm text-body leading-relaxed">{item.text}</p>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Experiencias_significativas() {
  const [annex, setAnnex] = useState(null);
  const current = ANNEXES.find((a) => a.id === annex);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Apartados 13 y 14 · Cierre"
        icon={Star}
        title="Experiencias, conclusiones y"
        highlight="anexos"
        description="Situaciones significativas, aprendizajes, conclusiones finales, valoración de la práctica, proyección profesional y documentos complementarios."
      />

      <nav aria-label="Índice de la sección" className="flex flex-wrap gap-2">
        {INDEX.map((i) => (
          <button
            key={i.id}
            type="button"
            onClick={() => scrollTo(i.id)}
            className="min-h-[40px] inline-flex items-center gap-2 rounded-full border border-lilac-line bg-white px-4 text-xs sm:text-sm font-medium text-body hover:border-line-strong hover:text-plum transition-colors"
          >
            <span className="font-semibold text-bronze">{i.code}</span> {i.label}
          </button>
        ))}
      </nav>

      {/* 13.a */}
      <Block id="relato" code="13.a Relato de situaciones relevantes" title="Acompañar a estudiantes adultos en la modalidad flexible">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p className="flex items-center gap-2 font-semibold text-sage">
              <ThumbsUp size={18} /> Situaciones positivas
            </p>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 gap-3">
              {SITUATIONS.positive.map((s) => (
                <SituationCard key={s.title} item={s} positive />
              ))}
            </motion.div>
          </div>
          <div className="space-y-4">
            <p className="flex items-center gap-2 font-semibold text-wine">
              <Mountain size={18} /> Situaciones desafiantes
            </p>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 gap-3">
              {SITUATIONS.challenging.map((s) => (
                <SituationCard key={s.title} item={s} />
              ))}
            </motion.div>
          </div>
        </div>
      </Block>

      {/* 13.b */}
      <Block id="aprendizajes" code="13.b Aprendizajes pedagógicos" title="Lo que la práctica me enseñó">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {LEARNINGS.map((l, i) => {
            const Icon = l.icon;
            return (
              <motion.div key={l.title} variants={fadeUp}>
                <GlassCard className="h-full" padded={false}>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lilac border border-lilac-line text-plum">
                        <Icon size={18} />
                      </span>
                      <span className="font-serif text-3xl font-semibold text-bronze leading-none">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <p className="mt-4 font-semibold text-ink">{l.title}</p>
                    <p className="mt-1.5 text-sm text-body leading-relaxed">{l.text}</p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </Block>

      {/* 13.c */}
      <Block id="conclusiones" code="13.c Conclusiones finales" title="Del diagnóstico al portafolio">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {CONCLUSIONS.map((c, i) => (
            <GlassCard key={c.slice(0, 20)} hover={false}>
              <span className="font-serif text-5xl font-semibold text-plum leading-none">{i + 1}</span>
              <p className="mt-4 text-[15px] text-body leading-relaxed">{c}</p>
            </GlassCard>
          ))}
        </div>
      </Block>

      {/* 13.d */}
      <section id="valoracion" className="scroll-mt-32">
        <PlumBand>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#E5D5B5] font-semibold">13.d Valoración general de la práctica docente</p>
              <Quote size={26} className="mt-5 text-[#E5D5B5]" />
              <p className="mt-3 font-serif text-2xl sm:text-3xl leading-snug text-on-plum">
                La práctica ha sido una experiencia formativa que unió la teoría de la Informática Educativa con una realidad concreta: enseñar Ciencias a personas
                adultas que estudian contra el reloj. Me deja la convicción de que la tecnología solo transforma cuando se diseña con empatía y propósito.
              </p>
            </div>
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              {[
                { v: '4', l: 'Instrumentos aplicados' },
                { v: '18', l: 'Actividades cumplidas' },
                { v: '5', l: 'Acciones de mejora' },
                { v: '4', l: 'Módulos del recurso' },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-white/20 p-4">
                  <span className="block font-serif text-4xl font-semibold text-on-plum leading-none">{s.v}</span>
                  <span className="block mt-1.5 text-xs text-on-plum-muted">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </PlumBand>
      </section>

      {/* 13.e y 13.f */}
      <section id="logros" className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard hover={false}>
          <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">13.e Logros alcanzados</p>
          <p className="mt-1 flex items-center gap-2 font-serif text-3xl font-semibold text-ink">
            <Trophy size={24} className="text-bronze" /> Logros
          </p>
          <ul className="mt-5 space-y-3">
            {ACHIEVEMENTS.map((a) => (
              <li key={a} className="flex gap-3 text-[15px] text-body leading-relaxed">
                <CircleCheck size={18} className="shrink-0 mt-0.5 text-sage" />
                {a}
              </li>
            ))}
          </ul>
        </GlassCard>
        <GlassCard hover={false}>
          <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">13.f Áreas de mejora continua</p>
          <p className="mt-1 flex items-center gap-2 font-serif text-3xl font-semibold text-ink">
            <TrendingUp size={24} className="text-plum" /> Por fortalecer
          </p>
          <ul className="mt-5 space-y-3">
            {IMPROVEMENTS.map((a) => (
              <li key={a} className="flex gap-3 text-[15px] text-body leading-relaxed">
                <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-plum" />
                {a}
              </li>
            ))}
          </ul>
        </GlassCard>
      </section>

      {/* 13.g */}
      <Block id="proyeccion" code="13.g Proyección profesional" title="Como futura Licenciada en Informática Educativa">
        <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROJECTION.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.li
                key={p.horizon}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                className="rounded-3xl border border-line bg-white shadow-paper p-6"
              >
                <div className="flex items-center gap-3">
                  <span className={cx('inline-flex h-11 w-11 items-center justify-center rounded-2xl border', i === 2 ? 'bg-plum border-plum text-white' : 'bg-lilac border-lilac-line text-plum')}>
                    <Icon size={20} />
                  </span>
                  <Badge toneName={['violet', 'amber', 'emerald'][i]}>{p.horizon}</Badge>
                </div>
                <p className="mt-4 font-serif text-2xl font-semibold text-ink leading-tight">{p.title}</p>
                <p className="mt-2 text-sm text-body leading-relaxed">{p.text}</p>
              </motion.li>
            );
          })}
        </ol>
        <div className="flex items-center gap-3 rounded-2xl border border-sand-line bg-sand px-5 py-4">
          <Rocket size={20} className="shrink-0 text-bronze" />
          <p className="text-sm text-ink">Cada etapa se apoya en lo aprendido en esta práctica: diagnóstico, diseño con empatía y tecnología con propósito.</p>
        </div>
      </Block>

      {/* 14.a */}
      <Block id="anexos" code="14.a Centro de anexos" title="Documentos complementarios">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ANNEXES.map((a) => {
            const Icon = a.icon;
            return (
              <motion.button
                key={a.id}
                type="button"
                variants={fadeUp}
                onClick={() => setAnnex(a.id)}
                className="group text-left rounded-3xl border border-line bg-white shadow-paper hover:shadow-paper-lg hover:border-line-strong transition-all p-5 flex items-start gap-4"
              >
                <div className="relative shrink-0">
                  <span className="inline-flex h-14 w-12 items-center justify-center rounded-lg border border-line bg-ivory text-plum">
                    <Icon size={20} />
                  </span>
                  <span className="absolute -top-2 -right-2 rounded-md bg-plum px-1.5 py-0.5 text-[10px] font-bold text-white">{a.code}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink leading-snug">{a.title}</p>
                  <p className="text-xs text-muted mt-1">{a.meta}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-plum">
                    Vista previa <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
        <p className="flex items-center gap-2 text-xs text-muted">
          <Paperclip size={14} /> Los anexos reproducen el contenido de los instrumentos y del cronograma utilizados en el diagnóstico.
        </p>
      </Block>

      <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-line bg-white shadow-paper p-5">
        <Flag size={18} className="text-bronze" />
        <p className="text-sm text-body flex-1 min-w-[200px]">Fin del portafolio digital de práctica docente · Ciclo II-2026.</p>
        <Badge toneName="violet" icon={Sparkles}>
          Stephanie A. Hernández Sibrián
        </Badge>
      </div>

      <Modal open={Boolean(current)} onClose={() => setAnnex(null)} title={current ? `${current.code} · ${current.title}` : ''} subtitle={current?.meta} icon={current?.icon || FileText} size="xl">
        {annex && ANNEX_CONTENT[annex]()}
      </Modal>
    </PageShell>
  );
}
