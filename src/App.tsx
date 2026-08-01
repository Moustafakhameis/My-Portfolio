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
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ContactSection } from './components/sections/ContactSection';

// Lazy load ONLY the heavy 3D sections so we don't block the main thread parsing 1MB of Three.js code on load
const ThreeShowcaseSection = lazy(() => import('./components/sections/ThreeShowcaseSection').then(module => ({ default: module.ThreeShowcaseSection })));
const SymbolShowcaseSection = lazy(() => import('./components/sections/SymbolShowcaseSection').then(module => ({ default: module.SymbolShowcaseSection })));

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSections, setShowSections] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [isDesktopView, setIsDesktopView] = useState(false);
  const threeRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkDesktop = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsDesktopView(window.innerWidth >= 1024 && !isTouch);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // After loading completes: mount below-fold sections after Hero entrance animation finishes
  // so there is zero main-thread contention or stutter during initial rendering or early scrolling
  useEffect(() => {
    if (isLoaded && !showSections) {
      const timer = setTimeout(() => {
        setShowSections(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, showSections]);

  // Load the heavy 3D engine only when the user scrolls near the 3D section
  useEffect(() => {
    if (!showSections || !isDesktopView) return;
    const currentRef = threeRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShow3D(true);
          observer.disconnect();
        }
      },
      { rootMargin: '1200px 0px' }
    );
    observer.observe(currentRef);
    return () => observer.disconnect();
  }, [showSections, isDesktopView]);

  // Check if current path matches the base URL, root, or index.html
  const currentPath = window.location.pathname;
  const basePath = import.meta.env.BASE_URL;
  const isNotFound = 
    currentPath !== basePath && 
    currentPath !== basePath.slice(0, -1) && 
    currentPath !== '/' &&
    currentPath !== basePath + 'index.html' &&
    currentPath !== '/index.html';

  return (
    <ThemeProvider defaultTheme="dark">
      <LanguageProvider>
        <ToastProvider>
          <LenisProvider isActive={isLoaded}>
            <CustomCursor />
            {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
            
            {isLoaded && isNotFound && <NotFound />}
            
            {!isNotFound && (
              <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans transition-colors duration-500 overflow-x-clip">
                <Navbar active={isLoaded} />
                <main>
                  <HeroSection animate={isLoaded} />
                  {showSections && (
                    <>
                      <AboutSection />
                      <SkillsSection />
                      <ExperienceSection />
                      <ProjectsSection />
                      {isDesktopView && (
                        <div ref={threeRef} className="hidden lg:block min-h-[600px]">
                          {show3D ? (
                            <Suspense fallback={<div className="w-full h-[600px] flex items-center justify-center opacity-50">Loading 3D Engine...</div>}>
                              <ThreeShowcaseSection />
                              <SymbolShowcaseSection />
                            </Suspense>
                          ) : (
                            <div className="w-full h-[600px]" />
                          )}
                        </div>
                      )}
                      <ContactSection />
                    </>
                  )}
                </main>
                {showSections && <Footer />}
              </div>
            )}
          </LenisProvider>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
