
import React from 'react';
import { Screen, UserProgress } from '../types';

interface DashboardProps {
  user: UserProgress;
  navigate: (screen: Screen) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, navigate }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased selection:bg-primary selection:text-background-dark pb-24 min-h-screen">
      <header className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-white/5 pt-4 pb-2 px-4 transition-all duration-300">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer" onClick={() => navigate(Screen.Profile)}>
              <div 
                className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 ring-2 ring-primary ring-offset-2 ring-offset-background-dark" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB6nuZ7BaJkfoG0aiLE0K9aNu8X63WJzpPPqoDFuMHO7SoBfEVVi2XsUlRdb59ZP17VbXS2BAFTep4e9dnnypYHRb1PBLo2Jgx4hk4woXvFApyiFZOQMLrJep0P9KmStUsjziy0VA7f_I93NLV5vaL4Trvoib_ypWIwdkspihWm8tc7VNyjCDb6xQxVz9vZ42H7HL5fKSDs2G3aFTRIxXgI65KI84Nf2QodW9ef1tuQA5k6T6gtyGSxmzlupNqmg9t4G8neyfjjjMs")'}}
              ></div>
              <div className="absolute bottom-0 right-0 h-4 w-4 bg-primary rounded-full border-2 border-background-dark flex items-center justify-center">
                <span className="text-[8px] font-bold text-background-dark">5</span>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold leading-tight tracking-tight">Hola, Mateo!</h1>
              <p className="text-text-secondary text-xs font-normal">Explorador Geométrico</p>
            </div>
          </div>
          <button className="relative p-2 rounded-full hover:bg-surface-highlight transition-colors">
            <span className="material-symbols-outlined text-text-secondary">notifications</span>
            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
        </div>
      </header>

      <main className="flex flex-col gap-6 p-4 max-w-md mx-auto">
        <section className="grid grid-cols-2 gap-3 w-full">
          <div className="flex flex-col gap-1 rounded-2xl p-4 bg-surface-highlight border border-white/5 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 bg-orange-500/10 h-20 w-20 rounded-full group-hover:bg-orange-500/20 transition-all"></div>
            <div className="flex items-center gap-2 z-10">
              <span className="material-symbols-outlined text-orange-400 filled text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
              <p className="text-text-secondary text-xs font-medium uppercase tracking-wider">Racha</p>
            </div>
            <p className="text-2xl font-bold leading-none z-10">{user.streak} Días</p>
          </div>
          <div className="flex flex-col gap-1 rounded-2xl p-4 bg-surface-highlight border border-white/5 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 bg-blue-500/10 h-20 w-20 rounded-full group-hover:bg-blue-500/20 transition-all"></div>
            <div className="flex items-center gap-2 z-10">
              <span className="material-symbols-outlined text-blue-400 text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>diamond</span>
              <p className="text-text-secondary text-xs font-medium uppercase tracking-wider">Gemas</p>
            </div>
            <p className="text-2xl font-bold leading-none z-10">{user.gems}</p>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[22px] font-bold tracking-tight">Tus Módulos</h2>
            <span className="text-xs font-medium text-primary cursor-pointer hover:underline">Ver mapa completo</span>
          </div>

          {/* Module 1 Card */}
          <div 
            onClick={() => navigate(Screen.ModuleLessons)}
            className="group relative flex flex-col rounded-2xl bg-surface-dark border border-white/5 shadow-lg overflow-hidden transition-transform transform active:scale-[0.98] cursor-pointer"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-surface-highlight z-20">
              <div className="h-full bg-primary w-[85%] shadow-[0_0_10px_rgba(19,236,91,0.5)]"></div>
            </div>
            <div className="relative h-40 w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent z-10"></div>
              <div 
                className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCLG8qPIYP_ya2vMj8vxIOWlPbcwrPFMtU4UxrBpleKvUeHisxztZ24lPEPiZ6aqW3vwDxwbc_BzufmNWkKUf26aUHN5XzQuTWLRXVW1fXbn9eRKTNnwFfp-WEPev2YjnkDUksEizkgguvfzDwBTVAmskvENoNSq_usYV55RTHYhHw-2b6HYETWqyD7iTFmMz3mnxJTJ_-Cpp3KMLroi9h0_KGh39SUfLaxWwoAG1MJ2Zt9ua7RAp__1utSKyATgkhER8Fv5Ii371g")'}}
              ></div>
              <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <span className="text-xs font-bold text-primary">85% Completado</span>
              </div>
            </div>
            <div className="p-5 flex flex-col gap-3">
              <div>
                <h3 className="text-xl font-bold text-white mb-1 leading-tight">Módulo 1: Figuras geométricas y sus propiedades</h3>
                <p className="text-text-secondary text-sm leading-snug">Domina las formas básicas, sus elementos y características esenciales.</p>
              </div>
              <button className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl h-12 bg-primary hover:bg-primary-dark text-background-dark text-base font-bold shadow-[0_4px_14px_rgba(19,236,91,0.4)] transition-all">
                <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
                Continuar
              </button>
            </div>
          </div>

          {/* Locked Module 2 */}
          <div className="group relative flex flex-col rounded-2xl bg-surface-dark border border-white/5 shadow-md overflow-hidden opacity-90 cursor-not-allowed">
            <div className="relative h-32 w-full overflow-hidden">
              <div className="absolute inset-0 bg-background-dark/60 z-10 backdrop-grayscale-[0.5] flex items-center justify-center">
                <div className="bg-black/40 backdrop-blur-sm p-3 rounded-full border border-white/10 shadow-lg">
                  <span className="material-symbols-outlined text-white/70 text-[24px]">lock</span>
                </div>
              </div>
              <div 
                className="w-full h-full bg-center bg-cover" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAaq_aFnQXOXg_4y6CLLL3Y7sxcaMWIAt1lvfO2I3Va9eSHboQ_-QkHKoOJ38rMsz_6eMKDBgjW8kbHQvZifJE6qF2tdAgDZ9Cy9lycf-vj1oDvODQMEDRpDuK9TrtFkcYMVkL0Mb8MGegUYr9ygbbuIPuiKiqeOKo9nldJuCeb2_Dn8WD3HalHh8kNp8H02yRwuoViKVuB-LLj-RLStPA8nEXUPI9QLHp2Oh9SZXa-bMYKvK-LXFMlzDQe85B_i9BzhTL89LkLD0o")'}}
              ></div>
            </div>
            <div className="p-5 flex flex-col gap-1">
              <h3 className="text-lg font-bold text-white/80 leading-tight">Módulo 2: Congruencia, semejanza y proporcionalidad</h3>
              <p className="text-text-secondary/70 text-sm">Comprende cómo comparar figuras y sus relaciones proporcionales.</p>
              <div className="mt-3 flex items-center justify-between text-xs font-medium text-text-secondary/60">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">school</span> Nivel 5 requerido</span>
                <span>0%</span>
              </div>
              <div className="mt-1 h-1.5 w-full bg-surface-highlight rounded-full overflow-hidden">
                <div className="h-full bg-white/10 w-0"></div>
              </div>
            </div>
          </div>

          {/* Locked Module 3 */}
          <div className="group relative flex flex-col rounded-2xl bg-surface-dark border border-white/5 shadow-md overflow-hidden opacity-70 grayscale transition-all hover:grayscale-0 hover:opacity-100 cursor-not-allowed">
            <div className="relative h-32 w-full overflow-hidden">
              <div className="absolute inset-0 bg-background-dark/70 z-10 flex items-center justify-center">
                <div className="bg-black/40 backdrop-blur-sm p-3 rounded-full border border-white/10">
                  <span className="material-symbols-outlined text-white/50 text-[24px]">lock</span>
                </div>
              </div>
              <div 
                className="w-full h-full bg-center bg-cover" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD01ML5QqrYy3pfCyOfNx5ltGzSjcDWP9Dz6EyS7ZZVAA-pDTep9_IP7S5vkVXWJC8DTkXnTnizdMdh8Vu8X6FGF9FiAyWpYpQDDMkj7Jt3ZMqc9OWOE30v23eJ0R0a8ryvkkmXVVgZW9j5dWzzd69SAaWbKia-00__aNSlzI2n5m4rYPHM4l2zMGz5V2b-vSN9X2AsAoryRGnbs4_MHkoywwytAy4SByiGt8OxzSo8TiwSDUmiPtbLA9i6xVO5S1cKMGFk_HURsrQ")'}}
              ></div>
            </div>
            <div className="p-5 flex flex-col gap-1">
              <h3 className="text-lg font-bold text-white/60 leading-tight">Módulo 3: Transformaciones geométricas</h3>
              <p className="text-text-secondary/50 text-sm">Explora rotaciones, traslaciones y simetrías en el plano.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-surface-dark/90 backdrop-blur-lg border-t border-white/5 pb-6 pt-2 z-50">
        <ul className="flex justify-around items-center w-full max-w-md mx-auto">
          <li className="flex-1">
            <button 
              onClick={() => navigate(Screen.Dashboard)}
              className="flex flex-col items-center justify-center w-full gap-1 p-2 text-primary"
            >
              <span className="material-symbols-outlined filled text-[26px]" style={{fontVariationSettings: "'FILL' 1"}}>home</span>
              <span className="text-[10px] font-medium">Inicio</span>
            </button>
          </li>
          <li className="flex-1">
            <button className="flex flex-col items-center justify-center w-full gap-1 p-2 text-text-secondary hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[26px]">leaderboard</span>
              <span className="text-[10px] font-medium">Ranking</span>
            </button>
          </li>
          <li className="flex-1">
            <div className="relative -top-6">
              <button 
                onClick={() => navigate(Screen.LessonObserve)}
                className="flex items-center justify-center h-14 w-14 rounded-full bg-primary text-background-dark shadow-[0_0_15px_rgba(19,236,91,0.5)] border-4 border-background-dark transform transition-transform active:scale-95"
              >
                <span className="material-symbols-outlined text-[32px] filled" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
              </button>
            </div>
          </li>
          <li className="flex-1">
            <button 
              onClick={() => navigate(Screen.Progress)}
              className="flex flex-col items-center justify-center w-full gap-1 p-2 text-text-secondary hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[26px]">school</span>
              <span className="text-[10px] font-medium">Logros</span>
            </button>
          </li>
          <li className="flex-1">
            <button 
              onClick={() => navigate(Screen.Profile)}
              className="flex flex-col items-center justify-center w-full gap-1 p-2 text-text-secondary hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[26px]">person</span>
              <span className="text-[10px] font-medium">Perfil</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
