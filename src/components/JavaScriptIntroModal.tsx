import React, { useState, useEffect } from 'react';
import {
  X,
  Home,
  Sparkles,
  Terminal,
  Play,
  Layers,
  Code2,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Gamepad2,
  Calculator,
  MousePointerClick,
  Bot,
  Zap,
  HelpCircle,
  Check,
  AlertCircle,
  ListChecks,
} from 'lucide-react';
import { runCode } from '../utils/codeRunner';
import { sounds } from '../utils/soundEffects';

interface JavaScriptIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoHome?: () => void;
  onStartLesson1?: () => void;
}

const TABS = [
  { id: 'concept', label: '1. ¿Qué es JavaScript?', icon: Sparkles, color: 'text-cyan-400' },
  { id: 'first-program', label: '2. Tu Primer Programa', icon: Terminal, color: 'text-amber-400' },
  { id: 'html-css-js', label: '3. HTML, CSS y JS', icon: Layers, color: 'text-violet-400' },
  { id: 'basic-commands', label: '4. Variables (let vs const)', icon: Code2, color: 'text-emerald-400' },
  { id: 'other-commands', label: '5. Otros Comandos Útiles', icon: Calculator, color: 'text-blue-400' },
  { id: 'if-decisions', label: '6. Decisiones con if', icon: Zap, color: 'text-amber-400' },
  { id: 'quick-summary', label: '7. Resumen Rápido', icon: ListChecks, color: 'text-teal-400' },
] as const;

type TabType = typeof TABS[number]['id'];

