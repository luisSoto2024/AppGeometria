
import React, { useState } from 'react';
import { Screen, UserProgress } from '../types';

interface ProfileProps {
  user: UserProgress;
  navigate: (screen: Screen) => void;
  onUpdateName: (newName: string) => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, navigate, onUpdateName, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user.name);

  const handleSaveName = () => {
    if (tempName.trim()) {
      onUpdateName(tempName.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-background-dark text-white font-display min-h-screen pb-24 max-w-md mx-auto">
      <header className="sticky top-0 z-20 bg-background-dark/80 backdrop-blur-md p-4 flex items-center justify-between border-b border-white/5">
         <button onClick={() => navigate(Screen.Dashboard)} className="p-2"><span className="material-symbols-outlined">arrow_back</span></button>
         <h1 className="text-lg font-bold">Mi Perfil</h1>
         <button className="p-2 text-primary"><span className="material-symbols-outlined">settings</span></button>
      </header>

      <main className="p-4 space-y-8">
        <section className="flex flex-col items-center">
          <div className="relative w-32 h-32 rounded-full border-4 border-primary/20 bg-surface-highlight flex items-center justify-center overflow-hidden mb-4">
             <span className="text-5xl font-bold text-primary">{user.name.charAt(0).toUpperCase()}</span>
          </div>
          
          <div className="flex flex-col items-center gap-2 w-full px-4">
            {isEditing ? (
              <div className="flex items-center gap-2 w-full animate-in zoom-in duration-200">
                <input 
                  autoFocus
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="flex-1 bg-surface-dark border border-primary/50 rounded-lg py-2 px-3 text-white text-center text-xl font-bold focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button 
                  onClick={handleSaveName}
                  className="bg-primary text-background-dark size-10 rounded-lg flex items-center justify-center shadow-lg active:scale-95"
                >
                  <span className="material-symbols-outlined">check</span>
                </button>
                <button 
                  onClick={() => { setIsEditing(false); setTempName(user.name); }}
                  className="bg-white/10 text-white size-10 rounded-lg flex items-center justify-center hover:bg-white/20"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-primary hover:text-white transition-colors"
                  title="Corregir nombre"
                >
                  <span className="material-symbols-outlined text-sm">edit</span>
                </button>
              </div>
            )}
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>

          <div className="flex items-center gap-2 text-primary mt-4">
            <span className="material-symbols-outlined text-sm">military_tech</span>
            <p className="text-sm font-medium">Nivel {user.level}: Explorador Geométrico</p>
          </div>
        </section>

        <section className="px-2">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold">Progreso del Nivel</span>
            <span className="text-xs text-text-secondary">{user.xp} / {(user.level) * 100} XP</span>
          </div>
          <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary shadow-glow" style={{width: `${(user.xp % 100)}%`}}></div>
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

        <button 
          onClick={onLogout}
          className="w-full p-4 bg-white/5 text-red-400 font-bold border border-red-500/20 rounded-xl mt-4 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">logout</span>
          Cerrar Sesión
        </button>
      </main>
    </div>
  );
};

export default Profile;
