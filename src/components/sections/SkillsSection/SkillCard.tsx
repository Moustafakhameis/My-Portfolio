import React, { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import type { SkillMetric } from '../../../data/skillMetrics';

interface SkillCardProps {
  skill: SkillMetric;
  index: number;
  isTablet: boolean;
}

export const SkillCard = ({ skill, index, isTablet }: SkillCardProps) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-40px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, skill.proficiency, {
        duration: 0.8,
        delay: 0.2 + (index % 2) * 0.1,
        ease: 'easeOut'
      });
      return animation.stop;
    }
  }, [isInView, skill.proficiency, index, count]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 2) * 0.1, ease: 'easeOut' }}
      whileTap={{ scale: 0.97 }}
      className="group relative rounded-2xl border border-white/80 dark:border-white/10 overflow-hidden bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl shadow-md"
      style={{
        boxShadow: `0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.04)`,
        minHeight: isTablet ? '100px' : '88px',
      }}
    >
      {/* Subtle glow line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${skill.glowColor}, transparent)` }}
      />

      <div className="p-4 flex items-center gap-4 h-full">
        {/* Icon */}
        <div
          className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${skill.color}18, ${skill.color}08)`,
            border: `1px solid ${skill.color}25`,
            color: skill.color,
          }}
        >
          {skill.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-foreground dark:text-white truncate">{skill.name}</h4>
              <span className="text-[11px] text-muted-foreground dark:text-white/40 uppercase tracking-wider">{skill.category}</span>
            </div>
            <div className="flex-shrink-0 text-right">
              <span className="text-lg font-bold tabular-nums" style={{ color: skill.color }}>
                <motion.span>{rounded}</motion.span>%
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative h-1.5 rounded-full bg-black/5 dark:bg-white/[0.06] overflow-hidden">
            {/* Industry avg marker */}
            <div
              className="absolute top-0 h-full w-[2px] bg-yellow-400/40 z-10"
              style={{ left: `${skill.avgIndustry}%` }}
            />
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)`,
                boxShadow: `0 0 8px ${skill.glowColor}`,
              }}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.proficiency}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + (index % 2) * 0.1, ease: 'easeOut' }}
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[10px] text-muted-foreground dark:text-white/30">Avg. {skill.avgIndustry}%</span>
            <span className="text-[10px] font-medium" style={{ color: `${skill.color}99` }}>
              +{skill.proficiency - skill.avgIndustry}% above avg
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
