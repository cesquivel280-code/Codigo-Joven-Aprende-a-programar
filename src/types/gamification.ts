export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'learning' | 'streak' | 'mastery' | 'creativity';
  unlockedAt?: string;
  isUnlocked: boolean;
}

export interface UserStats {
  name: string;
  avatarId: string;
  xp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string;
  completedLessonIds: string[];
  completedModuleIds: string[];
  unlockedBadgeIds: string[];
  soundEnabled: boolean;
  hasSeenTour?: boolean;
}

export interface LevelInfo {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
  color: string;
}
