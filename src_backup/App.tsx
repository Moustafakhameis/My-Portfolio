import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { LenisProvider } from './components/LenisProvider';
import { CustomCursor } from './components/ui/CustomCursor';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ThreeShowcaseSection } from './components/sections/ThreeShowcaseSection';
import { SymbolShowcaseSection } from './components/sections/SymbolShowcaseSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/ui/Footer';
import { NotFound } from './components/ui/NotFound';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Check if current path matches the base URL or root
  const currentPath = window.location.pathname;
  const basePath = import.meta.env.BASE_URL;
  const isNotFound = currentPath !== basePath && currentPath !== basePath.slice(0, -1) && currentPath !== '/';

  return (
    <ThemeProvider defaultTheme="dark">
      <LanguageProvider>
        <LenisProvider>
          <CustomCursor />
          {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
          
          {isLoaded && isNotFound && <NotFound />}
          
          {isLoaded && !isNotFound && (
            <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans transition-colors duration-300">
              <Navbar />
              <main>
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <ExperienceSection />
                <ProjectsSection />
                <ThreeShowcaseSection />
                <SymbolShowcaseSection />
                <ContactSection />
              </main>
              <Footer />
            </div>
          )}
        </LenisProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
