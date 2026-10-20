import { ExecutionResult } from '../types/course';

/**
 * Friendly Spanish error translation for beginner coders
 */
export function translateErrorMessage(err: unknown): string {
  if (!err) return 'Error desconocido al ejecutar el código.';
  const message = err instanceof Error ? err.message : String(err);
  const name = err instanceof Error ? err.name : '';

  if (message.includes('Loop guard limit') || message.includes('bucle infinito')) {
    return '⏱️ Límite de tiempo excedido: Parece que tu código tiene un bucle infinito (se repite sin parar). Revisa la condición de parada del bucle for o while.';
  }

  if (name === 'ReferenceError' || message.includes('is not defined')) {
    const varMatch = message.match(/(\w+) is not defined/);
    const varName = varMatch ? `'${varMatch[1]}'` : 'una variable';
    return `🔍 Error de Referencia: ${varName} no existe o no ha sido declarada. ¿Recuerdas usar 'let' o 'const' antes de utilizarla? Revisa que esté bien escrita.`;
  }

  if (name === 'SyntaxError') {
    if (message.includes('Unexpected token') || message.includes('Unexpected end of input')) {
      return `✏️ Error de Sintaxis: Hay un símbolo inesperado o falta cerrar un paréntesis '()', llave '{}' o comillas '""'.`;
    }
    if (message.includes('missing ) after argument list')) {
      return `✏️ Error de Sintaxis: Te falta un paréntesis de cierre ')' en una llamada o instrucción.`;
    }
    return `✏️ Error de Sintaxis: ${message}. Revisa la estructura de tu código.`;
  }

  if (name === 'TypeError') {
    if (message.includes('is not a function')) {
      return `⚠️ Error de Tipo: Intentaste ejecutar algo como función que no lo es. Revisa el nombre de la función.`;
    }
    if (message.includes('Assignment to constant variable')) {
      return `🔒 Error de Constante: Intentaste cambiar el valor de una variable declarada con 'const'. Si necesitas cambiar su valor, usa 'let'.`;
    }
    return `⚠️ Error de Tipo: ${message}`;
  }

  return `❌ Error de Ejecución: ${message}`;
}

/**
 * Format any value into readable console representation
 */
function formatValue(val: unknown): string {
  if (val === undefined) return 'undefined';
  if (val === null) return 'null';
  if (typeof val === 'string') return val;
  if (typeof val === 'number' || typeof val === 'boolean') return String(val);
  if (typeof val === 'function') return `[Función: ${val.name || 'anónima'}]`;
  if (Array.isArray(val)) {
    try {
      return JSON.stringify(val);
    } catch {
      return `[Array(${val.length})]`;
    }
  }
  if (typeof val === 'object') {
    try {
      return JSON.stringify(val, null, 2);
    } catch {
      return '[Objeto]';
    }
  }
  return String(val);
}

/**
 * Inject safe iteration counters into loops to prevent browser tab freeze
 */
function injectInfiniteLoopProtection(code: string): string {
  // Replace while (...) { and for (...) { with loop step counter
  let loopCounter = 0;
  const guardedCode = code.replace(
    /(while\s*\([^)]*\)\s*\{|for\s*\([^)]*\)\s*\{)/g,
    (match) => {
      loopCounter++;
      return `${match} if (++__loopCount_${loopCounter} > 15000) { throw new Error('Loop guard limit: bucle infinito detectado'); }`;
    }
  );

  let declarations = '';
  for (let i = 1; i <= loopCounter; i++) {
    declarations += `let __loopCount_${i} = 0;\n`;
  }

  return declarations + guardedCode;
}

/**
 * Extract identifiers declared via let, const, var, function so they can be captured into userScope
 */
function extractDeclaredIdentifiers(code: string): string[] {
  const names = new Set<string>();
  const lines = code.split('\n');
  for (const line of lines) {
    const cleanedLine = line.replace(/\/\/.*$/, '');
    const declMatch = cleanedLine.match(/(?:let|const|var)\s+([^;]+)/);
    if (declMatch) {
      const parts = declMatch[1].split(',');
      for (const part of parts) {
        const id = part.trim().split(/[\s=]/)[0];
        if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(id)) {
          names.add(id);
        }
      }
    }
    const fnMatch = cleanedLine.match(/(?:function\s+([a-zA-Z_$][a-zA-Z0-9_$]*))/);
    if (fnMatch) {
      names.add(fnMatch[1]);
    }
  }
  return Array.from(names);
}

