
import React, { useState, useRef, useEffect } from 'react';
import { getGeometryAssistance } from '../services/geminiService';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: '¡Hola! Soy tu tutor geométrico G-Math. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    const response = await getGeometryAssistance(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: response || 'No pude procesar tu duda...' }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 size-14 rounded-full bg-primary text-background-dark shadow-lg btn-glow flex items-center justify-center z-50 hover:scale-110 transition-transform"
      >
        <span className="material-symbols-outlined text-3xl font-bold">psychology</span>
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-background-dark border border-white/10 sm:rounded-2xl h-[80vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-surface-dark/50">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">smart_toy</span>
                </div>
                <div>
                  <h3 className="font-bold text-white leading-tight">AI Tutor Geométrico</h3>
                  <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Online • Gemini Pro</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-primary text-background-dark font-medium rounded-tr-none' 
                      : 'bg-surface-dark border border-white/10 text-white rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-surface-dark border border-white/10 text-white p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <div className="size-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="size-2 bg-primary rounded-full animate-bounce delay-100"></div>
                    <div className="size-2 bg-primary rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/5 bg-background-dark">
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Pregunta sobre figuras, ángulos..."
                  className="flex-1 bg-surface-dark border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="bg-primary text-background-dark p-3 rounded-xl disabled:opacity-50 hover:bg-primary-hover transition-colors"
                >
                  <span className="material-symbols-outlined font-bold">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
