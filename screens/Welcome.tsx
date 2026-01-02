
import React from 'react';

interface WelcomeProps {
  onStart: () => void;
  onLogin: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart, onLogin }) => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-background-dark font-display">
      <div className="absolute inset-0 z-0 geometric-bg bg-grid-pattern opacity-30 pointer-events-none"></div>
      
      <div className="absolute top-10 left-[-20px] w-32 h-32 rounded-full border-2 border-primary/10 z-0"></div>
      <div className="absolute bottom-1/4 right-[-10px] w-24 h-24 border-2 border-primary/10 rotate-45 z-0"></div>
      
      <main className="relative z-10 flex flex-1 flex-col justify-between p-6">
        <div className="flex-none h-10"></div>
        
        <div className="flex flex-col items-center justify-center gap-8 flex-1">
          <div className="relative w-full aspect-square max-w-[280px] flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75"></div>
            <div 
              className="relative w-full h-full bg-center bg-no-repeat bg-contain z-10 drop-shadow-2xl" 
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBtYds3FvDdKP_nV2xqpg_NPJTRb2TLe1M3zhX-92TblD-xtxHbAyGQFZGrj_tBvrxzGPvppTClkezbRLMxW7lSYPZe6W1EXZtfbBDrcZU1EKN28VGuXy3fVU0B1-WxqOJOtHJLOJu5Q6r7hj_RukLsi5erpS3-DTmUFJnH8qCgHGPkDhQAQfF-Zb_N8KCKVIExefOFEq9putqEZ4Fgk-3oCD2FXZjbKZQimRZF8CEri2A7oufx7auVsNvu-V38YDP0_dPwb9xRQBU")`,
                borderRadius: "2rem",
                WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)"
              }}
            ></div>
            <div className="absolute -top-4 -right-4 bg-surface-dark p-3 rounded-2xl shadow-lg border border-primary/20 rotate-12">
              <span className="material-symbols-outlined text-primary text-3xl">change_history</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-surface-dark p-3 rounded-2xl shadow-lg border border-primary/20 -rotate-6">
              <span className="material-symbols-outlined text-primary text-3xl">functions</span>
            </div>
          </div>
          
          <div className="text-center space-y-3 max-w-[320px]">
            <h1 className="text-white tracking-tight text-4xl font-extrabold leading-tight">G-Math-Go</h1>
            <h2 className="text-gray-400 text-lg font-medium leading-relaxed">Tu aventura geométrica comienza aquí.</h2>
          </div>
        </div>

        <div className="flex flex-col gap-4 pb-8 pt-8 w-full">
          <button 
            onClick={onStart}
            className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 bg-primary hover:bg-primary-hover transition-all duration-300 btn-glow"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
            <span className="text-background-dark text-lg font-bold tracking-wide uppercase flex items-center gap-2">
              Empezar Aventura
              <span className="material-symbols-outlined text-xl">play_arrow</span>
            </span>
          </button>
          
          <button 
            onClick={onLogin}
            className="flex w-full cursor-pointer items-center justify-center rounded-xl h-12 px-4 bg-transparent text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm font-semibold tracking-wide"
          >
            Ya tengo cuenta
          </button>
          
          <div className="text-center mt-2">
            <p className="text-xs text-white/30 font-light">Versión 1.0 • Hecho para estudiantes</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
