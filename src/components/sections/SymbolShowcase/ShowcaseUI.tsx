import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Compass, Play, Pause, Sun, Gauge, Atom, Sparkles } from 'lucide-react';
import { COLOR_SCHEMES, SPEED_LEVELS } from './types';
import type { ColorScheme } from './types';
import { useLanguage } from '../../../context/LanguageContext';

interface ShowcaseUIProps {
  scheme: ColorScheme;
  colorIdx: number;
  setColorIdx: (i: number) => void;
  symbolSpin: boolean;
  setSymbolSpin: React.Dispatch<React.SetStateAction<boolean>>;
  atomSpin: boolean;
  setAtomSpin: React.Dispatch<React.SetStateAction<boolean>>;
  speedIdx: number;
  setSpeedIdx: React.Dispatch<React.SetStateAction<number>>;
  glowIntensity: number;
  setGlowIntensity: React.Dispatch<React.SetStateAction<number>>;
  scattered: boolean;
  setScattered: React.Dispatch<React.SetStateAction<boolean>>;
  isResetting: boolean;
  handleReset: () => void;
  showParticles: boolean;
  setShowParticles: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShowcaseUI: React.FC<ShowcaseUIProps> = ({
  scheme, colorIdx, setColorIdx,
  symbolSpin, setSymbolSpin,
  atomSpin, setAtomSpin,
  speedIdx, setSpeedIdx,
  glowIntensity, setGlowIntensity,
  scattered, setScattered,
  isResetting, handleReset,
  showParticles, setShowParticles
}) => {
  const { t } = useLanguage();
  const speed = SPEED_LEVELS[speedIdx];

  return (
    <div className="relative w-full lg:w-1/2 z-10 flex flex-col justify-start pt-4 lg:pt-0 lg:justify-center text-center lg:text-start pointer-events-none mt-10 lg:mt-0">
      <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground drop-shadow-sm">
        {t('symbolShowcase', 'title1')} <br className="hidden md:block" />
        <span className="drop-shadow-xl inline-block px-4 py-2" style={{ textShadow: `0 0 50px ${scheme.glow}`, backgroundImage: `linear-gradient(135deg, ${scheme.mid}, ${scheme.light})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 'normal' }}>
          {t('symbolShowcase', 'title2')}
        </span>
      </h2>
      <p className="mt-4 md:mt-6 text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium tracking-wide">
        {t('symbolShowcase', 'description')}
      </p>

      {/* Color Palette */}
      <div className="mt-8 flex flex-col lg:flex-row items-center gap-4 pointer-events-auto">
        <div className="flex items-center gap-2 p-2 rounded-full bg-black/5 dark:bg-white/5 border border-border/40 backdrop-blur-md shadow-lg">
          {COLOR_SCHEMES.map((s, i) => (
            <button key={s.name} onClick={() => setColorIdx(i)}
              className="w-8 h-8 rounded-full border-2 transition-all duration-300 relative group"
              style={{ 
                background: `linear-gradient(135deg, ${s.mid}, ${s.back})`, 
                boxShadow: i === colorIdx ? `0 0 20px ${s.glow.replace('0.4', '0.8')}` : 'none', 
                borderColor: i === colorIdx ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.1)' 
              }}
              title={s.name}
            >
              {i === colorIdx && <div className="absolute inset-0 rounded-full border border-white/50 animate-ping opacity-30" />}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: `inset 0 0 10px ${s.light}` }} />
            </button>
          ))}
        </div>
        <div className="flex flex-col items-center lg:items-start justify-center">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-semibold mb-0.5">Active Element</span>
          <span className="text-sm font-bold tracking-[0.15em] uppercase" style={{ color: scheme.light, textShadow: `0 0 15px ${scheme.glow}` }}>{scheme.name}</span>
        </div>
      </div>
      
      {/* Control Bar */}
      <div className="mt-5 flex items-center gap-2 flex-wrap justify-center lg:justify-start pointer-events-auto">
        <button onClick={() => setSymbolSpin(p => !p)} className={`ss-ctrl-btn ss-ctrl-wide ${symbolSpin ? 'ss-ctrl-active' : ''}`} title="Toggle Logo Spin">
          {symbolSpin ? <Pause size={14} /> : <Play size={14} />} <span className="flex items-center gap-1">Logo 𖤍</span>
        </button>
        <button onClick={() => setAtomSpin(p => !p)} className={`ss-ctrl-btn ss-ctrl-wide ${atomSpin ? 'ss-ctrl-active' : ''}`} title="Toggle Atom Spin">
          {atomSpin ? <Pause size={14} /> : <Play size={14} />} <span className="flex items-center gap-1">Atom ⚛️</span>
        </button>
        <button onClick={() => setSpeedIdx(i => (i + 1) % SPEED_LEVELS.length)} className="ss-ctrl-btn ss-ctrl-wide" title="Speed">
          <Gauge size={14} /><span>{speed.label}</span>
        </button>
        <button onClick={() => setScattered(s => !s)} className={`ss-ctrl-btn ${scattered ? 'ss-ctrl-active' : ''}`} title="Scatter 𖤍 particles">
          <Atom size={15} />
        </button>
        <button onClick={() => setGlowIntensity(g => g > 0.8 ? 0.2 : 1.5)} className={`ss-ctrl-btn ${glowIntensity > 0.8 ? 'ss-ctrl-active' : ''}`} title="Toggle Glow">
          <Sun size={15} />
        </button>
        <button onClick={() => setShowParticles(p => !p)} className={`ss-ctrl-btn ${showParticles ? 'ss-ctrl-active' : ''}`} title="Toggle Particles">
          <Sparkles size={15} />
        </button>
        <button onClick={handleReset} className="ss-ctrl-btn" title="Reset" disabled={isResetting}>
          <motion.div animate={{ rotate: isResetting ? -360 : 0 }} transition={{ duration: 0.8, ease: "circOut" }}><RotateCcw size={15} /></motion.div>
        </button>
      </div>

      {/* Explore Work */}
      <div className="mt-8 lg:mt-10 flex justify-center lg:justify-start pointer-events-auto px-6 sm:px-0">
        <motion.button 
          onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
          className="px-8 py-3.5 font-bold rounded-full flex items-center gap-2 text-white transition-all duration-300"
          style={{ background: `linear-gradient(135deg, ${scheme.mid}, ${scheme.back})`, boxShadow: `0 0 25px ${scheme.glow}` }}
        >
          <Compass size={18} /> {t('symbolShowcase', 'exploreWork')}
        </motion.button>
      </div>
    </div>
  );
};
