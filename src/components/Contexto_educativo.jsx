import React from 'react';
import { motion } from 'framer-motion';
import { Map, Users, Laptop } from 'lucide-react';

const Contexto_educativo = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      <div className="flex items-center gap-4 mb-8 pl-4 border-l-4 border-fuchsia-500">
        <h2 className="text-3xl font-bold text-white">Contexto Educativo</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Tarjeta Institución */}
        <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl flex flex-col items-center text-center group hover:bg-slate-800/60 transition-colors">
          <div className="w-16 h-16 bg-slate-900/80 rounded-full flex items-center justify-center mb-6 shadow-inner border border-slate-700">
            <Map className="text-teal-400" size={32} />
          </div>
          <div className="h-5 w-3/4 bg-slate-700/60 rounded-full animate-pulse mb-4"></div>
          <div className="space-y-2 w-full">
            <div className="h-3 w-full bg-slate-700/40 rounded-full animate-pulse"></div>
            <div className="h-3 w-5/6 mx-auto bg-slate-700/40 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Tarjeta Grupo Asignado */}
        <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl flex flex-col items-center text-center group hover:bg-slate-800/60 transition-colors">
          <div className="w-16 h-16 bg-slate-900/80 rounded-full flex items-center justify-center mb-6 shadow-inner border border-slate-700">
            <Users className="text-fuchsia-400" size={32} />
          </div>
          <div className="h-5 w-2/3 bg-slate-700/60 rounded-full animate-pulse mb-4"></div>
          <div className="space-y-2 w-full">
            <div className="h-3 w-full bg-slate-700/40 rounded-full animate-pulse"></div>
            <div className="h-3 w-4/5 mx-auto bg-slate-700/40 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Tarjeta Recursos Tecnológicos */}
        <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl flex flex-col items-center text-center group hover:bg-slate-800/60 transition-colors">
          <div className="w-16 h-16 bg-slate-900/80 rounded-full flex items-center justify-center mb-6 shadow-inner border border-slate-700">
            <Laptop className="text-violet-400" size={32} />
          </div>
          <div className="h-5 w-3/4 bg-slate-700/60 rounded-full animate-pulse mb-4"></div>
          <div className="space-y-3 w-full mt-2">
             <div className="flex gap-2 justify-center">
                <div className="h-8 w-16 bg-slate-700/40 rounded-lg animate-pulse"></div>
                <div className="h-8 w-16 bg-slate-700/40 rounded-lg animate-pulse"></div>
                <div className="h-8 w-16 bg-slate-700/40 rounded-lg animate-pulse"></div>
             </div>
          </div>
        </div>

      </div>
    </motion.section>
  );
};

export default Contexto_educativo;