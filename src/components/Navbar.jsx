import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Target, Calendar, Image as ImageIcon, BookOpen, Sparkles, Menu, X, Download } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para el menú móvil

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

  // Función para cambiar de pestaña y cerrar el menú en móvil
  const handleTabChange = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <motion.nav
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 flex justify-center mt-4 ${scrolled ? 'px-4' : 'px-6'}`}
    >
      <div className={`flex items-center justify-between transition-all duration-500 relative z-50 ${
          scrolled ? 'w-full max-w-5xl bg-slate-800/80 backdrop-blur-xl shadow-lg shadow-black/40 rounded-full px-6 py-3 border border-slate-700/50'
                   : 'w-full max-w-7xl bg-transparent py-4'
        }`}
      >
        {/* Logo */}
        <div className="font-bold text-xl tracking-widest text-slate-100 flex items-center gap-2">
          <BookOpen className="text-fuchsia-500" size={24} />
          PORTAFOLIO<span className="text-teal-400">.</span>
        </div>

        {/* Enlaces versión Escritorio */}
        <ul className="hidden lg:flex gap-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <button 
                onClick={() => handleTabChange(link.id)}
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

        {/* Botón Descargar versión Escritorio */}
        <button className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-teal-500 to-fuchsia-500 hover:from-teal-400 hover:to-fuchsia-400 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-lg shadow-fuchsia-500/20">
          <Download size={16} />
          Descargar PDF
        </button>
        
        {/* Botón Menú Hamburguesa (Móvil) */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-slate-300 hover:text-white p-2"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú Desplegable versión Móvil */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full mt-4 px-4 lg:hidden"
          >
            <div className="bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-4 shadow-2xl flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleTabChange(link.id)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-base font-semibold transition-all ${
                    activeTab === link.id
                      ? 'bg-gradient-to-r from-teal-500/20 to-fuchsia-500/20 text-teal-400 border border-teal-500/30'
                      : 'text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  <link.icon size={20} />
                  {link.name}
                </button>
              ))}
              
              {/* Botón de descarga en móvil */}
              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-teal-500 to-fuchsia-500 text-white px-6 py-4 rounded-2xl text-base font-bold shadow-lg shadow-fuchsia-500/20">
                  <Download size={20} />
                  Descargar Documento PDF
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;