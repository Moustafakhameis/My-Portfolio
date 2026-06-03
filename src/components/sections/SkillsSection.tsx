import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';

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
      <div className="absolute top-2 left-2 w-10 h-10 bg-white rounded-full blur-[1px]" />
      <div className="absolute -top-2 left-8 w-16 h-16 bg-slate-50 rounded-full blur-[1px]" />
      <div className="absolute top-1 left-16 w-14 h-14 bg-white rounded-full blur-[1px]" />
      <div className="absolute top-6 left-0 w-32 h-8 bg-slate-50 rounded-full blur-[1px]" />
    </div>
  </motion.div>
);

const Aurora = () => (
  <div className="absolute inset-0 overflow-visible pointer-events-none z-0 mix-blend-screen opacity-100">
    <svg className="absolute w-[140%] h-[120%] top-[-10%] left-[-20%] overflow-visible" viewBox="0 0 1000 500" preserveAspectRatio="none">
      <defs>
        {/* filterUnits="userSpaceOnUse" completely prevents the hard clipping edge caused by object bounding boxes */}
        <filter id="aurora-blur-massive" filterUnits="userSpaceOnUse" x="-500" y="-500" width="2000" height="1500">
          <feGaussianBlur stdDeviation="80" />
        </filter>
        <filter id="aurora-blur-medium" filterUnits="userSpaceOnUse" x="-500" y="-500" width="2000" height="1500">
          <feGaussianBlur stdDeviation="35" />
        </filter>
        <filter id="aurora-blur-sharp" filterUnits="userSpaceOnUse" x="-500" y="-500" width="2000" height="1500">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        
        {/* Photorealistic Colors: High altitude faint purple blending into dense, intensely bright lime/emerald green at the bottom */}
        <linearGradient id="aurora-fill-1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="40%" stopColor="rgba(217, 70, 239, 0.15)" /> {/* Faint high-altitude purple */}
          <stop offset="70%" stopColor="rgba(20, 184, 166, 0.3)" />  {/* Mid-altitude teal */}
          <stop offset="100%" stopColor="rgba(16, 185, 129, 0.6)" /> {/* Low-altitude green */}
        </linearGradient>
        
        <linearGradient id="aurora-fill-2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="rgba(16, 185, 129, 0.1)" />  {/* Fade to transparent sky */}
          <stop offset="85%" stopColor="rgba(20, 184, 166, 0.5)" />  {/* Dense teal */}
          <stop offset="100%" stopColor="rgba(132, 204, 22, 0.7)" /> {/* Intense lime/yellow edge */}
        </linearGradient>
        
        <linearGradient id="aurora-fill-3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="60%" stopColor="rgba(16, 185, 129, 0.1)" />  {/* Fade */}
          <stop offset="90%" stopColor="rgba(16, 185, 129, 0.6)" />  {/* Vibrant green */}
          <stop offset="100%" stopColor="rgba(132, 204, 22, 0.9)" /> {/* Burning lime base */}
        </linearGradient>
      </defs>

      {/* Layer 1 - Deepest Background Arc (Massive blur) */}
      <motion.path
        d="M -100,0 L 1100,0 L 1100,200 Q 800,100 500,250 T -100,150 Z"
        fill="url(#aurora-fill-1)"
        filter="url(#aurora-blur-massive)"
        animate={{
          d: [
            "M -100,0 L 1100,0 L 1100,200 Q 800,100 500,250 T -100,150 Z",
            "M -100,0 L 1100,0 L 1100,150 Q 600,350 400,200 T -100,250 Z",
            "M -100,0 L 1100,0 L 1100,200 Q 800,100 500,250 T -100,150 Z"
          ]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Layer 2 - Middle Ground Wavy Curtain */}
      <motion.path
        d="M -100,0 L 1100,0 L 1100,150 Q 700,350 400,150 T -100,300 Z"
        fill="url(#aurora-fill-2)"
        filter="url(#aurora-blur-medium)"
        animate={{
          d: [
            "M -100,0 L 1100,0 L 1100,150 Q 700,350 400,150 T -100,300 Z",
            "M -100,0 L 1100,0 L 1100,300 Q 800,100 500,250 T -100,150 Z",
            "M -100,0 L 1100,0 L 1100,150 Q 700,350 400,150 T -100,300 Z"
          ]
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Intensely glowing sharp bottom edge for Layer 2 */}
      <motion.path
        d="M -100,150 Q 700,350 400,150 T -100,300"
        fill="none"
        stroke="rgba(132, 204, 22, 0.7)"
        strokeWidth="6"
        filter="url(#aurora-blur-sharp)"
        animate={{
          d: [
            "M -100,150 Q 700,350 400,150 T -100,300",
            "M -100,300 Q 800,100 500,250 T -100,150",
            "M -100,150 Q 700,350 400,150 T -100,300"
          ]
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Layer 3 - Foreground Dynamic Ribbon */}
      <motion.path
        d="M -100,0 L 1100,0 L 1100,250 Q 500,150 300,350 T -100,200 Z"
        fill="url(#aurora-fill-3)"
        filter="url(#aurora-blur-medium)"
        animate={{
          d: [
            "M -100,0 L 1100,0 L 1100,250 Q 500,150 300,350 T -100,200 Z",
            "M -100,0 L 1100,0 L 1100,150 Q 600,400 400,250 T -100,100 Z",
            "M -100,0 L 1100,0 L 1100,250 Q 500,150 300,350 T -100,200 Z"
          ]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Intensely glowing sharp bottom edge for Layer 3 */}
      <motion.path
        d="M -100,250 Q 500,150 300,350 T -100,200"
        fill="none"
        stroke="rgba(16, 185, 129, 1)"
        strokeWidth="10"
        filter="url(#aurora-blur-sharp)"
        animate={{
          d: [
            "M -100,250 Q 500,150 300,350 T -100,200",
            "M -100,150 Q 600,400 400,250 T -100,100",
            "M -100,250 Q 500,150 300,350 T -100,200"
          ]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  </div>
);

const ShootingStar = ({ top, left, delay, duration }: any) => (
  <motion.div
    className="absolute h-[1px] w-[100px] rounded-full pointer-events-none z-0"
    style={{
      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,1) 100%)',
      top: `${top}%`,
      left: `${left}%`,
      rotate: '35deg',
      opacity: 0,
      filter: 'drop-shadow(0 0 4px rgba(255,255,255,1))'
    }}
    animate={{ 
      x: [0, 800],
      y: [0, 800],
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

const HelixNebula = () => (
  <motion.div 
    className="absolute top-[20%] left-[80%] -translate-y-1/2 -translate-x-1/2 pointer-events-none z-0 opacity-80 mix-blend-screen w-[600px] h-[600px] md:w-[800px] md:h-[800px]"
    animate={{ rotate: 360 }}
    transition={{ duration: 400, repeat: Infinity, ease: "linear" }}
  >
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/NGC7293_%282004%29.jpg/1024px-NGC7293_%282004%29.jpg"
      alt="Helix Nebula"
      className="w-full h-full object-cover"
      style={{
        maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 65%)',
        WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 65%)',
        filter: 'contrast(1.2) brightness(1.1) saturate(1.2)'
      }}
    />
  </motion.div>
);

const SkillPill = ({ skill, orbitRadius, initialAngle, containerRef, resetKey }: any) => {
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
    angleRef.current += delta * 0.00015;
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

  const sizeClasses = {
    lg: 'text-xl px-8 py-4 font-bold glass',
    md: 'text-lg px-6 py-3 font-medium glass',
    sm: 'text-sm px-4 py-2 opacity-90 glass',
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
      dragElastic={0.1}
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
};

export const SkillsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [resetKey, setResetKey] = useState(0);
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number; color: string }[]>([]);
  const [clouds, setClouds] = useState<{ id: number; x: number; y: number; scale: number; duration: number; delay: number }[]>([]);
  const [meteors, setMeteors] = useState<{ id: number; top: number; left: number; delay: number; duration: number }[]>([]);
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(true);

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

  useEffect(() => {
    // Generate random stars for dark mode with realistic colors
    const newStars = Array.from({ length: 200 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      color: Math.random() > 0.85 ? '#93c5fd' : Math.random() > 0.85 ? '#fde047' : '#ffffff',
    }));
    setStars(newStars);

    // Generate shooting stars/meteors
    const newMeteors = Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      top: Math.random() * 50 - 20, 
      left: Math.random() * 80 - 40,
      delay: Math.random() * 15,
      duration: Math.random() * 0.8 + 1.2,
    }));
    setMeteors(newMeteors);

    // Generate MORE realistic clouds for light mode
    const newClouds = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100 - 10,
      y: Math.random() * 100 - 10,
      scale: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 50 + 50,
      delay: -(Math.random() * 50),
    }));
    setClouds(newClouds);
  }, []);

  const handleReset = () => {
    setResetKey(prev => prev + 1);
  };

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
      
      {/* Background Elements (Stars or Clouds) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isDark ? (
          <>
            {/* Deep Space Milky Way Dust */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" style={{
              background: 'radial-gradient(ellipse at 40% 50%, rgba(30, 27, 75, 0.6) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(88, 28, 135, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(14, 165, 233, 0.2) 0%, transparent 50%)',
              filter: 'blur(60px)'
            }} />
            
            <Aurora />
            <HelixNebula />
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full"
                style={{
                  backgroundColor: star.color,
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: star.size,
                  height: star.size,
                  opacity: 0.1,
                  boxShadow: `0 0 ${star.size * 2}px ${star.color}`
                }}
                animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.2, 1] }}
                transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
            {meteors.map((meteor) => (
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
          clouds.map((cloud) => (
            <RealisticCloud
              key={cloud.id}
              x={cloud.x}
              y={cloud.y}
              scale={cloud.scale}
              duration={cloud.duration}
              delay={cloud.delay}
            />
          ))
        )}
      </div>

      <div className="max-w-7xl mx-auto text-center mb-12 relative z-20 flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
          {t('skills', 'title')}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          {t('skills', 'description')}
        </p>
        
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-primary/20 text-foreground font-medium rounded-full transition-colors border border-border"
        >
          <RotateCcw size={16} />
          {t('skills', 'snapBack')}
        </button>
      </div>

      <div className="relative h-[800px] max-w-5xl mx-auto flex items-center justify-center">
        
        {/* The Core (Sun or Moon) */}
        <div className="absolute flex items-center justify-center z-0">
          <motion.div 
            className={cn("absolute w-48 h-48 rounded-full blur-[50px]", isDark ? "bg-primary/5" : "bg-yellow-400/20")}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {isDark ? (
            /* Moon Surface */
            <div 
              className="relative w-28 h-28 rounded-full overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)]"
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
                  filter: 'blur(8px)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Pulsing Heat Aura */}
              <motion.div 
                className="absolute w-[120px] h-[120px] rounded-full bg-yellow-400/40 blur-[15px]"
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* The Sun Core */}
              <div 
                className="relative w-28 h-28 rounded-full overflow-hidden z-10"
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
                    background: 'radial-gradient(circle at 50% 50%, transparent 0%, #ea580c 50%, transparent 100%)',
                    filter: 'blur(4px)'
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
          <div className="absolute w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full border border-primary/20 shadow-none dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] opacity-40" />
          <div className="absolute w-[500px] h-[500px] md:w-[540px] md:h-[540px] rounded-full border border-primary/10 opacity-60" />
          <div className="absolute w-[720px] h-[720px] md:w-[760px] md:h-[760px] rounded-full border border-primary/10 border-dashed opacity-60" />
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
              baseRadius = 140; // Inner
              groupSize = lgSkills.length;
              indexInGroup = lgSkills.indexOf(skill);
            } else if (skill.size === 'md') {
              baseRadius = 250; // Middle
              groupSize = mdSkills.length;
              indexInGroup = mdSkills.indexOf(skill);
            } else {
              baseRadius = 360; // Outer
              groupSize = smSkills.length;
              indexInGroup = smSkills.indexOf(skill);
            }

            const initialAngle = (indexInGroup / groupSize) * Math.PI * 2;
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            const orbitRadius = baseRadius + (isMobile ? -20 : 20);

            return (
              <SkillPill
                key={skill.name}
                skill={skill}
                orbitRadius={orbitRadius}
                initialAngle={initialAngle}
                containerRef={containerRef}
                resetKey={resetKey}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
