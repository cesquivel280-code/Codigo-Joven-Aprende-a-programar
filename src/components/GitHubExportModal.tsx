import React, { useState, useEffect } from 'react';
import {
  X,
  Github,
  Download,
  Terminal,
  Check,
  Copy,
  ExternalLink,
  Lock,
  Globe,
  Sparkles,
  FileCode,
  ShieldAlert,
  Loader2,
  FolderArchive,
  ArrowRight,
} from 'lucide-react';
import {
  generateRepositoryBundle,
  downloadProjectAsZip,
  exportDirectlyToGitHub,
  ProjectFile,
} from '../utils/githubExporter';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface GitHubExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  language: 'javascript' | 'python' | 'react';
  code: string;
  authorName?: string;
}

const GITHUB_TOKEN_STORAGE_KEY = 'codigojoven_github_token_cache';

export const GitHubExportModal: React.FC<GitHubExportModalProps> = ({
  isOpen,
  onClose,
  projectName,
  language,
  code,
  authorName = 'Alex Coder',
}) => {
  const [activeTab, setActiveTab] = useState<'direct' | 'download' | 'terminal'>('direct');
  const [token, setToken] = useState<string>('');
  const [saveToken, setSaveToken] = useState<boolean>(true);
  const [repoName, setRepoName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportResult, setExportResult] = useState<{
    success: boolean;
    repoUrl?: string;
    error?: string;
  } | null>(null);
  const [copiedClone, setCopiedClone] = useState<boolean>(false);
  const [copiedTerminal, setCopiedTerminal] = useState<boolean>(false);
  const [files, setFiles] = useState<ProjectFile[]>([]);

  // Load saved token if present and prepare bundle files
  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem(GITHUB_TOKEN_STORAGE_KEY) || '';
      if (saved) setToken(saved);

      const cleanName = (projectName || 'mi-proyecto')
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '-');
      setRepoName(cleanName);
      setDescription(`Proyecto ${projectName} creado y desarrollado en CódigoJoven con ${language}`);
      setExportResult(null);

      const bundle = generateRepositoryBundle(projectName, language, code, authorName);
      setFiles(bundle);
    }
  }, [isOpen, projectName, language, code, authorName]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isExporting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isExporting, onClose]);

  if (!isOpen) return null;

  const handleDirectExport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      setExportResult({
        success: false,
        error: 'Por favor ingresa tu GitHub Personal Access Token.',
      });
      return;
    }

    if (saveToken) {
      localStorage.setItem(GITHUB_TOKEN_STORAGE_KEY, token.trim());
    } else {
      localStorage.removeItem(GITHUB_TOKEN_STORAGE_KEY);
    }

    setIsExporting(true);
    setExportResult(null);
    sounds.playRun();

    const res = await exportDirectlyToGitHub({
      token: token.trim(),
      repoName,
      description,
      isPrivate,
      language,
      files,
      authorName,
    });

    setIsExporting(false);
    if (res.success) {
      sounds.playFanfare();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
      setExportResult({
        success: true,
        repoUrl: res.repoUrl,
      });
    } else {
      sounds.playError();
      setExportResult({
        success: false,
        error: res.error,
      });
    }
  };

  const handleDownloadZip = async () => {
    sounds.playClick();
    await downloadProjectAsZip(repoName || projectName, files);
  };

  const terminalCommands = `# 1. Inicializa el repositorio local
git init

# 2. Agrega todos los archivos del proyecto
git add .

# 3. Haz tu primer commit oficial
git commit -m "feat: Primer commit de ${projectName} desde CódigoJoven"

# 4. Asigna la rama principal
git branch -M main

# 5. Vincula tu repositorio de GitHub y sube tu código
git remote add origin https://github.com/TU-USUARIO/${repoName || 'mi-proyecto'}.git
git push -u origin main`;

  const handleCopyTerminal = () => {
    navigator.clipboard.writeText(terminalCommands);
    setCopiedTerminal(true);
    setTimeout(() => setCopiedTerminal(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto"
      onClick={() => {
        if (!isExporting) onClose();
      }}
    >
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 border border-slate-700 flex items-center justify-center text-white shrink-0 shadow-md">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  Publicación Profesional
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-[11px] text-slate-400">Git & GitHub</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Exportar Proyecto a GitHub
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isExporting}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 p-2 gap-1 overflow-x-auto shrink-0">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('direct');
            }}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'direct'
                ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Exportar Directamente a GitHub</span>
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('download');
            }}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'download'
                ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Descargar Repositorio (.ZIP)</span>
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('terminal');
            }}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'terminal'
                ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>Comandos de Terminal Git</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto text-xs sm:text-sm text-slate-200 leading-relaxed">
          {/* File Bundle Summary Pill */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <FolderArchive className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="font-semibold text-white">Archivos del repositorio listos ({files.length}):</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {files.map((f) => (
                    <span
                      key={f.name}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-1"
                    >
                      <FileCode className="w-3 h-3 text-slate-400" />
                      <span>{f.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-[11px] text-cyan-400 font-mono shrink-0">
              {language.toUpperCase()}
            </div>
          </div>

          {/* TAB 1: DIRECT GITHUB API EXPORT */}
          {activeTab === 'direct' && (
            <div className="space-y-4">
              {exportResult?.success ? (
                /* Success celebration panel */
                <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/50 space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      ¡Repositorio Creado Exitosamente en GitHub!
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                      Tu proyecto se ha subido a tu cuenta con su README.md, licencia y todos los archivos listos para compartir o continuar desarrollando.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    {exportResult.repoUrl && (
                      <a
                        href={exportResult.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
                      >
                        <span>Abrir Repositorio en GitHub</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setExportResult(null)}
                      className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                    >
                      Exportar Otro Repositorio
                    </button>
                  </div>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleDirectExport} className="space-y-4">
                  {exportResult?.error && (
                    <div className="p-3.5 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-start gap-2.5">
                      <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">{exportResult.error}</div>
                    </div>
                  )}

                  {/* Token Field */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-cyan-400" />
                        <span>GitHub Personal Access Token (PAT):</span>
                      </label>
                      <a
                        href="https://github.com/settings/tokens/new?scopes=repo&description=CodigoJoven%20App"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <span>Generar token en GitHub (permiso "repo")</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <input
                      type="password"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-xs outline-none focus:border-cyan-500 transition-colors"
                      required
                    />
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={saveToken}
                          onChange={(e) => setSaveToken(e.target.checked)}
                          className="rounded border-slate-700 text-cyan-500 focus:ring-0 bg-slate-950"
                        />
                        <span>Recordar token en este navegador</span>
                      </label>
                      <span className="text-slate-500">Nunca se almacena en servidores externos</span>
                    </div>
                  </div>

                  {/* Repository Name & Visibility */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-semibold text-white">
                        Nombre del Repositorio:
                      </label>
                      <input
                        type="text"
                        value={repoName}
                        onChange={(e) => setRepoName(e.target.value)}
                        placeholder="codigo-joven-mi-proyecto"
                        className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-xs outline-none focus:border-cyan-500 transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-white">Visibilidad:</label>
                      <div className="flex rounded-lg border border-slate-700 bg-slate-950 p-1">
                        <button
                          type="button"
                          onClick={() => setIsPrivate(false)}
                          className={`flex-1 py-1.5 text-xs font-semibold rounded flex items-center justify-center gap-1 transition-colors ${
                            !isPrivate
                              ? 'bg-slate-800 text-cyan-300 shadow-sm'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <Globe className="w-3 h-3" />
                          <span>Público</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsPrivate(true)}
                          className={`flex-1 py-1.5 text-xs font-semibold rounded flex items-center justify-center gap-1 transition-colors ${
                            isPrivate
                              ? 'bg-slate-800 text-cyan-300 shadow-sm'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <Lock className="w-3 h-3" />
                          <span>Privado</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-white">
                      Descripción del Repositorio:
                    </label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Descripción breve..."
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-300 text-xs outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  {/* Action button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isExporting}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50 active:scale-[0.99]"
                    >
                      {isExporting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Creando repositorio y subiendo archivos a GitHub...</span>
                        </>
                      ) : (
                        <>
                          <Github className="w-4 h-4" />
                          <span>Crear y Subir Proyecto a GitHub</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: DOWNLOAD AS ZIP */}
          {activeTab === 'download' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Paquete Completo de Repositorio Listo para Usar</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Descarga un archivo <strong>.zip</strong> que contiene toda la estructura de un repositorio profesional de GitHub: código fuente, archivo <code>README.md</code> con instrucciones de ejecución, archivo <code>.gitignore</code>, licencia MIT y configuración lista para ejecutar.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 font-mono text-xs text-slate-300">
                <div className="text-[11px] font-sans font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Estructura generada dentro del ZIP:
                </div>
                <div className="pl-2 border-l-2 border-slate-700 space-y-1">
                  <div>📁 {repoName || projectName}/</div>
                  <div className="pl-4 text-slate-400">📄 README.md (Documentación formateada con badges)</div>
                  <div className="pl-4 text-slate-400">📄 LICENSE (Licencia MIT)</div>
                  <div className="pl-4 text-slate-400">📄 .gitignore</div>
                  {language === 'python' ? (
                    <>
                      <div className="pl-4 text-cyan-300">🐍 main.py (Tu código de Python)</div>
                      <div className="pl-4 text-slate-400">📄 requirements.txt</div>
                    </>
                  ) : language === 'react' ? (
                    <>
                      <div className="pl-4 text-cyan-300">⚛️ App.jsx (Tu componente React)</div>
                      <div className="pl-4 text-cyan-300">🌐 index.html (Página web lista con CDN)</div>
                      <div className="pl-4 text-slate-400">📄 package.json</div>
                    </>
                  ) : (
                    <>
                      <div className="pl-4 text-cyan-300">📜 index.js (Tu código JavaScript)</div>
                      <div className="pl-4 text-cyan-300">🌐 index.html (Consola web interactiva)</div>
                      <div className="pl-4 text-slate-400">📄 package.json</div>
                    </>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleDownloadZip}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all active:scale-[0.99]"
              >
                <Download className="w-4 h-4" />
                <span>Descargar {repoName || projectName}.zip</span>
              </button>
            </div>
          )}

          {/* TAB 3: TERMINAL GIT COMMANDS */}
          {activeTab === 'terminal' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span>Comandos Git para Terminal</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Si ya tienes Git instalado en tu computadora (Windows, Mac o Linux), copia estos comandos y pégalos en tu terminal en la carpeta de tu proyecto para subirlo a tu repositorio de GitHub:
                </p>
              </div>

              <div className="relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
                <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900 border-b border-slate-800 text-xs">
                  <span className="font-mono text-slate-400 text-[11px]">bash / terminal</span>
                  <button
                    onClick={handleCopyTerminal}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors text-[11px]"
                  >
                    {copiedTerminal ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">¡Comandos Copiados!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar Comandos</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3.5 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed whitespace-pre">
                  {terminalCommands}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-slate-400">
            Formato estándar compatible con Git, GitHub Desktop y GitHub CLI
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
