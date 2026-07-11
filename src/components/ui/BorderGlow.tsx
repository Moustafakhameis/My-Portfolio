import React, { ReactNode, CSSProperties } from 'react';
import './BorderGlow.css';

interface BorderGlowProps {
  children: ReactNode;
  className?: string;
  backgroundColor?: string;
  borderRadius?: number;
  colors?: string[];
  /* Kept for compatibility but ignored since we switched to simple spinning border */
  glowColor?: string;
  glowIntensity?: number;
  glowRadius?: number;
  edgeSensitivity?: number;
  coneSpread?: number;
  fillOpacity?: number;
  animated?: boolean;
}

const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  className = '',
  backgroundColor = 'rgba(255,255,255,0.02)',
  borderRadius = 32,
  colors = ['#34d399', '#059669'],
}) => {
  return (
    <div
      className={`border-glow-card ${className}`}
      style={{
        '--card-bg': backgroundColor,
        '--border-radius': `${borderRadius}px`,
        '--glow-color-1': colors[0],
        '--glow-color-2': colors[1] || colors[0],
      } as CSSProperties}
    >
      <div className="border-glow-wrapper" />
      <div className="border-glow-inner">
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
