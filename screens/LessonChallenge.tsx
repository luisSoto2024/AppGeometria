
import React, { useState, useRef } from 'react';
import { UserProgress } from '../types';

interface LessonChallengeProps {
  user: UserProgress;
  addXP: (amount: number) => void;
  onBack: () => void;
  onNext: () => void;
}

const LessonChallenge: React.FC<LessonChallengeProps> = ({ user, addXP, onBack, onNext }) => {
  // Vertices positions in percentage of SVG (Triangle)
  // Initially C is at (50, 40) - let's make the challenge move it to (50, 20)
  const [posC, setPosC] = useState({ x: 50, y: 40 });
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Form states
  const [vCount, setVCount] = useState('');
  const [sCount, setSCount] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Target C position: x=50, y=25 (which maps to (5, 8) in a 10x10 logical grid)
  const targetX = 50;
  const targetY = 25;

  const handlePointerDown = () => setIsDragging(true);
  const handlePointerUp = () => setIsDragging(false);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !svgRef.current || isVerified) return;

    const svg = svgRef.current;
    const CTM = svg.getScreenCTM();
    if (!CTM) return;

    // Convert mouse/touch coord to SVG coord
    const x = (e.clientX - CTM.e) / CTM.a;
    const y = (e.clientY - CTM.f) / CTM.d;

    // Snapping logic (simulate a 10x10 grid)
    // SVG is 100x100, so each grid unit is 10px
    const snappedX = Math.round(x / 5) * 5;
    const snappedY = Math.round(y / 5) * 5;

    // Boundaries
    const finalX = Math.max(10, Math.min(90, snappedX));
    const finalY = Math.max(10, Math.min(90, snappedY));

    setPosC({ x: finalX, y: finalY });
  };

  const handleValidate = () => {
    // Correct answers: Vertices=3, Segments=3, Position C approx target
    const isVCorrect = vCount === '3';
    const isSCorrect = sCount === '3';
    const isPosCorrect = Math.abs(posC.x - targetX) < 5 && Math.abs(posC.y - targetY) < 5;

    if (isVCorrect && isSCorrect && isPosCorrect) {
      setIsVerified(true);
      setShowFeedback(true);
      addXP(40);
    } else {
      // Small shake or error feedback could go here
      alert("Revisa bien los conteos o la posición del Vértice C. ¡Pista: C debe estar en lo más alto!");
    }
  };

  // Convert logical 100x100 SVG to 10x10 display coords for labels
  const logicalX = Math.round(posC.x / 10);
  const logicalY = Math.round((100 - posC.y) / 10);

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark font-display antialiased selection:bg-primary selection:text-black">
      <header className="flex items-center px-4 py-4 pt-6 justify-between bg-transparent z-10 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-surface-dark/50 backdrop-blur-md hover:bg-slate-200 dark:hover:bg-surface-light/10 transition-colors text-slate-800 dark:text-white">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight text-center flex-1 pr-10 text-slate-800 dark:text-white">Reto de Elementos</h1>
        <div className="flex items-center justify-end gap-1 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
          <span className="material-symbols-outlined text-primary text-lg">bolt</span>
          <p className="text-primary text-sm font-bold">{user.xp}</p>
        </div>
      </header>

      <div className="flex w-full flex-row items-center justify-center gap-2 py-2 mb-2">
        <div className="h-1.5 w-8 rounded-full bg-primary shadow-[0_0_10px_rgba(19,236,91,0.5)]"></div>
        <div className="h-1.5 w-8 rounded-full bg-primary shadow-[0_0_10px_rgba(19,236,91,0.5)]"></div>
        <div className="h-1.5 w-8 rounded-full bg-primary shadow-[0_0_10px_rgba(19,236,91,0.5)]"></div>
        <div className="h-1.5 w-2 rounded-full bg-slate-300 dark:bg-surface-dark border border-slate-200 dark:border-white/10"></div>
      </div>

      <main className="flex-1 overflow-y-auto pb-32 px-4 scrollbar-hide">
        <div className="mb-4 animate-in fade-in slide-in-from-bottom-2">
          <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 rounded-full border border-primary/20">
            Conceptos Fundamentales
          </span>
          <h2 className="text-3xl font-bold leading-tight mb-2 text-slate-900 dark:text-white">
            Manipula la Figura
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Mueve el <span className="font-bold text-primary">Vértice C</span> hasta la posición <span className="bg-primary/20 px-1 rounded text-primary font-mono">(5, 8)</span> para completar el triángulo y cuenta sus elementos.
          </p>
        </div>

        {/* Interactive Coordinate Plane */}
        <div className="w-full mb-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg relative bg-surface-dark group cursor-crosshair">
          <div className="aspect-[4/3] w-full relative bg-[#131b15] touch-none">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#3b5443 1px, transparent 1px), linear-gradient(90deg, #3b5443 1px, transparent 1px)', backgroundSize: '10%' }}></div>
            
            {/* Axis Lines */}
            <div className="absolute left-[10%] bottom-[10%] top-[5%] w-0.5 bg-white/40"></div> 
            <div className="absolute left-[10%] bottom-[10%] right-[5%] h-0.5 bg-white/40"></div> 

            <svg 
              ref={svgRef}
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 100 100"
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              {/* The Triangle */}
              <polygon 
                className={`transition-all duration-300 ${isVerified ? 'fill-primary/20 stroke-primary' : 'fill-primary/5 stroke-white/40'} stroke-2`} 
                points={`20,80 80,80 ${posC.x},${posC.y}`} 
                strokeLinejoin="round"
              ></polygon>

              {/* Static Vertices A and B */}
              <circle cx="20" cy="80" r="2.5" className="fill-white" />
              <circle cx="80" cy="80" r="2.5" className="fill-white" />

              {/* Draggable Vertex C */}
              <circle 
                cx={posC.x} 
                cy={posC.y} 
                r="4" 
                className={`cursor-grab active:cursor-grabbing transition-shadow ${isDragging ? 'fill-primary shadow-[0_0_15px_#13ec5b]' : 'fill-primary/80'}`}
                onPointerDown={handlePointerDown}
                style={{ filter: 'drop-shadow(0 0 8px rgba(19, 236, 91, 0.6))' }}
              />
            </svg>

            {/* Labels */}
            <div className="absolute left-[20%] bottom-[5%] -translate-x-1/2 text-[10px] font-bold text-white/50">A (2, 2)</div>
            <div className="absolute left-[80%] bottom-[5%] -translate-x-1/2 text-[10px] font-bold text-white/50">B (8, 2)</div>
            <div 
              className="absolute pointer-events-none transition-all duration-75"
              style={{ left: `${posC.x}%`, top: `${posC.y - 12}%`, transform: 'translateX(-50%)' }}
            >
              <div className="bg-primary text-background-dark px-2 py-0.5 rounded text-[10px] font-bold shadow-lg flex items-center gap-1">
                <span>C ({logicalX}, {logicalY})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <div className={`bg-white dark:bg-surface-dark rounded-xl p-5 shadow-sm border border-slate-200 dark:border-white/5 mb-6 transition-all ${isVerified ? 'opacity-60 grayscale' : ''}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold">1</div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white">Recuento de Elementos</h3>
          </div>
          <div className="space-y-5 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400">Total Vértices</label>
                <input 
                  value={vCount}
                  onChange={(e) => setVCount(e.target.value)}
                  disabled={isVerified}
                  className="w-full bg-slate-50 dark:bg-black/30 border border-slate-300 dark:border-white/10 rounded-lg py-3 px-3 text-center font-mono text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20 transition-all" 
                  placeholder="#" 
                  type="number"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400">Total Segmentos</label>
                <input 
                  value={sCount}
                  onChange={(e) => setSCount(e.target.value)}
                  disabled={isVerified}
                  className="w-full bg-slate-50 dark:bg-black/30 border border-slate-300 dark:border-white/10 rounded-lg py-3 px-3 text-center font-mono text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20 transition-all" 
                  placeholder="#" 
                  type="number"
                />
              </div>
            </div>
          </div>
          <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 flex gap-3 items-start">
            <span className="material-symbols-outlined text-primary mt-0.5 text-sm">lightbulb</span>
            <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
              Recuerda: Los vértices son los puntos donde se unen los lados. Mueve el punto C a la altura correcta y cuenta las esquinas.
            </p>
          </div>
        </div>

        {/* Feedback Panel */}
        {showFeedback && (
          <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-xl p-4 mb-24 animate-in zoom-in-95">
            <div className="flex gap-3">
              <div className="bg-primary rounded-full p-1 h-fit shrink-0">
                <span className="material-symbols-outlined text-black text-sm font-bold">check</span>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">¡Objetivo Logrado!</h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  Has posicionado correctamente el Vértice C en (5, 8). La figura resultante es un triángulo con <span className="text-primary font-bold">3 vértices</span> y <span className="text-primary font-bold">3 segmentos</span> (lados).
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-background-dark/95 backdrop-blur-md border-t border-slate-200 dark:border-white/10 p-4 pb-8 z-40 max-w-md mx-auto">
        {!isVerified ? (
          <button 
            onClick={handleValidate}
            className="w-full bg-primary text-background-dark font-bold text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(19,236,91,0.3)] hover:shadow-[0_0_30px_rgba(19,236,91,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Validar Respuesta</span>
            <span className="material-symbols-outlined">verified</span>
          </button>
        ) : (
          <button 
            onClick={onNext}
            className="w-full bg-primary text-background-dark font-bold text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(19,236,91,0.3)] hover:shadow-[0_0_30px_rgba(19,236,91,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 animate-in slide-in-from-bottom-2"
          >
            <span>Continuar (+40 XP)</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default LessonChallenge;
