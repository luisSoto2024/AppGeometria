
import React from 'react';
import { UserProgress } from '../types';

interface LessonObserveProps {
  user: UserProgress;
  onBack: () => void;
  onNext: () => void;
}

const LessonObserve: React.FC<LessonObserveProps> = ({ user, onBack, onNext }) => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-200 dark:border-white/10">
        <button 
          onClick={onBack}
          className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_back</span>
        </button>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center truncate px-2">
          Lección 1: Conceptos Básicos
        </h2>
        <div className="flex items-center justify-end gap-1 px-2 py-1 bg-surface-dark/10 dark:bg-surface-dark rounded-full border border-gray-200 dark:border-white/5">
          <span className="material-symbols-outlined text-primary text-lg">bolt</span>
          <p className="text-primary text-sm font-bold leading-normal tracking-[0.015em] shrink-0">{user.xp}</p>
        </div>
      </header>

      {/* Progress Section */}
      <div className="flex flex-col gap-2 p-4 pt-2">
        <div className="flex gap-6 justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">visibility</span>
            <p className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wide">Fase: Observa</p>
          </div>
          <p className="text-text-secondary text-xs font-bold font-mono">1/5</p>
        </div>
        <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-surface-dark overflow-hidden">
          <div className="h-full rounded-full bg-primary shadow-[0_0_10px_rgba(19,236,91,0.5)]" style={{ width: '20%' }}></div>
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center px-4 pb-24 overflow-y-auto w-full">
        <div className="w-full pt-2 pb-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1">
            ¿Qué figuras ves aquí?
          </h1>
          <p className="text-text-secondary text-base font-normal">
            Identifica las formas geométricas fundamentales.
          </p>
        </div>

        {/* Main Interactive Card */}
        <div className="w-full relative group/card">
          <div className="flex flex-col items-stretch justify-start rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-surface-dark transition-transform duration-300">
            <div className="relative w-full aspect-[4/3] bg-gray-900 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
              <svg className="relative z-10 w-full h-full p-8" preserveAspectRatio="xMidYMid meet" viewBox="0 0 400 300">
                <g className="animate-float">
                  <path className="drop-shadow-[0_0_15px_rgba(19,236,91,0.5)]" d="M 100 220 L 160 100 L 220 220 Z" fill="rgba(19, 236, 91, 0.1)" stroke="#13ec5b" strokeLinejoin="round" strokeWidth="4"></path>
                  <circle cx="100" cy="220" fill="#13ec5b" r="4"></circle>
                  <circle cx="160" cy="100" fill="#13ec5b" r="4"></circle>
                  <circle cx="220" cy="220" fill="#13ec5b" r="4"></circle>
                </g>
                <g className="animate-float-delayed" style={{ animationDelay: '1s' }}>
                  <rect className="drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" fill="rgba(59, 130, 246, 0.1)" height="90" rx="4" stroke="#3b82f6" strokeWidth="4" transform="rotate(10 275 165)" width="90" x="230" y="120"></rect>
                </g>
                <g className="animate-float" style={{ animationDelay: '2s' }}>
                  <circle className="drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]" cx="200" cy="150" fill="rgba(249, 115, 22, 0.1)" r="35" stroke="#f97316" strokeWidth="4"></circle>
                </g>
              </svg>
              <div className="absolute bottom-4 right-4 flex gap-2 z-20">
                <button className="flex items-center justify-center size-10 rounded-full bg-black/40 backdrop-blur text-white hover:bg-primary hover:text-black transition-colors border border-white/20">
                  <span className="material-symbols-outlined text-[20px]">360</span>
                </button>
                <button className="flex items-center justify-center size-10 rounded-full bg-black/40 backdrop-blur text-white hover:bg-primary hover:text-black transition-colors border border-white/20">
                  <span className="material-symbols-outlined text-[20px]">zoom_in</span>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-5">
              <div className="flex items-start gap-3">
                <div className="shrink-0 size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-1">
                  <span className="material-symbols-outlined text-lg">category</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
                    Formas Fundamentales
                  </h3>
                  <p className="text-text-secondary text-sm font-normal leading-relaxed">
                    Observa las diferencias. El <strong>triángulo</strong> tiene 3 lados, el <strong>cuadrado</strong> tiene 4 lados iguales y el <strong>círculo</strong> es una curva continua sin esquinas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Grid Icons */}
        <div className="w-full mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-surface-dark/5 dark:bg-surface-dark border border-gray-200 dark:border-white/5 p-3 flex flex-col items-center text-center gap-2">
            <div className="w-full aspect-square rounded-lg bg-gray-100 dark:bg-black/30 flex items-center justify-center relative overflow-hidden group">
              <svg className="w-2/3 h-2/3 text-primary transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" x2="12" y1="9" y2="13"></line>
                <line x1="12" x2="12.01" y1="17" y2="17"></line>
              </svg>
            </div>
            <span className="text-xs font-medium text-text-secondary">Señales (Triángulos)</span>
          </div>
          <div className="rounded-xl bg-surface-dark/5 dark:bg-surface-dark border border-gray-200 dark:border-white/5 p-3 flex flex-col items-center text-center gap-2">
            <div className="w-full aspect-square rounded-lg bg-gray-100 dark:bg-black/30 flex items-center justify-center relative overflow-hidden group">
              <svg className="w-2/3 h-2/3 text-blue-400 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <rect height="18" rx="2" ry="2" width="18" x="3" y="3"></rect>
                <line x1="3" x2="21" y1="9" y2="9"></line>
                <line x1="9" x2="9" y1="21" y2="9"></line>
              </svg>
            </div>
            <span className="text-xs font-medium text-text-secondary">Ventanas (Cuadrados)</span>
          </div>
        </div>
      </main>

      {/* Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light/95 dark:via-background-dark/95 to-transparent z-30 flex justify-center max-w-md mx-auto">
        <button 
          onClick={onNext}
          className="w-full bg-primary hover:bg-green-400 active:scale-[0.98] transition-all text-background-dark font-bold text-lg h-14 rounded-xl shadow-[0_4px_14px_rgba(19,236,91,0.4)] flex items-center justify-center gap-2"
        >
          <span>¡Entendido!</span>
          <span className="material-symbols-outlined">check_circle</span>
        </button>
      </div>
    </div>
  );
};

export default LessonObserve;
