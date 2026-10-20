import JSZip from 'jszip';

export interface ProjectFile {
  name: string;
  content: string;
}

export interface ExportToGitHubOptions {
  token: string;
  repoName: string;
  description: string;
  isPrivate: boolean;
  language: 'javascript' | 'python' | 'react';
  files: ProjectFile[];
  authorName: string;
}

export interface GitHubExportResult {
  success: boolean;
  repoUrl?: string;
  cloneUrl?: string;
  error?: string;
  starsUrl?: string;
}

/**
 * Generates standard README.md, .gitignore and metadata for a GitHub repo
 */
export function generateRepositoryBundle(
  projectName: string,
  language: 'javascript' | 'python' | 'react',
  code: string,
  authorName: string = 'Alex Coder'
): ProjectFile[] {
  const safeName = projectName.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  const files: ProjectFile[] = [];

  const badgeUrl = 'https://img.shields.io/badge/Aprende-C%C3%B3digoJoven-06b6d4?style=for-the-badge&logo=codeforces';
  const langBadge =
    language === 'python'
      ? 'https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white'
      : language === 'react'
      ? 'https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black'
      : 'https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black';

  const readmeContent = `# ${projectName}

![CódigoJoven](${badgeUrl}) ![Tecnología](${langBadge})

> Proyecto creado y desarrollado por **${authorName}** en **[CódigoJoven](https://ais-dev-fbq43phdq6w3hvpw3imqy3-218711022750.us-west1.run.app)**, la plataforma interactiva de programación y retos gamificados para jóvenes desarrolladores.

---

## 🚀 Sobre este proyecto

Este repositorio contiene el código fuente completo del proyecto **${projectName}**, desarrollado con **${
    language === 'python' ? 'Python 3' : language === 'react' ? 'React y JavaScript Moderno' : 'JavaScript Moderno'
  }**.

### 💻 Cómo ejecutarlo localmente

${
  language === 'python'
    ? `\`\`\`bash
# 1. Clona el repositorio
git clone https://github.com/TU-USUARIO/${safeName}.git
cd ${safeName}

# 2. Ejecuta con Python 3
python main.py
# o en sistemas Unix/Mac:
python3 main.py
\`\`\``
    : language === 'react'
    ? `\`\`\`bash
# 1. Clona el repositorio
git clone https://github.com/TU-USUARIO/${safeName}.git
cd ${safeName}

# 2. Abre index.html en cualquier navegador moderno:
open index.html
# o si prefieres un servidor local:
npx serve .
\`\`\``
    : `\`\`\`bash
# 1. Clona el repositorio
git clone https://github.com/TU-USUARIO/${safeName}.git
cd ${safeName}

# 2. Ejecuta con Node.js o abre index.html en tu navegador
node index.js
# o ábrelo en el navegador
open index.html
\`\`\``
}

---

## 🎯 Aprendizajes Clave
- Lógica algorítmica y estructuras de control
- Buenas prácticas de código limpio y modularidad
- Control de versiones y publicación directa con Git & GitHub

## 📜 Licencia
Este proyecto es libre bajo la licencia [MIT](LICENSE).

---
*Hecho con dedicación en **CódigoJoven** — Aprende a Programar.*
`;

  files.push({ name: 'README.md', content: readmeContent });

  const licenseContent = `MIT License

Copyright (c) ${new Date().getFullYear()} ${authorName} & CódigoJoven

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
`;
  files.push({ name: 'LICENSE', content: licenseContent });

  if (language === 'python') {
    files.push({
      name: '.gitignore',
      content: `__pycache__/\n*.pyc\n*.pyo\n.env\nvenv/\n.venv/\n.DS_Store\n`,
    });
    files.push({
      name: 'requirements.txt',
      content: `# Dependencias de Python para ${projectName}\n# Este proyecto usa la librería estándar de Python 3\n`,
    });
    files.push({
      name: 'main.py',
      content: code,
    });
  } else if (language === 'react') {
    files.push({
      name: '.gitignore',
      content: `node_modules/\ndist/\nbuild/\n.env*\n.DS_Store\n*.log\n`,
    });
    files.push({
      name: 'index.html',
      content: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName} - CódigoJoven</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- React 19 & Babel Standalone para ejecución en navegador -->
  <script crossorigin src="https://unpkg.com/react@19/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@19/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen">
  <div id="root"></div>
  <script type="text/babel">
${code}

    const rootElement = document.getElementById('root');
    if (rootElement && typeof App !== 'undefined') {
      const root = ReactDOM.createRoot(rootElement);
      root.render(<App />);
    }
  </script>
</body>
</html>`,
    });
    files.push({
      name: 'App.jsx',
      content: code,
    });
    files.push({
      name: 'package.json',
      content: JSON.stringify(
        {
          name: safeName,
          version: '1.0.0',
          private: true,
          description: `Proyecto React creado en CódigoJoven por ${authorName}`,
          scripts: {
            start: 'npx serve .',
          },
          dependencies: {
            react: '^19.0.0',
            'react-dom': '^19.0.0',
          },
        },
        null,
        2
      ),
    });
  } else {
    // JavaScript
    files.push({
      name: '.gitignore',
      content: `node_modules/\n.DS_Store\n*.log\n.env\n`,
    });
    files.push({
      name: 'index.js',
      content: code,
    });
    files.push({
      name: 'index.html',
      content: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName} - CódigoJoven</title>
  <style>
    body {
      background-color: #030712;
      color: #f3f4f6;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      padding: 2rem;
      margin: 0;
    }
    #console {
      background-color: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 0.75rem;
      padding: 1rem;
      min-height: 200px;
      white-space: pre-wrap;
      line-height: 1.6;
    }
    .badge {
      display: inline-block;
      background: rgba(6, 182, 212, 0.1);
      border: 1px solid rgba(6, 182, 212, 0.3);
      color: #22d3ee;
      padding: 0.25rem 0.5rem;
      border-radius: 0.375rem;
      font-size: 0.75rem;
      margin-bottom: 1rem;
    }
  </style>
</head>
<body>
  <div class="badge">CódigoJoven • Proyecto JavaScript</div>
  <h1>${projectName}</h1>
  <p>Salida de consola en tiempo real:</p>
  <div id="console"></div>

  <script>
    const consoleBox = document.getElementById('console');
    const oldLog = console.log;
    console.log = function(...args) {
      oldLog.apply(console, args);
      const line = document.createElement('div');
      line.textContent = '> ' + args.join(' ');
      consoleBox.appendChild(line);
    };
  </script>
  <script src="index.js"></script>
</body>
</html>`,
    });
    files.push({
      name: 'package.json',
      content: JSON.stringify(
        {
          name: safeName,
          version: '1.0.0',
          type: 'module',
          description: `Proyecto JavaScript creado en CódigoJoven por ${authorName}`,
          main: 'index.js',
          scripts: {
            start: 'node index.js',
          },
        },
        null,
        2
      ),
    });
  }

  return files;
}

