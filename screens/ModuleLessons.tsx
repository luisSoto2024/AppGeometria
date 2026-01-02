
import React from 'react';
import { Screen, UserProgress } from '../types';

interface ModuleLessonsProps {
  user: UserProgress;
  onBack: () => void;
  onStartLesson: () => void;
  onStartLesson2: () => void;
  navigate: (screen: Screen) => void;
}

const ModuleLessons: React.FC<ModuleLessonsProps> = ({ user, onBack, onStartLesson, onStartLesson2, navigate }) => {
  const isLesson1Complete = user.completedModules.includes('lesson1');

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display text-slate-900 dark:text-white pb-24 max-w-md mx-auto relative">
      {/* Top App Bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-white/5">
        <button 
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined regular text-slate-900 dark:text-white">arrow_back</span>
        </button>
        <h2 className="text-base font-bold tracking-wide uppercase text-slate-500 dark:text-secondary-text">Módulo 1</h2>
        <div className="flex items-center gap-1.5 bg-surface-light dark:bg-surface-dark px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 shadow-sm">
          <span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
          <span className="text-sm font-bold text-slate-900 dark:text-primary">{user.xp} XP</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-5 pt-6 pb-2">
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-slate-900 dark:text-white mb-2">
          Figuras y Propiedades
        </h1>
        <p className="text-slate-600 dark:text-secondary-text text-sm font-light mb-6">
          Explora los fundamentos de la geometría analítica a través de formas, líneas y ángulos.
        </p>
        
        {/* Module Progress */}
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-slate-700 dark:text-white">Progreso del módulo</span>
            <span className="text-sm font-bold text-primary">{isLesson1Complete ? '75%' : '45%'}</span>
          </div>
          <div className="h-3 w-full bg-gray-200 dark:bg-[#1f3a29] rounded-full overflow-hidden">
            <div className="h-full bg-primary shadow-[0_0_10px_rgba(19,236,91,0.4)] rounded-full transition-all duration-500" style={{ width: isLesson1Complete ? '75%' : '45%' }}></div>
          </div>
        </div>
      </div>

      {/* Lesson List */}
      <div className="flex flex-col px-4 gap-4 mt-2">
        {/* Lesson 1: Completed or In Progress */}
        <div 
          onClick={onStartLesson}
          className={`relative flex flex-col gap-4 bg-white dark:bg-surface-dark p-5 rounded-xl border-l-4 shadow-md dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] border-y border-r border-y-gray-200 border-r-gray-200 dark:border-y-white/5 dark:border-r-white/5 cursor-pointer transition-all ${isLesson1Complete ? 'border-l-primary/40' : 'border-l-primary'}`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4">
              <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl text-background-dark shrink-0 shadow-lg ${isLesson1Complete ? 'bg-primary/40' : 'bg-primary shadow-primary/30'}`}>
                <span className="material-symbols-outlined text-[28px]">{isLesson1Complete ? 'task_alt' : 'play_circle'}</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">1. Conceptos Básicos</h3>
                <p className="text-slate-500 dark:text-secondary-text text-sm mt-1">Puntos, vértices, segmentos y ángulos</p>
              </div>
            </div>
            {isLesson1Complete && (
              <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-bold uppercase tracking-wider">Completada</span>
            )}
          </div>
          <div className="pl-16">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-primary font-medium">{isLesson1Complete ? 'Repasar Lección' : 'En curso'}</span>
              <span className="text-slate-400 dark:text-secondary-text">{isLesson1Complete ? '6/6 Pasos' : '1/6 Pasos'}</span>
            </div>
            <div className="h-2 w-full bg-gray-200 dark:bg-[#1f3a29] rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: isLesson1Complete ? '100%' : '50%' }}></div>
            </div>
          </div>
        </div>

        {/* Lesson 2: Unlocked or Locked */}
        <div 
          onClick={isLesson1Complete ? onStartLesson2 : undefined}
          className={`relative flex flex-col gap-4 p-5 rounded-xl border-l-4 shadow-md transition-all ${
            isLesson1Complete 
              ? 'bg-white dark:bg-surface-dark border-l-primary border-y border-r border-y-gray-200 border-r-gray-200 dark:border-y-white/5 dark:border-r-white/5 cursor-pointer opacity-100' 
              : 'bg-gray-50 dark:bg-[#131f18] border-l-gray-300 dark:border-l-white/10 opacity-70 cursor-not-allowed'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4">
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${
                isLesson1Complete ? 'bg-primary text-background-dark shadow-lg shadow-primary/30' : 'bg-gray-200 dark:bg-[#1f3a29] text-gray-400'
              }`}>
                <span className="material-symbols-outlined text-[24px]">{isLesson1Complete ? 'play_arrow' : 'lock'}</span>
              </div>
              <div className="flex flex-col">
                <h3 className={`text-lg font-bold leading-tight ${isLesson1Complete ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-gray-500'}`}>2. Triángulos y sus tipos</h3>
                <p className="text-slate-400 dark:text-gray-500 text-sm mt-1">Clasificación y propiedades</p>
              </div>
            </div>
          </div>
          {isLesson1Complete && (
            <div className="pl-16">
              <button className="w-full bg-primary hover:bg-primary-dark text-background-dark font-bold py-2.5 px-4 rounded-lg text-sm transition-colors shadow-lg shadow-primary/20">
                Continuar
              </button>
            </div>
          )}
        </div>

        {/* Lesson 3: Locked */}
        <div className="flex flex-col gap-3 bg-gray-50 dark:bg-[#131f18] p-5 rounded-xl border border-gray-200 dark:border-white/5 opacity-80 cursor-not-allowed">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4 opacity-60">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-200 dark:bg-[#1f3a29] text-gray-400 dark:text-gray-500 shrink-0">
                <span className="material-symbols-outlined regular text-[24px]">lock</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-slate-700 dark:text-gray-300 leading-tight">3. Cuadriláteros</h3>
                <p className="text-slate-400 dark:text-gray-500 text-sm mt-1">Cuadrados, rectángulos y rombos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson 4: Quiz (Locked) */}
        <div className="flex flex-col gap-3 bg-gray-50 dark:bg-[#131f18] p-5 rounded-xl border border-gray-200 dark:border-white/5 opacity-80 mb-4 cursor-not-allowed">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4 opacity-60">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-200 dark:bg-[#1f3a29] text-gray-400 dark:text-gray-500 shrink-0">
                <span className="material-symbols-outlined regular text-[24px]">trophy</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-slate-700 dark:text-gray-300 leading-tight">Quiz del Módulo</h3>
                <p className="text-slate-400 dark:text-gray-500 text-sm mt-1">¡Pon a prueba tu conocimiento!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-surface-dark/90 backdrop-blur-lg border-t border-white/5 pb-6 pt-2 z-50">
        <ul className="flex justify-around items-center w-full max-w-md mx-auto">
          <li className="flex-1">
            <button 
              onClick={() => navigate(Screen.Dashboard)}
              className="flex flex-col items-center justify-center w-full gap-1 p-2 text-primary"
            >
              <span className="material-symbols-outlined filled text-[26px]" style={{fontVariationSettings: "'FILL' 1"}}>home</span>
              <span className="text-[10px] font-medium">Inicio</span>
            </button>
          </li>
          <li className="flex-1">
            <button className="flex flex-col items-center justify-center w-full gap-1 p-2 text-text-secondary hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[26px]">leaderboard</span>
              <span className="text-[10px] font-medium">Ranking</span>
            </button>
          </li>
          <li className="flex-1">
            <div className="relative -top-6">
              <button 
                onClick={onStartLesson}
                className="flex items-center justify-center h-14 w-14 rounded-full bg-primary text-background-dark shadow-[0_0_15px_rgba(19,236,91,0.5)] border-4 border-background-dark transform transition-transform active:scale-95"
              >
                <span className="material-symbols-outlined text-[32px] filled" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
              </button>
            </div>
          </li>
          <li className="flex-1">
            <button 
              onClick={() => navigate(Screen.Progress)}
              className="flex flex-col items-center justify-center w-full gap-1 p-2 text-text-secondary hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[26px]">school</span>
              <span className="text-[10px] font-medium">Logros</span>
            </button>
          </li>
          <li className="flex-1">
            <button 
              onClick={() => navigate(Screen.Profile)}
              className="flex flex-col items-center justify-center w-full gap-1 p-2 text-text-secondary hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[26px]">person</span>
              <span className="text-[10px] font-medium">Perfil</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ModuleLessons;
