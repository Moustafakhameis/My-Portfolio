import React, { useRef, useState, useEffect, memo } from 'react';
import { motion, useAnimationFrame, useMotionValue, useInView } from 'framer-motion';
import { RotateCcw, Pause, Play } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';
import { MobileSkillsDashboard } from './MobileSkillsDashboard';

const skills = [
  { name: 'React 19', category: 'Frontend', size: 'lg' },
  { name: 'TypeScript', category: 'Language', size: 'lg' },
  { name: 'Tailwind v4', category: 'Styling', size: 'md' },
  { name: 'Next.js', category: 'Framework', size: 'lg' },
  { name: 'Framer Motion', category: 'Animation', size: 'md' },
  { name: 'Three.js', category: '3D', size: 'sm' },
  { name: 'JavaScript', category: 'Language', size: 'md' },
  { name: 'HTML/CSS', category: 'Frontend', size: 'md' },
  { name: 'GSAP', category: 'Animation', size: 'sm' },
  { name: 'GitHub', category: 'Tools', size: 'sm' },
  { name: 'Responsive Design', category: 'Concept', size: 'md' },
  { name: 'Bootstrap', category: 'Styling', size: 'sm' },
];

/* ─── CSS-only Stars (injected once) ─── */
const STAR_COUNT = 16;
const starData = Array.from({ length: STAR_COUNT }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  duration: Math.random() * 4 + 2,
  delay: Math.random() * 5,
  color: Math.random() > 0.85 ? '#93c5fd' : Math.random() > 0.85 ? '#fde047' : '#ffffff',
}));

const StarField = () => (
  <>
    <style>{`
      @keyframes twinkle {
        0%, 100% { opacity: 0.1; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.2); }
      }
    `}</style>
    {starData.map((star) => (
      <div
        key={star.id}
        className="absolute rounded-full"
        style={{
          backgroundColor: star.color,
          left: `${star.x}%`,
          top: `${star.y}%`,
          width: star.size,
          height: star.size,
          boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
          animation: `twinkle ${star.duration}s ${star.delay}s ease-in-out infinite`,
          willChange: 'opacity, transform',
        }}
      />
    ))}
  </>
);

/* ─── CSS-only Clouds (reduced 10 → 6) ─── */
const CLOUD_COUNT = 6;
const cloudData = Array.from({ length: CLOUD_COUNT }).map((_, i) => ({
  id: i,
  x: Math.random() * 100 - 10,
  y: Math.random() * 100 - 10,
  scale: Math.random() * 1.5 + 0.5,
  duration: Math.random() * 50 + 50,
  delay: -(Math.random() * 50),
}));

const RealisticCloud = ({ x, y, scale, delay, duration }: any) => (
  <motion.div
    className="absolute pointer-events-none z-0"
    style={{ left: `${x}%`, top: `${y}%`, opacity: 0.9 }}
    animate={{ x: [0, 150, 0] }}
    transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
  >
    <div 
      className="relative w-32 h-16 drop-shadow-lg" 
      style={{ transform: `scale(${scale})` }}
    >
      <div className="absolute top-2 left-2 w-10 h-10 bg-white rounded-full blur-[1px] blob-blur" />
      <div className="absolute -top-2 left-8 w-16 h-16 bg-slate-50 rounded-full blur-[1px] blob-blur" />
      <div className="absolute top-1 left-16 w-14 h-14 bg-white rounded-full blur-[1px] blob-blur" />
      <div className="absolute top-6 left-0 w-32 h-8 bg-slate-50 rounded-full blur-[1px] blob-blur" />
    </div>
  </motion.div>
);

/* ─── Transform-based Aurora (replaces expensive SVG path-d animation) ─── */
const Aurora = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 mix-blend-multiply dark:mix-blend-screen opacity-30 dark:opacity-100">
    {/* Layer 1 — wide, slow-moving, deeply blurred */}
    <motion.div
      className="absolute w-[160%] h-[80%] top-[-5%] left-[-30%] rounded-[50%]"
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(217,70,239,0.15) 40%, rgba(20,184,166,0.3) 70%, rgba(16,185,129,0.6) 100%)',
        filter: 'blur(30px)',
        willChange: 'transform',
      }}
      animate={{
        translateY: ['0%', '8%', '0%'],
        scaleX: [1, 1.08, 1],
        scaleY: [1, 0.92, 1],
      }}
      transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* Layer 2 — sharper, narrower accent band */}
    <motion.div
      className="absolute w-[140%] h-[60%] top-[5%] left-[-20%] rounded-[50%]"
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(16,185,129,0.1) 50%, rgba(20,184,166,0.5) 85%, rgba(132,204,22,0.7) 100%)',
        filter: 'blur(20px)',
        willChange: 'transform',
      }}
      animate={{
        translateY: ['0%', '-6%', '0%'],
        scaleX: [1, 0.95, 1],
        scaleY: [1, 1.1, 1],
      }}
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

/* ─── Meteors (reduced 4 → 2) ─── */
const METEOR_COUNT = 2;
const meteorData = Array.from({ length: METEOR_COUNT }).map((_, i) => ({
  id: i,
  top: Math.random() * 50 - 20,
  left: Math.random() * 80 - 40,
  delay: Math.random() * 15,
  duration: Math.random() * 0.8 + 1.2,
}));

