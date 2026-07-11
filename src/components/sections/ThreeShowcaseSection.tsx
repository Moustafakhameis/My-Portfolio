import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion, useInView, useMotionValue, useAnimationFrame, useMotionTemplate } from 'framer-motion';
import {
  Play, Pause, RotateCcw, Zap, Gauge, Sparkles, Grid3x3, Eye, BoxSelect
} from 'lucide-react';
import './ThreeShowcase.css';

const COLOR_SCHEMES = [
  { name: 'Purple',  primary: '#a855f7', secondary: '#7c3aed', glow: 'rgba(168,85,247,0.35)' },
  { name: 'Cyan',    primary: '#22d3ee', secondary: '#0891b2', glow: 'rgba(34,211,238,0.35)' },
  { name: 'Rose',    primary: '#fb7185', secondary: '#e11d48', glow: 'rgba(251,113,133,0.35)' },
  { name: 'Emerald', primary: '#34d399', secondary: '#059669', glow: 'rgba(52,211,153,0.35)' },
  { name: 'Amber',   primary: '#fbbf24', secondary: '#d97706', glow: 'rgba(251,191,36,0.35)' },
  { name: 'Blue',    primary: '#3b82f6', secondary: '#1d4ed8', glow: 'rgba(59,130,246,0.35)' },
  { name: 'Pink',    primary: '#ec4899', secondary: '#be185d', glow: 'rgba(236,72,153,0.35)' },
  { name: 'Orange',  primary: '#f97316', secondary: '#c2410c', glow: 'rgba(249,115,22,0.35)' },
];

const SPEED_LEVELS = [
  { label: '0.5×', value: 0.15, icon: '🐢' },
  { label: '1×',   value: 0.3,  icon: '▶' },
  { label: '2×',   value: 0.6,  icon: '⚡' },
  { label: '3×',   value: 1.0,  icon: '🚀' },
];

const EagleLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <text 
      x="50" 
      y="54" 
      fontSize="80" 
      textAnchor="middle" 
      dominantBaseline="middle" 
      fill="currentColor"
      style={{ fontFamily: 'system-ui, sans-serif' }}
    >
      𖤍
    </text>
  </svg>
);

