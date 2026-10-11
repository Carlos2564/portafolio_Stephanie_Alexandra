import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Compass, TrendingUp, Award, Star } from 'lucide-react';

const Experiencias_significativas = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div className="flex items-center gap-4 mb-8">
        <HeartHandshake className="text-fuchsia-400" size={36} />
        <h2 className="text-3xl md:text-4xl font-bold text-white">Experiencias y Conclusiones</h2>
      </div>

      {/* Grid estilo Bento Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
        
        {/* Caja Grande: Relato de Situaciones (Ocupa 2 columnas) */}
        <div className="md:col-span-2 bg-slate-800/40 border border-slate-700/50 p-8 rounded-[2rem] flex flex-col justify-between group hover:border-slate-600/50 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <Compass className="text-teal-400" size={24} />
            <h3 className="text-xl font-bold text-white">Situaciones Relevantes</h3>
          </div>
          <div className="space-y-4">
            <div className="h-3 w-full bg-slate-700/50 rounded-full animate-pulse"></div>
            <div className="h-3 w-full bg-slate-700/50 rounded-full animate-pulse"></div>
            <div className="h-3 w-5/6 bg-slate-700/50 rounded-full animate-pulse"></div>
          </div>
          <div className="mt-8 flex gap-3">
            <div className="h-8 w-20 bg-teal-500/20 rounded-lg border border-teal-500/30"></div>
            <div className="h-8 w-24 bg-fuchsia-500/20 rounded-lg border border-fuchsia-500/30"></div>
          </div>
        </div>

        {/* Caja Pequeña Superior: Valoración General */}
        <div className="bg-gradient-to-br from-violet-900/40 to-slate-900 border border-violet-500/30 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center relative overflow-hidden">
          <Star className="text-violet-400 mb-4" size={40} />
          <h3 className="text-lg font-bold text-violet-300 mb-3">Valoración</h3>
          <div className="h-8 w-16 bg-violet-500/20 rounded-full border border-violet-400/30"></div>
        </div>

        {/* Caja Pequeña Inferior: Logros */}
        <div className="bg-slate-800/60 border border-slate-700/50 p-8 rounded-[2rem]">
          <div className="flex items-center gap-3 mb-6">
            <Award className="text-fuchsia-400" size={24} />
            <h3 className="text-lg font-bold text-white">Logros</h3>
          </div>
          <ul className="space-y-4">
            {[1, 2, 3].map(item => (
              <li key={item} className="flex gap-3 items-center">
                <div className="w-2 h-2 rounded-full bg-fuchsia-500"></div>
                <div className="h-2 w-full bg-slate-700/50 rounded-full animate-pulse"></div>
              </li>
            ))}
          </ul>
        </div>

        {/* Caja Ancha Inferior: Proyección Profesional */}
        <div className="md:col-span-2 bg-gradient-to-r from-slate-900 to-teal-900/30 border border-teal-500/20 p-8 rounded-[2rem] relative">
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10">
            <TrendingUp size={120} />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-teal-400 mb-4">Proyección Profesional</h3>
            <div className="space-y-3 max-w-lg">
              <div className="h-3 w-full bg-slate-700/50 rounded-full animate-pulse"></div>
              <div className="h-3 w-4/5 bg-slate-700/50 rounded-full animate-pulse"></div>
              <div className="h-3 w-3/4 bg-slate-700/50 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

      </div>
    </motion.section>
  );
};

export default Experiencias_significativas;