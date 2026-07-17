import React, { useRef, useState, useEffect, memo } from 'react';
import { motion, useAnimationFrame, useMotionValue, useInView } from 'framer-motion';
import { RotateCcw, Pause, Play } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';
import { cn } from '../../../utils/cn';
import { MobileSkillsDashboard } from './MobileSkillsDashboard';

import { 
  StarField, 
  RealisticCloud, 
  cloudData, 
  Aurora, 
  meteorData, 
  ShootingStar, 
  HelixNebula 
} from './BackgroundElements';
import { SkillPill } from './SkillPill';
import { skills } from '../../../data/skillsData';

export const SkillsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [resetKey, setResetKey] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const isInView = useInView(containerRef, { margin: "200px" });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const checkScreen = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
        setIsDesktop(window.innerWidth > 1024);
      }, 150);
    };
    // Run immediately on mount (no debounce for initial check)
    setIsMobile(window.innerWidth < 768);
    setIsDesktop(window.innerWidth > 1024);
    window.addEventListener('resize', checkScreen);
    return () => {
      window.removeEventListener('resize', checkScreen);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    // Robust check for dark mode
    const checkDark = () => document.documentElement.classList.contains('dark');
    setIsDark(checkDark());

    const observer = new MutationObserver(() => {
      setIsDark(checkDark());
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, [theme]);

  const handleReset = () => {
    setResetKey(prev => prev + 1);
  };

  /* ─── MOBILE / TABLET: Show premium dashboard ─── */
  if (!isDesktop) {
    return (
      <section
        className="py-20 px-6 overflow-hidden relative transition-all duration-1000"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, var(--background) 0%, #020617 15%, #0f172a 50%, var(--background) 100%)'
            : 'linear-gradient(180deg, var(--background) 0%, #38bdf8 15%, #e0f2fe 50%, var(--background) 100%)'
        }}
        ref={containerRef}
      >
        <MobileSkillsDashboard />
      </section>
    );
  }

  /* ─── DESKTOP: Keep the original Interactive Skills Galaxy ─── */
  return (
    <section 
      className="py-32 px-6 overflow-hidden relative transition-all duration-1000" 
      style={{
        background: isDark 
          ? 'linear-gradient(180deg, var(--background) 0%, #020617 15%, #0f172a 50%, var(--background) 100%)' 
          : 'linear-gradient(180deg, var(--background) 0%, #38bdf8 15%, #e0f2fe 50%, var(--background) 100%)'
      }}
      ref={containerRef}
    >
      
      {/* Background Elements — fully unmount when off-screen (point 1) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isInView && (
          isDark ? (
            <>
              {/* Deep Space Milky Way Dust */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" style={{
                background: 'radial-gradient(ellipse at 40% 50%, rgba(30, 27, 75, 0.6) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(88, 28, 135, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(14, 165, 233, 0.2) 0%, transparent 50%)'
              }} />
              
              <Aurora />
              <HelixNebula />
              <StarField />
              {meteorData.map((meteor) => (
                <ShootingStar 
                  key={`meteor-${meteor.id}`}
                  top={meteor.top}
                  left={meteor.left}
                  delay={meteor.delay}
                  duration={meteor.duration}
                />
              ))}
            </>
          ) : (
            cloudData.map((cloud) => (
              <RealisticCloud
                key={cloud.id}
                x={cloud.x}
                y={cloud.y}
                scale={cloud.scale}
                duration={cloud.duration}
                delay={cloud.delay}
              />
            ))
          )
        )}
      </div>

      <div className="max-w-7xl mx-auto text-center mb-12 relative z-20 flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 flex flex-wrap justify-center gap-x-2 gap-y-1">
          {t('skills', 'title').split(' ').map((word: string, i: number, arr: string[]) => {
            const isLast = i === arr.length - 1;
            return (
              <span 
                key={i} 
                className={isLast ? "text-transparent bg-clip-text bg-gradient-to-r from-primary via-fuchsia-500 to-pink-500 drop-shadow-[0_0_20px_rgba(217,70,239,0.3)] pr-2 pb-3" : "text-foreground"}
              >
                {word}
              </span>
            );
          })}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          {t('skills', 'description')}
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-card/95 border border-border/50 hover:border-primary/50 hover:bg-primary/10 text-foreground font-semibold rounded-full transition-all duration-300 relative overflow-hidden group transform-gpu"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            <RotateCcw size={18} className="group-hover:-rotate-180 transition-transform duration-500 ease-out text-primary" />
            <span className="relative z-10">{t('skills', 'snapBack')}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPaused(!isPaused)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-card/95 border border-border/50 hover:border-primary/50 hover:bg-primary/10 text-foreground font-semibold rounded-full transition-all duration-300 relative overflow-hidden group transform-gpu"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            <motion.div animate={{ scale: isPaused ? [1, 1.2, 1] : 1 }} transition={{ duration: 1.5, repeat: isPaused ? Infinity : 0, ease: "easeInOut" }}>
              {isPaused ? <Play size={18} className="text-primary drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" fill="currentColor" /> : <Pause size={18} className="text-primary" />}
            </motion.div>
            <span className="relative z-10">{isPaused ? t('skills', 'play') : t('skills', 'pause')}</span>
          </motion.button>
        </div>
      </div>

      <div className="relative h-[500px] md:h-[800px] max-w-5xl mx-auto flex items-center justify-center">
        
        {/* The Core (Sun or Moon) */}
        <div className="absolute flex items-center justify-center z-0">
          <motion.div 
            className={cn("absolute w-32 h-32 md:w-48 md:h-48 rounded-full blur-[50px]", isDark ? "bg-primary/5" : "bg-yellow-400/20")}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {isDark ? (
            /* Moon Surface */
            <div 
              className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)]"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #9ca3af, #1f2937)',
                boxShadow: 'inset -15px -15px 30px rgba(0,0,0,0.4), inset 10px 10px 20px rgba(255,255,255,0.6)'
              }}
            >
              <div className="absolute w-8 h-8 rounded-full top-3 left-4" style={{ background: 'rgba(0,0,0,0.15)', boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.2), inset -1px -1px 2px rgba(255,255,255,0.3)' }} />
              <div className="absolute w-4 h-4 rounded-full top-8 right-6" style={{ background: 'rgba(0,0,0,0.1)', boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.2), inset -1px -1px 2px rgba(255,255,255,0.2)' }} />
              <div className="absolute w-10 h-10 rounded-full bottom-3 left-5" style={{ background: 'rgba(0,0,0,0.12)', boxShadow: 'inset 3px 3px 8px rgba(0,0,0,0.3), inset -2px -2px 4px rgba(255,255,255,0.2)' }} />
              <div className="absolute w-5 h-5 rounded-full bottom-5 right-4" style={{ background: 'rgba(0,0,0,0.18)', boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.3), inset -1px -1px 2px rgba(255,255,255,0.2)' }} />
              <div className="absolute w-3 h-3 rounded-full top-12 left-12" style={{ background: 'rgba(0,0,0,0.2)', boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.3)' }} />
            </div>
          ) : (
            /* Realistic Sun */
            <div className="relative flex items-center justify-center">
              {/* Rotating Solar Flares */}
              <motion.div 
                className="absolute w-[150px] h-[150px] rounded-full"
                style={{
                  background: 'repeating-conic-gradient(from 0deg, rgba(253, 224, 71, 0.4) 0deg 15deg, transparent 15deg 30deg)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Pulsing Heat Aura */}
              <motion.div 
                className="absolute w-[120px] h-[120px] rounded-full bg-yellow-400/40 blur-[15px] blob-blur"
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* The Sun Core */}
              <div 
                className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden z-10"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #fef08a 25%, #f59e0b 65%, #ea580c 100%)',
                  boxShadow: '0 0 30px rgba(250, 204, 21, 0.6), inset -12px -12px 20px rgba(234, 88, 12, 0.5), inset 10px 10px 20px rgba(255, 255, 255, 0.9)'
                }}
              >
                {/* Subtle Sunspots for Texture */}
                <div className="absolute w-full h-full opacity-30" style={{ background: 'radial-gradient(circle at 70% 80%, rgba(194, 65, 12, 0.4) 0%, transparent 40%), radial-gradient(circle at 20% 60%, rgba(194, 65, 12, 0.3) 0%, transparent 30%)' }} />
                
                {/* Surface Plasma Swirl */}
                <motion.div 
                  className="absolute w-40 h-40 -top-6 -left-6 rounded-full opacity-20"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, transparent 0%, #ea580c 50%, transparent 100%)'
                  }}
                  animate={{ rotate: -360, scale: [1, 1.1, 1] }}
                  transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Orbital Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="absolute w-[180px] h-[180px] md:w-[320px] md:h-[320px] rounded-full border border-primary/20 shadow-none dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] opacity-40" />
          <div className="absolute w-[280px] h-[280px] md:w-[540px] md:h-[540px] rounded-full border border-primary/10 opacity-60" />
          <div className="absolute w-[380px] h-[380px] md:w-[760px] md:h-[760px] rounded-full border border-primary/10 border-dashed opacity-60" />
        </div>

        {/* Skills wrapper (non-rotating) */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {skills.map((skill) => {
            const lgSkills = skills.filter((s) => s.size === 'lg');
            const mdSkills = skills.filter((s) => s.size === 'md');
            const smSkills = skills.filter((s) => s.size === 'sm');

            let baseRadius = 0;
            let groupSize = 1;
            let indexInGroup = 0;

            if (skill.size === 'lg') {
              baseRadius = isMobile ? 90 : 160; // Inner
              groupSize = lgSkills.length;
              indexInGroup = lgSkills.indexOf(skill);
            } else if (skill.size === 'md') {
              baseRadius = isMobile ? 120 : 270; // Middle
              groupSize = mdSkills.length;
              indexInGroup = mdSkills.indexOf(skill);
            } else {
              baseRadius = isMobile ? 150 : 380; // Outer
              groupSize = smSkills.length;
              indexInGroup = smSkills.indexOf(skill);
            }

            const initialAngle = (indexInGroup / groupSize) * Math.PI * 2;
            const orbitRadius = baseRadius;

            return (
              <SkillPill
                key={skill.name}
                skill={skill}
                orbitRadius={orbitRadius}
                initialAngle={initialAngle}
                containerRef={containerRef}
                resetKey={resetKey}
                isPaused={isPaused || !isInView}
                isMobile={isMobile}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