/**
 * Downloads all project files bundled inside a zip file
 */
export async function downloadProjectAsZip(
  projectName: string,
  files: ProjectFile[]
): Promise<void> {
  const zip = new JSZip();
  const folder = zip.folder(projectName) || zip;

  for (const file of files) {
    folder.file(file.name, file.content);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${projectName.toLowerCase().replace(/[^a-z0-9_-]/g, '-')}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Directly creates a GitHub repository and commits all project files using the official GitHub REST API
 */
export async function exportDirectlyToGitHub(
  options: ExportToGitHubOptions
): Promise<GitHubExportResult> {
  const { token, repoName, description, isPrivate, files } = options;
  const cleanToken = token.trim();

  if (!cleanToken) {
    return {
      success: false,
      error: 'Se requiere un Token de Acceso Personal (PAT) de GitHub con permiso "repo".',
    };
  }

  const cleanRepoName = repoName.trim().replace(/[^a-zA-Z0-9._-]/g, '-');
  if (!cleanRepoName) {
    return { success: false, error: 'Por favor indica un nombre válido para el repositorio.' };
  }

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${cleanToken}`,
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };

  try {
    // 1. Get authenticated user
    const userRes = await fetch('https://api.github.com/user', { headers });
    if (!userRes.ok) {
      if (userRes.status === 401) {
        return {
          success: false,
          error: 'Token inválido o expirado. Revisa tu token de GitHub en github.com/settings/tokens.',
        };
      }
      return {
        success: false,
        error: `Error al autenticar en GitHub: ${userRes.statusText} (${userRes.status})`,
      };
    }
    const userData = await userRes.json();
    const owner = userData.login;

    // 2. Check if repo already exists or create it
    const createRepoRes = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: cleanRepoName,
        description: description || `Proyecto creado en CódigoJoven por ${owner}`,
        private: isPrivate,
        auto_init: true, // initializes with an initial commit so branch main exists
      }),
    });

    let repoData;
    if (createRepoRes.ok) {
      repoData = await createRepoRes.json();
    } else {
      // If repo already exists (422), attempt to write into it
      const errJson = await createRepoRes.json().catch(() => ({}));
      if (
        createRepoRes.status === 422 &&
        errJson.errors &&
        errJson.errors.some((e: { message?: string }) => e.message?.includes('already exists'))
      ) {
        const getRepoRes = await fetch(`https://api.github.com/repos/${owner}/${cleanRepoName}`, {
          headers,
        });
        if (getRepoRes.ok) {
          repoData = await getRepoRes.json();
        } else {
          return {
            success: false,
            error: `El repositorio "${cleanRepoName}" ya existe en tu cuenta y no se pudo acceder. Elige otro nombre.`,
          };
        }
      } else {
        return {
          success: false,
          error: errJson.message || `No se pudo crear el repositorio en GitHub (${createRepoRes.status}).`,
        };
      }
    }

    // Give GitHub a moment to set up default branch if brand new
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 3. Commit/Push each file using GitHub Contents API
    for (const file of files) {
      const path = encodeURIComponent(file.name);
      // Check if file already exists to obtain SHA
      let sha: string | undefined;
      const getFileRes = await fetch(
        `https://api.github.com/repos/${owner}/${cleanRepoName}/contents/${path}`,
        { headers }
      );
      if (getFileRes.ok) {
        const fileData = await getFileRes.json();
        sha = fileData.sha;
      }

      // Base64 encode content handling UTF-8 characters cleanly
      const bytes = new TextEncoder().encode(file.content);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const base64Content = btoa(binary);

      const putRes = await fetch(
        `https://api.github.com/repos/${owner}/${cleanRepoName}/contents/${path}`,
        {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            message: `feat: Añadir ${file.name} desde CódigoJoven`,
            content: base64Content,
            sha,
          }),
        }
      );

      if (!putRes.ok) {
        const putErr = await putRes.json().catch(() => ({}));
        console.warn(`Error al subir ${file.name}:`, putErr);
      }
    }

    return {
      success: true,
      repoUrl: repoData.html_url,
      cloneUrl: repoData.clone_url,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      error: `Error de conexión con GitHub: ${msg}`,
    };
  }
}
