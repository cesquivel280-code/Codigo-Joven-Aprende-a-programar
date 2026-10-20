import React from 'react';
import { Terminal, Trash2, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { ExecutionResult } from '../types/course';

interface ConsoleOutputProps {
  result: ExecutionResult | null;
  onClear: () => void;
}

export const ConsoleOutput: React.FC<ConsoleOutputProps> = ({ result, onClear }) => {
  const hasLogs = result && result.logs.length > 0;
  const hasErrors = result && result.errors.length > 0;
  const hasRun = result !== null;

  return (
    <div className="flex flex-col h-full rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
      {/* Console Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-slate-300 font-medium">Consola de Salida</span>
          {hasRun && (
            <>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 flex items-center gap-1 tabular-nums text-[11px]">
                <Clock className="w-3 h-3 text-slate-500" />
                {result.executionTimeMs} ms
              </span>
            </>
          )}
        </div>

        <button
          onClick={onClear}
          title="Limpiar consola"
          className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="text-[11px]">Limpiar</span>
        </button>
      </div>

      {/* Console Body */}
      <div className="flex-1 p-3.5 font-mono text-xs overflow-y-auto space-y-2 min-h-[160px] max-h-[280px]">
        {!hasRun && (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 py-6 text-center select-none">
            <Terminal className="w-6 h-6 mb-2 text-slate-600" />
            <p className="text-xs">Pulsa <span className="text-cyan-400 font-semibold">"Ejecutar"</span> para ver los resultados de tu código aquí en tiempo real.</p>
          </div>
        )}

        {/* Regular console logs */}
        {hasLogs && (
          <div className="space-y-1">
            {result.logs.map((log, index) => (
              <div
                key={index}
                className="flex items-start gap-2 text-slate-200 leading-relaxed break-all border-b border-slate-900/50 pb-1"
              >
                <span className="text-cyan-500/70 select-none">&gt;</span>
                <span className="whitespace-pre-wrap">{log}</span>
              </div>
            ))}
          </div>
        )}

        {/* Errors / Warnings */}
        {hasErrors && (
          <div className="space-y-2 mt-2">
            {result.errors.map((err, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs leading-relaxed"
              >
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div className="whitespace-pre-wrap font-sans">{err}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Return value if logs are empty but code returned something */}
        {hasRun && !hasLogs && !hasErrors && result.returnValue !== undefined && (
          <div className="text-slate-400 italic">
            Valor de retorno: <span className="text-cyan-300 not-italic">{String(result.returnValue)}</span>
          </div>
        )}

        {/* Successful run with no output */}
        {hasRun && !hasLogs && !hasErrors && result.returnValue === undefined && (
          <div className="text-slate-500 italic text-xs">
            El código se ejecutó con éxito (sin mensajes en consola). Recuerda usar <span className="font-mono text-cyan-400">console.log(...)</span> para imprimir datos.
          </div>
        )}
      </div>
    </div>
  );
};
