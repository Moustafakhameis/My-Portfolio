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

export const cloudData = [
  { id: 0, x: -5, y: 15, scale: 0.8, duration: 60, delay: -10 },
  { id: 1, x: 75, y: 5, scale: 1.1, duration: 80, delay: -30 },
  { id: 2, x: 55, y: 22, scale: 0.6, duration: 70, delay: -20 },
];

export const RealisticCloud = ({ x, y, scale, delay, duration }: { x: number, y: number, scale: number, delay: number, duration: number }) => (
  <div
    className="absolute pointer-events-none z-0 animate-cloud-drift transform-gpu will-change-transform"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      transform: `scale(${scale})`,
      opacity: 0.75,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    }}
  >
    {/* Volumetric realistic cloud structure */}
    <div className="relative drop-shadow-xl" style={{ width: '300px', height: '120px', filter: 'blur(6px)' }}>
      {/* Bottom base */}
      <div className="absolute bottom-0 left-[20px] right-[20px] h-[60px] bg-white dark:bg-slate-300 rounded-[50px]" />
      {/* Left bump */}
      <div className="absolute bottom-[20px] left-[30px] w-[80px] h-[80px] bg-white dark:bg-slate-300 rounded-full" />
      {/* Center huge bump */}
      <div className="absolute bottom-[30px] left-[80px] w-[130px] h-[130px] bg-white dark:bg-slate-300 rounded-full" />
      {/* Right bump */}
      <div className="absolute bottom-[20px] right-[40px] w-[90px] h-[90px] bg-white dark:bg-slate-300 rounded-full" />
      {/* Extra filler bump */}
      <div className="absolute bottom-[10px] left-[60px] w-[70px] h-[70px] bg-white dark:bg-slate-300 rounded-full" />
    </div>
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
    className="absolute h-[1px] w-[100px] rounded-full pointer-events-none z-0 bg-gradient-to-r from-transparent via-black/40 to-black dark:via-white/40 dark:to-white drop-shadow-[0_0_4px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_0_4px_rgba(255,255,255,1)] transform-gpu will-change-transform"
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
