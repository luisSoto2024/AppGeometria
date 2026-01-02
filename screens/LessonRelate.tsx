
import React, { useState } from 'react';
import { UserProgress } from '../types';

interface LessonRelateProps {
  user: UserProgress;
  onBack: () => void;
  onNext: () => void;
}

const LessonRelate: React.FC<LessonRelateProps> = ({ user, onBack, onNext }) => {
  // Step 1 State
  const [step1Selection, setStep1Selection] = useState<string | null>(null);
  const [step1Verified, setStep1Verified] = useState(false);

  // Step 2 State
  const [step2Selection, setStep2Selection] = useState<string | null>(null);
  const [step2Verified, setStep2Verified] = useState(false);

  const step1Correct = "Vértice";
  const step2Correct = "Segmento";

  const handleVerifyStep1 = () => {
    if (step1Selection) setStep1Verified(true);
  };

  const handleVerifyStep2 = () => {
    if (step2Selection) setStep2Verified(true);
  };

  const isAllComplete = step1Verified && step1Selection === step1Correct && step2Verified && step2Selection === step2Correct;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white selection:bg-primary selection:text-black">
      <header className="sticky top-0 z-50 flex items-center justify-between bg-background-light/90 dark:bg-background-dark/90 px-4 py-3 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
        <button 
          onClick={onBack}
          className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-sm font-medium opacity-70 tracking-wide uppercase">Lección 1</h2>
          <h1 className="text-base font-bold leading-tight">Relaciona Elementos</h1>
        </div>
        <div className="flex items-center justify-end gap-1 px-3 py-1 bg-surface-dark/10 dark:bg-surface-dark rounded-full border border-gray-200 dark:border-white/5">
          <span className="material-symbols-outlined text-primary text-lg">bolt</span>
          <p className="text-primary text-sm font-bold">{user.xp}</p>
        </div>
      </header>

      <main className="flex-1 flex flex-col gap-6 p-5 pb-32">
        <div className="flex w-full flex-row items-center justify-center gap-2">
          <div className="h-1.5 w-8 rounded-full bg-primary shadow-[0_0_10px_rgba(19,236,91,0.5)]"></div>
          <div className="h-1.5 w-8 rounded-full bg-primary shadow-[0_0_10px_rgba(19,236,91,0.5)]"></div>
          <div className="h-1.5 w-2 rounded-full bg-gray-300 dark:bg-white/20"></div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Puntos y Segmentos</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Identifica cómo se conectan los elementos básicos en la figura.</p>
        </div>

        {/* Interactive SVG Display */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-white/10 bg-surface-light dark:bg-surface-dark group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 100 100">
              <defs>
                <pattern height="10" id="grid" patternUnits="userSpaceOnUse" width="10">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.5"></path>
                </pattern>
              </defs>
              <rect className="text-white" fill="url(#grid)" height="100" width="100"></rect>
              <polygon fill="none" points="50,15 20,85 80,85" stroke="#13ec5b" strokeOpacity="0.3" strokeWidth="1"></polygon>
              
              <line 
                className={`${step1Verified && step1Selection === step1Correct ? 'animate-pulse' : 'opacity-20'}`} 
                stroke="#13ec5b" 
                strokeLinecap="round" 
                strokeWidth="3" 
                x1="50" x2="80" y1="15" y2="85"
              ></line>
              
              <circle className={`${step1Selection === 'Vértice' ? 'fill-primary' : 'fill-white'} stroke-primary`} cx="50" cy="15" r="3" strokeWidth="1.5"></circle>
              <circle className="fill-white opacity-50" cx="20" cy="85" r="2"></circle>
              <circle className={`${step1Selection === 'Vértice' ? 'fill-primary' : 'fill-white'} stroke-primary`} cx="80" cy="85" r="3" strokeWidth="1.5"></circle>
              
              <text fill="white" fontFamily="Lexend" fontSize="6" fontWeight="bold" textAnchor="middle" x="50" y="9">A</text>
              <text fill="white" fontFamily="Lexend" fontSize="6" fontWeight="bold" textAnchor="middle" x="15" y="88">B</text>
              <text fill="white" fontFamily="Lexend" fontSize="6" fontWeight="bold" textAnchor="middle" x="85" y="88">C</text>
            </svg>
          </div>
          <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-xs font-mono text-primary border border-primary/20">
            Figura AC
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className={`flex flex-col rounded-xl p-5 border transition-all ${step1Verified && step1Selection === step1Correct ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-white/10 bg-white dark:bg-surface-dark'}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={`flex items-center justify-center size-6 rounded-full text-xs font-bold ${step1Verified && step1Selection === step1Correct ? 'bg-primary text-black' : 'bg-gray-200 dark:bg-white/10 text-gray-500'}`}>1</span>
                <h4 className="font-bold">Ubicaciones exactas</h4>
              </div>
              {step1Verified && step1Selection === step1Correct && (
                <span className="material-symbols-outlined text-primary">check_circle</span>
              )}
            </div>
            
            <p className="text-sm opacity-80 mb-4">¿Qué nombre reciben los puntos de unión A, B y C en esta figura?</p>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              {['Punto', 'Recta', 'Vértice', 'Ángulo'].map((opt) => (
                <button
                  key={opt}
                  disabled={step1Verified && step1Selection === step1Correct}
                  onClick={() => { setStep1Selection(opt); setStep1Verified(false); }}
                  className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                    step1Selection === opt 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {!step1Verified && step1Selection && (
              <button 
                onClick={handleVerifyStep1}
                className="w-full py-2 bg-primary text-black font-bold rounded-lg text-sm mb-2"
              >
                Verificar
              </button>
            )}

            {step1Verified && (
              <div className={`p-3 rounded-lg text-xs flex gap-2 items-start animate-in fade-in slide-in-from-top-1 ${step1Selection === step1Correct ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                <span className="material-symbols-outlined text-sm">{step1Selection === step1Correct ? 'lightbulb' : 'error'}</span>
                <p>
                  {step1Selection === step1Correct 
                    ? '¡Correcto! Los vértices son los puntos donde se encuentran los lados de una figura.' 
                    : 'Cerca, pero esos puntos específicos donde se unen los lados se llaman vértices.'}
                </p>
              </div>
            )}
          </div>

          <div className={`flex flex-col rounded-xl p-5 border transition-all ${!step1Verified || step1Selection !== step1Correct ? 'opacity-50 grayscale pointer-events-none' : ''} ${step2Verified && step2Selection === step2Correct ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-white/10 bg-white dark:bg-surface-dark'}`}>
            <div className="flex items-center gap-2 mb-4">
              <span className={`flex items-center justify-center size-6 rounded-full text-xs font-bold ${step2Verified && step2Selection === step2Correct ? 'bg-primary text-black' : 'bg-gray-200 dark:bg-white/10 text-gray-500'}`}>2</span>
              <h4 className="font-bold">Conexión entre Puntos</h4>
            </div>
            
            <p className="text-sm opacity-80 mb-4 leading-relaxed">
              Observa la línea resaltada que une el vértice <strong>A</strong> con el <strong>C</strong>. ¿Qué elemento representa?
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button 
                disabled={step2Verified && step2Selection === step2Correct}
                onClick={() => { setStep2Selection('Segmento'); setStep2Verified(false); }}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${step2Selection === 'Segmento' ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 dark:border-white/5'}`}
              >
                <span className="material-symbols-outlined mb-1">linear_scale</span>
                <span className="text-sm font-bold">Segmento</span>
              </button>
              <button 
                disabled={step2Verified && step2Selection === step2Correct}
                onClick={() => { setStep2Selection('Rayo'); setStep2Verified(false); }}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${step2Selection === 'Rayo' ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-gray-200 dark:border-white/5'}`}
              >
                <span className="material-symbols-outlined mb-1">timeline</span>
                <span className="text-sm font-bold">Rayo</span>
              </button>
            </div>

            {!step2Verified && step2Selection && (
              <button 
                onClick={handleVerifyStep2}
                className="w-full py-2 bg-primary text-black font-bold rounded-lg text-sm mb-2"
              >
                Verificar
              </button>
            )}

            {step2Verified && (
              <div className={`p-3 rounded-lg text-xs flex gap-2 items-start animate-in fade-in slide-in-from-top-1 ${step2Selection === step2Correct ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                <span className="material-symbols-outlined text-sm">{step2Selection === step2Correct ? 'check_circle' : 'cancel'}</span>
                <div>
                  <p className="font-bold mb-1">{step2Selection === step2Correct ? '¡Excelente!' : '¡Oops!'}</p>
                  <p>
                    {step2Selection === step2Correct 
                      ? 'Un segmento es la parte de una recta delimitada por dos puntos extremos.' 
                      : 'El rayo tiene un origen pero es infinito en una dirección. Aquí la línea termina en A y C.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className={`flex items-start gap-4 p-5 rounded-xl border transition-all ${!isAllComplete ? 'opacity-30 grayscale' : 'bg-primary/5 border-primary animate-in zoom-in-95'}`}>
            <div className="flex items-center justify-center size-10 bg-primary/20 text-primary rounded-full shrink-0">
              <span className="material-symbols-outlined">{isAllComplete ? 'verified' : 'lock'}</span>
            </div>
            <div className="flex-1">
              <h4 className="text-base font-bold">Conclusión</h4>
              <p className="text-xs leading-relaxed opacity-80">
                {isAllComplete 
                  ? 'Has demostrado que entiendes cómo los vértices (puntos) y los segmentos (líneas) trabajan juntos para dar forma a las figuras geométricas.' 
                  : 'Completa los pasos anteriores para ver la conclusión de esta sección.'}
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/80 dark:bg-background-dark/95 backdrop-blur-xl border-t border-gray-200 dark:border-white/10 z-40 max-w-md mx-auto">
        <button 
          onClick={onNext}
          disabled={!isAllComplete}
          className="w-full bg-primary hover:bg-primary/90 text-black text-lg font-bold py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(19,236,91,0.3)] flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
        >
          <span>Continuar (+30 XP)</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default LessonRelate;
