import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Languages, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { cn } from '../../utils/cn';

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isHidden, setIsHidden] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
      setIsMobileMenuOpen(false);
    } else {
      setIsHidden(false);
    }
  });

  const navLinks = [
    { name: t('navbar', 'about'), href: '#about' },
    { name: t('navbar', 'experience'), href: '#experience' },
    { name: t('navbar', 'work'), href: '#work' },
    { name: t('navbar', 'contact'), href: '#contact' },
  ];

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const toggleLanguage = () => setLanguage(language === 'en' ? 'ar' : 'en');

  // Animation variants
  const navContainer = {
    visible: { y: 0, transition: { duration: 0.4, ease: [] as const } },
    hidden: { y: '-100%', transition: { duration: 0.4, ease: [] as const } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as any, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.nav
      variants={navContainer}
      initial="visible"
      animate={isHidden ? 'hidden' : 'visible'}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 bg-background/60 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
    >
      {/* Logo */}
      <motion.a 
        href="#" 
        className="group flex items-center gap-2 text-2xl font-bold tracking-tighter"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground group-hover:from-primary group-hover:to-pink-500 transition-all duration-300">
          𝐌𝐎𝐒𝐓𝐀𝐅𝐀
        </span>
        <motion.span 
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="text-primary inline-block origin-center"
        >
          𖤍
        </motion.span>
      </motion.a>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-foreground hover:text-primary transition-colors z-50 relative"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      {/* Desktop Navigation Links & Controls */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="hidden md:flex items-center gap-2"
      >
        <div className="flex items-center px-4" onMouseLeave={() => setHoveredIndex(null)}>
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <motion.a
                key={link.name}
                variants={itemAnim}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(i)}
                className="relative px-5 py-2 text-sm font-bold text-foreground/80 hover:text-foreground transition-colors capitalize tracking-wide"
              >
                <span className={cn("relative z-10 transition-colors", isActive && "text-primary drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]")}>
                  {link.name}
                </span>
                
                {/* Hover Pill */}
                {hoveredIndex === i && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring" as any, bounce: 0.2, duration: 0.6 }}
                    className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-full z-0"
                  />
                )}

                {/* Active Indicator Dot */}
                {isActive && hoveredIndex !== i && (
                  <motion.div
                    layoutId="nav-active-indicator"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(168,85,247,0.8)] z-0"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring" as any, stiffness: 400, damping: 20 }}
                  />
                )}
              </motion.a>
            );
          })}
        </div>
        
        {/* Controls */}
        <motion.div variants={itemAnim} className="flex items-center gap-2 border-l border-border/50 pl-4 ml-2">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5, backgroundColor: "rgba(168,85,247,0.15)" }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleLanguage}
            className="p-2.5 rounded-full transition-colors flex items-center gap-2 group"
            aria-label="Toggle language"
          >
            <Languages size={18} className="text-foreground group-hover:text-primary transition-colors" />
            <span className="text-xs font-bold uppercase text-foreground group-hover:text-primary transition-colors">{language}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(168,85,247,0.15)" }}
            whileTap={{ scale: 0.9, rotate: -180 }}
            onClick={toggleTheme}
            className="p-2.5 rounded-full transition-colors"
            aria-label="Toggle theme"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 0 : 180 }}
              transition={{ type: "spring" as any, stiffness: 200, damping: 20 }}
            >
              {theme === 'dark' ? <Sun size={20} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" /> : <Moon size={20} className="text-primary drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />}
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/5 shadow-2xl flex flex-col items-center py-6 gap-6 md:hidden z-40"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-xl font-bold tracking-wide transition-colors capitalize",
                    isActive ? "text-primary drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" : "text-foreground/80 hover:text-foreground"
                  )}
                >
                  {link.name}
                </a>
              );
            })}
            
            <div className="flex items-center gap-6 mt-4 pt-6 border-t border-border/50 w-2/3 justify-center">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 p-2"
                aria-label="Toggle language"
              >
                <Languages size={24} className="text-foreground" />
                <span className="text-sm font-bold uppercase text-foreground">{language}</span>
              </button>
              
              <button
                onClick={toggleTheme}
                className="p-2"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-primary" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
