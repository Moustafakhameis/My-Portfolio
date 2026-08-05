import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useIsTouchDevice } from './useIsTouchDevice';

const InteractiveEyes = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 20 });

  const pupilX = useTransform(smoothX, [-1, 1], [-3.5, 3.5]);
  const pupilY = useTransform(smoothY, [-1, 1], [-3.5, 3.5]);
  const eyebrowLeftY = useTransform(smoothY, [-1, 1], [0, -3]);
  const eyebrowRightY = useTransform(smoothY, [-1, 1], [0, -3]);
  const eyebrowLeftRotate = useTransform(smoothX, [-1, 1], [-5, 15]);
  const eyebrowRightRotate = useTransform(smoothX, [-1, 1], [-15, 5]);

  return (
    <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-pink-500/30 border border-white/20 shadow-[0_0_25px_rgba(217,70,239,0.5)] ring-2 ring-primary/40 backdrop-blur-md pt-2">
      <div className="flex gap-1.5 relative">
        {/* Floating Eyebrows */}
        <motion.div 
          className="absolute -top-3 -left-1 w-5 h-1.5 bg-[#1a1525] rounded-full shadow-sm z-10"
          style={{ y: eyebrowLeftY, rotate: eyebrowLeftRotate }}
        />
        <motion.div 
          className="absolute -top-3 -right-1 w-5 h-1.5 bg-[#1a1525] rounded-full shadow-sm z-10"
          style={{ y: eyebrowRightY, rotate: eyebrowRightRotate }}
        />

        {/* Left Eye */}
        <div className="w-5 h-[28px] bg-gradient-to-b from-white to-gray-200 rounded-[12px] relative shadow-[inset_0_4px_6px_rgba(0,0,0,0.5),0_2px_4px_rgba(0,0,0,0.3)] overflow-hidden">
          {/* Iris & Pupil */}
          <motion.div 
            className="absolute top-1.5 left-[3px] w-3.5 h-3.5 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] flex items-center justify-center"
            style={{ x: pupilX, y: pupilY }}
          >
            <div className="w-1.5 h-1.5 bg-black rounded-full relative">
              <div className="absolute -top-[1px] -right-[1px] w-[2px] h-[2px] bg-white rounded-full opacity-90 shadow-[0_0_2px_rgba(255,255,255,1)]" />
              <div className="absolute bottom-[0.5px] left-[0.5px] w-[1px] h-[1px] bg-white rounded-full opacity-70" />
            </div>
          </motion.div>
          {/* Blinking Eyelid Overlay */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-[#1a1525] origin-top border-b border-primary/30 shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
            animate={{ scaleY: [0, 0, 1, 0, 0] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1], ease: "linear", repeatDelay: Math.random() * 2 }}
          />
        </div>
        
        {/* Right Eye */}
        <div className="w-5 h-[28px] bg-gradient-to-b from-white to-gray-200 rounded-[12px] relative shadow-[inset_0_4px_6px_rgba(0,0,0,0.5),0_2px_4px_rgba(0,0,0,0.3)] overflow-hidden">
          {/* Iris & Pupil */}
          <motion.div 
            className="absolute top-1.5 left-[3px] w-3.5 h-3.5 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] flex items-center justify-center"
            style={{ x: pupilX, y: pupilY }}
          >
            <div className="w-1.5 h-1.5 bg-black rounded-full relative">
              <div className="absolute -top-[1px] -right-[1px] w-[2px] h-[2px] bg-white rounded-full opacity-90 shadow-[0_0_2px_rgba(255,255,255,1)]" />
              <div className="absolute bottom-[0.5px] left-[0.5px] w-[1px] h-[1px] bg-white rounded-full opacity-70" />
            </div>
          </motion.div>
          {/* Blinking Eyelid Overlay */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-[#1a1525] origin-top border-b border-primary/30 shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
            animate={{ scaleY: [0, 0, 1, 0, 0] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1], ease: "linear", repeatDelay: Math.random() * 2 }}
          />
        </div>
      </div>
    </div>
  );
};

let hasVisitedProjectsGlobal = false;

const HolographicTooltip = ({ clickCount, tooltipPositionClass, arrowPositionClass, t }: { clickCount: number, tooltipPositionClass: string, arrowPositionClass: string, t: any }) => {
  const isTouchDevice = useIsTouchDevice();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(smoothY, [0, 1], [15, -15]);
  const rotateY = useTransform(smoothX, [0, 1], [-15, 15]);
  
  // Glare position based on mouse
  const glareX = useTransform(smoothX, [0, 1], [-100, 200]);
  const glareY = useTransform(smoothY, [0, 1], [-100, 200]);

  return (
    <motion.div
      key={clickCount}
      initial={{ opacity: 0, y: tooltipPositionClass.includes('bottom') ? 20 : -20, scale: 0.8, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: tooltipPositionClass.includes('bottom') ? 10 : -10, scale: 0.9, filter: "blur(4px)" }}
      transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.8 }}
      className={`absolute ${tooltipPositionClass} w-[92vw] max-w-[340px] md:max-w-[420px] z-[100] pointer-events-none perspective-[1000px]`}
    >
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative group"
      >
        {/* Glowing Animated Backdrop */}
        <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-primary via-fuchsia-500 to-pink-500 opacity-40 blur-xl group-hover:opacity-60 transition duration-1000 animate-pulse" style={{ transform: "translateZ(-10px)" }} />
        
        {/* Main Tooltip Container */}
        <div className="relative p-4 md:p-6 rounded-2xl bg-background/90 backdrop-blur-2xl border border-white/20 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.4)] overflow-hidden" style={{ transform: "translateZ(0px)" }}>
          {/* Holographic Glare Overlay */}
          {!isTouchDevice && (
            <motion.div 
              className="absolute inset-0 pointer-events-none opacity-50 mix-blend-overlay"
              style={{ 
                background: "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 50%)",
                x: glareX,
                y: glareY,
                scale: 2
              }} 
            />
          )}

          {clickCount === 1 && (
            <div className="relative flex flex-col gap-3 text-start z-10" style={{ transform: "translateZ(20px)" }}>
              <div className="flex items-center gap-2 md:gap-3">
                <InteractiveEyes />
                <span className="text-lg sm:text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary via-fuchsia-400 to-pink-500 drop-shadow-sm">
                  {t('tooltip', 'holdOn')}
                </span>
              </div>
              <div className="h-[1px] w-full bg-gradient-to-r from-primary/30 to-transparent rtl:bg-gradient-to-l rtl:from-primary/30 rtl:to-transparent" />
              <span className="text-[13px] sm:text-sm md:text-base font-medium text-foreground/90 leading-relaxed tracking-wide">
                {t('tooltip', 'holdOnMessage')}
                <br/><br/>
                <span className="text-foreground/70 italic">{t('tooltip', 'holdOnNote')}</span>
              </span>
            </div>
          )}
          
          {clickCount === 2 && (
            <div className="relative flex flex-col gap-3 text-start z-10" style={{ transform: "translateZ(20px)" }}>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border border-white/20 shadow-[0_0_25px_rgba(168,85,247,0.5)] ring-2 ring-indigo-500/40 backdrop-blur-md overflow-hidden shrink-0">
                  <motion.div
                    className="relative flex items-center justify-center z-10 w-full h-full"
                    animate={{ y: [0, -3, 0], rotate: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="text-2xl md:text-3xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">🚀</span>
                    {/* Exhaust flame */}
                    <motion.div 
                      className="absolute -bottom-4 w-4 h-6 bg-gradient-to-t from-transparent via-orange-500 to-yellow-300 rounded-full blur-[2px] -z-10"
                      animate={{ scaleY: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                  {/* Stars zooming past */}
                  <motion.div className="absolute w-1 h-3 bg-white/60 rounded-full left-3" animate={{ y: [-30, 60], opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear", delay: 0.1 }} />
                  <motion.div className="absolute w-1.5 h-4 bg-white/80 rounded-full right-4" animate={{ y: [-30, 60], opacity: [0, 1, 0] }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear", delay: 0.4 }} />
                  <motion.div className="absolute w-1 h-2 bg-white/40 rounded-full left-7" animate={{ y: [-30, 60], opacity: [0, 1, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "linear", delay: 0.7 }} />
                </div>
                <span className="text-lg sm:text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary via-fuchsia-400 to-pink-500 drop-shadow-sm">
                  {t('tooltip', 'lastStop')}
                </span>
              </div>
              <div className="h-[1px] w-full bg-gradient-to-r from-primary/30 to-transparent rtl:bg-gradient-to-l rtl:from-primary/30 rtl:to-transparent" />
              <span className="text-[13px] sm:text-sm md:text-base font-medium text-foreground/80 leading-relaxed tracking-wide">
                {t('tooltip', 'lastStopMessage')}
              </span>
            </div>
          )}
        </div>
        
        {/* Tooltip Arrow */}
        <div className={`absolute ${arrowPositionClass} w-5 h-5 bg-background border-primary/20 rotate-45 shadow-lg ${tooltipPositionClass.includes('bottom') ? '-bottom-2.5 border-b border-r' : '-top-2.5 border-t border-l'}`} style={{ transform: "translateZ(-1px)" }} />
      </motion.div>
    </motion.div>
  );
};

let globalClickCount = 0;
let globalActiveInstanceId: number | null = null;
let globalHasVisitedProjects = false;
let globalTimeoutRef: NodeJS.Timeout | null = null;
const listeners = new Set<() => void>();

function updateGlobal(updater: () => void) {
  updater();
  listeners.forEach(fn => fn());
}

let nextInstanceId = 1;

export const useSmartWorkNavigation = (
  tooltipPositionClass: string = "bottom-[110%] left-1/2 -translate-x-1/2",
  activeSection: string = "",
  arrowPositionClass: string = "left-1/2 -translate-x-1/2"
) => {
  const { t } = useLanguage();
  const [instanceId] = useState(() => nextInstanceId++);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const l = () => setTick(t => t + 1);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);

  useEffect(() => {
    if (activeSection === 'work') {
      updateGlobal(() => {
        globalHasVisitedProjects = true;
      });
    }
  }, [activeSection]);

  const handleClick = (e?: React.MouseEvent): boolean => {
    if (e) e.preventDefault();
    if (globalTimeoutRef) clearTimeout(globalTimeoutRef);

    if (activeSection === 'work' || globalHasVisitedProjects) {
      updateGlobal(() => {
        globalHasVisitedProjects = true;
        globalActiveInstanceId = null;
        globalClickCount = 0;
      });
      const target = document.getElementById('work');
      if (target) {
        // @ts-ignore
        if (window.lenis) {
          // @ts-ignore
          window.lenis.scrollTo(target);
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return true;
    }

    if (globalClickCount === 0) {
      updateGlobal(() => {
        globalClickCount = 1;
        globalActiveInstanceId = instanceId;
      });
      globalTimeoutRef = setTimeout(() => {
        updateGlobal(() => {
          globalActiveInstanceId = null;
          globalClickCount = 0;
        });
      }, 60000);
      return false;
    } else if (globalClickCount === 1) {
      updateGlobal(() => {
        globalClickCount = 2;
        globalActiveInstanceId = instanceId;
      });
      globalTimeoutRef = setTimeout(() => {
        updateGlobal(() => {
          globalActiveInstanceId = null;
        });
      }, 60000);
      return false;
    } else {
      updateGlobal(() => {
        globalHasVisitedProjects = true;
        globalActiveInstanceId = null;
      });
      const target = document.getElementById('work');
      if (target) {
        // @ts-ignore
        if (window.lenis) {
          // @ts-ignore
          window.lenis.scrollTo(target);
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return true;
    }
  };

  const showTooltip = globalActiveInstanceId === instanceId;

  const tooltipElement = (
    <AnimatePresence mode="wait">
      {showTooltip && (
        <HolographicTooltip clickCount={globalClickCount} tooltipPositionClass={tooltipPositionClass} arrowPositionClass={arrowPositionClass} t={t} />
      )}
    </AnimatePresence>
  );

  return { handleClick, tooltipElement };
};
