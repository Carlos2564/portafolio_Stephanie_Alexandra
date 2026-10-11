import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

const Diario_reflexivo_semanal = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto space-y-6"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-fuchsia-500/20 rounded-full mb-4">
          <BookOpen className="text-fuchsia-400" size={32} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">Diario Reflexivo</h2>
        <p className="text-slate-400 mt-2">Bitácora semanal de experiencias y aprendizajes</p>
      </div>

      {/* Item Abierto (Semana 1) */}
      <div className="bg-slate-800/60 border border-fuchsia-500/30 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="p-6 flex justify-between items-center cursor-pointer bg-slate-800/80">
          <h3 className="text-xl font-bold text-white flex items-center gap-3">
            <span className="text-fuchsia-400">Jornada 1:</span> Introducción y Observación
          </h3>
          <ChevronUp className="text-fuchsia-400" />
        </div>
        <div className="p-6 border-t border-slate-700/50 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Actividades y Retos */}
          <div className="space-y-6">
             <div>
                <div className="h-3 w-32 bg-slate-600/50 rounded-full mb-3"></div>
                <div className="h-2 w-full bg-slate-700/40 rounded-full animate-pulse mb-2"></div>
                <div className="h-2 w-5/6 bg-slate-700/40 rounded-full animate-pulse"></div>
             </div>
             <div>
                <div className="h-3 w-40 bg-fuchsia-900/50 rounded-full mb-3"></div>
                <div className="h-2 w-full bg-slate-700/40 rounded-full animate-pulse mb-2"></div>
             </div>
          </div>

          {/* Aprendizajes y Reflexión */}
          <div className="space-y-6">
             <div className="p-4 bg-teal-900/20 border border-teal-500/20 rounded-xl">
                <div className="h-3 w-32 bg-teal-700/50 rounded-full mb-3"></div>
                <div className="h-2 w-full bg-teal-800/40 rounded-full animate-pulse mb-2"></div>
                <div className="h-2 w-4/5 bg-teal-800/40 rounded-full animate-pulse"></div>
             </div>
          </div>

        </div>
      </div>

      {/* Items Cerrados (Semanas 2, 3, 4...) */}
      {[2, 3, 4].map((semana) => (
        <div key={semana} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 flex justify-between items-center cursor-pointer hover:bg-slate-800/60 transition-colors">
          <div className="flex items-center gap-4">
             <div className="h-6 w-24 bg-slate-700/50 rounded-lg animate-pulse"></div>
             <div className="h-4 w-48 bg-slate-700/30 rounded-full hidden sm:block animate-pulse"></div>
          </div>
          <ChevronDown className="text-slate-500" />
        </div>
      ))}

    </motion.section>
  );
};

export default Diario_reflexivo_semanal;