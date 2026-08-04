import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Briefcase, Code2, Mail, Languages, Sun, Moon, Cpu } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import Dock from '../ui/Dock';
import { Logo } from './Logo';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { useSmartWorkNavigation } from '../../hooks/useSmartWorkNavigation';

export const Navbar = ({ active = true }: { active?: boolean }) => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [showDock, setShowDock] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [blurReady, setBlurReady] = useState(false);
  const { handleClick: handleDockClick, tooltipElement: DockTooltip } = useSmartWorkNavigation("bottom-[130%] left-1/2 -translate-x-1/2", activeSection);

  // Defer the expensive backdrop-blur until hero entrance animations are done (~2.5s)
  // This is the #1 GPU perf killer: blurring behind the navbar on every animation frame
  useEffect(() => {
    if (!active) return;
    const id = setTimeout(() => setBlurReady(true), 2500);
    return () => clearTimeout(id);
  }, [active]);

  useEffect(() => {
    const sections = ['about', 'skills', 'experience', 'work', 'contact'];
    let rafId = 0;
    let currentActive = '';

    const handleScroll = () => {
      if (rafId) return; // Already scheduled — skip until next frame
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        let found = '';

        for (const id of sections) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.5) {
              found = id;
            }
          }
        }

        // Special case: at the absolute bottom of the page, force 'contact'
        if (window.scrollY > 200 && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
          found = 'contact';
        }

        if (found !== currentActive) {
          currentActive = found;
          setActiveSection(found);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set initial state
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
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
      setIsHidden(prev => prev !== false ? false : prev);
      setShowDock(prev => prev !== false ? false : prev);
      return;
    }

    if (isScrollingDown) {
      setIsHidden(prev => prev !== true ? true : prev);
      setShowDock(prev => prev !== !isAtBottom ? !isAtBottom : prev);
    } else if (isScrollingUp) {
      setIsHidden(prev => prev !== false ? false : prev);
      setShowDock(prev => prev !== false ? false : prev);
    }
  });

  const navLinks = [
    { name: t('navbar', 'about'), href: '#about' },
    { name: t('navbar', 'skills'), href: '#skills' },
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
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 bg-background/70 ${blurReady ? 'backdrop-blur-md' : ''} border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transform-gpu will-change-transform`}
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
          setActiveSection={setActiveSection}
          theme={theme} 
          toggleTheme={toggleTheme} 
          language={language} 
          toggleLanguage={toggleLanguage} 
        />
      </motion.nav>

      <MobileNav 
        navLinks={navLinks} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        theme={theme} 
        toggleTheme={toggleTheme} 
        language={language} 
        toggleLanguage={toggleLanguage} 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />

      <AnimatePresence>
        {showDock && (() => {
          const scrollToSection = (targetId: string) => {
            setActiveSection(targetId);
            const target = document.getElementById(targetId);
            if (target) {
              // @ts-ignore
              if (window.lenis) {
                // @ts-ignore
                window.lenis.scrollTo(target);
                // Re-trigger after lazy sections mount to fix interrupted scroll
                setTimeout(() => document.getElementById(targetId) && (window as any).lenis.scrollTo(document.getElementById(targetId)), 600);
              } else {
                target.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' }), 600);
              }
              window.history.pushState(null, '', `#${targetId}`);
            }
          };

          return (
            <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22, mass: 0.8 }}
            className="fixed bottom-6 left-0 right-0 z-50 pointer-events-none flex justify-center hidden lg:flex"
          >
            <div className="pointer-events-auto relative">
              {DockTooltip}
              <Dock
                items={[
                  { icon: <User size={22} />, label: t('navbar', 'about'), isActive: activeSection === 'about', onClick: () => scrollToSection('about') },
                  { icon: <Cpu size={22} />, label: t('navbar', 'skills'), isActive: activeSection === 'skills', onClick: () => scrollToSection('skills') },
                  { icon: <Briefcase size={22} />, label: t('navbar', 'experience'), isActive: activeSection === 'experience', onClick: () => scrollToSection('experience') },
                  { icon: <Code2 size={22} />, label: t('navbar', 'projects'), isActive: activeSection === 'work', onClick: (e) => { handleDockClick(e as any); } },
                  { icon: <Mail size={22} />, label: t('navbar', 'contact'), isActive: activeSection === 'contact', onClick: () => scrollToSection('contact') },
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
          );
        })()}
      </AnimatePresence>
    </>
  );
};
