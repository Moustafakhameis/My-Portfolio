import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { LenisProvider } from './components/LenisProvider';
import { CustomCursor } from './components/ui/CustomCursor';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { Footer } from './components/ui/Footer';
import { NotFound } from './components/ui/NotFound';

const AboutSection = lazy(() => import('./components/sections/AboutSection').then(m => ({ default: m.AboutSection })));
const SkillsSection = lazy(() => import('./components/sections/SkillsSection').then(m => ({ default: m.SkillsSection })));
const ExperienceSection = lazy(() => import('./components/sections/ExperienceSection').then(m => ({ default: m.ExperienceSection })));
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection').then(m => ({ default: m.ProjectsSection })));
const ContactSection = lazy(() => import('./components/sections/ContactSection').then(m => ({ default: m.ContactSection })));

// Lazy load ONLY the heavy 3D sections so we don't block the main thread parsing 1MB of Three.js code on load
const ThreeShowcaseSection = lazy(() => import('./components/sections/ThreeShowcaseSection').then(module => ({ default: module.ThreeShowcaseSection })));
const SymbolShowcaseSection = lazy(() => import('./components/sections/SymbolShowcaseSection').then(module => ({ default: module.SymbolShowcaseSection })));

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBelowFold, setShowBelowFold] = useState(false);

  // Stagger the mount: let the Hero paint first, then mount heavier sections during idle time
  useEffect(() => {
    if (isLoaded) {
      let timeoutId: ReturnType<typeof setTimeout>;
      const initIdle = () => {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(() => setShowBelowFold(true));
        } else {
          timeoutId = setTimeout(() => setShowBelowFold(true), 150);
        }
      };
      const id = requestAnimationFrame(initIdle);
      return () => {
        cancelAnimationFrame(id);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [isLoaded]);

  // Check if current path matches the base URL or root
  const currentPath = window.location.pathname;
  const basePath = import.meta.env.BASE_URL;
  const isNotFound = currentPath !== basePath && currentPath !== basePath.slice(0, -1) && currentPath !== '/';

  return (
    <ThemeProvider defaultTheme="dark">
      <LanguageProvider>
        <ToastProvider>
          <LenisProvider isActive={showBelowFold}>
            <CustomCursor />
            {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
            
            {isLoaded && isNotFound && <NotFound />}
            
            {isLoaded && !isNotFound && (
              <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans transition-colors duration-500 overflow-x-clip">
                <Navbar />
                <main>
                  <HeroSection />
                  {showBelowFold && (
                    <>
                      <Suspense fallback={null}>
                        <AboutSection />
                        <SkillsSection />
                        <ExperienceSection />
                        <ProjectsSection />
                        <div className="hidden lg:block">
                          <Suspense fallback={<div className="w-full h-[600px] flex items-center justify-center opacity-50">Loading 3D Engine...</div>}>
                            <ThreeShowcaseSection />
                            <SymbolShowcaseSection />
                          </Suspense>
                        </div>
                        <ContactSection />
                      </Suspense>
                    </>
                  )}
                </main>
                {showBelowFold && <Footer />}
              </div>
            )}
          </LenisProvider>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
