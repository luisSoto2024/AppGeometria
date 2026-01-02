
import React, { useState, useRef } from 'react';
import { UserProgress } from '../types';
import { analyzeStudentResponse } from '../services/geminiService';

interface LessonJustifyProps {
  user: UserProgress;
  addXP: (amount: number) => void;
  onBack: () => void;
  onNext: () => void;
}

const LessonJustify: React.FC<LessonJustifyProps> = ({ user, addXP, onBack, onNext }) => {
  // Visualizer State
  const [corner, setCorner] = useState({ x: 75, y: 50 }); // Vértice móvil
  const [isDragging, setIsDragging] = useState(false);
  const [activeProperty, setActiveProperty] = useState<'lados' | 'angulos' | 'simetria'>('lados');
  const svgRef = useRef<SVGSVGElement>(null);

  // Argumentation State
  const [argument, setArgument] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<{ feedback: string; xp: number } | null>(null);

  const startX = 20;
  const startY = 20;
  const currentWidth = corner.x - startX;
  const currentHeight = corner.y - startY;
  const isSquare = Math.abs(currentWidth - currentHeight) < 2.5;

  const properties = {
    lados: {
      label: 'Lados',
      desc: 'El cuadrado es un rectángulo especial porque tiene sus 4 lados de igual longitud.',
      val: '4 Lados Iguales'
    },
    angulos: {
      label: 'Ángulos',
      desc: 'Ambos comparten la propiedad fundamental: ¡Tienen 4 ángulos rectos de 90°!',
      val: '4 Ángulos Rectos'
    },
    simetria: {
      label: 'Simetría',
      desc: 'El cuadrado tiene 4 ejes, mientras que el rectángulo genérico solo tiene 2.',
      val: '4 Ejes (Cuadrado)'
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !svgRef.current || aiFeedback) return;
    const svg = svgRef.current;
    const CTM = svg.getScreenCTM();
    if (!CTM) return;

    const x = (e.clientX - CTM.e) / CTM.a;
    const y = (e.clientY - CTM.f) / CTM.d;

    // Snapping and constraints
    let boundedX = Math.max(30, Math.min(85, x));
    let boundedY = Math.max(30, Math.min(85, y));

    // Snapping to square if close
    if (Math.abs((boundedX - startX) - (boundedY - startY)) < 5) {
      const avg = ((boundedX - startX) + (boundedY - startY)) / 2;
      boundedX = startX + avg;
      boundedY = startY + avg;
    }

    setCorner({ x: boundedX, y: boundedY });
  };

  const handleSendArgument = async () => {
    if (!argument.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeStudentResponse(
        "Relación Cuadrado-Rectángulo",
        "Propiedad Inclusiva",
        argument
      );
      setAiFeedback(result);
      addXP(result.xp);
    } catch (err) {
      setAiFeedback({
        feedback: "¡Excelente! La clave es que el cuadrado cumple con la definición de rectángulo: tener 4 ángulos rectos.",
        xp: 25
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white min-h-screen flex flex-col overflow-x-hidden max-w-md mx-auto shadow-2xl relative">
      {/* Custom Scrollbar Style */}
      <style>{`
        textarea::-webkit-scrollbar { width: 8px; }
        textarea::-webkit-scrollbar-track { background: transparent; }
        textarea::-webkit-scrollbar-thumb { background-color: #3b5443; border-radius: 20px; }
      `}</style>

      {/* Header */}
      <div className="flex items-center p-4 pb-2 justify-between bg-background-light dark:bg-background-dark sticky top-0 z-20">
        <button onClick={onBack} className="text-gray-900 dark:text-white flex size-12 shrink-0 items-center justify-center hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Fase 4: Justifica</h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex items-center justify-center rounded-xl size-12 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined">lightbulb</span>
          </button>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="flex w-full flex-row items-center justify-center gap-3 py-2 px-4">
        <div className="h-1.5 w-1.5 rounded-full bg-primary/40"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-primary/40"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-primary/40"></div>
        <div className="h-2 w-8 rounded-full bg-primary shadow-[0_0_8px_rgba(19,236,91,0.4)]"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      </div>

      <main className="flex-1 flex flex-col p-4 gap-5 pb-32 overflow-y-auto no-scrollbar">
        {/* Interactive Visualizer Section */}
        <div className="flex flex-col items-stretch justify-start rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark overflow-hidden">
          <div className="relative w-full aspect-video bg-gray-100 dark:bg-black/40 flex flex-col items-center justify-center overflow-hidden touch-none group">
            {/* Grid Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {/* Properties Switch Overlay */}
            <div className="absolute top-3 left-0 w-full flex justify-center gap-1.5 z-30 px-4">
              {(Object.keys(properties) as Array<keyof typeof properties>).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveProperty(key)}
                  className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border ${
                    activeProperty === key 
                    ? 'bg-primary text-black border-primary shadow-[0_0_10px_rgba(19,236,91,0.4)]' 
                    : 'bg-black/50 backdrop-blur-md border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  {properties[key].label}
                </button>
              ))}
            </div>

            <svg 
              ref={svgRef}
              className="w-full h-full p-4" 
              viewBox="0 0 100 100"
              onPointerMove={handlePointerMove}
              onPointerUp={() => setIsDragging(false)}
            >
              {/* Dynamic Shape */}
              <rect 
                x={startX} y={startY} 
                width={currentWidth} height={currentHeight} 
                className={`transition-all duration-150 ${isSquare ? 'fill-primary/10 stroke-primary stroke-[2.5]' : 'fill-blue-500/10 stroke-blue-400 stroke-[1.5]'}`}
                style={{ filter: isSquare ? 'drop-shadow(0 0 8px rgba(19, 236, 91, 0.2))' : '' }}
              />

              {/* Angles Logic */}
              <g stroke={isSquare ? '#13ec5b' : '#60a5fa'} strokeWidth="1" fill="none" opacity={activeProperty === 'angulos' ? 1 : 0.3}>
                 <path d={`M ${startX} ${startY+4} L ${startX+4} ${startY+4} L ${startX+4} ${startY}`} />
                 <path d={`M ${corner.x-4} ${startY} L ${corner.x-4} ${startY+4} L ${corner.x} ${startY+4}`} />
                 <path d={`M ${corner.x} ${corner.y-4} L ${corner.x-4} ${corner.y-4} L ${corner.x-4} ${corner.y}`} />
                 <path d={`M ${startX+4} ${corner.y} L ${startX+4} ${corner.y-4} L ${startX} ${corner.y-4}`} />
              </g>

              {/* Symmetry Logic */}
              {activeProperty === 'simetria' && (
                <g stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2 1" className="animate-in fade-in">
                  <line x1={startX} y1={startY} x2={corner.x} y2={corner.y} />
                  <line x1={corner.x} y1={startY} x2={startX} y2={corner.y} />
                  {isSquare && (
                    <>
                      <line x1={(startX+corner.x)/2} y1={startY} x2={(startX+corner.x)/2} y2={corner.y} />
                      <line x1={startX} y1={(startY+corner.y)/2} x2={corner.x} y2={(startY+corner.y)/2} />
                    </>
                  )}
                </g>
              )}

              {/* Draggable Handle */}
              {!aiFeedback && (
                <circle 
                  cx={corner.x} cy={corner.y} r="3.5" 
                  className={`cursor-grab active:cursor-grabbing fill-white transition-all ${isDragging ? 'scale-150' : ''}`}
                  onPointerDown={() => setIsDragging(true)}
                  style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.8))' }}
                />
              )}
            </svg>

            {/* Visual Status Indicator */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
              <span className={`material-symbols-outlined text-sm ${isSquare ? 'text-primary' : 'text-blue-400'}`}>
                {isSquare ? 'verified' : 'rect'}
              </span>
              <span className="text-[9px] font-black uppercase text-white">
                {isSquare ? 'Cuadrado Perfecto' : 'Rectángulo'}
              </span>
            </div>
          </div>

          <div className="flex w-full grow flex-col items-stretch justify-center gap-2 p-5">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-green-700 dark:text-primary border border-primary/20 uppercase tracking-widest">
                  {properties[activeProperty].val}
                </span>
              </div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Interactúa con el vértice</span>
            </div>
            <h3 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-tight">¿Por qué todo cuadrado es también un rectángulo?</h3>
            <p className="text-gray-600 dark:text-[#9db9a6] text-sm font-normal leading-relaxed">
              {properties[activeProperty].desc}
            </p>
          </div>
        </div>

        {/* Definitions Accordion */}
        <details className="group flex flex-col rounded-xl border border-gray-200 dark:border-[#3b5443] bg-surface-light dark:bg-surface-dark px-4 overflow-hidden transition-all duration-300">
          <summary className="flex cursor-pointer items-center justify-between gap-4 py-3 select-none">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <span className="material-symbols-outlined text-lg">square_foot</span>
              </div>
              <p className="text-gray-900 dark:text-white text-sm font-medium">Recordatorio: Definiciones</p>
            </div>
            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 transition-transform group-open:rotate-180">expand_more</span>
          </summary>
          <div className="pt-0 pb-4 pl-[44px] animate-in slide-in-from-top-2">
            <p className="text-gray-600 dark:text-[#9db9a6] text-sm mb-2"><strong>Rectángulo:</strong> Cuadrilátero con 4 ángulos rectos (90°).</p>
            <div className="p-3 bg-gray-100 dark:bg-black/20 rounded-lg border border-gray-200 dark:border-white/5">
              <p className="text-gray-600 dark:text-[#9db9a6] text-sm mb-1"><strong>Cuadrado:</strong> Cuadrilátero con 4 lados iguales y 4 ángulos rectos.</p>
            </div>
          </div>
        </details>

        {/* Argumentation Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-gray-900 dark:text-white tracking-tight text-lg font-bold leading-tight px-1">Argumenta tu respuesta:</h3>
          
          <div className="flex flex-wrap gap-2 mb-1">
            {[
              "Ambos tienen ángulos de 90°",
              "La condición para ser rectángulo es...",
              "Sus lados opuestos son paralelos"
            ].map(chip => (
              <button 
                key={chip}
                onClick={() => setArgument(prev => prev + (prev ? ' ' : '') + chip)}
                disabled={!!aiFeedback}
                className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase bg-gray-100 dark:bg-white/5 hover:bg-primary/20 hover:text-green-700 dark:hover:text-primary border border-transparent hover:border-primary/50 transition-all text-gray-600 dark:text-gray-300 disabled:opacity-30"
              >
                {chip}
              </button>
            ))}
          </div>

          <div className="relative group">
            <textarea 
              value={argument}
              onChange={(e) => setArgument(e.target.value)}
              disabled={!!aiFeedback || isAnalyzing}
              className="w-full h-32 bg-surface-light dark:bg-surface-dark border-2 border-gray-200 dark:border-[#3b5443] rounded-xl p-4 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#9db9a6]/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none transition-all shadow-inner disabled:opacity-70" 
              placeholder="Escribe tu justificación aquí. Por ejemplo: 'Sí, porque ambos tienen 4 ángulos de 90°...'"
            />
            {!aiFeedback && (
              <div className="absolute bottom-3 right-3 pointer-events-none">
                <span className="material-symbols-outlined text-gray-300 dark:text-[#3b5443]">edit</span>
              </div>
            )}
          </div>

          {/* AI Tutor Feedback */}
          {aiFeedback && (
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 animate-in zoom-in-95 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined text-base">psychology</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">Tutor Gemini</span>
                </div>
                <div className="px-2 py-0.5 bg-primary text-black rounded text-[10px] font-black">+{aiFeedback.xp} XP</div>
              </div>
              <p className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed italic">
                "{aiFeedback.feedback}"
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-background-light dark:bg-background-dark/95 backdrop-blur-md border-t border-gray-200 dark:border-white/5 z-20 max-w-md mx-auto">
        {!aiFeedback ? (
          <button 
            onClick={handleSendArgument}
            disabled={!argument.trim() || isAnalyzing}
            className="w-full flex items-center justify-center gap-2 h-14 bg-primary hover:bg-[#10d450] active:scale-[0.98] text-black font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(19,236,91,0.3)] transition-all disabled:opacity-50 disabled:grayscale"
          >
            {isAnalyzing ? (
              <div className="size-6 border-4 border-black/30 border-t-black rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Enviar Argumento</span>
                <span className="material-symbols-outlined font-bold">send</span>
              </>
            )}
          </button>
        ) : (
          <button 
            onClick={onNext}
            className="w-full flex items-center justify-center gap-2 h-14 bg-primary hover:bg-[#10d450] active:scale-[0.98] text-black font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(19,236,91,0.4)] transition-all animate-bounce-subtle"
          >
            <span>Ir a Reto Final</span>
            <span className="material-symbols-outlined font-bold">arrow_forward</span>
          </button>
        )}
      </div>

      <style>{`
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite ease-in-out;
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default LessonJustify;
