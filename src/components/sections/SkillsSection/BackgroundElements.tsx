import React from 'react';
import { motion } from 'framer-motion';
import helixNebulaImg from '../../../assets/helix-nebula.jpg';

const STAR_COUNT = 16;
export const starData = Array.from({ length: STAR_COUNT }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  duration: Math.random() * 4 + 2,
  delay: Math.random() * 5,
  color: Math.random() > 0.85 ? '#93c5fd' : Math.random() > 0.85 ? '#fde047' : '#ffffff',
}));

export const StarField = () => (
  <>
    <style>{`
      @keyframes twinkle {
        0%, 100% { opacity: 0.1; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.2); }
      }
    `}</style>
    {starData.map((star) => (
      <div
        key={star.id}
        className="absolute rounded-full"
        style={{
          backgroundColor: star.color,
          left: `${star.x}%`,
          top: `${star.y}%`,
          width: star.size,
          height: star.size,
          boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
          animation: `twinkle ${star.duration}s ${star.delay}s ease-in-out infinite`,
          willChange: 'opacity, transform',
        }}
      />
    ))}
  </>
);

const CLOUD_COUNT = 6;
export const cloudData = Array.from({ length: CLOUD_COUNT }).map((_, i) => ({
  id: i,
  x: Math.random() * 100 - 10,
  y: Math.random() * 100 - 10,
  scale: Math.random() * 1.5 + 0.5,
  duration: Math.random() * 50 + 50,
  delay: -(Math.random() * 50),
}));

export const RealisticCloud = ({ x, y, scale, delay, duration }: { x: number, y: number, scale: number, delay: number, duration: number }) => (
  <div
    className="absolute pointer-events-none z-0 animate-cloud-drift"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      scale,
      opacity: 0.9,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    }}
  >
    <div className="absolute w-[300px] h-[100px] bg-white/[0.03] dark:bg-slate-900/[0.2] rounded-full blur-[40px] mix-blend-screen" />
    <div className="absolute top-[20px] left-[50px] w-[200px] h-[120px] bg-white/[0.04] dark:bg-slate-800/[0.3] rounded-full blur-[50px] mix-blend-screen" />
    <div className="absolute top-[10px] left-[120px] w-[250px] h-[90px] bg-white/[0.02] dark:bg-slate-700/[0.2] rounded-full blur-[45px] mix-blend-screen" />
  </div>
);

export const Aurora = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden dark:block mix-blend-screen opacity-100">
    <motion.div
      className="absolute w-[160%] h-[80%] top-[-5%] left-[-30%] rounded-[50%]"
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(217,70,239,0.15) 40%, rgba(20,184,166,0.3) 70%, rgba(16,185,129,0.6) 100%)',
        filter: 'blur(30px)',
        willChange: 'transform',
      }}
      animate={{
        translateY: ['0%', '8%', '0%'],
        scaleX: [1, 1.08, 1],
        scaleY: [1, 0.92, 1],
      }}
      transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute w-[140%] h-[60%] top-[5%] left-[-20%] rounded-[50%]"
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(16,185,129,0.1) 50%, rgba(20,184,166,0.5) 85%, rgba(132,204,22,0.7) 100%)',
        filter: 'blur(20px)',
        willChange: 'transform',
      }}
      animate={{
        translateY: ['0%', '-6%', '0%'],
        scaleX: [1, 0.95, 1],
        scaleY: [1, 1.1, 1],
      }}
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

const METEOR_COUNT = 2;
export const meteorData = Array.from({ length: METEOR_COUNT }).map((_, i) => ({
  id: i,
  top: Math.random() * 50 - 20,
  left: Math.random() * 80 - 40,
  delay: Math.random() * 15,
  duration: Math.random() * 0.8 + 1.2,
}));

export const ShootingStar = ({ top, left, delay, duration }: any) => (
  <motion.div
    className="absolute h-[1px] w-[100px] rounded-full pointer-events-none z-0 bg-gradient-to-r from-transparent via-black/40 to-black dark:via-white/40 dark:to-white drop-shadow-[0_0_4px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_0_4px_rgba(255,255,255,1)]"
    style={{
      top: `${top}%`,
      left: `${left}%`,
      rotate: '35deg',
      opacity: 0,
    }}
    animate={{ 
      x: [0, 1000],
      y: [0, 1000],
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0]
    }}
    transition={{ 
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeIn'
    }}
  />
);

export const HelixNebula = () => (
  <div 
    className="absolute top-[20%] left-[80%] -translate-y-1/2 -translate-x-1/2 pointer-events-none z-0 opacity-80 mix-blend-screen w-[600px] h-[600px] md:w-[800px] md:h-[800px] animate-spin-slow"
  >
    <img 
      src={helixNebulaImg}
      alt="Helix Nebula"
      loading="lazy"
      className="w-full h-full object-cover"
      style={{
        maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 65%)',
        WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 65%)',
        filter: 'contrast(1.2) brightness(1.1) saturate(1.2)'
      }}
    />
  </div>
);
