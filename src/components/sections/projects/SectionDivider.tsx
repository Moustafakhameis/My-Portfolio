import React, { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionDividerProps {
  gradientFrom?: string;
  gradientTo?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  gradientFrom = 'from-white/40',
  gradientTo = 'to-white/40',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Generate varied spark trajectories
  const sparks = useMemo(() => 
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: (i % 2 === 0 ? -1 : 1) * (40 + Math.random() * 100),
      y: (Math.random() - 0.5) * 20,
      delay: 0.4 + i * 0.12,
      duration: 1.5 + Math.random() * 1,
      size: 1 + Math.random() * 2,
    })),
  []);

  return (
    <div ref={ref} className="relative flex items-center justify-center py-14 md:py-20 overflow-visible group cursor-default select-none">

      {/* ═══ Left line ═══ */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="flex-1 relative origin-right"
      >
        <div className="h-px bg-gradient-to-l from-white/25 via-white/8 to-transparent" />
        {/* Faint colored underglow on the line */}
        <div className={`absolute inset-0 h-px bg-gradient-to-l ${gradientFrom} ${gradientTo} opacity-[0.08] blur-[2px]`} />
      </motion.div>

      {/* ═══ Center ornament ═══ */}
      <div className="relative flex items-center justify-center mx-6 md:mx-8">

        {/* Layer 1: Large ambient colored glow — breathes */}
        <motion.div
          animate={isInView ? { opacity: [0.15, 0.4, 0.15], scale: [0.85, 1.15, 0.85] } : {}}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute w-20 h-20 md:w-24 md:h-24 rounded-full blur-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} pointer-events-none group-hover:opacity-60 group-hover:scale-150 transition-all duration-1000`}
        />

        {/* Layer 2: Tight inner glow — sharper color ring */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.5 } : {}}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          className={`absolute w-8 h-8 rounded-full blur-md bg-gradient-to-tr ${gradientFrom} ${gradientTo} group-hover:opacity-80 transition-opacity duration-500`}
        />

        {/* Spark particles — shoot outward on entry */}
        {isInView && sparks.map(spark => (
          <motion.div
            key={spark.id}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{ x: spark.x, y: spark.y, opacity: [0, 0.9, 0], scale: [0, 1, 0] }}
            transition={{ duration: spark.duration, ease: 'easeOut', delay: spark.delay }}
            className={`absolute top-1/2 left-1/2 rounded-full bg-white pointer-events-none`}
            style={{ width: spark.size, height: spark.size }}
          />
        ))}

        {/* Inner cluster: • ◇ • */}
        <div className="flex items-center gap-2.5 relative z-10">

          {/* Left outer micro-dot */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 1.0, type: 'spring', stiffness: 500, damping: 18 }}
            className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-white/60 transition-colors duration-500"
          />

          {/* Left dot */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.8, type: 'spring', stiffness: 450, damping: 16 }}
            className="w-1.5 h-1.5 rounded-full bg-white/35 group-hover:bg-white/80 group-hover:shadow-[0_0_6px_rgba(255,255,255,0.6)] transition-all duration-500"
          />

          {/* ★ Center diamond */}
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={isInView ? { scale: 1, rotate: 45 } : {}}
            whileHover={{ scale: 1.4, rotate: 225 }}
            transition={{ delay: 0.45, type: 'spring', stiffness: 280, damping: 18 }}
            className="relative cursor-pointer"
          >
            {/* Diamond colored aura */}
            <motion.div
              animate={isInView ? { opacity: [0.5, 0.9, 0.5] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className={`absolute inset-[-5px] rounded-[3px] blur-[5px] bg-gradient-to-br ${gradientFrom} ${gradientTo} group-hover:inset-[-8px] group-hover:blur-[8px] transition-all duration-500`}
            />
            {/* Diamond body — pure white, glowing */}
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-[2px] bg-white relative z-10 shadow-[0_0_10px_rgba(255,255,255,0.9),0_0_20px_rgba(255,255,255,0.3)]" />
          </motion.div>

          {/* Right dot */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.85, type: 'spring', stiffness: 450, damping: 16 }}
            className="w-1.5 h-1.5 rounded-full bg-white/35 group-hover:bg-white/80 group-hover:shadow-[0_0_6px_rgba(255,255,255,0.6)] transition-all duration-500"
          />

          {/* Right outer micro-dot */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 1.05, type: 'spring', stiffness: 500, damping: 18 }}
            className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-white/60 transition-colors duration-500"
          />
        </div>
      </div>

      {/* ═══ Right line ═══ */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="flex-1 relative origin-left"
      >
        <div className="h-px bg-gradient-to-r from-white/25 via-white/8 to-transparent" />
        <div className={`absolute inset-0 h-px bg-gradient-to-r ${gradientFrom} ${gradientTo} opacity-[0.08] blur-[2px]`} />
      </motion.div>

      {/* ═══ Repeating colored shimmer sweep ═══ */}
      {isInView && (
        <motion.div
          initial={{ left: '-15%', opacity: 0 }}
          animate={{ left: '115%', opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 6, ease: [0.22, 1, 0.36, 1], delay: 1.5 }}
          className={`absolute top-1/2 -translate-y-1/2 w-1/4 max-w-[200px] h-[2px] bg-gradient-to-r ${gradientFrom} via-white/70 ${gradientTo} rounded-full blur-[0.5px] pointer-events-none`}
          style={{ position: 'absolute' }}
        />
      )}
    </div>
  );
};
