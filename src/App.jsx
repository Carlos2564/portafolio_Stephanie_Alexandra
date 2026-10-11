import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Target, Map, Calendar, PieChart, Image as ImageIcon, FileText, BookOpen, MessageSquareQuote, Lightbulb, Laptop, Star } from 'lucide-react'

// Componentes
import Portada from './components/Portada'
import Objetivos from './components/Objetivos'
import Contexto_educativo from './components/Contexto_educativo'
import Planeacion_y_organizacion from './components/Planeacion_y_organizacion'
import Diagnostico_educativo from './components/Diagnostico_educativo'
import Evidencias_practica_docente from './components/Evidencias_practica_docente'
import Planificaciones_de_clases from './components/Planificaciones_de_clases'
import Diario_reflexivo_semanal from './components/Diario_reflexivo_semanal'
import Evaluacion_y_retroalimentacion from './components/Evaluacion_y_retroalimentacion'
import Propuesta_de_mejora from './components/Propuesta_de_mejora'
import Recursos_tecnologicos_aplicados from './components/Recursos_tecnologicos_aplicados'
import Experiencias_significativas from './components/Experiencias_significativas'

function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  
  // Estados para las sub-pestañas de cada bloque
  const [subTabContexto, setSubTabContexto] = useState('objetivos');
  const [subTabPlanificacion, setSubTabPlanificacion] = useState('planeacion');
  const [subTabPractica, setSubTabPractica] = useState('evidencias');
  const [subTabEvaluacion, setSubTabEvaluacion] = useState('diario');
  const [subTabAnexos, setSubTabAnexos] = useState('propuesta');

  // Función genérica para renderizar los menús de sub-pestañas
  const renderSubMenu = (tabs, active, setActive) => (
    <div className="flex justify-center mb-10">
      <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 p-2 rounded-2xl flex flex-wrap justify-center gap-2 shadow-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              active === tab.id 
                ? 'bg-gradient-to-r from-teal-500/20 to-fuchsia-500/20 text-teal-400 border border-teal-500/30 shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 border border-transparent'
            }`}
          >
            <tab.icon size={18} />
            <span className="hidden sm:inline">{tab.name}</span>
            <span className="sm:hidden">{tab.shortName || tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'inicio':
        return <Portada />;
        
      case 'contexto':
        return (
          <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
            {renderSubMenu([
              { id: 'objetivos', name: 'Objetivos', icon: Target },
              { id: 'contexto', name: 'Contexto Educativo', icon: Map, shortName: 'Contexto' }
            ], subTabContexto, setSubTabContexto)}
            {subTabContexto === 'objetivos' ? <Objetivos /> : <Contexto_educativo />}
          </div>
        );
        
      case 'planificacion':
        return (
          <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
            {renderSubMenu([
              { id: 'planeacion', name: 'Planeación y Org.', icon: Calendar, shortName: 'Planeación' },
              { id: 'diagnostico', name: 'Diagnóstico', icon: PieChart }
            ], subTabPlanificacion, setSubTabPlanificacion)}
            {subTabPlanificacion === 'planeacion' ? <Planeacion_y_organizacion /> : <Diagnostico_educativo />}
          </div>
        );
        
      case 'practica':
        return (
          <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
            {renderSubMenu([
              { id: 'evidencias', name: 'Evidencias', icon: ImageIcon },
              { id: 'planificaciones', name: 'Planificación Clases', icon: FileText, shortName: 'Planes' }
            ], subTabPractica, setSubTabPractica)}
            {subTabPractica === 'evidencias' ? <Evidencias_practica_docente /> : <Planificaciones_de_clases />}
          </div>
        );
        
      case 'evaluacion':
        return (
          <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
            {renderSubMenu([
              { id: 'diario', name: 'Diario Reflexivo', icon: BookOpen, shortName: 'Diario' },
              { id: 'retroalimentacion', name: 'Retroalimentación', icon: MessageSquareQuote, shortName: 'Feedback' }
            ], subTabEvaluacion, setSubTabEvaluacion)}
            {subTabEvaluacion === 'diario' ? <Diario_reflexivo_semanal /> : <Evaluacion_y_retroalimentacion />}
          </div>
        );
        
      case 'anexos':
        return (
          <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
            {/* Esta pestaña tiene 3 sub-opciones, así que el menú es un poco más largo */}
            {renderSubMenu([
              { id: 'propuesta', name: 'Propuesta Mejora', icon: Lightbulb, shortName: 'Mejora' },
              { id: 'recursos', name: 'Recursos Tech', icon: Laptop, shortName: 'Tech' },
              { id: 'experiencias', name: 'Experiencias', icon: Star }
            ], subTabAnexos, setSubTabAnexos)}
            
            {/* Renderizado condicional de las 3 opciones */}
            {subTabAnexos === 'propuesta' && <Propuesta_de_mejora />}
            {subTabAnexos === 'recursos' && <Recursos_tecnologicos_aplicados />}
            {subTabAnexos === 'experiencias' && <Experiencias_significativas />}
          </div>
        );

      default:
        return <Portada />;
    }
  };

  return (
    <main className="relative min-h-screen bg-slate-900 text-slate-100 font-sans overflow-x-hidden">
      {/* Luces de fondo fijas generales */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-teal-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed top-[40%] left-[40%] w-[30vw] h-[30vw] bg-fuchsia-500/10 blur-[100px] rounded-full pointer-events-none" />

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="relative z-10 min-h-screen">
        {renderContent()}
      </div>
    </main>
  )
}

export default App