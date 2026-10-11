import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, MessageSquareQuote, Star, ThumbsUp } from 'lucide-react';

const Evaluacion_y_retroalimentacion = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className="w-full space-y-10"
    >
      {/* Sección 1: Autoevaluación del Desempeño */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-[2rem] p-8 md:p-12 backdrop-blur-md shadow-2xl">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-4 bg-violet-500/20 rounded-2xl border border-violet-500/30">
            <UserCheck className="text-violet-400" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Autoevaluación Docente</h2>
            <p className="text-slate-400 mt-1">Análisis de competencias y desempeño en el aula</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Gráfico/Barras de Competencias */}
          <div className="space-y-6">
            {[
              { color: 'from-teal-400 to-teal-600', width: 'w-[85%]' },
              { color: 'from-fuchsia-400 to-fuchsia-600', width: 'w-[70%]' },
              { color: 'from-violet-400 to-violet-600', width: 'w-[90%]' }
            ].map((bar, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-3 w-32 bg-slate-700/50 rounded-full animate-pulse"></div>
                  <div className="h-3 w-8 bg-slate-700/50 rounded-full animate-pulse"></div>
                </div>
                <div className="h-4 w-full bg-slate-900/80 rounded-full overflow-hidden border border-slate-700/50">
                  <div className={`h-full bg-gradient-to-r ${bar.color} ${bar.width} rounded-full animate-pulse opacity-80`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen Reflexivo Skeleton */}
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
            <div className="h-4 w-40 bg-slate-700/60 rounded-full mb-6"></div>
            <div className="space-y-3">
              <div className="h-3 w-full bg-slate-700/40 rounded-full animate-pulse"></div>
              <div className="h-3 w-full bg-slate-700/40 rounded-full animate-pulse"></div>
              <div className="h-3 w-5/6 bg-slate-700/40 rounded-full animate-pulse"></div>
              <div className="h-3 w-4/5 bg-slate-700/40 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección 2: Comentarios y Retroalimentación */}
      <div>
        <div className="flex items-center gap-3 mb-6 pl-2">
          <MessageSquareQuote className="text-fuchsia-400" size={28} />
          <h3 className="text-2xl font-bold text-white">Retroalimentación Recibida</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((item) => (
            <div key={item} className="bg-slate-800/30 border border-slate-700/40 rounded-2xl p-8 relative overflow-hidden group">
              {/* Decoración de fondo */}
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <ThumbsUp size={64} />
              </div>
              
              {/* Header del comentario (Avatar + Estrellas) */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-slate-700/50 rounded-full animate-pulse border-2 border-slate-600"></div>
                <div>
                  <div className="h-4 w-28 bg-slate-700/50 rounded-full animate-pulse mb-2"></div>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(star => <Star key={star} size={14} className="text-slate-600" />)}
                  </div>
                </div>
              </div>

              {/* Cuerpo del comentario */}
              <div className="space-y-3 relative z-10">
                <div className="h-3 w-full bg-slate-700/30 rounded-full animate-pulse"></div>
                <div className="h-3 w-full bg-slate-700/30 rounded-full animate-pulse"></div>
                <div className="h-3 w-2/3 bg-slate-700/30 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Evaluacion_y_retroalimentacion;