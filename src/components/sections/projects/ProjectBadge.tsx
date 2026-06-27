import React from 'react';
import type { ProjectCategory } from './types';

interface ProjectBadgeProps {
  category: ProjectCategory;
}

export const ProjectBadge: React.FC<ProjectBadgeProps> = ({ category }) => {
  const getBadgeConfig = () => {
    switch (category) {
      case 'featured':
        return { text: '⭐ Featured', className: 'bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]' };
      case 'professional':
        return { text: '💼 Professional', className: 'bg-blue-500/10 text-blue-400 border-blue-500/20' };
      case 'practice':
        return { text: '🧪 Practice', className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
      case 'learning':
        return { text: '📚 Learning', className: 'bg-slate-500/10 text-slate-400 border-slate-500/20' };
      default:
        return { text: 'Project', className: 'bg-primary/10 text-primary border-primary/20' };
    }
  };

  const { text, className } = getBadgeConfig();

  return (
    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full border backdrop-blur-md ${className}`}>
      {text}
    </span>
  );
};
