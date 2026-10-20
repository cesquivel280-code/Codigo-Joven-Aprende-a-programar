import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { courseModules } from '../data/coursesData';
import { allBadges } from '../data/badgesData';
import {
  X,
  User,
  Flame,
  Award,
  BookOpen,
  RotateCcw,
  Check,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HardDrive,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Home,
} from 'lucide-react';
import mascotImg from '../assets/images/mascot_robot_coder_1792170916223.jpg';

interface ProfileModalProps {
  onClose: () => void;
  onGoHome?: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ onClose, onGoHome }) => {
  const {
    stats,
    currentLevelInfo,
    nextLevelInfo,
    xpProgressPercent,
    updateUserName,
    resetProgress,
    storageStatus,
    storageError,
    lastSavedAt,
    startTour,
  } = useGame();

  const [nameInput, setNameInput] = useState(stats.name);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserName(nameInput);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleConfirmReset = () => {
    resetProgress();
    setShowConfirmReset(false);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSaveAndGoHome = () => {
    updateUserName(nameInput);
    onClose();
    if (onGoHome) {
      onGoHome();
    }
  };

  const totalLessons = courseModules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 sm:p-8 my-6 text-slate-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Mi Progreso y Perfil</h3>
              <p className="text-xs text-slate-400">
                Resumen de XP, niveles, módulos, lecciones y almacenamiento
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onGoHome && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onGoHome();
                }}
                title="Cerrar y volver al inicio"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors border border-slate-700/60"
              >
                <Home className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Volver al Inicio</span>
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Cerrar modal"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-5 pr-1 space-y-6">
          {/* Storage Status Banner (Requirement 9) */}
          <div
            className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 ${
              storageStatus === 'error'
                ? 'bg-rose-950/40 border-rose-800/60 text-rose-300'
                : 'bg-slate-950 border-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {storageStatus === 'error' ? (
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              ) : (
                <HardDrive className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
              <div>
                {storageStatus === 'error' ? (
                  <span>
                    <strong className="text-rose-200">Aviso de almacenamiento:</strong> {storageError || 'No se pudo guardar en localStorage.'}
                  </span>
                ) : (
                  <span>
                    <strong className="text-emerald-300">Guardado automático activo:</strong> Tu progreso se almacena localmente en este navegador.
                  </span>
                )}
              </div>
            </div>

            {storageStatus !== 'error' && lastSavedAt && (
              <span className="text-[11px] text-slate-400 shrink-0 hidden sm:inline">
                Sincronizado
              </span>
            )}
          </div>

          {/* Profile Card & Level Progress */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-800 border-2 border-cyan-500/40 shrink-0">
              <img
                src={mascotImg}
                alt="Avatar del estudiante"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0 w-full text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
                  Nivel {stats.level} · {currentLevelInfo.title}
                </span>
                <span className="text-slate-600" aria-hidden="true">·</span>
                <span className="text-xs text-amber-400 font-semibold tabular-nums">
                  {stats.streakDays} {stats.streakDays === 1 ? 'día de racha' : 'días de racha'}
                </span>
              </div>
              <div className="text-lg font-bold text-white truncate">{stats.name}</div>

              {/* XP Progress Bar */}
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>{stats.xp} XP acumulados</span>
                  <span>
                    {nextLevelInfo ? `${nextLevelInfo.minXp} XP para Nivel ${nextLevelInfo.level}` : 'Nivel Máximo Alcanzado'}
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${xpProgressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4-Stat Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <Sparkles className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <div className="text-base font-bold text-white tabular-nums">{stats.xp}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">XP Total</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <BookOpen className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
              <div className="text-base font-bold text-white tabular-nums">
                {stats.completedLessonIds.length} / {totalLessons}
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Lecciones</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <Award className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <div className="text-base font-bold text-white tabular-nums">
                {stats.completedModuleIds.length} / {courseModules.length}
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Módulos</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <Flame className="w-4 h-4 text-rose-400 mx-auto mb-1" />
              <div className="text-base font-bold text-white tabular-nums">
                {stats.unlockedBadgeIds.length} / {allBadges.length}
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Insignias</div>
            </div>
          </div>

          {/* Detailed Modules & Lessons Progress Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Desglose por Módulos y Lecciones</span>
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                {Math.round((stats.completedLessonIds.length / totalLessons) * 100)}% de la ruta completada
              </span>
            </div>

            <div className="space-y-2">
              {courseModules.map((module) => {
                const completedInModule = module.lessons.filter((l) =>
                  stats.completedLessonIds.includes(l.id)
                ).length;
                const isModuleDone = stats.completedModuleIds.includes(module.id);
                const isExpanded = expandedModuleId === module.id;

                return (
                  <div
                    key={module.id}
                    className="rounded-xl border border-slate-800/80 bg-slate-950/70 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedModuleId(isExpanded ? null : module.id)}
                      className="w-full p-3.5 flex items-center justify-between gap-3 text-left hover:bg-slate-900/50 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-xs font-bold ${
                            isModuleDone
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {isModuleDone ? <Check className="w-3.5 h-3.5" /> : module.order}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[9px] font-mono font-bold uppercase px-1 py-0.2 rounded ${
                                module.language === 'python'
                                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                  : module.language === 'react'
                                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                  : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                              }`}
                            >
                              {module.language === 'python' ? 'Python' : module.language === 'react' ? 'React' : 'JS'}
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-white truncate">
                              {module.title}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {completedInModule} de {module.lessons.length} lecciones completadas
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isModuleDone && (
                          <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                            Certificado
                          </span>
                        )}
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </button>

                    {/* Expanded Lesson Checklist */}
                    {isExpanded && (
                      <div className="px-4 pb-3.5 pt-1 border-t border-slate-900 space-y-1.5 bg-slate-900/30">
                        {module.lessons.map((lesson) => {
                          const isDone = stats.completedLessonIds.includes(lesson.id);
                          return (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between text-xs py-1 text-slate-300"
                            >
                              <div className="flex items-center gap-2">
                                {isDone ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                ) : (
                                  <div className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0" />
                                )}
                                <span className={isDone ? 'text-slate-200' : 'text-slate-400'}>
                                  {lesson.title}
                                </span>
                              </div>
                              <span className="text-[11px] font-mono text-cyan-400">
                                {isDone ? `+${lesson.xpReward} XP` : `${lesson.xpReward} XP`}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Name Editing Form */}
          <form onSubmit={handleSave} className="space-y-2.5 pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">
                Nombre oficial del estudiante (para tus certificados):
              </label>
              {savedSuccess && (
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 animate-pulse">
                  <Check className="w-3.5 h-3.5" /> ¡Guardado con éxito!
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Tu nombre completo..."
                maxLength={40}
                className="flex-1 px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm outline-none focus:border-cyan-500 transition-colors"
              />
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Guardar</span>
                </button>

                {onGoHome && (
                  <button
                    type="button"
                    onClick={handleSaveAndGoHome}
                    title="Guardar nombre y volver a la pantalla principal"
                    className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5 active:scale-95"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Guardar y Volver a Inicio</span>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Footer with Reset Progress, Home, and Tour option */}
        <div className="pt-4 border-t border-slate-800 shrink-0">
          {!showConfirmReset ? (
            <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs">
              <div className="flex items-center gap-2">
                {onGoHome && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onGoHome();
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all active:scale-95"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Volver al Inicio</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    startTour();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30 border border-slate-800 hover:border-cyan-800/50 font-medium transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Ver guía interactiva (Tour)</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowConfirmReset(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 border border-transparent hover:border-rose-900/50 font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar progreso</span>
              </button>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/80 space-y-2.5">
              <div className="flex items-start gap-2.5 text-xs text-rose-200">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">¿Confirmas que deseas reiniciar todo tu progreso?</span>
                  <p className="text-[11px] text-rose-300/90 mt-0.5">
                    Esta acción borrará tus {stats.xp} XP, lecciones completadas, insignias y certificados guardados en este navegador. No se puede deshacer.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setShowConfirmReset(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReset}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Sí, borrar y reiniciar</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
