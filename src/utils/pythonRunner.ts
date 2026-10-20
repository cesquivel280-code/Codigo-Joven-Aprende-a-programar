import { ExecutionResult } from '../types/course';

/**
 * Friendly Spanish error translation for Python beginners
 */
export function translatePythonError(err: unknown): string {
  if (!err) return 'Error desconocido al ejecutar el código Python.';
  const message = err instanceof Error ? err.message : String(err);
  const name = err instanceof Error ? err.name : '';

  if (message.includes('Loop guard limit') || message.includes('bucle infinito')) {
    return '⏱️ Límite de tiempo excedido: Tu bucle (for o while) se ejecuta indefinidamente sin llegar a la condición de fin. Revisa tu condición de parada.';
  }

  if (message.includes('IndentationError') || message.includes('indentación')) {
    return '📏 IndentationError: En Python los bloques de código se definen con sangría o espacios (normalmente 2 o 4 espacios). Revisa los espacios después de ":" en if, for, while o def.';
  }

  if (message.includes('is not defined') || message.includes('NameError')) {
    const match = message.match(/['"]?(\w+)['"]? is not defined/) || message.match(/NameError:\s*(\w+)/);
    const varName = match ? `'${match[1]}'` : 'una variable';
    return `🔍 NameError: El nombre ${varName} no está definido. ¿Lo escribiste correctamente antes de usarlo? En Python las mayúsculas y minúsculas importan.`;
  }

  if (message.includes('SyntaxError') || name === 'SyntaxError') {
    if (message.includes('dos puntos')) {
      return '✏️ SyntaxError: Falta el caracter de dos puntos ":" al final de la línea de if, elif, else, for, while o def.';
    }
    return `✏️ SyntaxError: Error de sintaxis en el código Python: ${message}. Revisa paréntesis, comillas y dos puntos.`;
  }

  if (message.includes('TypeError') || name === 'TypeError') {
    return `⚠️ TypeError: Operación no permitida entre tipos incompatibles. (Ejemplo: no puedes sumar un texto y un número directamente sin convertirlo).`;
  }

  return `🐍 Error en Python: ${message}`;
}

/**
 * Format any value into readable Python representation
 */
function formatPythonValue(val: unknown): string {
  if (val === undefined || val === null) return 'None';
  if (typeof val === 'boolean') return val ? 'True' : 'False';
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (Array.isArray(val)) {
    return `[${val.map(formatPythonValue).join(', ')}]`;
  }
  if (typeof val === 'object') {
    try {
      const entries = Object.entries(val as Record<string, unknown>).map(
        ([k, v]) => `'${k}': ${formatPythonValue(v)}`
      );
      return `{${entries.join(', ')}}`;
    } catch {
      return '{}';
    }
  }
  return String(val);
}

/**
 * Transpiles beginner-friendly Python 3 code into executable JS for browser sandbox
 */
export function transpilePythonToJs(pyCode: string): string {
  const rawLines = pyCode.split('\n');
  const jsLines: string[] = [];
  const indentStack: number[] = [0];
  let loopCount = 0;

  for (let lineIndex = 0; lineIndex < rawLines.length; lineIndex++) {
    const rawLine = rawLines[lineIndex];

    // Preserve comments or empty lines
    const trimmed = rawLine.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      jsLines.push(trimmed ? `// ${trimmed.slice(1).trim()}` : '');
      continue;
    }

    // Determine indentation level
    const matchIndent = rawLine.match(/^(\s*)/);
    const currentIndent = matchIndent ? matchIndent[1].length : 0;

    // Close open blocks if indentation decreased
    while (indentStack.length > 1 && currentIndent < indentStack[indentStack.length - 1]) {
      indentStack.pop();
      jsLines.push('}');
    }

    let line = trimmed;

    // Handle comments at end of line
    const commentIdx = line.indexOf('#');
    let inlineComment = '';
    if (commentIdx !== -1 && !line.slice(0, commentIdx).includes('"') && !line.slice(0, commentIdx).includes("'")) {
      inlineComment = ` // ${line.slice(commentIdx + 1).trim()}`;
      line = line.slice(0, commentIdx).trim();
    }

    // Transform Python booleans and None
    line = line
      .replace(/\bTrue\b/g, 'true')
      .replace(/\bFalse\b/g, 'false')
      .replace(/\bNone\b/g, 'null');

    // Transform Python logical operators
    line = line
      .replace(/\band\b/g, '&&')
      .replace(/\bor\b/g, '||')
      .replace(/\bnot\b\s+/g, '!');

    // Transform f-strings: f"Hola {nombre}, tienes {puntos} pts" -> `Hola ${nombre}, tienes ${puntos} pts`
    line = line.replace(/f"([^"]*)"/g, (_, content) => {
      const template = content.replace(/\{([^}]+)\}/g, '${$1}');
      return `\`${template}\``;
    });
    line = line.replace(/f'([^']*)'/g, (_, content) => {
      const template = content.replace(/\{([^}]+)\}/g, '${$1}');
      return `\`${template}\``;
    });

    // 1. def function_name(args):
    const defMatch = line.match(/^def\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*:/);
    if (defMatch) {
      const fnName = defMatch[1];
      const params = defMatch[2];
      jsLines.push(`function ${fnName}(${params}) {`);
      indentStack.push(currentIndent + 1);
      continue;
    }

    // 2. if condition:
    const ifMatch = line.match(/^if\s+(.+)\s*:/);
    if (ifMatch) {
      let cond = ifMatch[1];
      jsLines.push(`if (${cond}) {`);
      indentStack.push(currentIndent + 1);
      continue;
    }

    // 3. elif condition:
    const elifMatch = line.match(/^elif\s+(.+)\s*:/);
    if (elifMatch) {
      let cond = elifMatch[1];
      // Close previous block first
      if (indentStack.length > 1) {
        indentStack.pop();
      }
      jsLines.push(`} else if (${cond}) {`);
      indentStack.push(currentIndent + 1);
      continue;
    }

    // 4. else:
    const elseMatch = line.match(/^else\s*:/);
    if (elseMatch) {
      if (indentStack.length > 1) {
        indentStack.pop();
      }
      jsLines.push(`} else {`);
      indentStack.push(currentIndent + 1);
      continue;
    }

    // 5. while condition:
    const whileMatch = line.match(/^while\s+(.+)\s*:/);
    if (whileMatch) {
      let cond = whileMatch[1];
      loopCount++;
      jsLines.push(`while (${cond}) { if (++__py_loop_${loopCount} > 15000) throw new Error("Loop guard limit: bucle infinito detectado");`);
      indentStack.push(currentIndent + 1);
      continue;
    }

    // 6. for item in range(...):
    const forRangeMatch = line.match(/^for\s+([a-zA-Z0-9_]+)\s+in\s+range\s*\(([^)]+)\)\s*:/);
    if (forRangeMatch) {
      const varName = forRangeMatch[1];
      const rangeArgs = forRangeMatch[2].split(',').map((a) => a.trim());
      loopCount++;

      let start = '0';
      let end = '0';
      let step = '1';

      if (rangeArgs.length === 1) {
        end = rangeArgs[0];
      } else if (rangeArgs.length === 2) {
        start = rangeArgs[0];
        end = rangeArgs[1];
      } else if (rangeArgs.length === 3) {
        start = rangeArgs[0];
        end = rangeArgs[1];
        step = rangeArgs[2];
      }

      const stepNum = Number(step);
      const isNegative = !isNaN(stepNum) && stepNum < 0;
      const comp = isNegative ? '>' : '<';
      const inc = isNegative ? `-= ${Math.abs(stepNum)}` : `+= ${step}`;

      jsLines.push(`for (let ${varName} = ${start}; ${varName} ${comp} ${end}; ${varName} ${inc}) { if (++__py_loop_${loopCount} > 15000) throw new Error("Loop guard limit: bucle infinito detectado");`);
      indentStack.push(currentIndent + 1);
      continue;
    }

    // 7. for item in iterable:
    const forInMatch = line.match(/^for\s+([a-zA-Z0-9_]+)\s+in\s+(.+)\s*:/);
    if (forInMatch) {
      const varName = forInMatch[1];
      const iterable = forInMatch[2].trim();
      loopCount++;
      jsLines.push(`for (let ${varName} of (${iterable})) { if (++__py_loop_${loopCount} > 15000) throw new Error("Loop guard limit: bucle infinito detectado");`);
      indentStack.push(currentIndent + 1);
      continue;
    }

    // 8. return statement
    if (line.startsWith('return ') || line === 'return') {
      jsLines.push(`${line};${inlineComment}`);
      continue;
    }

    // 9. Python append: list.append(val) -> list.push(val)
    line = line.replace(/([a-zA-Z0-9_]+)\.append\s*\(([^)]+)\)/g, '$1.push($2)');

    // 10. len(x) -> (x).length
    line = line.replace(/\blen\s*\(([^)]+)\)/g, '($1).length');

    // 11. print(...) -> __py_print(...)
    line = line.replace(/\bprint\s*\(/g, '__py_print(');

    // 12. Variable assignment without let/var in Python:
    const assignMatch = line.match(/^([a-zA-Z0-9_]+)\s*(=|\+=|-=|\*=|\/=)\s*(.+)$/);
    if (assignMatch && !line.startsWith('let ') && !line.startsWith('const ') && !line.startsWith('var ')) {
      const varName = assignMatch[1];
      const op = assignMatch[2];
      const rhs = assignMatch[3];
      if (op === '=') {
        jsLines.push(`var ${varName} = ${rhs};${inlineComment}`);
      } else {
        jsLines.push(`${varName} ${op} ${rhs};${inlineComment}`);
      }
      continue;
    }

    jsLines.push(`${line};${inlineComment}`);
  }

  // Close any remaining opened blocks
  while (indentStack.length > 1) {
    indentStack.pop();
    jsLines.push('}');
  }

  // Prepend loop limit declarations
  let loopDeclarations = '';
  for (let i = 1; i <= loopCount; i++) {
    loopDeclarations += `let __py_loop_${i} = 0;\n`;
  }

  return loopDeclarations + jsLines.join('\n');
}

