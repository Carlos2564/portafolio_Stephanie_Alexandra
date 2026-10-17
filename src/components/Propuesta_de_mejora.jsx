import { useEffect, useReducer, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightbulb,
  Users,
  Smartphone,
  Signal,
  NotebookPen,
  Hand,
  Video,
  Crosshair,
  Laptop,
  PlayCircle,
  MessageCircle,
  Gamepad2,
  HeartHandshake,
  ListOrdered,
  UserCog,
  Package,
  ShieldCheck,
  BookOpen,
  Clock,
  FlaskConical,
  Wrench,
  Play,
  Pause,
  RotateCcw,
  Coffee,
  CalendarDays,
  Scissors,
  Timer,
  Compass,
  Eye,
  HelpCircle,
  Hammer,
  CircleCheck,
  Highlighter,
  Network,
  Palette,
  Sparkles,
  Trophy,
  FileText,
  StickyNote,
  GraduationCap,
  School,
  ArrowRight,
  ArrowDown,
  TriangleAlert,
  Repeat,
  Quote,
  Check,
} from 'lucide-react';
import { PageShell, GlassCard, SectionHeader, Badge, TabBar, PlumBand, ProgressBar, Divider } from './ui/Primitives';
import { cx, fadeUp, stagger } from './ui/tokens';

/* =====================================================================
   PROPUESTA DE MEJORA · Apartados 11.a a 11.e
   ===================================================================== */

const TITLE = 'Fortalecimiento de la Autonomía, Alfabetización Digital y Aprendizaje Activo de las Ciencias Naturales en el Modelo de Aula Invertida';

const EVIDENCE = [
  { icon: Users, value: '75%', label: 'de la modalidad es mayor de 22 años y combina estudio con trabajo o familia', source: 'Entrevista al coordinador' },
  { icon: Smartphone, value: '27.3%', label: 'estudia exclusivamente desde el smartphone', source: 'Encuesta · P8' },
  { icon: Signal, value: '45.5%', label: 'tiene conexión limitada o insuficiente al subir tareas', source: 'Encuesta · P9' },
  { icon: NotebookPen, value: '2 de 2', label: 'actores clave señalan dificultades en lectoescritura y manejo de la computadora', source: 'Tutor y coordinador' },
  { icon: Hand, value: '36.4%', label: 'participa solo algunas veces en las dinámicas de clase', source: 'Encuesta · P5' },
  { icon: Video, value: '0%', label: 'usa videollamadas para estudiar: el refuerzo síncrono no existe aún', source: 'Encuesta · P12' },
];

const GENERAL_OBJECTIVE =
  'Fortalecer la autonomía, la alfabetización digital y el aprendizaje activo de las Ciencias Naturales en los estudiantes de Primer Año de Bachillerato de la modalidad flexible, mediante estrategias y recursos adaptados al modelo de aula invertida.';

const SPECIFIC_OBJECTIVES = [
  { icon: Laptop, text: 'Desarrollar competencias digitales básicas para el uso de la computadora y de las plataformas educativas.' },
  { icon: Smartphone, text: 'Facilitar el acceso a los contenidos mediante recursos breves, Mobile-First y disponibles sin conexión.' },
  { icon: Gamepad2, text: 'Incrementar la participación mediante el aprendizaje colaborativo y la gamificación científica.' },
  { icon: Clock, text: 'Organizar una carga académica realista acompañada de retroalimentación motivadora.' },
];

const ACTIONS = [
  {
    n: 1,
    icon: Laptop,
    title: 'Inducción y talleres exprés de alfabetización digital en tutorías sabatinas',
    sequence: 'Semana 1: sondeo rápido de habilidades. Semanas 2 a 4: talleres de 20 a 30 minutos al inicio de la tutoría (organizar archivos, correo y Classroom, documentos y presentaciones, problemas básicos del equipo).',
    responsible: 'Practicante, con apoyo del docente tutor y de los docentes de informática.',
    resources: 'Laboratorio de informática (~30 computadoras), proyector y guías paso a paso impresas y en PDF.',
    conditions: 'Disponibilidad del laboratorio el sábado, trabajo en grupos pequeños y software actualizado en los equipos.',
  },
  {
    n: 2,
    icon: PlayCircle,
    title: 'Cápsulas de microaprendizaje de Ciencias Naturales (Mobile-First y PDF offline)',
    sequence: 'Cada semana, una cápsula de 5 a 8 minutos por lección y una guía PDF de 1 a 2 páginas, publicadas el jueves en Classroom o Moodle.',
    responsible: 'Practicante (diseño y producción); docente tutor (validación de contenidos).',
    resources: 'Canva o Genially, grabación con celular, Classroom/Moodle y grupo de WhatsApp.',
    conditions: 'Archivos ligeros, legibles en pantallas pequeñas y descargables para estudiar sin conexión.',
  },
  {
    n: 3,
    icon: MessageCircle,
    title: 'Refuerzo síncrono por Google Meet y acompañamiento en WhatsApp',
    sequence: 'Una sesión opcional de 30 a 40 minutos entre semana en horario acordado con el grupo, grabada para quien no pueda conectarse; dudas por WhatsApp en horario definido.',
    responsible: 'Practicante y docente tutor.',
    resources: 'Google Meet, grupo de WhatsApp y Classroom para compartir las grabaciones.',
    conditions: 'Horario consensuado, asistencia voluntaria y grabación como alternativa ante conexión limitada.',
  },
  {
    n: 4,
    icon: Gamepad2,
    title: 'Aprendizaje colaborativo entre pares y gamificación científica',
    sequence: 'En cada tutoría: reto en equipos con roles rotativos, práctica experimental y cuestionario de cierre en Kahoot! o Quizizz.',
    responsible: 'Practicante, en coordinación con el docente tutor.',
    resources: 'Kahoot!, Quizizz, materiales de laboratorio o caseros y proyector.',
    conditions: 'Al menos un dispositivo por equipo; Quizizz en modo tarea para quienes no asistan.',
  },
  {
    n: 5,
    icon: HeartHandshake,
    title: 'Retroalimentación motivadora y dosificación equitativa de tareas exaula',
    sequence: 'Una actividad integradora por semana, retroalimentación escrita breve en Classroom en un máximo de 72 horas y reconocimiento de avances en la tutoría.',
    responsible: 'Practicante y docente tutor.',
    resources: 'Rúbricas sencillas, comentarios en Classroom y portafolio del módulo.',
    conditions: 'Acuerdo con el tutor sobre la carga semanal y fechas flexibles ante situaciones laborales o familiares.',
  },
];

