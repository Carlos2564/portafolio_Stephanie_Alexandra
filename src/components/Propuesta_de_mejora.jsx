import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Rocket, Settings, Target } from 'lucide-react';

const Propuesta_de_mejora = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
      className="w-full space-y-8"
    >
      {/* Cabecera Principal - Justificación */}
      <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900 border border-slate-700/50 rounded-[2rem] p-10 overflow-hidden">
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-fuchsia-500/10 blur-[80px] rounded-full"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
          <div className="p-5 bg-fuchsia-500/20 rounded-2xl shadow-lg shadow-fuchsia-500/10 border border-fuchsia-500/30">
            <Lightbulb className="text-fuchsia-400" size={40} />
          </div>
          <div className="flex-1 w-full space-y-5">
            <h2 className="text-3xl font-bold text-white mb-2">Propuesta de Mejora</h2>
            <div className="h-4 w-3/4 bg-slate-700/50 rounded-full animate-pulse"></div>
            <div className="h-4 w-full bg-slate-700/40 rounded-full animate-pulse"></div>
            <div className="h-4 w-5/6 bg-slate-700/40 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Grid de Acciones, Recursos e Impacto */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Columna Izquierda: Acciones Concretas (Línea de tiempo) */}
        <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700/50 p-8 rounded-[2rem]">
          <div className="flex items-center gap-3 mb-8">
            <Target className="text-teal-400" size={24} />
            <h3 className="text-2xl font-bold text-white">Objetivos y Acciones</h3>
          </div>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-teal-500/50 before:to-transparent">
            {[1, 2, 3].map((item) => (
              <div key={item} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-teal-500/20 text-teal-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Settings size={16} className="animate-spin-slow" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900/50 p-5 rounded-2xl border border-slate-700/50 shadow-lg">
                  <div className="h-3 w-1/2 bg-slate-600/50 rounded-full animate-pulse mb-3"></div>
                  <div className="h-2 w-full bg-slate-700/40 rounded-full animate-pulse mb-2"></div>
                  <div className="h-2 w-4/5 bg-slate-700/40 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna Derecha: Recursos e Impacto */}
        <div className="space-y-8">
          <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-[2rem]">
            <h3 className="text-lg font-bold text-slate-300 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-400"></span> Recursos Necesarios
            </h3>
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-8 w-24 bg-slate-700/40 rounded-lg animate-pulse border border-slate-600/30"></div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-b from-teal-900/40 to-slate-900 border border-teal-500/30 p-6 rounded-[2rem] relative overflow-hidden">
            <Rocket className="absolute -right-4 -bottom-4 text-teal-500/10" size={100} />
            <h3 className="text-lg font-bold text-teal-400 mb-4 relative z-10">Impacto Esperado</h3>
            <div className="space-y-3 relative z-10">
              <div className="h-3 w-full bg-teal-900/60 rounded-full animate-pulse"></div>
              <div className="h-3 w-full bg-teal-900/60 rounded-full animate-pulse"></div>
              <div className="h-3 w-2/3 bg-teal-900/60 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

      </div>
    </motion.section>
  );
};

export default Propuesta_de_mejora;