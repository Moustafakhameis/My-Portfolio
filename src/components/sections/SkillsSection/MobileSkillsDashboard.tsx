import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillMetrics } from '../../../data/skillMetrics';
import { RadarChart } from './RadarChart';
import { SkillCard } from './SkillCard';
import { OverallScoreRing } from './OverallScoreRing';
import { CategoryChips } from './CategoryChips';

export const MobileSkillsDashboard = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <div ref={sectionRef} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl mx-auto px-1"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
            <span className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">Skill Analytics</span>
          </motion.div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white mb-1">Performance Dashboard</h3>
          <p className="text-sm font-medium text-slate-600 dark:text-white/40">Technical proficiency · Competitive analysis</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full sm:flex-1 flex justify-center p-4 sm:p-6"
          >
            <RadarChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35 }}
            className="flex flex-row sm:flex-col items-center sm:items-center gap-6 sm:gap-5"
          >
            <OverallScoreRing />
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-white/60 dark:border-white/5 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                <span className="text-[11px] font-bold text-slate-700 dark:text-white/60">Your Level</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-white/60 dark:border-white/5 shadow-sm">
                <div className="w-2 h-2 rounded-full border-[2px] border-yellow-500/80 dark:border-yellow-400/50" />
                <span className="text-[11px] font-bold text-slate-700 dark:text-white/60">Industry Avg</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mb-6">
          <CategoryChips />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {skillMetrics.map((skill, i) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={i}
              isTablet={false}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-center"
        >
          <p className="text-[11px] text-muted-foreground/60 dark:text-white/25">
            Proficiency based on project experience · Industry average sourced from community benchmarks
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
