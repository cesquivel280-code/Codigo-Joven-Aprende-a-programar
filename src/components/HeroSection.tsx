import React from 'react';
import { useGame } from '../context/GameContext';
import { Play, Sparkles, Terminal, Award, Zap, Code2 } from 'lucide-react';
import heroImg from '../assets/images/hero_programming_quest_1792170916608.jpg';
import mascotImg from '../assets/images/mascot_robot_coder_1792170916223.jpg';

interface HeroSectionProps {
  onStartLearning: () => void;
  onOpenPlayground: () => void;
  onOpenIntro?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartLearning,
  onOpenPlayground,
  onOpenIntro,
}) => {
  const { stats } = useGame();
  const hasStarted = stats.completedLessonIds.length > 0;

  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-10 lg:py-16">
      {/* Subtle ambient grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline and Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Clean unboxed metadata kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-cyan-400 mb-3 tracking-wide">
              <span>Código Joven</span>
              <span aria-hidden="true">·</span>
              <span>Python 3, JavaScript & React</span>
              <span aria-hidden="true">·</span>
              <span>100% Interactivo en Español</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-300 font-semibold">Exportación a GitHub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4 text-balance">
              Domina la programación con Python, JavaScript y React.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 mb-6 leading-relaxed max-w-2xl">
              Aprende lógica computacional y desarrollo de software mediante retos interactivos, minijuegos y un sistema de recompensas gamificado con XP, niveles y certificados oficiales. Escribe código en vivo y <strong>exporta tus proyectos directamente a GitHub</strong>.
            </p>

            {/* Mascot speech bubble */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 mb-7 max-w-xl shadow-lg">
              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-800 border border-cyan-500/30">
                <img
                  src={mascotImg}
                  alt="Byte el robot tutor"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs sm:text-sm text-slate-200">
                <span className="font-bold text-cyan-300">Byte el Tutor:</span>{' '}
                {hasStarted
                  ? `¡Hola de nuevo, ${stats.name}! Ya has completado ${stats.completedLessonIds.length} lecciones. ¡Sigamos subiendo de nivel!`
                  : '¡Hola! Soy Byte. Te acompañaré paso a paso para que escribir tus primeras líneas de código sea tan divertido como jugar a tu videojuego favorito.'}
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                onClick={onStartLearning}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2.5 whitespace-nowrap shrink-0 group active:scale-[0.98]"
              >
                <Play className="w-4 h-4 fill-slate-950 transition-transform group-hover:translate-x-0.5" />
                <span>{hasStarted ? 'Continuar Ruta de Lecciones' : 'Comenzar Lección 1 (Gratis)'}</span>
              </button>

              <button
                onClick={onOpenPlayground}
                className="px-5 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 font-medium text-sm sm:text-base transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Probar Laboratorio Libre</span>
              </button>

              {onOpenIntro && (
                <button
                  onClick={onOpenIntro}
                  className="px-4 py-3 rounded-lg bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 font-medium text-sm sm:text-base transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 shadow-sm active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>¿Qué es JavaScript? (Introducción)</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Visual hero card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
              <img
                src={heroImg}
                alt="Aventura de programación interactiva para jóvenes"
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Inset badge strip */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200 bg-slate-950/80 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold">Editor en tiempo real</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-300 font-semibold tabular-nums">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Python, JS & React</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Feature / Proof Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80 text-xs sm:text-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">Python, JS & React</div>
              <div className="text-slate-400 text-xs">Ejecución en vivo y sandbox</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">Gamificación y XP</div>
              <div className="text-slate-400 text-xs">Niveles, rachas e insignias</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">Certificados Oficiales</div>
              <div className="text-slate-400 text-xs">Descargables e imprimibles</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">Exportación a GitHub</div>
              <div className="text-slate-400 text-xs">Directo a tu repositorio o .zip</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
