import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { allBadges } from '../data/badgesData';
import { X, Award, Sparkles, Lock, CheckCircle2, Flame, Code, Terminal, Crown, Bug, GitFork, Repeat, Layers, Home } from 'lucide-react';

interface BadgesModalProps {
  onClose: () => void;
  onGoHome?: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-amber-400" />,
  Bug: <Bug className="w-5 h-5 text-rose-400" />,
  Award: <Award className="w-5 h-5 text-cyan-400" />,
  GitFork: <GitFork className="w-5 h-5 text-indigo-400" />,
  Repeat: <Repeat className="w-5 h-5 text-orange-400" />,
  Layers: <Layers className="w-5 h-5 text-emerald-400" />,
  Code: <Code className="w-5 h-5 text-purple-400" />,
  Crown: <Crown className="w-5 h-5 text-yellow-400" />,
  Flame: <Flame className="w-5 h-5 text-amber-500" />,
  Terminal: <Terminal className="w-5 h-5 text-teal-400" />,
};

export const BadgesModal: React.FC<BadgesModalProps> = ({ onClose, onGoHome }) => {
  const { stats } = useGame();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Medallas y Logros</h3>
              <p className="text-xs text-slate-400">
                {stats.unlockedBadgeIds.length} de {allBadges.length} insignias desbloqueadas
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
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[60vh] overflow-y-auto pr-1">
          {allBadges.map((badge) => {
            const isUnlocked = stats.unlockedBadgeIds.includes(badge.id);
            const icon = iconMap[badge.icon] || <Award className="w-5 h-5 text-cyan-400" />;

            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
                  isUnlocked
                    ? 'bg-slate-950/90 border-slate-700/80'
                    : 'bg-slate-950/40 border-slate-900 opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                    isUnlocked
                      ? 'bg-slate-900 border-slate-700 shadow-sm'
                      : 'bg-slate-900/40 border-slate-900 text-slate-600'
                  }`}
                >
                  {isUnlocked ? icon : <Lock className="w-4 h-4 text-slate-600" />}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                      {badge.name}
                    </h4>
                    {isUnlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
          {onGoHome ? (
            <button
              type="button"
              onClick={() => {
                onClose();
                onGoHome();
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20 transition-all active:scale-95"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Volver al Inicio</span>
            </button>
          ) : <div />}

          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
