import React from 'react';
import { motion } from 'framer-motion';
import { MonitorPlay, Cpu, Database, PenTool, LayoutGrid } from 'lucide-react';

const Recursos_tecnologicos_aplicados = () => {
  const tools = [
    { icon: MonitorPlay, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    { icon: LayoutGrid, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { icon: Cpu, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { icon: Database, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { icon: PenTool, color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/20' }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Ecosistema Tecnológico</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">Herramientas digitales implementadas durante la práctica para potenciar el proceso de enseñanza-aprendizaje.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`bg-slate-800/40 border ${tool.border} rounded-2xl p-6 hover:bg-slate-800/60 transition-all cursor-pointer group`}
          >
            {/* Header de la Tarjeta */}
            <div className="flex items-start justify-between mb-6">
              <div className={`p-3 ${tool.bg} rounded-xl group-hover:scale-110 transition-transform`}>
                <tool.icon className={tool.color} size={28} />
              </div>
              <div className="h-6 w-16 bg-slate-700/50 rounded-full border border-slate-600/30"></div>
            </div>

            {/* Contenido (Nombre y Descripción) */}
            <div className="space-y-4">
              <div className="h-5 w-1/2 bg-slate-600/80 rounded-lg animate-pulse"></div>
              
              <div className="space-y-2 pt-2 border-t border-slate-700/30">
                <div className="h-2 w-full bg-slate-700/40 rounded-full animate-pulse"></div>
                <div className="h-2 w-full bg-slate-700/40 rounded-full animate-pulse"></div>
                <div className="h-2 w-3/4 bg-slate-700/40 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Footer de la tarjeta (Uso) */}
            <div className="mt-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-500 animate-pulse"></div>
              <div className="h-2 w-24 bg-slate-700/60 rounded-full"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Recursos_tecnologicos_aplicados;