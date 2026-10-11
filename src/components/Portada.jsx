import React from 'react';
import { motion } from 'framer-motion';
import { Quote, GraduationCap, MapPin, Book } from 'lucide-react';

const Portada = () => {
  return (
    <section id="portada" className="min-h-screen flex items-center justify-center pt-32 pb-20 px-6">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Columna Izquierda: Información (Skeletons) */}
        <div className="order-2 md:order-1 flex flex-col space-y-8">
          
          {/* Skeleton para "Nombre de la asignatura y docente tutor" */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-2">
              <Book className="text-fuchsia-400" size={20} />
              <div className="h-4 w-48 bg-slate-700/50 rounded-full animate-pulse"></div>
            </div>
            <div className="h-3 w-64 bg-slate-800 rounded-full animate-pulse ml-8"></div>
          </motion.div>
          
          {/* Skeleton para "Nombre completo del estudiante" */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="h-12 w-3/4 bg-slate-700/80 rounded-xl animate-pulse mb-4"></div>
            <div className="h-12 w-1/2 bg-slate-700/80 rounded-xl animate-pulse"></div>
          </motion.div>
          
          {/* Skeleton para "Institución educativa donde realiza la práctica" */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex items-center gap-3 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50 w-max">
            <MapPin className="text-teal-400" size={24} />
            <div className="space-y-2">
              <div className="h-3 w-32 bg-slate-600/50 rounded-full animate-pulse"></div>
              <div className="h-2 w-24 bg-slate-700/50 rounded-full animate-pulse"></div>
            </div>
          </motion.div>

          {/* Skeleton para "Frase motivacional" */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="relative mt-8 pl-8 border-l-4 border-fuchsia-500/50">
            <Quote className="absolute -left-3 -top-3 text-fuchsia-500/30" size={32} />
            <div className="space-y-3">
              <div className="h-4 w-full max-w-md bg-slate-700/40 rounded-full animate-pulse"></div>
              <div className="h-4 w-5/6 max-w-sm bg-slate-700/40 rounded-full animate-pulse"></div>
              <div className="h-4 w-2/3 max-w-xs bg-slate-700/40 rounded-full animate-pulse"></div>
            </div>
          </motion.div>

        </div>

        {/* Columna Derecha: Fotografía Profesional (Skeleton) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
          className="order-1 md:order-2 flex justify-center relative"
        >
          {/* Decoración de fondo de la foto */}
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-fuchsia-500/20 rounded-[2rem] transform rotate-6 scale-105 blur-md"></div>
          
          {/* Placeholder de la Imagen */}
          <div className="relative w-full max-w-sm aspect-[3/4] bg-slate-800/80 rounded-[2rem] border border-slate-600/50 shadow-2xl flex flex-col items-center justify-center overflow-hidden animate-pulse">
            <GraduationCap className="text-slate-600 mb-4" size={64} />
            <div className="h-4 w-32 bg-slate-700/50 rounded-full"></div>
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Portada;