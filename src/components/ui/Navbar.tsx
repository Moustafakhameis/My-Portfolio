import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Languages, Menu, X, User, Briefcase, Code2, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { cn } from '../../utils/cn';
import Dock from './Dock';

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [showDock, setShowDock] = useState(false);
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
    if (isMobileMenuOpen) return; // Don't hide navbar if mobile menu is open
    const previous = scrollY.getPrevious() ?? 0;
    // Check if at the bottom of the page (within 100px)
    const isAtBottom = typeof window !== 'undefined' && 
      (window.innerHeight + latest >= document.documentElement.scrollHeight - 100);

    // Handle Dock visibility (hide at top and at very bottom)
    if (latest > 150 && !isAtBottom) {
      setShowDock(true);
    } else {
      setShowDock(false);
    }

    // Handle Navbar visibility
    const isMobileOrTablet = typeof window !== 'undefined' && window.innerWidth < 1024;

    if (isMobileOrTablet) {
      // Mobile/Tablet: Show on scroll up, hide on scroll down
      if (latest < 150) {
        setIsHidden(false);
      } else if (latest < previous) {
        setIsHidden(false);
      } else {
        setIsHidden(true);
      }
    } else {
      // Desktop: Keep original behavior (hide when scrolled past 150)
      if (latest > 150) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
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

  // Animation variants
  const navContainer = {
    visible: { y: 0, transition: { duration: 0.4, ease: 'easeInOut' } },
    hidden: { y: '-100%', transition: { duration: 0.4, ease: 'easeInOut' } },
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
    show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", damping: 24 } }
  };

  return (
    <>
      <motion.nav
        variants={navContainer}
        initial="visible"
        animate={isHidden ? 'hidden' : 'visible'}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 bg-background/60 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
      >
      {/* Logo */}
      <motion.a 
        href="#" 
        className="flex items-center gap-2 text-2xl font-bold tracking-tighter"
        initial="idle"
        animate="idle"
        whileHover="hover"
        whileTap="tap"
        variants={{
          idle: { scale: 1 },
          hover: { scale: 1.02 },
          tap: { scale: 0.95 }
        }}
      >
        {/* 3D Extruded Text Effect with Sweeping Shine & Animated Colors */}
        <motion.span 
          className="inline-block"
          variants={{
            idle: {
              y: 0,
              filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.3))",
              transition: { duration: 0.3 }
            },
            hover: {
              y: -2,
              filter: "drop-shadow(0px 8px 16px rgba(168,85,247,0.4))",
              transition: { type: "spring", stiffness: 400, damping: 25 }
            }
          }}
        >
          <motion.span 
            className="bg-clip-text text-transparent inline-block"
            animate={{ 
              backgroundPosition: ["200% center", "-200% center"],
              backgroundImage: `linear-gradient(120deg, ${theme === 'dark' ? '#ffffff' : '#000000'} 40%, rgba(168,85,247,0.5) 50%, ${theme === 'dark' ? '#ffffff' : '#000000'} 60%)`
            }}
            transition={{ 
              backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear" },
              backgroundImage: { duration: 0.5, ease: "easeInOut" }
            }}
            variants={{
              idle: { backgroundSize: "200% auto" },
              hover: {
                backgroundImage: "linear-gradient(90deg, #a855f7, #ec4899, #a855f7)",
                backgroundSize: "200% auto",
              }
            }}
          >
            {language === 'ar' ? 'مُصْطَفَى' : '𝐌𝐎𝐒𝐓𝐀𝐅𝐀'}
          </motion.span>
        </motion.span>
        
        {/* Continuous 3D Spin & Animated Colors */}
        <div style={{ perspective: 1000 }} className="ml-2">
          <motion.div
            animate={{ y: [-2, 2], rotateY: [0, 360] }}
            transition={{ 
              y: { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
              rotateY: { duration: 8, repeat: Infinity, ease: "linear" }
            }}
            className="inline-block origin-center"
          >
            <motion.span 
              className="inline-block"
              animate={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}
              transition={{ color: { duration: 0.5, ease: "easeInOut" } }}
              variants={{
                idle: {
                  scale: 1,
                  filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.3))",
                  transition: { duration: 0.3 }
                },
                hover: {
                  scale: 1.15,
                  color: "#ec4899",
                  filter: "drop-shadow(0px 0px 15px rgba(236,72,153,0.8))",
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }
              }}
            >
              𖤍
            </motion.span>
          </motion.div>
        </div>
      </motion.a>

      {/* Mobile Menu Toggle Button */}
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

      {/* Desktop Navigation Links & Controls */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="hidden md:flex items-center gap-2"
      >
        <div 
          className="flex items-center px-1.5 py-1 gap-0.5 rounded-full" 
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.1)',
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <motion.a
                key={link.name}
                variants={itemAnim}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(i)}
                className="relative px-5 py-2 text-[13px] font-medium tracking-[0.08em] uppercase"
                style={{ color: isActive ? undefined : 'var(--foreground-muted, rgba(255,255,255,0.4))' }}
                whileHover={!isActive ? { scale: 1.05, color: 'rgba(255,255,255,0.85)' } : undefined}
                animate={isActive ? { scale: [1, 1.02, 1] } : undefined}
                transition={isActive ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : undefined}
              >
                {/* Soft glow backdrop behind active text */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 z-[1] rounded-full pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.15) 0%, transparent 70%)',
                    }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}

                {/* Active gradient text with animated shimmer */}
                {isActive ? (
                  <motion.span
                    className="relative z-10 font-extrabold"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #c084fc 0%, #e879f9 20%, #f0abfc 40%, #fff 50%, #f0abfc 60%, #e879f9 80%, #c084fc 100%)',
                      backgroundSize: '200% auto',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                    animate={{ backgroundPosition: ['0% center', '200% center'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    {link.name}
                  </motion.span>
                ) : (
                  <span className="relative z-10 transition-colors duration-300">
                    {link.name}
                  </span>
                )}
                
                {/* Active pill — animated gradient border */}
                {isActive && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full z-0 overflow-hidden"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  >
                    {/* Rotating gradient border */}
                    <motion.div
                      className="absolute -inset-[1px] rounded-full"
                      style={{
                        background: 'conic-gradient(from 0deg, rgba(168,85,247,0.6), rgba(236,72,153,0.4), rgba(168,85,247,0.1), rgba(139,92,246,0.4), rgba(168,85,247,0.6))',
                      }}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    />
                    {/* Inner fill (cut out the border) */}
                    <div 
                      className="absolute inset-[1px] rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(20,10,30,0.8) 50%, rgba(139,92,246,0.12) 100%)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), inset 0 0 16px rgba(168,85,247,0.08)',
                      }}
                    />
                  </motion.div>
                )}

                {/* Hover Pill */}
                {hoveredIndex === i && !isActive && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
                    className="absolute inset-0 rounded-full z-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(139,92,246,0.06) 100%)',
                      border: '1px solid rgba(168,85,247,0.18)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 0 16px -4px rgba(168,85,247,0.2)',
                    }}
                  />
                )}

                {/* Active Indicator — dual glow bars + spinning star */}
                {isActive && (
                  <>
                    {/* Primary glow bar */}
                    <motion.div
                      layoutId="nav-active-bar"
                      className="absolute -bottom-1.5 left-[8%] right-[8%] h-[2.5px] rounded-full z-0"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.9), rgba(192,132,252,1), rgba(168,85,247,0.9), transparent)',
                        boxShadow: '0 0 12px rgba(168,85,247,0.7), 0 0 24px rgba(168,85,247,0.35)',
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                    {/* Reflection glow bar */}
                    <motion.div
                      className="absolute -bottom-3 left-[20%] right-[20%] h-[4px] rounded-full z-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.2), transparent)',
                        filter: 'blur(4px)',
                      }}
                    />
                    {/* Spinning Star */}
                    <motion.div
                      layoutId="nav-active-star"
                      className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-[14px] h-[14px] z-10"
                      style={{
                        background: '#fff',
                        clipPath: 'polygon(50% 0%, 61% 35%, 100% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 0% 35%, 39% 35%)',
                        filter: 'drop-shadow(0 0 5px rgba(168,85,247,1)) drop-shadow(0 0 14px rgba(168,85,247,0.8)) drop-shadow(0 0 20px rgba(168,85,247,0.3))',
                      }}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    />
                  </>
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
            <span className="text-xs font-bold uppercase text-foreground group-hover:text-primary transition-colors">{language === 'en' ? 'ar' : 'en'}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(168,85,247,0.15)" }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2.5 rounded-full transition-colors relative flex items-center justify-center w-10 h-10 overflow-hidden"
            aria-label="Toggle theme"
          >
            <motion.div
              initial={false}
              animate={{
                scale: theme === 'dark' ? 1 : 0,
                opacity: theme === 'dark' ? 1 : 0,
                rotate: theme === 'dark' ? 0 : -90
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute"
            >
              <Sun size={20} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
            </motion.div>
            
            <motion.div
              initial={false}
              animate={{
                scale: theme === 'light' ? 1 : 0,
                opacity: theme === 'light' ? 1 : 0,
                rotate: theme === 'light' ? 0 : 90
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute"
            >
              <Moon size={20} className="text-primary drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>
      </motion.nav>

      {/* Mobile Menu Overlay (Full Screen) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.3 } }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-background flex flex-col justify-center items-center md:hidden z-40 overflow-hidden"
          >
            {/* Background Decorative Blob */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent -z-10"
            />

            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                }
              }}
              className="flex flex-col items-center gap-10 w-full"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    variants={{
                      hidden: { opacity: 0, y: 50 },
                      show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", damping: 24 } }
                    }}
                    className="relative group"
                  >
                    <span className={cn(
                      "text-4xl font-black tracking-widest uppercase transition-colors duration-300",
                      isActive ? "text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" : "text-foreground/70 hover:text-foreground"
                    )}>
                      {link.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="mobile-active"
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                      />
                    )}
                  </motion.a>
                );
              })}
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  show: { opacity: 1, scale: 1, transition: { type: "tween", ease: "easeOut", damping: 24, delay: 0.4 } }
                }}
                className="flex items-center gap-8 mt-8 pt-8 border-t border-border/30 w-3/4 justify-center"
              >
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-3 p-3 rounded-full hover:bg-primary/10 transition-colors"
                  aria-label="Toggle language"
                >
                  <Languages size={28} className="text-foreground" />
                  <span className="text-lg font-bold uppercase text-foreground">{language === 'en' ? 'ar' : 'en'}</span>
                </button>
                
                <div className="w-px h-8 bg-border/50" />
                
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(168,85,247,0.15)" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  className="p-3 rounded-full transition-colors relative flex items-center justify-center w-14 h-14 overflow-hidden hover:bg-primary/10"
                  aria-label="Toggle theme"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      scale: theme === 'dark' ? 1 : 0,
                      opacity: theme === 'dark' ? 1 : 0,
                      rotate: theme === 'dark' ? 0 : -90
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute"
                  >
                    <Sun size={28} className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                  </motion.div>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      scale: theme === 'light' ? 1 : 0,
                      opacity: theme === 'light' ? 1 : 0,
                      rotate: theme === 'light' ? 0 : 90
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute"
                  >
                    <Moon size={28} className="text-primary drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                  </motion.div>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Dock Component */}
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
                  { icon: <User size={22} />, label: t('navbar', 'about'), isActive: activeSection === 'about', onClick: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
                  { icon: <Briefcase size={22} />, label: t('navbar', 'experience'), isActive: activeSection === 'experience', onClick: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }) },
                  { icon: <Code2 size={22} />, label: t('navbar', 'projects'), isActive: activeSection === 'work', onClick: () => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) },
                  { icon: <Mail size={22} />, label: t('navbar', 'contact'), isActive: activeSection === 'contact', onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
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
              {/* Floor reflection */}
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
