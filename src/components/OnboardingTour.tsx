import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { sounds } from '../utils/soundEffects';
import { X, ArrowRight, ArrowLeft, Sparkles, Map, User, CheckCircle2, Terminal } from 'lucide-react';
import mascotImg from '../assets/images/mascot_robot_coder_1792170916223.jpg';

interface TourStep {
  id: string;
  targetId?: string;
  title: string;
  badge: string;
  description: string;
  icon: React.ReactNode;
  positionPreference?: 'bottom' | 'top' | 'center';
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: '¡Te damos la bienvenida a CódigoJoven!',
    badge: 'Paso 1 de 4 · Introducción',
    description:
      '¡Hola! Soy Byte, tu tutor interactivo. Estás en la plataforma en español para aprender a programar desde cero a partir de los 14 años. Te mostraré las 2 herramientas clave en menos de 1 minuto.',
    icon: <Sparkles className="w-5 h-5 text-amber-400" />,
    positionPreference: 'center',
  },
  {
    id: 'course-map',
    targetId: 'tour-course-map',
    title: 'Rutas en Python, JavaScript y React',
    badge: 'Paso 2 de 4 · Rutas y GitHub',
    description:
      'Aquí tienes tu mapa organizado por tecnología y dificultad: Python 3, JavaScript Moderno y React. Cada lección incluye teoría clara, editor en tiempo real, pruebas automáticas, certificados oficiales y exportación directa de tus proyectos a GitHub.',
    icon: <Map className="w-5 h-5 text-cyan-400" />,
    positionPreference: 'top',
  },
  {
    id: 'profile-btn',
    targetId: 'tour-profile-btn',
    title: 'Tu Nivel, XP y Botón de Perfil',
    badge: 'Paso 3 de 4 · Gamificación',
    description:
      'En este botón puedes ver tus puntos de experiencia (XP), tu nivel de programador y tu racha de días activos. Al pulsarlo accedes a «Mi Progreso» para revisar tu avance detallado y poner tu nombre en los certificados.',
    icon: <User className="w-5 h-5 text-purple-400" />,
    positionPreference: 'bottom',
  },
  {
    id: 'ready-to-code',
    title: '¡Todo listo para programar!',
    badge: 'Paso 4 de 4 · ¡Comienza el juego!',
    description:
      'Tu progreso se guardará automáticamente en este navegador. Puedes volver a ver esta guía en cualquier momento pulsando el icono (?) en la barra superior. ¿Preparado para tu primer Hola Mundo?',
    icon: <Terminal className="w-5 h-5 text-emerald-400" />,
    positionPreference: 'center',
  },
];

interface OnboardingTourProps {
  onStartLesson?: () => void;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ onStartLesson }) => {
  const { isTourOpen, completeTour } = useGame();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const step = tourSteps[currentStepIndex];

  // Update target element positioning and scroll into view
  useEffect(() => {
    if (!isTourOpen) return;

    if (!step.targetId) {
      setTargetRect(null);
      return;
    }

    const updateRect = () => {
      const el = document.getElementById(step.targetId!);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const rect = el.getBoundingClientRect();
        setTargetRect(rect);
      } else {
        setTargetRect(null);
      }
    };

    updateRect();
    const handleResize = () => updateRect();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', updateRect, true);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [isTourOpen, currentStepIndex, step.targetId]);

  // Keyboard navigation
  useEffect(() => {
    if (!isTourOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        completeTour();
      } else if (e.key === 'ArrowRight' && currentStepIndex < tourSteps.length - 1) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && currentStepIndex > 0) {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTourOpen, currentStepIndex]);

  if (!isTourOpen) return null;

  const handleNext = () => {
    sounds.playClick();
    if (currentStepIndex < tourSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      completeTour();
      if (onStartLesson) {
        onStartLesson();
      }
    }
  };

  const handlePrev = () => {
    sounds.playClick();
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    sounds.playClick();
    completeTour();
  };

  // Calculate tooltip placement styles
  const getTooltipStyle = (): React.CSSProperties => {
    if (!targetRect || step.positionPreference === 'center') {
      return {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }

    const isTopPreference = step.positionPreference === 'top';
    const topPosition = isTopPreference
      ? Math.max(20, targetRect.top - 240)
      : Math.min(window.innerHeight - 280, targetRect.bottom + 16);

    const leftPosition = Math.max(16, Math.min(window.innerWidth - 440, targetRect.left + (targetRect.width / 2) - 200));

    return {
      position: 'fixed',
      top: `${topPosition}px`,
      left: `${leftPosition}px`,
    };
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-auto">
      {/* Dark backdrop */}
      <div
        onClick={handleSkip}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Spotlight cutout border over targeted element */}
      {targetRect && (
        <div
          style={{
            position: 'fixed',
            top: `${Math.max(0, targetRect.top - 8)}px`,
            left: `${Math.max(0, targetRect.left - 8)}px`,
            width: `${targetRect.width + 16}px`,
            height: `${targetRect.height + 16}px`,
            pointerEvents: 'none',
          }}
          className="rounded-2xl border-2 border-cyan-400 shadow-[0_0_0_9999px_rgba(2,6,23,0.85),0_0_25px_rgba(6,182,212,0.6)] transition-all duration-300 animate-pulse"
        />
      )}

      {/* Tooltip Card */}
      <div
        ref={cardRef}
        style={getTooltipStyle()}
        className="z-50 w-[92vw] max-w-md bg-slate-900 border border-cyan-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl text-slate-100 transition-all duration-300"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            {step.icon}
            <span>{step.badge}</span>
          </div>

          <button
            onClick={handleSkip}
            aria-label="Cerrar tour"
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content with Tutor Avatar */}
        <div className="flex items-start gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 border border-cyan-500/40 shrink-0 shadow-md">
            <img
              src={mascotImg}
              alt="Byte el robot tutor"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 leading-snug">
              {step.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>

        {/* Step dots indicator */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1.5">
            {tourSteps.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'w-6 bg-cyan-400'
                    : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {currentStepIndex > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Anterior</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all active:scale-95"
            >
              <span>
                {currentStepIndex === tourSteps.length - 1
                  ? '¡Comenzar ahora!'
                  : 'Siguiente'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Footer skip link */}
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={handleSkip}
            className="text-[11px] text-slate-400 hover:text-slate-300 underline transition-colors"
          >
            Omitir guía paso a paso
          </button>
        </div>
      </div>
    </div>
  );
};
