
import React, { useState } from 'react';

interface LoginProps {
  onBack: () => void;
  onLogin: (name: string, email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onBack, onLogin }) => {
  const [step, setStep] = useState<'credentials' | 'name'>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      setStep('name');
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim(), email.trim());
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-background-dark font-display overflow-x-hidden">
      <header className="flex items-center p-4 justify-between z-10">
        <button 
          onClick={step === 'name' ? () => setStep('credentials') : onBack}
          className="text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
      </header>

      <div className="flex-1 flex flex-col px-6 pb-6 max-w-md mx-auto w-full z-10">
        <div className="mb-6 py-4 flex justify-center">
          <div 
            className="w-full aspect-[16/9] rounded-xl bg-center bg-cover shadow-2xl shadow-primary/10 border border-white/5 relative overflow-hidden"
            style={{backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDkImPUeqMo1LKF48yX76O1Pw-YiIkrnEMEnL6lS7fFLp6o6DODKZjwnbgaCFzjhsV8z5iIKngQg5KASmvDJAYqkQTdltB0jchz45sXVCuPIrE8osLD7KgoO2Qy6iNt2tWjg8W4tpPU4kG6OiLI9PsshjlZQTnc2TJUkZulpMayDoMLaCeCPIumbDDF5SYpxhaXv_RZoS6SLKcIJ2EAlbBkP-bwIYg3TOC7CULM2_8t0k2ViAfNf_qhqZA-YnXUy0E7AYqmc4PlynQ")`}}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent opacity-80"></div>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-white text-[32px] font-bold leading-tight tracking-tight mb-2">
            {step === 'credentials' ? 'Bienvenido de nuevo' : '¡Casi listo!'}
          </h1>
          <p className="text-gray-400 text-base font-normal">
            {step === 'credentials' 
              ? 'Ingresa con tu correo electrónico de estudiante.' 
              : 'Dinos cómo te llamas para personalizar tu aventura.'}
          </p>
        </div>

        {step === 'credentials' ? (
          <form onSubmit={handleCredentialsSubmit} className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm font-semibold ml-1">Correo Electrónico</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-500 material-symbols-outlined">mail</span>
                <input 
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-dark border border-white/10 rounded-xl h-14 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                  placeholder="ejemplo@escuela.com" 
                  type="email"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white text-sm font-semibold ml-1">Contraseña</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-500 material-symbols-outlined">lock</span>
                <input 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-dark border border-white/10 rounded-xl h-14 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                  placeholder="••••••••" 
                  type="password"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="mt-4 w-full bg-primary hover:bg-primary/90 text-background-dark font-bold text-lg h-14 rounded-xl shadow-[0_0_20px_-5px_rgba(19,236,91,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-2" 
            >
              CONTINUAR
              <span className="material-symbols-outlined text-[20px] font-bold">arrow_forward</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleNameSubmit} className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-2 animate-in slide-in-from-right duration-300">
              <label className="text-white text-sm font-semibold ml-1">Nombre del Estudiante</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-500 material-symbols-outlined">person</span>
                <input 
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface-dark border border-white/10 rounded-xl h-14 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                  placeholder="Ej. Mateo García" 
                  type="text"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="mt-4 w-full bg-primary hover:bg-primary/90 text-background-dark font-bold text-lg h-14 rounded-xl shadow-[0_0_20px_-5px_rgba(19,236,91,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-2" 
            >
              INICIAR AVENTURA
              <span className="material-symbols-outlined text-[20px] font-bold">rocket_launch</span>
            </button>
          </form>
        )}

        <div className="mt-auto pt-8 pb-4 text-center">
          <p className="text-gray-400 text-sm">
            Tus datos se guardarán localmente vinculados a {email || 'tu cuenta'}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
