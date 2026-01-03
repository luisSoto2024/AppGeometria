
import React from 'react';
import { Screen, UserProgress } from '../types';

interface RankingProps {
  user: UserProgress;
  navigate: (screen: Screen) => void;
}

const Ranking: React.FC<RankingProps> = ({ user, navigate }) => {
  // Mock data for the leaderboard (50 students simulation)
  const students = [
    { name: 'Ana Sofía', xp: 2450, avatar: 'A' },
    { name: 'Carlos Ruiz', xp: 2100, avatar: 'C' },
    { name: 'Elena Méndez', xp: 1950, avatar: 'E' },
    { name: 'Juan Pablo', xp: 1800, avatar: 'J' },
    { name: 'Valentina', xp: 1650, avatar: 'V' },
    { name: 'Samuel Toro', xp: 1500, avatar: 'S' },
    { name: 'María José', xp: 1420, avatar: 'M' },
    { name: 'Andrés Felipe', xp: 1300, avatar: 'A' },
    { name: 'Luisa Fernanda', xp: 1250, avatar: 'L' },
    { name: user.name, xp: user.xp, avatar: user.name.charAt(0).toUpperCase(), isUser: true },
  ].sort((a, b) => b.xp - a.xp);

  const userRank = students.findIndex(s => s.isUser) + 1;

  return (
    <div className="bg-background-dark text-white font-display min-h-screen pb-24 max-w-md mx-auto flex flex-col">
      <header className="sticky top-0 z-20 bg-background-dark/90 backdrop-blur-md p-4 flex items-center justify-between border-b border-white/5">
        <button onClick={() => navigate(Screen.Dashboard)} className="p-2"><span className="material-symbols-outlined">arrow_back</span></button>
        <h1 className="text-lg font-bold">Ranking Global</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 flex flex-col p-4">
        {/* Top 3 Podiums */}
        <div className="flex items-end justify-center gap-4 py-8 mb-4">
          <div className="flex flex-col items-center">
            <div className="size-14 rounded-full bg-slate-400 border-4 border-slate-500 flex items-center justify-center text-white font-bold text-xl relative">
              {students[1].avatar}
              <div className="absolute -top-6 text-slate-400"><span className="material-symbols-outlined text-2xl">workspace_premium</span></div>
            </div>
            <p className="text-[10px] font-bold mt-2 truncate w-16 text-center">{students[1].name}</p>
            <p className="text-[10px] text-primary font-bold">{students[1].xp} XP</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="size-20 rounded-full bg-yellow-500 border-4 border-yellow-600 flex items-center justify-center text-white font-bold text-3xl relative animate-bounce">
              {students[0].avatar}
              <div className="absolute -top-8 text-yellow-500"><span className="material-symbols-outlined text-4xl">crown</span></div>
            </div>
            <p className="text-[12px] font-bold mt-2 truncate w-20 text-center">{students[0].name}</p>
            <p className="text-[12px] text-primary font-bold">{students[0].xp} XP</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="size-14 rounded-full bg-orange-700 border-4 border-orange-800 flex items-center justify-center text-white font-bold text-xl relative">
              {students[2].avatar}
              <div className="absolute -top-6 text-orange-700"><span className="material-symbols-outlined text-2xl">workspace_premium</span></div>
            </div>
            <p className="text-[10px] font-bold mt-2 truncate w-16 text-center">{students[2].name}</p>
            <p className="text-[10px] text-primary font-bold">{students[2].xp} XP</p>
          </div>
        </div>

        {/* User's current rank banner */}
        <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl flex items-center justify-between mb-6 animate-in slide-in-from-bottom duration-500">
           <div className="flex items-center gap-4">
             <div className="size-10 bg-primary text-black rounded-full flex items-center justify-center font-bold text-lg">#{userRank}</div>
             <div>
               <p className="font-bold text-sm">Tu posición actual</p>
               <p className="text-[10px] text-primary uppercase font-bold tracking-widest">Sigue así, {user.name}!</p>
             </div>
           </div>
           <div className="text-right">
             <p className="text-lg font-bold text-primary">{user.xp}</p>
             <p className="text-[8px] text-white/50 uppercase font-bold">Puntos Totales</p>
           </div>
        </div>

        {/* Full List */}
        <div className="space-y-2">
          {students.map((student, idx) => (
            <div 
              key={idx} 
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${student.isUser ? 'bg-primary/5 border-primary shadow-[0_0_15px_rgba(19,236,91,0.1)]' : 'bg-surface-dark border-white/5'}`}
            >
              <div className="flex items-center gap-4">
                <span className={`text-xs font-bold w-4 ${idx < 3 ? 'text-yellow-500' : 'text-white/40'}`}>{idx + 1}</span>
                <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold ${idx < 3 ? 'bg-yellow-500/20 text-yellow-500' : 'bg-white/5 text-white/60'}`}>
                  {student.avatar}
                </div>
                <span className={`text-sm font-medium ${student.isUser ? 'text-primary font-bold' : 'text-white/80'}`}>{student.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold">{student.xp}</span>
                <span className="text-[10px] text-white/40 font-bold">XP</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-white/30 text-xs italic">
           Actualizado hace 5 minutos • Mostrando los top 10 de 50 estudiantes
        </div>
      </main>

      {/* Bottom Nav Simulation */}
      <nav className="fixed bottom-0 left-0 w-full bg-surface-dark/90 backdrop-blur-lg border-t border-white/5 pb-6 pt-2 z-50">
        <ul className="flex justify-around items-center w-full max-w-md mx-auto">
          <li className="flex-1">
            <button onClick={() => navigate(Screen.Dashboard)} className="flex flex-col items-center justify-center w-full gap-1 p-2 text-text-secondary">
              <span className="material-symbols-outlined text-[26px]">home</span>
              <span className="text-[10px] font-medium">Inicio</span>
            </button>
          </li>
          <li className="flex-1">
            <button className="flex flex-col items-center justify-center w-full gap-1 p-2 text-primary">
              <span className="material-symbols-outlined filled text-[26px]" style={{fontVariationSettings: "'FILL' 1"}}>leaderboard</span>
              <span className="text-[10px] font-medium">Ranking</span>
            </button>
          </li>
          <li className="flex-1">
            <div className="relative -top-6">
              <button onClick={() => navigate(Screen.ModuleLessons)} className="flex items-center justify-center h-14 w-14 rounded-full bg-primary text-background-dark shadow-glow border-4 border-background-dark">
                <span className="material-symbols-outlined text-[32px] filled">play_arrow</span>
              </button>
            </div>
          </li>
          <li className="flex-1">
            <button onClick={() => navigate(Screen.Progress)} className="flex flex-col items-center justify-center w-full gap-1 p-2 text-text-secondary">
              <span className="material-symbols-outlined text-[26px]">school</span>
              <span className="text-[10px] font-medium">Logros</span>
            </button>
          </li>
          <li className="flex-1">
            <button onClick={() => navigate(Screen.Profile)} className="flex flex-col items-center justify-center w-full gap-1 p-2 text-text-secondary">
              <span className="material-symbols-outlined text-[26px]">person</span>
              <span className="text-[10px] font-medium">Perfil</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Ranking;
