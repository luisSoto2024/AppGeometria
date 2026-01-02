
import React from 'react';

interface LessonSummaryProps {
  onNext: () => void;
}

const LessonSummary: React.FC<LessonSummaryProps> = ({ onNext }) => {
  const summaryPoints = [
    { icon: 'polyline', title: 'Vértices y Segmentos', text: 'Identificaste los puntos y las líneas que construyen toda figura.' },
    { icon: 'square_foot', title: 'Cuadrado vs Rectángulo', text: 'Aprendiste que todo cuadrado es rectángulo por sus 4 ángulos rectos.' },
    { icon: 'category', title: 'Clasificación', text: 'Diferenciaste entre polígonos de 3 y 4 lados con éxito.' },
  ];

  return (
    <div className="bg-background-dark text-white min-h-screen flex flex-col font-display max-w-md mx-auto relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-primary/10 to-transparent"></div>
      <div className="absolute top-20 right-[-20px] size-40 border border-primary/10 rounded-full"></div>
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 z-10">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
          <div className="relative size-32 bg-surface-dark border-4 border-primary rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(19,236,91,0.3)] rotate-12">
            <span className="material-symbols-outlined text-primary text-6xl filled" style={{ fontVariationSettings: "'FILL' 1" }}>celebration</span>
          </div>
        </div>

        <h1 className="text-4xl font-black text-center mb-2 tracking-tight">¡Lección<br/>Superada!</h1>
        <p className="text-text-secondary text-center text-sm mb-10 max-w-[250px]">
          Has demostrado un gran dominio de los fundamentos geométricos.
        </p>

        <div className="w-full space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-primary px-1">Lo que aprendiste:</h3>
          {summaryPoints.map((point, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-2xl bg-surface-dark/50 border border-white/5 animate-in slide-in-from-right duration-500" style={{ animationDelay: `${i * 150}ms` }}>
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-2xl">{point.icon}</span>
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-sm text-white">{point.title}</h4>
                <p className="text-xs text-text-secondary leading-relaxed">{point.text}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="p-6 bg-background-dark/95 backdrop-blur-md border-t border-white/5">
        <button 
          onClick={onNext}
          className="w-full h-14 bg-primary text-black font-bold text-lg rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:bg-[#10d450] transition-all active:scale-[0.98]"
        >
          Finalizar Lección
          <span className="material-symbols-outlined font-bold">stars</span>
        </button>
      </div>
    </div>
  );
};

export default LessonSummary;
