import React from 'react';
import { 
  Code2, Palette, Layers, Zap, Globe, GitBranch, 
  MonitorSmartphone, Sparkles, Box, LayoutGrid, Braces
} from 'lucide-react';

export interface SkillMetric {
  name: string;
  category: string;
  icon: React.ReactNode;
  proficiency: number;   // 0–100
  avgIndustry: number;   // 0–100 (reference line)
  color: string;         // accent color
  glowColor: string;     // glow for card border
}

export const skillMetrics: SkillMetric[] = [
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
