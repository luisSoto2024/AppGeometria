
import React from 'react';

interface Lesson2ConceptualizeProps {
  onBack: () => void;
  onNext: () => void;
}

const Lesson2Conceptualize: React.FC<Lesson2ConceptualizeProps> = ({ onBack, onNext }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased selection:bg-primary selection:text-black max-w-md mx-auto min-h-screen relative flex flex-col overflow-x-hidden">
      <header className="sticky top-0 z-50 w-full bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-black/5 dark:border-white/5 transition-colors duration-300">
        <div className="flex items-center p-4 pb-2 justify-between">
          <button 
            onClick={onBack}
            className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-slate-800 dark:text-white"
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <h2 className="text-slate-800 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Módulo 2: Conceptos</h2>
        </div>
        <div className="flex w-full flex-row items-center justify-center gap-2 pb-4 pt-1">
          <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-white/20"></div>
          <div className="h-1.5 w-8 rounded-full bg-primary shadow-[0_0_10px_rgba(19,236,91,0.4)]"></div> 
          <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-white/20"></div>
        </div>
      </header>

      <main className="flex-1 flex flex-col px-4 pt-6 gap-6 pb-40">
        <div className="space-y-1">
          <h1 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight">Igualdad y Parecido</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Aprende la diferencia entre figuras que son exactamente iguales y aquellas que solo tienen la misma forma.</p>
        </div>

        {/* Interactive Comparison */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-white/5 flex flex-col items-center gap-3">
            <div className="flex items-center justify-center gap-2">
               <div className="size-10 bg-primary/20 border border-primary text-primary flex items-center justify-center rounded-lg">
                 <span className="material-symbols-outlined">change_history</span>
               </div>
               <div className="size-10 bg-primary/20 border border-primary text-primary flex items-center justify-center rounded-lg">
                 <span className="material-symbols-outlined">change_history</span>
               </div>
            </div>
            <h3 className="font-bold text-sm text-primary uppercase">Congruencia</h3>
            <p className="text-[10px] text-center text-slate-500">Mismo tamaño y misma forma. Son gemelos perfectos.</p>
          </div>

          <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-white/5 flex flex-col items-center gap-3">
            <div className="flex items-end justify-center gap-2">
               <div className="size-6 bg-blue-500/20 border border-blue-500 text-blue-400 flex items-center justify-center rounded-sm">
                 <span className="material-symbols-outlined text-xs">change_history</span>
               </div>
               <div className="size-12 bg-blue-500/20 border border-blue-500 text-blue-400 flex items-center justify-center rounded-lg">
                 <span className="material-symbols-outlined">change_history</span>
               </div>
            </div>
            <h3 className="font-bold text-sm text-blue-400 uppercase">Semejanza</h3>
            <p className="text-[10px] text-center text-slate-500">Misma forma, pero tamaño escalado (Zoom).</p>
          </div>
        </div>

        <div className="flex flex-col bg-white dark:bg-surface-dark rounded-xl p-5 shadow-sm ring-1 ring-black/5 dark:ring-white/5 gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>square_foot</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Proporcionalidad</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
            Si duplicas la base de un triángulo, debes duplicar su altura para mantener la <span className="text-primary font-semibold">proporción</span>. De lo contrario, la figura se "deforma".
          </p>
          <div className="relative h-32 w-full bg-background-light dark:bg-black/20 rounded-lg border border-dashed border-slate-300 dark:border-white/10 flex items-center justify-center overflow-hidden">
             <div className="flex items-end gap-12">
                <svg className="w-16 h-16 text-primary" viewBox="0 0 100 100">
                  <path d="M 0 100 L 50 0 L 100 100 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="4"></path>
                </svg>
                <div className="flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-white/20">arrow_forward</span>
                  <span className="text-[10px] text-white/40 font-mono">x2</span>
                </div>
                <svg className="w-24 h-24 text-primary" viewBox="0 0 100 100">
                  <path d="M 0 100 L 50 0 L 100 100 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="4"></path>
                </svg>
             </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark dark:to-transparent z-40 pb-8 pt-12">
        <div className="flex flex-col gap-3 max-w-md mx-auto">
          <button 
            onClick={onNext}
            className="w-full bg-primary hover:bg-[#10d450] text-black font-bold text-lg py-4 rounded-xl shadow-[0_4px_20px_rgba(19,236,91,0.3)] hover:shadow-[0_4px_25px_rgba(19,236,91,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            Completar Módulo
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">stars</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lesson2Conceptualize;
