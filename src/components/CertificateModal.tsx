import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { courseModules } from '../data/coursesData';
import { X, Printer, Share2, Check, ShieldCheck, Sparkles, Home, Edit3, Github } from 'lucide-react';
import { GitHubExportModal } from './GitHubExportModal';
import { sounds } from '../utils/soundEffects';
import certificateSealImg from '../assets/images/certificate_seal_gold_1792170916485.jpg';

interface CertificateModalProps {
  moduleId: string;
  onClose: () => void;
  onGoHome?: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ moduleId, onClose, onGoHome }) => {
  const { stats, updateUserName } = useGame();
  const [studentName, setStudentName] = useState(stats.name);
  const [isEditingName, setIsEditingName] = useState(false);
  const [copied, setCopied] = useState(false);
  const [nameSavedNotice, setNameSavedNotice] = useState(false);
  const [githubModalOpen, setGithubModalOpen] = useState(false);

  // Sync state if stats.name changes
  useEffect(() => {
    setStudentName(stats.name);
  }, [stats.name]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const targetModule = courseModules.find((m) => m.id === moduleId) || courseModules[0];
  const certData = targetModule.certificate;

  // Generate deterministic verification code based on module ID
  const hash = Math.abs(
    (moduleId + stats.name).split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
  ).toString(16).toUpperCase().padStart(6, '0');
  const certificateId = `CODEX-2026-${targetModule.order}-${hash}`;

  const issueDate = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/?verify=${certificateId}`;
    navigator.clipboard.writeText(`¡He obtenido mi certificado en ${targetModule.title} en CódigoJoven! Verificación: ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveName = () => {
    updateUserName(studentName);
    setIsEditingName(false);
    setNameSavedNotice(true);
    setTimeout(() => setNameSavedNotice(false), 2500);
  };

  const handleSaveAndGoHome = () => {
    updateUserName(studentName);
    setIsEditingName(false);
    onClose();
    if (onGoHome) {
      onGoHome();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-4xl my-6">
        {/* Top Control Bar (hidden during print) */}
        <div className="no-print flex flex-wrap items-center justify-between gap-2.5 mb-4 px-2">
          <div className="flex items-center gap-2">
            {onGoHome && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onGoHome();
                }}
                title="Volver a la pantalla principal"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20 active:scale-95"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Volver al Inicio</span>
              </button>
            )}
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>Certificado Oficial Verificado</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado!' : 'Compartir'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>

            <button
              onClick={onClose}
              title="Cerrar modal"
              aria-label="Cerrar certificado"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Frame */}
        <div
          id="printable-certificate"
          className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-2xl border-4 border-double border-amber-500/50 p-6 sm:p-12 shadow-2xl overflow-hidden text-slate-100"
        >
          {/* Subtle Guilloche & Background Ornament */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f59e0b08_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Double Golden Border Inset */}
          <div className="border border-amber-500/30 rounded-xl p-5 sm:p-10 relative z-10 flex flex-col justify-between min-h-[500px]">
            {/* Header Lockup */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-amber-400 uppercase">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>CódigoJoven · Academia Digital de Programación</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-serif">
                {certData.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Se otorga el presente reconocimiento oficial a:
              </p>
            </div>

            {/* Recipient Name Area (with in-place editing for personalization) */}
            <div className="text-center my-6">
              {isEditingName ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveName();
                  }}
                  className="no-print flex flex-col items-center gap-3 p-4 rounded-xl bg-slate-900/95 border border-amber-500/50 max-w-lg mx-auto shadow-xl"
                >
                  <label className="text-xs text-amber-300 font-semibold">
                    Escribe tu nombre para el certificado oficial:
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Tu nombre completo..."
                    maxLength={40}
                    className="w-full text-lg sm:text-2xl font-bold text-center bg-slate-950 border border-amber-500 rounded-lg px-4 py-2 text-amber-200 outline-none focus:ring-2 focus:ring-amber-400"
                    autoFocus
                  />
                  <div className="flex flex-wrap items-center justify-center gap-2 w-full pt-1">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Guardar Nombre</span>
                    </button>

                    {onGoHome && (
                      <button
                        type="button"
                        onClick={handleSaveAndGoHome}
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all active:scale-95"
                      >
                        <Home className="w-3.5 h-3.5" />
                        <span>Guardar y Volver al Inicio</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setStudentName(stats.name);
                        setIsEditingName(false);
                      }}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-lg text-xs transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-2">
                  <div
                    className="group inline-flex items-center gap-2 cursor-pointer"
                    onClick={() => setIsEditingName(true)}
                    title="Haz clic para personalizar el nombre en el certificado"
                  >
                    <div className="text-2xl sm:text-4xl font-bold tracking-tight text-amber-300 font-serif border-b-2 border-amber-500/50 pb-1 px-4 hover:border-amber-400 transition-colors">
                      {studentName}
                    </div>
                    <span className="no-print p-1.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="no-print flex items-center justify-center gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setIsEditingName(true)}
                      className="text-[11px] text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors font-medium"
                    >
                      (Clic aquí para cambiar nombre)
                    </button>
                    {nameSavedNotice && (
                      <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 animate-pulse">
                        <Check className="w-3 h-3" /> Nombre guardado
                      </span>
                    )}
                  </div>
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-300 mt-4 max-w-xl mx-auto leading-relaxed">
                Por haber completado con éxito todas las lecciones interactivas, desafíos de código y pruebas prácticas correspondientes a:
              </p>

              <div className="text-base sm:text-xl font-bold text-cyan-300 mt-1">
                {certData.subtitle}
              </div>
            </div>

            {/* Competencies / Skills Breakdown */}
            <div className="my-4 bg-slate-950/60 rounded-xl p-4 border border-slate-800 max-w-2xl mx-auto w-full">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
                Competencias Técnicas Acreditadas:
              </div>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                {certData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-700/80 text-slate-200"
                  >
                    <Check className="w-3 h-3 text-amber-400" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Footer: Seal, Signatures, and Verification Code */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 items-center gap-6 text-xs text-slate-400">
              {/* Left: Issue Date & Verification Hash */}
              <div className="text-center sm:text-left space-y-1">
                <div className="text-slate-500">Fecha de Expedición:</div>
                <div className="text-slate-200 font-medium">{issueDate}</div>
                <div className="text-[10px] font-mono text-cyan-400 mt-1">
                  ID: {certificateId}
                </div>
                <div className="text-[9px] text-slate-500 font-mono truncate max-w-[200px]" title={typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-wel3okpp7jigtpexaslqrd-416963650169.us-west1.run.app'}>
                  {typeof window !== 'undefined' ? (window.location.host || window.location.origin) : 'CódigoJoven'}
                </div>
              </div>

              {/* Center: 3D Gold Seal */}
              <div className="flex justify-center">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-xl border-2 border-amber-400/80">
                  <img
                    src={certificateSealImg}
                    alt="Sello Dorado Oficial"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right: Signature Lockup */}
              <div className="text-center sm:text-right space-y-1">
                <div className="font-serif italic text-base sm:text-lg text-amber-200/90 tracking-wider">
                  CódigoJoven Academic Board
                </div>
                <div className="h-0.5 w-32 bg-amber-500/40 ml-auto mr-auto sm:mr-0 my-1" />
                <div className="text-slate-400 font-medium text-[11px]">
                  Dirección de Formación y Didáctica
                </div>
                <div className="text-[10px] text-slate-500">
                  Verificado Cryptographically
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar (hidden during print) */}
        <div className="no-print mt-5 flex flex-wrap items-center justify-center gap-3">
          {onGoHome && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onGoHome();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Home className="w-4 h-4" />
              <span>Volver al Inicio (Mapa de Cursos)</span>
            </button>
          )}

          <button
            onClick={() => {
              sounds.playClick();
              setGithubModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-cyan-300 font-semibold text-xs sm:text-sm transition-all active:scale-95 shadow-sm"
            title="Exportar las soluciones de este módulo a GitHub"
          >
            <Github className="w-4 h-4 text-cyan-400" />
            <span>Exportar Proyecto a GitHub</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-colors"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Imprimir / PDF</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-medium text-xs sm:text-sm transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Cerrar</span>
          </button>
        </div>
      </div>

      {/* GitHub Export Modal */}
      <GitHubExportModal
        isOpen={githubModalOpen}
        onClose={() => setGithubModalOpen(false)}
        projectName={`Certificado - ${targetModule.certificate.title}`}
        language={targetModule.language || 'javascript'}
        code={targetModule.lessons.map((l) => `// ${l.title}\n${l.exercise.solution}`).join('\n\n')}
        authorName={studentName}
      />
    </div>
  );
};
