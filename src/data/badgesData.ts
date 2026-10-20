import { Badge, LevelInfo } from '../types/gamification';

export const levelTiers: LevelInfo[] = [
  { level: 1, title: 'Novato del Código', minXp: 0, maxXp: 150, color: 'text-slate-400' },
  { level: 2, title: 'Aprendiz de Script', minXp: 150, maxXp: 350, color: 'text-cyan-400' },
  { level: 3, title: 'Domador de Bucles', minXp: 350, maxXp: 650, color: 'text-emerald-400' },
  { level: 4, title: 'Hechicero de Funciones', minXp: 650, maxXp: 1050, color: 'text-indigo-400' },
  { level: 5, title: 'Arquitecto de Software', minXp: 1050, maxXp: 1550, color: 'text-purple-400' },
  { level: 6, title: 'Maestro del Algoritmo', minXp: 1550, maxXp: 99999, color: 'text-amber-400' },
];

export const allBadges: Omit<Badge, 'isUnlocked' | 'unlockedAt'>[] = [
  {
    id: 'badge-primer-hola-mundo',
    name: 'Primer Hola Mundo',
    description: 'Completa tu primer console.log() con éxito.',
    icon: 'Sparkles',
    category: 'learning',
  },
  {
    id: 'badge-cazador-de-bugs',
    name: 'Cazador de Bugs',
    description: 'Ejecuta y corrige un ejercicio tras un error.',
    icon: 'Bug',
    category: 'mastery',
  },
  {
    id: 'badge-modulo-1-completado',
    name: 'Fundamentos de Acero',
    description: 'Supera el Módulo 1 y desbloquea tu primer Certificado.',
    icon: 'Award',
    category: 'learning',
  },
  {
    id: 'badge-modulo-2-completado',
    name: 'Maestro de la Lógica',
    description: 'Domina los condicionales y el control de flujo.',
    icon: 'GitFork',
    category: 'learning',
  },
  {
    id: 'badge-modulo-3-completado',
    name: 'Bucle Infinito Dominado',
    description: 'Controla los ciclos for y while sin fallar.',
    icon: 'Repeat',
    category: 'learning',
  },
  {
    id: 'badge-modulo-4-completado',
    name: 'Señor de los Arrays',
    description: 'Domina la manipulación de colecciones y listas de datos.',
    icon: 'Layers',
    category: 'learning',
  },
  {
    id: 'badge-modulo-5-completado',
    name: 'Mago Modular',
    description: 'Crea funciones reutilizables con return y parámetros.',
    icon: 'Code',
    category: 'learning',
  },
  {
    id: 'badge-graduacion-rpg',
    name: 'Desarrollador Legendario',
    description: 'Completa el proyecto final de combate RPG y gradúate.',
    icon: 'Crown',
    category: 'mastery',
  },
  {
    id: 'badge-racha-3-dias',
    name: 'Hábito de Diamante',
    description: 'Mantén una racha de práctica constante.',
    icon: 'Flame',
    category: 'streak',
  },
  {
    id: 'badge-explorador-playground',
    name: 'Alquimista del Laboratorio',
    description: 'Experimenta libremente en el Playground de código.',
    icon: 'Terminal',
    category: 'creativity',
  },
  {
    id: 'badge-python-iniciado',
    name: 'Pionero de Python',
    description: 'Escribe y ejecuta tus primeros algoritmos en Python 3.',
    icon: 'Sparkles',
    category: 'learning',
  },
  {
    id: 'badge-react-iniciado',
    name: 'Constructor React',
    description: 'Crea tus primeros componentes visuales e interactivos con React.',
    icon: 'Layers',
    category: 'learning',
  },
  {
    id: 'badge-exportador-github',
    name: 'Publicador GitHub',
    description: 'Exporta un proyecto o repositorio directamente a GitHub.',
    icon: 'Crown',
    category: 'mastery',
  },
];
