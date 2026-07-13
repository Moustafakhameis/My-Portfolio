import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Sun, Moon } from 'lucide-react';

interface NavLink {
  name: string;
  href: string;
}

interface MobileNavProps {
  navLinks: NavLink[];
  activeSection: string;
  theme: string;
  toggleTheme: () => void;
  language: string;
  toggleLanguage: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (v: boolean) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  navLinks, activeSection, theme, toggleTheme, language, toggleLanguage, isMobileMenuOpen, setIsMobileMenuOpen
}) => {
  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.3 } }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 bg-background flex flex-col justify-center items-center md:hidden z-40 overflow-hidden pt-24"
        >
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
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    const targetId = link.href.substring(1);
                    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', link.href);
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", damping: 24 } }
                  }}
                  className="relative group px-8 py-2"
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 z-[1] pointer-events-none"
                      style={{
                        background: 'radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.2) 0%, transparent 60%)',
                      }}
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}

                  {isActive ? (
                    <motion.span
                      className="relative z-10 text-4xl font-black tracking-widest uppercase block text-center"
                      style={{
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                      animate={{ 
                        backgroundImage: theme === 'light'
                          ? 'linear-gradient(90deg, #9333ea, #db2777, #9333ea, #fff, #9333ea, #db2777, #9333ea)'
                          : 'linear-gradient(90deg, #c084fc, #e879f9, #f0abfc, #fff, #f0abfc, #e879f9, #c084fc)',
                        filter: theme === 'light'
                          ? 'drop-shadow(0 0 0px rgba(168,85,247,0))'
                          : 'drop-shadow(0 0 15px rgba(168,85,247,0.5))',
                        backgroundPosition: ['0% center', '200% center'] 
                      }}
                      transition={{ 
                        backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' },
                        backgroundImage: { duration: 0.5 },
                        filter: { duration: 0.5 }
                      }}
                    >
                      {link.name}
                    </motion.span>
                  ) : (
                    <span className="relative z-10 text-4xl font-black tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 block text-center">
                      {link.name}
                    </span>
                  )}

                  {isActive && (
                    <>
                      <motion.div
                        layoutId="mobile-active-bar"
                        className="absolute -bottom-2 left-[10%] right-[10%] h-[3px] rounded-full z-0"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.9), rgba(192,132,252,1), rgba(168,85,247,0.9), transparent)',
                          boxShadow: '0 0 12px rgba(168,85,247,0.7), 0 0 24px rgba(168,85,247,0.35)',
                        }}
                      />
                      <motion.div
                        layoutId="mobile-active-star"
                        className="absolute -bottom-[14px] left-1/2 -translate-x-1/2 z-10"
                        style={{
                          width: 14,
                          height: 14,
                          clipPath: 'polygon(50% 0%, 61% 35%, 100% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 0% 35%, 39% 35%)',
                        }}
                        animate={{
                          background: theme === 'light' ? '#9333ea' : '#fff',
                          filter: theme === 'light'
                            ? 'drop-shadow(0px 0px 2px #9333ea66) drop-shadow(0px 0px 0px #9333ea00)'
                            : 'drop-shadow(0px 0px 5px #a855f7ff) drop-shadow(0px 0px 12px #a855f7cc)',
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </>
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
  );
};
