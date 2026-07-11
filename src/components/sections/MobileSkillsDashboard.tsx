import React, { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Code2, Palette, Layers, Zap, Globe, GitBranch, 
  MonitorSmartphone, Sparkles, Box, LayoutGrid, Braces, PenTool
} from 'lucide-react';

/* ─────────────────────── Skills Data with Analytics ─────────────────────── */

interface SkillMetric {
  name: string;
  category: string;
  icon: React.ReactNode;
  proficiency: number;   // 0–100
  avgIndustry: number;   // 0–100 (reference line)
  color: string;         // accent color
  glowColor: string;     // glow for card border
}

const skillMetrics: SkillMetric[] = [
  { name: 'React 19',          category: 'Frontend',   icon: <Code2 size={20} />,             proficiency: 95, avgIndustry: 70, color: '#06b6d4', glowColor: 'rgba(6,182,212,0.35)' },
  { name: 'TypeScript',        category: 'Language',   icon: <Braces size={20} />,             proficiency: 90, avgIndustry: 65, color: '#3b82f6', glowColor: 'rgba(59,130,246,0.35)' },
  { name: 'Next.js',           category: 'Framework',  icon: <Layers size={20} />,             proficiency: 88, avgIndustry: 55, color: '#8b5cf6', glowColor: 'rgba(139,92,246,0.35)' },
  { name: 'Tailwind v4',       category: 'Styling',    icon: <Palette size={20} />,            proficiency: 92, avgIndustry: 60, color: '#14b8a6', glowColor: 'rgba(20,184,166,0.35)' },
  { name: 'JavaScript',        category: 'Language',   icon: <Zap size={20} />,                proficiency: 95, avgIndustry: 75, color: '#eab308', glowColor: 'rgba(234,179,8,0.35)' },
  { name: 'Framer Motion',     category: 'Animation',  icon: <Sparkles size={20} />,           proficiency: 85, avgIndustry: 40, color: '#ec4899', glowColor: 'rgba(236,72,153,0.35)' },
  { name: 'HTML/CSS',          category: 'Frontend',   icon: <Globe size={20} />,              proficiency: 97, avgIndustry: 80, color: '#f97316', glowColor: 'rgba(249,115,22,0.35)' },
  { name: 'Three.js',          category: '3D',         icon: <Box size={20} />,                proficiency: 75, avgIndustry: 25, color: '#06b6d4', glowColor: 'rgba(6,182,212,0.35)' },
  { name: 'GSAP',              category: 'Animation',  icon: <Sparkles size={20} />,           proficiency: 78, avgIndustry: 35, color: '#22c55e', glowColor: 'rgba(34,197,94,0.35)' },
  { name: 'GitHub',            category: 'Tools',      icon: <GitBranch size={20} />,          proficiency: 88, avgIndustry: 70, color: '#a78bfa', glowColor: 'rgba(167,139,250,0.35)' },
  { name: 'Responsive Design', category: 'Concept',    icon: <MonitorSmartphone size={20} />,  proficiency: 95, avgIndustry: 65, color: '#2dd4bf', glowColor: 'rgba(45,212,191,0.35)' },
  { name: 'Bootstrap',         category: 'Styling',    icon: <LayoutGrid size={20} />,         proficiency: 80, avgIndustry: 70, color: '#7c3aed', glowColor: 'rgba(124,58,237,0.35)' },
];

/* ─────────────────────── Radar Chart (Pure SVG) ─────────────────────── */

const RADAR_SKILLS = skillMetrics.slice(0, 8); // Use top 8 for radar clarity

