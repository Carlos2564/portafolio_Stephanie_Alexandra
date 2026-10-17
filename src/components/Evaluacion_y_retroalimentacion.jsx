import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquareQuote,
  GraduationCap,
  Presentation,
  Laptop,
  NotebookPen,
  RotateCcw,
  ClipboardCheck,
  House,
  FolderOpen,
  FileText,
  FlaskConical,
  Microscope,
  HelpCircle,
  UserRound,
  Users,
  Quote,
  PenLine,
  Info,
  Check,
  Award,
} from 'lucide-react';
import { PageShell, GlassCard, SectionHeader, Badge, ProgressBar, DonutChart, Divider } from './ui/Primitives';
import { cx, fadeUp, stagger } from './ui/tokens';

/* =====================================================================
   EVALUACIÓN Y RETROALIMENTACIÓN · Apartados 10.a y 10.b
   ===================================================================== */

const LEVELS = [
  { v: 1, label: 'Inicial', hint: 'Lo realiza con apoyo constante' },
  { v: 2, label: 'En desarrollo', hint: 'Lo realiza de forma parcial o irregular' },
  { v: 3, label: 'Logrado', hint: 'Lo realiza de forma autónoma y adecuada' },
  { v: 4, label: 'Destacado', hint: 'Lo realiza con autonomía y propone mejoras' },
];

/** Valoración registrada por la practicante (nivel de 1 a 4 en cada criterio). */
const COMPETENCIES = [
  {
    id: 'pedagogica',
    label: 'Pedagógica',
    icon: GraduationCap,
    tone: 'violet',
    criteria: [
      { id: 'pe1', text: 'Fundamenta sus decisiones en el diagnóstico del grupo.', level: 4 },
      { id: 'pe2', text: 'Planifica secuencias coherentes con el modelo de aula invertida.', level: 3 },
      { id: 'pe3', text: 'Atiende la diversidad de ritmos y responsabilidades del estudiantado.', level: 3 },
    ],
  },
  {
    id: 'didactica',
    label: 'Didáctica',
    icon: Presentation,
    tone: 'amber',
    criteria: [
      { id: 'di1', text: 'Selecciona estrategias activas y colaborativas.', level: 3 },
      { id: 'di2', text: 'Diseña evaluaciones formativas con evidencias claras.', level: 3 },
      { id: 'di3', text: 'Formula instrucciones claras y graduadas.', level: 3 },
    ],
  },
  {
    id: 'tecnologica',
    label: 'Tecnológica',
    icon: Laptop,
    tone: 'emerald',
    criteria: [
      { id: 'te1', text: 'Integra herramientas digitales con propósito didáctico (TPACK).', level: 4 },
      { id: 'te2', text: 'Diseña recursos Mobile-First y accesibles sin conexión.', level: 3 },
      { id: 'te3', text: 'Gestiona entornos virtuales de aprendizaje.', level: 3 },
    ],
  },
  {
    id: 'reflexiva',
    label: 'Reflexiva',
    icon: NotebookPen,
    tone: 'indigo',
    criteria: [
      { id: 're1', text: 'Registra y analiza su práctica en el diario reflexivo.', level: 3 },
      { id: 're2', text: 'Identifica sus fortalezas y áreas de mejora.', level: 3 },
      { id: 're3', text: 'Incorpora la retroalimentación recibida.', level: 2 },
    ],
  },
];

const INITIAL_LEVELS = Object.fromEntries(COMPETENCIES.flatMap((c) => c.criteria.map((cr) => [cr.id, cr.level])));

