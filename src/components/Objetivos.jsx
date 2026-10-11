import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2 } from 'lucide-react';

const Objetivos = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="w-full bg-slate-800/40 border border-slate-700/50 rounded-[2rem] p-8 md:p-12 backdrop-blur-sm"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-teal-500/20 rounded-xl">
          <Target className="text-teal-400" size={28} />
        </div>
        <h2 className="text-3xl font-bold text-white">Objetivos de la Práctica</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skeleton Objetivo General */}
        <div className="bg-slate-900/50 border border-slate-700/50 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold text-fuchsia-400 mb-4 flex items-center gap-2">
            General
          </h3>
          <div className="space-y-3">
            <div className="h-4 w-full bg-slate-700/50 rounded-full animate-pulse"></div>
            <div className="h-4 w-5/6 bg-slate-700/50 rounded-full animate-pulse"></div>
            <div className="h-4 w-4/5 bg-slate-700/50 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Skeleton Objetivos Específicos */}
        <div className="bg-slate-900/50 border border-slate-700/50 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold text-teal-400 mb-4 flex items-center gap-2">
            Específicos
          </h3>
          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex gap-3">
                <CheckCircle2 className="text-slate-600 flex-shrink-0" size={20} />
                <div className="w-full space-y-2 pt-1">
                  <div className="h-3 w-full bg-slate-700/40 rounded-full animate-pulse"></div>
                  <div className="h-3 w-3/4 bg-slate-700/40 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Objetivos;