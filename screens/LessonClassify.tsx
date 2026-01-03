
import React, { useState } from 'react';
import { UserProgress } from '../types';

interface Item {
  id: string;
  type: 'figure' | 'property';
  content: React.ReactNode;
  label: string;
  correctCategory: 'triangle' | 'quadrilateral';
}

interface LessonClassifyProps {
  user: UserProgress;
  addXP: (amount: number) => void;
  onBack: () => void;
  onNext: () => void;
}

const LessonClassify: React.FC<LessonClassifyProps> = ({ user, addXP, onBack, onNext }) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Record<string, 'triangle' | 'quadrilateral' | null>>({
    'fig-a': null,
    'prop-180': null,
    'fig-b': null,
    'prop-360': null,
  });
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  const items: Item[] = [
    { 
      id: 'fig-a', 
      type: 'figure', 
      label: 'Figura A', 
      correctCategory: 'triangle',
      content: <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 to-orange-500 shadow-lg" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div> 
    },
    { 
      id: 'prop-180', 
      type: 'property', 
      label: 'Suma 180°', 
      correctCategory: 'triangle',
      content: (
        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-indigo-400 mb-1">functions</span>
          <p className="text-white text-center font-bold text-[10px] leading-tight">Suma de ángulos<br/>180°</p>
        </div>
      )
    },
    { 
      id: 'fig-b', 
      type: 'figure', 
      label: 'Figura B', 
      correctCategory: 'quadrilateral',
      content: <div className="w-16 h-10 bg-gradient-to-tr from-blue-400 to-cyan-400 shadow-lg" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}></div> 
    },
    { 
      id: 'prop-360', 
      type: 'property', 
      label: 'Suma 360°', 
      correctCategory: 'quadrilateral',
      content: (
        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-pink-400 mb-1">grid_goldenratio</span>
          <p className="text-white text-center font-bold text-[10px] leading-tight">Suma de ángulos<br/>360°</p>
        </div>
      )
    },
  ];

  const handleSelectItem = (id: string) => {
    if (isVerified) return;
    setSelectedItemId(id);
    setError(false);
  };

  const handleAssignToCategory = (category: 'triangle' | 'quadrilateral') => {
    if (!selectedItemId || isVerified) return;
    setAssignments(prev => ({ ...prev, [selectedItemId]: category }));
    setSelectedItemId(null);
  };

  const handleRemoveFromCategory = (id: string) => {
    if (isVerified) return;
    setAssignments(prev => ({ ...prev, [id]: null }));
    setError(false);
  };

  const handleReset = () => {
    setAssignments({
      'fig-a': null,
      'prop-180': null,
      'fig-b': null,
      'prop-360': null,
    });
    setSelectedItemId(null);
    setError(false);
    setIsVerified(false);
  };

  const handleValidate = () => {
    const allAssigned = Object.values(assignments).every(v => v !== null);
    if (!allAssigned) return;

    const isCorrect = items.every(item => assignments[item.id] === item.correctCategory);
    
    if (isCorrect) {
      setIsVerified(true);
      setError(false);
      addXP(30);
    } else {
      setError(true);
      // No ocultamos el error automáticamente para que el usuario sepa que falló
    }
  };

  const availableItems = items.filter(item => assignments[item.id] === null);
  const triangleItems = items.filter(item => assignments[item.id] === 'triangle');
  const quadItems = items.filter(item => assignments[item.id] === 'quadrilateral');

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased">
      <header className="flex items-center justify-between p-4 pt-6 pb-2 z-10">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-white" style={{ fontSize: '24px' }}>arrow_back_ios_new</span>
        </button>
        <h2 className="text-white text-lg font-bold leading-tight tracking-tight">Lección 1</h2>
        <div className="flex items-center justify-end gap-1 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
          <span className="material-symbols-outlined text-primary text-lg">bolt</span>
          <p className="text-primary text-sm font-bold">{user.xp}</p>
        </div>
      </header>

      <div className="flex w-full flex-row items-center justify-center gap-2 py-2">
        <div className="h-1.5 w-8 rounded-full bg-primary/40"></div>
        <div className="h-1.5 w-8 rounded-full bg-primary/40"></div>
        <div className="h-1.5 w-8 rounded-full bg-primary shadow-[0_0_10px_rgba(19,236,91,0.5)]"></div>
        <div className="h-1.5 w-8 rounded-full bg-white/10"></div>
      </div>

      <main className="flex-1 flex flex-col px-5 pb-32 overflow-y-auto">
        <div className="flex flex-col items-center text-center mb-6">
          <h1 className="text-2xl font-bold leading-tight mb-2">Clasificación Básica</h1>
          <p className="text-white/70 text-sm font-normal leading-normal max-w-[280px]">
            Asigna cada elemento a su categoría. ¡Toca un elemento asignado si quieres corregirlo!
          </p>
        </div>

        {/* Categories (Drop Zones) */}
        <div className={`grid grid-cols-2 gap-4 mb-8 ${error ? 'animate-shake' : ''}`}>
          <div 
            className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-2 py-4 transition-all min-h-[160px] ${
              selectedItemId 
              ? 'border-primary/60 bg-primary/10 scale-105 shadow-lg shadow-primary/20 cursor-pointer' 
              : 'border-primary/30 bg-primary/5'
            } ${error ? 'border-red-500/50' : ''}`}
            onClick={() => selectedItemId && handleAssignToCategory('triangle')}
          >
            <div className="rounded-full bg-primary/20 p-2 text-primary">
              <span className="material-symbols-outlined filled" style={{ fontSize: '24px' }}>change_history</span>
            </div>
            <p className="text-primary font-bold text-[10px] uppercase tracking-tighter">Triángulos</p>
            <div className="flex flex-wrap justify-center gap-2 mt-1">
              {triangleItems.map(it => (
                <button 
                  key={it.id} 
                  onClick={(e) => { e.stopPropagation(); handleRemoveFromCategory(it.id); }}
                  className="size-10 scale-90 opacity-90 hover:scale-110 transition-transform relative group"
                >
                  {it.content}
                  {!isVerified && (
                    <div className="absolute -top-1 -right-1 bg-red-500 rounded-full size-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-[10px] text-white">close</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div 
            className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-2 py-4 transition-all min-h-[160px] ${
              selectedItemId 
              ? 'border-white/40 bg-white/10 scale-105 shadow-lg cursor-pointer' 
              : 'border-white/20 bg-white/5'
            } ${error ? 'border-red-500/50' : ''}`}
            onClick={() => selectedItemId && handleAssignToCategory('quadrilateral')}
          >
            <div className="rounded-full bg-white/10 p-2 text-white/60">
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>crop_square</span>
            </div>
            <p className="text-white/60 font-bold text-[10px] uppercase tracking-tighter">Cuadriláteros</p>
            <div className="flex flex-wrap justify-center gap-2 mt-1">
              {quadItems.map(it => (
                <button 
                  key={it.id} 
                  onClick={(e) => { e.stopPropagation(); handleRemoveFromCategory(it.id); }}
                  className="size-10 scale-90 opacity-90 hover:scale-110 transition-transform relative group"
                >
                  {it.content}
                  {!isVerified && (
                    <div className="absolute -top-1 -right-1 bg-red-500 rounded-full size-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-[10px] text-white">close</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="h-px flex-1 bg-white/10"></div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Elementos Disponibles</span>
          <div className="h-px flex-1 bg-white/10"></div>
        </div>

        {/* Available Items */}
        <div className="grid grid-cols-2 gap-3 min-h-[120px]">
          {availableItems.length > 0 ? (
            availableItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectItem(item.id)}
                className={`group relative flex flex-col items-center justify-center rounded-xl bg-surface-dark p-3 shadow-lg ring-1 transition-all active:scale-95 ${
                  selectedItemId === item.id 
                  ? 'ring-primary bg-primary/10 -translate-y-1 shadow-primary/30' 
                  : 'ring-white/10 hover:ring-white/30'
                }`}
              >
                <div className="h-12 w-full flex items-center justify-center mb-1">
                  {item.content}
                </div>
                <span className="text-[9px] text-white/50 font-medium uppercase tracking-widest">{item.label}</span>
                {selectedItemId === item.id && (
                  <div className="absolute -top-2 -right-2 size-6 rounded-full bg-primary text-black flex items-center justify-center shadow-lg animate-bounce">
                    <span className="material-symbols-outlined text-[16px] font-bold">touch_app</span>
                  </div>
                )}
              </button>
            ))
          ) : (
            <div className="col-span-2 flex flex-col items-center justify-center py-6 text-center bg-white/5 rounded-2xl border border-dashed border-white/10 animate-in fade-in">
              <span className={`material-symbols-outlined text-4xl mb-2 ${isVerified ? 'text-primary' : 'text-white/20'}`}>
                {isVerified ? 'stars' : 'ads_click'}
              </span>
              <p className="text-xs text-white/40">
                {isVerified ? '¡Perfecto!' : 'Todos los elementos están ubicados'}
              </p>
              {error && (
                <div className="mt-3 flex flex-col items-center gap-2">
                  <p className="text-red-400 text-xs font-bold uppercase tracking-tighter">Hay errores en la clasificación</p>
                  <button 
                    onClick={handleReset}
                    className="text-[10px] font-bold text-white bg-white/10 px-3 py-1 rounded-full border border-white/10 hover:bg-white/20 transition-all"
                  >
                    REINICIAR TODO
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background-dark via-background-dark to-transparent z-20 max-w-md mx-auto">
        {!isVerified ? (
          <button 
            onClick={handleValidate}
            disabled={availableItems.length > 0}
            className="w-full rounded-2xl bg-primary py-4 text-center font-bold text-background-dark shadow-[0_0_20px_rgba(19,236,91,0.3)] transition-transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale"
          >
            <span>Validar Clasificación</span>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
          </button>
        ) : (
          <button 
            onClick={onNext}
            className="w-full rounded-2xl bg-primary py-4 text-center font-bold text-background-dark shadow-[0_0_20px_rgba(19,236,91,0.3)] transition-all animate-in zoom-in-95 flex items-center justify-center gap-2"
          >
            <span>Continuar (+30 XP)</span>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
          </button>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
};

export default LessonClassify;
