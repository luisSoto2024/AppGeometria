
import React, { useState, useRef } from 'react';
import { UserProgress } from '../types';

interface LessonJustifyExampleProps {
  user: UserProgress;
  addXP: (amount: number) => void;
  onBack: () => void;
  onNext: () => void;
}

const LessonJustifyExample: React.FC<LessonJustifyExampleProps> = ({ user, addXP, onBack, onNext }) => {
  const [step2Completed, setStep2Completed] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Segment AB State
  const [segA, setSegA] = useState({ x: 25, y: 75 });
  const [segB, setSegB] = useState({ x: 75, y: 75 });
  
  // Line L State (Defined by two control points)
  const [lineP1, setLineP1] = useState({ x: 20, y: 30 });
  const [lineP2, setLineP2] = useState({ x: 80, y: 30 });
  
  const [dragTarget, setDragTarget] = useState<'A' | 'B' | 'P1' | 'P2' | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Fix: Defining handlePointerDown which was missing but called in the JSX
  const handlePointerDown = (target: 'A' | 'B' | 'P1' | 'P2') => {
    if (step2Completed) return;
    setDragTarget(target);
  };

  const calculateDistance = () => {
    const dx = (segB.x - segA.x);
    const dy = (segB.y - segA.y);
    return Math.sqrt(dx * dx + dy * dy).toFixed(1);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragTarget || !svgRef.current || step2Completed) return;

    const svg = svgRef.current;
    const CTM = svg.getScreenCTM();
    if (!CTM) return;

    const x = (e.clientX - CTM.e) / CTM.a;
    const y = (e.clientY - CTM.f) / CTM.d;

    const boundedX = Math.max(5, Math.min(95, x));
    const boundedY = Math.max(5, Math.min(95, y));

    if (dragTarget === 'A') setSegA({ x: boundedX, y: boundedY });
    else if (dragTarget === 'B') setSegB({ x: boundedX, y: boundedY });
    else if (dragTarget === 'P1') setLineP1({ x: boundedX, y: boundedY });
    else if (dragTarget === 'P2') setLineP2({ x: boundedX, y: boundedY });
  };

  // Logic to draw an "infinite" line passing through P1 and P2
  const getLineExtrapolated = () => {
    const dx = lineP2.x - lineP1.x;
    const dy = lineP2.y - lineP1.y;
    
    // Avoid division by zero
    if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) return { x1: 0, y1: lineP1.y, x2: 100, y2: lineP1.y };

    // Extend line far beyond SVG bounds (0-100)
    const tMin = -200; 
    const tMax = 200;
    
    return {
      x1: lineP1.x + tMin * dx,
      y1: lineP1.y + tMin * dy,
      x2: lineP1.x + tMax * dx,
      y2: lineP1.y + tMax * dy
    };
  };

  const lineCoords = getLineExtrapolated();

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setStep2Completed(true);
      setIsVerifying(false);
      addXP(50);
    }, 1200);
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark font-display antialiased">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 border-b border-gray-200 dark:border-white/10">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="text-lg font-bold flex-1 text-center">Ejemplo: Elementos</h2>
          <div className="flex size-10 items-center justify-center text-text-secondary">
            <span className="material-symbols-outlined">help</span>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex justify-between items-end text-xs font-bold uppercase tracking-wider">
            <p className="text-primary">Paso 2 de 3</p>
            <p className="text-text-secondary">{step2Completed ? '100%' : '65%'}</p>
          </div>
          <div className="h-1.5 w-full bg-gray-200 dark:bg-surface-highlight rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-700 shadow-[0_0_10px_#13ec5b]" 
              style={{ width: step2Completed ? '100%' : '65%' }}
            ></div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col p-4 gap-6 pb-28">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold px-1 text-slate-900 dark:text-white">Diferencia Fundamental</h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed px-1">
            Manipula ambos elementos. Observa que el <span className="text-primary font-bold">segmento</span> tiene extremos fijos y medida, mientras que la <span className="text-primary font-bold opacity-70">recta</span> fluye infinitamente a través de sus puntos.
          </p>

          <div className="relative w-full aspect-[4/3] bg-surface-dark rounded-xl border border-white/10 overflow-hidden shadow-inner mt-2 touch-none">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <svg 
              ref={svgRef}
              onPointerMove={handlePointerMove}
              onPointerUp={() => setDragTarget(null)}
              onPointerLeave={() => setDragTarget(null)}
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 100 100"
            >
              {/* Infinite Line L */}
              <line 
                x1={lineCoords.x1} y1={lineCoords.y1} x2={lineCoords.x2} y2={lineCoords.y2} 
                stroke="url(#lineFade)" strokeWidth="0.8" strokeDasharray="3 2"
              />
              <defs>
                <linearGradient id="lineFade" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="#13ec5b" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>

              {/* Line Control Points */}
              <circle 
                cx={lineP1.x} cy={lineP1.y} r="3" 
                className="fill-transparent stroke-white/40 stroke-1 cursor-move"
                onPointerDown={() => handlePointerDown('P1')}
              />
              <circle 
                cx={lineP2.x} cy={lineP2.y} r="3" 
                className="fill-transparent stroke-white/40 stroke-1 cursor-move"
                onPointerDown={() => handlePointerDown('P2')}
              />
              <text x={lineP1.x} y={lineP1.y - 6} textAnchor="middle" className="fill-white/30 text-[3px] font-mono">P1</text>
              <text x={lineP2.x} y={lineP2.y - 6} textAnchor="middle" className="fill-white/30 text-[3px] font-mono">P2</text>
              <text x="5" y="10" className="fill-white/40 font-mono text-[4px] italic uppercase tracking-widest">Recta L (Sin longitud)</text>

              {/* Segment AB */}
              <line 
                x1={segA.x} y1={segA.y} x2={segB.x} y2={segB.y} 
                className="stroke-primary stroke-[1.5]"
                style={{ filter: 'drop-shadow(0 0 4px #13ec5b)' }}
              />
              
              {/* Segment Endpoints */}
              <circle 
                cx={segA.x} cy={segA.y} r="4" 
                className={`fill-white border-2 border-primary cursor-move transition-transform ${dragTarget === 'A' ? 'scale-125' : ''}`}
                onPointerDown={() => handlePointerDown('A')}
              />
              <text x={segA.x} y={segA.y + 10} textAnchor="middle" className="fill-white font-bold text-[5px]">A</text>

              <circle 
                cx={segB.x} cy={segB.y} r="4" 
                className={`fill-white border-2 border-primary cursor-move transition-transform ${dragTarget === 'B' ? 'scale-125' : ''}`}
                onPointerDown={() => handlePointerDown('B')}
              />
              <text x={segB.x} y={segB.y + 10} textAnchor="middle" className="fill-white font-bold text-[5px]">B</text>

              {/* Measurement Label (Only for Segment) */}
              <g transform={`translate(${(segA.x + segB.x) / 2}, ${(segA.y + segB.y) / 2 - 8})`}>
                <rect x="-12" y="-4" width="24" height="8" rx="2" className="fill-black/80 backdrop-blur-sm" />
                <text textAnchor="middle" y="2" className="fill-primary font-bold text-[4px]">{calculateDistance()} u</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Steps Timeline */}
        <div className="flex flex-col gap-0 relative">
          <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-white/10 -z-10"></div>

          <div className="flex gap-4 mb-6">
            <div className="flex flex-col items-center">
              <div className="size-10 rounded-full bg-primary flex items-center justify-center shrink-0 z-10 shadow-[0_0_10px_#13ec5b]">
                <span className="material-symbols-outlined text-black text-xl font-bold">check</span>
              </div>
            </div>
            <div className="w-full">
              <div className="p-4 rounded-xl bg-surface-dark border border-primary/20 shadow-sm relative">
                <div className="absolute left-0 top-4 bottom-4 w-1 bg-primary rounded-r-full"></div>
                <div className="pl-2">
                  <h3 className="font-bold text-primary text-sm mb-1 uppercase tracking-wide">1. Identificar Extremos</h3>
                  <p className="text-xs text-gray-300 leading-relaxed italic">El segmento AB tiene inicio y fin. La recta fluye a través de sus puntos.</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`flex gap-4 mb-6 transition-all duration-500 ${step2Completed ? '' : 'animate-pulse'}`}>
            <div className="flex flex-col items-center">
              <div className={`size-10 rounded-full border-2 flex items-center justify-center shrink-0 z-10 transition-all ${step2Completed ? 'bg-primary border-primary' : 'bg-surface-dark border-primary shadow-[0_0_15px_rgba(19,236,91,0.2)]'}`}>
                {step2Completed ? (
                   <span className="material-symbols-outlined text-black text-xl font-bold">check</span>
                ) : (
                   <span className="text-primary font-bold text-base">2</span>
                )}
              </div>
            </div>
            <div className="w-full">
              <div className={`p-5 rounded-xl bg-surface-dark border-2 transition-all relative overflow-hidden ${step2Completed ? 'border-primary/20' : 'border-primary/50 shadow-[0_0_20px_rgba(19,236,91,0.05)]'}`}>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white text-base">Comprobar Longitud</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${step2Completed ? 'bg-white/10 text-white/50' : 'bg-primary text-black'}`}>
                      {step2Completed ? 'Completado' : 'En curso'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-4 italic leading-relaxed">Solo los elementos acotados por puntos pueden ser medidos.</p>
                  
                  {!step2Completed && (
                    <div className="flex flex-col gap-3">
                      <div className="p-3 rounded-lg bg-black/30 border border-white/10 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[8px] text-gray-500 uppercase font-bold tracking-widest">Medición de Segmento</span>
                          <span className="font-mono text-xs text-primary">{calculateDistance()} unidades</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-600">straighten</span>
                      </div>
                      <button 
                        onClick={handleVerify}
                        disabled={isVerifying}
                        className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-[#0fd650] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary/20 mt-1"
                      >
                        {isVerifying ? (
                          <div className="size-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <span className="text-black font-bold text-sm">Validar Propiedad</span>
                            <span className="material-symbols-outlined text-black group-hover:translate-x-1 transition-transform text-xl">verified</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                  {step2Completed && (
                    <div className="flex items-center gap-2 text-primary text-sm font-bold animate-in fade-in zoom-in-95">
                      <span className="material-symbols-outlined text-base">verified</span>
                      <span>Propiedad validada con éxito.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={`flex gap-4 transition-all duration-500 ${step2Completed ? 'opacity-100' : 'opacity-40 grayscale'}`}>
            <div className="flex flex-col items-center">
              <div className={`size-10 rounded-full bg-surface-dark border flex items-center justify-center shrink-0 z-10 ${step2Completed ? 'border-primary text-primary shadow-[0_0_10px_rgba(19,236,91,0.2)]' : 'border-white/20 text-gray-400'}`}>
                <span className="font-bold text-sm">3</span>
              </div>
            </div>
            <div className="w-full">
              <div className={`p-4 rounded-xl bg-surface-dark border border-dashed transition-all ${step2Completed ? 'border-primary/30 bg-primary/5' : 'border-white/5'}`}>
                <h3 className={`font-bold text-sm mb-1 ${step2Completed ? 'text-primary' : 'text-gray-300'}`}>Conclusión</h3>
                <p className="text-[10px] text-gray-500 leading-relaxed uppercase font-bold tracking-tight">
                  {step2Completed 
                    ? 'La recta es infinita e inmedible. El segmento es finito y medible.'
                    : 'Finaliza el análisis para ver la conclusión.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pt-12 max-w-md mx-auto bg-gradient-to-t from-background-dark via-background-dark/90 to-transparent pointer-events-none">
        <div className="pointer-events-auto bg-[#1e3025] backdrop-blur-xl border border-white/10 p-2 pr-2.5 pl-5 rounded-2xl flex items-center justify-between shadow-2xl">
          <div className="flex flex-col">
            <span className="text-[10px] text-text-secondary uppercase tracking-wider font-bold">Recompensa</span>
            <div className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-[16px] filled">bolt</span>
              <span className="font-bold text-base">+50 XP</span>
            </div>
          </div>
          <button 
            onClick={onNext}
            disabled={!step2Completed}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 border ${step2Completed ? 'bg-primary text-black border-primary shadow-lg active:scale-95' : 'bg-white/5 text-gray-500 border-white/5 cursor-not-allowed'}`}
          >
            Siguiente
            <span className="material-symbols-outlined text-[18px]">{step2Completed ? 'arrow_forward' : 'lock'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonJustifyExample;
