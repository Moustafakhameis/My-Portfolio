import React, { useRef, useEffect, memo } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';

export const SkillPill = memo(({ skill, orbitRadius, initialAngle, containerRef, resetKey, isPaused, isMobile }: any) => {
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
