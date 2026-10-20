import { UserStats } from '../types/gamification';
import { courseModules } from '../data/coursesData';
import { allBadges } from '../data/badgesData';

export const STORAGE_KEY = 'codigojoven_user_progress_v1';
export const CURRENT_SCHEMA_VERSION = 1;

export interface StorageEnvelopeV1 {
  version: 1;
  timestamp: number;
  stats: UserStats;
}

export const defaultStats: UserStats = {
  name: 'Alex Coder',
  avatarId: 'robot',
  xp: 0,
  level: 1,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessonIds: [],
  completedModuleIds: [],
  unlockedBadgeIds: [],
  soundEnabled: true,
  hasSeenTour: false,
};

/**
 * Checks if streak needs updating based on calendar dates
 */
export function calculateUpdatedStreak(lastDateStr: string, currentStreak: number): { streakDays: number; lastActiveDate: string } {
  const todayStr = new Date().toISOString().split('T')[0];

  if (!lastDateStr) {
    return { streakDays: Math.max(1, currentStreak || 1), lastActiveDate: todayStr };
  }

  if (lastDateStr === todayStr) {
    // Already active today
    return { streakDays: Math.max(1, currentStreak || 1), lastActiveDate: todayStr };
  }

  // Calculate day difference
  const lastDate = new Date(lastDateStr);
  const today = new Date(todayStr);
  const diffTime = today.getTime() - lastDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

  if (diffDays === 1) {
    // Active yesterday, consecutive streak!
    return { streakDays: (currentStreak || 1) + 1, lastActiveDate: todayStr };
  } else if (diffDays > 1) {
    // Streak broken, reset to 1
    return { streakDays: 1, lastActiveDate: todayStr };
  }

  return { streakDays: Math.max(1, currentStreak || 1), lastActiveDate: todayStr };
}

/**
 * Validates, repairs, and sanitizes loaded data to prevent runtime crashes
 */
export function validateAndSanitizeStats(raw: unknown): UserStats {
  if (!raw || typeof raw !== 'object') {
    return { ...defaultStats };
  }

  const obj = raw as Record<string, unknown>;

  // Validate name
  const name = typeof obj.name === 'string' && obj.name.trim().length > 0 ? obj.name.trim().slice(0, 50) : defaultStats.name;

  // Validate avatarId
  const avatarId = typeof obj.avatarId === 'string' ? obj.avatarId : defaultStats.avatarId;

  // Validate XP (non-negative integer)
  const rawXp = Number(obj.xp);
  const xp = !isNaN(rawXp) && rawXp >= 0 ? Math.floor(rawXp) : 0;

  // Validate Level (positive integer >= 1)
  const rawLevel = Number(obj.level);
  const level = !isNaN(rawLevel) && rawLevel >= 1 ? Math.floor(rawLevel) : 1;

  // Validate streak
  const rawStreak = Number(obj.streakDays);
  const initialStreak = !isNaN(rawStreak) && rawStreak >= 1 ? Math.floor(rawStreak) : 1;
  const lastActiveDate = typeof obj.lastActiveDate === 'string' ? obj.lastActiveDate : '';
  const { streakDays, lastActiveDate: updatedLastActiveDate } = calculateUpdatedStreak(lastActiveDate, initialStreak);

  // Validate completedLessonIds (array of valid strings)
  const allKnownLessonIds = new Set(courseModules.flatMap((m) => m.lessons.map((l) => l.id)));
  const completedLessonIds = Array.isArray(obj.completedLessonIds)
    ? Array.from(new Set(obj.completedLessonIds.filter((id): id is string => typeof id === 'string' && allKnownLessonIds.has(id))))
    : [];

  // Validate completedModuleIds
  const allKnownModuleIds = new Set(courseModules.map((m) => m.id));
  const completedModuleIds = Array.isArray(obj.completedModuleIds)
    ? Array.from(new Set(obj.completedModuleIds.filter((id): id is string => typeof id === 'string' && allKnownModuleIds.has(id))))
    : [];

  // Validate unlockedBadgeIds
  const allKnownBadgeIds = new Set(allBadges.map((b) => b.id));
  const unlockedBadgeIds = Array.isArray(obj.unlockedBadgeIds)
    ? Array.from(new Set(obj.unlockedBadgeIds.filter((id): id is string => typeof id === 'string' && allKnownBadgeIds.has(id))))
    : [];

  // Validate soundEnabled
  const soundEnabled = typeof obj.soundEnabled === 'boolean' ? obj.soundEnabled : defaultStats.soundEnabled;

  // Validate hasSeenTour
  const hasSeenTour = typeof obj.hasSeenTour === 'boolean' ? obj.hasSeenTour : false;

  return {
    name,
    avatarId,
    xp,
    level,
    streakDays,
    lastActiveDate: updatedLastActiveDate,
    completedLessonIds,
    completedModuleIds,
    unlockedBadgeIds,
    soundEnabled,
    hasSeenTour,
  };
}