const ACTION_FIELDS = [
  { key: 'sequence', label: 'Secuencia', icon: ListOrdered },
  { key: 'responsible', label: 'Responsables sugeridos', icon: UserCog },
  { key: 'resources', label: 'Recursos requeridos', icon: Package },
  { key: 'conditions', label: 'Condiciones de aplicación', icon: ShieldCheck },
];

/* ---------------------------------------------------------------------
   Contenido del recurso: "Guía de Éxito"
   --------------------------------------------------------------------- */

const COMPARISON = [
  { aspect: 'Primer contacto con el contenido', traditional: 'En clase, escuchando la explicación del docente.', flipped: 'En casa, con un video corto o una lectura breve.' },
  { aspect: 'Uso del tiempo en clase', traditional: 'Exposición del docente la mayor parte del tiempo.', flipped: 'Práctica, experimentos y resolución de dudas.' },
  { aspect: 'Rol del estudiante', traditional: 'Receptor de información.', flipped: 'Protagonista activo de su aprendizaje.' },
  { aspect: 'Rol del docente', traditional: 'Transmisor de contenidos.', flipped: 'Guía y mediador que acompaña.' },
  { aspect: 'Trabajo en casa', traditional: 'Ejercicios difíciles sin apoyo inmediato.', flipped: 'Preparación previa; lo difícil se hace en clase con apoyo.' },
  { aspect: 'Ritmo de aprendizaje', traditional: 'El mismo para todo el grupo.', flipped: 'Cada quien pausa y repite el material a su ritmo.' },
];

const MYTHS = [
  { myth: 'El aula invertida es solo ver videos en casa.', reality: 'El video es apenas el inicio: lo importante ocurre en la tutoría, cuando aplicas lo aprendido.' },
  { myth: 'Necesito una computadora y muy buen Internet.', reality: 'Los materiales están pensados para el celular y se pueden descargar para verlos sin conexión.' },
  { myth: 'Si no entendí el video, no puedo participar.', reality: 'Tus dudas son el punto de partida de la clase: anótalas en tu Banco de Dudas y compártelas.' },
  { myth: 'Es más trabajo para mí.', reality: 'El tiempo en casa es breve y dosificado; la práctica más exigente se hace acompañado en clase.' },
];

const PARTICIPATION_TIPS = [
  'Lleva una pregunta escrita: leerla es más fácil que improvisarla.',
  'Empieza participando en tu equipo antes de hablar frente a todo el grupo.',
  'Recuerda que equivocarse es parte de aprender Ciencias: los experimentos también fallan.',
  'Usa el chat de Meet o un Kahoot! si te cuesta hablar en voz alta.',
  'Reconoce tus avances: cada aporte cuenta para tu portafolio del módulo.',
];

const CALENDAR_STEPS = [
  'Abre Google Calendar desde tu celular con la misma cuenta que usas en Classroom.',
  'Crea un evento “Estudio de Ciencias” en tu tiempo libre real, por ejemplo 30 minutos después del trabajo.',
  'Activa la repetición semanal para que se vuelva un hábito.',
  'Agrega un recordatorio 10 minutos antes de cada bloque de estudio.',
  'Registra las fechas de entrega de Classroom con una alerta un día antes.',
];

const DIVIDE = [
  { part: 'Leer la guía de la práctica', minutes: 10 },
  { part: 'Anotar los datos observados', minutes: 15 },
  { part: 'Redactar los resultados', minutes: 20 },
  { part: 'Escribir la conclusión', minutes: 15 },
];

const ROUTE = [
  { icon: Compass, title: 'Explora', time: '5 min', text: 'Revisa el objetivo de la lección, los títulos y las imágenes para saber qué vas a aprender.' },
  { icon: Eye, title: 'Consume', time: '30 – 45 min', text: 'Mira la cápsula o lee la guía con atención activa: pausa, toma notas y repite lo que no quede claro.' },
  { icon: HelpCircle, title: 'Anota en tu Banco de Dudas', time: 'Continuo', text: 'Escribe cada pregunta que surja. Será tu punto de partida en la tutoría del sábado.' },
  { icon: Hammer, title: 'Ejecuta', time: 'Según la actividad', text: 'Resuelve la actividad del final de la lección o la práctica sugerida con materiales caseros.' },
  { icon: CircleCheck, title: 'Revisa', time: '10 min', text: 'Autoevalúate: ¿puedo explicarlo con mis palabras? Repasa solo lo que aún no dominas.' },
];

