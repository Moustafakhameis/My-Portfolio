import React, { useMemo } from 'react';
import { skillMetrics } from '../../../data/skillMetrics';

export const CategoryChips = () => {
  const categories = useMemo(() => {
    const map = new Map<string, { count: number; avg: number; color: string }>();
    skillMetrics.forEach((s) => {
      const entry = map.get(s.category) || { count: 0, avg: 0, color: s.color };
      entry.count += 1;
      entry.avg += s.proficiency;
      entry.color = s.color;
      map.set(s.category, entry);
    });
    return Array.from(map.entries()).map(([name, data]) => ({
      name,
      avg: Math.round(data.avg / data.count),
      color: data.color,
    }));
  }, []);

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((cat) => (
        <div
          key={cat.name}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-white/80 dark:border-white/10 bg-white/80 dark:bg-transparent backdrop-blur-xl shadow-sm dark:shadow-none"
          style={{
            borderColor: `${cat.color}40`,
            color: cat.color,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat.color }} />
          {cat.name}
          <span className="text-muted-foreground dark:text-white/30 ml-0.5">{cat.avg}%</span>
        </div>
      ))}
    </div>
  );
};
