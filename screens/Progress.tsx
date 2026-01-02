
import React from 'react';
import { Screen, UserProgress } from '../types';

interface ProgressProps {
  user: UserProgress;
  navigate: (screen: Screen) => void;
}

const Progress: React.FC<ProgressProps> = ({ user, navigate }) => {
  return (
    <div className="bg-background-dark text-white font-display min-h-screen pb-24 max-w-md mx-auto">
      <header className="sticky top-0 z-20 bg-background-dark p-4 flex items-center justify-between border-b border-white/5">
         <button onClick={() => navigate(Screen.Dashboard)} className="p-2"><span className="material-symbols-outlined">arrow_back</span></button>
         <h1 className="text-lg font-bold">Mi Progreso</h1>
         <div className="w-10"></div>
      </header>

      <main className="p-4 space-y-6">
        <div className="grid grid-cols-2 gap-3">
           <div className="bg-surface-dark p-6 rounded-2xl text-center border border-white/5">
              <span className="material-symbols-outlined text-primary text-3xl">school</span>
              <p className="text-2xl font-bold mt-2">Nivel {user.level}</p>
              <p className="text-xs text-gray-500">Arquitecto de Figuras</p>
           </div>
           <div className="bg-surface-dark p-6 rounded-2xl text-center border border-white/5">
              <span className="material-symbols-outlined text-primary text-3xl">bolt</span>
              <p className="text-2xl font-bold mt-2">2,450 XP</p>
              <p className="text-xs text-gray-500">Puntos Totales</p>
           </div>
        </div>

        <div className="bg-surface-dark p-6 rounded-2xl border border-white/5 flex items-center justify-between">
           <div className="max-w-[60%]">
             <h3 className="font-bold text-lg">Progreso del Curso</h3>
             <p className="text-xs text-gray-500 mt-1">¡Casi a la mitad del contenido de 10º grado!</p>
           </div>
           <div className="relative size-20">
              <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                <circle className="text-white/10" cx="18" cy="18" fill="none" r="16" stroke="currentColor" strokeWidth="3"></circle>
                <circle className="text-primary" cx="18" cy="18" fill="none" r="16" stroke="currentColor" strokeDasharray="45, 100" strokeWidth="3"></circle>
              </svg>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold">45%</span>
           </div>
        </div>

        <section className="space-y-4">
           <h3 className="text-lg font-bold">Actividad Semanal</h3>
           <div className="bg-surface-dark p-4 rounded-2xl border border-white/5 h-32 flex items-end justify-between gap-1">
              {[20, 45, 80, 40, 55, 30, 25].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                   <div className="w-full bg-primary/20 rounded-sm" style={{height: `${h}%`}}>
                      <div className={`h-full bg-primary rounded-sm ${h > 70 ? 'shadow-[0_0_10px_#13ec5b]' : 'opacity-60'}`}></div>
                   </div>
                   <span className="text-[10px] text-gray-600">{'LMMJVSD'[i]}</span>
                </div>
              ))}
           </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold">Progreso por Módulo</h3>
          <div className="bg-surface-dark p-4 rounded-xl border border-white/5 space-y-4">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary"><span className="material-symbols-outlined">check_circle</span></div>
              <div className="flex-1">
                <p className="text-sm font-bold">Módulo 1: Figuras Geométricas</p>
                <div className="h-1.5 w-full bg-white/10 rounded-full mt-1"><div className="h-full bg-primary rounded-full w-full"></div></div>
              </div>
              <span className="text-primary font-bold text-xs">100%</span>
            </div>
            <button className="w-full py-2 bg-white/5 text-xs font-bold rounded-lg border border-white/5">Repasar Conceptos</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Progress;
