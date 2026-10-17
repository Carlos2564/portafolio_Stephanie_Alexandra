import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  School,
  Users,
  Laptop,
  Landmark,
  UserCog,
  GraduationCap,
  CalendarDays,
  MessageCircle,
  DoorOpen,
  Library,
  Briefcase,
  Presentation,
  HeartHandshake,
  BookCopy,
  Baby,
  Bus,
  Flame,
  Clock,
  Monitor,
  Projector,
  Speaker,
  Globe,
  Wrench,
  Smartphone,
  Wifi,
  WifiOff,
  Signal,
  NotebookPen,
  PlayCircle,
  Gamepad2,
  FileText,
  BookOpen,
  TriangleAlert,
  Building2,
  House,
  ArrowDown,
} from 'lucide-react';
import { PageShell, GlassCard, SectionHeader, Badge, TabBar, DonutChart, ChartLegend, HorizontalBars, ProgressBar, PlumBand } from './ui/Primitives';
import { cx, fadeUp, stagger, CHART_COLORS } from './ui/tokens';

/* =====================================================================
   CONTEXTO EDUCATIVO · Apartados 4.a, 4.b y 4.c
   ===================================================================== */

const KEY_FACTS = [
  { icon: MapPin, label: 'Ubicación', value: 'Chalatenango, El Salvador' },
  { icon: School, label: 'Modalidades', value: 'Presencial y flexible' },
  { icon: CalendarDays, label: 'Jornada flexible', value: 'Sábados · 7:00 a.m. – 5:00 p.m.' },
  { icon: Users, label: 'Grupo diagnosticado', value: '1.° Año · N = 11 estudiantes' },
];

const ORG_CHART = [
  { icon: Landmark, role: 'Director General', detail: 'Liderazgo de ambas modalidades (presencial y flexible)' },
  { icon: UserCog, role: 'Coordinación de Modalidades Flexibles', detail: 'A cargo del coordinador Gerardo: matrículas, registros y organización académica' },
  { icon: GraduationCap, role: 'Tutores docentes', detail: 'Gran parte labora en la misma institución entre semana; el resto, en otras instituciones' },
  { icon: Users, role: 'Estudiantes de la modalidad flexible', detail: 'Jornada sabatina y estudio autónomo entre semana' },
];

const WEEK = [
  { day: 'Lun – Vie', title: 'Estudio autónomo', text: 'Desarrollo de las actividades al final de cada lección del módulo.', icon: NotebookPen },
  { day: 'Lun – Vie', title: 'Consultas por WhatsApp', text: 'Atención de dudas en los grupos de cada asignatura con el docente.', icon: MessageCircle },
  { day: 'Sábado', title: 'Jornada semipresencial', text: 'Tutorías de 7:00 a.m. a 5:00 p.m.: presentación de lo trabajado y nuevos contenidos.', icon: Presentation },
];

const SERVICES = [
  { icon: DoorOpen, title: 'Aulas asignadas', text: 'Espacios destinados exclusivamente a la modalidad flexible.' },
  { icon: Library, title: 'Biblioteca', text: 'Consulta de material bibliográfico de apoyo.' },
  { icon: Briefcase, title: 'Área administrativa', text: 'Gestión de matrículas, registros y atención al estudiante.' },
  { icon: Presentation, title: 'Salón de usos múltiples', text: 'Espacio equipado con proyector fijo.' },
  { icon: HeartHandshake, title: 'Apoyo psicológico', text: 'Acompañamiento socioemocional al estudiantado.' },
  { icon: BookCopy, title: 'Módulos impresos y digitales', text: 'Entrega gratuita de módulos para cada materia.' },
];

const AGE = [
  { label: '15-16 años', value: 0, percent: 0 },
  { label: '17-18 años', value: 2, percent: 18.2 },
  { label: '19 años o más', value: 9, percent: 81.8 },
];

const ATTENDANCE = [
  { icon: Briefcase, title: 'Horarios laborales', text: 'El trabajo impide asistir a la jornada en varios casos.' },
  { icon: Baby, title: 'Cuidado de los hijos', text: 'Madres y padres faltan cuando no tienen quién cuide a su hijo o cuando este enferma.' },
  { icon: Bus, title: 'Transporte inestable', text: 'Dificultad de traslado desde otros municipios de Chalatenango.' },
];

