
import React from 'react';
import { UserProgress } from '../types';

interface ResultsProps {
  user: UserProgress;
  onContinue: () => void;
}

const Results: React.FC<ResultsProps> = ({ user, onContinue }) => {
  return (
    <div className="relative h-screen flex flex-col bg-background-dark text-white font-display max-w-md mx-auto overflow-hidden">
      <header className="p-4 flex items-center border-b border-white/5">
        <h2 className="text-lg font-bold flex-1 text-center">Resumen de Progresión</h2>
      </header>

      <main className="flex-1 overflow-y-auto pb-32 p-6 flex flex-col items-center no-scrollbar">
        <div className="relative size-48 flex items-center justify-center mb-6 mt-4">
          <svg className="size-full -rotate-90" viewBox="0 0 100 100">
            <circle className="text-white/10" cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" strokeWidth="8"></circle>
            <circle className="text-primary drop-shadow-[0_0_15px_rgba(19,236,91,0.4)]" cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" strokeDasharray="263.89" strokeDashoffset="26.38" strokeLinecap="round" strokeWidth="8"></circle>
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-5xl font-extrabold tracking-tighter">90%</span>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Precisión</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2">¡Maestro de Formas!</h1>
        <p className="text-center text-text-secondary text-sm leading-relaxed mb-8 px-4">
          Has completado el Módulo 1 con honores. Tu nivel de razonamiento geométrico ha subido.
        </p>

        <div className="grid grid-cols-3 gap-3 w-full mb-8">
          <div className="bg-surface-dark p-4 rounded-2xl flex flex-col items-center border border-white/5">
            <span className="material-symbols-outlined text-blue-400 filled" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span>
            <p className="text-[10px] font-bold text-gray-500 uppercase mt-1">Tiempo</p>
            <p className="text-lg font-bold">14m</p>
          </div>
          <div className="bg-surface-dark p-4 rounded-2xl flex flex-col items-center border border-white/5 ring-1 ring-primary/20">
            <span className="material-symbols-outlined text-primary filled" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            <p className="text-[10px] font-bold text-gray-500 uppercase mt-1">Gained XP</p>
            <p className="text-lg font-bold text-primary">+250</p>
          </div>
          <div className="bg-surface-dark p-4 rounded-2xl flex flex-col items-center border border-white/5">
            <span className="material-symbols-outlined text-orange-500 filled" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            <p className="text-[10px] font-bold text-gray-500 uppercase mt-1">Racha</p>
            <p className="text-lg font-bold">{user.streak}</p>
          </div>
        </div>

        <section className="w-full space-y-4 mb-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 px-1">Insignias Desbloqueadas</h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {[
              { icon: 'hexagon', label: 'Geómetra', color: 'text-primary' },
              { icon: 'verified', label: 'Analista', color: 'text-blue-400' },
              { icon: 'military_tech', label: 'Fundador', color: 'text-amber-400' },
            ].map((badge, i) => (
              <div key={i} className="shrink-0 flex flex-col items-center gap-2">
                <div className="size-20 rounded-full bg-surface-dark border-2 border-white/10 flex items-center justify-center relative group">
                  <div className={`absolute inset-0 bg-current opacity-5 rounded-full ${badge.color}`}></div>
                  <span className={`material-symbols-outlined text-4xl ${badge.color}`}>{badge.icon}</span>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">{badge.label}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="w-full bg-primary/5 border border-primary/20 rounded-2xl p-4 flex gap-4 items-start mb-6">
           <div className="bg-primary/20 p-2 rounded-xl text-primary"><span className="material-symbols-outlined">auto_awesome</span></div>
           <div>
             <h4 className="font-bold text-sm text-primary">Siguiente Paso Sugerido</h4>
             <p className="text-xs text-text-secondary leading-relaxed">Lección 2: Triángulos y sus tipos te espera para seguir subiendo de nivel.</p>
           </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full p-4 bg-background-dark/95 border-t border-white/5 z-20 flex flex-col gap-3 max-w-md mx-auto">
        <button onClick={onContinue} className="w-full py-4 bg-primary text-black font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(19,236,91,0.3)] flex items-center justify-center gap-2 hover:bg-[#10d450] transition-all">
          <span>Continuar Aventura</span>
          <span className="material-symbols-outlined font-bold">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default Results;