const ShootingStar = ({ top, left, delay, duration }: any) => (
  <motion.div
    className="absolute h-[1px] w-[100px] rounded-full pointer-events-none z-0 bg-gradient-to-r from-transparent via-black/40 to-black dark:via-white/40 dark:to-white drop-shadow-[0_0_4px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_0_4px_rgba(255,255,255,1)]"
    style={{
      top: `${top}%`,
      left: `${left}%`,
      rotate: '35deg',
      opacity: 0,
    }}
    animate={{ 
      x: [0, 1000],
      y: [0, 1000],
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0]
    }}
    transition={{ 
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeIn'
    }}
  />
);

/* ─── HelixNebula (lazy-loaded img, only mounts when dark + inView) ─── */
const HelixNebula = () => (
  <motion.div 
    className="absolute top-[20%] left-[80%] -translate-y-1/2 -translate-x-1/2 pointer-events-none z-0 opacity-80 mix-blend-screen w-[600px] h-[600px] md:w-[800px] md:h-[800px]"
    animate={{ rotate: 360 }}
    transition={{ duration: 400, repeat: Infinity, ease: "linear" }}
  >
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/NGC7293_%282004%29.jpg/1024px-NGC7293_%282004%29.jpg"
      alt="Helix Nebula"
      loading="lazy"
      className="w-full h-full object-cover"
      style={{
        maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 65%)',
        WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 65%)',
        filter: 'contrast(1.2) brightness(1.1) saturate(1.2)'
      }}
    />
  </motion.div>
);

/* ─── SkillPill (memoized, early-return when paused + idle) ─── */
const SkillPill = memo(({ skill, orbitRadius, initialAngle, containerRef, resetKey, isPaused, isMobile }: any) => {
  const x = useMotionValue(Math.cos(initialAngle) * orbitRadius);
  const y = useMotionValue(Math.sin(initialAngle) * orbitRadius);
  const isInteracting = useRef(false);
  const isSnapping = useRef(false);
  const angleRef = useRef(initialAngle);

  useEffect(() => {
    if (resetKey > 0) {
      isInteracting.current = false;
      isSnapping.current = true;
    }
  }, [resetKey]);

  useAnimationFrame((time, delta) => {
    // Early-return: if paused AND not mid-drag AND not mid-snap, skip all work
    if (isPaused && !isInteracting.current && !isSnapping.current) return;

    if (!isPaused) {
      angleRef.current += delta * 0.00015;
    }
    const idealX = Math.cos(angleRef.current) * orbitRadius;
    const idealY = Math.sin(angleRef.current) * orbitRadius;

    if (isInteracting.current) return;

    if (isSnapping.current) {
      const currentX = x.get();
      const currentY = y.get();
      
      const dx = idealX - currentX;
      const dy = idealY - currentY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 2) {
        isSnapping.current = false;
        x.set(idealX);
        y.set(idealY);
      } else {
        const lerpFactor = 1 - Math.exp(-delta * 0.01); 
        x.set(currentX + dx * lerpFactor);
        y.set(currentY + dy * lerpFactor);
      }
    } else {
      x.set(idealX);
      y.set(idealY);
    }
  });

  // Disable backdrop-blur on mobile for performance (point 6)
  const sizeClasses = {
    lg: `text-base md:text-xl px-5 py-2.5 md:px-8 md:py-4 font-bold ${isMobile ? 'bg-card/70 border-border/50' : 'glass'}`,
    md: `text-sm md:text-lg px-4 py-2 md:px-6 md:py-3 font-medium ${isMobile ? 'bg-card/70 border-border/50' : 'glass'}`,
    sm: `text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 opacity-90 ${isMobile ? 'bg-card/70 border-border/50' : 'glass'}`,
  };

  return (
    <motion.div
      className={`absolute rounded-full cursor-grab active:cursor-grabbing whitespace-nowrap flex flex-col items-center justify-center border shadow-xl transition-colors hover:!bg-primary hover:!text-primary-foreground hover:!border-primary hover:!shadow-[0_0_20px_var(--color-primary)] ${sizeClasses[skill.size as keyof typeof sizeClasses]}`}
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        scale: 1.1, 
        zIndex: 50
      }}
      drag
      dragConstraints={containerRef}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      onDragStart={() => { isInteracting.current = true; }}
    >
      <span className="font-semibold tracking-wide">{skill.name}</span>
      {skill.size === 'lg' && (
        <span className="text-[10px] uppercase tracking-wider opacity-80 mt-1 block">
          {skill.category}
        </span>
      )}
    </motion.div>
  );
});

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
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
      setIsDesktop(window.innerWidth > 1024);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-card/40 backdrop-blur-md border border-border/50 hover:border-primary/50 hover:bg-primary/10 text-foreground font-semibold rounded-full transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            <RotateCcw size={18} className="group-hover:-rotate-180 transition-transform duration-500 ease-out text-primary" />
            <span className="relative z-10">{t('skills', 'snapBack')}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPaused(!isPaused)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-card/40 backdrop-blur-md border border-border/50 hover:border-primary/50 hover:bg-primary/10 text-foreground font-semibold rounded-full transition-all duration-300 relative overflow-hidden group"
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
