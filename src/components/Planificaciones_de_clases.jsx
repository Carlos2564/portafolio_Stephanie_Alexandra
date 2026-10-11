import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';

const Planificaciones_de_clases = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="w-full bg-slate-800/40 border border-slate-700/50 rounded-[2rem] p-8 md:p-12 backdrop-blur-sm"
    >
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar: Lista de Planificaciones */}
        <div className="w-full md:w-1/3 space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-violet-400" size={24} />
            <h3 className="text-xl font-bold text-white">Planes Semanales</h3>
          </div>
          
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className={`p-4 rounded-xl border cursor-pointer transition-all ${item === 1 ? 'bg-slate-700/50 border-violet-500/30' : 'bg-slate-800/30 border-slate-700/30 hover:bg-slate-800/60'}`}>
              <div className="flex justify-between items-center">
                <div className="space-y-2 w-3/4">
                  <div className="h-3 w-full bg-slate-600/50 rounded-full animate-pulse"></div>
                  <div className="h-2 w-1/2 bg-slate-700/50 rounded-full animate-pulse"></div>
                </div>
                <Download size={16} className="text-slate-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Visor de Documento (Iframe Skeleton) */}
        <div className="w-full md:w-2/3">
          <div className="w-full aspect-[3/4] bg-slate-900 border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col">
            {/* Toolbar del visor de PDF */}
            <div className="h-12 w-full bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-4">
               <div className="h-3 w-32 bg-slate-600/50 rounded-full"></div>
               <div className="flex-1"></div>
               <div className="h-4 w-4 rounded-full bg-slate-600/50"></div>
               <div className="h-4 w-4 rounded-full bg-slate-600/50"></div>
            </div>
            
            {/* Página del PDF cargando */}
            <div className="flex-1 p-8 flex flex-col gap-6 animate-pulse bg-slate-800/20">
               <div className="h-8 w-1/2 mx-auto bg-slate-700/30 rounded-lg"></div>
               <div className="h-4 w-full bg-slate-700/30 rounded-full mt-8"></div>
               <div className="h-4 w-full bg-slate-700/30 rounded-full"></div>
               <div className="h-4 w-5/6 bg-slate-700/30 rounded-full"></div>
               
               <div className="mt-8 grid grid-cols-2 gap-8">
                  <div className="h-32 bg-slate-700/30 rounded-xl"></div>
                  <div className="h-32 bg-slate-700/30 rounded-xl"></div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </motion.section>
  );
};

export default Planificaciones_de_clases;