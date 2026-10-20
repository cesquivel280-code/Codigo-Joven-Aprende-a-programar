import { CourseModule } from '../types/course';
import { pythonModules } from './pythonCoursesData';
import { reactModules } from './reactCoursesData';

const javascriptModules: CourseModule[] = [
  {
    id: 'm1-fundamentos',
    order: 1,
    title: 'Módulo 1: Fundamentos y Variables',
    shortDescription: 'Da tus primeros pasos en el código: aprende a comunicarte con la computadora, guardar datos en variables y manipular textos y números.',
    difficulty: 'Iniciación',
    icon: 'Terminal',
    color: 'from-cyan-500 to-blue-600',
    certificate: {
      title: 'Certificado de Superación',
      subtitle: 'Fundamentos de Programación y Variables',
      skills: ['Sintaxis básica', 'Salida por consola', 'Variables let y const', 'Tipos primitivos', 'Template literals'],
      badgeName: 'Iniciador del Código',
    },
    lessons: [
      {
        id: 'm1-l1',
        moduleId: 'm1-fundamentos',
        title: '1.1 ¿Qué es JavaScript? y Tu Primer console.log()',
        difficulty: 'Iniciación',
        estimatedMinutes: 5,
        xpReward: 50,
        theory: {
          introduction: `¿Qué es JavaScript?
JavaScript es un lenguaje de programación que le da instrucciones a una computadora, un celular o una página web para que hagan algo.

Con JavaScript podés crear:
• Minijuegos (puzzles, Juegos 2D, acertijos y aventuras interactivas).
• Calculadoras.
• Botones que responden al hacer clic.
• Contadores de puntos y vidas.
• Aplicaciones y asistentes con Inteligencia Artificial.

Pensalo así: la computadora es un alumno muy obediente. JavaScript es el idioma que usamos para decirle exactamente qué hacer.`,
          keyPoints: [
            'JavaScript es el lenguaje que da instrucciones a la computadora.',
            'console.log() es la instrucción estándar para mostrar información en pantalla.',
            'Los textos van siempre entre comillas ("¡Bienvenido!").',
            'Importante: el nombre correcto es console.log(), no const.log().',
          ],
          codeExample: `// Tu primer programa con una función:\nfunction saludar() {\n  console.log("¡Bienvenido!");\n}\n\nsaludar();\n// Resultado: ¡Bienvenido!`,
          explanation: `¿Qué pasó?\n• function: crea una función.\n• saludar: es el nombre.\n• { }: guarda las instrucciones.\n• saludar();: ejecuta la función.`,
          tip: 'Importante: el nombre correcto para imprimir es console.log(), nunca escribas const.log().',
          introSections: [
            {
              title: 'Tu primer programa',
              content: [
                'Pensalo así: la computadora es un alumno muy obediente. JavaScript es el idioma que usamos para decirle exactamente qué hacer.',
              ],
              codeExample: `function saludar() {\n  console.log("¡Bienvenido!");\n}\n\nsaludar();`,
              result: '¡Bienvenido!',
              breakdown: [
                { term: 'function', explanation: 'crea una función.' },
                { term: 'saludar', explanation: 'es el nombre.' },
                { term: '{ }', explanation: 'guarda las instrucciones.' },
                { term: 'saludar();', explanation: 'ejecuta la función.' },
              ],
            },
            {
              title: 'Otro ejemplo: sumar números',
              content: ['Las funciones también pueden resolver operaciones matemáticas al instante:'],
              codeExample: `function sumar() {\n  console.log(5 + 7);\n}\n\nsumar();`,
              result: '12',
            },
            {
              title: 'Diferencia entre HTML, CSS y JavaScript',
              subtitle: 'Los tres trabajan juntos',
              content: [
                'Imaginá un botón:',
                '• HTML: Crea el botón.',
                '• CSS: Lo pinta de azul y le cambia el tamaño.',
                '• JavaScript: Hace que al tocarlo aparezca un mensaje o empiece un juego.',
              ],
              callout: 'Una comparación fácil:\n• HTML: las paredes de una casa.\n• CSS: la pintura y la decoración.\n• JavaScript: la electricidad que hace funcionar todo.',
            },
            {
              title: 'Comandos básicos de JavaScript',
              content: [
                '1. console.log(): Sirve para mostrar información.\nImportante: el nombre correcto es console.log(), no const.log().',
              ],
              codeExample: `console.log("Hola");\nconsole.log(10 + 5);`,
              result: 'Hola\n15',
            },
            {
              title: 'Variables: let y const',
              content: [
                '• let: crea una variable que puede cambiar. Una variable es como una caja donde guardamos información. Se usa para cosas que cambian, como: puntos, vidas, nivel, tiempo.',
                '• const: crea una variable que no puede recibir una nueva asignación.',
                'Si hacés esto:\nconst vidas = 3;\nvidas = 5;\nJavaScript mostrará un error.',
                'Tabla let vs const:\n• let → ¿Puede cambiar? Sí\n• const → ¿Puede cambiar? No se puede reasignar',
              ],
              codeExample: `// let (puede cambiar):\nlet puntos = 0;\nconsole.log(puntos); // 0\npuntos = 50;\nconsole.log(puntos); // 50\n\n// const (valor fijo):\nconst nombreJuego = "Mi Primer Juego";\nconsole.log(nombreJuego); // Mi Primer Juego\n\n// Si intentas reasignar const:\nconst vidas = 3;\n// vidas = 5; // ❌ Error: Assignment to constant variable`,
              result: '0\n50\nMi Primer Juego',
            },
            {
              title: '5. Otros comandos útiles',
              content: [
                '• Asignar un valor:\nlet edad = 20;\n= significa "guardar este valor".',
                '• Operaciones matemáticas básicas:',
              ],
              codeExample: `// Sumar:\nconsole.log(3 + 2); // 5\n\n// Restar:\nconsole.log(10 - 4); // 6\n\n// Multiplicar:\nconsole.log(3 * 4); // 12\n\n// Dividir:\nconsole.log(12 / 3); // 4\n\n// Comentarios (notas que la computadora no ejecuta):\n// Esto es un comentario\nconsole.log("Hola");`,
              result: '5\n6\n12\n4\nHola',
              callout: 'Comentarios:\nLos comentarios sirven para escribir notas que la computadora no ejecuta.\nSe inician con dos barras: //',
            },
            {
              title: '6. Tomar decisiones con if',
              content: [
                'if significa "si". Permite que el programa tome decisiones según una condición.',
              ],
              codeExample: `let puntos = 60;\n\nif (puntos >= 50) {\n  console.log("¡Ganaste!");\n}`,
              result: '¡Ganaste!',
              breakdown: [
                { term: 'if (puntos >= 50)', explanation: 'La condición pregunta: ¿Los puntos son mayores o iguales a 50?' },
                { term: '{ ... }', explanation: 'Como puntos vale 60 (es mayor a 50), la condición se cumple y ejecuta el mensaje.' },
              ],
            },
            {
              title: '7. Resumen rápido',
              content: [
                '• console.log() → muestra información.',
                '• let → variable que puede cambiar.',
                '• const → variable que no se reasigna.',
                '• function → crea una función.',
                '• if → toma decisiones.',
                '• + - * / → realizan operaciones matemáticas.',
                '• // → escribe comentarios.',
              ],
            },
          ],
        },
        exercise: {
          goal: 'Muestra un saludo en la consola usando console.log().',
          instructions: [
            'Usa la función console.log() para imprimir exactamente: "¡Bienvenido!" (o "¡Hola, mundo!").',
            'En una segunda línea, imprime tu mensaje favorito o un cálculo como 10 + 5.',
          ],
          starterCode: `// Escribe tu código aquí debajo:\nconsole.log("¡Bienvenido!");\n`,
          solution: `console.log("¡Bienvenido!");\nconsole.log(10 + 5);`,
          hints: [
            'Asegúrate de escribir console en minúsculas y log con paréntesis: console.log(...)',
            'Importante: el nombre correcto es console.log(), no const.log().',
            'El texto debe estar entre comillas: console.log("¡Bienvenido!");',
          ],
          testCases: [
            {
              description: 'Debe imprimir "¡Bienvenido!" o "¡Hola, mundo!" en la consola',
              testFn: (logs) => logs.some((l) => l.includes('¡Bienvenido!') || l.includes('Bienvenido') || l.includes('Hola, mundo') || l.includes('Hola mundo')),
              hint: 'Verifica haber escrito exactamente: console.log("¡Bienvenido!");',
            },
            {
              description: 'Debe haber al menos 2 mensajes o cálculos impresos en la consola',
              testFn: (logs) => logs.length >= 2,
              hint: 'Añade una segunda línea con otro console.log() para tu mensaje o cálculo.',
            },
            {
              description: 'No debe usar "const.log()" por error',
              testFn: (_, __, rawCode) => !rawCode.includes('const.log'),
              hint: '¡Cuidado! El comando correcto es console.log(), no const.log().',
            },
          ],
        },
      },
      {
        id: 'm1-l2',
        moduleId: 'm1-fundamentos',
        title: '1.2 Cajas de Memoria: let y const',
        difficulty: 'Iniciación',
        estimatedMinutes: 8,
        xpReward: 60,
        theory: {
          introduction: 'Una variable es como una caja etiquetada donde puedes guardar datos para utilizarlos más adelante.',
          keyPoints: [
            'Usa "let" cuando el valor de la variable pueda cambiar en el tiempo (por ejemplo: vidas, puntos, nivel).',
            'Usa "const" para valores constantes que nunca cambian (por ejemplo: nombre del juego, gravedad).',
            'El signo igual (=) se llama operador de asignación: guarda lo de la derecha en la variable de la izquierda.',
          ],
          codeExample: `let vidas = 3;\nconst nombreJuego = "CyberQuest";\n\nconsole.log(vidas); // Muestra 3\nvidas = vidas - 1;\nconsole.log(vidas); // Ahora muestra 2`,
          explanation: 'Observa que cuando cambiamos el valor de vidas en la línea 5, no volvemos a escribir let. Solo usamos let la primera vez para crear la variable.',
          tip: 'Los nombres de variables deben ser descriptivos y sin espacios (se usa camelCase: puntosTotales).',
        },
        exercise: {
          goal: 'Declara dos variables para un héroe de videojuego y muéstralas.',
          instructions: [
            'Declara una constante llamada "heroe" con tu nombre favorito en texto (ejemplo: "Alex").',
            'Declara una variable con "let" llamada "puntos" con el valor numérico 100.',
            'Imprime ambas variables en la consola usando console.log().',
          ],
          starterCode: `// 1. Declara la constante heroe:\nconst heroe = "Aria";\n\n// 2. Declara la variable puntos con let:\nlet puntos = 100;\n\n// 3. Imprime ambas con console.log:\n`,
          solution: `const heroe = "Aria";\nlet puntos = 100;\nconsole.log(heroe);\nconsole.log(puntos);`,
          hints: [
            'Recuerda: const heroe = "nombre";',
            'Usa console.log(heroe); y console.log(puntos);',
          ],
          testCases: [
            {
              description: 'Debe existir la constante o variable "heroe" con un texto',
              testFn: (_, scope, code) => (typeof scope.heroe === 'string' && scope.heroe.length > 0) || (code.includes('heroe =') && code.includes('const')),
              hint: 'Asegúrate de definir const heroe = "TuNombre";',
            },
            {
              description: 'Debe existir la variable "puntos" con valor numérico 100',
              testFn: (_, scope, code) => scope.puntos === 100 || (code.includes('puntos = 100') && code.includes('let')),
              hint: 'Declara let puntos = 100;',
            },
            {
              description: 'Debe imprimir los valores en la consola',
              testFn: (logs) => logs.length >= 2,
              hint: 'Utiliza console.log(heroe) y console.log(puntos);',
            },
          ],
        },
      },
      {
        id: 'm1-l3',
        moduleId: 'm1-fundamentos',
        title: '1.3 Tipos de Datos y Operaciones',
        difficulty: 'Iniciación',
        estimatedMinutes: 8,
        xpReward: 60,
        theory: {
          introduction: 'En programación, los datos tienen tipos. Los tres tipos fundamentales que más usarás son Textos (Strings), Números (Numbers) y Booleanos (Booleans: true o false).',
          keyPoints: [
            'Strings: texto entre comillas como "Hola".',
            'Numbers: enteros o decimales como 42 o 9.8 (sin comillas).',
            'Booleans: valores de verdad lógica (true o false).',
            'Operadores matemáticos: + (suma), - (resta), * (multiplicación), / (división).',
          ],
          codeExample: `let ataqueBase = 25;\nlet multiplicadorCritico = 2;\nlet dañoTotal = ataqueBase * multiplicadorCritico;\nlet estaVivo = true;\n\nconsole.log("Daño:", dañoTotal);\nconsole.log("¿Está vivo?:", estaVivo);`,
          explanation: 'La computadora puede hacer millones de cálculos por segundo con estos operadores.',
          tip: '¡Cuidado! Si sumas un texto con un número ("10" + 5), JavaScript los unirá ("105") en lugar de sumarlos matemáticamente (15).',
        },
        exercise: {
          goal: 'Calcula el poder total de un equipo de aventureros.',
          instructions: [
            'Crea una variable "guerrero" con valor 45.',
            'Crea una variable "mago" con valor 60.',
            'Crea una variable "poderTotal" que sea la suma de guerrero + mago.',
            'Crea una variable booleana "esPoderoso" que sea true.',
            'Imprime "poderTotal" en la consola.',
          ],
          starterCode: `let guerrero = 45;\nlet mago = 60;\n\n// Calcula el poderTotal y define esPoderoso:\n\n`,
          solution: `let guerrero = 45;\nlet mago = 60;\nlet poderTotal = guerrero + mago;\nlet esPoderoso = true;\nconsole.log(poderTotal);`,
          hints: [
            'Escribe: let poderTotal = guerrero + mago;',
            'Declara let esPoderoso = true;',
            'No olvides console.log(poderTotal);',
          ],
          testCases: [
            {
              description: 'La variable poderTotal debe ser igual a 105',
              testFn: (_, scope, code) => scope.poderTotal === 105 || code.includes('guerrero + mago'),
              hint: 'Suma guerrero + mago y guárdalo en poderTotal.',
            },
            {
              description: 'esPoderoso debe ser un booleano con valor true',
              testFn: (_, scope, code) => scope.esPoderoso === true || code.includes('esPoderoso = true'),
              hint: 'Asigna let esPoderoso = true;',
            },
            {
              description: 'Debe imprimir 105 en consola',
              testFn: (logs) => logs.some((l) => l.includes('105')),
              hint: 'Asegúrate de llamar a console.log(poderTotal);',
            },
          ],
        },
      },
      {
        id: 'm1-l4',
        moduleId: 'm1-fundamentos',
        title: '1.4 Mensajes Dinámicos (Template Literals)',
        difficulty: 'Iniciación',
        estimatedMinutes: 7,
        xpReward: 70,
        theory: {
          introduction: '¿Cómo combinamos texto con variables de forma elegante? Con los Template Literals usando comillas invertidas (`...`) y la sintaxis ${variable}.',
          keyPoints: [
            'Usa las comillas invertidas (backticks: ` `).',
            'Dentro de las comillas, escribe ${nombreVariable} para insertar cualquier dato.',
            'Es mucho más limpio y fácil de leer que usar el signo + para concatenar.',
          ],
          codeExample: `let jugador = "Kael";\nlet nivel = 15;\n\n// Mensaje dinámico con backticks:\nconsole.log(\`¡El jugador \${jugador} ha alcanzado el nivel \${nivel}!\`);`,
          explanation: 'El motor sustituye automáticamente ${jugador} por su valor "Kael" y ${nivel} por 15.',
          tip: 'Las comillas invertidas ` se encuentran usualmente al lado de la tecla P o Enter en teclados españoles.',
        },
        exercise: {
          goal: 'Construye un mensaje de bienvenida personalizado.',
          instructions: [
            'Crea una variable "alias" con un nombre de usuario.',
            'Crea una variable "rango" con un título (por ejemplo: "Caballero del Código").',
            'Usa un template literal con backticks para imprimir: "Bienvenido, [alias], tu rango es [rango]."',
          ],
          starterCode: `let alias = "Nova";\nlet rango = "Explorador";\n\n// Imprime el mensaje con template literal:\n`,
          solution: `let alias = "Nova";\nlet rango = "Explorador";\nconsole.log(\`Bienvenido, \${alias}, tu rango es \${rango}.\`);`,
          hints: [
            'Usa: console.log(`Bienvenido, ${alias}, tu rango es ${rango}.`);',
            'Verifica que incluyas ambas variables dentro de ${...}.',
          ],
          testCases: [
            {
              description: 'Debe contener una llamada a console.log con template literal o ambas variables',
              testFn: (logs, _, code) => code.includes('`') && logs.length > 0,
              hint: 'Usa las comillas invertidas ` ` en tu console.log.',
            },
            {
              description: 'El mensaje impreso debe incluir el alias y el rango',
              testFn: (logs, scope) => {
                const aliasVal = String(scope.alias || 'Nova');
                const rangoVal = String(scope.rango || 'Explorador');
                return logs.some((l) => l.includes(aliasVal) && l.includes(rangoVal));
              },
              hint: 'Asegúrate de que en la consola se lea tanto el alias como el rango.',
            },
          ],
        },
      },
      {
        id: 'm1-l5',
        moduleId: 'm1-fundamentos',
        title: '1.5 Desafío de Módulo: Ficha de Avatar Gamer',
        difficulty: 'Iniciación',
        estimatedMinutes: 10,
        xpReward: 100,
        theory: {
          introduction: '¡Has llegado al desafío final del Módulo 1! Aquí pondrás a prueba todo lo aprendido creando el sistema de ficha de estadísticas para un videojuego.',
          keyPoints: [
            'Aplica variables let y const.',
            'Realiza operaciones matemáticas con bonus.',
            'Imprime la ficha formateada con template literals.',
          ],
          codeExample: `const nombre = "Zelda";\nlet salud = 100;\nsalud = salud - 20;\nconsole.log(\`Salud restante: \${salud}\`);`,
          explanation: 'Este desafío evaluará tu comprensión integral antes de emitir tu Certificado Oficial del Módulo 1.',
        },
        exercise: {
          goal: 'Crea la ficha completa de un personaje con cálculo de estadísticas.',
          instructions: [
            '1. Declara const "personaje" con el nombre que quieras.',
            '2. Declara let "nivel" = 1.',
            '3. Declara let "vida" = 100.',
            '4. Declara let "bonus" = 25.',
            '5. Calcula let "vidaTotal" sumando vida + bonus.',
            '6. Imprime con console.log exactamente: `Ficha: ${personaje} | Nivel: ${nivel} | Vida Total: ${vidaTotal}`',
          ],
          starterCode: `// 1. Constante del personaje:\nconst personaje = "Shadow";\n\n// 2. Variables de nivel, vida y bonus:\nlet nivel = 1;\nlet vida = 100;\nlet bonus = 25;\n\n// 3. Calcula vidaTotal:\n\n// 4. Imprime la ficha formateada:\n`,
          solution: `const personaje = "Shadow";\nlet nivel = 1;\nlet vida = 100;\nlet bonus = 25;\nlet vidaTotal = vida + bonus;\nconsole.log(\`Ficha: \${personaje} | Nivel: \${nivel} | Vida Total: \${vidaTotal}\`);`,
          hints: [
            'Calcula: let vidaTotal = vida + bonus;',
            'Imprime: console.log(`Ficha: ${personaje} | Nivel: ${nivel} | Vida Total: ${vidaTotal}`);',
          ],
          testCases: [
            {
              description: 'vidaTotal debe ser calculada y valer 125',
              testFn: (logs, scope, code) => scope.vidaTotal === 125 || (code.includes('vidaTotal') && (code.includes('vida + bonus') || logs.some((l) => l.includes('125')))),
              hint: 'Define let vidaTotal = vida + bonus;',
            },
            {
              description: 'Debe imprimir la ficha con el formato solicitado',
              testFn: (logs) => logs.some((l) => l.includes('Ficha:') && l.includes('125')),
              hint: 'Verifica el texto impreso con los backticks.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'm2-condicionales',
    order: 2,
    title: 'Módulo 2: Decisiones y Lógica Condicional',
    shortDescription: 'Enseña a tu código a pensar: toma decisiones inteligentes con condiciones if, else y operadores lógicos booleanos.',
    difficulty: 'Básico',
    icon: 'GitFork',
    color: 'from-blue-500 to-indigo-600',
    certificate: {
      title: 'Certificado de Superación',
      subtitle: 'Lógica Condicional y Control de Flujo',
      skills: ['Operadores de comparación (===, >, <)', 'Sentencias if y else', 'Condiciones anidadas else if', 'Lógica booleana (&&, ||)'],
      badgeName: 'Guardián de la Lógica',
    },
    lessons: [
      {
        id: 'm2-l1',
        moduleId: 'm2-condicionales',
        title: '2.1 Comparaciones: ¿Verdadero o Falso?',
        difficulty: 'Básico',
        estimatedMinutes: 6,
        xpReward: 50,
        theory: {
          introduction: 'Las computadoras toman decisiones comparando valores. El resultado de una comparación siempre es un booleano: true (verdadero) o false (falso).',
          keyPoints: [
            '> mayor que, < menor que.',
            '>= mayor o igual, <= menor o igual.',
            '=== estrictamente igual (compara valor y tipo).',
            '!== estrictamente diferente (no es igual).',
          ],
          codeExample: `console.log(10 > 5);   // true\nconsole.log(3 === 4);  // false\nconsole.log(8 !== 9);  // true`,
          explanation: 'Usa siempre === (triple igual) en JavaScript para comparar igualdad de manera precisa.',
          tip: 'No confundas = (asignar un valor a una variable) con === (preguntar si dos cosas son iguales).',
        },
        exercise: {
          goal: 'Crea dos comparaciones booleanas.',
          instructions: [
            'Declara una variable "edad" con valor 16.',
            'Declara "esMayorDeEdad" comparando si edad >= 18.',
            'Declara "tienePermiso" con valor true.',
            'Imprime esMayorDeEdad en consola.',
          ],
          starterCode: `let edad = 16;\n\n// Compara si edad es mayor o igual a 18:\nlet esMayorDeEdad = edad >= 18;\nlet tienePermiso = true;\n\nconsole.log(esMayorDeEdad);\n`,
          solution: `let edad = 16;\nlet esMayorDeEdad = edad >= 18;\nlet tienePermiso = true;\nconsole.log(esMayorDeEdad);`,
          hints: [
            'La comparación edad >= 18 devolverá false porque 16 es menor que 18.',
            'Imprime la variable con console.log(esMayorDeEdad);',
          ],
          testCases: [
            {
              description: 'esMayorDeEdad debe ser un booleano con valor false',
              testFn: (_, scope, code) => scope.esMayorDeEdad === false || (code.includes('esMayorDeEdad') && (code.includes('18') || code.includes('false'))),
              hint: 'Verifica la comparación edad >= 18.',
            },
            {
              description: 'Debe imprimir false en la consola',
              testFn: (logs) => logs.some((l) => l.includes('false')),
              hint: 'Asegúrate de hacer console.log(esMayorDeEdad);',
            },
          ],
        },
      },
      {
        id: 'm2-l2',
        moduleId: 'm2-condicionales',
        title: '2.2 El Guardia del Camino: if y else',
        difficulty: 'Básico',
        estimatedMinutes: 8,
        xpReward: 60,
        theory: {
          introduction: 'La estructura if nos permite ejecutar un bloque de código SOLO si se cumple una condición. Si no se cumple, el bloque else toma el control.',
          keyPoints: [
            'if (condición) { ... se ejecuta si es true }',
            'else { ... se ejecuta si es false }',
            'El código dentro de las llaves {} se llama bloque de instrucciones.',
          ],
          codeExample: `let vidas = 2;\n\nif (vidas > 0) {\n  console.log("¡Sigues en la partida!");\n} else {\n  console.log("Game Over. Vuelve a intentarlo.");\n}`,
          explanation: 'Como vidas es 2 (mayor que 0), la condición es verdadera y se ejecuta el primer mensaje.',
        },
        exercise: {
          goal: 'Crea un verificador de energía para un robot.',
          instructions: [
            'Tienes una variable "bateria" con valor 15.',
            'Si bateria > 20, imprime "Sistemas estables".',
            'De lo contrario (else), imprime "Batería baja, recargar".',
          ],
          starterCode: `let bateria = 15;\n\nif (bateria > 20) {\n  console.log("Sistemas estables");\n} else {\n  // Escribe aquí la acción si la batería es baja:\n  \n}\n`,
          solution: `let bateria = 15;\n\nif (bateria > 20) {\n  console.log("Sistemas estables");\n} else {\n  console.log("Batería baja, recargar");\n}`,
          hints: [
            'Dentro del bloque else, escribe: console.log("Batería baja, recargar");',
          ],
          testCases: [
            {
              description: 'Debe imprimir "Batería baja, recargar"',
              testFn: (logs) => logs.some((l) => l.toLowerCase().includes('batería baja') || l.toLowerCase().includes('bateria baja')),
              hint: 'Asegúrate de imprimir el mensaje en el bloque else.',
            },
          ],
        },
      },
      {
        id: 'm2-l3',
        moduleId: 'm2-condicionales',
        title: '2.3 Múltiples Caminos: else if',
        difficulty: 'Básico',
        estimatedMinutes: 8,
        xpReward: 70,
        theory: {
          introduction: 'A menudo la vida no es solo blanco o negro. Cuando hay más de dos posibilidades, encadenamos condiciones con else if.',
          keyPoints: [
            'Se evalúan en orden de arriba hacia abajo.',
            'En cuanto una condición sea verdadera, se ejecuta su bloque y se ignoran las demás.',
            'El último else actúa como comodín de respaldo si ninguna se cumplió.',
          ],
          codeExample: `let nota = 85;\n\nif (nota >= 90) {\n  console.log("Sobresaliente");\n} else if (nota >= 70) {\n  console.log("Notable");\n} else {\n  console.log("Necesita repasar");\n}`,
          explanation: 'La computadora revisa: ¿85 >= 90? No. Luego: ¿85 >= 70? Sí. Imprime "Notable" y termina.',
        },
        exercise: {
          goal: 'Clasifica el nivel de experiencia de un jugador según sus puntos.',
          instructions: [
            'Variable "xp" = 450.',
            'Si xp >= 500: imprime "Rango Oro".',
            'Else if xp >= 200: imprime "Rango Plata".',
            'Else: imprime "Rango Bronce".',
          ],
          starterCode: `let xp = 450;\n\nif (xp >= 500) {\n  console.log("Rango Oro");\n} else if (xp >= 200) {\n  // Completa el rango plata:\n  \n} else {\n  console.log("Rango Bronce");\n}\n`,
          solution: `let xp = 450;\n\nif (xp >= 500) {\n  console.log("Rango Oro");\n} else if (xp >= 200) {\n  console.log("Rango Plata");\n} else {\n  console.log("Rango Bronce");\n}`,
          hints: [
            'En el bloque else if, coloca: console.log("Rango Plata");',
          ],
          testCases: [
            {
              description: 'Debe imprimir "Rango Plata" para 450 puntos de XP',
              testFn: (logs) => logs.some((l) => l.includes('Rango Plata') || l.includes('Plata')),
              hint: 'Verifica la condición else if (xp >= 200).',
            },
          ],
        },
      },
      {
        id: 'm2-l4',
        moduleId: 'm2-condicionales',
        title: '2.4 Conectores Lógicos: && (Y) y || (O)',
        difficulty: 'Básico',
        estimatedMinutes: 9,
        xpReward: 70,
        theory: {
          introduction: '¿Qué pasa si queremos verificar dos cosas al mismo tiempo? Usamos operadores lógicos:',
          keyPoints: [
            '&& (AND / Y): Ambas condiciones deben ser verdaderas para que el resultado sea true.',
            '|| (OR / O): Basta con que al menos una condición sea verdadera.',
            '! (NOT / NO): Invierte el valor (lo que es true pasa a false y viceversa).',
          ],
          codeExample: `let tieneLlave = true;\nlet nivel = 5;\n\nif (tieneLlave && nivel >= 3) {\n  console.log("Puerta secreta abierta.");\n}\n\nlet esFinDeSemana = false;\nlet tieneVacaciones = true;\n\nif (esFinDeSemana || tieneVacaciones) {\n  console.log("¡Día libre para jugar y programar!");\n}`,
          explanation: 'El operador && es estricto (ambos sí o sí), mientras que || es más flexible (con que uno sea cierto es suficiente).',
        },
        exercise: {
          goal: 'Valida si un explorador puede cruzar el puente colgante.',
          instructions: [
            'El explorador necesita: "tieneAntorcha" (booleano true) Y "climaDespejado" (booleano true).',
            'Usa el operador && en un if para comprobar ambas variables.',
            'Si ambas son true, imprime "Puede cruzar el puente de noche".',
            'De lo contrario (else), imprime "Demasiado peligroso para cruzar".',
          ],
          starterCode: `let tieneAntorcha = true;\nlet climaDespejado = true;\n\n// Usa if con el operador &&:\nif (tieneAntorcha && climaDespejado) {\n  console.log("Puede cruzar el puente de noche");\n} else {\n  console.log("Demasiado peligroso para cruzar");\n}\n`,
          solution: `let tieneAntorcha = true;\nlet climaDespejado = true;\n\nif (tieneAntorcha && climaDespejado) {\n  console.log("Puede cruzar el puente de noche");\n} else {\n  console.log("Demasiado peligroso para cruzar");\n}`,
          hints: [
            'Escribe if (tieneAntorcha && climaDespejado)',
          ],
          testCases: [
            {
              description: 'Debe usar el operador && y permitir el cruce',
              testFn: (logs, _, code) => code.includes('&&') && logs.some((l) => l.includes('Puede cruzar')),
              hint: 'Asegúrate de incluir && en la condición del if.',
            },
          ],
        },
      },
      {
        id: 'm2-l5',
        moduleId: 'm2-condicionales',
        title: '2.5 Desafío de Módulo: El Guardián de la Mazmorra',
        difficulty: 'Básico',
        estimatedMinutes: 10,
        xpReward: 100,
        theory: {
          introduction: 'El Guardián custodia el cofre supremo. Solo permitirá el paso si el jugador cumple los requisitos de nivel o tiene una gema mágica.',
          keyPoints: [
            'Integra if, else if, else.',
            'Combina comparaciones numéricas y booleanas.',
            'Demuestra tu dominio para obtener el Certificado 2.',
          ],
          codeExample: `if (nivel >= 10 || tieneGema) {\n  console.log("Acceso concedido");\n}`,
          explanation: 'Aplica toda la lógica aprendida en este módulo.',
        },
        exercise: {
          goal: 'Escribe el sistema de acceso al templo sagrado.',
          instructions: [
            'Tienes: let nivel = 12; let tienePaseVIP = false; let esAdmin = false;',
            'Si esAdmin === true: imprime "Acceso Maestro".',
            'Else if nivel >= 10 || tienePaseVIP: imprime "Acceso Permitido".',
            'Else: imprime "Acceso Denegado".',
          ],
          starterCode: `let nivel = 12;\nlet tienePaseVIP = false;\nlet esAdmin = false;\n\n// Escribe la estructura condicional completa:\n`,
          solution: `let nivel = 12;\nlet tienePaseVIP = false;\nlet esAdmin = false;\n\nif (esAdmin) {\n  console.log("Acceso Maestro");\n} else if (nivel >= 10 || tienePaseVIP) {\n  console.log("Acceso Permitido");\n} else {\n  console.log("Acceso Denegado");\n}`,
          hints: [
            'Comienza con if (esAdmin) { ... }',
            'Luego else if (nivel >= 10 || tienePaseVIP) { ... }',
            'Termina con else { ... }',
          ],
          testCases: [
            {
              description: 'Debe imprimir "Acceso Permitido" para nivel 12',
              testFn: (logs) => logs.some((l) => l.includes('Acceso Permitido')),
              hint: 'Como nivel es 12 (>= 10), debe imprimir "Acceso Permitido".',
            },
            {
              description: 'El código debe contener las estructuras if y else if',
              testFn: (_, __, code) => code.includes('if') && code.includes('else if'),
              hint: 'Recuerda usar la estructura else if.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'm3-bucles',
    order: 3,
    title: 'Módulo 3: Bucles y Automatización',
    shortDescription: 'Deja que la computadora trabaje por ti: aprende a repetir instrucciones automáticamente con bucles for y while.',
    difficulty: 'Intermedio',
    icon: 'Repeat',
    color: 'from-amber-500 to-orange-600',
    certificate: {
      title: 'Certificado de Superación',
      subtitle: 'Bucles y Automatización de Algoritmos',
      skills: ['Bucle for', 'Iteradores y contadores (i++)', 'Bucle while', 'Acumuladores numéricos', 'Control de parada'],
      badgeName: 'Domador de Bucles',
    },
    lessons: [
      {
        id: 'm3-l1',
        moduleId: 'm3-bucles',
        title: '3.1 El Bucle for: Repetir sin Cansancio',
        difficulty: 'Intermedio',
        estimatedMinutes: 8,
        xpReward: 60,
        theory: {
          introduction: 'Si tuvieras que imprimir los números del 1 al 100, escribir 100 líneas de console.log() sería aburrido y propenso a errores. ¡Para eso existen los bucles!',
          keyPoints: [
            'El bucle for tiene 3 partes separadas por punto y coma (;):',
            '1. Inicialización: let i = 0 (dónde empieza el contador).',
            '2. Condición: i < 5 (mientras esto sea true, el bucle sigue corriendo).',
            '3. Actualización: i++ (suma 1 al contador en cada vuelta).',
          ],
          codeExample: `for (let i = 1; i <= 3; i++) {\n  console.log(\`Vuelta número: \${i}\`);\n}\n// Imprime: Vuelta 1, Vuelta 2, Vuelta 3`,
          explanation: 'La letra i es la convención tradicional de los programadores para nombrar al índice o contador.',
          tip: 'i++ es la forma rápida de escribir i = i + 1.',
        },
        exercise: {
          goal: 'Imprime una secuencia de entrenamiento del 1 al 5.',
          instructions: [
            'Escribe un bucle for que empiece en 1 y termine en 5 (incluido).',
            'En cada vuelta del bucle, imprime: `Entrenamiento paso ${i}`.',
          ],
          starterCode: `// Escribe el bucle for del 1 al 5:\nfor (let i = 1; i <= 5; i++) {\n  console.log(\`Entrenamiento paso \${i}\`);\n}\n`,
          solution: `for (let i = 1; i <= 5; i++) {\n  console.log(\`Entrenamiento paso \${i}\`);\n}`,
          hints: [
            'Usa: for (let i = 1; i <= 5; i++)',
            'Dentro de las llaves: console.log(`Entrenamiento paso ${i}`);',
          ],
          testCases: [
            {
              description: 'Debe imprimir 5 pasos de entrenamiento',
              testFn: (logs) => logs.filter((l) => l.includes('Entrenamiento paso')).length === 5,
              hint: 'Verifica que el bucle comience en 1 y llegue hasta 5.',
            },
          ],
        },
      },
      {
        id: 'm3-l2',
        moduleId: 'm3-bucles',
        title: '3.2 Acumuladores: Sumar en Cada Vuelta',
        difficulty: 'Intermedio',
        estimatedMinutes: 8,
        xpReward: 70,
        theory: {
          introduction: 'Un patrón muy común en programación es el "Acumulador": una variable que empieza en cero y va acumulando valores a medida que el bucle avanza.',
          keyPoints: [
            'Crea la variable acumuladora ANTES del bucle (ej: let total = 0).',
            'Dentro del bucle, suma con total += valor (que equivale a total = total + valor).',
            'Al terminar el bucle, la variable contendrá la suma total.',
          ],
          codeExample: `let oroRecolectado = 0;\n\nfor (let cofre = 1; cofre <= 4; cofre++) {\n  oroRecolectado += 50; // Suma 50 monedas por cofre\n}\n\nconsole.log(\`Oro total: \${oroRecolectado}\`); // 200`,
          explanation: 'En cada vuelta, la variable oroRecolectado va creciendo: 0 -> 50 -> 100 -> 150 -> 200.',
        },
        exercise: {
          goal: 'Calcula la suma de los números del 1 al 10.',
          instructions: [
            'Declara let suma = 0;',
            'Usa un bucle for que vaya desde i = 1 hasta i <= 10.',
            'En cada vuelta, suma i a la variable suma (suma += i).',
            'Fuera del bucle, imprime la suma final con console.log(suma).',
          ],
          starterCode: `let suma = 0;\n\n// Escribe el bucle for para sumar del 1 al 10:\n\n\nconsole.log(suma);\n`,
          solution: `let suma = 0;\n\nfor (let i = 1; i <= 10; i++) {\n  suma += i;\n}\n\nconsole.log(suma);`,
          hints: [
            'Dentro del bucle escribe suma += i; o suma = suma + i;',
            'La suma de 1 a 10 da como resultado 55.',
          ],
          testCases: [
            {
              description: 'La variable suma debe valer 55',
              testFn: (logs, scope, code) => scope.suma === 55 || (code.includes('suma') && logs.some((l) => l.includes('55'))),
              hint: 'Comprueba que sumes desde 1 hasta 10 inclusive.',
            },
            {
              description: 'Debe imprimir 55 en consola',
              testFn: (logs) => logs.some((l) => l.includes('55')),
              hint: 'Asegúrate de que console.log(suma) esté después del bucle.',
            },
          ],
        },
      },
      {
        id: 'm3-l3',
        moduleId: 'm3-bucles',
        title: '3.3 El Bucle while: Hasta que Cambie la Condición',
        difficulty: 'Intermedio',
        estimatedMinutes: 8,
        xpReward: 70,
        theory: {
          introduction: 'El bucle while se utiliza cuando no sabemos exactamente cuántas vueltas dará el bucle, sino que queremos que se repita MIENTRAS una condición sea verdadera.',
          keyPoints: [
            'while (condición) { ... }',
            'IMPORTANTE: Debes asegurarte de que dentro del bucle algo cambie para que la condición eventualmente se vuelva false. ¡De lo contrario tendrías un bucle infinito!',
          ],
          codeExample: `let combustible = 100;\n\nwhile (combustible > 0) {\n  console.log(\`Nave volando... Combustible: \${combustible}%\`);\n  combustible -= 25; // Gastamos 25% en cada maniobra\n}\nconsole.log("Aterrizaje completado.");`,
          explanation: 'El bucle se ejecuta con 100, 75, 50, 25. Cuando llega a 0, la condición combustible > 0 ya no se cumple y el bucle termina limpiamente.',
        },
        exercise: {
          goal: 'Simula una cuenta atrás de escudo de energía.',
          instructions: [
            'Declara let energia = 30;',
            'Crea un bucle while que se ejecute mientras energia > 0.',
            'Dentro del bucle, imprime `Energía restante: ${energia}` y resta 10 a energia (energia -= 10).',
          ],
          starterCode: `let energia = 30;\n\n// Escribe el bucle while:\nwhile (energia > 0) {\n  console.log(\`Energía restante: \${energia}\`);\n  energia -= 10;\n}\n`,
          solution: `let energia = 30;\n\nwhile (energia > 0) {\n  console.log(\`Energía restante: \${energia}\`);\n  energia -= 10;\n}`,
          hints: [
            'Dentro de las llaves del while: console.log(`Energía restante: ${energia}`);',
            'Y luego: energia -= 10;',
          ],
          testCases: [
            {
              description: 'Debe imprimir la energía en 30, 20 y 10',
              testFn: (logs) => logs.some((l) => l.includes('30')) && logs.some((l) => l.includes('10')),
              hint: 'Revisa la condición energia > 0 y la resta energia -= 10.',
            },
          ],
        },
      },
      {
        id: 'm3-l4',
        moduleId: 'm3-bucles',
        title: '3.4 Desafío de Módulo: El Lanzamiento del Cohete',
        difficulty: 'Intermedio',
        estimatedMinutes: 10,
        xpReward: 100,
        theory: {
          introduction: '¡Es hora de poner a prueba tus habilidades de automatización! Vas a programar la secuencia de lanzamiento de un cohete espacial con cuenta regresiva.',
          keyPoints: [
            'Usa un bucle que cuente hacia atrás (i--).',
            'Cuando llegue a 0, muestra el despegue.',
          ],
          codeExample: `for (let i = 3; i >= 1; i--) {\n  console.log(i);\n}\nconsole.log("¡Despegue!");`,
        },
        exercise: {
          goal: 'Crea una cuenta atrás del 5 al 1 y luego imprime "¡Despegue!".',
          instructions: [
            'Usa un bucle for que empiece en 5, continúe mientras i >= 1, y reste 1 en cada paso (i--).',
            'En cada paso imprime `T-menos ${i}`.',
            'Al terminar el bucle, imprime "¡Despegue exitoso hacia las estrellas!".',
          ],
          starterCode: `// Escribe el bucle de cuenta atrás del 5 al 1:\n\n\n// Fuera del bucle imprime el mensaje de despegue:\n`,
          solution: `for (let i = 5; i >= 1; i--) {\n  console.log(\`T-menos \${i}\`);\n}\nconsole.log("¡Despegue exitoso hacia las estrellas!");`,
          hints: [
            'Usa for (let i = 5; i >= 1; i--)',
            'Imprime console.log(`T-menos ${i}`);',
            'Al final: console.log("¡Despegue exitoso hacia las estrellas!");',
          ],
          testCases: [
            {
              description: 'Debe imprimir los 5 pasos de cuenta regresiva (T-menos 5 hasta T-menos 1)',
              testFn: (logs) => logs.filter((l) => l.includes('T-menos')).length === 5,
              hint: 'Verifica que cuente desde 5 hasta 1 decrementando con i--.',
            },
            {
              description: 'Debe imprimir el mensaje final de despegue',
              testFn: (logs) => logs.some((l) => l.includes('Despegue') || l.includes('despegue')),
              hint: 'Añade la línea final tras el bucle con el despegue.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'm4-arreglos',
    order: 4,
    title: 'Módulo 4: Listas y Arreglos (Arrays)',
    shortDescription: 'Organiza datos como un profesional: almacena múltiples elementos en listas ordenadas y manipúlalos con facilidad.',
    difficulty: 'Intermedio',
    icon: 'Layers',
    color: 'from-emerald-500 to-teal-600',
    certificate: {
      title: 'Certificado de Superación',
      subtitle: 'Estructuras de Datos y Listas (Arrays)',
      skills: ['Creación de arrays []', 'Índices base cero', 'Métodos push y pop', 'Propiedad .length', 'Recorrido con bucles'],
      badgeName: 'Maestro de Listas',
    },
    lessons: [
      {
        id: 'm4-l1',
        moduleId: 'm4-arreglos',
        title: '4.1 Creación e Índices de Arrays',
        difficulty: 'Intermedio',
        estimatedMinutes: 7,
        xpReward: 60,
        theory: {
          introduction: '¿Qué harías si necesitas guardar los nombres de 50 jugadores? ¿Crearías 50 variables diferentes? ¡No! Para eso usamos los Arreglos o Listas (Arrays).',
          keyPoints: [
            'Se definen con corchetes: let items = ["espada", "escudo", "poción"];',
            'Cada elemento tiene una posición o ÍNDICE.',
            '¡IMPORTANTE!: En programación, los índices EMPIEZAN EN CERO (0). El primer elemento es [0], el segundo [1], etc.',
          ],
          codeExample: `let amigos = ["Luna", "Mateo", "Sofía"];\n\nconsole.log(amigos[0]); // Muestra "Luna"\nconsole.log(amigos[1]); // Muestra "Mateo"\nconsole.log(amigos.length); // Muestra 3 (la cantidad total)`,
          explanation: 'La propiedad .length nos dice cuántos elementos tiene el array.',
        },
        exercise: {
          goal: 'Crea una lista de hechizos y accede a sus elementos.',
          instructions: [
            'Crea un array llamado "hechizos" con los elementos: "Fuego", "Hielo", "Rayo".',
            'Imprime el primer hechizo (índice 0).',
            'Imprime cuántos hechizos hay en total usando hechizos.length.',
          ],
          starterCode: `// 1. Crea el array hechizos:\nlet hechizos = ["Fuego", "Hielo", "Rayo"];\n\n// 2. Imprime el primer hechizo (índice 0):\n\n// 3. Imprime la cantidad total con .length:\n`,
          solution: `let hechizos = ["Fuego", "Hielo", "Rayo"];\nconsole.log(hechizos[0]);\nconsole.log(hechizos.length);`,
          hints: [
            'Accede al primer elemento con hechizos[0]',
            'Imprime la longitud con console.log(hechizos.length);',
          ],
          testCases: [
            {
              description: 'hechizos debe ser un array con 3 elementos',
              testFn: (_, scope, code) => (Array.isArray(scope.hechizos) && (scope.hechizos as unknown[]).length === 3) || (code.includes('hechizos') && code.includes('Fuego')),
              hint: 'Define let hechizos = ["Fuego", "Hielo", "Rayo"];',
            },
            {
              description: 'Debe imprimir "Fuego" y el número 3',
              testFn: (logs) => logs.some((l) => l.includes('Fuego')) && logs.some((l) => l.includes('3')),
              hint: 'Imprime hechizos[0] y hechizos.length.',
            },
          ],
        },
      },
      {
        id: 'm4-l2',
        moduleId: 'm4-arreglos',
        title: '4.2 Modificar Listas: push() y pop()',
        difficulty: 'Intermedio',
        estimatedMinutes: 8,
        xpReward: 70,
        theory: {
          introduction: 'Las listas no son fijas: podemos agregar nuevos elementos al final con .push() y quitar el último elemento con .pop().',
          keyPoints: [
            'array.push("nuevo") agrega un elemento al final.',
            'array.pop() elimina el último elemento y lo devuelve.',
            'También puedes modificar un elemento directamente por su índice: array[0] = "otro".',
          ],
          codeExample: `let inventario = ["pocion"];\ninventario.push("arco");\ninventario.push("flechas");\nconsole.log(inventario); // ["pocion", "arco", "flechas"]\n\ninventario.pop(); // Quita "flechas"\nconsole.log(inventario); // ["pocion", "arco"]`,
          explanation: 'Los métodos push y pop son las herramientas fundamentales para gestionar colas y pilas de datos.',
        },
        exercise: {
          goal: 'Gestiona la mochila de un aventurero.',
          instructions: [
            'Tienes let mochila = ["mapa", "brujula"];',
            'Usa .push() para agregar "cantimplora".',
            'Usa .push() para agregar "cuerda".',
            'Imprime la mochila completa en la consola.',
          ],
          starterCode: `let mochila = ["mapa", "brujula"];\n\n// Agrega "cantimplora" y "cuerda":\n\n\nconsole.log(mochila);\n`,
          solution: `let mochila = ["mapa", "brujula"];\nmochila.push("cantimplora");\nmochila.push("cuerda");\nconsole.log(mochila);`,
          hints: [
            'mochila.push("cantimplora");',
            'mochila.push("cuerda");',
          ],
          testCases: [
            {
              description: 'La mochila debe tener 4 elementos incluyendo cantimplora y cuerda',
              testFn: (_, scope, code) => {
                const arr = scope.mochila as string[];
                return (Array.isArray(arr) && arr.length === 4 && arr.includes('cantimplora') && arr.includes('cuerda')) ||
                  (code.includes('cantimplora') && code.includes('cuerda'));
              },
              hint: 'Asegúrate de haber usado mochila.push("cantimplora") y mochila.push("cuerda").',
            },
          ],
        },
      },
      {
        id: 'm4-l3',
        moduleId: 'm4-arreglos',
        title: '4.3 Recorrer una Lista con Bucles',
        difficulty: 'Intermedio',
        estimatedMinutes: 9,
        xpReward: 80,
        theory: {
          introduction: 'La verdadera magia ocurre cuando combinamos Bucles con Arrays. Podemos recorrer automáticamente cada elemento de la lista sin importar si tiene 5 o 5000 elementos.',
          keyPoints: [
            'Usamos un bucle for donde el índice i va desde 0 hasta i < array.length.',
            'En cada vuelta, accedemos al elemento actual con array[i].',
          ],
          codeExample: `let frutas = ["Manzana", "Plátano", "Naranja"];\n\nfor (let i = 0; i < frutas.length; i++) {\n  console.log(\`Fruta #\${i + 1}: \${frutas[i]}\`);\n}`,
          explanation: 'Como i < frutas.length, cuando i llega a 3 (que es la longitud), el bucle se detiene exactamente al terminar los elementos.',
        },
        exercise: {
          goal: 'Muestra a todos los miembros de una tripulación espacial.',
          instructions: [
            'Tienes un array: let tripulantes = ["Capitana Rex", "Piloto Leo", "Ingeniera Maya"];',
            'Crea un bucle for para recorrerlo desde 0 hasta i < tripulantes.length.',
            'En cada vuelta, imprime: `Tripulante: ${tripulantes[i]}`.',
          ],
          starterCode: `let tripulantes = ["Capitana Rex", "Piloto Leo", "Ingeniera Maya"];\n\n// Escribe el bucle for para recorrer los tripulantes:\n`,
          solution: `let tripulantes = ["Capitana Rex", "Piloto Leo", "Ingeniera Maya"];\n\nfor (let i = 0; i < tripulantes.length; i++) {\n  console.log(\`Tripulante: \${tripulantes[i]}\`);\n}`,
          hints: [
            'for (let i = 0; i < tripulantes.length; i++)',
            'console.log(`Tripulante: ${tripulantes[i]}`);',
          ],
          testCases: [
            {
              description: 'Debe imprimir a los 3 tripulantes en consola',
              testFn: (logs) => logs.some((l) => l.includes('Rex')) && logs.some((l) => l.includes('Leo')) && logs.some((l) => l.includes('Maya')),
              hint: 'Verifica acceder a tripulantes[i] dentro del bucle.',
            },
          ],
        },
      },
      {
        id: 'm4-l4',
        moduleId: 'm4-arreglos',
        title: '4.4 Desafío de Módulo: El Buscador de Tesoros',
        difficulty: 'Intermedio',
        estimatedMinutes: 10,
        xpReward: 100,
        theory: {
          introduction: 'En este desafío final del módulo, buscarás un objeto especial dentro de una lista y contarás cuántos elementos valiosos hay.',
          keyPoints: [
            'Recorre el array con for.',
            'Usa una condición if para comparar cada elemento.',
            'Aumenta un contador cuando encuentres lo que buscas.',
          ],
          codeExample: `let cofres = [10, 50, 100, 20];\nlet totalOro = 0;\nfor (let i = 0; i < cofres.length; i++) {\n  totalOro += cofres[i];\n}`,
        },
        exercise: {
          goal: 'Cuenta cuántas gemas mágicas hay en el botín.',
          instructions: [
            'Tienes: let botin = ["piedra", "gema", "madera", "gema", "hierro", "gema"];',
            'Declara let contadorGemas = 0;',
            'Recorre el array con un for. Si el elemento actual es "gema", suma 1 a contadorGemas.',
            'Al terminar el bucle, imprime `Total de gemas encontradas: ${contadorGemas}`.',
          ],
          starterCode: `let botin = ["piedra", "gema", "madera", "gema", "hierro", "gema"];\nlet contadorGemas = 0;\n\n// Recorre botin y cuenta cuántas "gema" hay:\n\n\nconsole.log(\`Total de gemas encontradas: \${contadorGemas}\`);\n`,
          solution: `let botin = ["piedra", "gema", "madera", "gema", "hierro", "gema"];\nlet contadorGemas = 0;\n\nfor (let i = 0; i < botin.length; i++) {\n  if (botin[i] === "gema") {\n    contadorGemas++;\n  }\n}\n\nconsole.log(\`Total de gemas encontradas: \${contadorGemas}\`);`,
          hints: [
            'Dentro del for: if (botin[i] === "gema") { contadorGemas++; }',
            'Hay exactamente 3 gemas en el botín.',
          ],
          testCases: [
            {
              description: 'contadorGemas debe ser 3',
              testFn: (logs, scope, code) => scope.contadorGemas === 3 || (code.includes('contadorGemas') && logs.some((l) => l.includes('3'))),
              hint: 'Asegúrate de sumar 1 cada vez que botin[i] sea igual a "gema".',
            },
            {
              description: 'Debe imprimir el total de gemas en consola',
              testFn: (logs) => logs.some((l) => l.includes('3') && l.includes('gemas')),
              hint: 'Verifica la llamada final a console.log.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'm5-funciones',
    order: 5,
    title: 'Módulo 5: Funciones y Modularidad',
    shortDescription: 'Crea tus propios superpoderes en código: empaqueta instrucciones reutilizables con parámetros y valores de retorno.',
    difficulty: 'Avanzado',
    icon: 'Code',
    color: 'from-purple-500 to-pink-600',
    certificate: {
      title: 'Certificado de Superación',
      subtitle: 'Funciones y Programación Modular',
      skills: ['Declaración de funciones', 'Parámetros y argumentos', 'Palabra clave return', 'Funciones flecha (=>)', 'Reutilización de código'],
      badgeName: 'Hechicero de Funciones',
    },
    lessons: [
      {
        id: 'm5-l1',
        moduleId: 'm5-funciones',
        title: '5.1 ¿Qué es una Función y Cómo Invocarla?',
        difficulty: 'Avanzado',
        estimatedMinutes: 7,
        xpReward: 60,
        theory: {
          introduction: 'Una función es un bloque de código con nombre que realiza una tarea específica. En lugar de reescribir las mismas instrucciones 10 veces, defines una función una sola vez y la invocas cuando la necesites.',
          keyPoints: [
            'Se declara con la palabra function nombre() { ... }',
            'Para que se ejecute, debes "llamarla" o "invocarla" escribiendo su nombre seguido de paréntesis: nombre();',
          ],
          codeExample: `function celebrarVictoria() {\n  console.log("🎺 ¡Victoria épica!");\n  console.log("⭐ Has ganado 100 puntos.");\n}\n\n// Invocamos la función dos veces:\ncelebrarVictoria();\ncelebrarVictoria();`,
          explanation: 'Cada vez que escribes celebrarVictoria(); la computadora salta a ejecutar el código dentro de sus llaves.',
        },
        exercise: {
          goal: 'Crea e invoca una función de saludo gamer.',
          instructions: [
            'Crea una función llamada "iniciarPartida".',
            'Dentro de la función, imprime: "¡Cargando mundo virtual... Preparado!".',
            'Invoca la función al menos una vez.',
          ],
          starterCode: `// Declara la función iniciarPartida:\nfunction iniciarPartida() {\n  console.log("¡Cargando mundo virtual... Preparado!");\n}\n\n// Invócala aquí:\n`,
          solution: `function iniciarPartida() {\n  console.log("¡Cargando mundo virtual... Preparado!");\n}\n\niniciarPartida();`,
          hints: [
            'Escribe iniciarPartida(); para invocarla.',
          ],
          testCases: [
            {
              description: 'Debe invocar la función e imprimir el mensaje',
              testFn: (logs) => logs.some((l) => l.includes('Cargando mundo virtual') || l.includes('Preparado')),
              hint: 'Asegúrate de llamar a iniciarPartida(); con paréntesis.',
            },
          ],
        },
      },
      {
        id: 'm5-l2',
        moduleId: 'm5-funciones',
        title: '5.2 Parámetros: Funciones Personalizables',
        difficulty: 'Avanzado',
        estimatedMinutes: 8,
        xpReward: 70,
        theory: {
          introduction: 'Las funciones son aún más poderosas cuando les pasamos datos. Los "parámetros" son variables que la función recibe entre sus paréntesis para adaptar su comportamiento.',
          keyPoints: [
            'Parámetro: la variable que defines en la declaración (ej: function saludar(nombre)).',
            'Argumento: el valor real que le envías al llamarla (ej: saludar("Lucas")).',
            'Puedes pasar varios parámetros separados por comas: function sumar(a, b).',
          ],
          codeExample: `function presentarse(nombre, clase) {\n  console.log(\`Hola, soy \${nombre} y soy un \${clase}.\`);\n}\n\npresentarse("Valeria", "Maga Arcana");\npresentarse("Kael", "Paladín");`,
          explanation: 'La misma función produce resultados distintos según los argumentos que le enviamos.',
        },
        exercise: {
          goal: 'Crea una función que aplique daño a un objetivo.',
          instructions: [
            'Crea una función llamada "atacar" que reciba dos parámetros: (objetivo, daño).',
            'Dentro de la función, imprime: `¡Golpe a ${objetivo} infligiendo ${daño} puntos de daño!`',
            'Llama a atacar("Dragón", 75).',
          ],
          starterCode: `// Crea la función atacar(objetivo, daño):\n\n\n// Llama a la función atacar("Dragón", 75):\n`,
          solution: `function atacar(objetivo, daño) {\n  console.log(\`¡Golpe a \${objetivo} infligiendo \${daño} puntos de daño!\`);\n}\n\natacar("Dragón", 75);`,
          hints: [
            'function atacar(objetivo, daño) { ... }',
            'console.log(`¡Golpe a ${objetivo} infligiendo ${daño} puntos de daño!`);',
            'atacar("Dragón", 75);',
          ],
          testCases: [
            {
              description: 'Debe imprimir el ataque al Dragón con 75 de daño',
              testFn: (logs) => logs.some((l) => l.includes('Dragón') && l.includes('75')),
              hint: 'Llama a la función con atacar("Dragón", 75);',
            },
          ],
        },
      },
      {
        id: 'm5-l3',
        moduleId: 'm5-funciones',
        title: '5.3 El Poder de return: Devolver Resultados',
        difficulty: 'Avanzado',
        estimatedMinutes: 9,
        xpReward: 80,
        theory: {
          introduction: 'Hasta ahora las funciones imprimían cosas. Pero en el código real, las funciones suelen CALCULAR un valor y DEVOLVERLO para que lo usemos en otras partes. Eso lo logramos con return.',
          keyPoints: [
            'return devuelve un resultado y finaliza inmediatamente la ejecución de la función.',
            'El valor devuelto se puede guardar en una variable.',
          ],
          codeExample: `function calcularAreaRectangulo(ancho, alto) {\n  return ancho * alto;\n}\n\nlet area = calcularAreaRectangulo(10, 5);\nconsole.log(\`El área es: \${area}\`); // 50`,
          explanation: 'calcularAreaRectangulo(10, 5) se convierte en el número 50, que guardamos en la variable area.',
          tip: 'Cualquier código que pongas DESPUÉS de un return nunca se ejecutará.',
        },
        exercise: {
          goal: 'Crea una función de cálculo de bonificación de experiencia.',
          instructions: [
            'Crea una función llamada "calcularXpConBonus" que reciba (xpBase, multiplicador).',
            'La función debe retornar (return) el producto de: xpBase * multiplicador.',
            'Guarda el resultado de calcularXpConBonus(100, 1.5) en una variable "totalXp".',
            'Imprime totalXp en consola.',
          ],
          starterCode: `// Crea la función calcularXpConBonus con return:\nfunction calcularXpConBonus(xpBase, multiplicador) {\n  return xpBase * multiplicador;\n}\n\n// Llama a la función y guarda el resultado en totalXp:\nlet totalXp = calcularXpConBonus(100, 1.5);\n\nconsole.log(totalXp);\n`,
          solution: `function calcularXpConBonus(xpBase, multiplicador) {\n  return xpBase * multiplicador;\n}\n\nlet totalXp = calcularXpConBonus(100, 1.5);\nconsole.log(totalXp);`,
          hints: [
            'Usa return xpBase * multiplicador;',
            'totalXp debe ser 150.',
          ],
          testCases: [
            {
              description: 'totalXp debe ser 150',
              testFn: (logs, scope, code) => scope.totalXp === 150 || (code.includes('totalXp') && logs.some((l) => l.includes('150'))),
              hint: 'Verifica la función calcularXpConBonus(100, 1.5).',
            },
            {
              description: 'Debe imprimir 150 en consola',
              testFn: (logs) => logs.some((l) => l.includes('150')),
              hint: 'Asegúrate de imprimir totalXp con console.log.',
            },
          ],
        },
      },
      {
        id: 'm5-l4',
        moduleId: 'm5-funciones',
        title: '5.4 Desafío de Módulo: Calculadora de Daño Crítico',
        difficulty: 'Avanzado',
        estimatedMinutes: 10,
        xpReward: 100,
        theory: {
          introduction: 'Vas a construir el motor de cálculo de combate para un RPG. Debe calcular el daño normal o crítico dependiendo de si el ataque acierta.',
          keyPoints: [
            'Usa parámetros, condicionales y return.',
            'Si esCritico es true, duplica el daño.',
          ],
          codeExample: `function testCritico(daño, esCritico) {\n  if (esCritico) return daño * 2;\n  return daño;\n}`,
        },
        exercise: {
          goal: 'Programa la función calcularDañoFinal.',
          instructions: [
            'Crea una función "calcularDañoFinal(dañoBase, esCritico)".',
            'Si esCritico es true, devuelve dañoBase * 2.',
            'Si no, devuelve dañoBase tal cual.',
            'Prueba la función: calcula let daño1 = calcularDañoFinal(40, true); y let daño2 = calcularDañoFinal(40, false);',
            'Imprime ambos resultados.',
          ],
          starterCode: `// Crea la función calcularDañoFinal:\n\n\nlet daño1 = calcularDañoFinal(40, true);\nlet daño2 = calcularDañoFinal(40, false);\n\nconsole.log(\`Crítico: \${daño1} | Normal: \${daño2}\`);\n`,
          solution: `function calcularDañoFinal(dañoBase, esCritico) {\n  if (esCritico) {\n    return dañoBase * 2;\n  }\n  return dañoBase;\n}\n\nlet daño1 = calcularDañoFinal(40, true);\nlet daño2 = calcularDañoFinal(40, false);\nconsole.log(\`Crítico: \${daño1} | Normal: \${daño2}\`);`,
          hints: [
            'if (esCritico) { return dañoBase * 2; } return dañoBase;',
            'daño1 debe valer 80 y daño2 debe valer 40.',
          ],
          testCases: [
            {
              description: 'daño1 debe ser 80 y daño2 debe ser 40',
              testFn: (logs, scope, code) => (scope.daño1 === 80 && scope.daño2 === 40) || (logs.some((l) => l.includes('80')) && logs.some((l) => l.includes('40'))),
              hint: 'Verifica la lógica de la función calcularDañoFinal.',
            },
            {
              description: 'Debe imprimir los daños 80 y 40',
              testFn: (logs) => logs.some((l) => l.includes('80') && l.includes('40')),
              hint: 'Imprime ambos resultados con console.log.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'm6-proyecto-rpg',
    order: 6,
    title: 'Módulo 6: Proyecto Final: El Simulador de Mazmorra',
    shortDescription: '¡El desafío maestro! Integra variables, condiciones, bucles, listas y funciones en un simulador de combate RPG completo.',
    difficulty: 'Avanzado',
    icon: 'Sword',
    color: 'from-rose-500 to-red-600',
    certificate: {
      title: 'Certificado Maestro',
      subtitle: 'Desarrollo de Software y Algoritmia Interactiva',
      skills: ['Integración de sistemas', 'Simulación por turnos', 'Lógica matemática de juegos', 'Algoritmos condicionales complejos', 'Arquitectura modular'],
      badgeName: 'Arquitecto del Código',
    },
    lessons: [
      {
        id: 'm6-l1',
        moduleId: 'm6-proyecto-rpg',
        title: '6.1 El Motor de Combate por Turnos',
        difficulty: 'Avanzado',
        estimatedMinutes: 12,
        xpReward: 120,
        theory: {
          introduction: '¡Has llegado a la cumbre! Aquí combinaremos todos los conceptos que aprendiste: variables, arrays, bucles while, condicionales if/else y funciones para crear una simulación de combate épico en tiempo real.',
          keyPoints: [
            'Un combate por turnos se modela perfectamente con un bucle while (mientras ambos personajes tengan vida > 0).',
            'Cada turno el héroe ataca y el enemigo responde.',
            'Mostramos el desarrollo en consola y declaramos al vencedor.',
          ],
          codeExample: `let heroeVida = 50;\nlet monstruoVida = 30;\n\nwhile (heroeVida > 0 && monstruoVida > 0) {\n  monstruoVida -= 15;\n  if (monstruoVida > 0) {\n    heroeVida -= 10;\n  }\n}\nconsole.log(heroeVida > 0 ? "¡Héroe triunfa!" : "Héroe caído.");`,
          explanation: 'Este es el núcleo lógico que usan los videojuegos RPG como Pokémon o Final Fantasy.',
        },
        exercise: {
          goal: 'Programa la batalla completa entre el Héroe y el Golem de Piedra.',
          instructions: [
            'Tienes: let vidaHeroe = 60; let vidaGolem = 50; let ronda = 1;',
            'Usa un bucle while (vidaHeroe > 0 && vidaGolem > 0).',
            'En cada turno: resta 20 de daño al Golem (vidaGolem -= 20).',
            'Si vidaGolem > 0, el Golem contraataca restando 15 al Héroe (vidaHeroe -= 15).',
            'Imprime en cada ronda: `Ronda ${ronda} | Héroe: ${vidaHeroe} HP | Golem: ${vidaGolem} HP`.',
            'Incrementa ronda++ en cada vuelta.',
            'Fuera del bucle, si vidaHeroe > 0 imprime "¡Victoria! El Golem ha sido derrotado." De lo contrario "Derrota".',
          ],
          starterCode: `let vidaHeroe = 60;\nlet vidaGolem = 50;\nlet ronda = 1;\n\n// Bucle de batalla:\nwhile (vidaHeroe > 0 && vidaGolem > 0) {\n  vidaGolem -= 20;\n  if (vidaGolem > 0) {\n    vidaHeroe -= 15;\n  }\n  console.log(\`Ronda \${ronda} | Héroe: \${vidaHeroe} HP | Golem: \${vidaGolem} HP\`);\n  ronda++;\n}\n\nif (vidaHeroe > 0) {\n  console.log("¡Victoria! El Golem ha sido derrotado.");\n} else {\n  console.log("Derrota.");\n}\n`,
          solution: `let vidaHeroe = 60;\nlet vidaGolem = 50;\nlet ronda = 1;\n\nwhile (vidaHeroe > 0 && vidaGolem > 0) {\n  vidaGolem -= 20;\n  if (vidaGolem > 0) {\n    vidaHeroe -= 15;\n  }\n  console.log(\`Ronda \${ronda} | Héroe: \${vidaHeroe} HP | Golem: \${vidaGolem} HP\`);\n  ronda++;\n}\n\nif (vidaHeroe > 0) {\n  console.log("¡Victoria! El Golem ha sido derrotado.");\n} else {\n  console.log("Derrota.");\n}`,
          hints: [
            'Ejecuta el código y observa cómo se desarrolla cada turno en la consola.',
            'El héroe ganará con 30 HP restantes.',
          ],
          testCases: [
            {
              description: 'El combate debe terminar con la victoria del héroe',
              testFn: (logs, scope, code) => (scope.vidaHeroe === 30 || code.includes('vidaHeroe')) && logs.some((l) => l.includes('Victoria') || l.includes('derrotado')),
              hint: 'Asegúrate de que el bucle while simule las rondas completas.',
            },
            {
              description: 'Debe haber impreso al menos 3 rondas en la consola',
              testFn: (logs) => logs.filter((l) => l.includes('Ronda')).length >= 3,
              hint: 'Comprueba el mensaje de cada ronda dentro del bucle.',
            },
          ],
        },
      },
      {
        id: 'm6-l2',
        moduleId: 'm6-proyecto-rpg',
        title: '6.2 Proyecto Maestro: El Gran Sistema de Misión',
        difficulty: 'Avanzado',
        estimatedMinutes: 15,
        xpReward: 150,
        theory: {
          introduction: '¡El reto supremo de graduación! Construirás un sistema que procesa una lista de misiones completadas, calcula la recompensa total y determina si el jugador sube de nivel.',
          keyPoints: [
            'Array de misiones con objetos de recompensas.',
            'Bucle acumulador con función validadora.',
            'Al completar este ejercicio, desbloquearás el Certificado Maestro definitivo.',
          ],
          codeExample: `let recompensas = [50, 100, 150];\nlet suma = 0;\nfor (let i = 0; i < recompensas.length; i++) {\n  suma += recompensas[i];\n}`,
        },
        exercise: {
          goal: 'Crea el procesador de recompensas de gremio de aventureros.',
          instructions: [
            '1. Tienes un array let misionesXp = [120, 80, 250, 150];',
            '2. Declara una función "sumarXpTotal(lista)" que reciba un array y retorne la suma total de sus elementos usando un bucle for.',
            '3. Llama a sumarXpTotal(misionesXp) y guarda el total en "xpGanada".',
            '4. Si xpGanada >= 500, imprime "¡Enhorabuena! Has subido de nivel y te has graduado como programador."',
          ],
          starterCode: `let misionesXp = [120, 80, 250, 150];\n\n// 1. Declara la función sumarXpTotal(lista):\nfunction sumarXpTotal(lista) {\n  let total = 0;\n  for (let i = 0; i < lista.length; i++) {\n    total += lista[i];\n  }\n  return total;\n}\n\n// 2. Calcula xpGanada:\nlet xpGanada = sumarXpTotal(misionesXp);\n\n// 3. Condición de graduación:\nif (xpGanada >= 500) {\n  console.log("¡Enhorabuena! Has subido de nivel y te has graduado como programador.");\n}\n`,
          solution: `let misionesXp = [120, 80, 250, 150];\n\nfunction sumarXpTotal(lista) {\n  let total = 0;\n  for (let i = 0; i < lista.length; i++) {\n    total += lista[i];\n  }\n  return total;\n}\n\nlet xpGanada = sumarXpTotal(misionesXp);\n\nif (xpGanada >= 500) {\n  console.log("¡Enhorabuena! Has subido de nivel y te has graduado como programador.");\n}`,
          hints: [
            'La suma de 120 + 80 + 250 + 150 es 600.',
            'Como 600 >= 500, se imprimirá el mensaje de graduación.',
          ],
          testCases: [
            {
              description: 'xpGanada debe ser 600',
              testFn: (logs, scope, code) => scope.xpGanada === 600 || logs.some((l) => l.includes('graduado') || l.includes('Enhorabuena')),
              hint: 'Verifica la suma en la función sumarXpTotal.',
            },
            {
              description: 'Debe imprimir el mensaje de graduación oficial',
              testFn: (logs) => logs.some((l) => l.includes('graduado') || l.includes('Enhorabuena')),
              hint: 'Revisa que la condición if (xpGanada >= 500) se cumpla.',
            },
          ],
        },
      },
    ],
  },
];

// Ensure all javascript modules have language: 'javascript' set explicitly
const normalizedJsModules = javascriptModules.map((m) => ({
  ...m,
  language: (m.language || 'javascript') as 'javascript',
  lessons: m.lessons.map((l) => ({
    ...l,
    language: (l.language || 'javascript') as 'javascript',
  })),
}));

export const courseModules: CourseModule[] = [
  ...normalizedJsModules,
  ...pythonModules,
  ...reactModules,
];
