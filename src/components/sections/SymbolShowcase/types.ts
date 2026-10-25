export const COLOR_SCHEMES = [
  { name: 'Indigo',  front: '#e0e7ff', mid: '#6366f1', back: '#312e81', glow: 'rgba(99,102,241,0.4)', ring: '#818cf8', spark: '#c7d2fe', light: '#06b6d4' },
  { name: 'Cyan',    front: '#e0f7fa', mid: '#06b6d4', back: '#0e4f5c', glow: 'rgba(6,182,212,0.4)',   ring: '#22d3ee', spark: '#a5f3fc', light: '#0ea5e9' },
  { name: 'Teal',    front: '#ccfbf1', mid: '#14b8a6', back: '#134e4a', glow: 'rgba(45,212,191,0.4)',    ring: '#2dd4bf', spark: '#99f6e4', light: '#f97316' },
  { name: 'Amber',   front: '#fef3c7', mid: '#f59e0b', back: '#78350f', glow: 'rgba(245,158,11,0.4)',   ring: '#fbbf24', spark: '#fde68a', light: '#ef4444' },
  { name: 'Emerald', front: '#a7f3d0', mid: '#059669', back: '#064e3b', light: '#d1fae5', glow: 'rgba(5,150,105,0.4)', ring: '#34d399', spark: '#ecfdf5' },
  { name: 'Plasma', front: '#67e8f9', mid: '#0891b2', back: '#164e63', light: '#a5f3fc', glow: 'rgba(8,145,178,0.4)', ring: '#22d3ee', spark: '#ecfeff' },
  { name: 'Electric', front: '#93c5fd', mid: '#3b82f6', back: '#1e3a8a', light: '#bfdbfe', glow: 'rgba(59,130,246,0.4)', ring: '#60a5fa', spark: '#eff6ff' },
  { name: 'Toxic', front: '#d9f99d', mid: '#84cc16', back: '#3f6212', light: '#ecfccb', glow: 'rgba(132,204,22,0.4)', ring: '#a3e635', spark: '#f7fee7' }
];

export const SPEED_LEVELS = [
  { label: '0.5×', value: 0.15 },
  { label: '1×',   value: 0.3  },
  { label: '2×',   value: 0.6  },
  { label: '3×',   value: 1.0  },
];

export type ColorScheme = typeof COLOR_SCHEMES[0];
