
import React from 'react';

interface LoginProps {
  onBack: () => void;
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onBack, onLogin }) => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-background-dark font-display overflow-x-hidden">
      <header className="flex items-center p-4 justify-between z-10">
        <button 
          onClick={onBack}
          className="text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
      </header>

      <div className="flex-1 flex flex-col px-6 pb-6 max-w-md mx-auto w-full z-10">
        <div className="mb-6 py-4 flex justify-center">
          <div 
            className="w-full aspect-[16/9] rounded-xl bg-center bg-cover shadow-2xl shadow-primary/10 border border-white/5 relative overflow-hidden group"
            style={{backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDkImPUeqMo1LKF48yX76O1Pw-YiIkrnEMEnL6lS7fFLp6o6DODKZjwnbgaCFzjhsV8z5iIKngQg5KASmvDJAYqkQTdltB0jchz45sXVCuPIrE8osLD7KgoO2Qy6iNt2tWjg8W4tpPU4kG6OiLI9PsshjlZQTnc2TJUkZulpMayDoMLaCeCPIumbDDF5SYpxhaXv_RZoS6SLKcIJ2EAlbBkP-bwIYg3TOC7CULM2_8t0k2ViAfNf_qhqZA-YnXUy0E7AYqmc4PlynQ")`}}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent opacity-80"></div>
            <div className="absolute bottom-4 left-4">
              <span className="inline-flex items-center justify-center size-10 rounded-full bg-primary text-background-dark mb-2">
                <span className="material-symbols-outlined">change_history</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-white text-[32px] font-bold leading-tight tracking-tight mb-2">¡Bienvenido de nuevo!</h1>
          <p className="text-gray-400 text-base font-normal">Tu aventura geométrica te espera.</p>
        </div>

        <form className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-semibold ml-1">Correo Electrónico</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-500 material-symbols-outlined">mail</span>
              <input 
                className="w-full bg-surface-dark border border-white/10 rounded-xl h-14 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                placeholder="estudiante@escuela.edu.co" 
                type="email"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-semibold ml-1">Contraseña</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-500 material-symbols-outlined">lock</span>
              <input 
                className="w-full bg-surface-dark border border-white/10 rounded-xl h-14 pl-12 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                placeholder="••••••••" 
                type="password"
              />
              <button className="absolute right-0 top-0 bottom-0 px-4 text-gray-500 hover:text-primary transition-colors flex items-center justify-center" type="button">
                <span className="material-symbols-outlined">visibility_off</span>
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <button type="button" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">¿Olvidaste tu contraseña?</button>
            </div>
          </div>

          <button 
            onClick={onLogin}
            className="mt-2 w-full bg-primary hover:bg-primary/90 text-background-dark font-bold text-lg h-14 rounded-xl shadow-[0_0_20px_-5px_rgba(19,236,91,0.4)] hover:shadow-[0_0_25px_-5px_rgba(19,236,91,0.6)] active:scale-[0.98] transition-all flex items-center justify-center gap-2" 
            type="button"
          >
            ENTRAR
            <span className="material-symbols-outlined text-[20px] font-bold">arrow_forward</span>
          </button>
        </form>

        <div className="mt-auto pt-8 pb-4 text-center">
          <p className="text-gray-400 text-sm">
            ¿No tienes cuenta? <button className="text-primary font-bold hover:underline ml-1">Regístrate aquí</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
