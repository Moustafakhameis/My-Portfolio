import React from 'react';
import { motion } from 'framer-motion';
import { skillMetrics } from '../../../data/skillMetrics';

export const OverallScoreRing = () => {
  const overall = Math.round(
    skillMetrics.reduce((a, b) => a + b.proficiency, 0) / skillMetrics.length
  );
  const circumference = 2 * Math.PI * 44;
  const strokeDashoffset = circumference * (1 - overall / 100);

  return (
    <div className="relative flex items-center justify-center">
      <svg width="110" height="110" viewBox="0 0 110 110" className="relative z-10">
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <circle
          cx="55" cy="55" r="44"
          fill="none"
          stroke="rgba(6,182,212,0.08)"
          strokeWidth="6"
        />
        <motion.circle
          cx="55" cy="55" r="44"
          fill="none"
          stroke="url(#scoreGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '55px 55px' }}
          filter="drop-shadow(0 0 6px rgba(6,182,212,0.4))"
        />
      </svg>
      <div className="absolute flex flex-col items-center z-10">
        <span className="text-2xl font-bold text-slate-800 dark:text-white tabular-nums">{overall}</span>
        <span className="text-[10px] text-slate-600 dark:text-white/40 uppercase tracking-widest font-semibold">Score</span>
      </div>
    </div>
  );
};
