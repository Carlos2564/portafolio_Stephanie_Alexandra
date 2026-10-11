import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, BarChart3, ClipboardList } from 'lucide-react';

const Diagnostico_educativo = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="w-full space-y-8"
    >
      <div className="flex items-center gap-4 mb-8 pl-4 border-l-4 border-teal-500">
        <h2 className="text-3xl font-bold text-white">Diagnóstico Educativo</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Panel Izquierdo: Instrumentos y Contexto */}
        <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-[2rem] backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <ClipboardList className="text-teal-400" size={24} />
            <h3 className="text-xl font-semibold text-white">Instrumentos Aplicados</h3>
          </div>
          <div className="space-y-4 mb-8">
            <div className="h-4 w-full bg-slate-700/50 rounded-full animate-pulse"></div>
            <div className="h-4 w-5/6 bg-slate-700/50 rounded-full animate-pulse"></div>
            <div className="h-4 w-4/5 bg-slate-700/50 rounded-full animate-pulse"></div>
          </div>

          {/* Gráfico de Barras Simulado */}
          <div className="mt-8 border-t border-slate-700/50 pt-8">
             <div className="flex items-end gap-4 h-32 w-full justify-around mt-4">
                <div className="w-12 bg-teal-500/30 rounded-t-lg h-[40%] animate-pulse"></div>
                <div className="w-12 bg-fuchsia-500/30 rounded-t-lg h-[80%] animate-pulse"></div>
                <div className="w-12 bg-violet-500/30 rounded-t-lg h-[60%] animate-pulse"></div>
                <div className="w-12 bg-blue-500/30 rounded-t-lg h-[30%] animate-pulse"></div>
             </div>
          </div>
        </div>

        {/* Panel Derecho: Gráfico Circular y FODA */}
        <div className="space-y-8">
          {/* Skeleton Gráfico Circular */}
          <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-[2rem] flex items-center gap-8 backdrop-blur-sm">
             <div className="w-32 h-32 rounded-full border-8 border-slate-700/50 border-t-fuchsia-500/50 border-r-teal-500/50 animate-spin-slow"></div>
             <div className="space-y-3 w-full">
                <div className="h-3 w-full bg-slate-700/50 rounded-full animate-pulse"></div>
                <div className="h-3 w-3/4 bg-slate-700/50 rounded-full animate-pulse"></div>
             </div>
          </div>

          {/* Tarjetas FODA (Fortalezas, Oportunidades, etc.) */}
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-slate-800/60 border border-slate-700/50 p-4 rounded-xl">
                 <div className={`h-2 w-12 rounded-full mb-3 ${item % 2 === 0 ? 'bg-fuchsia-500/50' : 'bg-teal-500/50'}`}></div>
                 <div className="h-2 w-full bg-slate-700/40 rounded-full animate-pulse mb-2"></div>
                 <div className="h-2 w-4/5 bg-slate-700/40 rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Diagnostico_educativo;