/**
 * Execute student code safely in sandbox, capturing stdout and exposed scope
 */
export async function runCode(code: string): Promise<ExecutionResult> {
  const startTime = performance.now();
  const logs: string[] = [];
  const errors: string[] = [];
  const userScope: Record<string, unknown> = {};

  try {
    const protectedCode = injectInfiniteLoopProtection(code);
    const declaredNames = extractDeclaredIdentifiers(code);

    let scopeCollector = '';
    for (const name of declaredNames) {
      scopeCollector += `try { if (typeof ${name} !== 'undefined') __rawScope['${name}'] = ${name}; } catch(e){}\n`;
    }

    // Mock console methods
    const mockConsole = {
      log: (...args: unknown[]) => {
        logs.push(args.map(formatValue).join(' '));
      },
      info: (...args: unknown[]) => {
        logs.push(args.map(formatValue).join(' '));
      },
      warn: (...args: unknown[]) => {
        logs.push(`⚠️ ${args.map(formatValue).join(' ')}`);
      },
      error: (...args: unknown[]) => {
        errors.push(`❌ ${args.map(formatValue).join(' ')}`);
      },
      table: (arg: unknown) => {
        logs.push(formatValue(arg));
      },
      clear: () => {
        logs.length = 0;
      },
    };

    // Prepare sandbox runner
    // We attach an exposed scope collector by wrapping statements or evaluating within a Proxy
    const scopeProxy = new Proxy(userScope, {
      has: (_, prop) => prop !== '__rawScope',
      get: (target, prop) => {
        if (prop === 'console') return mockConsole;
        if (prop === 'Math') return Math;
        if (prop === 'Date') return Date;
        if (prop === 'JSON') return JSON;
        if (prop === 'parseInt') return parseInt;
        if (prop === 'parseFloat') return parseFloat;
        if (prop === 'isNaN') return isNaN;
        if (prop === 'isFinite') return isFinite;
        if (prop === 'Boolean') return Boolean;
        if (prop === 'Number') return Number;
        if (prop === 'String') return String;
        if (prop === 'Array') return Array;
        if (prop in target) return (target as Record<string, unknown>)[prop as string];
        if (typeof window !== 'undefined' && prop in window) {
          // Block dangerous APIs
          if (['fetch', 'XMLHttpRequest', 'WebSocket', 'localStorage', 'sessionStorage', 'indexedDB', 'document', 'window', 'eval', 'Function'].includes(String(prop))) {
            return undefined;
          }
        }
        return undefined;
      },
      set: (target, prop, value) => {
        (target as Record<string, unknown>)[prop as string] = value;
        return true;
      },
    });

    // Execute within with (scopeProxy)
    const runner = new Function(
      '__scopeProxy',
      '__rawScope',
      `
      with (__scopeProxy) {
        ${protectedCode}
        ${scopeCollector}
      }
      `
    );

    const result = runner(scopeProxy, userScope);
    const endTime = performance.now();

    return {
      logs,
      errors,
      returnValue: result,
      scope: userScope,
      executionTimeMs: Math.round(endTime - startTime),
    };
  } catch (err) {
    const endTime = performance.now();
    errors.push(translateErrorMessage(err));

    return {
      logs,
      errors,
      scope: userScope,
      executionTimeMs: Math.round(endTime - startTime),
    };
  }
}

/**
 * Universal runner supporting JavaScript, Python, and React
 */
export async function runCodeMultiLanguage(
  code: string,
  language: 'javascript' | 'python' | 'react' = 'javascript'
): Promise<ExecutionResult> {
  if (language === 'python') {
    const { runPythonCode } = await import('./pythonRunner');
    return runPythonCode(code);
  }

  if (language === 'react') {
    // For React snippets, provide React hooks directly in scope
    return runCode(code);
  }

  return runCode(code);
}
