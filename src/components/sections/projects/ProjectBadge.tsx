import React from 'react';
import { motion } from 'framer-motion';
import type { ProjectCategory } from './types';
import { useLanguage } from '../../../context/LanguageContext';

interface ProjectBadgeProps {
  category: ProjectCategory;
}

export const ProjectBadge: React.FC<ProjectBadgeProps> = ({ category }) => {
  const { language } = useLanguage();
  
  const getBadgeConfig = () => {
    switch (category) {
      case 'featured':
        return { 
          label: language === 'ar' ? 'مميز' : 'Featured', 
          dot: 'bg-amber-500 dark:bg-amber-400',
          dotShadow: 'rgba(245, 158, 11, 0.5)',
          bgClass: 'bg-amber-500/10 dark:bg-black/40 border-amber-500/20 dark:border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
          textClass: 'text-amber-700 dark:text-amber-300'
        };
      case 'professional':
        return { 
          label: language === 'ar' ? 'احترافي' : 'Professional', 
          dot: 'bg-blue-500 dark:bg-blue-400',
          dotShadow: 'rgba(59, 130, 246, 0.5)',
          bgClass: 'bg-blue-500/10 dark:bg-black/40 border-blue-500/20 dark:border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]',
          textClass: 'text-blue-700 dark:text-blue-300'
        };
      case 'practice':
        return { 
          label: language === 'ar' ? 'تدريبي' : 'Practice', 
          dot: 'bg-emerald-500 dark:bg-emerald-400',
          dotShadow: 'rgba(16, 185, 129, 0.5)',
          bgClass: 'bg-emerald-500/10 dark:bg-black/40 border-emerald-500/20 dark:border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
          textClass: 'text-emerald-700 dark:text-emerald-300'
        };
      case 'learning':
        return { 
          label: language === 'ar' ? 'تعليمي' : 'Learning', 
          dot: 'bg-slate-500 dark:bg-slate-300',
          dotShadow: 'rgba(100, 116, 139, 0.5)',
          bgClass: 'bg-slate-500/10 dark:bg-black/40 border-slate-500/20 dark:border-slate-500/30 shadow-[0_0_15px_rgba(148,163,184,0.1)]',
          textClass: 'text-slate-700 dark:text-slate-300'
        };
      default:
        return { 
          label: language === 'ar' ? 'مشروع' : 'Project', 
          dot: 'bg-primary',
          dotShadow: 'rgba(168, 85, 247, 0.5)',
          bgClass: 'bg-primary/10 dark:bg-black/40 border-primary/20 dark:border-primary/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]',
          textClass: 'text-purple-700 dark:text-purple-300'
        };
    }
  };

  const { label, dot, dotShadow, bgClass, textClass } = getBadgeConfig();

  return (
    <div className={`relative inline-flex items-center gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] rounded-full border backdrop-blur-2xl overflow-hidden ${bgClass}`}>
      
      {/* Animated Glass Shimmer */}
      <motion.div 
        className="absolute top-0 bottom-0 w-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 z-0"
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
      />
      
      {/* Top inner highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />

      {/* Pulsing Status Dot */}
      <div className="relative flex h-2 w-2 shrink-0 items-center justify-center z-10">
        <span className={`absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full opacity-70 ${dot}`} />
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${dot}`} style={{ boxShadow: `0 0 8px ${dotShadow}, 0 0 12px ${dotShadow}` }} />
      </div>
      
      {/* Label */}
      <span className={`relative z-10 drop-shadow-sm ${textClass}`}>{label}</span>
      
      {/* Inner ring for extra crispness */}
      <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/5 pointer-events-none z-10" />
    </div>
  );
};
