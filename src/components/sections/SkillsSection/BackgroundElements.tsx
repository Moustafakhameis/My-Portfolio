import React from 'react';
import { motion } from 'framer-motion';

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

export const RealisticCloud = ({ x, y, scale, delay, duration }: any) => (
  <motion.div
    className="absolute pointer-events-none z-0"
    style={{ left: `${x}%`, top: `${y}%`, opacity: 0.9 }}
    animate={{ x: [0, 150, 0] }}
    transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
  >
    <div 
      className="relative w-32 h-16 drop-shadow-lg" 
      style={{ transform: `scale(${scale})` }}
    >
      <div className="absolute top-2 left-2 w-10 h-10 bg-white rounded-full blur-[1px] blob-blur" />
      <div className="absolute -top-2 left-8 w-16 h-16 bg-slate-50 rounded-full blur-[1px] blob-blur" />
      <div className="absolute top-1 left-16 w-14 h-14 bg-white rounded-full blur-[1px] blob-blur" />
      <div className="absolute top-6 left-0 w-32 h-8 bg-slate-50 rounded-full blur-[1px] blob-blur" />
    </div>
  </motion.div>
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
  <motion.div 
    className="absolute top-[20%] left-[80%] -translate-y-1/2 -translate-x-1/2 pointer-events-none z-0 opacity-80 mix-blend-screen w-[600px] h-[600px] md:w-[800px] md:h-[800px]"
    animate={{ rotate: 360 }}
    transition={{ duration: 400, repeat: Infinity, ease: "linear" }}
  >
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/NGC7293_%282004%29.jpg/1024px-NGC7293_%282004%29.jpg"
      alt="Helix Nebula"
      loading="lazy"
      className="w-full h-full object-cover"
      style={{
        maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 65%)',
        WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 65%)',
        filter: 'contrast(1.2) brightness(1.1) saturate(1.2)'
      }}
    />
  </motion.div>
);
