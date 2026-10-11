import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Target, Calendar, Image as ImageIcon, BookOpen, Sparkles } from 'lucide-react';

// Recibimos las props de App.jsx
const Navbar = ({ activeTab, setActiveTab }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', icon: User, id: 'inicio' },
    { name: 'Contexto', icon: Target, id: 'contexto' },
    { name: 'Planificación', icon: Calendar, id: 'planificacion' },
    { name: 'Práctica', icon: ImageIcon, id: 'practica' },
    { name: 'Evaluación', icon: BookOpen, id: 'evaluacion' },
    { name: 'Anexos', icon: Sparkles, id: 'anexos' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 flex justify-center mt-4 ${scrolled ? 'px-4' : 'px-6'}`}
    >
      <div className={`flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'w-full max-w-5xl bg-slate-800/80 backdrop-blur-xl shadow-lg shadow-black/40 rounded-full px-6 py-3 border border-slate-700/50'
                   : 'w-full max-w-7xl bg-transparent py-4'
        }`}
      >
        <div className="font-bold text-xl tracking-widest text-slate-100 flex items-center gap-2">
          <BookOpen className="text-fuchsia-500" size={24} />
          PORTAFOLIO<span className="text-teal-400">.</span>
        </div>

        <ul className="hidden lg:flex gap-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <button 
                onClick={() => {
                  setActiveTab(link.id);
                  window.scrollTo(0, 0); // Sube al inicio al cambiar de pestaña
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === link.id 
                    ? 'bg-slate-700/80 text-teal-400 shadow-md border border-slate-600/50' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <link.icon size={16} />
                {link.name}
              </button>
            </li>
          ))}
        </ul>

        <button className="hidden md:block bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-400 hover:to-fuchsia-400 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-lg shadow-fuchsia-500/20">
          Descargar PDF
        </button>
        
        <button className="lg:hidden text-slate-300 hover:text-white text-2xl">☰</button>
      </div>
    </motion.nav>
  );
};

export default Navbar;