const PREFERENCES = [
  { label: 'Videos explicativos', value: 5, percent: 45.5 },
  { label: 'Trabajo en equipo', value: 5, percent: 45.5 },
  { label: 'Dinámicas o juegos interactivos', value: 5, percent: 45.5 },
  { label: 'Lecturas o documentos PDF', value: 4, percent: 36.4 },
];

const INVENTORY = [
  { icon: Building2, value: '1', label: 'Laboratorio de informática', detail: 'Espacio para prácticas con equipo de cómputo' },
  { icon: Monitor, value: '~30', label: 'Computadoras funcionales', detail: 'Requieren actualización de software' },
  { icon: Projector, value: '6 + 1', label: 'Proyectores', detail: '6 de uso compartido y 1 fijo en el salón de usos múltiples' },
  { icon: Speaker, value: 'Sí', label: 'Equipos de audio', detail: 'Bocinas en buen estado' },
  { icon: Globe, value: 'MINED', label: 'Red de Internet', detail: 'Funcional para lo académico y administrativo; restringe plataformas no educativas' },
  { icon: Wrench, value: '0', label: 'Técnicos permanentes', detail: 'El MINED da soporte de red y los docentes de informática mantienen los equipos' },
];

const HOME = [
  { id: 'pc', icon: Laptop, indicator: 'Usa computadora para sus trabajos', value: '72.7%', count: '8 de 11', source: 'Encuesta · P8', tone: 'emerald' },
  { id: 'phone', icon: Smartphone, indicator: 'Depende exclusivamente del smartphone', value: '27.3%', count: '3 de 11', source: 'Encuesta · P8', tone: 'amber' },
  { id: 'net', icon: Wifi, indicator: 'Cuenta con Internet en casa', value: '72.7%', count: '8 de 11', source: 'Encuesta · P3', tone: 'emerald' },
  { id: 'unstable', icon: Signal, indicator: 'Tiene señal inestable', value: '18.2%', count: '2 de 11', source: 'Encuesta · P3', tone: 'amber' },
  { id: 'none', icon: WifiOff, indicator: 'No tiene acceso a Internet', value: '9.1%', count: '1 de 11', source: 'Encuesta · P3', tone: 'rose' },
];

const TABS = [
  { id: 'institucion', label: '4.a Institución educativa', shortLabel: '4.a Institución', icon: School },
  { id: 'grupo', label: '4.b Grupo asignado', shortLabel: '4.b Grupo', icon: Users },
  { id: 'recursos', label: '4.c Recursos tecnológicos', shortLabel: '4.c Recursos', icon: Laptop },
];

/* ---------------------------------------------------------------------
   Utilidades de presentación
   --------------------------------------------------------------------- */

