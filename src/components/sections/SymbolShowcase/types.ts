export const COLOR_SCHEMES = [
  { name: 'Violet',  front: '#f3e8ff', mid: '#a855f7', back: '#4c1d95', glow: 'rgba(168,85,247,0.4)', ring: '#c084fc', spark: '#e9d5ff', light: '#ec4899' },
  { name: 'Cyan',    front: '#e0f7fa', mid: '#06b6d4', back: '#0e4f5c', glow: 'rgba(6,182,212,0.4)',   ring: '#22d3ee', spark: '#a5f3fc', light: '#0ea5e9' },
  { name: 'Rose',    front: '#ffe4e6', mid: '#f43f5e', back: '#881337', glow: 'rgba(244,63,94,0.4)',    ring: '#fb7185', spark: '#fecdd3', light: '#f97316' },
  { name: 'Amber',   front: '#fef3c7', mid: '#f59e0b', back: '#78350f', glow: 'rgba(245,158,11,0.4)',   ring: '#fbbf24', spark: '#fde68a', light: '#ef4444' },
  { name: 'Emerald', front: '#a7f3d0', mid: '#059669', back: '#064e3b', light: '#d1fae5', glow: 'rgba(5,150,105,0.4)', ring: '#34d399', spark: '#ecfdf5' },
  { name: 'Plasma', front: '#f9a8d4', mid: '#db2777', back: '#831843', light: '#fbcfe8', glow: 'rgba(219,39,119,0.4)', ring: '#f472b6', spark: '#fdf2f8' },
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
