
import React, { useState } from 'react';
import { UserProgress, Screen } from '../types';

interface LessonChallengeFinalProps {
  user: UserProgress;
  addXP: (amount: number) => void;
  onBack: () => void;
  onNext: () => void;
}

const LessonChallengeFinal: React.FC<LessonChallengeFinalProps> = ({ user, addXP, onBack, onNext }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [lives, setLives] = useState(3);

  const options = [
    { id: 0, label: 'Rectángulo', desc: 'Diagonales iguales', icon: 'crop_landscape' },
    { id: 1, label: 'Rombo', desc: 'Lados iguales, diagonales ⊥', icon: 'diamond' },
    { id: 2, label: 'Trapecio', desc: 'Un par de lados paralelos', icon: 'architecture' },
  ];

  const handleSelect = (id: number) => {
    if (isCorrect) return;
    setSelectedOption(id);
    if (id === 1) {
      setIsCorrect(true);
      addXP(100);
    } else {
      setIsCorrect(false);
      setLives(prev => Math.max(0, prev - 1));
      setTimeout(() => {
        setIsCorrect(null);
        setSelectedOption(null);
      }, 1500);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen flex flex-col overflow-hidden relative font-display max-w-md mx-auto shadow-2xl">
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(circle_at_50%_120%,rgba(19,236,91,0.15),transparent_70%)]"></div>
      
      <header className="flex items-center justify-between p-4 pb-2 z-10">
        <button onClick={onBack} className="flex items-center justify-center size-10 rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h2 className="text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          Reto: Figuras Básicas
        </h2>
        <button onClick={onBack} className="flex items-center justify-center h-10 px-3 rounded-full hover:bg-white/10 transition-colors">
          <span className="text-white/70 text-sm font-bold tracking-wide">Salir</span>
        </button>
      </header>

      <div className="px-4 py-2 space-y-3 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 bg-surface-dark/50 px-3 py-1.5 rounded-full border border-white/5">
            <span className="material-symbols-outlined text-[#ff4b4b] text-[20px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            <span className="text-white font-bold text-sm">{lives}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] text-white/50 font-medium uppercase tracking-wider">Puntaje</p>
              <p className="text-primary font-bold text-lg leading-none tabular-nums drop-shadow-[0_0_8px_rgba(19,236,91,0.5)]">{user.xp}</p>
            </div>
            <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded border border-primary/20">
              <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
              <span className="text-primary text-xs font-bold">x3</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs text-white/60 font-medium px-1">
            <span>Progreso Reto</span>
            <span>{isCorrect ? '100%' : '90%'}</span>
          </div>
          <div className="h-3 w-full bg-surface-dark rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-primary shadow-[0_0_15px_rgba(19,236,91,0.3)] rounded-full transition-all duration-500 ease-out relative overflow-hidden" style={{ width: isCorrect ? '100%' : '90%' }}>
              <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-6 pb-32 z-0">
        <div className="bg-surface-dark/40 rounded-2xl p-1 shadow-lg border border-white/5 overflow-hidden group">
          <div className="relative w-full aspect-[16/10] bg-[#15201a] rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-full h-full text-primary" viewBox="0 0 400 250">
                <defs>
                  <pattern height="20" id="smallGrid" patternUnits="userSpaceOnUse" width="20">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"></path>
                  </pattern>
                </defs>
                <rect fill="url(#smallGrid)" height="100%" width="100%"></rect>
                <line stroke="rgba(255,255,255,0.1)" strokeWidth="1" x1="200" x2="200" y1="0" y2="250"></line>
                <line stroke="rgba(255,255,255,0.1)" strokeWidth="1" x1="0" x2="400" y1="125" y2="125"></line>
                
                <polygon 
                  className={`${isCorrect ? 'animate-pulse' : ''}`}
                  fill="rgba(19, 236, 91, 0.1)" 
                  points="200,45 280,125 200,205 120,125" 
                  stroke="currentColor" 
                  strokeDasharray="8 4" 
                  strokeWidth="3"
                ></polygon>
                
                <circle cx="200" cy="45" fill="white" r="4"></circle>
                <circle cx="280" cy="125" fill="white" r="4"></circle>
                <circle cx="200" cy="205" fill="white" r="4"></circle>
                <circle cx="120" cy="125" fill="white" r="4"></circle>
                
                <text className="text-[10px] font-mono fill-white/60" x="208" y="42">A(0,4)</text>
                <text className="text-[10px] font-mono fill-white/60" x="290" y="130">B(3,0)</text>
                <text className="text-[10px] font-mono fill-white/60" x="208" y="222">C(0,-4)</text>
                <text className="text-[10px] font-mono fill-white/60" x="75" y="130">D(-3,0)</text>
              </svg>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/95 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-primary/20">Análisis Final</span>
              </div>
              <p className="text-white text-lg font-bold leading-tight drop-shadow-md">
                ¿Qué figura forman los puntos en el plano?
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-white/70 text-sm font-medium">Opciones:</p>
            <button className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">lightbulb</span>
              Pista
            </button>
          </div>
          
          <div className="grid gap-3">
            {options.map((opt) => (
              <button 
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                disabled={isCorrect === true}
                className={`relative group w-full p-4 rounded-xl border-2 transition-all active:scale-[0.98] flex items-center gap-4 ${
                  selectedOption === opt.id
                    ? opt.id === 1 
                      ? 'bg-primary/10 border-primary shadow-[0_0_15px_rgba(19,236,91,0.2)]'
                      : 'bg-red-500/10 border-red-500'
                    : 'bg-surface-dark border-transparent hover:border-white/10'
                }`}
              >
                <div className={`size-10 rounded-lg flex items-center justify-center transition-colors ${
                  selectedOption === opt.id && opt.id === 1 ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/50'
                }`}>
                  <span className="material-symbols-outlined text-xl">{opt.icon}</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className={`text-base font-bold tracking-wide ${selectedOption === opt.id && opt.id === 1 ? 'text-primary' : 'text-white'}`}>{opt.label}</span>
                  <span className="text-white/40 text-xs">{opt.desc}</span>
                </div>
                {selectedOption === opt.id && opt.id === 1 && (
                  <div className="absolute -top-2 -right-2 bg-primary text-black size-6 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background-dark via-background-dark to-transparent z-20 flex justify-center max-w-md mx-auto">
        <button 
          onClick={onNext}
          disabled={!isCorrect}
          className={`w-full bg-primary hover:bg-[#10d450] text-black text-lg font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(19,236,91,0.4)] transition-all flex items-center justify-center gap-2 ${!isCorrect ? 'opacity-50 grayscale' : 'animate-bounce-subtle'}`}
        >
          <span>¡Continuar!</span>
          <span className="material-symbols-outlined font-bold">arrow_forward</span>
        </button>
      </div>

      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LessonChallengeFinal;