function getLocalStorage(): Storage | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * Loads progress from localStorage with version migration & error handling
 */
export function loadProgressFromStorage(): { stats: UserStats; loadError: string | null } {
  const storage = getLocalStorage();
  if (!storage) {
    return {
      stats: { ...defaultStats },
      loadError: 'El navegador no tiene acceso a localStorage.',
    };
  }

  try {
    const rawData = storage.getItem(STORAGE_KEY);
    if (!rawData) {
      return { stats: { ...defaultStats }, loadError: null };
    }

    const parsed = JSON.parse(rawData);

    // Check if wrapped in version envelope
    if (parsed && typeof parsed === 'object' && 'version' in parsed && 'stats' in parsed) {
      const envelope = parsed as StorageEnvelopeV1;
      const sanitized = validateAndSanitizeStats(envelope.stats);
      return { stats: sanitized, loadError: null };
    }

    // Legacy format migration (directly stored UserStats)
    const sanitized = validateAndSanitizeStats(parsed);
    // Automatically re-save in current version envelope
    saveProgressToStorage(sanitized);
    return { stats: sanitized, loadError: null };
  } catch (err) {
    console.warn('Error reading from localStorage:', err);
    return {
      stats: { ...defaultStats },
      loadError: 'No se pudo leer el almacenamiento local del navegador.',
    };
  }
}

/**
 * Saves progress safely to localStorage with version envelope
 */
export function saveProgressToStorage(stats: UserStats): { success: boolean; error: string | null } {
  const storage = getLocalStorage();
  if (!storage) {
    return {
      success: false,
      error: 'El almacenamiento local no está disponible en este entorno.',
    };
  }

  try {
    const envelope: StorageEnvelopeV1 = {
      version: CURRENT_SCHEMA_VERSION,
      timestamp: Date.now(),
      stats,
    };

    const serialized = JSON.stringify(envelope);
    storage.setItem(STORAGE_KEY, serialized);

    return { success: true, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Failed to save to localStorage:', err);

    let friendlyNotice = 'No se pudo guardar el progreso en el navegador.';
    if (message.includes('QuotaExceeded') || message.includes('quota')) {
      friendlyNotice = 'Espacio de almacenamiento del navegador agotado.';
    } else if (message.includes('SecurityError') || message.includes('denied')) {
      friendlyNotice = 'Permiso denegado para almacenamiento local (modo privado o cookies bloqueadas).';
    }

    return { success: false, error: friendlyNotice };
  }
}

/**
 * Wipes progress from localStorage
 */
export function clearProgressFromStorage(): { success: boolean; error: string | null } {
  try {
    const storage = getLocalStorage();
    if (storage) {
      storage.removeItem(STORAGE_KEY);
    }
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: 'No se pudo borrar el almacenamiento local.' };
  }
}