function BlockTitle({ eyebrow, title, icon: Icon }) {
  return (
    <div className="flex items-start gap-3">
      {Icon && (
        <span className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-lilac border border-lilac-line text-plum">
          <Icon size={19} />
        </span>
      )}
      <div>
        {eyebrow && <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">{eyebrow}</p>}
        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink leading-tight">{title}</h3>
      </div>
    </div>
  );
}

function IconTile({ icon: Icon, title, text }) {
  return (
    <motion.div variants={fadeUp} className="rounded-2xl border border-line bg-white shadow-paper p-4 sm:p-5 h-full">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lilac border border-lilac-line text-plum">
        <Icon size={18} />
      </span>
      <p className="mt-3 font-semibold text-ink leading-snug">{title}</p>
      <p className="mt-1 text-sm text-body leading-relaxed">{text}</p>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------
   4.a Institución
   --------------------------------------------------------------------- */

function InstitucionPanel() {
  return (
    <div className="space-y-10">
      <PlumBand>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#E5D5B5] font-semibold">Institución de práctica</p>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-on-plum">Instituto Nacional Dr. Francisco Martínez Suárez</h3>
            <p className="text-sm sm:text-base text-on-plum-muted leading-relaxed max-w-2xl">
              Centro educativo público de Chalatenango que atiende la modalidad presencial y la modalidad flexible de bachillerato, esta última dirigida
              principalmente a personas adultas que trabajan entre semana.
            </p>
          </div>
          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            {[
              { v: '2', l: 'Modalidades' },
              { v: 'Sáb', l: 'Jornada flexible' },
              { v: '75%', l: 'Mayores de 22 años' },
              { v: '11', l: 'Estudiantes encuestados' },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-white/20 p-3 sm:p-4">
                <span className="block font-serif text-3xl font-semibold text-on-plum leading-none">{s.v}</span>
                <span className="block mt-1.5 text-xs text-on-plum-muted">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </PlumBand>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard hover={false}>
          <BlockTitle eyebrow="Gestión administrativa y académica" title="Organización institucional" icon={Landmark} />
          <p className="mt-4 text-sm sm:text-[15px] text-body leading-relaxed">
            La gestión de la modalidad flexible se centra en matrículas, registros y organización académica, bajo el liderazgo del Director General,
            que dirige ambas modalidades.
          </p>
          <ol className="mt-6 space-y-2">
            {ORG_CHART.map((o, i) => {
              const Icon = o.icon;
              return (
                <li key={o.role}>
                  <div className="flex items-start gap-3 rounded-2xl border border-line bg-ivory p-4">
                    <span
                      className={cx(
                        'shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl border',
                        i === 0 ? 'bg-plum border-plum text-white' : 'bg-white border-lilac-line text-plum'
                      )}
                    >
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="font-semibold text-ink leading-snug">{o.role}</p>
                      <p className="text-sm text-body leading-relaxed mt-0.5">{o.detail}</p>
                    </div>
                  </div>
                  {i < ORG_CHART.length - 1 && (
                    <div className="flex justify-center py-1 text-line-strong" aria-hidden="true">
                      <ArrowDown size={16} />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </GlassCard>

        <GlassCard hover={false}>
          <BlockTitle eyebrow="Horarios y funcionamiento" title="Una semana en la modalidad flexible" icon={Clock} />
          <p className="mt-4 text-sm sm:text-[15px] text-body leading-relaxed">
            La modalidad combina el estudio autónomo entre semana con jornadas semipresenciales los sábados de 7:00 a.m. a 5:00 p.m.
          </p>
          <div className="mt-6 space-y-3">
            {WEEK.map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.title} className="flex items-start gap-4 rounded-2xl border border-line bg-white p-4 shadow-paper">
                  <span className="shrink-0 w-20 rounded-xl bg-sand border border-sand-line py-2 text-center text-xs font-bold text-bronze-dark">{w.day}</span>
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 font-semibold text-ink">
                      <Icon size={16} className="text-plum" /> {w.title}
                    </p>
                    <p className="text-sm text-body leading-relaxed mt-0.5">{w.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-2">Jornada sabatina</p>
            <div className="relative h-10 rounded-xl bg-silk border border-line overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-y-0 left-0 bg-lilac"
              />
              <div className="absolute inset-0 flex items-center justify-between px-3 text-xs font-semibold text-plum">
                <span>7:00 a.m.</span>
                <span className="hidden sm:inline">Jornada de 10 horas</span>
                <span>5:00 p.m.</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      <section className="space-y-5">
        <BlockTitle eyebrow="Infraestructura física y servicios" title="Espacios y apoyos para el estudiantado" icon={Building2} />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s) => (
            <IconTile key={s.title} {...s} />
          ))}
        </motion.div>
      </section>
    </div>
  );
}

/* ---------------------------------------------------------------------
   4.b Grupo asignado
   --------------------------------------------------------------------- */

function GrupoPanel() {
  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-2">
        <Badge toneName="violet" icon={GraduationCap}>
          1.° Año de Bachillerato
        </Badge>
        <Badge toneName="amber" icon={FileText}>
          Ciencias Naturales y Tecnología
        </Badge>
        <Badge toneName="slate">Modalidad flexible / a distancia</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <GlassCard hover={false} className="lg:col-span-7">
          <BlockTitle eyebrow="Demografía y madurez" title="Un grupo mayoritariamente adulto" icon={Users} />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <DonutChart
              data={AGE.map((a, i) => ({ label: a.label, value: a.value, color: CHART_COLORS[i] }))}
              centerValue="81.8%"
              centerLabel="19 años o más"
            />
            <ChartLegend data={AGE.map((a, i) => ({ ...a, color: CHART_COLORS[i] }))} />
          </div>
          <p className="mt-6 text-sm sm:text-[15px] text-body leading-relaxed">
            En el grupo diagnosticado, el 81.8% (9 estudiantes) tiene 19 años o más y el 18.2% (2) tiene entre 17 y 18 años. El desfase escolar responde a
            estudios interrumpidos, pero viene acompañado de un alto grado de madurez y responsabilidad adulta.
          </p>
        </GlassCard>

        <div className="lg:col-span-5 space-y-6">
          <GlassCard hover={false}>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-4">Población de la modalidad flexible</p>
            <div className="flex h-12 w-full overflow-hidden rounded-2xl border border-line">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '75%' }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="flex items-center justify-center bg-plum text-sm font-semibold text-white"
              >
                75%
              </motion.div>
              <div className="flex-1 flex items-center justify-center bg-lilac text-sm font-semibold text-plum">25%</div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted">
              <span>Mayores de 22 años</span>
              <span>Menores de 22 años</span>
            </div>
          </GlassCard>
          <GlassCard hover={false}>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-4">Equilibrio de género</p>
            <div className="space-y-4">
              <ProgressBar label="Hombres (6)" value={54.5} toneName="violet" />
              <ProgressBar label="Mujeres (5)" value={45.5} toneName="amber" />
            </div>
          </GlassCard>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard hover={false}>
          <BlockTitle eyebrow="Contexto sociofamiliar y motivación" title="Estudiar mientras se trabaja" icon={Flame} />
          <div className="mt-5 space-y-4 text-sm sm:text-[15px] text-body leading-relaxed">
            <p>La mayoría del grupo trabaja durante la semana y varias estudiantes son madres de familia.</p>
            <p>Aun así, el 90.9% presenta alta motivación, impulsada por el deseo de superación personal, mejores oportunidades laborales y continuar estudios universitarios.</p>
          </div>
          <div className="mt-6 flex items-center gap-4 rounded-2xl border border-sand-line bg-sand p-4">
            <span className="font-serif text-5xl font-semibold text-bronze-dark leading-none">90.9%</span>
            <span className="text-sm text-body leading-snug">se siente motivado o bastante motivado para continuar sus estudios</span>
          </div>
        </GlassCard>

        <GlassCard hover={false}>
          <BlockTitle eyebrow="Asistencia y permanencia" title="Factores que la dificultan" icon={TriangleAlert} />
          <div className="mt-5 space-y-3">
            {ATTENDANCE.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.title} className="flex items-start gap-3 rounded-2xl border border-wine-line bg-wine-soft p-4">
                  <Icon size={18} className="shrink-0 mt-0.5 text-wine" />
                  <div>
                    <p className="font-semibold text-ink">{a.title}</p>
                    <p className="text-sm text-body leading-relaxed mt-0.5">{a.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      <GlassCard hover={false}>
        <BlockTitle eyebrow="Perfil académico" title="Cómo aprende el grupo" icon={BookOpen} />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-line bg-ivory p-5">
              <span className="block font-serif text-5xl font-semibold text-plum leading-none">81.9%</span>
              <span className="block mt-2 text-sm text-body">realiza sus tareas de forma autónoma siempre o casi siempre</span>
            </div>
            <div className="rounded-2xl border border-line bg-ivory p-5">
              <p className="flex items-center gap-2 font-semibold text-ink">
                <PlayCircle size={17} className="text-plum" /> Aula invertida
              </p>
              <p className="mt-1 text-sm text-body leading-relaxed">El docente tutor reporta que este modelo ha funcionado bastante bien en la modalidad.</p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-4 flex items-center gap-2">
              <Gamepad2 size={14} /> Actividades que más les ayudan
            </p>
            <HorizontalBars data={PREFERENCES} max={100} />
          </div>
          <div className="lg:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-4">Necesidades prioritarias</p>
            <ul className="space-y-2.5">
              {['Refuerzo en lectura y escritura', 'Uso básico de la computadora', 'Manejo de plataformas para tareas', 'Participación constante de todo el grupo'].map((n) => (
                <li key={n} className="flex gap-2.5 rounded-xl border border-sand-line bg-sand px-3 py-2.5 text-sm text-body">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-bronze" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

/* ---------------------------------------------------------------------
   4.c Recursos tecnológicos
   --------------------------------------------------------------------- */

function RecursosPanel() {
  return (
    <div className="space-y-10">
      <section className="space-y-5">
        <BlockTitle eyebrow="En la institución" title="Inventario tecnológico disponible" icon={Building2} />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INVENTORY.map((it) => {
            const Icon = it.icon;
            return (
              <motion.div key={it.label} variants={fadeUp} className="rounded-3xl border border-line bg-white shadow-paper p-5 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lilac border border-lilac-line text-plum">
                    <Icon size={18} />
                  </span>
                  <span className="font-serif text-3xl font-semibold text-bronze leading-none">{it.value}</span>
                </div>
                <p className="mt-4 font-semibold text-ink">{it.label}</p>
                <p className="mt-1 text-sm text-body leading-relaxed">{it.detail}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <section className="space-y-5">
        <BlockTitle eyebrow="En el hogar del estudiante" title="Equipamiento y conectividad" icon={House} />

        {/* Móvil: tarjetas */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {HOME.map((h) => {
            const Icon = h.icon;
            return (
              <div key={h.id} className="rounded-2xl border border-line bg-white shadow-paper p-4">
                <div className="flex items-start gap-3">
                  <Icon size={18} className="shrink-0 mt-0.5 text-plum" />
                  <p className="flex-1 text-sm font-medium text-ink leading-snug">{h.indicator}</p>
                  <span className="font-serif text-2xl font-semibold text-plum leading-none">{h.value}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-muted">
                  <span>{h.count} estudiantes</span>
                  <span>{h.source}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Escritorio: tabla */}
        <div className="hidden md:block overflow-x-auto rounded-3xl border border-line bg-white shadow-paper">
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="bg-silk text-left text-[11px] uppercase tracking-[0.16em] text-muted">
                <th className="px-5 py-3.5 font-semibold">Indicador</th>
                <th className="px-5 py-3.5 font-semibold w-56">Proporción</th>
                <th className="px-5 py-3.5 font-semibold w-28 text-right">Frecuencia</th>
                <th className="px-5 py-3.5 font-semibold w-36">Fuente</th>
              </tr>
            </thead>
            <tbody>
              {HOME.map((h) => {
                const Icon = h.icon;
                return (
                  <tr key={h.id} className="border-t border-line hover:bg-ivory transition-colors">
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-2.5 font-medium text-ink">
                        <Icon size={16} className="text-plum" /> {h.indicator}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <ProgressBar value={parseFloat(h.value)} toneName={h.tone} showValue />
                    </td>
                    <td className="px-5 py-4 text-right tabular-nums text-body">{h.count}</td>
                    <td className="px-5 py-4 text-muted">{h.source}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-3xl border border-sage-line bg-sage-soft p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-sage font-bold">En la institución</p>
          <p className="mt-2 font-serif text-2xl font-semibold text-ink">El acceso está mayormente cubierto</p>
          <p className="mt-2 text-sm text-body leading-relaxed">Laboratorio, computadoras, proyectores y red del MINED permiten trabajar con tecnología durante la jornada sabatina.</p>
        </div>
        <div className="rounded-3xl border border-wine-line bg-wine-soft p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-wine font-bold">En el hogar</p>
          <p className="mt-2 font-serif text-2xl font-semibold text-ink">La brecha está en la conexión y el dispositivo</p>
          <p className="mt-2 text-sm text-body leading-relaxed">27.3% no tiene una conexión estable en casa y 27.3% estudia solo desde el teléfono: los recursos deben ser ligeros y móviles.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Contexto_educativo() {
  const [tab, setTab] = useState('institucion');

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Apartado 4 · Contexto"
        icon={MapPin}
        title="Contexto"
        highlight="educativo"
        description="La institución, el grupo asignado y los recursos tecnológicos con los que se desarrolla la práctica docente en la modalidad flexible."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {KEY_FACTS.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.label} className="flex items-start gap-3 rounded-2xl border border-line bg-white shadow-paper px-4 py-3.5">
              <Icon size={17} className="shrink-0 mt-0.5 text-plum" />
              <div className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">{f.label}</span>
                <span className="block text-sm font-medium text-ink leading-snug mt-0.5">{f.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-8">
        <TabBar tabs={TABS} active={tab} onChange={setTab} layoutId="contexto-apartados" />
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
            {tab === 'institucion' && <InstitucionPanel />}
            {tab === 'grupo' && <GrupoPanel />}
            {tab === 'recursos' && <RecursosPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </PageShell>
  );
}
