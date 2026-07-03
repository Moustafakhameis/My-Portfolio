import React, { useState, Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { LenisProvider } from './components/LenisProvider';
import { CustomCursor } from './components/ui/CustomCursor';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/ui/Footer';
import { NotFound } from './components/ui/NotFound';

// Lazy load ONLY the heavy 3D sections so we don't block the main thread parsing 1MB of Three.js code on load
const ThreeShowcaseSection = lazy(() => import('./components/sections/ThreeShowcaseSection').then(module => ({ default: module.ThreeShowcaseSection })));
const SymbolShowcaseSection = lazy(() => import('./components/sections/SymbolShowcaseSection').then(module => ({ default: module.SymbolShowcaseSection })));

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Check if current path matches the base URL or root
  const currentPath = window.location.pathname;
  const basePath = import.meta.env.BASE_URL;
  const isNotFound = currentPath !== basePath && currentPath !== basePath.slice(0, -1) && currentPath !== '/';

  return (
    <ThemeProvider defaultTheme="dark">
      <LanguageProvider>
        <ToastProvider>
          <LenisProvider>
            <CustomCursor />
            {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
            
            {isLoaded && isNotFound && <NotFound />}
            
            {isLoaded && !isNotFound && (
              <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans transition-colors duration-500 overflow-x-clip">
                <Navbar />
                <main>
                  <HeroSection />
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
                </main>
                <Footer />
              </div>
            )}
          </LenisProvider>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
