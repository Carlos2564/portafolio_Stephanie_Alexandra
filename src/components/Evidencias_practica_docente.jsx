import React from 'react';
import { motion } from 'framer-motion';
import { ImageIcon, ChevronLeft, ChevronRight, Play } from 'lucide-react';

const Evidencias_practica_docente = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="w-full space-y-12"
    >
      {/* Sección 1: Carrusel de Fotografías */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-[2rem] p-8 md:p-12 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-teal-500/20 rounded-xl">
            <ImageIcon className="text-teal-400" size={28} />
          </div>
          <h2 className="text-3xl font-bold text-white">Galería de Evidencias</h2>
        </div>

        {/* Contenedor del Carrusel Skeleton */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Imagen Principal */}
          <div className="w-full aspect-video bg-slate-900/80 border border-slate-700/50 rounded-2xl flex items-center justify-center animate-pulse relative overflow-hidden shadow-2xl">
            <ImageIcon className="text-slate-700" size={64} />
            
            {/* Flechas simuladas */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-slate-800/50 rounded-full border border-slate-600/50">
              <ChevronLeft className="text-slate-500" size={24} />
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-slate-800/50 rounded-full border border-slate-600/50">
              <ChevronRight className="text-slate-500" size={24} />
            </div>
          </div>

          {/* Miniaturas */}
          <div className="flex justify-center gap-4 mt-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className={`h-16 w-24 bg-slate-800 border ${item === 3 ? 'border-teal-400' : 'border-slate-700/50'} rounded-lg animate-pulse flex items-center justify-center`}>
                 <ImageIcon className="text-slate-700" size={20} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección 2: Materiales Multimedia (Videos/Genially simulados) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map((item) => (
          <div key={item} className="bg-slate-800/40 border border-slate-700/50 rounded-[1.5rem] p-6 backdrop-blur-sm group">
            <div className="w-full aspect-video bg-slate-900 border border-slate-700/50 rounded-xl flex items-center justify-center animate-pulse mb-6 relative">
              <div className="w-16 h-16 bg-fuchsia-500/20 rounded-full flex items-center justify-center">
                <Play className="text-fuchsia-400 ml-1" size={32} />
              </div>
            </div>
            <div className="h-4 w-3/4 bg-slate-700/50 rounded-full animate-pulse mb-3"></div>
            <div className="h-3 w-1/2 bg-slate-700/30 rounded-full animate-pulse"></div>
          </div>
        ))}
      </div>

    </motion.section>
  );
};

export default Evidencias_practica_docente;