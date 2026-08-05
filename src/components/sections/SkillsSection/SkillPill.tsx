import React, { useRef, useEffect, memo } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useIsTouchDevice } from '../../../hooks/useIsTouchDevice';

export const SkillPill = memo(({ skill, orbitRadius, initialAngle, containerRef, resetKey, isPaused, isMobile }: any) => {
  const x = useMotionValue(Math.cos(initialAngle) * orbitRadius);
  const y = useMotionValue(Math.sin(initialAngle) * orbitRadius);
  const isInteracting = useRef(false);
  const isSnapping = useRef(false);
  const angleRef = useRef(initialAngle);
  const isTouchDevice = useIsTouchDevice();

  useEffect(() => {
    if (resetKey > 0) {
      // Only snap back pills that were actually dragged out of orbit
      if (isInteracting.current) {
        isInteracting.current = false;
        isSnapping.current = true;
      }
      x.stop();
      y.stop();
    }
  }, [resetKey]);

  useAnimationFrame((time, delta) => {
    if (isPaused && !isInteracting.current && !isSnapping.current) return;

    if (!isPaused) {
      angleRef.current += delta * 0.00015;
    }
    
    // Calculate orbital position
    const baseIdealX = Math.cos(angleRef.current) * orbitRadius;
    const baseIdealY = Math.sin(angleRef.current) * orbitRadius;

    // Add organic vertical "bobbing" to simulate 3D anti-gravity floating.
    // We use the initialAngle to offset the sine wave phase, so they don't all bob at the same time.
    const bobOffset = Math.sin(time / 1000 + initialAngle * 5) * 12; 
    
    const idealX = baseIdealX;
    const idealY = baseIdealY + bobOffset;

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
    lg: `px-6 py-3 md:px-8 md:py-3.5`,
    md: `px-5 py-2.5 md:px-6 md:py-3`,
    sm: `px-4 py-2 md:px-5 md:py-2.5`,
  };

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-0 h-0 z-10 pointer-events-auto"
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      whileHover={isTouchDevice ? undefined : { 
        scale: 1.1, 
        zIndex: 50, 
        transition: { type: "spring", stiffness: 400, damping: 10 } 
      }}
      whileTap={{ scale: 0.95 }}
      drag
      dragConstraints={containerRef}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      onDragStart={() => { isInteracting.current = true; }}
    >
      <div 
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full cursor-grab active:cursor-grabbing whitespace-nowrap flex flex-col items-center justify-center transition-[background-color,border-color,box-shadow] duration-500 ease-out bg-[#f0f0f3]/95 dark:bg-[#0a0a0b]/90 border border-black/5 dark:border-white/10 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:!bg-primary/90 dark:hover:!bg-primary hover:!border-primary/50 dark:hover:!border-primary/80 hover:shadow-[0_16px_40px_-12px_var(--color-primary),inset_0_1px_1px_rgba(255,255,255,0.4)] active:!bg-primary/90 dark:active:!bg-primary active:!border-primary/50 dark:active:!border-primary/80 group transform-gpu will-change-transform ${sizeClasses[skill.size as keyof typeof sizeClasses]}`}
      >
        {/* Proficiency Badge */}
        {skill.proficiency && (
          <div className="absolute -top-1 -right-1 md:-top-1.5 md:-right-1.5 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-active:scale-100 group-active:opacity-100 transition-all duration-500 delay-75 ease-[cubic-bezier(0.23,1,0.32,1)] bg-background border border-primary/50 text-foreground text-[9px] md:text-[11px] font-black px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-50 origin-bottom-left">
            {skill.proficiency}%
          </div>
        )}

        {/* Glare container */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-10">
          {/* Elegant pure white glass glare sweep */}
          <div className="absolute top-0 -left-[150%] w-[100%] h-full bg-gradient-to-r from-transparent via-white/70 dark:via-white/50 to-transparent skew-x-[30deg] group-hover:left-[200%] group-active:left-[200%] transition-all duration-[1.2s] ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none mix-blend-overlay dark:mix-blend-overlay" />
        </div>
        
        {/* Subtle inner top highlight to enhance the 3D glass edge */}
        <div className="absolute inset-0 rounded-full pointer-events-none border-t border-white/60 dark:border-white/20 mix-blend-overlay z-10" />

        <span className="font-semibold tracking-tight text-slate-800 dark:text-white/90 drop-shadow-sm dark:drop-shadow-sm group-hover:text-primary-foreground group-active:text-primary-foreground group-hover:drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)] group-active:drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)] transition-all duration-500 relative z-30">
          {skill.name}
        </span>
        {skill.size === 'lg' && (
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-white/40 group-hover:text-primary-foreground/90 group-active:text-primary-foreground/90 mt-0.5 transition-all duration-500 relative z-30">
            {skill.category}
          </span>
        )}
      </div>
    </motion.div>
  );
});
