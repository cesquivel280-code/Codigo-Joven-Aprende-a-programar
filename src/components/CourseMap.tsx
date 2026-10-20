import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { courseModules } from '../data/coursesData';
import { CourseModule, Lesson } from '../types/course';
import { CheckCircle2, Play, Lock, Award, Clock, ArrowRight, Sparkles } from 'lucide-react';
import certificateSealImg from '../assets/images/certificate_seal_gold_1792170916485.jpg';

interface CourseMapProps {
  onSelectLesson: (lesson: Lesson, module: CourseModule) => void;
  onOpenIntro?: () => void;
}

export const CourseMap: React.FC<CourseMapProps> = ({ onSelectLesson, onOpenIntro }) => {
  const { stats, openCertificate } = useGame();
  const [selectedLanguage, setSelectedLanguage] = useState<'all' | 'javascript' | 'python' | 'react'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'Iniciación' | 'Básico' | 'Intermedio' | 'Avanzado'>('all');

  const filteredModules = courseModules.filter((m) => {
    const matchesLang = selectedLanguage === 'all' || (m.language || 'javascript') === selectedLanguage;
    const matchesDiff = selectedDifficulty === 'all' || m.difficulty === selectedDifficulty;
    return matchesLang && matchesDiff;
  });

  return (
    <div id="tour-course-map" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 scroll-mt-20">
      {/* Header and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          {/* Clean unboxed metadata */}
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium mb-1">
            <span>Rutas Tecnológicas: Python • JavaScript • React</span>
            <span aria-hidden="true">·</span>
            <span>{courseModules.length} Módulos Totales</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              {stats.completedLessonIds.length} de {courseModules.reduce((acc, m) => acc + m.lessons.length, 0)} lecciones
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Rutas Interactivas de Aprendizaje
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Domina las tecnologías más demandadas: lógica computacional con <strong>Python 3</strong>, interactividad con <strong>JavaScript</strong> y desarrollo web moderno con <strong>React</strong>.
          </p>
        </div>

        {/* Filter Controls Stack */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
          {/* Technology Track Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
            {(
              [
                { id: 'all', label: 'Todas' },
                { id: 'javascript', label: 'JavaScript' },
                { id: 'python', label: 'Python 3' },
                { id: 'react', label: 'React' },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedLanguage(t.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                  selectedLanguage === t.id
                    ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Difficulty Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
            {(['all', 'Iniciación', 'Básico', 'Intermedio', 'Avanzado'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedDifficulty === diff
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {diff === 'all' ? 'Dificultad: Todos' : diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Intro to JavaScript Callout Card */}
      {onOpenIntro && (
        <div className="mb-8 p-5 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wide">
                  Lectura Inicial Recomendada
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                ¿Qué es JavaScript? Fundamentos, ejemplos y analogías
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                Aprende qué podés crear (minijuegos como puzzles, juegos 2D y acertijos, calculadoras, IA), tu primer programa con funciones y la diferencia entre HTML, CSS y JavaScript.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenIntro}
            className="px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2 shrink-0 active:scale-95"
          >
            <span>Leer Introducción</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modules List */}
      <div className="space-y-8">
        {filteredModules.map((module) => {
          const completedCount = module.lessons.filter((l) => stats.completedLessonIds.includes(l.id)).length;
          const totalCount = module.lessons.length;
          const isModuleComplete = completedCount === totalCount;
          const progressPercent = Math.round((completedCount / totalCount) * 100);

          return (
            <div
              key={module.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg transition-all"
            >
              {/* Module Header Bar */}
              <div className="p-5 sm:p-6 border-b border-slate-800/80 bg-slate-900 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        module.language === 'python'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : module.language === 'react'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                          : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      }`}
                    >
                      {module.language === 'python' ? 'Python 3' : module.language === 'react' ? 'React' : 'JavaScript'}
                    </span>
                    <span className="font-semibold text-slate-300">{module.difficulty}</span>
                    <span className="text-slate-600" aria-hidden="true">·</span>
                    <span className="text-slate-400 tabular-nums">{totalCount} lecciones interactivas</span>
                    <span className="text-slate-600" aria-hidden="true">·</span>
                    <span className="text-slate-400 tabular-nums">{progressPercent}% completado</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {module.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                    {module.shortDescription}
                  </p>
                </div>

                {/* Certificate Action on Module Header */}
                <div className="shrink-0 flex items-center gap-3">
                  {isModuleComplete ? (
                    <button
                      onClick={() => openCertificate(module.id)}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all flex items-center gap-2 whitespace-nowrap shrink-0 group active:scale-[0.98]"
                    >
                      <div className="w-5 h-5 rounded-full overflow-hidden bg-amber-200 shrink-0">
                        <img
                          src={certificateSealImg}
                          alt="Sello"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span>Ver Certificado Obtenido</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950/70 px-3.5 py-2 rounded-lg border border-slate-800">
                      <Award className="w-4 h-4 text-slate-500" />
                      <span>
                        Certificado desbloqueable ({completedCount}/{totalCount})
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress bar line */}
              <div className="w-full bg-slate-950 h-1">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Lessons Grid */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {module.lessons.map((lesson, idx) => {
                  const isDone = stats.completedLessonIds.includes(lesson.id);
                  const isFirstLesson = idx === 0 && module.order === 1;
                  // Accessible if previous lesson is done or if it's the very first lesson
                  const prevLesson = idx > 0 ? module.lessons[idx - 1] : null;
                  const isUnlocked = isDone || isFirstLesson || (prevLesson ? stats.completedLessonIds.includes(prevLesson.id) : true);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson, module)}
                      className={`group p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isDone
                          ? 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                          : isUnlocked
                          ? 'bg-slate-900/90 border-cyan-500/30 hover:border-cyan-400 hover:shadow-md hover:shadow-cyan-500/10'
                          : 'bg-slate-950/60 border-slate-900 hover:border-slate-800 opacity-80'
                      }`}
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-sm font-semibold transition-colors ${
                            isDone
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : isUnlocked
                              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-slate-950'
                              : 'bg-slate-800 text-slate-500 border border-slate-700'
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : isUnlocked ? (
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          ) : (
                            <Lock className="w-4 h-4" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                            {lesson.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-500" />
                              <span className="tabular-nums">{lesson.estimatedMinutes} min</span>
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="text-cyan-400 font-semibold tabular-nums">
                              +{lesson.xpReward} XP
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 text-xs font-medium">
                        {isDone ? (
                          <span className="text-emerald-400 text-xs font-semibold whitespace-nowrap">
                            Completada
                          </span>
                        ) : (
                          <span className="text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform whitespace-nowrap">
                            <span>Entrar</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
