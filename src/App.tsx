import React, { useState, useEffect } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { courseModules } from './data/coursesData';
import { Lesson, CourseModule } from './types/course';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CourseMap } from './components/CourseMap';
import { LessonWorkspace } from './components/LessonWorkspace';
import { PlaygroundView } from './components/PlaygroundView';
import { CertificatesGallery } from './components/CertificatesGallery';
import { CertificateModal } from './components/CertificateModal';
import { BadgesModal } from './components/BadgesModal';
import { ProfileModal } from './components/ProfileModal';
import { OnboardingTour } from './components/OnboardingTour';
import { JavaScriptIntroModal } from './components/JavaScriptIntroModal';
import { Home, Globe, Copy, Check } from 'lucide-react';

function AppContent() {
  const { activeCertificateModuleId, closeCertificate, openCertificate, isTourOpen } = useGame();

  const [currentView, setCurrentView] = useState<'course' | 'playground' | 'certificates'>('course');
  const [activeLesson, setActiveLesson] = useState<{ lesson: Lesson; module: CourseModule } | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [badgesModalOpen, setBadgesModalOpen] = useState(false);
  const [introModalOpen, setIntroModalOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const getAppUrl = () => {
    if (typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null') {
      return window.location.origin;
    }
    return 'https://ais-pre-fbq43phdq6w3hvpw3imqy3-218711022750.us-west1.run.app';
  };

  const handleCopyAppUrl = () => {
    const url = getAppUrl();
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll listener for floating "Volver al Inicio" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Guarantee return to home view whenever tour is opened
  useEffect(() => {
    if (isTourOpen && (currentView !== 'course' || activeLesson !== null)) {
      setActiveLesson(null);
      setCurrentView('course');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isTourOpen, currentView, activeLesson]);

  const handleGoHome = () => {
    setActiveLesson(null);
    setCurrentView('course');
    setProfileModalOpen(false);
    setBadgesModalOpen(false);
    setIntroModalOpen(false);
    closeCertificate();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLesson = (lesson: Lesson, module: CourseModule) => {
    setActiveLesson({ lesson, module });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartFirstLesson = () => {
    const firstModule = courseModules[0];
    const firstLesson = firstModule.lessons[0];
    setActiveLesson({ lesson: firstLesson, module: firstModule });
    setCurrentView('course');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextLesson = () => {
    if (!activeLesson) return;
    const { module, lesson } = activeLesson;
    const currentLessonIndex = module.lessons.findIndex((l) => l.id === lesson.id);

    // If next lesson in same module
    if (currentLessonIndex < module.lessons.length - 1) {
      const nextLesson = module.lessons[currentLessonIndex + 1];
      setActiveLesson({ lesson: nextLesson, module });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If next module
    const currentModuleIndex = courseModules.findIndex((m) => m.id === module.id);
    if (currentModuleIndex < courseModules.length - 1) {
      const nextModule = courseModules[currentModuleIndex + 1];
      const nextLesson = nextModule.lessons[0];
      setActiveLesson({ lesson: nextLesson, module: nextModule });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // End of course! Back to map
    handleGoHome();
  };

  const handleGoToModuleFromGallery = (moduleId: string) => {
    const mod = courseModules.find((m) => m.id === moduleId);
    if (mod) {
      setCurrentView('course');
      setActiveLesson({ lesson: mod.lessons[0], module: mod });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <Navbar
        currentView={currentView}
        isInsideLesson={activeLesson !== null}
        onGoHome={handleGoHome}
        setCurrentView={(view) => {
          setCurrentView(view);
          setActiveLesson(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenProfile={() => setProfileModalOpen(true)}
        onOpenBadges={() => setBadgesModalOpen(true)}
        onOpenIntro={() => setIntroModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* If in Lesson Workspace */}
        {activeLesson ? (
          <LessonWorkspace
            lesson={activeLesson.lesson}
            module={activeLesson.module}
            onBack={handleGoHome}
            onNextLesson={handleNextLesson}
            onOpenIntro={() => setIntroModalOpen(true)}
          />
        ) : (
          <>
            {/* Course View (Home) */}
            {currentView === 'course' && (
              <>
                <HeroSection
                  onStartLearning={handleStartFirstLesson}
                  onOpenPlayground={() => {
                    setCurrentView('playground');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onOpenIntro={() => setIntroModalOpen(true)}
                />
                <CourseMap
                  onSelectLesson={handleSelectLesson}
                  onOpenIntro={() => setIntroModalOpen(true)}
                />
              </>
            )}

            {/* Playground Free Lab View */}
            {currentView === 'playground' && (
              <PlaygroundView onGoHome={handleGoHome} />
            )}

            {/* Certificates Showcase Gallery */}
            {currentView === 'certificates' && (
              <CertificatesGallery
                onOpenCertificate={(modId) => openCertificate(modId)}
                onGoToModule={handleGoToModuleFromGallery}
                onGoHome={handleGoHome}
              />
            )}
          </>
        )}
      </main>

      {/* Floating Volver al Inicio button when scrolled */}
      {showScrollTop && (
        <button
          onClick={handleGoHome}
          aria-label="Volver al inicio"
          title="Volver al inicio"
          className="fixed bottom-6 right-6 z-30 flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/95 hover:bg-cyan-500 text-slate-200 hover:text-slate-950 border border-slate-700/80 hover:border-cyan-400 shadow-xl shadow-black/50 backdrop-blur-sm text-xs font-semibold transition-all duration-200 group active:scale-95"
        >
          <Home className="w-3.5 h-3.5 text-cyan-400 group-hover:text-slate-950 transition-colors" />
          <span>Volver al Inicio</span>
        </button>
      )}

      {/* Footer */}
      <footer className="no-print border-t border-slate-900 bg-slate-950 py-10 mt-16 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handleGoHome}
                className="font-bold text-white tracking-tight hover:text-cyan-400 transition-colors"
                title="Volver al inicio"
              >
                CódigoJoven
              </button>
              <span aria-hidden="true">·</span>
              <span>Plataforma didáctica interactiva para jóvenes programadores</span>
            </div>

            <div className="flex items-center gap-4 text-slate-500 flex-wrap">
              <button
                onClick={handleGoHome}
                className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
              >
                <Home className="w-3 h-3 text-cyan-400" />
                <span>Volver a Inicio</span>
              </button>
              <span aria-hidden="true">·</span>
              <span>A partir de 14 años</span>
              <span aria-hidden="true">·</span>
              <span>Python 3, JavaScript & React</span>
              <span aria-hidden="true">·</span>
              <span className="text-cyan-400 font-medium">Exportación a GitHub</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">Certificados con Verificación Única</span>
            </div>
          </div>

          {/* Official URL bar */}
          <div className="pt-4 border-t border-slate-900/80 flex flex-wrap items-center justify-between gap-3 text-slate-500">
            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
              <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>URL Activa:</span>
              <a
                href={getAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 font-semibold hover:underline selection:bg-cyan-500 selection:text-slate-950"
              >
                {getAppUrl()}
              </a>
            </div>
            <button
              onClick={handleCopyAppUrl}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors text-[11px] font-medium"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">¡URL Copiada!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-slate-400" />
                  <span>Copiar enlace real</span>
                </>
              )}
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <OnboardingTour onStartLesson={handleStartFirstLesson} />

      {activeCertificateModuleId && (
        <CertificateModal
          moduleId={activeCertificateModuleId}
          onClose={closeCertificate}
          onGoHome={handleGoHome}
        />
      )}

      {profileModalOpen && (
        <ProfileModal
          onClose={() => setProfileModalOpen(false)}
          onGoHome={handleGoHome}
        />
      )}

      {badgesModalOpen && (
        <BadgesModal
          onClose={() => setBadgesModalOpen(false)}
          onGoHome={handleGoHome}
        />
      )}

      <JavaScriptIntroModal
        isOpen={introModalOpen}
        onClose={() => setIntroModalOpen(false)}
        onGoHome={handleGoHome}
        onStartLesson1={() => {
          setIntroModalOpen(false);
          handleStartFirstLesson();
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