export const JavaScriptIntroModal: React.FC<JavaScriptIntroModalProps> = ({
  isOpen,
  onClose,
  onGoHome,
  onStartLesson1,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('concept');
  const [runOutputs, setRunOutputs] = useState<Record<string, string[]>>({});
  const [isExecuting, setIsExecuting] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleTestSnippet = async (id: string, code: string) => {
    setIsExecuting(id);
    sounds.playRun();
    const res = await runCode(code);
    setRunOutputs((prev) => ({
      ...prev,
      [id]: res.logs.length > 0 ? res.logs : (res.errors.length > 0 ? res.errors : ['(Sin salida)']),
    }));
    setIsExecuting(null);
  };

  const handleHomeClick = () => {
    sounds.playClick();
    if (onGoHome) {
      onGoHome();
    } else {
      onClose();
    }
  };

  const handleStartLesson = () => {
    sounds.playClick();
    if (onStartLesson1) {
      onStartLesson1();
    } else {
      onClose();
    }
  };

  const currentTabIndex = TABS.findIndex((t) => t.id === activeTab);

  const handleNextTab = () => {
    if (currentTabIndex < TABS.length - 1) {
      sounds.playClick();
      setActiveTab(TABS[currentTabIndex + 1].id);
    } else {
      handleStartLesson();
    }
  };

  const handlePrevTab = () => {
    if (currentTabIndex > 0) {
      sounds.playClick();
      setActiveTab(TABS[currentTabIndex - 1].id);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-cyan-500/20 shrink-0">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  Guía de Introducción Oficial
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-[11px] text-slate-400">Conceptos Fundamentales</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                ¿Qué es JavaScript?
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onGoHome && (
              <button
                type="button"
                onClick={handleHomeClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-xs font-semibold"
                title="Volver a la pantalla de inicio"
              >
                <Home className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Volver al Inicio</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Cerrar modal (Escape)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 p-2 gap-1 overflow-x-auto shrink-0 scrollbar-none">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveTab(tab.id);
                }}
                className={`px-3 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${tab.color}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto text-slate-200 text-sm leading-relaxed">
          {/* TAB 1: ¿QUÉ ES JAVASCRIPT? */}
          {activeTab === 'concept' && (
            <div className="space-y-6">
              {/* Main definition banner */}
              <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 to-slate-900 p-5 space-y-3">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <span>¿Qué es JavaScript?</span>
                </h3>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  <strong className="text-cyan-300">JavaScript</strong> es un lenguaje de programación que le da instrucciones a una computadora, un celular o una página web para que hagan algo.
                </p>
              </div>

              {/* What you can create */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Con JavaScript podés crear:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Gamepad2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm">Minijuegos</h5>
                      <p className="text-xs text-slate-400 mt-0.5">Puzzles, Juegos 2D, acertijos y aventuras interactivas.</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm">Calculadoras</h5>
                      <p className="text-xs text-slate-400 mt-0.5">Herramientas de conversión, cálculos matemáticos y financieros.</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                      <MousePointerClick className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm">Botones que responden al hacer clic</h5>
                      <p className="text-xs text-slate-400 mt-0.5">Animaciones, ventanas emergentes y acciones dinámicas.</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm">Contadores de puntos y vidas</h5>
                      <p className="text-xs text-slate-400 mt-0.5">Sistemas de puntuación, niveles, rachas e inventarios.</p>
                    </div>
                  </div>

                  <div className="sm:col-span-2 p-3.5 rounded-xl bg-gradient-to-r from-purple-950/40 via-slate-950 to-slate-950 border border-purple-500/30 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm">Aplicaciones y asistentes con Inteligencia Artificial</h5>
                      <p className="text-xs text-slate-400 mt-0.5">Chatbots, reconocimiento inteligente y herramientas del futuro.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analogy box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-amber-300 text-xs uppercase tracking-wide">
                    Pensalo así:
                  </span>
                  <p className="text-slate-300 text-sm">
                    La computadora es un <strong className="text-white">alumno muy obediente</strong>. JavaScript es el idioma que usamos para decirle exactamente qué hacer.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TU PRIMER PROGRAMA */}
          {activeTab === 'first-program' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Tu primer programa</h3>
                  <p className="text-xs text-slate-400">Cómo darle una orden a la computadora con una función.</p>
                </div>
              </div>

              {/* Ejemplo 1 */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center">1</span>
                    <h4 className="font-bold text-white text-sm">Ejemplo: Saludo de bienvenida</h4>
                  </div>
                  <button
                    onClick={() => handleTestSnippet('saludar', 'function saludar() {\n  console.log("¡Bienvenido!");\n}\n\nsaludar();')}
                    disabled={isExecuting === 'saludar'}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>{isExecuting === 'saludar' ? 'Ejecutando...' : 'Ejecutar Ejemplo'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Code */}
                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                    <pre>{`function saludar() {\n  console.log("¡Bienvenido!");\n}\n\nsaludar();`}</pre>
                  </div>

                  {/* Output */}
                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-slate-400 mb-1">Resultado:</div>
                      <div className="font-mono text-xs font-bold text-emerald-400 bg-slate-950 px-2.5 py-1.5 rounded border border-slate-800">
                        {runOutputs['saludar'] ? runOutputs['saludar'].join('\n') : '¡Bienvenido!'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* What happened breakdown */}
                <div className="rounded-lg bg-slate-900/60 border border-slate-800/80 p-4 space-y-2">
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    ¿Qué pasó?
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">function</span>
                      <span>crea una función.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">saludar</span>
                      <span>es el nombre.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">{`{ }`}</span>
                      <span>guarda las instrucciones.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">saludar();</span>
                      <span>ejecuta la función.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Ejemplo 2 */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">2</span>
                    <h4 className="font-bold text-white text-sm">Otro ejemplo:</h4>
                  </div>
                  <button
                    onClick={() => handleTestSnippet('sumar', 'function sumar() {\n  console.log(5 + 7);\n}\n\nsumar();')}
                    disabled={isExecuting === 'sumar'}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>{isExecuting === 'sumar' ? 'Ejecutando...' : 'Ejecutar Ejemplo'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto">
                    <pre>{`function sumar() {\n  console.log(5 + 7);\n}\n\nsumar();`}</pre>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-slate-400 mb-1">Resultado:</div>
                      <div className="font-mono text-xs font-bold text-emerald-400 bg-slate-950 px-2.5 py-1.5 rounded border border-slate-800">
                        {runOutputs['sumar'] ? runOutputs['sumar'].join('\n') : '12'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DIFERENCIA ENTRE HTML, CSS Y JAVASCRIPT */}
          {activeTab === 'html-css-js' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Diferencia entre HTML, CSS y JavaScript</h3>
                <p className="text-xs text-slate-400 font-medium text-cyan-400 mt-0.5">Los tres trabajan juntos.</p>
              </div>

              {/* Table */}
              <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-300 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Lenguaje</th>
                      <th className="p-3.5">Función</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    <tr>
                      <td className="p-3.5 font-bold text-orange-400 font-mono">HTML</td>
                      <td className="p-3.5 text-slate-200">Crea la estructura.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-blue-400 font-mono">CSS</td>
                      <td className="p-3.5 text-slate-200">Da el diseño y los colores</td>
                    </tr>
                    <tr className="bg-cyan-950/20">
                      <td className="p-3.5 font-bold text-cyan-300 font-mono">JavaScript</td>
                      <td className="p-3.5 text-white font-medium">Hace que las cosas funcionen y respondan a tus acciones.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Imaginá un botón */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wide">
                  <MousePointerClick className="w-4 h-4" />
                  <span>Imaginá un botón</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-orange-500/20">
                    <span className="font-bold text-orange-400 block mb-1">HTML</span>
                    <span className="text-slate-300">Crea el botón.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-blue-500/20">
                    <span className="font-bold text-blue-400 block mb-1">CSS</span>
                    <span className="text-slate-300">Lo pinta de azul y le cambia el tamaño.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-cyan-500/30 bg-cyan-950/20">
                    <span className="font-bold text-cyan-400 block mb-1">JavaScript</span>
                    <span className="text-slate-200">Hace que al tocarlo aparezca un mensaje o empiece un juego.</span>
                  </div>
                </div>
              </div>

              {/* Una comparación fácil */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Home className="w-4 h-4 text-emerald-400" />
                  <span>Una comparación fácil</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="font-bold text-orange-400 block">HTML:</span>
                    <span className="text-slate-300 mt-1 block">las paredes de una casa.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="font-bold text-blue-400 block">CSS:</span>
                    <span className="text-slate-300 mt-1 block">la pintura y la decoración.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-cyan-500/30">
                    <span className="font-bold text-cyan-400 block">JavaScript:</span>
                    <span className="text-slate-200 mt-1 block font-medium">la electricidad que hace funcionar todo.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: COMANDOS BÁSICOS (console, let, const & let vs const) */}
          {activeTab === 'basic-commands' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Comandos básicos de JavaScript</h3>
                <p className="text-xs text-slate-400">Instrucciones fundamentales: mostrar datos y guardar valores en variables.</p>
              </div>

              {/* 1. console.log() */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-cyan-400 font-mono">console.log()</h4>
                    <p className="text-xs text-slate-300 mt-0.5">Sirve para mostrar información.</p>
                  </div>
                  <button
                    onClick={() => handleTestSnippet('console-log', 'console.log("Hola");\nconsole.log(10 + 5);')}
                    disabled={isExecuting === 'console-log'}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>{isExecuting === 'console-log' ? 'Ejecutando...' : 'Probar'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-slate-200">
                    <pre>{`console.log("Hola");\nconsole.log(10 + 5);`}</pre>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-between">
                    <div className="text-[11px] font-semibold text-slate-400">Resultado:</div>
                    <div className="font-mono text-xs font-bold text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800 whitespace-pre">
                      {runOutputs['console-log'] ? runOutputs['console-log'].join('\n') : 'Hola\n15'}
                    </div>
                  </div>
                </div>

                {/* Important warning */}
                <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-rose-200">Importante: </span>
                    el nombre correcto es <code className="bg-slate-900 px-1 py-0.5 rounded text-rose-300 font-mono font-bold">console.log()</code>, no <code className="bg-slate-900 px-1 py-0.5 rounded text-slate-400 font-mono line-through">const.log()</code>.
                  </div>
                </div>
              </div>

              {/* 2. let */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-emerald-400 font-mono">let</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      <strong className="text-emerald-300">let</strong> crea una variable que puede cambiar. Una variable es como una <strong>caja donde guardamos información</strong>.
                    </p>
                  </div>
                  <button
                    onClick={() => handleTestSnippet('let-test', 'let puntos = 0;\nconsole.log(puntos);\n\npuntos = 50;\nconsole.log(puntos);')}
                    disabled={isExecuting === 'let-test'}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>{isExecuting === 'let-test' ? 'Ejecutando...' : 'Probar'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-slate-200">
                    <pre>{`let puntos = 0;\n\nconsole.log(puntos);\n\npuntos = 50;\n\nconsole.log(puntos);`}</pre>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-between">
                    <div className="text-[11px] font-semibold text-slate-400">Resultado:</div>
                    <div className="font-mono text-xs font-bold text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800 whitespace-pre">
                      {runOutputs['let-test'] ? runOutputs['let-test'].join('\n') : '0\n50'}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  <span className="font-semibold text-white">Se usa para cosas que cambian, como: </span>
                  <div className="inline-flex flex-wrap gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300 font-mono font-medium">puntos</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300 font-mono font-medium">vidas</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300 font-mono font-medium">nivel</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300 font-mono font-medium">tiempo</span>
                  </div>
                </div>
              </div>

              {/* 3. const */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-amber-400 font-mono">const</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      <strong className="text-amber-300">const</strong> crea una variable que no puede recibir una nueva asignación.
                    </p>
                  </div>
                  <button
                    onClick={() => handleTestSnippet('const-test', 'const nombreJuego = "Mi Primer Juego";\nconsole.log(nombreJuego);')}
                    disabled={isExecuting === 'const-test'}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>{isExecuting === 'const-test' ? 'Ejecutando...' : 'Probar'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-slate-200">
                    <pre>{`const nombreJuego = "Mi Primer Juego";\n\nconsole.log(nombreJuego);`}</pre>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-between">
                    <div className="text-[11px] font-semibold text-slate-400">Resultado:</div>
                    <div className="font-mono text-xs font-bold text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
                      {runOutputs['const-test'] ? runOutputs['const-test'].join('\n') : 'Mi Primer Juego'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Si hacés esto: Error de const */}
              <div className="rounded-xl border border-rose-500/40 bg-gradient-to-r from-rose-950/30 via-slate-950 to-slate-950 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Si hacés esto:</h4>
                      <p className="text-xs text-rose-300">JavaScript mostrará un error.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleTestSnippet('const-error', 'const vidas = 3;\nvidas = 5;')}
                    disabled={isExecuting === 'const-error'}
                    className="px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{isExecuting === 'const-error' ? 'Probando...' : 'Probar qué pasa'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-900 border border-rose-900/50 font-mono text-xs text-rose-200">
                    <pre>{`const vidas = 3;\nvidas = 5;`}</pre>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-rose-900/50 flex flex-col justify-between">
                    <div className="text-[11px] font-semibold text-slate-400">Resultado:</div>
                    <div className="font-mono text-xs font-semibold text-rose-400 bg-slate-950 p-2 rounded border border-rose-900/60 leading-relaxed whitespace-pre-wrap">
                      {runOutputs['const-error']
                        ? runOutputs['const-error'].join('\n')
                        : 'JavaScript mostrará un error.\n(TypeError: Assignment to constant variable)'}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                  <strong className="text-rose-300">¿Por qué falla?</strong> Porque <code className="bg-slate-900 px-1 py-0.5 rounded font-mono text-amber-300">const</code> protege la variable para que nadie pueda cambiar su valor por accidente. Si vas a necesitar modificar las vidas de tu jugador, debes declararla con <code className="bg-slate-900 px-1 py-0.5 rounded font-mono text-emerald-300">let</code>.
                </p>
              </div>

              {/* let vs const Table */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-cyan-400" />
                  <span>let vs const</span>
                </h4>
                <div className="overflow-hidden rounded-lg border border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-slate-300 font-bold border-b border-slate-800">
                      <tr>
                        <th className="p-3">Comando</th>
                        <th className="p-3">¿Puede cambiar?</th>
                        <th className="p-3 hidden sm:table-cell">Ejemplos de uso</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      <tr>
                        <td className="p-3 font-mono font-bold text-emerald-400">let</td>
                        <td className="p-3 font-bold text-emerald-300">Sí</td>
                        <td className="p-3 text-slate-400 hidden sm:table-cell">puntos, vidas, nivel, tiempo transcurrido</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-amber-400">const</td>
                        <td className="p-3 font-bold text-rose-300">No se puede reasignar</td>
                        <td className="p-3 text-slate-400 hidden sm:table-cell">nombreJuego, gravedad, velocidadMaxima</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: OTROS COMANDOS ÚTILES */}
          {activeTab === 'other-commands' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">5. Otros comandos útiles</h3>
                <p className="text-xs text-slate-400">Asignar valores, operaciones matemáticas básicas y comentarios en el código.</p>
              </div>

              {/* Asignar un valor */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-cyan-300">Asignar un valor:</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      <code className="text-cyan-300 font-mono font-bold bg-slate-900 px-1.5 py-0.5 rounded">=</code> significa <strong className="text-white">"guardar este valor"</strong>.
                    </p>
                  </div>
                  <button
                    onClick={() => handleTestSnippet('asignar-test', 'let edad = 20;\nconsole.log(edad);')}
                    disabled={isExecuting === 'asignar-test'}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>{isExecuting === 'asignar-test' ? 'Ejecutando...' : 'Probar'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-300">
                    <pre>{`let edad = 20;\nconsole.log(edad);`}</pre>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-between">
                    <div className="text-[11px] font-semibold text-slate-400">Resultado:</div>
                    <div className="font-mono text-xs font-bold text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
                      {runOutputs['asignar-test'] ? runOutputs['asignar-test'].join('\n') : '20'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Operaciones Matemáticas */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  <span>Operaciones matemáticas:</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Sumar */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-400 text-xs">Sumar:</span>
                      <button
                        onClick={() => handleTestSnippet('sumar-op', 'console.log(3 + 2);')}
                        disabled={isExecuting === 'sumar-op'}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" />
                        <span>Probar</span>
                      </button>
                    </div>
                    <div className="p-2 rounded bg-slate-900 font-mono text-xs text-slate-200 border border-slate-800">
                      console.log(3 + 2);
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-400">Resultado:</span>
                      <span className="font-mono font-bold text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {runOutputs['sumar-op'] ? runOutputs['sumar-op'].join('\n') : '5'}
                      </span>
                    </div>
                  </div>

                  {/* Restar */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-400 text-xs">Restar:</span>
                      <button
                        onClick={() => handleTestSnippet('restar-op', 'console.log(10 - 4);')}
                        disabled={isExecuting === 'restar-op'}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" />
                        <span>Probar</span>
                      </button>
                    </div>
                    <div className="p-2 rounded bg-slate-900 font-mono text-xs text-slate-200 border border-slate-800">
                      console.log(10 - 4);
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-400">Resultado:</span>
                      <span className="font-mono font-bold text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {runOutputs['restar-op'] ? runOutputs['restar-op'].join('\n') : '6'}
                      </span>
                    </div>
                  </div>

                  {/* Multiplicar */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-purple-400 text-xs">Multiplicar:</span>
                      <button
                        onClick={() => handleTestSnippet('mult-op', 'console.log(3 * 4);')}
                        disabled={isExecuting === 'mult-op'}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" />
                        <span>Probar</span>
                      </button>
                    </div>
                    <div className="p-2 rounded bg-slate-900 font-mono text-xs text-slate-200 border border-slate-800">
                      console.log(3 * 4);
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-400">Resultado:</span>
                      <span className="font-mono font-bold text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {runOutputs['mult-op'] ? runOutputs['mult-op'].join('\n') : '12'}
                      </span>
                    </div>
                  </div>

                  {/* Dividir */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-400 text-xs">Dividir:</span>
                      <button
                        onClick={() => handleTestSnippet('div-op', 'console.log(12 / 3);')}
                        disabled={isExecuting === 'div-op'}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" />
                        <span>Probar</span>
                      </button>
                    </div>
                    <div className="p-2 rounded bg-slate-900 font-mono text-xs text-slate-200 border border-slate-800">
                      console.log(12 / 3);
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-400">Resultado:</span>
                      <span className="font-mono font-bold text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {runOutputs['div-op'] ? runOutputs['div-op'].join('\n') : '4'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comentarios */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">Comentarios:</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Los comentarios sirven para escribir notas que la computadora no ejecuta.
                    </p>
                  </div>
                  <button
                    onClick={() => handleTestSnippet('comentarios-test', '// Esto es un comentario\n\nconsole.log("Hola");')}
                    disabled={isExecuting === 'comentarios-test'}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 border border-slate-700"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{isExecuting === 'comentarios-test' ? 'Ejecutando...' : 'Probar'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs">
                    <span className="text-slate-500">// Esto es un comentario</span>
                    <br />
                    <br />
                    <span className="text-cyan-300">console.log("Hola");</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-between">
                    <div className="text-[11px] font-semibold text-slate-400">Resultado:</div>
                    <div className="font-mono text-xs font-bold text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
                      {runOutputs['comentarios-test'] ? runOutputs['comentarios-test'].join('\n') : 'Hola'}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-400 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Se escriben con dos barras <code className="text-amber-300 font-mono font-bold">//</code> y son ideales para dejar explicaciones a otros programadores o a vos mismo.</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: TOMAR DECISIONES CON IF */}
          {activeTab === 'if-decisions' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Tomar decisiones con if:</h3>
                <p className="text-xs text-slate-300 mt-1">
                  <code className="text-amber-400 font-mono font-bold bg-slate-900 px-1.5 py-0.5 rounded">if</code> significa <strong className="text-white">"si"</strong>. Permite que el programa tome decisiones.
                </p>
              </div>

              {/* Main if example card */}
              <div className="rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-slate-950 to-slate-950 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <h4 className="font-bold text-white text-sm">Ejemplo interactivo:</h4>
                  </div>
                  <button
                    onClick={() => handleTestSnippet('if-test-60', 'let puntos = 60;\n\nif (puntos >= 50) {\n  console.log("¡Ganaste!");\n}')}
                    disabled={isExecuting === 'if-test-60'}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>{isExecuting === 'if-test-60' ? 'Ejecutando...' : 'Probar con 60 puntos'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300 leading-relaxed overflow-x-auto">
                    <pre>{`let puntos = 60;\n\nif (puntos >= 50) {\n  console.log("¡Ganaste!");\n}`}</pre>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-slate-400 mb-1">Resultado:</div>
                      <div className="font-mono text-xs font-bold text-emerald-400 bg-slate-950 px-3 py-2 rounded border border-slate-800">
                        {runOutputs['if-test-60'] ? runOutputs['if-test-60'].join('\n') : '¡Ganaste!'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Explanation of the condition */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>La condición pregunta:</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    <strong>¿Los puntos son mayores o iguales a 50?</strong>
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    Como vale <strong>60</strong>, muestra el mensaje.
                  </p>
                </div>

                {/* Compare what happens if condition is false */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-semibold text-slate-300">
                      ¿Qué pasa si los puntos valen menos de 50? (por ejemplo: 30)
                    </span>
                    <button
                      onClick={() => handleTestSnippet('if-test-30', 'let puntos = 30;\n\nif (puntos >= 50) {\n  console.log("¡Ganaste!");\n}\nconsole.log("(Fin del intento)");')}
                      disabled={isExecuting === 'if-test-30'}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold flex items-center gap-1"
                    >
                      <Play className="w-3 h-3" />
                      <span>Probar con 30 puntos</span>
                    </button>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 text-xs font-mono text-slate-400 border border-slate-800">
                    {runOutputs['if-test-30'] ? runOutputs['if-test-30'].join('\n') : 'Como 30 no es mayor ni igual a 50, ¡Ganaste! NO se ejecuta.'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: RESUMEN RÁPIDO */}
          {activeTab === 'quick-summary' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-400" />
                  <span>7. Resumen rápido</span>
                </h3>
                <p className="text-xs text-slate-400">Guarda estos conceptos esenciales en tu mente antes de empezar a programar.</p>
              </div>

              {/* Cheat sheet grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-mono font-bold text-cyan-300 text-xs">console.log()</h5>
                    <p className="text-xs text-slate-300 mt-0.5">→ muestra información.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-mono font-bold text-emerald-400 text-xs">let</h5>
                    <p className="text-xs text-slate-300 mt-0.5">→ variable que puede cambiar.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-mono font-bold text-amber-400 text-xs">const</h5>
                    <p className="text-xs text-slate-300 mt-0.5">→ variable que no se reasigna.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-mono font-bold text-purple-400 text-xs">function</h5>
                    <p className="text-xs text-slate-300 mt-0.5">→ crea una función.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-mono font-bold text-rose-400 text-xs">if</h5>
                    <p className="text-xs text-slate-300 mt-0.5">→ toma decisiones.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-mono font-bold text-blue-400 text-xs">+ - * /</h5>
                    <p className="text-xs text-slate-300 mt-0.5">→ realizan operaciones matemáticas.</p>
                  </div>
                </div>

                <div className="sm:col-span-2 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-700/40 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-mono font-bold text-slate-300 text-xs">//</h5>
                    <p className="text-xs text-slate-300 mt-0.5">→ escribe comentarios.</p>
                  </div>
                </div>
              </div>

              {/* Ready banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-blue-950/60 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-base font-bold text-white">¡Ya conoces las bases de JavaScript!</h4>
                  <p className="text-xs text-slate-300">
                    Estás listo para escribir tus primeras líneas de código reales y superar los desafíos interactivos.
                  </p>
                </div>
                <button
                  onClick={handleStartLesson}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 active:scale-95 shrink-0"
                >
                  <span>Empezar con Lección 1</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onGoHome && (
              <button
                type="button"
                onClick={handleHomeClick}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4 text-cyan-400" />
                <span>Volver al Inicio</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-semibold"
            >
              Cerrar Guía
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {currentTabIndex > 0 && (
              <button
                type="button"
                onClick={handlePrevTab}
                className="w-full sm:w-auto px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Anterior</span>
              </button>
            )}

            {currentTabIndex < TABS.length - 1 ? (
              <button
                type="button"
                onClick={handleNextTab}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-md shadow-cyan-500/20"
              >
                <span>Siguiente: {TABS[currentTabIndex + 1].label.split('.')[1]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStartLesson}
                className="w-full sm:w-auto px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Ir a la Lección 1: Primer Ejercicio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
