import { CourseModule } from '../types/course';

export const reactModules: CourseModule[] = [
  {
    id: 'react-m1-componentes',
    order: 12,
    title: 'React 1: Componentes y JSX Moderno',
    shortDescription: 'Crea interfaces web visuales e interactivas: aprende qué es un Componente, cómo funciona JSX y cómo dividir una aplicación en bloques modulares.',
    difficulty: 'Básico',
    language: 'react',
    icon: 'Layers',
    color: 'from-cyan-400 to-blue-600',
    certificate: {
      title: 'Certificado de Superación',
      subtitle: 'Componentes y Arquitectura JSX en React',
      skills: ['Componentes funcionales', 'Sintaxis JSX', 'Composición de UI', 'Buenas prácticas React'],
      badgeName: 'Constructor de Interfaces',
    },
    lessons: [
      {
        id: 'react-m1-l1',
        moduleId: 'react-m1-componentes',
        title: 'React 1.1: Tu Primer Componente y JSX',
        difficulty: 'Básico',
        language: 'react',
        estimatedMinutes: 8,
        xpReward: 70,
        theory: {
          introduction: `¿Qué es React?
React es la librería de JavaScript más utilizada del mundo para construir aplicaciones web interactivas (utilizada por Netflix, Instagram, Discord y miles de empresas).

En React, la pantalla se divide en "Componentes": pequeñas piezas reutilizables de código que retornan HTML enriquecido con JavaScript, llamado JSX.`,
          keyPoints: [
            'Un componente de React es una función cuyo nombre empieza con MAYÚSCULA.',
            'Retorna código JSX (HTML con superpoderes de JavaScript).',
            'Se utiliza className en lugar de class para dar estilos.',
          ],
          codeExample: `// Un componente básico en React:
function TarjetaHeroe() {
  const nombre = "Aria la Valiente";
  const clase = "Maga de Hielo";
  
  return (
    <div className="tarjeta">
      <h2>{nombre}</h2>
      <p>Clase: {clase}</p>
    </div>
  );
}

console.log("Componente TarjetaHeroe definido con éxito.");`,
          explanation: 'Entre llaves {} puedes escribir cualquier expresión de JavaScript dentro del JSX.',
        },
        exercise: {
          goal: 'Crea un componente React llamado "TarjetaJugador" que retorne información de un gamer.',
          instructions: [
            '1. Define la función "TarjetaJugador()".',
            '2. Dentro define const alias = "CyberStorm" y const rango = "Platino".',
            '3. La función debe retornar un elemento <div> con un <h1> que contenga {alias} y un <p> con {rango}.',
            '4. Muestra un console.log("TarjetaJugador lista").',
          ],
          starterCode: `function TarjetaJugador() {
  const alias = "CyberStorm";
  const rango = "Platino";

  return (
    <div className="p-4 bg-slate-900 rounded-xl">
      <h1 className="text-xl font-bold text-cyan-400">{alias}</h1>
      <p className="text-sm text-slate-300">Rango: {rango}</p>
    </div>
  );
}

console.log("TarjetaJugador lista");
`,
          solution: `function TarjetaJugador() {\n  const alias = "CyberStorm";\n  const rango = "Platino";\n\n  return (\n    <div className="p-4 bg-slate-900 rounded-xl">\n      <h1 className="text-xl font-bold text-cyan-400">{alias}</h1>\n      <p className="text-sm text-slate-300">Rango: {rango}</p>\n    </div>\n  );\n}\n\nconsole.log("TarjetaJugador lista");`,
          hints: ['Define function TarjetaJugador() y retorna el JSX.'],
          testCases: [
            {
              description: 'Debe definir la función TarjetaJugador',
              testFn: (_, scope, code) => typeof scope.TarjetaJugador === 'function' || code.includes('function TarjetaJugador'),
              hint: 'Asegúrate de definir function TarjetaJugador().',
            },
            {
              description: 'Debe imprimir el mensaje de confirmación',
              testFn: (logs) => logs.some((l) => l.includes('TarjetaJugador lista')),
              hint: 'Incluye console.log("TarjetaJugador lista");',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'react-m2-estado',
    order: 13,
    title: 'React 2: Estados y Reactividad (useState)',
    shortDescription: 'Haz que tus componentes cobren vida: aprende a manejar la memoria interna de un componente con el Hook useState.',
    difficulty: 'Intermedio',
    language: 'react',
    icon: 'Zap',
    color: 'from-blue-500 to-indigo-600',
    certificate: {
      title: 'Certificado de Superación',
      subtitle: 'Reactividad y Manejo de Estados con useState',
      skills: ['React Hooks', 'useState()', 'Eventos onClick', 'Re-renderizado reactivo'],
      badgeName: 'Mago del Estado React',
    },
    lessons: [
      {
        id: 'react-m2-l1',
        moduleId: 'react-m2-estado',
        title: 'React 2.1: El Hook useState y Contadores',
        difficulty: 'Intermedio',
        language: 'react',
        estimatedMinutes: 9,
        xpReward: 80,
        theory: {
          introduction: `¿Cómo recuerda un juego tus puntos cuando haces clic?
En React usamos un "Hook" llamado useState. El estado es la memoria del componente: cada vez que el estado cambia, React actualiza la pantalla automáticamente.`,
          keyPoints: [
            'const [valor, setValor] = React.useState(valorInicial);',
            'valor: la variable actual.',
            'setValor: la función especial para actualizar ese valor.',
            'Nunca modificamos valor directamente; siempre usamos setValor(nuevoValor).',
          ],
          codeExample: `function ContadorVidas() {
  const [vidas, setVidas] = React.useState(3);

  const restarVida = () => {
    setVidas(vidas - 1);
  };

  return (
    <div>
      <p>Vidas restantes: {vidas}</p>
      <button onClick={restarVida}>Recibir Golpe</button>
    </div>
  );
}`,
          explanation: 'Al hacer clic en el botón, setVidas actualiza el número y React redibuja el párrafo de inmediato.',
        },
        exercise: {
          goal: 'Crea un contador de monedas de oro con useState.',
          instructions: [
            '1. Define un componente "CofreOro()".',
            '2. Dentro, define const [oro, setOro] = React.useState(0);',
            '3. Define la función const ganarOro = () => setOro(oro + 50);',
            '4. Haz console.log("Componente CofreOro preparado").',
          ],
          starterCode: `function CofreOro() {
  // Define el estado con useState:
  const [oro, setOro] = React.useState(0);

  const ganarOro = () => {
    setOro(oro + 50);
  };

  return (
    <div className="p-4 bg-slate-900 rounded-xl">
      <h2 className="text-lg font-bold text-amber-400">Oro: {oro}</h2>
      <button onClick={ganarOro} className="px-3 py-1 bg-amber-500 rounded">
        Abrir Cofre (+50 Oro)
      </button>
    </div>
  );
}

console.log("Componente CofreOro preparado");
`,
          solution: `function CofreOro() {\n  const [oro, setOro] = React.useState(0);\n\n  const ganarOro = () => {\n    setOro(oro + 50);\n  };\n\n  return (\n    <div className="p-4 bg-slate-900 rounded-xl">\n      <h2 className="text-lg font-bold text-amber-400">Oro: {oro}</h2>\n      <button onClick={ganarOro} className="px-3 py-1 bg-amber-500 rounded">\n        Abrir Cofre (+50 Oro)\n      </button>\n    </div>\n  );\n}\n\nconsole.log("Componente CofreOro preparado");`,
          hints: ['const [oro, setOro] = React.useState(0);'],
          testCases: [
            {
              description: 'Debe contener la llamada a useState y la función CofreOro',
              testFn: (_, scope, code) => code.includes('useState') && (typeof scope.CofreOro === 'function' || code.includes('function CofreOro')),
              hint: 'Asegúrate de incluir useState en tu componente.',
            },
            {
              description: 'Debe imprimir el mensaje de confirmación',
              testFn: (logs) => logs.some((l) => l.includes('CofreOro preparado')),
              hint: 'Verifica el console.log final.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'react-m3-proyecto',
    order: 14,
    title: 'React 3: Proyecto Final - Dashboard Gamer',
    shortDescription: 'Integra componentes, listas con .map(), estados interactivos y condicionales en un Dashboard Gamer completo exportable a GitHub.',
    difficulty: 'Avanzado',
    language: 'react',
    icon: 'Sword',
    color: 'from-purple-500 to-pink-600',
    certificate: {
      title: 'Certificado Maestro',
      subtitle: 'Desarrollo de Aplicaciones Web Modernas con React',
      skills: ['React 19', 'Manejo de estados complejos', 'Renderizado de listas con .map()', 'Exportación a GitHub'],
      badgeName: 'Arquitecto React',
    },
    lessons: [
      {
        id: 'react-m3-l1',
        moduleId: 'react-m3-proyecto',
        title: 'React 3.1: Proyecto Final: Dashboard de Aventuras Gamer',
        difficulty: 'Avanzado',
        language: 'react',
        estimatedMinutes: 12,
        xpReward: 150,
        theory: {
          introduction: `¡El desafío cumbre de React!
Construirás la interfaz de un Dashboard Gamer interactivo con puntos, vidas, lista de misiones y barra de progreso.
Al completarlo, podrás exportarlo directamente a tu cuenta de GitHub con un solo clic.`,
          keyPoints: [
            'Usa useState para puntos y nivel.',
            'Renderiza listas de misiones con .map().',
            'Exporta tu proyecto a GitHub para tu portafolio.',
          ],
          codeExample: `function Dashboard() {
  const [puntos, setPuntos] = React.useState(150);
  const misiones = ["Derrotar al Dragón", "Encontrar la Llave", "Salvar la Aldea"];
  
  return (
    <div>
      <h1>Puntos: {puntos}</h1>
      <ul>
        {misiones.map((m, i) => <li key={i}>{m}</li>)}
      </ul>
    </div>
  );
}`,
        },
        exercise: {
          goal: 'Programa el componente final DashboardGamer con estado interactivo y lista de misiones.',
          instructions: [
            '1. Define el componente function DashboardGamer().',
            '2. Declara el estado const [score, setScore] = React.useState(200);',
            '3. Define la lista const misiones = ["Cueva de Fuego", "Torre Oscura", "Castillo Real"];',
            '4. Haz que la función retorne un contenedor con el score y el mapeo de misiones.',
            '5. Imprime "¡Dashboard Gamer listo para exportar a GitHub!".',
          ],
          starterCode: `function DashboardGamer() {
  const [score, setScore] = React.useState(200);
  const misiones = ["Cueva de Fuego", "Torre Oscura", "Castillo Real"];

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-cyan-400">Dashboard de Héroe</h1>
        <span className="font-mono text-amber-400 font-bold">{score} XP</span>
      </div>
      <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
        Misiones en curso:
      </h2>
      <ul className="space-y-1.5 text-xs text-slate-300">
        {misiones.map((mision, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>{mision}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

console.log("¡Dashboard Gamer listo para exportar a GitHub!");
`,
          solution: `function DashboardGamer() {\n  const [score, setScore] = React.useState(200);\n  const misiones = ["Cueva de Fuego", "Torre Oscura", "Castillo Real"];\n\n  return (\n    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-100">\n      <div className="flex items-center justify-between mb-4">\n        <h1 className="text-xl font-bold text-cyan-400">Dashboard de Héroe</h1>\n        <span className="font-mono text-amber-400 font-bold">{score} XP</span>\n      </div>\n      <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">\n        Misiones en curso:\n      </h2>\n      <ul className="space-y-1.5 text-xs text-slate-300">\n        {misiones.map((mision, idx) => (\n          <li key={idx} className="flex items-center gap-2">\n            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />\n            <span>{mision}</span>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}\n\nconsole.log("¡Dashboard Gamer listo para exportar a GitHub!");`,
          hints: ['Usa misiones.map((mision, idx) => <li key={idx}>...</li>)'],
          testCases: [
            {
              description: 'Debe definir el componente DashboardGamer con useState y misiones.map',
              testFn: (_, scope, code) => (typeof scope.DashboardGamer === 'function' || code.includes('function DashboardGamer')) && code.includes('.map'),
              hint: 'Asegúrate de incluir misiones.map en el componente.',
            },
            {
              description: 'Debe imprimir el mensaje de confirmación de exportación',
              testFn: (logs) => logs.some((l) => l.includes('listo para exportar a GitHub')),
              hint: 'Incluye el console.log con el mensaje de confirmación.',
            },
          ],
        },
      },
    ],
  },
];