const STUDY_TECHNIQUES = [
  {
    icon: Video,
    title: 'Cómo estudiar con videos',
    points: ['Mira primero el video completo sin detenerte.', 'En la segunda vez, pausa y anota las ideas clave.', 'Ajusta la velocidad a tu ritmo.', 'Captura pantalla de los esquemas importantes.'],
  },
  {
    icon: Highlighter,
    title: 'Lectura activa',
    points: ['Subraya solo la idea principal de cada párrafo.', 'Escribe notas breves en el margen.', 'Convierte los títulos en preguntas.', 'Resume la lectura en tres oraciones.'],
  },
  {
    icon: Network,
    title: 'Mapas mentales',
    points: ['Escribe el tema central en el medio.', 'Traza ramas con los subtemas.', 'Usa palabras clave, no oraciones largas.', 'Añade colores y dibujos sencillos para recordar.'],
  },
];

const TOOLS = [
  { icon: Palette, name: 'Canva', use: 'Infografías científicas, carteles y mapas mentales.', start: 'Elige una plantilla de infografía y reemplaza los textos con tus ideas clave.' },
  { icon: Sparkles, name: 'Genially', use: 'Presentaciones interactivas y esquemas con botones.', start: 'Parte de una plantilla y agrega una ventana emergente por cada concepto.' },
  { icon: Trophy, name: 'Kahoot!', use: 'Cuestionarios en vivo para repasar al cierre de la tutoría.', start: 'Entra a kahoot.it e ingresa el PIN del juego que muestra el docente.' },
  { icon: Gamepad2, name: 'Quizizz', use: 'Cuestionarios a tu ritmo, también como tarea.', start: 'Abre el enlace compartido en Classroom y responde desde tu celular.' },
  { icon: FileText, name: 'Google Docs y Slides', use: 'Informes de laboratorio y presentaciones en equipo.', start: 'Comparte el documento con tu equipo y escriban al mismo tiempo.' },
  { icon: StickyNote, name: 'Padlet', use: 'Muro colaborativo para dudas, aportes y evidencias.', start: 'Abre el muro del grupo y publica una nota con texto, foto o enlace.' },
  { icon: MessageCircle, name: 'Grupos de WhatsApp', use: 'Avisos, dudas rápidas y coordinación del equipo.', start: 'Usa el grupo para preguntas concretas y respeta el horario acordado.' },
];

const WEEKLY_CHALLENGE = [
  'Ver la cápsula de la semana y tomar notas.',
  'Anotar al menos dos preguntas en tu Banco de Dudas.',
  'Crear un mapa mental o una infografía del tema en Canva.',
  'Participar en el Kahoot! o Quizizz de cierre.',
  'Publicar un aporte o una evidencia en el Padlet del grupo.',
];

const IMPACT = [
  {
    icon: Users,
    title: 'En el estudiantado',
    items: ['Mayor seguridad al usar la computadora y las plataformas.', 'Acceso a los contenidos desde el celular y sin conexión.', 'Participación más constante en las tutorías.', 'Organización realista del tiempo de estudio.'],
  },
  {
    icon: GraduationCap,
    title: 'En el docente',
    items: ['Banco de cápsulas y guías reutilizables.', 'Evidencias de aprendizaje más frecuentes para retroalimentar.', 'Tutorías centradas en la práctica y las dudas.', 'Integración de la tecnología con propósito didáctico.'],
  },
  {
    icon: School,
    title: 'En la institución',
    items: ['Mejor aprovechamiento del laboratorio y los proyectores.', 'Modelo replicable en otras asignaturas de la modalidad.', 'Apoyo a la permanencia de estudiantes que trabajan.', 'Base para la formación continua de los tutores.'],
  },
];

const COHERENCE = [
  { label: 'Necesidad', text: 'Brecha de competencias digitales, conexión desigual, poco tiempo y participación irregular.' },
  { label: 'Propuesta', text: 'Cinco acciones articuladas en el modelo de aula invertida que ya funciona en la modalidad.' },
  { label: 'Recurso', text: 'Guía de Éxito en cuatro módulos, ligera y orientada al estudio autónomo desde el celular.' },
  { label: 'Límites', text: 'Depende del laboratorio, de la conectividad del hogar y del tiempo de la práctica; su impacto debe evaluarse.' },
];

const LIMITS = [
  'La disponibilidad del laboratorio de informática el sábado puede variar.',
  'La conectividad del hogar no depende de la escuela: siempre se requiere una alternativa offline.',
  'La institución no cuenta con soporte técnico permanente para los equipos.',
  'El periodo de práctica es breve para medir cambios sostenidos en la autonomía.',
];

/* ---------------------------------------------------------------------
   Temporizador Pomodoro
   --------------------------------------------------------------------- */

const FOCUS_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;
const POMODORO_INITIAL = { mode: 'focus', left: FOCUS_SECONDS, running: false, cycles: 0 };

