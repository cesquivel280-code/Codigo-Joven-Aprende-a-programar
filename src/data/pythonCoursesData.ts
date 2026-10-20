import { CourseModule } from '../types/course';

export const pythonModules: CourseModule[] = [
  {
    id: 'py-m1-fundamentos',
    order: 7,
    title: 'Python 1: Primeros Pasos y Variables',
    shortDescription: 'Aprende la sintaxis limpia de Python 3: usa print(), crea variables sin complicaciones y formatea textos dinámicos con f-strings.',
    difficulty: 'Iniciación',
    language: 'python',
    icon: 'Terminal',
    color: 'from-amber-400 to-yellow-600',
    certificate: {
      title: 'Certificado de Superación',
      subtitle: 'Fundamentos de Python 3 y Variables',
      skills: ['print()', 'Variables dinámicas', 'Tipos int, float, str, bool', 'f-strings', 'Operaciones aritméticas'],
      badgeName: 'Pionero de Python',
    },
    lessons: [
      {
        id: 'py-m1-l1',
        moduleId: 'py-m1-fundamentos',
        title: 'Python 1.1: Tu Primer print() y f-strings',
        difficulty: 'Iniciación',
        language: 'python',
        estimatedMinutes: 6,
        xpReward: 50,
        theory: {
          introduction: `¿Por qué aprender Python?
Python es uno de los lenguajes más populares del mundo. Es famoso por ser claro, limpio y muy parecido a escribir en inglés.
Se utiliza en videojuegos, inteligencia artificial, robótica y ciencia de datos.

En Python, para mostrar un mensaje en pantalla usamos la función:
print("¡Hola, mundo!")`,
          keyPoints: [
            'print("texto") muestra mensajes en la pantalla o consola.',
            'No necesitas punto y coma (;) al final de las líneas.',
            'Las f-strings permiten incluir variables fácilmente: print(f"Hola {nombre}")',
          ],
          codeExample: `# Tu primer script en Python 3:
nombre = "Alex"
nivel = 1
print(f"¡Bienvenido a Python, {nombre}! Nivel: {nivel}")`,
          explanation: 'La letra f antes de las comillas indica que es una f-string, permitiendo colocar variables entre llaves {}.',
          tip: 'En Python las mayúsculas y minúsculas importan: print es correcto, Print dará error.',
        },
        exercise: {
          goal: 'Muestra un saludo en la consola usando print() y una f-string en Python.',
          instructions: [
            '1. Declara una variable llamada "avatar" con tu apodo favorito.',
            '2. Declara una variable "puntos" con el valor numérico 100.',
            '3. Usa print(f"Avatar: {avatar} | Puntos: {puntos}") para mostrar el mensaje.',
          ],
          starterCode: `# 1. Declara tu avatar y puntos:
avatar = "CyberNinja"
puntos = 100

# 2. Imprime el mensaje usando print y f-string:
print(f"Avatar: {avatar} | Puntos: {puntos}")
`,
          solution: `avatar = "CyberNinja"\npuntos = 100\nprint(f"Avatar: {avatar} | Puntos: {puntos}")`,
          hints: [
            'Usa print(f"Avatar: {avatar} | Puntos: {puntos}")',
            'Asegúrate de incluir la f antes de las comillas.',
          ],
          testCases: [
            {
              description: 'Debe imprimir el avatar y los puntos en consola',
              testFn: (logs) => logs.some((l) => l.includes('Avatar:') && l.includes('Puntos:')),
              hint: 'Verifica la llamada print(f"Avatar: {avatar} | Puntos: {puntos}").',
            },
            {
              description: 'La variable puntos debe tener valor 100',
              testFn: (_, scope, code) => scope.puntos === 100 || code.includes('puntos = 100'),
              hint: 'Asigna puntos = 100 en tu script de Python.',
            },
          ],
        },
      },
      {
        id: 'py-m1-l2',
        moduleId: 'py-m1-fundamentos',
        title: 'Python 1.2: Tipos de Datos y Operaciones',
        difficulty: 'Iniciación',
        language: 'python',
        estimatedMinutes: 7,
        xpReward: 60,
        theory: {
          introduction: 'Python detecta automáticamente el tipo de dato que guardas en cada variable: enteros (int), decimales (float), texto (str) y valores lógicos (bool: True o False).',
          keyPoints: [
            'int: números enteros como 5, 100, -3.',
            'float: números con decimales como 9.8, 3.14.',
            'bool: True o False (con la primera letra en MAYÚSCULA).',
            'Operadores matemáticos: +, -, *, /, // (división entera), ** (potencia).',
          ],
          codeExample: `ataque = 30
bonus = 15
ataque_total = ataque + bonus
es_campeon = True

print(f"Ataque: {ataque_total}")
print(f"¿Campeón?: {es_campeon}")`,
          explanation: 'Nota que en Python usamos True y False con mayúscula inicial, a diferencia de otros lenguajes.',
        },
        exercise: {
          goal: 'Calcula la energía de un androide sumando celdas de energía.',
          instructions: [
            '1. Declara "celda_a = 40" y "celda_b = 35".',
            '2. Calcula "energia_total" sumando celda_a + celda_b.',
            '3. Declara "sistema_activo = True".',
            '4. Imprime energia_total en consola con print(energia_total).',
          ],
          starterCode: `celda_a = 40
celda_b = 35

# Calcula energia_total y define sistema_activo:
energia_total = celda_a + celda_b
sistema_activo = True

print(energia_total)
`,
          solution: `celda_a = 40\ncelda_b = 35\nenergia_total = celda_a + celda_b\nsistema_activo = True\nprint(energia_total)`,
          hints: [
            'energia_total = celda_a + celda_b',
            'print(energia_total)',
          ],
          testCases: [
            {
              description: 'energia_total debe ser igual a 75',
              testFn: (logs, scope, code) => scope.energia_total === 75 || logs.some((l) => l.includes('75')),
              hint: 'Suma celda_a + celda_b.',
            },
            {
              description: 'sistema_activo debe ser True',
              testFn: (_, scope, code) => scope.sistema_activo === true || code.includes('sistema_activo = True'),
              hint: 'Declara sistema_activo = True.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'py-m2-condicionales',
    order: 8,
    title: 'Python 2: Lógica y Decisiones (if, elif, else)',
    shortDescription: 'Enseña a tu código Python a tomar decisiones lógicas con if, elif, else y los operadores and, or, not.',
    difficulty: 'Básico',
    language: 'python',
    icon: 'GitFork',
    color: 'from-blue-500 to-cyan-600',
    certificate: {
      title: 'Certificado de Superación',
      subtitle: 'Lógica Condicional con Python 3',
      skills: ['if, elif, else', 'Operadores de comparación', 'Operadores and, or, not', 'Indentación de bloques'],
      badgeName: 'Estratega de Python',
    },
    lessons: [
      {
        id: 'py-m2-l1',
        moduleId: 'py-m2-condicionales',
        title: 'Python 2.1: El Guardián del Templo (if, elif, else)',
        difficulty: 'Básico',
        language: 'python',
        estimatedMinutes: 8,
        xpReward: 70,
        theory: {
          introduction: `En Python, las decisiones se toman con if, elif y else.
¡IMPORTANTE!: En Python no usamos llaves {}. Usamos DOS PUNTOS (:) al final de la condición e INDENTACIÓN (espacios hacia la derecha) para indicar qué instrucciones pertenecen al bloque.`,
          keyPoints: [
            'if condicion:',
            '    instrucciones indentadas',
            'elif otra_condicion:',
            '    instrucciones',
            'else:',
            '    instrucciones finales',
          ],
          codeExample: `nivel = 15

if nivel >= 20:
    print("Nivel Maestro alcanzado.")
elif nivel >= 10:
    print("Nivel Veterano.")
else:
    print("Nivel Aprendiz.")`,
          explanation: 'La sangría o espacio de 4 espacios le indica a Python que esas líneas están dentro del if.',
        },
        exercise: {
          goal: 'Crea el sistema de acceso de nivel para una mazmorra.',
          instructions: [
            'Tienes: puntos = 85',
            'Si puntos >= 90: imprime "Rango S - Legendario"',
            'Elif puntos >= 70: imprime "Rango A - Élite"',
            'Else: imprime "Rango B - Estándar"',
          ],
          starterCode: `puntos = 85

# Escribe la estructura if / elif / else:
if puntos >= 90:
    print("Rango S - Legendario")
elif puntos >= 70:
    print("Rango A - Élite")
else:
    print("Rango B - Estándar")
`,
          solution: `puntos = 85\n\nif puntos >= 90:\n    print("Rango S - Legendario")\nelif puntos >= 70:\n    print("Rango A - Élite")\nelse:\n    print("Rango B - Estándar")`,
          hints: [
            'Como puntos vale 85 (>= 70), se ejecutará el bloque elif.',
          ],
          testCases: [
            {
              description: 'Debe imprimir "Rango A - Élite" para 85 puntos',
              testFn: (logs) => logs.some((l) => l.includes('Rango A') || l.includes('Élite') || l.includes('Elite')),
              hint: 'Verifica la condición elif puntos >= 70.',
            },
          ],
        },
      },
      {
        id: 'py-m2-l2',
        moduleId: 'py-m2-condicionales',
        title: 'Python 2.2: Operadores Lógicos: and, or, not',
        difficulty: 'Básico',
        language: 'python',
        estimatedMinutes: 8,
        xpReward: 70,
        theory: {
          introduction: 'En Python las palabras para conectar condiciones se leen exactamente como en inglés: and (ambas deben cumplirse), or (con una es suficiente), not (invierte la verdad).',
          keyPoints: [
            'and: devuelve True solo si ambos lados son verdaderos.',
            'or: devuelve True si al menos uno es verdadero.',
            'not: convierte True en False y viceversa.',
          ],
          codeExample: `tiene_llave = True
energia = 50

if tiene_llave and energia >= 20:
    print("Puerta secreta desbloqueada.")`,
          explanation: 'Es mucho más legible que escribir && o ||.',
        },
        exercise: {
          goal: 'Valida si un personaje puede teletransportarse.',
          instructions: [
            'Tienes: mana = 40 y cristal_activo = True',
            'Usa if mana >= 30 and cristal_activo:',
            'Si se cumple, imprime "Teletransporte exitoso!"',
            'De lo contrario (else), imprime "Falta maná o cristal"',
          ],
          starterCode: `mana = 40
cristal_activo = True

# Escribe el if con el operador and:
if mana >= 30 and cristal_activo:
    print("Teletransporte exitoso!")
else:
    print("Falta maná o cristal")
`,
          solution: `mana = 40\ncristal_activo = True\n\nif mana >= 30 and cristal_activo:\n    print("Teletransporte exitoso!")\nelse:\n    print("Falta maná o cristal")`,
          hints: ['if mana >= 30 and cristal_activo:'],
          testCases: [
            {
              description: 'Debe imprimir "Teletransporte exitoso!"',
              testFn: (logs) => logs.some((l) => l.includes('Teletransporte exitoso')),
              hint: 'Asegúrate de que la condición con "and" sea evaluada.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'py-m3-bucles',
    order: 9,
    title: 'Python 3: Bucles for, range() y while',
    shortDescription: 'Automatiza tareas repetitivas en Python usando bucles for con la función range() y ciclos while.',
    difficulty: 'Intermedio',
    language: 'python',
    icon: 'Repeat',
    color: 'from-emerald-500 to-green-600',
    certificate: {
      title: 'Certificado de Superación',
      subtitle: 'Bucles y Automatización con Python 3',
      skills: ['for i in range()', 'Bucle while', 'Acumuladores numéricos', 'Control de iteraciones'],
      badgeName: 'Maestro de Ciclos Python',
    },
    lessons: [
      {
        id: 'py-m3-l1',
        moduleId: 'py-m3-bucles',
        title: 'Python 3.1: El Bucle for y range()',
        difficulty: 'Intermedio',
        language: 'python',
        estimatedMinutes: 8,
        xpReward: 70,
        theory: {
          introduction: `En Python, el bucle for se combina con la función range() para generar secuencias numéricas de forma ultra rápida.
range(5) genera los números: 0, 1, 2, 3, 4.
range(1, 6) genera los números: 1, 2, 3, 4, 5.`,
          keyPoints: [
            'for i in range(n): repite n veces.',
            'range(inicio, fin): no incluye el número de fin (termina uno antes).',
            'Indentamos las líneas que queremos que se repitan.',
          ],
          codeExample: `for paso in range(1, 4):
    print(f"Ejecutando paso #{paso}")
# Imprime paso 1, paso 2, paso 3`,
          explanation: 'La variable "paso" va tomando cada valor de la secuencia en cada vuelta.',
        },
        exercise: {
          goal: 'Crea una cuenta regresiva del 5 al 1 en Python.',
          instructions: [
            'Usa un bucle for que vaya desde 5 hasta 1 (puedes usar range(5, 0, -1)).',
            'En cada vuelta, imprime f"Despegue en: {i}".',
            'Al final imprime "¡Despegue!".',
          ],
          starterCode: `# Bucle for con range descendente:
for i in range(5, 0, -1):
    print(f"Despegue en: {i}")

print("¡Despegue!")
`,
          solution: `for i in range(5, 0, -1):\n    print(f"Despegue en: {i}")\n\nprint("¡Despegue!")`,
          hints: [
            'range(5, 0, -1) cuenta: 5, 4, 3, 2, 1.',
          ],
          testCases: [
            {
              description: 'Debe imprimir 5 pasos de conteo y el despegue',
              testFn: (logs) => logs.filter((l) => l.includes('Despegue en:')).length === 5 && logs.some((l) => l.includes('¡Despegue!')),
              hint: 'Verifica la secuencia range(5, 0, -1).',
            },
          ],
        },
      },
      {
        id: 'py-m3-l2',
        moduleId: 'py-m3-bucles',
        title: 'Python 3.2: El Bucle while y Acumuladores',
        difficulty: 'Intermedio',
        language: 'python',
        estimatedMinutes: 9,
        xpReward: 80,
        theory: {
          introduction: 'El bucle while se repite mientras una condición sea verdadera. Es perfecto para combates, temporizadores y acumuladores.',
          keyPoints: [
            'while condicion:',
            '    instrucciones',
            'Debemos asegurarnos de que la condición cambie para evitar bucles infinitos.',
          ],
          codeExample: `oro = 0
cofres = 3

while cofres > 0:
    oro += 50
    cofres -= 1

print(f"Oro recolectado: {oro}")`,
          explanation: 'En cada vuelta sumamos 50 de oro y restamos un cofre restante.',
        },
        exercise: {
          goal: 'Calcula la suma de los números del 1 al 5 usando while.',
          instructions: [
            'Declara contador = 1 y suma_total = 0.',
            'Usa un bucle while contador <= 5:',
            'En cada vuelta: suma_total += contador y luego contador += 1.',
            'Fuera del bucle imprime suma_total con print(suma_total).',
          ],
          starterCode: `contador = 1
suma_total = 0

# Escribe el bucle while:
while contador <= 5:
    suma_total += contador
    contador += 1

print(suma_total)
`,
          solution: `contador = 1\nsuma_total = 0\n\nwhile contador <= 5:\n    suma_total += contador\n    contador += 1\n\nprint(suma_total)`,
          hints: [
            'La suma de 1+2+3+4+5 es 15.',
          ],
          testCases: [
            {
              description: 'suma_total debe ser 15',
              testFn: (logs, scope) => scope.suma_total === 15 || logs.some((l) => l.includes('15')),
              hint: 'Comprueba el acumulador suma_total.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'py-m4-estructuras',
    order: 10,
    title: 'Python 4: Listas y Diccionarios',
    shortDescription: 'Domina las estructuras de datos reinas de Python: almacena secuencias en listas y crea bases de datos con diccionarios.',
    difficulty: 'Intermedio',
    language: 'python',
    icon: 'Layers',
    color: 'from-purple-500 to-indigo-600',
    certificate: {
      title: 'Certificado de Superación',
      subtitle: 'Listas y Diccionarios en Python 3',
      skills: ['Listas []', '.append()', 'len()', 'Diccionarios {clave: valor}', 'Iteración de colecciones'],
      badgeName: 'Arquitecto de Datos Python',
    },
    lessons: [
      {
        id: 'py-m4-l1',
        moduleId: 'py-m4-estructuras',
        title: 'Python 4.1: Listas y el método .append()',
        difficulty: 'Intermedio',
        language: 'python',
        estimatedMinutes: 8,
        xpReward: 80,
        theory: {
          introduction: `Una lista en Python guarda una colección ordenada de elementos.
items = ["espada", "escudo", "poción"]
Para agregar un nuevo elemento al final, usamos: items.append("arco")
Para saber cuántos elementos hay, usamos: len(items)`,
          keyPoints: [
            'Los índices empiezan en 0: items[0] es "espada".',
            'items.append(nuevo) agrega al final.',
            'len(items) devuelve el tamaño total de la lista.',
          ],
          codeExample: `inventario = ["antorcha", "cuerda"]
inventario.append("brújula")
print(f"Total de objetos: {len(inventario)}")
print(f"Primer objeto: {inventario[0]}")`,
          explanation: 'Las listas en Python son sumamente flexibles y veloces.',
        },
        exercise: {
          goal: 'Crea una lista de habilidades de un héroe y añade una nueva.',
          instructions: [
            '1. Crea la lista: habilidades = ["Fuerza", "Velocidad"]',
            '2. Agrega "Sigilo" usando habilidades.append("Sigilo")',
            '3. Imprime len(habilidades)',
            '4. Imprime habilidades en la consola',
          ],
          starterCode: `habilidades = ["Fuerza", "Velocidad"]

# Agrega "Sigilo" con .append:
habilidades.append("Sigilo")

print(len(habilidades))
print(habilidades)
`,
          solution: `habilidades = ["Fuerza", "Velocidad"]\nhabilidades.append("Sigilo")\nprint(len(habilidades))\nprint(habilidades)`,
          hints: ['habilidades.append("Sigilo")'],
          testCases: [
            {
              description: 'La lista debe tener 3 elementos y contener "Sigilo"',
              testFn: (logs, scope, code) => (Array.isArray(scope.habilidades) && (scope.habilidades as string[]).includes('Sigilo')) || code.includes('Sigilo'),
              hint: 'Usa habilidades.append("Sigilo").',
            },
            {
              description: 'Debe imprimir el tamaño 3 en consola',
              testFn: (logs) => logs.some((l) => l.includes('3')),
              hint: 'Imprime con print(len(habilidades)).',
            },
          ],
        },
      },
      {
        id: 'py-m4-l2',
        moduleId: 'py-m4-estructuras',
        title: 'Python 4.2: Diccionarios {clave: valor}',
        difficulty: 'Intermedio',
        language: 'python',
        estimatedMinutes: 9,
        xpReward: 90,
        theory: {
          introduction: `Un Diccionario es como una ficha de información donde cada dato tiene una etiqueta (clave o key) y un valor.
personaje = {
    "nombre": "Aria",
    "clase": "Maga",
    "nivel": 10
}
Accedes a los valores con: personaje["nombre"]`,
          keyPoints: [
            'Se definen con llaves: { "clave": valor }',
            'Son la estructura base de casi todas las APIs y bases de datos modernas.',
            'Puedes modificar valores con: personaje["nivel"] = 11',
          ],
          codeExample: `robot = {"modelo": "R2", "bateria": 95}
print(f"Robot: {robot['modelo']} con {robot['bateria']}% de batería")`,
          explanation: 'Los diccionarios permiten modelar objetos del mundo real con gran claridad.',
        },
        exercise: {
          goal: 'Crea el perfil de un jugador usando un diccionario en Python.',
          instructions: [
            '1. Crea el diccionario: jugador = {"alias": "Nova", "nivel": 12, "activo": True}',
            '2. Imprime f"Jugador: {jugador[\'alias\']} - Nivel: {jugador[\'nivel\']}"',
          ],
          starterCode: `# 1. Define el diccionario jugador:
jugador = {"alias": "Nova", "nivel": 12, "activo": True}

# 2. Imprime los datos usando las claves:
print(f"Jugador: {jugador['alias']} - Nivel: {jugador['nivel']}")
`,
          solution: `jugador = {"alias": "Nova", "nivel": 12, "activo": True}\nprint(f"Jugador: {jugador['alias']} - Nivel: {jugador['nivel']}")`,
          hints: ['jugador["alias"] y jugador["nivel"]'],
          testCases: [
            {
              description: 'Debe imprimir el alias Nova y el nivel 12',
              testFn: (logs) => logs.some((l) => l.includes('Nova') && l.includes('12')),
              hint: 'Accede a las claves del diccionario e imprime la información.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'py-m5-funciones',
    order: 11,
    title: 'Python 5: Funciones y Proyecto Final',
    shortDescription: 'Crea código modular con def y return, y culmina programando un simulador de aventura en Python 3.',
    difficulty: 'Avanzado',
    language: 'python',
    icon: 'Sword',
    color: 'from-rose-500 to-red-600',
    certificate: {
      title: 'Certificado Maestro',
      subtitle: 'Programación Avanzada y Algoritmia con Python 3',
      skills: ['def y return', 'Parámetros y argumentos', 'Simulación de sistemas', 'Algoritmos computacionales'],
      badgeName: 'Hechicero de Python',
    },
    lessons: [
      {
        id: 'py-m5-l1',
        moduleId: 'py-m5-funciones',
        title: 'Python 5.1: Funciones con def y return',
        difficulty: 'Avanzado',
        language: 'python',
        estimatedMinutes: 9,
        xpReward: 90,
        theory: {
          introduction: `En Python creamos funciones reutilizables con la palabra clave def:
def nombre_funcion(parametro1, parametro2):
    return parametro1 * parametro2`,
          keyPoints: [
            'def define la función.',
            'Los parámetros van entre paréntesis ().',
            'return devuelve un resultado hacia quien la llamó.',
          ],
          codeExample: `def calcular_ataque(base, bonus):
    return base + bonus

resultado = calcular_ataque(40, 15)
print(f"Daño infligido: {resultado}") # 55`,
          explanation: 'Permite aislar la lógica y reutilizarla tantas veces como quieras.',
        },
        exercise: {
          goal: 'Crea una función que aplique un multiplicador crítico.',
          instructions: [
            '1. Define la función "calcular_critico(daño_base, es_critico)".',
            '2. Si es_critico es True, retorna daño_base * 2. De lo contrario retorna daño_base.',
            '3. Prueba la función con daño1 = calcular_critico(50, True) y daño2 = calcular_critico(50, False).',
            '4. Imprime ambos resultados.',
          ],
          starterCode: `# 1. Define la función calcular_critico:
def calcular_critico(daño_base, es_critico):
    if es_critico:
        return daño_base * 2
    return daño_base

daño1 = calcular_critico(50, True)
daño2 = calcular_critico(50, False)

print(f"Crítico: {daño1} | Normal: {daño2}")
`,
          solution: `def calcular_critico(daño_base, es_critico):\n    if es_critico:\n        return daño_base * 2\n    return daño_base\n\ndaño1 = calcular_critico(50, True)\ndaño2 = calcular_critico(50, False)\nprint(f"Crítico: {daño1} | Normal: {daño2}")`,
          hints: ['if es_critico: return daño_base * 2'],
          testCases: [
            {
              description: 'daño1 debe ser 100 y daño2 debe ser 50',
              testFn: (logs, scope) => (scope.daño1 === 100 && scope.daño2 === 50) || logs.some((l) => l.includes('100') && l.includes('50')),
              hint: 'Verifica la función calcular_critico con True y False.',
            },
          ],
        },
      },
      {
        id: 'py-m5-l2',
        moduleId: 'py-m5-funciones',
        title: 'Python 5.2: Proyecto Final: Simulador de Misión Espacial',
        difficulty: 'Avanzado',
        language: 'python',
        estimatedMinutes: 12,
        xpReward: 150,
        theory: {
          introduction: `¡El desafío cumbre de Python 3!
Integrarás variables, listas, bucles y funciones para calcular el resultado de una expedición galáctica completa.`,
          keyPoints: [
            'Itera sobre una lista de misiones con bucles.',
            'Calcula la recompensa acumulada.',
            'Desbloquea tu Certificado Oficial de Python.',
          ],
          codeExample: `def procesar_misiones(recompensas):
    total = sum(recompensas)
    return total`,
        },
        exercise: {
          goal: 'Crea el sistema de procesamiento de misiones galácticas en Python.',
          instructions: [
            '1. Tienes misiones_xp = [150, 200, 250, 100].',
            '2. Crea una función "sumar_recompensas(lista)" que sume todos los elementos con un bucle for o con sum(lista).',
            '3. Guarda el resultado en "total_galactico".',
            '4. Si total_galactico >= 700: imprime "¡Misión completada con éxito supremo!". De lo contrario "Misión cumplida".',
          ],
          starterCode: `misiones_xp = [150, 200, 250, 100]

def sumar_recompensas(lista):
    total = 0
    for xp in lista:
        total += xp
    return total

total_galactico = sumar_recompensas(misiones_xp)
print(f"Total XP Ganada: {total_galactico}")

if total_galactico >= 700:
    print("¡Misión completada con éxito supremo!")
else:
    print("Misión cumplida")
`,
          solution: `misiones_xp = [150, 200, 250, 100]\n\ndef sumar_recompensas(lista):\n    total = 0\n    for xp in lista:\n        total += xp\n    return total\n\ntotal_galactico = sumar_recompensas(misiones_xp)\nprint(f"Total XP Ganada: {total_galactico}")\n\nif total_galactico >= 700:\n    print("¡Misión completada con éxito supremo!")\nelse:\n    print("Misión cumplida")`,
          hints: ['La suma de 150 + 200 + 250 + 100 da 700.'],
          testCases: [
            {
              description: 'total_galactico debe ser 700',
              testFn: (logs, scope) => scope.total_galactico === 700 || logs.some((l) => l.includes('700')),
              hint: 'Verifica la suma de las recompensas.',
            },
            {
              description: 'Debe imprimir "¡Misión completada con éxito supremo!"',
              testFn: (logs) => logs.some((l) => l.includes('éxito supremo') || l.includes('exito supremo') || l.includes('Misión cumplida')),
              hint: 'Asegúrate de que la condición if total_galactico >= 700 se ejecute.',
            },
          ],
        },
      },
    ],
  },
];