const RadarChart = () => {
  const size = 280;
  const center = size / 2;
  const maxRadius = size * 0.38;
  const levels = 5;

  const getPoint = (index: number, radius: number): [number, number] => {
    const angle = (Math.PI * 2 * index) / RADAR_SKILLS.length - Math.PI / 2;
    return [
      center + Math.cos(angle) * radius,
      center + Math.sin(angle) * radius,
    ];
  };

  // Grid levels
  const gridPolygons = Array.from({ length: levels }, (_, i) => {
    const r = maxRadius * ((i + 1) / levels);
    return RADAR_SKILLS.map((_, j) => getPoint(j, r).join(',')).join(' ');
  });

  // Data polygon
  const dataPoints = RADAR_SKILLS.map((skill, i) => {
    const r = maxRadius * (skill.proficiency / 100);
    return getPoint(i, r).join(',');
  }).join(' ');

  // Industry avg polygon
  const avgPoints = RADAR_SKILLS.map((skill, i) => {
    const r = maxRadius * (skill.avgIndustry / 100);
    return getPoint(i, r).join(',');
  }).join(' ');

  return (
    <div className="relative flex items-center justify-center w-full aspect-square max-h-[320px]">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full max-w-[280px] sm:max-w-[320px]"
        style={{ filter: 'drop-shadow(0 0 20px rgba(6,182,212,0.15))' }}
      >
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(6,182,212,0.25)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="dataFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(6,182,212,0.15)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0.05)" />
          </linearGradient>
        </defs>

        {/* Background glow */}
        <circle cx={center} cy={center} r={maxRadius} fill="url(#radarGlow)" className="hidden dark:block" />

        {/* Grid levels */}
        {gridPolygons.map((points, i) => (
          <polygon
            key={`grid-${i}`}
            points={points}
            fill="none"
            className="stroke-slate-300/60 dark:stroke-slate-600/30"
            strokeWidth={i === levels - 1 ? 1.5 : 0.5}
          />
        ))}

        {/* Axis lines */}
        {RADAR_SKILLS.map((_, i) => {
          const [x, y] = getPoint(i, maxRadius);
          return (
            <line
              key={`axis-${i}`}
              x1={center} y1={center} x2={x} y2={y}
              className="stroke-slate-300/60 dark:stroke-slate-600/30"
              strokeWidth={0.5}
            />
          );
        })}

        {/* Industry avg polygon */}
        <polygon
          points={avgPoints}
          fill="rgba(234,179,8,0.02)"
          stroke="rgba(234,179,8,0.25)"
          strokeWidth={1}
          strokeDasharray="4 4"
        />

        {/* Data polygon */}
        <motion.polygon
          points={dataPoints}
          fill="url(#dataFill)"
          stroke="rgba(6,182,212,0.8)"
          strokeWidth={1.5}
          strokeLinejoin="round"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          style={{ transformOrigin: 'center' }}
        />

        {/* Data points (dots) */}
        {RADAR_SKILLS.map((skill, i) => {
          const r = maxRadius * (skill.proficiency / 100);
          const [x, y] = getPoint(i, r);
          return (
            <motion.circle
              key={`dot-${i}`}
              cx={x} cy={y} r={3}
              fill={skill.color}
              stroke="white"
              strokeWidth={1}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              filter={`drop-shadow(0 0 4px ${skill.color})`}
            />
          );
        })}

        {/* Labels */}
        {RADAR_SKILLS.map((skill, i) => {
          const [x, y] = getPoint(i, maxRadius + 24);
          const isLeft = x < center - 5;
          const isRight = x > center + 5;
          const anchor = isLeft ? 'end' : isRight ? 'start' : 'middle';
          return (
            <text
              key={`label-${i}`}
              x={x} y={y}
              textAnchor={anchor}
              dominantBaseline="central"
              className="fill-current text-slate-700 dark:text-slate-400"
              style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.02em' }}
            >
              {skill.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

/* ─────────────────────── Skill Metric Card ─────────────────────── */

interface SkillCardProps {
  skill: SkillMetric;
  index: number;
  isTablet: boolean;
}

const SkillCard = ({ skill, index, isTablet }: SkillCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
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
                {skill.proficiency}%
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
              transition={{ duration: 0.8, delay: 0.3 + index * 0.06, ease: 'easeOut' }}
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

/* ─────────────────────── Overall Score Ring ─────────────────────── */

const OverallScoreRing = () => {
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

/* ─────────────────────── Category Summary Chips ─────────────────────── */

const CategoryChips = () => {
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

/* ─────────────────────── Main Dashboard Component ─────────────────────── */

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
        {/* ── Header ── */}
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

        {/* ── Score + Radar Section ── */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full sm:flex-1 flex justify-center p-4 sm:p-6"
          >
            <RadarChart />
          </motion.div>

          {/* Score + Legend */}
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

        {/* ── Category Chips ── */}
        <div className="mb-6">
          <CategoryChips />
        </div>

        {/* ── Skill Cards Grid ── */}
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

        {/* ── Footer Legend ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
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
