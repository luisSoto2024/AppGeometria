
import React from 'react';

interface LessonConceptualizeProps {
  onBack: () => void;
  onNext: () => void;
}

const LessonConceptualize: React.FC<LessonConceptualizeProps> = ({ onBack, onNext }) => {
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
          <h2 className="text-slate-800 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Lección 1</h2>
        </div>
        <div className="flex w-full flex-row items-center justify-center gap-2 pb-4 pt-1">
          <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-white/20"></div>
          <div className="h-1.5 w-8 rounded-full bg-primary shadow-[0_0_10px_rgba(19,236,91,0.4)]"></div> 
          <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-white/20"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-white/20"></div>
        </div>
      </header>

      <main className="flex-1 flex flex-col px-4 pt-6 gap-6 pb-40">
        <div className="space-y-1">
          <h1 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight">Elementos Básicos</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Comprende los bloques fundamentales de la geometría: puntos, segmentos, vértices y ángulos.</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="group relative flex items-center justify-center bg-slate-200 dark:bg-surface-dark rounded-xl overflow-hidden aspect-video shadow-lg ring-1 ring-black/5 dark:ring-white/5" style={{backgroundImage: 'linear-gradient(rgba(16, 34, 22, 0.3), rgba(16, 34, 22, 0.7)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDBSSIIC17bEO_glQ1m-zCvzEXzIpIr3mEFfw5kN6_hFQnf49eQTMLT2Do86nZNGx1JT5tq3oJwIUAXPRVWjkDXT8D-itng0RPHkSQlIFRV59KEK8nSr7d2y2pCw7S2MPRPwjN4XBDWXcCFYIPPMmVPcBro46lm3mD0iPbm1GDGMBASg8iAad9T9ToyF6MM-qHSLk-cetuMyu7g239MHuMgcEddWZyBPvZt0EHdvxDHDKHTd-DcMVxQXRU_lZvrpeNrg82oBTjMW1E")', backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <button className="relative z-10 flex shrink-0 items-center justify-center rounded-full size-16 bg-primary text-black shadow-[0_0_20px_rgba(19,236,91,0.5)] hover:scale-105 active:scale-95 transition-transform">
              <span className="material-symbols-outlined" style={{fontSize: '32px', fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
            </button>
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-white">
              2:45
            </div>
          </div>
          <div className="flex items-start justify-between px-1">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white text-lg">Introducción a los Elementos</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Video explicativo • 3 min</p>
            </div>
            <button className="text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">download</span>
            </button>
          </div>
        </div>

        <div className="h-px w-full bg-slate-200 dark:bg-white/10 my-2"></div>
        <h2 className="text-slate-900 dark:text-white tracking-tight text-[24px] font-bold leading-tight">Definiciones Clave</h2>
        
        {/* Definition: Point */}
        <div className="flex flex-col bg-white dark:bg-surface-dark rounded-xl p-5 shadow-sm ring-1 ring-black/5 dark:ring-white/5 gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>fiber_manual_record</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">El Punto</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
            Es la unidad más simple. Indica una <span className="text-primary font-semibold">posición</span> en el espacio y se nombra con una letra mayúscula (ej. A, B, P).
          </p>
          <div className="relative h-24 w-full bg-background-light dark:bg-black/20 rounded-lg border border-dashed border-slate-300 dark:border-white/10 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#888 1px, transparent 1px)', backgroundSize: '16px 16px'}}></div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
              <div className="size-3 bg-primary rounded-full shadow-[0_0_10px_#13ec5b]"></div>
              <span className="absolute -top-6 -right-6 text-primary font-bold font-mono text-xs">P</span>
            </div>
          </div>
        </div>

        {/* Definition: Segment */}
        <div className="flex flex-col bg-white dark:bg-surface-dark rounded-xl p-5 shadow-sm ring-1 ring-black/5 dark:ring-white/5 gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined">maximize</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">El Segmento</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
            Parte de una recta delimitada por dos puntos extremos. A diferencia de una recta infinita, el segmento tiene una <span className="text-primary font-semibold">longitud medible</span>.
          </p>
          <div className="relative h-24 w-full bg-background-light dark:bg-black/20 rounded-lg border border-slate-300 dark:border-white/10 flex items-center justify-center overflow-hidden">
            <div className="relative w-2/3 flex items-center">
              <div className="w-full h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(19,236,91,0.4)]"></div>
              <div className="absolute left-0 size-3 bg-white dark:bg-surface-dark border-2 border-primary rounded-full transform -translate-x-1.5"></div>
              <span className="absolute left-0 -top-6 text-xs text-slate-500 font-bold -translate-x-1.5">A</span>
              <div className="absolute right-0 size-3 bg-white dark:bg-surface-dark border-2 border-primary rounded-full transform translate-x-1.5"></div>
              <span className="absolute right-0 -top-6 text-xs text-slate-500 font-bold translate-x-1.5">B</span>
            </div>
          </div>
        </div>

        {/* Definition: Vertex */}
        <div className="flex flex-col bg-white dark:bg-surface-dark rounded-xl p-5 shadow-sm ring-1 ring-black/5 dark:ring-white/5 gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined">polyline</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">El Vértice</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
            Es el punto común donde se unen los extremos de dos segmentos. Se conoce comúnmente como la <span className="text-primary font-semibold">esquina</span> de una figura.
          </p>
          <div className="relative h-24 w-full bg-background-light dark:bg-black/20 rounded-lg border border-slate-300 dark:border-white/10 flex items-center justify-center overflow-hidden">
            <div className="relative size-16 flex items-end justify-center pb-2">
              <div className="absolute bottom-2 left-1/2 h-14 w-1 bg-slate-400 dark:bg-white/20 origin-bottom transform -rotate-[30deg] rounded-full"></div>
              <div className="absolute bottom-2 left-1/2 h-14 w-1 bg-slate-400 dark:bg-white/20 origin-bottom transform rotate-[30deg] rounded-full"></div>
              <div className="absolute bottom-2 left-1/2 size-4 bg-primary rounded-full shadow-[0_0_12px_#13ec5b] z-10 transform -translate-x-1/2 translate-y-1/2 border-2 border-white dark:border-surface-dark"></div>
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs text-primary font-bold">Vértice</span>
            </div>
          </div>
        </div>

        {/* Definition: Angle */}
        <div className="flex flex-col bg-white dark:bg-surface-dark rounded-xl p-5 shadow-sm ring-1 ring-black/5 dark:ring-white/5 gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined">architecture</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">El Ángulo</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
            La abertura formada por dos rayos (lados) que comparten un mismo vértice. Su medida se expresa en <span className="text-primary font-semibold">grados (°)</span>.
          </p>
          <div className="relative h-28 w-full bg-background-light dark:bg-black/20 rounded-lg border border-slate-300 dark:border-white/10 flex items-center justify-center overflow-hidden">
            <div className="relative w-24 h-24 flex items-end pl-6 pb-6">
              <div className="absolute bottom-6 left-6 w-16 h-0.5 bg-slate-500 dark:bg-white/40"></div>
              <div className="absolute bottom-6 left-6 w-16 h-0.5 bg-slate-500 dark:bg-white/40 origin-left transform -rotate-45"></div>
              <div className="absolute bottom-6 left-6 w-8 h-8 rounded-tr-full border-t-2 border-r-2 border-primary opacity-80"></div>
              <div className="absolute bottom-9 left-10 text-[10px] text-primary font-bold bg-background-light dark:bg-surface-dark px-1 rounded">45°</div>
              <div className="absolute bottom-6 left-6 size-2 bg-slate-800 dark:bg-white rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
            </div>
          </div>
        </div>

        <div className="py-4 text-center">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            "La geometría es el arte de pensar bien."
          </p>
          <div className="text-xs text-slate-400 mt-1">— Henri Poincaré</div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark dark:to-transparent z-40 pb-8 pt-12">
        <div className="flex flex-col gap-3 max-w-md mx-auto">
          <p className="text-center text-xs text-slate-500 dark:text-slate-400">¡Conceptos claros! Avancemos.</p>
          <button 
            onClick={onNext}
            className="w-full bg-primary hover:bg-[#10d450] text-black font-bold text-lg py-4 rounded-xl shadow-[0_4px_20px_rgba(19,236,91,0.3)] hover:shadow-[0_4px_25px_rgba(19,236,91,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            Ir a Analiza
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonConceptualize;