const STRATEGIES = [
  { icon: House, title: 'Actividades exaula', type: 'Formativa', moment: 'Entre semana', text: 'Actividades al final de cada lección del módulo, presentadas en la tutoría del sábado.' },
  { icon: FolderOpen, title: 'Portafolio del módulo', type: 'Formativa y sumativa', moment: 'Continuo', text: 'Reúne las evidencias de aprendizaje del estudiante a lo largo del módulo.' },
  { icon: FileText, title: 'Exámenes escritos', type: 'Sumativa', moment: 'Cierre del módulo', text: 'Valoran la comprensión de los contenidos de Ciencias Naturales.' },
  { icon: FlaskConical, title: 'Experimentos', type: 'Formativa', moment: 'Tutoría sabatina', text: 'Aplicación de los conceptos mediante la observación y el registro de datos.' },
  { icon: Microscope, title: 'Prácticas de laboratorio', type: 'Formativa', moment: 'Tutoría sabatina', text: 'Trabajo en equipo con procedimientos guiados y productos verificables.' },
  { icon: HelpCircle, title: 'Autoevaluación y preguntas de cierre', type: 'Formativa', moment: 'Final de cada tutoría', text: 'Autoevaluación de lo aprendido y preguntas dirigidas a quienes presentan más dificultades.' },
];

/**
 * Retroalimentación recibida. Escribe el comentario textual en `comment`
 * y la fecha en `date` cuando se reciba la valoración.
 */
const FEEDBACK = [
  { id: 'tutor', name: 'Lcdo. Amilcar Heriberto Sánchez', role: 'Docente tutor institucional', icon: UserRound, comment: null, date: null },
  { id: 'ues', name: 'Ing. Misael Enrique Juárez Blanco', role: 'Coordinador y docente tutor UES', icon: GraduationCap, comment: null, date: null },
];

/* ---------------------------------------------------------------------
   Sub-componentes
   --------------------------------------------------------------------- */

const scoreOf = (comp, levels) => {
  const sum = comp.criteria.reduce((acc, cr) => acc + levels[cr.id], 0);
  return Math.round((sum / (comp.criteria.length * 4)) * 100);
};

function LevelButton({ level, active, onClick, compact = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      title={level.hint}
      className={cx(
        'rounded-xl border text-xs font-semibold transition-colors',
        compact ? 'min-h-[40px] px-2' : 'min-h-[38px] w-full px-2',
        active ? 'border-plum bg-plum text-white shadow-sm' : 'border-line bg-white text-muted hover:border-line-strong hover:text-plum'
      )}
    >
      {active && <Check size={12} className="inline mr-1 -mt-0.5" />}
      {compact ? level.v : level.label}
    </button>
  );
}

