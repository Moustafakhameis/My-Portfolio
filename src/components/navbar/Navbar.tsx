import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Briefcase, Code2, Mail, Languages, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import Dock from '../ui/Dock';
import { Logo } from './Logo';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [showDock, setShowDock] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    const sections = ['about', 'experience', 'work', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (isMobileMenuOpen) return;
    const previous = scrollY.getPrevious() ?? 0;
    const isAtBottom = typeof window !== 'undefined' && 
      (window.innerHeight + latest >= document.documentElement.scrollHeight - 100);

    const isScrollingDown = latest > previous;
    const isScrollingUp = latest < previous;

    if (latest < 50) {
      setIsHidden(false);
      setShowDock(false);
      return;
    }

    if (isScrollingDown) {
      setIsHidden(true);
      setShowDock(!isAtBottom);
    } else if (isScrollingUp) {
      setIsHidden(false);
      setShowDock(false);
    }
  });

  const navLinks = [
    { name: t('navbar', 'about'), href: '#about' },
    { name: t('navbar', 'experience'), href: '#experience' },
    { name: t('navbar', 'projects'), href: '#work' },
    { name: t('navbar', 'contact'), href: '#contact' },
  ];

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const toggleLanguage = () => setLanguage(language === 'en' ? 'ar' : 'en');

  const navContainer = {
    visible: { y: 0, transition: { duration: 0.4, ease: 'easeInOut' } },
    hidden: { y: '-100%', transition: { duration: 0.4, ease: 'easeInOut' } },
  };

  return (
    <>
      <motion.nav
        variants={navContainer}
        initial="visible"
        animate={isHidden ? 'hidden' : 'visible'}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 bg-background/70 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transform-gpu will-change-transform"
      >
        <Logo language={language} theme={theme} />

        <div className="md:hidden flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-foreground hover:text-primary transition-colors z-50 relative w-12 h-12 flex items-center justify-center"
            aria-label="Toggle mobile menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <Menu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <DesktopNav 
          navLinks={navLinks} 
          activeSection={activeSection} 
          theme={theme} 
          toggleTheme={toggleTheme} 
          language={language} 
          toggleLanguage={toggleLanguage} 
        />
      </motion.nav>

      <MobileNav 
        navLinks={navLinks} 
        activeSection={activeSection} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        language={language} 
        toggleLanguage={toggleLanguage} 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />

      <AnimatePresence>
        {showDock && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22, mass: 0.8 }}
            className="fixed bottom-6 left-0 right-0 z-50 pointer-events-none flex justify-center hidden md:flex"
          >
            <div className="pointer-events-auto relative">
              <Dock
                items={[
                  { icon: <User size={22} />, label: t('navbar', 'about'), isActive: activeSection === 'about', onClick: () => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); window.history.pushState(null, '', '#about'); } },
                  { icon: <Briefcase size={22} />, label: t('navbar', 'experience'), isActive: activeSection === 'experience', onClick: () => { document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }); window.history.pushState(null, '', '#experience'); } },
                  { icon: <Code2 size={22} />, label: t('navbar', 'projects'), isActive: activeSection === 'work', onClick: () => { document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); window.history.pushState(null, '', '#work'); } },
                  { icon: <Mail size={22} />, label: t('navbar', 'contact'), isActive: activeSection === 'contact', onClick: () => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); window.history.pushState(null, '', '#contact'); } },
                  { 
                    separator: true,
                    icon: <Languages size={22} />,
                    label: language === 'en' ? 'Arabic' : 'English', 
                    onClick: toggleLanguage 
                  },
                  { 
                    separator: false,
                    icon: (
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={theme}
                          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                          className="flex items-center justify-center w-[22px] h-[22px]"
                        >
                          {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
                        </motion.div>
                      </AnimatePresence>
                    ), 
                    label: theme === 'dark' ? 'Light Mode' : 'Dark Mode', 
                    onClick: toggleTheme 
                  },
                ]}
                panelHeight={68}
                baseItemSize={50}
                magnification={70}
              />
              <div 
                className="absolute -bottom-3 left-[15%] right-[15%] h-[6px] rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.08) 0%, transparent 70%)',
                  filter: 'blur(4px)',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
