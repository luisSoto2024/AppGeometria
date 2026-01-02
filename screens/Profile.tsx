
import React from 'react';
import { Screen, UserProgress } from '../types';

interface ProfileProps {
  user: UserProgress;
  navigate: (screen: Screen) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, navigate }) => {
  return (
    <div className="bg-background-dark text-white font-display min-h-screen pb-24 max-w-md mx-auto">
      <header className="sticky top-0 z-20 bg-background-dark/80 backdrop-blur-md p-4 flex items-center justify-between border-b border-white/5">
         <button onClick={() => navigate(Screen.Dashboard)} className="p-2"><span className="material-symbols-outlined">arrow_back</span></button>
         <h1 className="text-lg font-bold">Mi Perfil</h1>
         <button className="p-2 text-primary"><span className="material-symbols-outlined">settings</span></button>
      </header>

      <main className="p-4 space-y-8">
        <section className="flex flex-col items-center">
          <div className="relative w-32 h-32 rounded-full border-4 border-primary/20 bg-cover bg-center" style={{backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBz04H9B_LnqJSi2pcjl9T86AOXbLyYgTPOh7nNISuD28R9vHtoWue4weRysADR1D2iFdiosZCA-31KNF_LsFdOH48xiosFZsjLkp_uGWjZj_MjSgYZqQ9ZV1QyhRdoHqmZQaSysqQ7I4N-3hlFa_XYlUQkVeQQN5Ok3_UgjFTqvxWuZx6qHTRhNGggeBzFhFb9ffw5p5rKdUDAG0rArYyeTDFcbReVSq7DtKPKE9EN5iUFZthKrl2cerLR8NvNQuhUd_q-IGd5fm8")`}}>
            <button className="absolute bottom-0 right-0 bg-surface-dark border-2 border-background-dark p-2 rounded-full"><span className="material-symbols-outlined text-sm">edit</span></button>
          </div>
          <h2 className="text-2xl font-bold mt-4">Juan Pérez</h2>
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-sm">military_tech</span>
            <p className="text-sm font-medium">Nivel {user.level}: Explorador Geométrico</p>
          </div>
        </section>

        <section className="px-2">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold">Progreso Nivel 5</span>
            <span className="text-xs text-text-secondary">1250 / 1500 XP</span>
          </div>
          <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary shadow-glow" style={{width: '83%'}}></div>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-3">
          {[
            { label: 'Puntos', val: user.xp, icon: 'trophy', color: 'text-primary' },
            { label: 'Días Racha', val: user.streak, icon: 'local_fire_department', color: 'text-orange-500' },
            { label: 'Ranking', val: 'Top 10%', icon: 'leaderboard', color: 'text-blue-500' }
          ].map(stat => (
            <div key={stat.label} className="bg-surface-dark rounded-xl p-3 flex flex-col items-center border border-white/5">
              <span className={`material-symbols-outlined ${stat.color} mb-1`}>{stat.icon}</span>
              <span className="font-bold">{stat.val}</span>
              <span className="text-[10px] uppercase text-gray-500">{stat.label}</span>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold px-1">Logros Desbloqueados</h3>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 px-1">
             {['shape_line', 'change_history', 'data_object'].map(icon => (
               <div key={icon} className="shrink-0 flex flex-col items-center gap-2">
                 <div className="size-20 rounded-2xl bg-surface-dark border-2 border-primary/30 flex items-center justify-center">
                   <span className="material-symbols-outlined text-primary text-4xl">{icon}</span>
                 </div>
               </div>
             ))}
          </div>
        </section>

        <button className="w-full p-4 bg-white/5 text-red-400 font-bold border border-red-500/20 rounded-xl mt-4">Cerrar Sesión</button>
      </main>
    </div>
  );
};

export default Profile;
