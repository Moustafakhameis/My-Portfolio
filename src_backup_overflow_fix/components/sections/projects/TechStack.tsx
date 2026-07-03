import React from 'react';
import { motion } from 'framer-motion';
import type { ProjectCategory } from './types';

interface TechStackProps {
  tech: string[];
  category?: ProjectCategory;
}

export const TechStack: React.FC<TechStackProps> = ({ tech, category }) => {
  const isCompact = category === 'learning';

  return (
    <div className="flex flex-wrap gap-2">
      {tech.map((t, i) => (
        <motion.span 
          key={t} 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05, type: "tween", ease: "easeOut" }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(168,85,247,1)", color: "#fff", borderColor: "rgba(168,85,247,1)" }}
          className={`bg-primary/5 border border-primary/20 text-primary font-bold rounded-full transition-all duration-300 cursor-default ${
            isCompact ? 'px-2.5 py-1 text-[10px]' : 'px-3 py-1.5 text-xs'
          }`}
        >
          {t}
        </motion.span>
      ))}
    </div>
  );
};
