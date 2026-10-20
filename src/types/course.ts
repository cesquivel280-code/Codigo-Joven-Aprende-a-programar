export interface TestCase {
  description: string;
  testFn: (output: string[], userScope: Record<string, unknown>, rawCode: string) => boolean | { passed: boolean; message?: string };
  hint?: string;
}

export interface IntroSection {
  title: string;
  subtitle?: string;
  content: string[];
  codeExample?: string;
  result?: string;
  breakdown?: { term: string; explanation: string }[];
  comparisonTable?: { language: string; function: string; buttonRole: string; houseRole: string }[];
  callout?: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  difficulty: 'Iniciación' | 'Básico' | 'Intermedio' | 'Avanzado';
  language?: 'javascript' | 'python' | 'react';
  estimatedMinutes: number;
  xpReward: number;
  theory: {
    introduction: string;
    keyPoints: string[];
    codeExample: string;
    explanation?: string;
    tip?: string;
    introSections?: IntroSection[];
  };
  exercise: {
    goal: string;
    instructions: string[];
    starterCode: string;
    solution: string;
    hints: string[];
    testCases: TestCase[];
  };
}

export interface CourseModule {
  id: string;
  order: number;
  title: string;
  shortDescription: string;
  difficulty: 'Iniciación' | 'Básico' | 'Intermedio' | 'Avanzado';
  language?: 'javascript' | 'python' | 'react';
  icon: string;
  color: string;
  lessons: Lesson[];
  certificate: {
    title: string;
    subtitle: string;
    skills: string[];
    badgeName: string;
  };
}

export interface ExecutionResult {
  logs: string[];
  errors: string[];
  returnValue?: unknown;
  scope: Record<string, unknown>;
  executionTimeMs: number;
}
