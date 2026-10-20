import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { courseModules } from '../data/coursesData';
import { Award, Lock, ExternalLink, Sparkles, CheckCircle2, Home } from 'lucide-react';
import certificateSealImg from '../assets/images/certificate_seal_gold_1792170916485.jpg';

interface CertificatesGalleryProps {
  onOpenCertificate: (moduleId: string) => void;
  onGoToModule: (moduleId: string) => void;
  onGoHome?: () => void;
}

export const CertificatesGallery: React.FC<CertificatesGalleryProps> = ({
  onOpenCertificate,
  onGoToModule,
  onGoHome,
}) => {
  const { stats } = useGame();
  const [selectedTech, setSelectedTech] = useState<'all' | 'javascript' | 'python' | 'react'>('all');

  const filteredModules =
    selectedTech === 'all'
      ? courseModules
      : courseModules.filter((m) => (m.language || 'javascript') === selectedTech);

  const totalModules = courseModules.length;
  const completedCount = stats.completedModuleIds.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top back button */}
      {onGoHome && (
        <div className="mb-4">
          <button
            onClick={onGoHome}
            title="Volver al inicio y mapa de cursos"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-xs font-medium group"
          >
            <Home className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Volver al Inicio</span>
          </button>
        </div>
      )}

      {/* Header with Technology Filter */}
      <div className="mb-8 pb-6 border-b border-slate-800 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
            <Award className="w-4 h-4" />
            <span>Acreditaciones Oficiales</span>
            <span aria-hidden="true">·</span>
            <span>{completedCount} de {totalModules} Desbloqueados</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Vitrina de Certificados
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Al completar todas las lecciones y desafíos prácticos de cada módulo de <strong>Python, JavaScript o React</strong>, recibirás un certificado oficial con identificación criptográfica y verificación descargable.
          </p>
        </div>

        {/* Tech Filter */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
          {(
            [
              { id: 'all', label: 'Todos' },
              { id: 'javascript', label: 'JavaScript' },
              { id: 'python', label: 'Python 3' },
              { id: 'react', label: 'React' },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTech(t.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                selectedTech === t.id
                  ? 'bg-slate-800 text-amber-300 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => {
          const isCompleted = stats.completedModuleIds.includes(module.id);
          const completedLessonsCount = module.lessons.filter((l) =>
            stats.completedLessonIds.includes(l.id)
          ).length;
          const totalLessons = module.lessons.length;

          return (
            <div
              key={module.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all relative overflow-hidden ${
                isCompleted
                  ? 'bg-slate-900 border-amber-500/40 shadow-xl shadow-amber-500/5'
                  : 'bg-slate-950/60 border-slate-800/80'
              }`}
            >
              {/* Subtle gold glow if completed */}
              {isCompleted && (
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              )}

              <div>
                {/* Header with seal / lock */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    {isCompleted ? (
                      <img
                        src={certificateSealImg}
                        alt="Sello Dorado"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Lock className="w-5 h-5 text-slate-600" />
                    )}
                  </div>

                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      isCompleted
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isCompleted ? 'Certificado Obtenido' : `${completedLessonsCount}/${totalLessons} Lecciones`}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                      module.language === 'python'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : module.language === 'react'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                        : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    }`}
                  >
                    {module.language === 'python' ? 'Python 3' : module.language === 'react' ? 'React' : 'JavaScript'}
                  </span>
                  <span className="text-xs text-slate-400">
                    Módulo {module.order} · {module.difficulty}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {module.certificate.subtitle}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {module.shortDescription}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {module.certificate.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] bg-slate-800/80 text-slate-300 border border-slate-700/50"
                    >
                      {skill}
                    </span>
                  ))}
                  {module.certificate.skills.length > 3 && (
                    <span className="text-[11px] text-slate-500 self-center">
                      +{module.certificate.skills.length - 3} más
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div>
                {isCompleted ? (
                  <button
                    onClick={() => onOpenCertificate(module.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all active:scale-98"
                  >
                    <Award className="w-4 h-4" />
                    <span>Ver e Imprimir Certificado</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onGoToModule(module.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Completar lecciones para desbloquear</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
