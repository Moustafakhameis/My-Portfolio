import React from 'react';
import { motion } from 'framer-motion';
import { skillMetrics } from '../../../data/skillMetrics';

const RADAR_SKILLS = skillMetrics.slice(0, 8); // Use top 8 for radar clarity

export const RadarChart = () => {
  const size = 280;
  const center = size / 2;
  const maxRadius = size * 0.32;
  const levels = 5;

  const getPoint = (index: number, radius: number): [number, number] => {
    const angle = (Math.PI * 2 * index) / RADAR_SKILLS.length - Math.PI / 2;
    return [
      center + Math.cos(angle) * radius,
      center + Math.sin(angle) * radius,
    ];
  };

  const gridPolygons = Array.from({ length: levels }, (_, i) => {
    const r = maxRadius * ((i + 1) / levels);
    return RADAR_SKILLS.map((_, j) => getPoint(j, r).join(',')).join(' ');
  });

  const dataPoints = RADAR_SKILLS.map((skill, i) => {
    const r = maxRadius * (skill.proficiency / 100);
    return getPoint(i, r).join(',');
  }).join(' ');

  const avgPoints = RADAR_SKILLS.map((skill, i) => {
    const r = maxRadius * (skill.avgIndustry / 100);
    return getPoint(i, r).join(',');
  }).join(' ');

  return (
    <div className="relative flex items-center justify-center w-full aspect-square max-h-[320px]">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full max-w-[280px] sm:max-w-[320px] overflow-visible"
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
          className="fill-yellow-500/5 dark:fill-yellow-400/5 stroke-yellow-500/80 dark:stroke-yellow-400/40"
          strokeWidth={1.5}
          strokeDasharray="4 4"
        />

        <motion.polygon
          points={dataPoints}
          fill="url(#dataFill)"
          stroke="rgba(6,182,212,0.8)"
          strokeWidth={1.5}
          strokeLinejoin="round"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
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
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.08 }}
              filter={`drop-shadow(0 0 4px ${skill.color})`}
            />
          );
        })}

        {/* Labels */}
        {RADAR_SKILLS.map((skill, i) => {
          const [x, y] = getPoint(i, maxRadius + 14);
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
