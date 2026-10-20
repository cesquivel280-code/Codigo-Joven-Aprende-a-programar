export interface PlaygroundSnippet {
  id: string;
  title: string;
  description: string;
  language: 'javascript' | 'python' | 'react';
  tags: string[];
  code: string;
}

export const playgroundSnippets: PlaygroundSnippet[] = [
  // --- JAVASCRIPT SNIPPETS ---
  {
    id: 'rpg-battle',
    title: 'Simulador de Batalla RPG',
    description: 'Enfrentamiento en tiempo real por turnos entre un Héroe y un Dragón usando números aleatorios.',
    language: 'javascript',
    tags: ['JavaScript', 'Bucles', 'Condicionales', 'Math.random'],
    code: `// --- SIMULADOR DE BATALLA RPG ---
let heroe = { nombre: "Aria la Valiente", hp: 120, ataqueMax: 30 };
let dragon = { nombre: "Ignis el Rojo", hp: 140, ataqueMax: 25 };

console.log(\`⚔️ ¡Comienza el combate: \${heroe.nombre} VS \${dragon.nombre}!\`);
console.log("--------------------------------------------------");

let turno = 1;
while (heroe.hp > 0 && dragon.hp > 0) {
  // Turno del héroe
  let dañoHeroe = Math.floor(Math.random() * heroe.ataqueMax) + 10;
  let esCritico = Math.random() > 0.7;
  if (esCritico) {
    dañoHeroe *= 2;
    console.log(\`⚡ ¡GOLPE CRÍTICO de \${heroe.nombre}! Infringe \${dañoHeroe} de daño.\`);
  } else {
    console.log(\`🗡️ \${heroe.nombre} ataca causando \${dañoHeroe} de daño.\`);
  }
  dragon.hp = Math.max(0, dragon.hp - dañoHeroe);

  // Turno del dragón si sigue vivo
  if (dragon.hp > 0) {
    let dañoDragon = Math.floor(Math.random() * dragon.ataqueMax) + 8;
    heroe.hp = Math.max(0, heroe.hp - dañoDragon);
    console.log(\`🔥 \${dragon.nombre} escupe fuego causando \${dañoDragon} de daño.\`);
  }

  console.log(\`[Turno \${turno}] \${heroe.nombre}: \${heroe.hp} HP | \${dragon.nombre}: \${dragon.hp} HP\`);
  console.log("--------------------------------------------------");
  turno++;
}

if (heroe.hp > 0) {
  console.log(\`🏆 ¡VICTORIA! \${heroe.nombre} ha derrotado al dragón y reclamado el tesoro legendario.\`);
} else {
  console.log(\`💀 DERROTA: \${dragon.nombre} ha defendido su guarida.\`);
}
`,
  },
  {
    id: 'minigame-puzzle-2d',
    title: 'Minijuego 2D: Laberinto y Puzzle',
    description: 'Minijuego interactivo de puzzle 2D en consola donde un explorador descifra acertijos, recoge llaves y supera el laberinto.',
    language: 'javascript',
    tags: ['JavaScript', 'Puzzles', 'Juegos 2D', 'Acertijos'],
    code: `// --- MINIJUEGO 2D: LABERINTO, PUZZLE Y ACERTIJOS ---
const mapaLaberinto = [
  ["⬛", "⬛", "⬛", "⬛", "⬛", "⬛", "⬛"],
  ["⬛", "🧙", "⬜", "🔑", "⬜", "❓", "⬛"],
  ["⬛", "⬜", "⬛", "⬛", "⬜", "⬜", "⬛"],
  ["⬛", "⬜", "⬜", "🚪", "⬜", "🏆", "⬛"],
  ["⬛", "⬛", "⬛", "⬛", "⬛", "⬛", "⬛"]
];

console.log("🎮 ¡Bienvenido a la Aventura Interactiva!");
console.log("Objetivo: Recoger la llave 🔑, responder el acertijo ❓ y abrir la puerta 🚪 hacia el trofeo 🏆.\\n");

console.log("--- MAPA DEL JUEGO 2D ---");
for (let fila of mapaLaberinto) {
  console.log(fila.join(" "));
}

let puntos = 50;
let vidas = 3;
let tieneLlave = true;
let acertijoResuelto = false;

console.log("\\n🏃 El jugador se mueve hacia la casilla 🔑...");
console.log("✨ ¡Has recogido la Llave Dorada! (+25 puntos)");
puntos += 25;

console.log("\\n🧩 Llegaste a la casilla de Acertijo ❓...");
const pregunta = "¿Cuál es el comando estándar para imprimir en consola en JavaScript?";
const respuestaJugador = "console.log()";

console.log("Pregunta:", pregunta);
console.log("Respuesta:", respuestaJugador);

if (respuestaJugador === "console.log()") {
  console.log("✅ ¡Acertijo resuelto correctamente! (+50 puntos)");
  puntos += 50;
  acertijoResuelto = true;
} else {
  vidas -= 1;
  console.log("❌ Incorrecto. Vidas restantes:", vidas);
}

console.log("\\n🚪 Llegando a la Puerta Mágica...");
if (tieneLlave && acertijoResuelto) {
  console.log("🔓 ¡La puerta se desbloquea! Llegaste al trofeo 🏆.");
  console.log(\`🎉 ¡VICTORIA! Puntuación: \${puntos} pts | Vidas: \${vidas}/3\`);
  console.log("🚀 ¡Así de fácil se crean minijuegos y puzzles con JavaScript!");
}
`,
  },
  {
    id: 'number-guesser',
    title: 'Adivina el Número (Búsqueda Binaria)',
    description: 'Algoritmo de búsqueda binaria que adivina un número secreto en un rango entre 1 y 100.',
    language: 'javascript',
    tags: ['JavaScript', 'Algoritmos', 'Lógica', 'Búsqueda'],
    code: `// --- ADIVINADOR INTELIGENTE (BÚSQUEDA BINARIA) ---
const numeroSecreto = 73; // Cambia este número entre 1 y 100
let min = 1;
let max = 100;
let intentos = 0;
let encontrado = false;

console.log(\`🎯 Número secreto a encontrar: \${numeroSecreto}\`);

while (!encontrado && min <= max) {
  intentos++;
  let intentoIA = Math.floor((min + max) / 2);
  console.log(\`Intento #\${intentos}: La IA prueba con \${intentoIA}...\`);

  if (intentoIA === numeroSecreto) {
    console.log(\`🎉 ¡Encontrado! El número era \${intentoIA} en solo \${intentos} pasos.\`);
    encontrado = true;
  } else if (intentoIA < numeroSecreto) {
    console.log(\`   ⬆️ Demasiado bajo. El número es mayor.\`);
    min = intentoIA + 1;
  } else {
    console.log(\`   ⬇️ Demasiado alto. El número es menor.\`);
    max = intentoIA - 1;
  }
}
`,
  },

  // --- PYTHON SNIPPETS ---
  {
    id: 'py-bot-aventura',
    title: 'Python: Bot de Misiones y Recompensas',
    description: 'Sistema completo en Python 3 con diccionarios, bucles for, cálculo de bonificaciones y funciones modulares.',
    language: 'python',
    tags: ['Python 3', 'Diccionarios', 'Funciones', 'Listas'],
    code: `# --- BOT DE MISIONES Y AVENTURAS EN PYTHON 3 ---

jugador = {
    "nombre": "Kaelen",
    "nivel": 5,
    "xp": 350,
    "oro": 120,
    "inventario": ["Poción de Vida", "Daga de Acero", "Cristal de Fuego"]
}

misiones_disponibles = [
    {"titulo": "Cueva de Goblins", "dificultad": "Fácil", "xp": 100, "oro": 50},
    {"titulo": "Torre del Nigromante", "dificultad": "Media", "xp": 250, "oro": 120},
    {"titulo": "Guarida del Dragón", "dificultad": "Épica", "xp": 500, "oro": 300}
]

def mostrar_perfil(p):
    print("========================================")
    print(f"🧙 PERFIL DEL JUGADOR: {p['nombre']}")
    print(f"⭐ Nivel: {p['nivel']} | XP: {p['xp']} | 🪙 Oro: {p['oro']}")
    print(f"🎒 Inventario ({len(p['inventario'])} objetos): {', '.join(p['inventario'])}")
    print("========================================\\n")

mostrar_perfil(jugador)

print("📜 Procesando misiones completadas:")
total_xp_ganada = 0
total_oro_ganado = 0

for m in misiones_disponibles:
    bonus = 1.2 if m["dificultad"] == "Épica" else 1.0
    xp_final = int(m["xp"] * bonus)
    total_xp_ganada += xp_final
    total_oro_ganado += m["oro"]
    print(f"  ✅ Misión '{m['titulo']}' [{m['dificultad']}] completada! (+{xp_final} XP, +{m['oro']} Oro)")

jugador["xp"] += total_xp_ganada
jugador["oro"] += total_oro_ganado

# Subida de nivel automática
if jugador["xp"] >= 1000:
    jugador["nivel"] += 2
    print("\\n🎉 ¡SUBIDA DE DOBLE NIVEL! ¡Has alcanzado el Nivel 7!")
elif jugador["xp"] >= 500:
    jugador["nivel"] += 1
    print("\\n🎉 ¡SUBIDA DE NIVEL! ¡Has alcanzado el Nivel 6!")

mostrar_perfil(jugador)
print("🚀 ¡Proyecto Python listo para exportar a GitHub!")
`,
  },
  {
    id: 'py-cifrado-cesar',
    title: 'Python: Cifrado Criptográfico César',
    description: 'Algoritmo de encriptación y desencriptación de mensajes secretos mediante desplazamiento de caracteres.',
    language: 'python',
    tags: ['Python 3', 'Criptografía', 'Algoritmos', 'Strings'],
    code: `# --- CIFRADO CÉSAR EN PYTHON 3 ---

def cifrar_mensaje(mensaje, desplazamiento):
    alfabeto = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    resultado = ""
    for char in mensaje:
        if char in alfabeto:
            indice_actual = alfabeto.index(char)
            nuevo_indice = (indice_actual + desplazamiento) % len(alfabeto)
            resultado += alfabeto[nuevo_indice]
        else:
            resultado += char
    return resultado

def descifrar_mensaje(mensaje_cifrado, desplazamiento):
    return cifrar_mensaje(mensaje_cifrado, -desplazamiento)

mensaje_original = "CodigoJoven: La mejor plataforma para aprender programacion!"
clave = 5

cifrado = cifrar_mensaje(mensaje_original, clave)
recuperado = descifrar_mensaje(cifrado, clave)

print(f"🔒 Mensaje Original : {mensaje_original}")
print(f"🛡️ Mensaje Cifrado  : {cifrado}")
print(f"🔓 Descifrado       : {recuperado}")

if mensaje_original == recuperado:
    print("\\n✅ ¡Criptografía verificada con éxito 100%!")
`,
  },

  // --- REACT SNIPPETS ---
  {
    id: 'react-gamer-card',
    title: 'React: Tarjeta Gamer Interactiva con useState',
    description: 'Componente React 19 completo con estado interactivo, contador de score, barra de salud animada y badges.',
    language: 'react',
    tags: ['React 19', 'useState', 'JSX', 'Tailwind'],
    code: `// --- COMPONENTE REACT: TARJETA GAMER INTERACTIVA ---
function App() {
  const [salud, setSalud] = React.useState(100);
  const [puntos, setPuntos] = React.useState(250);
  const [escudoActivo, setEscudoActivo] = React.useState(false);

  const recibirDanio = () => {
    if (escudoActivo) {
      setEscudoActivo(false);
      console.log("🛡️ ¡El escudo absorbió el impacto!");
    } else {
      setSalud((prev) => Math.max(0, prev - 20));
      console.log("💥 ¡Daño recibido! -20 HP");
    }
  };

  const curar = () => {
    setSalud((prev) => Math.min(100, prev + 25));
    setPuntos((prev) => prev + 15);
    console.log("🧪 ¡Poción utilizada! +25 HP, +15 XP");
  };

  const activarEscudo = () => {
    setEscudoActivo(true);
    console.log("✨ ¡Escudo de energía activado!");
  };

  console.log(\`[Estado React] Salud: \${salud}% | Score: \${puntos} XP | Escudo: \${escudoActivo}\`);

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-xl text-slate-100 font-sans">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Avatar Gamer</span>
          <h2 className="text-xl font-bold text-white">Valkyria Cyber</h2>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold">
          {puntos} XP
        </span>
      </div>

      {/* Barra de Salud */}
      <div className="space-y-1 mb-5">
        <div className="flex justify-between text-xs font-mono">
          <span>Salud (HP)</span>
          <span className={salud > 30 ? "text-emerald-400" : "text-rose-400 font-bold"}>{salud}%</span>
        </div>
        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
          <div
            className={\`h-full transition-all duration-300 \${
              salud > 50 ? "bg-emerald-500" : salud > 20 ? "bg-amber-500" : "bg-rose-500"
            }\`}
            style={{ width: \`\${salud}%\` }}
          />
        </div>
      </div>

      {/* Controles Interactivos */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={recibirDanio}
          className="px-3 py-2 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-700/60 text-rose-200 text-xs font-semibold transition-colors"
        >
          Recibir Daño
        </button>
        <button
          onClick={curar}
          className="px-3 py-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-200 text-xs font-semibold transition-colors"
        >
          Curar (+25)
        </button>
        <button
          onClick={activarEscudo}
          className="px-3 py-2 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-700/60 text-cyan-200 text-xs font-semibold transition-colors"
        >
          {escudoActivo ? "Escudo ON" : "Activar Escudo"}
        </button>
      </div>
    </div>
  );
}

// Ejecución inicial:
console.log("⚛️ Componente React interactivo compilado. ¡Listo para exportar a GitHub!");
`,
  },
];
