import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Languages, Sun, Moon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface NavLink {
  name: string;
  href: string;
}

interface DesktopNavProps {
  navLinks: NavLink[];
  activeSection: string;
  theme: string;
  toggleTheme: () => void;
  language: string;
  toggleLanguage: () => void;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({
  navLinks, activeSection, theme, toggleTheme, language, toggleLanguage
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", damping: 24 } }
  };

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="hidden md:flex items-center gap-2"
    >
      <div className="flex items-center gap-1" onMouseLeave={() => setHoveredIndex(null)}>
        {navLinks.map((link, i) => {
          const isActive = activeSection === link.href.substring(1);
          return (
            <motion.a
              key={link.name}
              variants={itemAnim}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                const targetId = link.href.substring(1);
                document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', link.href);
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              className={cn(
                "relative px-5 py-2 text-[13px] tracking-[0.06em] uppercase transition-colors duration-300",
                isActive ? "font-bold" : "font-medium text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive ? (
                <motion.span
                  className="relative z-10"
                  style={{
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  animate={{ 
                    backgroundImage: theme === 'light' 
                      ? 'linear-gradient(90deg, #9333ea, #db2777, #9333ea, #db2777, #9333ea)' 
                      : 'linear-gradient(90deg, #c084fc, #e879f9, #f0abfc, #e879f9, #c084fc)',
                    backgroundPosition: ['0% center', '200% center'] 
                  }}
                  transition={{ 
                    backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' },
                    backgroundImage: { duration: 0.5 }
                  }}
                >
                  {link.name}
                </motion.span>
              ) : (
                <span className="relative z-10 transition-colors duration-300">
                  {link.name}
                </span>
              )}
              
              {isActive && (
                <motion.div
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full z-0"
                  style={{
                    border: theme === 'light'
                      ? '1px solid rgba(168,85,247,0.2)'
                      : '1px solid rgba(168,85,247,0.4)',
                  }}
                  animate={{
                    background: theme === 'light' 
                      ? 'linear-gradient(135deg, rgba(168,85,247,0.05) 0%, rgba(139,92,246,0.02) 100%)'
                      : 'linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(139,92,246,0.08) 100%)',
                    boxShadow: theme === 'light'
                      ? '0 0 10px -4px rgba(168,85,247,0)' 
                      : '0 0 20px -4px rgba(168,85,247,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}

              {hoveredIndex === i && !isActive && (
                <motion.div
                  layoutId="nav-hover-pill"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
                  className="absolute inset-0 rounded-full z-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(139,92,246,0.04) 100%)',
                    border: '1px solid rgba(168,85,247,0.12)',
                  }}
                />
              )}

              {isActive && (
                <>
                  <motion.div
                    layoutId="nav-active-bar"
                    className="absolute -bottom-1 left-[15%] right-[15%] h-[2px] rounded-full z-0"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.9), rgba(192,132,252,1), rgba(168,85,247,0.9), transparent)',
                      boxShadow: '0 0 10px rgba(168,85,247,0.6), 0 0 20px rgba(168,85,247,0.25)',
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                  <motion.div
                    layoutId="nav-active-star"
                    className="absolute -bottom-[8px] left-1/2 -translate-x-1/2 z-10"
                    style={{
                      width: 12,
                      height: 12,
                      clipPath: 'polygon(50% 0%, 61% 35%, 100% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 0% 35%, 39% 35%)',
                    }}
                    animate={{
                      background: theme === 'light' ? '#9333ea' : '#fff',
                      filter: theme === 'light' 
                        ? 'drop-shadow(0px 0px 2px #9333ea66) drop-shadow(0px 0px 0px #9333ea00)' 
                        : 'drop-shadow(0px 0px 4px #a855f7ff) drop-shadow(0px 0px 10px #a855f7b3)',
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </>
              )}
            </motion.a>
          );
        })}
      </div>
      
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
  );
};
