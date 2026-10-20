import React, { useRef, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface CodeEditorProps {
  code: string;
  onChange: (val: string) => void;
  onRun: () => void;
  onReset: () => void;
  isRunning?: boolean;
  language?: 'javascript' | 'python' | 'react';
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onRun,
  onReset,
  isRunning = false,
  language = 'javascript',
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = React.useState(false);

  // Quick insertion helpers tailored to the language
  const jsSymbols = [
    { label: 'console.log()', insert: 'console.log();', offset: -2 },
    { label: 'let', insert: 'let ' },
    { label: 'const', insert: 'const ' },
    { label: '{ }', insert: '{\n  \n}', offset: -2 },
    { label: '( )', insert: '()', offset: -1 },
    { label: '[ ]', insert: '[]', offset: -1 },
    { label: '" "', insert: '""', offset: -1 },
    { label: '` `', insert: '``', offset: -1 },
    { label: '===', insert: ' === ' },
    { label: '&&', insert: ' && ' },
    { label: '||', insert: ' || ' },
    { label: '=>', insert: ' => ' },
    { label: ';', insert: ';' },
  ];

  const pySymbols = [
    { label: 'print()', insert: 'print()', offset: -1 },
    { label: 'f"..."', insert: 'f""', offset: -1 },
    { label: 'def :', insert: 'def nombre():\n    ', offset: -7 },
    { label: 'if :', insert: 'if :\n    ', offset: -6 },
    { label: 'elif :', insert: 'elif :\n    ', offset: -6 },
    { label: 'else:', insert: 'else:\n    ', offset: 0 },
    { label: 'for in range():', insert: 'for i in range():\n    ', offset: -7 },
    { label: 'while :', insert: 'while :\n    ', offset: -6 },
    { label: 'True', insert: 'True' },
    { label: 'False', insert: 'False' },
    { label: 'and', insert: ' and ' },
    { label: 'or', insert: ' or ' },
    { label: 'not', insert: 'not ' },
    { label: 'len()', insert: 'len()', offset: -1 },
    { label: '[ ]', insert: '[]', offset: -1 },
    { label: '{ }', insert: '{}', offset: -1 },
    { label: '#', insert: '# ' },
  ];

  const reactSymbols = [
    { label: 'useState()', insert: 'const [state, setState] = React.useState();', offset: -2 },
    { label: 'return ()', insert: 'return (\n  \n);', offset: -3 },
    { label: '<div className="">', insert: '<div className="">\n  \n</div>', offset: -8 },
    { label: 'onClick={}', insert: 'onClick={() => }', offset: -1 },
    { label: 'console.log()', insert: 'console.log();', offset: -2 },
    { label: 'const', insert: 'const ' },
    { label: '=>', insert: ' => ' },
    { label: '{ }', insert: '{}', offset: -1 },
  ];

  const quickSymbols = language === 'python' ? pySymbols : language === 'react' ? reactSymbols : jsSymbols;
  const fileName = language === 'python' ? 'main.py' : language === 'react' ? 'App.jsx' : 'script.js';

  const handleInsertSymbol = (insert: string, offset: number = 0) => {
    sounds.playClick();
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newCode = code.substring(0, start) + insert + code.substring(end);
    onChange(newCode);

    setTimeout(() => {
      textarea.focus();
      const newPos = start + insert.length + offset;
      textarea.setSelectionRange(newPos, newPos);
    }, 10);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter or Cmd+Enter to run
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
      return;
    }

    // Tab key inserts 2 or 4 spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const indent = language === 'python' ? '    ' : '  ';
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + indent + code.substring(end);
      onChange(newCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + indent.length;
      }, 0);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const linesCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(linesCount, 12) }, (_, i) => i + 1);

  return (
    <div className="flex flex-col h-full rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono text-cyan-300 font-bold">{fileName}</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 font-mono text-[11px] uppercase">
            {language}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            title="Copiar código"
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onReset}
            title="Restaurar código inicial"
            className="flex items-center gap-1 px-2.5 py-1 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
          <button
            onClick={onRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/20 active:scale-95 transition-all disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? 'Ejecutando...' : 'Ejecutar'}</span>
            <kbd className="hidden lg:inline text-[10px] bg-cyan-600/30 text-slate-900 px-1 rounded font-mono ml-1">
              Ctrl+↵
            </kbd>
          </button>
        </div>
      </div>

      {/* Quick Symbol helper bar for beginners */}
      <div className="flex items-center gap-1 px-3 py-1.5 bg-slate-900/60 border-b border-slate-800/80 overflow-x-auto text-xs no-scrollbar">
        <span className="text-[11px] font-medium text-slate-400 mr-1.5 shrink-0">
          Atajos {language}:
        </span>
        {quickSymbols.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => handleInsertSymbol(item.insert, item.offset)}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-950 hover:text-cyan-300 hover:border-cyan-500/50 border border-slate-700/60 font-mono text-slate-300 text-[11px] shrink-0 transition-colors"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Editor Body: Line numbers + Textarea */}
      <div className="relative flex-1 flex min-h-[280px] bg-slate-950 text-slate-100 font-mono text-sm leading-6">
        {/* Line Numbers Column */}
        <div
          aria-hidden="true"
          className="select-none py-3 px-3 text-right bg-slate-950 border-r border-slate-900 text-slate-600 font-mono text-xs tabular-nums w-12 shrink-0 leading-6"
        >
          {lineNumbers.map((num) => (
            <div key={num}>{num}</div>
          ))}
        </div>

        {/* Textarea Code Input */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          className="flex-1 w-full h-full p-3 bg-transparent text-slate-100 font-mono text-sm leading-6 resize-none outline-none selection:bg-cyan-500 selection:text-slate-950"
          placeholder={
            language === 'python'
              ? '# Escribe aquí tu código en Python 3...'
              : language === 'react'
              ? '// Escribe aquí tu componente React...'
              : '// Escribe aquí tu código en JavaScript...'
          }
        />
      </div>
    </div>
  );
};
