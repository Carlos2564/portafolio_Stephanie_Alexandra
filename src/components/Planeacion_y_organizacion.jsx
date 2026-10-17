import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarRange,
  ListChecks,
  Layers,
  Clock,
  UserRound,
  Table2,
  ChartGantt,
  Link2,
  Flag,
  PenLine,
  Search as SearchIcon,
  Eye,
  ChartPie,
  Lightbulb,
  Layout,
  CloudUpload,
  MessageCircle,
  Presentation,
  NotebookPen,
  CircleCheck,
  CalendarDays,
} from 'lucide-react';
import { PageShell, GlassCard, SectionHeader, Badge, SearchInput, FilterChips, SegmentedControl, StatCard, EmptyState, Divider } from './ui/Primitives';
import { cx, normalize, fadeUp, stagger } from './ui/tokens';
import { CRONOGRAMA, CRONOGRAMA_STAGES, formatDate } from '../data/diagnostico';

/* =====================================================================
   PLANEACIÓN Y ORGANIZACIÓN · Cronograma, Gantt y plan semanal
   ===================================================================== */

const RESPONSIBLE = 'Stephanie Hernández';
const RANGE_START = '2026-08-12';
const RANGE_END = '2026-09-20';

const STAGE_STYLE = {
  antes: { bar: 'bg-plum', soft: 'bg-lilac border-lilac-line text-plum', tone: 'violet', icon: PenLine },
  durante: { bar: 'bg-bronze-dark', soft: 'bg-sand border-sand-line text-bronze-dark', tone: 'amber', icon: Eye },
  despues: { bar: 'bg-sage', soft: 'bg-sage-soft border-sage-line text-sage', tone: 'emerald', icon: ChartPie },
};

const MILESTONES = [
  { date: '2026-08-22', label: 'Observación' },
  { date: '2026-09-12', label: 'Trabajo de campo' },
  { date: '2026-09-20', label: 'Entrega' },
];

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

