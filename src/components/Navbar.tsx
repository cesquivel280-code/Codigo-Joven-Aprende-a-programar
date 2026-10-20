import React from 'react';
import { useGame } from '../context/GameContext';
import { courseModules } from '../data/coursesData';
import { Volume2, VolumeX, Flame, Award, Terminal, User, BarChart2, AlertCircle, HelpCircle, Home, Sparkles, Github } from 'lucide-react';

interface NavbarProps {
  currentView: 'course' | 'playground' | 'certificates';
  setCurrentView: (view: 'course' | 'playground' | 'certificates') => void;
  onOpenProfile: () => void;
  onOpenBadges: () => void;
  onGoHome?: () => void;
  onOpenIntro?: () => void;
  isInsideLesson?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  onOpenProfile,
  onOpenBadges,
  onGoHome,
  onOpenIntro,
  isInsideLesson = false,
}) => {
  const { stats, toggleSound, storageStatus, startTour } = useGame();

  const handleHomeClick = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      setCurrentView('course');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single element) */}
        <button
          onClick={handleHomeClick}
          title="Volver al inicio de CódigoJoven"
          className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <span className="font-mono text-lg font-black">&lt;/&gt;</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors whitespace-nowrap">
              CódigoJoven
            </span>
            <span className="text-[11px] text-slate-400 font-normal -mt-0.5 whitespace-nowrap">
              Python, JS & React · 14+
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (concise, single-line text links) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={handleHomeClick}
            title="Volver al Inicio y Ruta de Cursos"
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
              currentView === 'course' && !isInsideLesson
                ? 'text-cyan-400 border-cyan-400 font-semibold'
                : 'text-slate-300 hover:text-white border-transparent'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Inicio</span>
          </button>
          <button
            onClick={() => setCurrentView('playground')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
              currentView === 'playground'
                ? 'text-cyan-400 border-cyan-400 font-semibold'
                : 'text-slate-300 hover:text-white border-transparent'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Laboratorio Libre</span>
          </button>
          <button
            onClick={() => setCurrentView('certificates')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
              currentView === 'certificates'
                ? 'text-cyan-400 border-cyan-400 font-semibold'
                : 'text-slate-300 hover:text-white border-transparent'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Certificados ({stats.completedModuleIds.length}/{courseModules.length})</span>
          </button>
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 border-transparent"
          >
            <BarChart2 className="w-4 h-4" />
            <span>Mi Progreso</span>
          </button>
          <button
            onClick={onOpenBadges}
            className="text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 border-transparent"
          >
            Insignias ({stats.unlockedBadgeIds.length})
          </button>
          {onOpenIntro && (
            <button
              onClick={onOpenIntro}
              title="Aprende qué es JavaScript desde cero"
              className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 border-transparent font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>¿Qué es JS?</span>
            </button>
          )}
        </nav>

        {/* Zone 3: 1 Primary Action & Status Cluster */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick mobile Inicio button if not on home root */}
          {(currentView !== 'course' || isInsideLesson) && (
            <button
              onClick={handleHomeClick}
              title="Volver al Inicio"
              className="md:hidden flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-cyan-500/20 text-xs font-semibold transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Inicio</span>
            </button>
          )}

          {/* Storage Alert Indicator if localStorage failed */}
          {storageStatus === 'error' && (
            <button
              onClick={onOpenProfile}
              title="Aviso: error al guardar en localStorage"
              className="flex items-center gap-1 px-2 py-1 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold"
            >
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Sin Guardado</span>
            </button>
          )}

          {/* Streak indicator */}
          <div
            title={`Racha de ${stats.streakDays} días activos`}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold tabular-nums"
          >
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{stats.streakDays} d</span>
          </div>

          {/* XP & Level quick button (opens Mi Progreso) */}
          <button
            id="tour-profile-btn"
            onClick={onOpenProfile}
            title="Abrir Mi Progreso y Perfil"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 transition-all text-xs"
          >
            <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center text-[10px] tabular-nums">
              {stats.level}
            </div>
            <div className="flex items-center gap-1 text-slate-200">
              <span className="font-semibold tabular-nums">{stats.xp}</span>
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">XP</span>
            </div>
            <User className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>

          {/* Tour help button */}
          <button
            onClick={startTour}
            aria-label="Ver guía interactiva"
            title="Ver guía paso a paso (Tour)"
            className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Sound toggle button */}
          <button
            onClick={toggleSound}
            aria-label={stats.soundEnabled ? 'Silenciar sonidos' : 'Activar efectos de sonido'}
            title={stats.soundEnabled ? 'Sonido activado' : 'Sonido silenciado'}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {stats.soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
        </div>
      </div>
    </header>
  );
};
