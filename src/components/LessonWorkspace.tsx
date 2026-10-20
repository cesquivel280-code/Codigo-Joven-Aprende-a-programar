import React, { useState, useEffect } from 'react';
import { Lesson, CourseModule, ExecutionResult } from '../types/course';
import { useGame } from '../context/GameContext';
import { runCodeMultiLanguage } from '../utils/codeRunner';
import { sounds } from '../utils/soundEffects';
import { CodeEditor } from './CodeEditor';
import { ConsoleOutput } from './ConsoleOutput';
import { GitHubExportModal } from './GitHubExportModal';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  Award,
  Sparkles,
  ChevronRight,
  BookOpen,
  Code2,
  Eye,
  Check,
  Home,
  Github,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LessonWorkspaceProps {
  lesson: Lesson;
  module: CourseModule;
  onBack: () => void;
  onNextLesson?: () => void;
  onOpenIntro?: () => void;
}

export const LessonWorkspace: React.FC<LessonWorkspaceProps> = ({
  lesson,
  module,
  onBack,
  onNextLesson,
  onOpenIntro,
}) => {
  const { stats, completeLesson } = useGame();

  const [code, setCode] = useState(lesson.exercise.starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [testResults, setTestResults] = useState<{ description: string; passed: boolean; hint?: string }[]>([]);
  const [activeTab, setActiveTab] = useState<'exercise' | 'theory'>('exercise');
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [showSolutionConfirm, setShowSolutionConfirm] = useState(false);
  const [solutionShown, setSolutionShown] = useState(false);
  const [allPassed, setAllPassed] = useState(false);
  const [isFirstTimeEarned, setIsFirstTimeEarned] = useState<boolean | null>(null);
  const [githubModalOpen, setGithubModalOpen] = useState(false);

  // Reset state when lesson changes
  useEffect(() => {
    setCode(lesson.exercise.starterCode);
    setExecutionResult(null);
    setTestResults([]);
    setRevealedHints(0);
    setShowSolutionConfirm(false);
    setSolutionShown(false);
    const alreadyDone = stats.completedLessonIds.includes(lesson.id);
    setAllPassed(alreadyDone);
    setIsFirstTimeEarned(alreadyDone ? false : null);
  }, [lesson.id, lesson.exercise.starterCode, stats.completedLessonIds]);

  const handleReset = () => {
    if (window.confirm('¿Reiniciar el código de este ejercicio a su estado inicial?')) {
      setCode(lesson.exercise.starterCode);
      setExecutionResult(null);
      setTestResults([]);
      sounds.playClick();
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    sounds.playRun();

    const lang = lesson.language || module.language || 'javascript';
    const result = await runCodeMultiLanguage(code, lang);
    setExecutionResult(result);
    setIsRunning(false);

    // Evaluate test cases
    const results = lesson.exercise.testCases.map((tc) => {
      try {
        const passedOrObj = tc.testFn(result.logs, result.scope, code);
        const passed = typeof passedOrObj === 'boolean' ? passedOrObj : passedOrObj.passed;
        return {
          description: tc.description,
          passed: Boolean(passed),
          hint: tc.hint,
        };
      } catch (e) {
        return {
          description: tc.description,
          passed: false,
          hint: tc.hint,
        };
      }
    });

    setTestResults(results);

    const hasPassedAll = results.length > 0 && results.every((r) => r.passed);
    setAllPassed(hasPassedAll);

    if (hasPassedAll) {
      sounds.playSuccess();
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
      });
      const { isFirstCompletion } = completeLesson(lesson.id, module.id, lesson.xpReward);
      setIsFirstTimeEarned(isFirstCompletion);
    } else {
      sounds.playError();
    }
  };

  const handleShowNextHint = () => {
    sounds.playClick();
    setRevealedHints((prev) => Math.min(prev + 1, lesson.exercise.hints.length));
  };

  const handleRevealSolution = () => {
    sounds.playClick();
    setCode(lesson.exercise.solution);
    setSolutionShown(true);
    setShowSolutionConfirm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Top Workspace Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            title="Volver al inicio y mapa de cursos"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-xs font-medium group"
          >
            <Home className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Volver al Inicio</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button
              onClick={onBack}
              title="Volver al Inicio"
              className="hover:text-cyan-400 text-slate-400 hover:underline transition-colors font-medium flex items-center gap-1"
            >
              <span>Inicio</span>
            </button>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-cyan-400">{module.title.split(':')[0]}</span>
            <span aria-hidden="true">/</span>
            <span className="text-white font-medium truncate max-w-[150px] sm:max-w-none">{lesson.title}</span>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <span className="text-slate-500">Recompensa:</span>
            <span className="text-cyan-400 font-bold tabular-nums">+{lesson.xpReward} XP</span>
          </div>
          {allPassed && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Check className="w-3.5 h-3.5" />
              <span>Superada</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Two-Zone Sandbox Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: Concepts, Instructions, Hints and Test Checklist (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* View Toggle Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => {
                setActiveTab('exercise');
                sounds.playClick();
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'exercise'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Ejercicio Práctico</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('theory');
                sounds.playClick();
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'theory'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Teoría y Ejemplos</span>
            </button>
          </div>

          {/* Exercise Panel */}
          {activeTab === 'exercise' && (
            <div className="space-y-4">
              {/* Objective Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Misión del Ejercicio</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  {lesson.exercise.goal}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {lesson.exercise.instructions.map((inst, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Automated Tests Checklist */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span>Requisitos de Validación:</span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    {testResults.filter((t) => t.passed).length} / {lesson.exercise.testCases.length} cumplidos
                  </span>
                </div>

                <div className="space-y-2">
                  {lesson.exercise.testCases.map((tc, idx) => {
                    const result = testResults[idx];
                    const hasRun = result !== undefined;
                    const passed = result?.passed;

                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 transition-colors ${
                          !hasRun
                            ? 'bg-slate-950/60 border-slate-800/80 text-slate-300'
                            : passed
                            ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300'
                            : 'bg-rose-950/30 border-rose-800/50 text-rose-300'
                        }`}
                      >
                        <div className="shrink-0 mt-0.5">
                          {!hasRun ? (
                            <div className="w-4 h-4 rounded-full border border-slate-600" />
                          ) : passed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium leading-relaxed">{tc.description}</div>
                          {hasRun && !passed && tc.hint && (
                            <div className="mt-1 text-[11px] text-rose-400/90 italic">
                              Pista: {tc.hint}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Hints & Solution Section */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span>¿Te has atascado?</span>
                  </div>
                  {revealedHints < lesson.exercise.hints.length && (
                    <button
                      onClick={handleShowNextHint}
                      className="text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
                    >
                      Ver Pista {revealedHints + 1} de {lesson.exercise.hints.length}
                    </button>
                  )}
                </div>

                {/* Revealed hints */}
                {revealedHints > 0 && (
                  <div className="space-y-2 mt-2">
                    {lesson.exercise.hints.slice(0, revealedHints).map((hint, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs leading-relaxed"
                      >
                        <span className="font-bold text-amber-400">Pista {idx + 1}: </span>
                        {hint}
                      </div>
                    ))}
                  </div>
                )}

                {/* Show Solution Accordion */}
                <div className="pt-2 border-t border-slate-800/80">
                  {!showSolutionConfirm && !solutionShown && (
                    <button
                      onClick={() => setShowSolutionConfirm(true)}
                      className="text-[11px] text-slate-400 hover:text-slate-200 underline transition-colors"
                    >
                      Ver solución sugerida
                    </button>
                  )}

                  {showSolutionConfirm && !solutionShown && (
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                      <p className="text-xs text-slate-300">
                        Te recomendamos intentar resolverlo por tu cuenta antes. ¿Seguro que quieres cargar la solución?
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleRevealSolution}
                          className="px-3 py-1 rounded bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400"
                        >
                          Sí, cargar solución
                        </button>
                        <button
                          onClick={() => setShowSolutionConfirm(false)}
                          className="px-3 py-1 rounded bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}

                  {solutionShown && (
                    <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-400">
                      Solución cargada en el editor. ¡Revísala y ejecútala para comprender el funcionamiento!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Theory Panel */}
          {activeTab === 'theory' && (
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-5">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-white">
                    {lesson.title}
                  </h3>
                  {onOpenIntro && (
                    <button
                      onClick={onOpenIntro}
                      className="px-2.5 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto shrink-0 shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Guía Visual: ¿Qué es JavaScript?</span>
                    </button>
                  )}
                </div>

                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                  {lesson.theory.introduction}
                </div>
              </div>

              {/* Rich intro sections if defined (e.g. lesson 1.1) */}
              {lesson.theory.introSections && lesson.theory.introSections.length > 0 && (
                <div className="space-y-4 pt-1">
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Secciones de la Introducción:</span>
                  </div>

                  {lesson.theory.introSections.map((sec, sIdx) => (
                    <div key={sIdx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                      <div>
                        <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-bold">
                            {sIdx + 1}
                          </span>
                          <span>{sec.title}</span>
                        </h4>
                        {sec.subtitle && (
                          <div className="text-xs text-slate-400 mt-0.5">{sec.subtitle}</div>
                        )}
                      </div>

                      {sec.content.map((c, cIdx) => (
                        <p key={cIdx} className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                          {c}
                        </p>
                      ))}

                      {sec.codeExample && (
                        <div>
                          <div className="text-[11px] font-semibold text-slate-400 mb-1">Código:</div>
                          <div className="rounded-lg bg-slate-900 border border-slate-800 p-2.5 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
                            <pre>{sec.codeExample}</pre>
                          </div>
                        </div>
                      )}

                      {sec.result && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-400 font-semibold">Resultado:</span>
                          <span className="font-mono text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 font-bold whitespace-pre">
                            {sec.result}
                          </span>
                        </div>
                      )}

                      {sec.breakdown && (
                        <div className="space-y-1.5 pt-1">
                          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                            ¿Qué pasó?
                          </div>
                          <ul className="space-y-1 text-xs text-slate-300">
                            {sec.breakdown.map((b, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2">
                                <code className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-[11px]">
                                  {b.term}
                                </code>
                                <span className="leading-relaxed">{b.explanation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {sec.callout && (
                        <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-cyan-200 text-xs leading-relaxed whitespace-pre-line">
                          {sec.callout}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Key points */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  Puntos Clave:
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                  {lesson.theory.keyPoints.map((kp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold select-none">•</span>
                      <span>{kp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code Example */}
              <div>
                <div className="text-xs font-semibold text-slate-400 mb-1.5">
                  Ejemplo Principal:
                </div>
                <div className="rounded-lg bg-slate-950 border border-slate-800 p-3 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
                  <pre>{lesson.theory.codeExample}</pre>
                </div>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                <span className="font-semibold text-slate-200">Explicación: </span>
                <span className="whitespace-pre-line">{lesson.theory.explanation}</span>
              </div>

              {lesson.theory.tip && (
                <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-cyan-300 text-xs flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Consejo de Byte: </span>
                    {lesson.theory.tip}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Zone: Live Code Editor + Output Console (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Success Banner if All Passed */}
          {allPassed && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/80 via-emerald-900/60 to-slate-900 border border-emerald-500/40 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>¡Excelente trabajo! Ejercicio completado</span>
                    {isFirstTimeEarned ? (
                      <span className="text-xs text-amber-400 font-mono font-bold">+{lesson.xpReward} XP</span>
                    ) : (
                      <span className="text-xs text-slate-400 font-mono font-medium">(Lección ya superada previamente)</span>
                    )}
                  </h4>
                  <p className="text-xs text-emerald-300/90 mt-0.5">
                    {isFirstTimeEarned
                      ? 'Has superado todos los requisitos de validación y ganado tus XP.'
                      : 'Has vuelto a resolver el ejercicio con éxito. ¡Gran práctica!'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setGithubModalOpen(true);
                  }}
                  className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-cyan-300 font-semibold text-xs sm:text-sm flex items-center gap-1.5 whitespace-nowrap transition-all active:scale-95 shadow-sm"
                  title="Exportar esta solución directamente a tu cuenta de GitHub"
                >
                  <Github className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Exportar a GitHub</span>
                </button>

                <button
                  onClick={onBack}
                  title="Volver al inicio de los cursos"
                  className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 whitespace-nowrap transition-all"
                >
                  <Home className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Volver al Inicio</span>
                </button>

                {onNextLesson && (
                  <button
                    onClick={onNextLesson}
                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 whitespace-nowrap shadow-md shadow-emerald-500/20 transition-all shrink-0 active:scale-95"
                  >
                    <span>Siguiente Lección</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Live Code Editor */}
          <div className="h-[360px]">
            <CodeEditor
              code={code}
              onChange={setCode}
              onRun={handleRunCode}
              onReset={handleReset}
              isRunning={isRunning}
              language={lesson.language || module.language || 'javascript'}
            />
          </div>

          {/* Immediate Execution Console Output */}
          <ConsoleOutput
            result={executionResult}
            onClear={() => setExecutionResult(null)}
          />
        </div>
      </div>

      {/* GitHub Export Modal */}
      <GitHubExportModal
        isOpen={githubModalOpen}
        onClose={() => setGithubModalOpen(false)}
        projectName={`${module.title.split(':')[0]} - ${lesson.title}`}
        language={lesson.language || module.language || 'javascript'}
        code={code}
        authorName={stats.name}
      />
    </div>
  );
};
