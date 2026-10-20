import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { UserStats, LevelInfo } from '../types/gamification';
import { courseModules } from '../data/coursesData';
import { levelTiers, allBadges } from '../data/badgesData';
import { sounds } from '../utils/soundEffects';
import {
  loadProgressFromStorage,
  saveProgressToStorage,
  clearProgressFromStorage,
  defaultStats,
  STORAGE_KEY,
} from '../utils/storage';
import confetti from 'canvas-confetti';

interface GameContextType {
  stats: UserStats;
  currentLevelInfo: LevelInfo;
  nextLevelInfo: LevelInfo | null;
  xpProgressPercent: number;
  unlockedBadgesCount: number;
  totalBadgesCount: number;
  completeLesson: (lessonId: string, moduleId: string, xpReward: number) => { isFirstCompletion: boolean; completedModuleNow: boolean };
  unlockBadge: (badgeId: string) => void;
  updateUserName: (name: string) => void;
  toggleSound: () => void;
  resetProgress: () => void;
  activeCertificateModuleId: string | null;
  openCertificate: (moduleId: string) => void;
  closeCertificate: () => void;
  storageStatus: 'saved' | 'saving' | 'error';
  storageError: string | null;
  lastSavedAt: number | null;
  isTourOpen: boolean;
  startTour: () => void;
  completeTour: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  // Load initial state with version validation and sanitization
  const [initialData] = useState(() => loadProgressFromStorage());
  const [stats, setStats] = useState<UserStats>(initialData.stats);
  const [storageStatus, setStorageStatus] = useState<'saved' | 'saving' | 'error'>(
    initialData.loadError ? 'error' : 'saved'
  );
  const [storageError, setStorageError] = useState<string | null>(initialData.loadError);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(Date.now());
  const [activeCertificateModuleId, setActiveCertificateModuleId] = useState<string | null>(null);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);

  // Auto-activate tour for first time users on mount
  useEffect(() => {
    if (!initialData.stats.hasSeenTour) {
      const timer = setTimeout(() => {
        setIsTourOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [initialData.stats.hasSeenTour]);

  // Sync sound setting
  useEffect(() => {
    sounds.setEnabled(stats.soundEnabled);
  }, [stats.soundEnabled]);

  // Save to versioned localStorage whenever stats change
  useEffect(() => {
    setStorageStatus('saving');
    const result = saveProgressToStorage(stats);
    if (result.success) {
      setStorageStatus('saved');
      setStorageError(null);
      setLastSavedAt(Date.now());
    } else {
      setStorageStatus('error');
      setStorageError(result.error);
    }
  }, [stats]);

  // Listen to storage events from other tabs/windows for live sync
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        const { stats: freshStats, loadError } = loadProgressFromStorage();
        if (!loadError) {
          setStats(freshStats);
          setStorageStatus('saved');
          setStorageError(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Calculate level info based on XP
  const currentLevelInfo = levelTiers.slice().reverse().find((tier) => stats.xp >= tier.minXp) || levelTiers[0];
  const nextLevelIndex = levelTiers.findIndex((tier) => tier.level === currentLevelInfo.level) + 1;
  const nextLevelInfo = nextLevelIndex < levelTiers.length ? levelTiers[nextLevelIndex] : null;

  let xpProgressPercent = 100;
  if (nextLevelInfo) {
    const range = nextLevelInfo.minXp - currentLevelInfo.minXp;
    const progress = stats.xp - currentLevelInfo.minXp;
    xpProgressPercent = Math.min(100, Math.max(0, Math.round((progress / range) * 100)));
  }

  const unlockBadge = useCallback((badgeId: string) => {
    setStats((prev) => {
      if (prev.unlockedBadgeIds.includes(badgeId)) return prev;
      sounds.playSuccess();
      return {
        ...prev,
        unlockedBadgeIds: [...prev.unlockedBadgeIds, badgeId],
      };
    });
  }, []);

  const completeLesson = useCallback((lessonId: string, moduleId: string, xpReward: number) => {
    let isFirstCompletion = false;
    let completedModuleNow = false;

    setStats((prev) => {
      isFirstCompletion = !prev.completedLessonIds.includes(lessonId);

      // Requirement 6: Do NOT grant repeated XP if lesson is already completed
      const newXp = isFirstCompletion ? prev.xp + xpReward : prev.xp;
      const newCompletedLessons = isFirstCompletion
        ? [...prev.completedLessonIds, lessonId]
        : prev.completedLessonIds;

      // Check level up
      const oldTier = levelTiers.slice().reverse().find((tier) => prev.xp >= tier.minXp) || levelTiers[0];
      const newTier = levelTiers.slice().reverse().find((tier) => newXp >= tier.minXp) || levelTiers[0];
      if (newTier.level > oldTier.level) {
        sounds.playFanfare();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }

      // Check badges
      const newBadgeIds = [...prev.unlockedBadgeIds];
      if (!newBadgeIds.includes('badge-primer-hola-mundo')) {
        newBadgeIds.push('badge-primer-hola-mundo');
      }

      // Check module completion
      const targetModule = courseModules.find((m) => m.id === moduleId);
      const newCompletedModules = [...prev.completedModuleIds];

      if (targetModule) {
        const allLessonsInModuleDone = targetModule.lessons.every((l) => newCompletedLessons.includes(l.id));
        if (allLessonsInModuleDone && !newCompletedModules.includes(moduleId)) {
          newCompletedModules.push(moduleId);
          completedModuleNow = true;

          // Unlock specific module badge
          if (moduleId === 'm1-fundamentos' && !newBadgeIds.includes('badge-modulo-1-completado')) {
            newBadgeIds.push('badge-modulo-1-completado');
          } else if (moduleId === 'm2-condicionales' && !newBadgeIds.includes('badge-modulo-2-completado')) {
            newBadgeIds.push('badge-modulo-2-completado');
          } else if (moduleId === 'm3-bucles' && !newBadgeIds.includes('badge-modulo-3-completado')) {
            newBadgeIds.push('badge-modulo-3-completado');
          } else if (moduleId === 'm4-arreglos' && !newBadgeIds.includes('badge-modulo-4-completado')) {
            newBadgeIds.push('badge-modulo-4-completado');
          } else if (moduleId === 'm5-funciones' && !newBadgeIds.includes('badge-modulo-5-completado')) {
            newBadgeIds.push('badge-modulo-5-completado');
          } else if (moduleId === 'm6-proyecto-rpg' && !newBadgeIds.includes('badge-graduacion-rpg')) {
            newBadgeIds.push('badge-graduacion-rpg');
          } else if (moduleId.startsWith('py-') && !newBadgeIds.includes('badge-python-iniciado')) {
            newBadgeIds.push('badge-python-iniciado');
          } else if (moduleId.startsWith('react-') && !newBadgeIds.includes('badge-react-iniciado')) {
            newBadgeIds.push('badge-react-iniciado');
          }

          // Trigger celebratory fanfare and confetti for certificate!
          sounds.playFanfare();
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.5 },
          });

          // Open certificate modal automatically
          setActiveCertificateModuleId(moduleId);
        }
      }

      return {
        ...prev,
        xp: newXp,
        level: newTier.level,
        completedLessonIds: newCompletedLessons,
        completedModuleIds: newCompletedModules,
        unlockedBadgeIds: newBadgeIds,
      };
    });

    return { isFirstCompletion, completedModuleNow };
  }, []);

  const updateUserName = useCallback((name: string) => {
    setStats((prev) => ({ ...prev, name: name.trim() || 'Alex Coder' }));
  }, []);

  const toggleSound = useCallback(() => {
    setStats((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  const completeTour = useCallback(() => {
    setStats((prev) => ({ ...prev, hasSeenTour: true }));
    setIsTourOpen(false);
  }, []);

  const startTour = useCallback(() => {
    setIsTourOpen(true);
    sounds.playClick();
  }, []);

  const resetProgress = useCallback(() => {
    clearProgressFromStorage();
    setStats({ ...defaultStats });
    setStorageStatus('saved');
    setStorageError(null);
    setLastSavedAt(Date.now());
    setIsTourOpen(false);
    sounds.playClick();
  }, []);

  const openCertificate = useCallback((moduleId: string) => {
    setActiveCertificateModuleId(moduleId);
    sounds.playClick();
  }, []);

  const closeCertificate = useCallback(() => {
    setActiveCertificateModuleId(null);
  }, []);

  return (
    <GameContext.Provider
      value={{
        stats,
        currentLevelInfo,
        nextLevelInfo,
        xpProgressPercent,
        unlockedBadgesCount: stats.unlockedBadgeIds.length,
        totalBadgesCount: allBadges.length,
        completeLesson,
        unlockBadge,
        updateUserName,
        toggleSound,
        resetProgress,
        activeCertificateModuleId,
        openCertificate,
        closeCertificate,
        storageStatus,
        storageError,
        lastSavedAt,
        isTourOpen,
        startTour,
        completeTour,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
