
import React, { useState } from 'react';
import { UserProgress } from '../types';

interface LessonClassifyProps {
  user: UserProgress;
  addXP: (amount: number) => void;
  onBack: () => void;
  onNext: () => void;
}

interface Item {
  id: string;
  type: 'figure' | 'property';
  content: React.ReactNode;
  label: string;
  correctCategory: 'triangle' | 'quadrilateral';
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
          <p className="text-white text-center font-bold text-xs leading-tight">Suma de ángulos<br/>180°</p>
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
          <p className="text-white text-center font-bold text-xs leading-tight">Suma de ángulos<br/>360°</p>
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
      setTimeout(() => setError(false), 2000);
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

      <div className="flex w-full flex-row items-center justify-center gap-2 py-4">
        <div className="h-1.5 w-8 rounded-full bg-primary/40"></div>
        <div className="h-1.5 w-8 rounded-full bg-primary/40"></div>
        <div className="h-1.5 w-8 rounded-full bg-primary shadow-[0_0_10px_rgba(19,236,91,0.5)]"></div>
        <div className="h-1.5 w-8 rounded-full bg-white/10"></div>
        <div className="h-1.5 w-8 rounded-full bg-white/10"></div>
      </div>

      <main className="flex-1 flex flex-col px-5 pb-32 overflow-y-auto">
        <div className="flex flex-col items-center text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-2">Clasificación Básica</h1>
          <p className="text-white/70 text-base font-normal leading-normal max-w-[280px]">
            Selecciona un elemento y asígnalo a su categoría geométrica.
          </p>
        </div>

        {/* Categories (Drop Zones) */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            onClick={() => handleAssignToCategory('triangle')}
            disabled={!selectedItemId}
            className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-2 py-6 transition-all ${
              selectedItemId 
              ? 'border-primary/60 bg-primary/10 scale-105 shadow-lg shadow-primary/20' 
              : 'border-primary/30 bg-primary/5'
            }`}
          >
            <div className="rounded-full bg-primary/20 p-3 text-primary">
              <span className="material-symbols-outlined filled" style={{ fontSize: '28px' }}>change_history</span>
            </div>
            <p className="text-primary font-bold text-sm text-center leading-tight">Triángulos</p>
            <div className="flex flex-wrap justify-center gap-1 mt-2">
              {triangleItems.map(it => (
                <div key={it.id} className="size-8 scale-75 opacity-80">{it.content}</div>
              ))}
            </div>
          </button>

          <button 
            onClick={() => handleAssignToCategory('quadrilateral')}
            disabled={!selectedItemId}
            className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-2 py-6 transition-all ${
              selectedItemId 
              ? 'border-white/40 bg-white/10 scale-105 shadow-lg' 
              : 'border-white/20 bg-white/5'
            }`}
          >
            <div className="rounded-full bg-white/10 p-3 text-white/60">
              <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>crop_square</span>
            </div>
            <p className="text-white/60 font-bold text-sm text-center leading-tight">Cuadriláteros</p>
            <div className="flex flex-wrap justify-center gap-1 mt-2">
              {quadItems.map(it => (
                <div key={it.id} className="size-8 scale-75 opacity-80">{it.content}</div>
              ))}
            </div>
          </button>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="h-px flex-1 bg-white/10"></div>
          <span className="text-xs font-bold uppercase tracking-wider text-white/40">Elementos Disponibles</span>
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
                <div className="h-16 w-full flex items-center justify-center mb-2">
                  {item.content}
                </div>
                <span className="text-[10px] text-white/50 font-medium uppercase tracking-widest">{item.label}</span>
                {selectedItemId === item.id && (
                  <div className="absolute -top-2 -right-2 size-6 rounded-full bg-primary text-black flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined text-[16px] font-bold">touch_app</span>
                  </div>
                )}
              </button>
            ))
          ) : (
            <div className="col-span-2 flex flex-col items-center justify-center py-8 text-center bg-white/5 rounded-2xl border border-dashed border-white/10">
              <span className="material-symbols-outlined text-primary text-4xl mb-2">done_all</span>
              <p className="text-sm text-white/40">Todos los elementos asignados</p>
              {error && <p className="text-red-400 text-xs font-bold mt-2 animate-bounce">¡Algunas clasificaciones son incorrectas!</p>}
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
    </div>
  );
};

export default LessonClassify;
