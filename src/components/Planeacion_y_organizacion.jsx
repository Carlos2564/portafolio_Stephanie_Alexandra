import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';

const Planeacion_y_organizacion = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="w-full bg-slate-800/40 border border-slate-700/50 rounded-[2rem] p-8 md:p-12 backdrop-blur-sm"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-fuchsia-500/20 rounded-xl">
          <CalendarDays className="text-fuchsia-400" size={28} />
        </div>
        <h2 className="text-3xl font-bold text-white">Cronograma de Actividades</h2>
      </div>

      {/* Skeleton del Diagrama de Gantt */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[700px] bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
          
          {/* Cabecera de Semanas */}
          <div className="grid grid-cols-5 gap-4 border-b border-slate-700 pb-4 mb-6">
            <div className="col-span-2 h-4 w-32 bg-slate-800 rounded-full"></div>
            <div className="h-4 w-16 bg-slate-700/50 rounded-full mx-auto"></div>
            <div className="h-4 w-16 bg-slate-700/50 rounded-full mx-auto"></div>
            <div className="h-4 w-16 bg-slate-700/50 rounded-full mx-auto"></div>
          </div>

          {/* Filas de Tareas y Barras de Tiempo */}
          <div className="space-y-6">
            {[
              { width: "w-full", start: "col-start-3" },
              { width: "w-2/3", start: "col-start-4" },
              { width: "w-full", start: "col-start-3" }
            ].map((bar, i) => (
              <div key={i} className="grid grid-cols-5 gap-4 items-center">
                {/* Nombre de la tarea */}
                <div className="col-span-2 space-y-2">
                  <div className="h-3 w-3/4 bg-slate-700/40 rounded-full animate-pulse"></div>
                  <div className="h-2 w-1/2 bg-slate-700/30 rounded-full animate-pulse"></div>
                </div>
                {/* Barra de Gantt */}
                <div className={`col-span-3 grid grid-cols-3 gap-2`}>
                  <div className={`${bar.start} col-span-2 h-8 bg-gradient-to-r from-teal-500/40 to-fuchsia-500/40 rounded-lg animate-pulse border border-white/10`}></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default Planeacion_y_organizacion;