function pomodoroReducer(state, action) {
  switch (action.type) {
    case 'start':
      return { ...state, running: true };
    case 'pause':
      return { ...state, running: false };
    case 'reset':
      return POMODORO_INITIAL;
    case 'mode':
      return { ...state, mode: action.mode, left: action.mode === 'focus' ? FOCUS_SECONDS : BREAK_SECONDS, running: false };
    case 'tick': {
      if (state.left > 1) return { ...state, left: state.left - 1 };
      const next = state.mode === 'focus' ? 'break' : 'focus';
      return {
        mode: next,
        left: next === 'focus' ? FOCUS_SECONDS : BREAK_SECONDS,
        running: true,
        cycles: state.mode === 'focus' ? state.cycles + 1 : state.cycles,
      };
    }
    default:
      return state;
  }
}

function PomodoroTimer() {
  const [state, dispatch] = useReducer(pomodoroReducer, POMODORO_INITIAL);

  useEffect(() => {
    if (!state.running) return undefined;
    const id = window.setInterval(() => dispatch({ type: 'tick' }), 1000);
    return () => window.clearInterval(id);
  }, [state.running]);

  const total = state.mode === 'focus' ? FOCUS_SECONDS : BREAK_SECONDS;
  const progress = 1 - state.left / total;
  const minutes = String(Math.floor(state.left / 60)).padStart(2, '0');
  const seconds = String(state.left % 60).padStart(2, '0');
  const r = 88;
  const c = 2 * Math.PI * r;
  const isFocus = state.mode === 'focus';

  return (
    <div className="rounded-3xl border border-line bg-white shadow-paper p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-semibold text-ink">
          <Timer size={18} className="text-plum" /> Temporizador Pomodoro
        </p>
        <div className="inline-flex self-start rounded-2xl border border-lilac-line bg-silk p-1" role="radiogroup" aria-label="Modo del temporizador">
          {[
            { id: 'focus', label: 'Estudio 25 min' },
            { id: 'break', label: 'Descanso 5 min' },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={state.mode === m.id}
              onClick={() => dispatch({ type: 'mode', mode: m.id })}
              className={cx(
                'min-h-[36px] rounded-xl px-3 text-xs sm:text-sm font-medium transition-colors',
                state.mode === m.id ? 'bg-white text-plum shadow-sm border border-line' : 'text-muted border border-transparent hover:text-plum'
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative mx-auto w-full max-w-[240px] aspect-square">
          <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90" aria-hidden="true">
            <circle cx="100" cy="100" r={r} fill="none" stroke="#F2ECF9" strokeWidth="12" />
            <circle
              cx="100"
              cy="100"
              r={r}
              fill="none"
              stroke={isFocus ? '#4A2574' : '#5E8C76'}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - progress)}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center" aria-live="polite">
            <span className="font-serif text-5xl sm:text-6xl font-semibold text-ink tabular-nums leading-none">
              {minutes}:{seconds}
            </span>
            <span className={cx('mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em]', isFocus ? 'text-plum' : 'text-sage')}>
              {isFocus ? <BookOpen size={13} /> : <Coffee size={13} />}
              {isFocus ? 'Estudio' : 'Descanso'}
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {state.running ? (
              <button
                type="button"
                onClick={() => dispatch({ type: 'pause' })}
                className="min-h-[46px] inline-flex items-center gap-2 rounded-2xl bg-plum-deep hover:bg-abyss px-5 text-sm font-semibold text-on-plum transition-colors"
              >
                <Pause size={17} /> Pausar
              </button>
            ) : (
              <button
                type="button"
                onClick={() => dispatch({ type: 'start' })}
                className="min-h-[46px] inline-flex items-center gap-2 rounded-2xl bg-plum hover:bg-plum-dark px-5 text-sm font-semibold text-white shadow-sm transition-colors"
              >
                <Play size={17} /> Iniciar
              </button>
            )}
            <button
              type="button"
              onClick={() => dispatch({ type: 'reset' })}
              className="min-h-[46px] inline-flex items-center gap-2 rounded-2xl border border-lilac-line bg-lilac hover:bg-silk-deep px-5 text-sm font-semibold text-plum transition-colors"
            >
              <RotateCcw size={17} /> Reiniciar
            </button>
          </div>
          <div className="rounded-2xl border border-line bg-ivory p-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold">Ciclos completados</p>
            <div className="mt-2 flex items-center gap-2">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={cx(
                    'inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold',
                    i < state.cycles % 4 || (state.cycles > 0 && state.cycles % 4 === 0) ? 'bg-plum border-plum text-white' : 'border-line-strong text-muted'
                  )}
                >
                  {i + 1}
                </span>
              ))}
              <span className="ml-2 text-sm text-body tabular-nums">{state.cycles} en total</span>
            </div>
          </div>
          <p className="text-sm text-body leading-relaxed">
            Estudia 25 minutos sin distracciones y descansa 5. El temporizador cambia de modo automáticamente; tras cuatro ciclos, toma un descanso más largo.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Módulos de la guía
   --------------------------------------------------------------------- */

function ModuleHeading({ n, title, intro }) {
  return (
    <div className="space-y-2">
      <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">Módulo {n}</p>
      <h4 className="font-serif text-3xl sm:text-4xl font-semibold text-ink leading-tight">{title}</h4>
      <p className="text-[15px] text-body leading-relaxed max-w-3xl">{intro}</p>
    </div>
  );
}

function SubTitle({ icon: Icon, children }) {
  return (
    <p className="flex items-center gap-2 text-lg font-semibold text-ink">
      <Icon size={18} className="text-plum" /> {children}
    </p>
  );
}

function ModuleOne() {
  const [flipped, setFlipped] = useState(() => new Set());
  const toggle = (i) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="space-y-10">
      <ModuleHeading
        n={1}
        title="¿Qué es el Aula Invertida?"
        intro="Es un modelo en el que el primer contacto con el tema ocurre en casa, a tu ritmo, y el tiempo de la tutoría se dedica a practicar, experimentar y resolver dudas con el acompañamiento del docente."
      />

      <div className="space-y-4">
        <SubTitle icon={Repeat}>Clase tradicional vs. Aula invertida</SubTitle>
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {COMPARISON.map((c) => (
            <div key={c.aspect} className="rounded-2xl border border-line bg-white shadow-paper p-4 space-y-3">
              <p className="font-semibold text-ink">{c.aspect}</p>
              <div className="rounded-xl bg-ivory border border-line p-3">
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">Clase tradicional</span>
                <p className="text-sm text-body mt-0.5">{c.traditional}</p>
              </div>
              <div className="rounded-xl bg-lilac border border-lilac-line p-3">
                <span className="text-[10px] uppercase tracking-[0.18em] text-plum font-semibold">Aula invertida</span>
                <p className="text-sm text-ink mt-0.5">{c.flipped}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:block overflow-x-auto rounded-3xl border border-line bg-white shadow-paper">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="bg-silk text-left text-[11px] uppercase tracking-[0.16em] text-muted">
                <th className="px-5 py-3.5 font-semibold w-[28%]">Aspecto</th>
                <th className="px-5 py-3.5 font-semibold">Clase tradicional</th>
                <th className="px-5 py-3.5 font-semibold text-plum">Aula invertida</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((c, i) => (
                <tr key={c.aspect} className="border-t border-line hover:bg-ivory transition-colors">
                  <td className="px-5 py-4 font-semibold text-ink">
                    <span className="font-serif text-lg text-bronze mr-2">{i + 1}</span>
                    {c.aspect}
                  </td>
                  <td className="px-5 py-4 text-body">{c.traditional}</td>
                  <td className="px-5 py-4 text-ink bg-lilac/40">{c.flipped}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <SubTitle icon={Sparkles}>Mitos vs. realidades</SubTitle>
        <p className="text-sm text-muted">Toca cada tarjeta para descubrir la realidad.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MYTHS.map((m, i) => {
            const isOpen = flipped.has(i);
            return (
              <button
                key={m.myth}
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={isOpen}
                className={cx(
                  'min-h-[150px] text-left rounded-3xl border p-5 transition-colors',
                  isOpen ? 'border-sage-line bg-sage-soft' : 'border-wine-line bg-wine-soft hover:border-wine'
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={isOpen ? 'r' : 'm'} initial={{ opacity: 0, rotateX: -60 }} animate={{ opacity: 1, rotateX: 0 }} exit={{ opacity: 0, rotateX: 60 }} transition={{ duration: 0.25 }}>
                    <span className={cx('text-[11px] uppercase tracking-[0.2em] font-bold', isOpen ? 'text-sage' : 'text-wine')}>{isOpen ? 'Realidad' : 'Mito'}</span>
                    <p className="mt-2 font-serif text-xl font-semibold text-ink leading-snug">{isOpen ? m.reality : `“${m.myth}”`}</p>
                  </motion.div>
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-sand-line bg-sand p-5 sm:p-7">
        <SubTitle icon={Hand}>Consejos para perder el miedo a participar</SubTitle>
        <ol className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {PARTICIPATION_TIPS.map((t, i) => (
            <li key={t} className="flex gap-3 rounded-2xl bg-white border border-sand-line p-4 text-sm text-body leading-relaxed">
              <span className="font-serif text-2xl font-semibold text-bronze leading-none">{i + 1}</span>
              {t}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function ModuleTwo() {
  return (
    <div className="space-y-10">
      <ModuleHeading
        n={2}
        title="Gestión del tiempo para estudiantes que trabajan"
        intro="Estudiar después de una jornada laboral exige planificar bloques cortos y realistas. Estas herramientas te ayudan a convertir el poco tiempo libre en avance real."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-line bg-white shadow-paper p-5 sm:p-6">
          <SubTitle icon={CalendarDays}>Tu semana en Google Calendar</SubTitle>
          <ol className="mt-4 space-y-3">
            {CALENDAR_STEPS.map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-plum text-xs font-bold text-white">{i + 1}</span>
                <span className="text-sm text-body leading-relaxed pt-1">{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="space-y-6">
          <div className="rounded-3xl border border-line bg-white shadow-paper p-5 sm:p-6">
            <SubTitle icon={Scissors}>Método “Divide y vencerás”</SubTitle>
            <p className="mt-2 text-sm text-body">Una tarea grande asusta; varias pequeñas se terminan. Ejemplo: un informe de laboratorio.</p>
            <ul className="mt-4 space-y-2">
              {DIVIDE.map((d) => (
                <li key={d.part} className="flex items-center gap-3">
                  <span className="text-sm text-ink flex-1">{d.part}</span>
                  <div className="w-28 h-2 rounded-full bg-silk overflow-hidden">
                    <div className="h-full rounded-full bg-bronze" style={{ width: `${(d.minutes / 20) * 100}%` }} />
                  </div>
                  <span className="w-14 text-right text-xs font-semibold text-bronze-dark tabular-nums">{d.minutes} min</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-lilac-line bg-lilac p-5 sm:p-6">
            <SubTitle icon={Clock}>La Regla de los 5 Minutos</SubTitle>
            <p className="mt-2 text-sm text-ink leading-relaxed">
              Cuando no tengas ganas de empezar, comprométete a estudiar solo 5 minutos. Lo más difícil es arrancar: casi siempre seguirás un poco más, y si no,
              igual habrás avanzado.
            </p>
          </div>
        </div>
      </div>

      <PomodoroTimer />
    </div>
  );
}

function ModuleThree() {
  const [step, setStep] = useState(0);
  const current = ROUTE[step];
  const Icon = current.icon;

  return (
    <div className="space-y-10">
      <ModuleHeading
        n={3}
        title="Aprende Ciencias paso a paso"
        intro="Una ruta de cinco pasos para estudiar cada lección del módulo de Ciencias Naturales y llegar a la tutoría con dudas claras y la práctica avanzada."
      />

      <div className="space-y-5">
        <div className="grid grid-cols-5 gap-1.5 sm:gap-3" role="tablist" aria-label="Pasos de la ruta">
          {ROUTE.map((r, i) => {
            const RIcon = r.icon;
            const active = i === step;
            const done = i < step;
            return (
              <button
                key={r.title}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setStep(i)}
                className={cx(
                  'flex flex-col items-center gap-2 rounded-2xl border px-1 py-3 sm:p-4 transition-all',
                  active ? 'border-plum bg-plum text-white shadow-sm' : done ? 'border-sage-line bg-sage-soft text-sage' : 'border-line bg-white text-plum shadow-paper hover:border-line-strong'
                )}
              >
                <RIcon size={18} />
                <span className="text-[10px] sm:text-xs font-semibold leading-tight text-center">{r.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
            <div className="rounded-3xl border border-line bg-white shadow-paper p-5 sm:p-7 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-5 items-start">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-lilac border border-lilac-line text-plum">
                <Icon size={28} />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold">Paso {step + 1} de 5</span>
                  <Badge toneName="amber" icon={Clock}>
                    {current.time}
                  </Badge>
                </div>
                <p className="mt-2 font-serif text-3xl font-semibold text-ink">{current.title}</p>
                <p className="mt-2 text-[15px] text-body leading-relaxed">{current.text}</p>
                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="min-h-[42px] rounded-xl border border-lilac-line bg-white px-4 text-sm font-semibold text-plum disabled:opacity-40 hover:bg-lilac transition-colors"
                  >
                    Anterior
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.min(ROUTE.length - 1, s + 1))}
                    disabled={step === ROUTE.length - 1}
                    className="min-h-[42px] inline-flex items-center gap-1.5 rounded-xl bg-plum px-4 text-sm font-semibold text-white disabled:opacity-40 hover:bg-plum-dark transition-colors"
                  >
                    Siguiente <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STUDY_TECHNIQUES.map((t) => {
          const TIcon = t.icon;
          return (
            <div key={t.title} className="rounded-3xl border border-line bg-white shadow-paper p-5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sand border border-sand-line text-bronze">
                <TIcon size={18} />
              </span>
              <p className="mt-3 font-semibold text-ink">{t.title}</p>
              <ul className="mt-3 space-y-2">
                {t.points.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-body leading-relaxed">
                    <Check size={15} className="shrink-0 mt-0.5 text-sage" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ModuleFour() {
  const [done, setDone] = useState(() => new Set());
  const toggle = (i) =>
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  const pct = Math.round((done.size / WEEKLY_CHALLENGE.length) * 100);

  return (
    <div className="space-y-10">
      <ModuleHeading
        n={4}
        title="Tus herramientas digitales y el trabajo en equipo"
        intro="Una guía práctica de las herramientas que usarás para crear, repasar y colaborar con tu equipo, todas disponibles desde el navegador del celular."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {TOOLS.map((t) => {
          const TIcon = t.icon;
          return (
            <div key={t.name} className="rounded-3xl border border-line bg-white shadow-paper p-5 flex flex-col">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lilac border border-lilac-line text-plum">
                <TIcon size={18} />
              </span>
              <p className="mt-3 font-semibold text-ink">{t.name}</p>
              <p className="mt-1 text-sm text-body leading-relaxed flex-1">{t.use}</p>
              <div className="mt-4 rounded-xl border border-line bg-ivory p-3">
                <span className="text-[10px] uppercase tracking-[0.18em] text-bronze font-semibold">Primeros pasos</span>
                <p className="text-xs text-body leading-relaxed mt-0.5">{t.start}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-3xl bg-abyss text-on-plum p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#E5D5B5] font-semibold">Reto semanal</p>
            <p className="font-serif text-3xl font-semibold">Cinco misiones para tu semana</p>
          </div>
          <span className="font-serif text-5xl font-semibold text-[#E5D5B5] tabular-nums leading-none">{pct}%</span>
        </div>
        <div className="mt-4 h-2 w-full rounded-full bg-white/15 overflow-hidden">
          <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }} className="h-full rounded-full bg-[#E5D5B5]" />
        </div>
        <ul className="mt-6 space-y-2.5">
          {WEEKLY_CHALLENGE.map((c, i) => {
            const checked = done.has(i);
            return (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-pressed={checked}
                  className={cx('w-full flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors', checked ? 'border-[#E5D5B5]/60 bg-white/10' : 'border-white/15 hover:bg-white/5')}
                >
                  <span className={cx('inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border', checked ? 'bg-[#E5D5B5] border-[#E5D5B5] text-abyss' : 'border-white/40')}>
                    {checked && <Check size={15} />}
                  </span>
                  <span className={cx('text-sm', checked ? 'text-on-plum-muted line-through' : 'text-on-plum')}>{c}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const MODULES = [
  { id: 'm1', label: 'Módulo 1 · Aula invertida', shortLabel: 'Módulo 1', icon: Repeat, component: ModuleOne },
  { id: 'm2', label: 'Módulo 2 · Gestión del tiempo', shortLabel: 'Módulo 2', icon: Clock, component: ModuleTwo },
  { id: 'm3', label: 'Módulo 3 · Ciencias paso a paso', shortLabel: 'Módulo 3', icon: FlaskConical, component: ModuleThree },
  { id: 'm4', label: 'Módulo 4 · Herramientas y equipo', shortLabel: 'Módulo 4', icon: Wrench, component: ModuleFour },
];

function GuideViewer() {
  const [active, setActive] = useState('m1');
  const current = MODULES.find((m) => m.id === active);
  const View = current.component;
  return (
    <div className="space-y-6">
      <TabBar tabs={MODULES.map(({ id, label, shortLabel, icon }) => ({ id, label, shortLabel, icon }))} active={active} onChange={setActive} layoutId="propuesta-modulos" />
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
          <GlassCard hover={false}>
            <View />
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Propuesta_de_mejora() {
  const [openAction, setOpenAction] = useState(1);

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Apartado 11 · Propuesta de mejora"
        icon={Lightbulb}
        title="Propuesta de"
        highlight="mejora"
        description="Una respuesta pedagógica y tecnológica a las necesidades identificadas en el diagnóstico, con un recurso digital para el estudiantado."
      />

      <PlumBand>
        <p className="text-[11px] uppercase tracking-[0.24em] text-[#E5D5B5] font-semibold">Título de la propuesta</p>
        <h3 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.08] text-on-plum max-w-5xl">{TITLE}</h3>
        <div className="mt-6 flex flex-wrap gap-2">
          {['Autonomía', 'Alfabetización digital', 'Aprendizaje activo', 'Aula invertida', 'Ciencias Naturales'].map((t) => (
            <span key={t} className="rounded-full border border-white/25 px-3 py-1 text-xs text-on-plum">
              {t}
            </span>
          ))}
        </div>
      </PlumBand>

      {/* Justificación */}
      <section className="space-y-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">11.a Justificación con evidencias</p>
          <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-ink">¿Por qué esta propuesta?</h3>
          <p className="mt-2 text-[15px] text-body leading-relaxed max-w-4xl">
            El diagnóstico muestra un grupo adulto, motivado y autónomo, pero condicionado por el tiempo, la conectividad y las competencias digitales. Tanto el
            docente tutor, Lcdo. Amilcar Sánchez, como el coordinador, Gerardo, identifican dificultades en lectoescritura y en el manejo básico de la computadora.
          </p>
        </div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EVIDENCE.map((e) => {
            const Icon = e.icon;
            return (
              <motion.div key={e.label} variants={fadeUp} className="rounded-3xl border border-line bg-white shadow-paper p-5">
                <div className="flex items-center justify-between">
                  <Icon size={19} className="text-plum" />
                  <span className="text-[10px] uppercase tracking-[0.16em] text-muted font-semibold">{e.source}</span>
                </div>
                <p className="mt-4 font-serif text-4xl font-semibold text-plum leading-none">{e.value}</p>
                <p className="mt-2 text-sm text-body leading-snug">{e.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Objetivos */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 rounded-3xl border border-sand-line bg-sand p-6 sm:p-8">
          <Crosshair size={22} className="text-bronze" />
          <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">11.b Objetivo general</p>
          <p className="mt-3 font-serif text-2xl leading-snug text-ink">{GENERAL_OBJECTIVE}</p>
        </div>
        <div className="lg:col-span-7 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">Objetivos específicos</p>
          {SPECIFIC_OBJECTIVES.map((o, i) => {
            const Icon = o.icon;
            return (
              <div key={o.text} className="flex items-start gap-4 rounded-2xl border border-line bg-white shadow-paper p-4">
                <span className="font-serif text-2xl font-semibold text-bronze leading-none w-6">{i + 1}</span>
                <Icon size={18} className="shrink-0 mt-0.5 text-plum" />
                <p className="text-[15px] text-body leading-relaxed">{o.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Acciones */}
      <section className="space-y-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">11.c Acciones y estrategias propuestas</p>
          <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-ink">Cinco acciones articuladas</h3>
        </div>

        {/* Móvil: tarjetas desplegables */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {ACTIONS.map((a) => {
            const Icon = a.icon;
            const open = openAction === a.n;
            return (
              <div key={a.n} className={cx('rounded-2xl border bg-white shadow-paper overflow-hidden', open ? 'border-line-strong' : 'border-line')}>
                <button type="button" onClick={() => setOpenAction(open ? null : a.n)} aria-expanded={open} className="w-full flex items-start gap-3 p-4 text-left">
                  <span className="font-serif text-2xl font-semibold text-bronze leading-none">{a.n}</span>
                  <Icon size={18} className="shrink-0 mt-0.5 text-plum" />
                  <span className="flex-1 font-semibold text-ink leading-snug">{a.title}</span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <dl className="px-4 pb-4 space-y-3">
                        {ACTION_FIELDS.map((f) => (
                          <div key={f.key} className="rounded-xl border border-line bg-ivory p-3">
                            <dt className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-muted font-semibold">
                              <f.icon size={12} /> {f.label}
                            </dt>
                            <dd className="text-sm text-body leading-relaxed mt-1">{a[f.key]}</dd>
                          </div>
                        ))}
                      </dl>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Escritorio: tabla editorial */}
        <div className="hidden md:block overflow-x-auto rounded-3xl border border-line bg-white shadow-paper">
          <table className="w-full min-w-[1040px] text-sm">
            <thead>
              <tr className="bg-silk text-left text-[11px] uppercase tracking-[0.14em] text-muted">
                <th className="px-4 py-3.5 font-semibold w-[22%]">Acción</th>
                {ACTION_FIELDS.map((f) => (
                  <th key={f.key} className="px-4 py-3.5 font-semibold">
                    {f.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ACTIONS.map((a) => {
                const Icon = a.icon;
                return (
                  <tr key={a.n} className="align-top border-t border-line hover:bg-ivory transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-start gap-2.5">
                        <span className="font-serif text-2xl font-semibold text-bronze leading-none">{a.n}</span>
                        <div>
                          <Icon size={17} className="text-plum mb-1.5" />
                          <p className="font-semibold text-ink leading-snug">{a.title}</p>
                        </div>
                      </div>
                    </td>
                    {ACTION_FIELDS.map((f) => (
                      <td key={f.key} className="px-4 py-4 text-body leading-relaxed">
                        {a[f.key]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <Divider />

      {/* Recurso pedagógico */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">11.d Recurso pedagógico digital integrado</p>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-ink leading-tight">
              Guía de Éxito: <span className="italic text-plum">Domina las Ciencias Naturales y tu Aprendizaje a Distancia en el Aula Invertida</span>
            </h3>
          </div>
          <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end">
            <Badge toneName="violet" icon={Smartphone}>
              Mobile-First
            </Badge>
            <Badge toneName="amber" icon={BookOpen}>
              4 módulos
            </Badge>
            <Badge toneName="emerald" icon={Timer}>
              Pomodoro interactivo
            </Badge>
          </div>
        </div>
        <GuideViewer />
      </section>

      {/* Impacto */}
      <section className="space-y-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">11.e Impacto esperado</p>
          <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-ink">Qué cambia y para quién</h3>
        </div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {IMPACT.map((im) => {
            const Icon = im.icon;
            return (
              <motion.div key={im.title} variants={fadeUp}>
                <GlassCard className="h-full">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-lilac border border-lilac-line text-plum">
                    <Icon size={20} />
                  </span>
                  <p className="mt-4 font-serif text-2xl font-semibold text-ink">{im.title}</p>
                  <ul className="mt-4 space-y-2.5">
                    {im.items.map((it) => (
                      <li key={it} className="flex gap-2.5 text-sm text-body leading-relaxed">
                        <CircleCheck size={16} className="shrink-0 mt-0.5 text-sage" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Reflexión */}
      <section className="space-y-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">Reflexión y conclusiones</p>
          <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-ink">Coherencia de la propuesta</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {COHERENCE.map((c, i) => (
            <div key={c.label} className="relative">
              <div className={cx('h-full rounded-3xl border p-5', i === 3 ? 'border-wine-line bg-wine-soft' : 'border-line bg-white shadow-paper')}>
                <span className={cx('text-[11px] uppercase tracking-[0.22em] font-bold', i === 3 ? 'text-wine' : 'text-plum')}>{c.label}</span>
                <p className="mt-2 text-sm text-body leading-relaxed">{c.text}</p>
              </div>
              {i < COHERENCE.length - 1 && (
                <>
                  <ArrowRight size={18} className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-line-strong bg-ivory rounded-full" />
                  <ArrowDown size={18} className="md:hidden mx-auto my-1 text-line-strong" />
                </>
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <GlassCard hover={false} className="lg:col-span-7">
            <Quote size={22} className="text-bronze" />
            <p className="mt-3 font-serif text-xl sm:text-2xl leading-snug text-ink">
              La propuesta no busca añadir tecnología por tendencia, sino usarla donde el diagnóstico muestra una necesidad: estudiantes motivados y autónomos que necesitan
              recursos ligeros, acompañamiento cercano y tiempos realistas para aprender Ciencias Naturales.
            </p>
            <div className="mt-5">
              <ProgressBar label="Acciones vinculadas a hallazgos del diagnóstico" value={5} max={5} suffix=" de 5" toneName="emerald" />
            </div>
          </GlassCard>
          <div className="lg:col-span-5 rounded-3xl border border-wine-line bg-wine-soft p-6">
            <p className="flex items-center gap-2 font-semibold text-wine">
              <TriangleAlert size={17} /> Límites reconocidos
            </p>
            <ul className="mt-4 space-y-2.5">
              {LIMITS.map((l) => (
                <li key={l} className="flex gap-2.5 text-sm text-body leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-wine" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