function Rubric({ levels, setLevel }) {
  return (
    <div className="space-y-6">
      {COMPETENCIES.map((comp) => {
        const Icon = comp.icon;
        return (
          <div key={comp.id} className="space-y-3">
            <p className="flex items-center gap-2 font-semibold text-ink">
              <Icon size={17} className="text-plum" /> Competencia {comp.label.toLowerCase()}
              <span className="ml-auto text-sm font-semibold text-plum tabular-nums">{scoreOf(comp, levels)}%</span>
            </p>

            {/* Móvil: tarjetas */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {comp.criteria.map((cr) => (
                <div key={cr.id} className="rounded-2xl border border-line bg-white shadow-paper p-4">
                  <p className="text-sm text-ink leading-snug">{cr.text}</p>
                  <div className="mt-3 grid grid-cols-4 gap-1.5">
                    {LEVELS.map((lv) => (
                      <LevelButton key={lv.v} level={lv} active={levels[cr.id] === lv.v} onClick={() => setLevel(cr.id, lv.v)} compact />
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-muted">Nivel: {LEVELS[levels[cr.id] - 1].label}</p>
                </div>
              ))}
            </div>

            {/* Escritorio: tabla */}
            <div className="hidden md:block overflow-x-auto rounded-2xl border border-line bg-white shadow-paper">
              <table className="w-full min-w-[760px] text-sm">
                <thead>
                  <tr className="bg-silk text-[11px] uppercase tracking-[0.14em] text-muted">
                    <th className="px-4 py-3 text-left font-semibold">Criterio</th>
                    {LEVELS.map((lv) => (
                      <th key={lv.v} className="px-2 py-3 text-center font-semibold w-32">
                        {lv.v} · {lv.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comp.criteria.map((cr) => (
                    <tr key={cr.id} className="border-t border-line hover:bg-ivory transition-colors">
                      <td className="px-4 py-3 text-ink">{cr.text}</td>
                      {LEVELS.map((lv) => (
                        <td key={lv.v} className="px-2 py-3">
                          <LevelButton level={lv} active={levels[cr.id] === lv.v} onClick={() => setLevel(cr.id, lv.v)} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FeedbackCard({ item }) {
  const Icon = item.icon;
  return (
    <GlassCard hover={false} className="h-full flex flex-col">
      <div className="flex items-start gap-4">
        <span className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-lilac border border-lilac-line text-plum">
          <Icon size={22} />
        </span>
        <div className="min-w-0">
          <p className="font-serif text-2xl font-semibold text-ink leading-tight">{item.name}</p>
          <p className="text-sm text-muted">{item.role}</p>
        </div>
      </div>
      {item.comment ? (
        <figure className="mt-5 flex-1">
          <Quote size={20} className="text-bronze" />
          <blockquote className="mt-2 font-serif italic text-xl leading-snug text-ink">{item.comment}</blockquote>
          {item.date && <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-bronze">{item.date}</figcaption>}
        </figure>
      ) : (
        <div className="mt-5 flex-1 rounded-2xl border border-dashed border-line-strong bg-ivory p-5">
          <Badge toneName="slate" icon={PenLine}>
            Pendiente de registrar
          </Badge>
          <p className="mt-3 text-sm text-body leading-relaxed">Espacio reservado para transcribir la valoración recibida. Se sugiere incluir:</p>
          <ul className="mt-2 space-y-1.5">
            {['Fortalezas señaladas en la práctica.', 'Sugerencias de mejora.', 'Fecha y contexto de la retroalimentación.', 'Cómo se incorporó en las siguientes jornadas.'].map((t) => (
              <li key={t} className="flex gap-2 text-sm text-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-line-strong" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </GlassCard>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Evaluacion_y_retroalimentacion() {
  const [levels, setLevels] = useState(INITIAL_LEVELS);
  const setLevel = (id, v) => setLevels((prev) => ({ ...prev, [id]: v }));
  const modified = Object.keys(INITIAL_LEVELS).some((k) => INITIAL_LEVELS[k] !== levels[k]);

  const scores = useMemo(() => COMPETENCIES.map((c) => ({ ...c, score: scoreOf(c, levels) })), [levels]);
  const overall = Math.round(scores.reduce((a, s) => a + s.score, 0) / scores.length);
  const distribution = LEVELS.map((lv) => ({ label: lv.label, value: Object.values(levels).filter((x) => x === lv.v).length }));

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Apartado 10 · Evaluación"
        icon={MessageSquareQuote}
        title="Evaluación y"
        highlight="retroalimentación"
        description="Autoevaluación del desempeño docente, estrategias de evaluación aplicadas en el aula y retroalimentación recibida durante la práctica."
      />

      {/* 10.a Autoevaluación */}
      <section className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">10.a Autoevaluación del desempeño docente</p>
            <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-ink">Stephanie Alexandra Hernández Sibrián</h3>
          </div>
          {modified && (
            <button
              type="button"
              onClick={() => setLevels(INITIAL_LEVELS)}
              className="self-start min-h-[42px] inline-flex items-center gap-2 rounded-2xl border border-lilac-line bg-lilac px-4 text-sm font-semibold text-plum hover:bg-silk-deep transition-colors"
            >
              <RotateCcw size={16} /> Restablecer valoración registrada
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <GlassCard hover={false} className="lg:col-span-4 flex flex-col items-center text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-4">Nivel global de logro</p>
            <DonutChart
              data={distribution.map((d, i) => ({ ...d, color: ['#C9B48A', '#B08A4F', '#9B7BC4', '#4A2574'][i] }))}
              centerValue={`${overall}%`}
              centerLabel="de logro"
            />
            <div className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-body">
              {distribution.map((d, i) => (
                <span key={d.label} className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: ['#C9B48A', '#B08A4F', '#9B7BC4', '#4A2574'][i] }} />
                  {d.label} ({d.value})
                </span>
              ))}
            </div>
          </GlassCard>
          <GlassCard hover={false} className="lg:col-span-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-5">Logro por competencia</p>
            <div className="space-y-5">
              {scores.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.id} className="flex items-center gap-4">
                    <span className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lilac border border-lilac-line text-plum">
                      <Icon size={18} />
                    </span>
                    <div className="flex-1">
                      <ProgressBar label={`Competencia ${s.label.toLowerCase()}`} value={s.score} toneName={s.tone} delay={i * 0.08} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {LEVELS.map((lv) => (
                <div key={lv.v} className="rounded-xl border border-line bg-ivory p-2.5">
                  <p className="text-xs font-semibold text-ink">
                    {lv.v} · {lv.label}
                  </p>
                  <p className="text-[11px] text-muted leading-tight mt-0.5">{lv.hint}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <GlassCard hover={false}>
          <div className="flex items-start gap-2.5 mb-6 rounded-2xl border border-sand-line bg-sand px-4 py-3 text-sm text-bronze-dark">
            <Info size={16} className="shrink-0 mt-0.5" />
            La rúbrica muestra la valoración registrada por la practicante. Puedes seleccionar otros niveles para explorar escenarios; los cambios no se guardan.
          </div>
          <Rubric levels={levels} setLevel={setLevel} />
        </GlassCard>
      </section>

      <Divider />

      {/* Estrategias de evaluación */}
      <section className="space-y-6">
        <div className="flex items-start gap-3">
          <span className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-lilac border border-lilac-line text-plum">
            <ClipboardCheck size={19} />
          </span>
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">Estrategias en el aula</p>
            <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-ink">Cómo se evalúa y retroalimenta</h3>
            <p className="text-sm text-muted mt-1">Según la entrevista al docente tutor (preguntas 5 y 6).</p>
          </div>
        </div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STRATEGIES.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.title} variants={fadeUp} className="rounded-3xl border border-line bg-white shadow-paper p-5 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sand border border-sand-line text-bronze">
                    <Icon size={18} />
                  </span>
                  <Badge toneName={s.type === 'Sumativa' ? 'amber' : s.type === 'Formativa' ? 'emerald' : 'violet'}>{s.type}</Badge>
                </div>
                <p className="mt-4 font-semibold text-ink">{s.title}</p>
                <p className="mt-1 text-sm text-body leading-relaxed flex-1">{s.text}</p>
                <p className="mt-3 text-xs font-semibold text-plum">{s.moment}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* 10.b Retroalimentación */}
      <section className="space-y-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">10.b Comentarios y retroalimentación recibida</p>
          <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-ink">Voces que acompañan la práctica</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {FEEDBACK.map((f) => (
            <FeedbackCard key={f.id} item={f} />
          ))}
          <div className="rounded-3xl bg-abyss text-on-plum p-6 sm:p-7 flex flex-col">
            <div className="flex items-start gap-4">
              <span className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-plum-deep border border-white/20 text-[#E5D5B5]">
                <Users size={22} />
              </span>
              <div>
                <p className="font-serif text-2xl font-semibold leading-tight">Percepción estudiantil</p>
                <p className="text-sm text-on-plum-muted">Diagnóstico · 12/09/2026 · N = 11</p>
              </div>
            </div>
            <div className="mt-6 space-y-4 flex-1">
              {[
                { v: '90.9%', l: 'percibe instrucciones claras o muy claras', s: 'P10' },
                { v: '90.9%', l: 'siente al docente disponible siempre o casi siempre', s: 'P11' },
              ].map((m) => (
                <div key={m.s} className="rounded-2xl border border-white/15 p-4 flex items-center gap-4">
                  <span className="font-serif text-4xl font-semibold text-[#E5D5B5] leading-none">{m.v}</span>
                  <span className="text-sm text-on-plum leading-snug">
                    {m.l} <span className="text-on-plum-muted">({m.s})</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 flex gap-2 text-xs text-on-plum-muted leading-relaxed">
              <Award size={15} className="shrink-0 text-[#E5D5B5]" />
              Valoración del acompañamiento docente en la asignatura, que la practicante asume como referente de calidad para su propia práctica.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
