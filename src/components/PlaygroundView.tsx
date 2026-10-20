import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { playgroundSnippets, PlaygroundSnippet } from '../data/playgroundSnippets';
import { runCodeMultiLanguage } from '../utils/codeRunner';
import { ExecutionResult } from '../types/course';
import { sounds } from '../utils/soundEffects';
import { CodeEditor } from './CodeEditor';
import { ConsoleOutput } from './ConsoleOutput';
import { GitHubExportModal } from './GitHubExportModal';
import {
  Terminal,
  Sparkles,
  Layers,
  Home,
  Github,
  Play,
  Share2,
  FileCode,
  CheckCircle2,
} from 'lucide-react';

interface PlaygroundViewProps {
  onGoHome?: () => void;
}

export const PlaygroundView: React.FC<PlaygroundViewProps> = ({ onGoHome }) => {
  const { stats, unlockBadge } = useGame();
  const [selectedTech, setSelectedTech] = useState<'all' | 'javascript' | 'python' | 'react'>('all');
  const [activeSnippet, setActiveSnippet] = useState<PlaygroundSnippet>(playgroundSnippets[0]);
  const [currentLanguage, setCurrentLanguage] = useState<'javascript' | 'python' | 'react'>(
    playgroundSnippets[0].language
  );
  const [code, setCode] = useState(playgroundSnippets[0].code);
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [githubModalOpen, setGithubModalOpen] = useState(false);

  const filteredSnippets =
    selectedTech === 'all'
      ? playgroundSnippets
      : playgroundSnippets.filter((s) => s.language === selectedTech);

  const handleSelectSnippet = (snippet: PlaygroundSnippet) => {
    sounds.playClick();
    setActiveSnippet(snippet);
    setCurrentLanguage(snippet.language);
    setCode(snippet.code);
    setExecutionResult(null);
  };

  const handleRun = async () => {
    setIsRunning(true);
    sounds.playRun();
    const result = await runCodeMultiLanguage(code, currentLanguage);
    setExecutionResult(result);
    setIsRunning(false);

    if (result.errors.length === 0) {
      sounds.playSuccess();
      unlockBadge('badge-explorador-playground');
    } else {
      sounds.playError();
    }
  };

  const handleReset = () => {
    setCode(activeSnippet.code);
    setExecutionResult(null);
    sounds.playClick();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top back button */}
      {onGoHome && (
        <div className="mb-4">
          <button
            onClick={onGoHome}
            title="Volver al inicio y mapa de cursos"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-xs font-medium group"
          >
            <Home className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Volver al Inicio</span>
          </button>
        </div>
      )}

      {/* Header with Export to GitHub button */}
      <div className="mb-8 pb-6 border-b border-slate-800 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
            <Terminal className="w-4 h-4" />
            <span>Laboratorio Libre Multi-Tecnología</span>
            <span aria-hidden="true">•</span>
            <span className="capitalize">{currentLanguage} 3+</span>
            <span aria-hidden="true">•</span>
            <span>Exportable a GitHub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Sandbox y Proyectos Experimentales
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Escribe código libre en <strong>Python, JavaScript o React</strong>, prueba algoritmos, modifica proyectos de ejemplo y expórtalos directamente a tu cuenta de GitHub.
          </p>
        </div>

        {/* Action Controls: GitHub Export */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              sounds.playClick();
              setGithubModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-100 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-black/40 transition-all group active:scale-95"
            title="Exportar este proyecto directamente a tu GitHub o descargar repositorio"
          >
            <Github className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Exportar a GitHub</span>
          </button>
        </div>
      </div>

      {/* Technology Filter & Language Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          {(
            [
              { id: 'all', label: 'Todas las Tecnologías' },
              { id: 'javascript', label: 'JavaScript' },
              { id: 'python', label: 'Python 3' },
              { id: 'react', label: 'React' },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => {
                sounds.playClick();
                setSelectedTech(t.id);
                if (t.id !== 'all') {
                  setCurrentLanguage(t.id);
                  const firstMatch = playgroundSnippets.find((s) => s.language === t.id);
                  if (firstMatch) {
                    setActiveSnippet(firstMatch);
                    setCode(firstMatch.code);
                    setExecutionResult(null);
                  }
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                selectedTech === t.id
                  ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Lenguaje activo:</span>
          <span className="font-mono font-bold text-cyan-400 uppercase bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
            {currentLanguage}
          </span>
        </div>
      </div>

      {/* Snippet Template Selector Tabs */}
      <div className="mb-6">
        <div className="text-xs font-semibold text-slate-400 mb-2.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Plantillas de proyectos listas para ejecutar ({filteredSnippets.length}):</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredSnippets.map((snippet) => {
            const isSelected = snippet.id === activeSnippet.id;
            return (
              <button
                key={snippet.id}
                onClick={() => handleSelectSnippet(snippet)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="font-bold text-xs sm:text-sm text-white truncate">
                    {snippet.title}
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded shrink-0 ${
                      snippet.language === 'python'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : snippet.language === 'react'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    }`}
                  >
                    {snippet.language}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {snippet.description}
                </div>
                <div className="flex flex-wrap gap-1 mt-2.5">
                  {snippet.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor & Console Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Editor Area (7 cols) */}
        <div className="lg:col-span-7 h-[460px]">
          <CodeEditor
            code={code}
            onChange={setCode}
            onRun={handleRun}
            onReset={handleReset}
            isRunning={isRunning}
            language={currentLanguage}
          />
        </div>

        {/* Console & Inspector Area (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <ConsoleOutput result={executionResult} onClear={() => setExecutionResult(null)} />

          {/* Quick export banner */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-slate-300">
                ¿Te gusta tu código? Súbelo a tu portafolio en GitHub.
              </span>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setGithubModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shrink-0 active:scale-95"
            >
              Exportar
            </button>
          </div>

          {/* Live Scope Variables Inspector */}
          {executionResult && Object.keys(executionResult.scope).length > 0 && (
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-3">
                <Layers className="w-4 h-4" />
                <span>Inspector de Variables en Memoria</span>
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto font-mono text-xs">
                {Object.entries(executionResult.scope).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800/80"
                  >
                    <span className="text-cyan-300 font-semibold">{key}:</span>
                    <span className="text-slate-300 truncate max-w-[200px]">
                      {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* GitHub Export Modal */}
      <GitHubExportModal
        isOpen={githubModalOpen}
        onClose={() => setGithubModalOpen(false)}
        projectName={activeSnippet.title}
        language={currentLanguage}
        code={code}
        authorName={stats.name}
      />
    </div>
  );
};
