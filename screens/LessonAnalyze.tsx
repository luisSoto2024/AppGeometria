
import React, { useState } from 'react';
import { UserProgress } from '../types';
import { analyzeStudentResponse } from '../services/geminiService';

interface LessonAnalyzeProps {
  user: UserProgress;
  addXP: (amount: number) => void;
  onBack: () => void;
  onNext: () => void;
}

const LessonAnalyze: React.FC<LessonAnalyzeProps> = ({ user, addXP, onBack, onNext }) => {
  const [activeFilter, setActiveFilter] = useState<'lados' | 'angulos' | 'simetria'>('angulos');
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizVerified, setQuizVerified] = useState(false);
  const [quizError, setQuizError] = useState(false);
  
  // IA Argumentation States
  const [argument, setArgument] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<{ feedback: string, xp: number } | null>(null);

  const filters = {
    lados: {
      label: 'Lados',
      title: 'Propiedad de los Lados',
      info: 'Los lados son los segmentos que limitan la figura. Un cuadrado tiene exactamente 4 lados iguales y son paralelos dos a dos.',
      count: '4 Lados Iguales'
    },
    angulos: {
      label: 'Ángulos',
      title: 'Propiedad Angular',
      info: 'Los ángulos son la abertura entre dos lados. En el cuadrado, los 4 ángulos internos son rectos, es decir, miden exactamente 90°.',
      count: '4 Ángulos de 90°'
    },
    simetria: {
      label: 'Simetría',
      title: 'Ejes de Simetría',
      info: 'La simetría es la correspondencia exacta de las partes. El cuadrado tiene 4 ejes de simetría: 2 pasan por los puntos medios y 2 son sus diagonales.',
      count: '4 Ejes de Simetría'
    }
  };

  const quizOptions = [
    "Suman 180°",
    "Son todos rectos (90°)",
    "Son todos agudos (<90°)"
  ];
  const correctQuizIndex = 1;

  const handleVerifyQuiz = () => {
    if (selectedQuizOption === correctQuizIndex) {
      setQuizVerified(true);
      setQuizError(false);
      addXP(25);
    } else {
      setQuizError(true);
      setTimeout(() => setQuizError(false), 2000);
    }
  };

  const handleSendArgument = async () => {
    if (!argument.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeStudentResponse("Cuadrado", "Propiedad Angular", argument);
      setAiFeedback(result);
      addXP(result.xp);
    } catch (err) {
      setAiFeedback({
        feedback: "¡Buen intento! Recuerda que un cuadrado debe tener sus 4 ángulos rectos. Si uno cambia, la figura se deforma.",
        xp: 15
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark font-display antialiased overflow-x-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-4 pb-2 z-20 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-white/5">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all text-white">
          <span className="material-symbols-outlined text-2xl">chevron_left</span>
        </button>
        <h2 className="text-white text-lg font-bold tracking-tight">Lección 1: El Cuadrado</h2>
        <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          <span className="material-symbols-outlined text-primary text-sm">bolt</span>
          <span className="text-primary font-bold text-xs">{user.xp}</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col p-4 gap-6 pb-32">
        {/* Visualizer Card */}
        <div className="relative w-full aspect-[4/5] bg-surface-dark rounded-2xl border border-white/5 shadow-inner overflow-hidden flex flex-col group">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          {/* Action Buttons Overlay */}
          <div className="absolute top-4 left-0 w-full flex justify-center gap-2 z-30 px-4">
            {(Object.keys(filters) as Array<keyof typeof filters>).map((key) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                  activeFilter === key 
                  ? 'bg-primary text-background-dark border-primary shadow-[0_0_10px_rgba(19,236,91,0.4)]' 
                  : 'bg-surface-dark border-white/10 text-gray-400 hover:bg-white/5'
                }`}
              >
                {filters[key].label}
              </button>
            ))}
          </div>

          {/* SVG Canvas - PERFECT SQUARE (1:1) */}
          <div className="flex-1 flex items-center justify-center p-12">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(19,236,91,0.1)]">
              {/* The Square */}
              <rect 
                x="20" y="20" width="60" height="60" 
                fill="rgba(19, 236, 91, 0.05)" 
                stroke={activeFilter === 'lados' ? '#13ec5b' : 'white'} 
                strokeWidth={activeFilter === 'lados' ? '3' : '1.5'}
                className="transition-all duration-300"
              />
              
              {/* Angles markers */}
              {activeFilter === 'angulos' && (
                <g className="animate-in fade-in zoom-in-95" stroke="#13ec5b" strokeWidth="2">
                  <path d="M 20 28 L 28 28 L 28 20" fill="none" />
                  <path d="M 72 20 L 72 28 L 80 28" fill="none" />
                  <path d="M 80 72 L 72 72 L 72 80" fill="none" />
                  <path d="M 28 80 L 28 72 L 20 72" fill="none" />
                </g>
              )}

              {/* Symmetry axes */}
              {activeFilter === 'simetria' && (
                <g className="animate-in fade-in duration-500" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 2">
                  <line x1="20" y1="20" x2="80" y2="80" />
                  <line x1="80" y1="20" x2="20" y2="80" />
                  <line x1="50" y1="20" x2="50" y2="80" />
                  <line x1="20" y1="50" x2="80" y2="50" />
                </g>
              )}
            </svg>
          </div>

          {/* New Detailed Property Info Panel (Beneath Square) */}
          <div className="bg-black/60 backdrop-blur-xl p-5 border-t border-white/10 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">verified</span>
                <h4 className="text-white font-bold text-sm tracking-tight">{filters[activeFilter].title}</h4>
              </div>
              <span className="text-[10px] font-black bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/30 uppercase">
                {filters[activeFilter].count}
              </span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed font-light">
              {filters[activeFilter].info}
            </p>
          </div>
        </div>

        {/* Phase 1: Quiz */}
        <div className="flex flex-col gap-4 bg-surface-dark/40 p-5 rounded-2xl border border-white/5">
          <div className="flex flex-col">
            <h3 className="text-white font-bold text-lg mb-1">Comprobación rápida</h3>
            <p className="text-gray-400 text-xs">Según lo observado en los filtros, ¿cómo son los ángulos del cuadrado?</p>
          </div>

          <div className="flex flex-col gap-2">
            {quizOptions.map((opt, i) => (
              <button
                key={i}
                disabled={quizVerified}
                onClick={() => setSelectedQuizOption(i)}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                  selectedQuizOption === i 
                  ? quizVerified 
                    ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(19,236,91,0.2)]' 
                    : 'bg-white/10 border-white/30 text-white'
                  : 'bg-surface-dark border-white/5 text-gray-400 hover:bg-white/5'
                }`}
              >
                <div className={`size-5 rounded-full border-2 flex items-center justify-center ${selectedQuizOption === i ? 'border-primary' : 'border-gray-600'}`}>
                  {selectedQuizOption === i && <div className="size-2.5 rounded-full bg-primary animate-pulse"></div>}
                </div>
                <span className="text-sm font-medium">{opt}</span>
                {quizVerified && i === correctQuizIndex && <span className="material-symbols-outlined ml-auto text-primary animate-in zoom-in">verified</span>}
              </button>
            ))}
          </div>

          {!quizVerified && (
            <button
              onClick={handleVerifyQuiz}
              disabled={selectedQuizOption === null}
              className="w-full h-14 bg-primary text-background-dark font-bold rounded-xl shadow-[0_4px_15px_rgba(19,236,91,0.3)] disabled:opacity-50 transition-all active:scale-[0.98]"
            >
              Verificar Respuesta
            </button>
          )}

          {quizError && (
            <p className="text-red-400 text-[10px] font-bold text-center animate-bounce uppercase tracking-tighter">
              ¡Incorrecto! Revisa el recordatorio de "Ángulos" en el panel de arriba.
            </p>
          )}
        </div>

        {/* Phase 2: AI Argumentation (Only after quiz) */}
        {quizVerified && (
          <div className="flex flex-col gap-4 p-5 rounded-2xl bg-surface-dark border border-white/10 animate-in zoom-in-95 duration-500 mb-10 shadow-2xl">
            <div className="flex items-center gap-3 mb-1">
              <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <h4 className="text-white font-bold">Análisis con IA</h4>
            </div>
            
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong>Pregunta de reflexión:</strong> ¿Qué característica perdería un cuadrado si sus lados dejaran de ser paralelos?
            </p>

            <textarea
              value={argument}
              onChange={(e) => setArgument(e.target.value)}
              disabled={!!aiFeedback || isAnalyzing}
              className="w-full h-24 bg-background-dark border border-white/10 rounded-xl p-3 text-sm text-white placeholder:text-gray-700 focus:border-primary transition-all resize-none shadow-inner"
              placeholder="Escribe tu razonamiento técnico..."
            />

            {!aiFeedback ? (
              <button
                onClick={handleSendArgument}
                disabled={!argument.trim() || isAnalyzing}
                className="w-full h-12 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>Analizar con Gemini <span className="material-symbols-outlined text-sm">send</span></>
                )}
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 animate-in slide-in-from-top-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase text-primary tracking-widest">Feedback Técnico</span>
                  <span className="text-[10px] font-bold bg-primary text-black px-2 py-0.5 rounded shadow-sm">+{aiFeedback.xp} XP</span>
                </div>
                <p className="text-xs text-gray-200 leading-relaxed italic">
                  "{aiFeedback.feedback}"
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Final Action Button */}
      {aiFeedback && (
        <div className="fixed bottom-0 left-0 w-full p-4 bg-background-dark/95 backdrop-blur-md border-t border-white/5 z-40 max-w-md mx-auto">
          <button 
            onClick={onNext}
            className="w-full h-14 bg-primary text-background-dark font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(19,236,91,0.4)] flex items-center justify-center gap-2 hover:bg-[#10d450] transition-all animate-bounce-subtle"
          >
            Continuar Aventura
            <span className="material-symbols-outlined font-bold">arrow_forward</span>
          </button>
        </div>
      )}

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

export default LessonAnalyze;