export const ThreeShowcaseSection = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const rotateX = useMotionValue(-25);
  const rotateY = useMotionValue(35);
  const transformTemplate = useMotionTemplate`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedIdx, setSpeedIdx] = useState(1);
  const [activeColor, setActiveColor] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const [showParticles, setShowParticles] = useState(true);
  const [isExploded, setIsExploded] = useState(false);

  const parallaxRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevTime = useRef<number>(performance.now());
  const animRef = useRef<number>(0);

  const scheme = COLOR_SCHEMES[activeColor];
  const speed = SPEED_LEVELS[speedIdx].value;

  // ---------- fixed-speed animation loop using framer-motion ----------
  useAnimationFrame((time, delta) => {
    if (isPlaying && !isDragging && isInView) {
      rotateY.set(rotateY.get() + speed * 60 * (delta / 1000));
    }
  });

  // ---------- pointer handlers ----------
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    rotateY.set(rotateY.get() + dx * 0.4);
    rotateX.set(Math.max(-80, Math.min(80, rotateX.get() - dy * 0.4)));
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    resumeTimer.current = setTimeout(() => setIsPlaying(true), 2000);
  }, []);

  // ---------- interactive background handler ----------
  const handleSectionMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Spotlight position (percentage)
    if (spotlightRef.current) {
      spotlightRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, ${scheme.glow} 0%, transparent 50%)`;
    }
  };

  // ---------- controls ----------
  const resetView = () => { 
    rotateX.set(-25); rotateY.set(35); setIsPlaying(true); setIsExploded(false); 
  };
  const cycleSpeed = () => setSpeedIdx(i => (i + 1) % SPEED_LEVELS.length);
  const cycleColor = () => setActiveColor(i => (i + 1) % COLOR_SCHEMES.length);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleSectionMouseMove}
      className="relative min-h-[600px] w-full bg-background flex flex-col md:flex-row items-center justify-between px-6 md:px-24 py-20 overflow-hidden border-t border-border/10"
    >
      {/* interactive spotlight background */}
      <div 
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-1000"
        style={{ background: `radial-gradient(circle at 50% 50%, ${scheme.glow} 0%, transparent 50%)` }}
      />
      
      {/* ambient background glow */}
      <div
        className="cube-ambient-glow"
        style={{ background: `radial-gradient(ellipse at 65% 50%, ${scheme.glow} 0%, transparent 60%)` }}
      />

      {/* ---- LEFT: text + controls ---- */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full md:w-1/2 z-10 flex flex-col justify-center text-center md:text-start mb-12 md:mb-0"
      >
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground drop-shadow-md">
          {t('threeShowcase', 'title1')} <br />
          <span 
            className="text-primary text-gradient drop-shadow-xl"
            style={{ textShadow: `0 0 40px ${scheme.glow}` }}
          >
            {t('threeShowcase', 'title2')}
          </span>
        </h2>
        <p className="mt-4 text-xl text-muted-foreground font-medium drop-shadow-sm">
          {t('threeShowcase', 'description')}
        </p>

        {/* colour palette */}
        <div className="flex items-center gap-2 mt-8 flex-wrap justify-center md:justify-start">
          {COLOR_SCHEMES.map((s, i) => (
            <button
              key={s.name}
              onClick={() => setActiveColor(i)}
              className="cube-color-pill"
              title={s.name}
              style={{
                background: s.primary,
                boxShadow: activeColor === i ? `0 0 14px ${s.glow}, 0 0 4px ${s.primary}` : 'none',
                transform: activeColor === i ? 'scale(1.35)' : 'scale(1)',
                borderColor: activeColor === i ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)',
              }}
              aria-label={`Switch to ${s.name}`}
            />
          ))}
          <span className="text-[10px] sm:text-xs text-muted-foreground/50 ml-3 uppercase tracking-[0.2em] font-bold">
            {scheme.name}
          </span>
        </div>

        {/* control bar */}
        <div 
          className="cube-controls mt-6 flex items-center gap-2.5 flex-wrap justify-center md:justify-start"
          style={{
            '--active-color': scheme.primary,
            '--active-glow': scheme.glow,
          } as React.CSSProperties}
        >
          {/* Play / Pause */}
          <button
            onClick={() => setIsPlaying(p => !p)}
            className="cube-ctrl-btn"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying
              ? <Pause size={16} />
              : <Play size={16} style={{ marginLeft: 2 }} />}
          </button>

          {/* Speed */}
          <button onClick={cycleSpeed} className="cube-ctrl-btn cube-ctrl-wide" title="Change speed">
            <Gauge size={14} />
            <span>{SPEED_LEVELS[speedIdx].label}</span>
          </button>

          {/* Reset */}
          <button onClick={() => { rotateX.set(-25); rotateY.set(35); }} className="cube-ctrl-btn" title="Reset view">
            <RotateCcw size={15} />
          </button>

          {/* Toggle grid */}
          <button
            onClick={() => setShowGrid(g => !g)}
            className={`cube-ctrl-btn ${showGrid ? 'cube-ctrl-active' : ''}`}
            title="Toggle grid"
          >
            <Grid3x3 size={15} />
          </button>

          {/* Toggle particles */}
          <button
            onClick={() => setShowParticles(p => !p)}
            className={`cube-ctrl-btn ${showParticles ? 'cube-ctrl-active' : ''}`}
            title="Toggle particles"
          >
            <Sparkles size={15} />
          </button>

          {/* Toggle explode */}
          <button
            onClick={() => setIsExploded(e => !e)}
            className={`cube-ctrl-btn ${isExploded ? 'cube-ctrl-active' : ''}`}
            title="Toggle Explode View"
          >
            <BoxSelect size={15} />
          </button>
        </div>
      </motion.div>

      {/* ---- RIGHT: cube ---- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        dir="ltr"
        className="w-full md:w-1/2 h-[400px] md:h-[600px] z-0 flex items-center justify-center"
      >
        <div className="cube-wrapper">
          {/* particles */}
          {showParticles && (
            <>
              {[1, 2, 3, 4, 5, 6, 7].map(n => (
                <div
                  key={n}
                  className={`cube-particle cube-particle-${n}`}
                  style={{ background: n % 2 === 0 ? scheme.secondary : scheme.primary }}
                />
              ))}
            </>
          )}

          {/* ground shadow */}
          <div className="cube-ground-shadow" style={{ background: scheme.glow }} />

          {/* 3D scene */}
          <div
            className="css-cube-scene"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onDoubleClick={cycleColor}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <div className={`css-cube-float-wrapper ${isPlaying && !isDragging ? '' : 'paused'}`}>
              <motion.div
                className={`css-cube ${isExploded ? 'cube-exploded' : ''}`}
                style={{
                  transform: transformTemplate,
                  '--cube-primary': scheme.primary,
                  '--cube-secondary': scheme.secondary,
                  '--cube-glow': scheme.glow,
                } as any}
              >
                {/* inner eagle core */}
                <div className="cube-core">
                  <EagleLogo className="w-full h-full drop-shadow-2xl" />
                </div>
                
                {/* 6 faces */}
                {(['front', 'back', 'right', 'left', 'top', 'bottom'] as const).map(face => (
                  <div key={face} className={`css-cube-face css-cube-${face}`}>
                    {(face === 'front' || face === 'right') && <div className="cube-face-shine" />}
                    {face === 'top' && <div className="cube-face-shine cube-face-shine-top" />}
                    {showGrid && <div className="cube-face-grid" />}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* hint */}
          <div className="cube-hint">
            <span>Drag to rotate · Double-click to change color</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
