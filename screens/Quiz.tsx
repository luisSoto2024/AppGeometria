
import React, { useState } from 'react';
import { UserProgress } from '../types';

interface QuizProps {
  user: UserProgress;
  onFinish: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ user, onFinish }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [score, setScore] = useState(0);

  const totalSteps = 1; // Simplified for demo, can be expanded
  const correctAnswerIndex = 0; // Segment AB

  const handleNext = () => {
    if (selected === correctAnswerIndex) {
      setScore(s => s + 1);
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(s => s + 1);
      setSelected(null);
    } else {
      onFinish(selected === correctAnswerIndex ? score + 1 : score);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-background-dark text-white font-display max-w-md mx-auto">
      <header className="flex items-center p-4 pb-2 justify-between">
        <button onClick={() => onFinish(0)} className="size-10 flex items-center justify-center rounded-full hover:bg-white/10"><span className="material-symbols-outlined">close</span></button>
        <h2 className="text-lg font-bold">Quiz: Geometría Básica</h2>
        <div className="bg-surface-dark border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
          <p className="text-primary text-sm font-bold">{user.xp}</p>
        </div>
      </header>

      <div className="px-6 py-2">
        <div className="flex justify-between items-end mb-2 text-xs text-gray-500 font-bold uppercase">
          <span>Pregunta {currentStep} de {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300" style={{width: `${(currentStep / totalSteps) * 100}%`}}></div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto p-6 pb-32">
        <h2 className="text-[22px] font-bold leading-tight mb-6">Selecciona el segmento que es paralelo al eje X en la figura.</h2>
        
        <div className="w-full mb-8 rounded-xl overflow-hidden border border-white/5 bg-surface-dark shadow-sm">
          <div 
            className="aspect-[16/10] w-full bg-center bg-cover"
            style={{backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDcH-0RLrtvlydbT0PE3BiAZTaIUW-3lgrPQ5C7-xyl_4xvGAH37jmFaTCJZc0Gk39e8NYr33KyUpZEPSQYIoyV9z01SHr-HCjRPa7Zv0W1ytXf1dlh6Bf6VT1bWUNn6n8QdkBnLmhQc1X63UbB5dZi4T08mN1PNeDbxvtExTrmDeZD850ye_TOpG9itg4zQG6xFKaJWLIFdZfRXaavShPVg3Xa4_Cr0BOaOKkaIrU_sZCkwIoMRNqHl9zqutrwb6ztchqhpNDXxj4")`}}
          ></div>
        </div>

        <div className="flex flex-col gap-3">
          {['Segmento AB', 'Segmento BC', 'Segmento CD', 'Ninguno'].map((opt, i) => (
            <button 
              key={i}
              onClick={() => setSelected(i)}
              className={`p-5 rounded-xl border-2 text-left transition-all ${
                selected === i ? 'border-primary bg-primary/5' : 'border-white/5 bg-surface-dark hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`size-6 rounded-full border-2 flex items-center justify-center ${selected === i ? 'border-primary' : 'border-gray-600'}`}>
                  {selected === i && <div className="size-3 rounded-full bg-primary"></div>}
                </div>
                <span className={`text-base font-medium ${selected === i ? 'text-primary' : 'text-gray-300'}`}>{opt}</span>
              </div>
            </button>
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full p-4 bg-background-dark/95 border-t border-white/5 z-20 flex justify-center max-w-md mx-auto">
        <button 
          onClick={handleNext}
          disabled={selected === null}
          className="w-full py-4 rounded-xl bg-primary text-background-dark font-bold text-lg shadow-lg disabled:opacity-50"
        >
          {currentStep === totalSteps ? 'Finalizar Quiz' : 'Comprobar Respuesta'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