const toUTC = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
};
const DAY = 86400000;
const dayIndex = (iso) => Math.round((toUTC(iso) - toUTC(RANGE_START)) / DAY);
const TOTAL_DAYS = dayIndex(RANGE_END) + 1;
const shortDate = (iso) => {
  const [, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]}`;
};
const isoFromIndex = (i) => new Date(toUTC(RANGE_START) + i * DAY).toISOString().slice(0, 10);
const WEEK_TICKS = Array.from({ length: Math.ceil(TOTAL_DAYS / 7) }, (_, k) => ({ index: k * 7, label: shortDate(isoFromIndex(k * 7)) }));

const WEEK_PLAN = [
  {
    id: 'lun',
    day: 'Lunes',
    phase: 'Análisis',
    icon: SearchIcon,
    focus: 'Revisión del módulo y del diagnóstico',
    tasks: ['Revisar la lección del módulo que corresponde a la semana.', 'Definir objetivos de aprendizaje alineados con el diagnóstico.', 'Identificar qué adaptaciones necesita el grupo.'],
    product: 'Objetivos y adaptaciones de la semana',
  },
  {
    id: 'mar',
    day: 'Martes',
    phase: 'Diseño instruccional',
    icon: Layout,
    focus: 'Secuencia Antes · Durante · Después',
    tasks: ['Diseñar la secuencia del aula invertida.', 'Seleccionar videos, lecturas y prácticas.', 'Planificar la evaluación formativa.'],
    product: 'Plan de clase en borrador',
  },
  {
    id: 'mie',
    day: 'Miércoles',
    phase: 'Producción',
    icon: PenLine,
    focus: 'Elaboración de recursos ligeros',
    tasks: ['Elaborar cápsulas, guías e infografías Mobile-First.', 'Preparar versiones PDF descargables.', 'Validar el plan con el docente tutor.'],
    product: 'Recursos listos para publicar',
  },
  {
    id: 'jue',
    day: 'Jueves',
    phase: 'Publicación',
    icon: CloudUpload,
    focus: 'Classroom / Moodle',
    tasks: ['Publicar los materiales del “Antes” en Classroom o Moodle.', 'Avisar en el grupo de WhatsApp con instrucciones claras.', 'Fijar fechas de entrega realistas.'],
    product: 'Materiales publicados y comunicados',
  },
  {
    id: 'vie',
    day: 'Viernes',
    phase: 'Seguimiento',
    icon: MessageCircle,
    focus: 'Dudas y preparación de la tutoría',
    tasks: ['Resolver dudas por WhatsApp.', 'Revisar el avance de las actividades exaula.', 'Preparar materiales de práctica o laboratorio.'],
    product: 'Tutoría sabatina preparada',
  },
  {
    id: 'sab',
    day: 'Sábado',
    phase: 'Tutoría presencial',
    icon: Presentation,
    focus: 'Jornada de 7:00 a.m. a 5:00 p.m.',
    tasks: ['Inicio: recuperar lo trabajado en la semana.', 'Desarrollo: prácticas, experimentos y trabajo en equipo.', 'Cierre: autoevaluación y preguntas de comprobación.'],
    product: 'Evidencias de la tutoría',
  },
  {
    id: 'dom',
    day: 'Domingo',
    phase: 'Reflexión',
    icon: NotebookPen,
    focus: 'Diario reflexivo',
    tasks: ['Registrar actividades, retos y soluciones.', 'Anotar aprendizajes y reflexión personal.', 'Organizar las evidencias de la semana.'],
    product: 'Entrada del diario reflexivo',
  },
];

/* ---------------------------------------------------------------------
   Vista tabla
   --------------------------------------------------------------------- */

function DepsLabel({ deps }) {
  if (!deps.length) return <span className="text-muted">—</span>;
  return (
    <span className="inline-flex flex-wrap gap-1">
      {deps.map((d) => (
        <span key={d} className="rounded-md border border-line bg-ivory px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-plum">
          {d}
        </span>
      ))}
    </span>
  );
}

function ScheduleTable({ rows }) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {rows.map((a) => {
          const st = STAGE_STYLE[a.stage];
          return (
            <div key={a.id} className="rounded-2xl border border-line bg-white shadow-paper p-4">
              <div className="flex items-start gap-3">
                <span className="font-serif text-2xl font-semibold text-bronze leading-none tabular-nums">{String(a.id).padStart(2, '0')}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink leading-snug">{a.name}</p>
                  <span className={cx('mt-2 inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold', st.soft)}>{CRONOGRAMA_STAGES[a.stage].label}</span>
                </div>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-muted font-semibold">Inicio</dt>
                  <dd className="text-ink tabular-nums">{formatDate(a.start)}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-muted font-semibold">Fin</dt>
                  <dd className="text-ink tabular-nums">{formatDate(a.end)}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-muted font-semibold">Duración</dt>
                  <dd className="text-ink">
                    {a.days} {a.days === 1 ? 'día' : 'días'}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-muted font-semibold">Depende de</dt>
                  <dd>
                    <DepsLabel deps={a.deps} />
                  </dd>
                </div>
              </dl>
            </div>
          );
        })}
      </div>

      <div className="hidden md:block overflow-x-auto rounded-3xl border border-line bg-white shadow-paper">
        <table className="w-full min-w-[880px] text-sm">
          <thead>
            <tr className="bg-silk text-left text-[11px] uppercase tracking-[0.14em] text-muted">
              <th className="px-4 py-3.5 font-semibold w-14">N.°</th>
              <th className="px-4 py-3.5 font-semibold">Actividad</th>
              <th className="px-4 py-3.5 font-semibold w-28">Etapa</th>
              <th className="px-4 py-3.5 font-semibold w-28">Inicio</th>
              <th className="px-4 py-3.5 font-semibold w-28">Fin</th>
              <th className="px-4 py-3.5 font-semibold w-24">Duración</th>
              <th className="px-4 py-3.5 font-semibold w-32">Dependencias</th>
              <th className="px-4 py-3.5 font-semibold w-44">Responsable</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => {
              const st = STAGE_STYLE[a.stage];
              return (
                <tr key={a.id} className="border-t border-line hover:bg-ivory transition-colors">
                  <td className="px-4 py-3.5 font-serif text-xl font-semibold text-bronze tabular-nums">{String(a.id).padStart(2, '0')}</td>
                  <td className="px-4 py-3.5 font-medium text-ink">{a.name}</td>
                  <td className="px-4 py-3.5">
                    <span className={cx('inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold', st.soft)}>{CRONOGRAMA_STAGES[a.stage].label}</span>
                  </td>
                  <td className="px-4 py-3.5 tabular-nums text-body">{formatDate(a.start)}</td>
                  <td className="px-4 py-3.5 tabular-nums text-body">{formatDate(a.end)}</td>
                  <td className="px-4 py-3.5 text-body">
                    {a.days} {a.days === 1 ? 'día' : 'días'}
                  </td>
                  <td className="px-4 py-3.5">
                    <DepsLabel deps={a.deps} />
                  </td>
                  <td className="px-4 py-3.5 text-body">{RESPONSIBLE}</td>
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
   Vista Gantt
   --------------------------------------------------------------------- */

function GanttChart({ rows }) {
  const [hovered, setHovered] = useState(null);
  const active = rows.find((r) => r.id === hovered) || CRONOGRAMA.find((r) => r.id === hovered);
  const related = new Set(active ? [...active.deps, ...CRONOGRAMA.filter((r) => r.deps.includes(active.id)).map((r) => r.id)] : []);
  const pct = (i) => `${(i / TOTAL_DAYS) * 100}%`;

  return (
    <div>
      {/* Móvil: línea de tiempo vertical */}
      <ol className="md:hidden relative space-y-3 pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-line-strong">
        {rows.map((a) => {
          const st = STAGE_STYLE[a.stage];
          return (
            <li key={a.id} className="relative">
              <span className={cx('absolute -left-[21px] top-4 h-3 w-3 rounded-full border-2 border-white', st.bar)} />
              <div className="rounded-2xl border border-line bg-white shadow-paper p-4">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="font-semibold text-plum tabular-nums">
                    {formatDate(a.start)}
                    {a.end !== a.start && ` → ${formatDate(a.end)}`}
                  </span>
                  <span className="text-muted">
                    {a.days} {a.days === 1 ? 'día' : 'días'}
                  </span>
                </div>
                <p className="mt-1.5 font-medium text-ink leading-snug">
                  <span className="text-bronze font-serif font-semibold mr-1.5">{a.id}.</span>
                  {a.name}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Escritorio: diagrama de Gantt */}
      <div className="hidden md:block overflow-x-auto rounded-3xl border border-line bg-white shadow-paper">
        <div className="min-w-[980px]">
          <div className="grid grid-cols-[300px_1fr] border-b border-line bg-silk">
            <div className="px-4 py-3 text-[11px] uppercase tracking-[0.14em] text-muted font-semibold">Actividad</div>
            <div className="relative h-11">
              {WEEK_TICKS.map((t) => (
                <span key={t.index} className="absolute top-0 h-full border-l border-line pl-1.5 pt-3 text-[11px] font-semibold text-muted" style={{ left: pct(t.index) }}>
                  {t.label}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 grid grid-cols-[300px_1fr]">
              <div />
              <div className="relative">
                {WEEK_TICKS.map((t) => (
                  <span key={t.index} className="absolute inset-y-0 border-l border-line/70" style={{ left: pct(t.index) }} />
                ))}
                {MILESTONES.map((m) => (
                  <span key={m.date} className="absolute inset-y-0 border-l-2 border-dashed border-bronze/50" style={{ left: pct(dayIndex(m.date) + 0.5) }} />
                ))}
              </div>
            </div>
            {rows.map((a) => {
              const st = STAGE_STYLE[a.stage];
              const s = dayIndex(a.start);
              const e = dayIndex(a.end);
              const isActive = hovered === a.id;
              const isRelated = related.has(a.id);
              return (
                <div
                  key={a.id}
                  className={cx(
                    'relative grid grid-cols-[300px_1fr] border-b border-line/70 last:border-b-0 transition-colors',
                    isActive ? 'bg-lilac/60' : isRelated ? 'bg-sand/70' : 'hover:bg-ivory'
                  )}
                  onMouseEnter={() => setHovered(a.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="px-4 py-2.5 flex items-center gap-2.5 min-w-0">
                    <span className="font-serif text-lg font-semibold text-bronze tabular-nums w-6 shrink-0">{a.id}</span>
                    <span className="text-[13px] text-ink leading-snug truncate" title={a.name}>
                      {a.name}
                    </span>
                  </div>
                  <div className="relative h-11">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: a.id * 0.03, ease: [0.22, 1, 0.36, 1] }}
                      className={cx('absolute top-2.5 h-6 rounded-lg origin-left flex items-center px-2', st.bar, isActive && 'ring-2 ring-offset-1 ring-plum')}
                      style={{ left: pct(s), width: `max(${pct(e - s + 1)}, 1.6rem)` }}
                    >
                      <span className="text-[10px] font-bold text-white tabular-nums">{a.days}d</span>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-ivory px-4 py-3 text-xs text-body">
            <div className="flex flex-wrap gap-4">
              {Object.entries(CRONOGRAMA_STAGES).map(([k, v]) => (
                <span key={k} className="inline-flex items-center gap-1.5">
                  <span className={cx('h-2.5 w-2.5 rounded-sm', STAGE_STYLE[k].bar)} /> {v.label}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5">
                <span className="h-3 border-l-2 border-dashed border-bronze/60" /> Hito
              </span>
            </div>
            <span className="text-muted">
              {active ? (
                <>
                  <span className="font-semibold text-plum">Actividad {active.id}</span> · depende de {active.deps.length ? active.deps.join(', ') : 'ninguna'}
                </>
              ) : (
                'Pasa el cursor sobre una actividad para ver sus dependencias'
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Plan semanal (5.b)
   --------------------------------------------------------------------- */

function WeeklyPlan() {
  const [day, setDay] = useState('sab');
  const current = WEEK_PLAN.find((d) => d.id === day);
  const Icon = current.icon;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {WEEK_PLAN.map((d) => {
          const DIcon = d.icon;
          const active = d.id === day;
          const saturday = d.id === 'sab';
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => setDay(d.id)}
              aria-pressed={active}
              className={cx(
                'rounded-2xl border p-3 text-left transition-all',
                active ? 'border-plum bg-plum text-white shadow-sm' : saturday ? 'border-sand-line bg-sand text-ink hover:border-bronze' : 'border-line bg-white text-ink shadow-paper hover:border-line-strong'
              )}
            >
              <DIcon size={16} className={active ? 'text-white' : 'text-plum'} />
              <span className="block mt-2 text-sm font-semibold">{d.day}</span>
              <span className={cx('block text-[11px] leading-tight', active ? 'text-on-plum-muted' : 'text-muted')}>{d.phase}</span>
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={current.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          <GlassCard hover={false} padded={false} className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-4 bg-silk border-b md:border-b-0 md:border-r border-line p-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-line text-plum">
                  <Icon size={22} />
                </span>
                <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">{current.day}</p>
                <p className="font-serif text-3xl font-semibold text-ink leading-tight">{current.phase}</p>
                <p className="mt-2 text-sm text-body">{current.focus}</p>
              </div>
              <div className="md:col-span-8 p-6 space-y-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-3">Tareas</p>
                  <ul className="space-y-2.5">
                    {current.tasks.map((t) => (
                      <li key={t} className="flex gap-2.5 text-[15px] text-body leading-relaxed">
                        <CircleCheck size={17} className="shrink-0 mt-0.5 text-sage" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-sand-line bg-sand px-4 py-3">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold">Producto del día</span>
                  <p className="text-sm font-semibold text-ink mt-0.5">{current.product}</p>
                </div>
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

export default function Planeacion_y_organizacion() {
  const [stage, setStage] = useState('all');
  const [view, setView] = useState('gantt');
  const [query, setQuery] = useState('');
  const q = normalize(query.trim());

  const rows = useMemo(
    () => CRONOGRAMA.filter((a) => (stage === 'all' || a.stage === stage) && (!q || normalize(`${a.id} ${a.name}`).includes(q))),
    [stage, q]
  );

  const stageOptions = [
    { id: 'all', label: 'Todas', icon: Layers, count: CRONOGRAMA.length },
    ...Object.entries(CRONOGRAMA_STAGES).map(([id, v]) => ({ id, label: v.label, icon: STAGE_STYLE[id].icon, count: CRONOGRAMA.filter((a) => a.stage === id).length })),
  ];

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Apartado 5 · Planeación"
        icon={CalendarRange}
        title="Planeación y"
        highlight="organización"
        description="Cronograma de las 18 actividades del diagnóstico, su diagrama de Gantt y el plan de acción semanal de la práctica docente."
      />

      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard icon={ListChecks} label="Actividades" value="18" hint="Cronograma oficial del diagnóstico" toneName="violet" />
        <StatCard icon={Layers} label="Etapas" value="3" hint="Antes, durante y después" toneName="amber" />
        <StatCard icon={Clock} label="Duración" value={`${TOTAL_DAYS} días`} hint="Del 12/08/2026 al 20/09/2026" toneName="emerald" />
        <StatCard icon={UserRound} label="Responsable" value="S. H." hint={RESPONSIBLE} toneName="indigo" />
      </div>

      {/* Etapas */}
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(CRONOGRAMA_STAGES).map(([id, v]) => {
          const st = STAGE_STYLE[id];
          const Icon = st.icon;
          const acts = CRONOGRAMA.filter((a) => a.stage === id);
          return (
            <motion.div key={id} variants={fadeUp} className="rounded-3xl border border-line bg-white shadow-paper p-5">
              <div className="flex items-center justify-between">
                <span className={cx('inline-flex h-10 w-10 items-center justify-center rounded-xl border', st.soft)}>
                  <Icon size={18} />
                </span>
                <span className="font-serif text-3xl font-semibold text-ink">{acts.length}</span>
              </div>
              <p className="mt-3 font-semibold text-ink">{v.label}</p>
              <p className="text-sm text-muted">{v.description}</p>
              <p className="mt-3 text-xs font-semibold text-plum tabular-nums">
                {formatDate(acts[0].start)} → {formatDate(acts[acts.length - 1].end)}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      <Divider />

      {/* Cronograma */}
      <section className="space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">5.a Cronograma de actividades</p>
            <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-ink">Ruta del diagnóstico</h3>
            <p className="text-sm text-muted mt-1">
              Mostrando <span className="font-semibold text-plum tabular-nums">{rows.length}</span> de 18 actividades
            </p>
          </div>
          <SegmentedControl
            ariaLabel="Tipo de vista"
            value={view}
            onChange={setView}
            options={[
              { id: 'gantt', label: 'Diagrama de Gantt', icon: ChartGantt },
              { id: 'tabla', label: 'Tabla editorial', icon: Table2 },
            ]}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
          <FilterChips options={stageOptions} value={stage} onChange={setStage} />
          <SearchInput value={query} onChange={setQuery} placeholder="Buscar actividad..." className="lg:max-w-xs" />
        </div>

        {rows.length === 0 ? (
          <EmptyState title="Sin actividades" description="Ninguna actividad coincide con la etapa o la búsqueda." />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={view} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              {view === 'gantt' ? <GanttChart rows={rows} /> : <ScheduleTable rows={rows} />}
            </motion.div>
          </AnimatePresence>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {MILESTONES.map((m) => (
            <div key={m.date} className="flex items-center gap-3 rounded-2xl border border-sand-line bg-sand px-4 py-3">
              <Flag size={17} className="shrink-0 text-bronze" />
              <div>
                <p className="text-sm font-semibold text-ink">{m.label}</p>
                <p className="text-xs text-body tabular-nums">{formatDate(m.date)}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="flex items-start gap-2 text-xs text-muted">
          <Link2 size={14} className="shrink-0 mt-0.5" />
          La columna de dependencias indica qué actividades deben concluir antes de iniciar cada una. La duración corresponde a la registrada en el cronograma del informe.
        </p>
      </section>

      {/* Plan semanal */}
      <section className="space-y-6">
        <div className="flex items-start gap-3">
          <span className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-lilac border border-lilac-line text-plum">
            <CalendarDays size={19} />
          </span>
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">5.b Plan de acción semanal</p>
            <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-ink">Una semana de práctica docente</h3>
            <p className="text-sm text-muted mt-1">Del diseño instruccional entre semana a la tutoría presencial del sábado y la reflexión del domingo.</p>
          </div>
        </div>
        <WeeklyPlan />
        <div className="flex flex-wrap gap-2">
          <Badge toneName="violet" icon={CloudUpload}>
            Publicación en Classroom / Moodle
          </Badge>
          <Badge toneName="amber" icon={Presentation}>
            Tutoría sábados 7:00 a.m. – 5:00 p.m.
          </Badge>
          <Badge toneName="emerald" icon={Lightbulb}>
            Aula invertida
          </Badge>
          <Badge toneName="slate" icon={NotebookPen}>
            Diario reflexivo semanal
          </Badge>
        </div>
      </section>
    </PageShell>
  );
}