/**
 * Executes Python 3 code in an isolated and responsive environment
 */
export async function runPythonCode(pyCode: string): Promise<ExecutionResult> {
  const startTime = performance.now();
  const logs: string[] = [];
  const errors: string[] = [];
  const userScope: Record<string, unknown> = {};

  try {
    const jsCode = transpilePythonToJs(pyCode);

    // Standard Python built-ins
    const pyBuiltins = {
      __py_print: (...args: unknown[]) => {
        logs.push(args.map(formatPythonValue).join(' '));
      },
      range: (start: number, stop?: number, step: number = 1) => {
        const from = stop === undefined ? 0 : start;
        const to = stop === undefined ? start : stop;
        const res: number[] = [];
        if (step > 0) {
          for (let i = from; i < to; i += step) res.push(i);
        } else if (step < 0) {
          for (let i = from; i > to; i += step) res.push(i);
        }
        return res;
      },
      len: (obj: unknown) => {
        if (Array.isArray(obj) || typeof obj === 'string') return obj.length;
        if (obj && typeof obj === 'object') return Object.keys(obj).length;
        return 0;
      },
      str: (v: unknown) => formatPythonValue(v),
      int: (v: unknown) => {
        const parsed = parseInt(String(v), 10);
        return isNaN(parsed) ? 0 : parsed;
      },
      float: (v: unknown) => {
        const parsed = parseFloat(String(v));
        return isNaN(parsed) ? 0.0 : parsed;
      },
      bool: (v: unknown) => Boolean(v),
      sum: (arr: number[]) => (Array.isArray(arr) ? arr.reduce((a, b) => a + b, 0) : 0),
      min: (...args: (number | number[])[]) => {
        if (args.length === 1 && Array.isArray(args[0])) return Math.min(...args[0]);
        return Math.min(...(args as number[]));
      },
      max: (...args: (number | number[])[]) => {
        if (args.length === 1 && Array.isArray(args[0])) return Math.max(...args[0]);
        return Math.max(...(args as number[]));
      },
      abs: (v: number) => Math.abs(v),
      round: (v: number, decimals: number = 0) => {
        const factor = Math.pow(10, decimals);
        return Math.round(v * factor) / factor;
      },
      input: (promptText?: string) => {
        if (promptText) logs.push(String(promptText));
        return '';
      },
    };

    const scopeProxy = new Proxy(userScope, {
      has: () => true,
      get: (target, prop) => {
        if (typeof prop === 'string' && prop in pyBuiltins) {
          return (pyBuiltins as Record<string, unknown>)[prop];
        }
        if (prop === 'Math') return Math;
        if (prop in target) return (target as Record<string, unknown>)[prop as string];
        if (typeof window !== 'undefined' && prop in window) {
          if (['fetch', 'XMLHttpRequest', 'WebSocket', 'localStorage', 'sessionStorage', 'document', 'window', 'eval'].includes(String(prop))) {
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

    const runner = new Function(
      '__scopeProxy',
      `
      with (__scopeProxy) {
        ${jsCode}
      }
      `
    );

    const result = runner(scopeProxy);
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
    errors.push(translatePythonError(err));
    return {
      logs,
      errors,
      scope: userScope,
      executionTimeMs: Math.round(endTime - startTime),
    };
  }
}
