import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, Html, Stars, Sparkles } from '@react-three/drei';
import { useInView } from 'framer-motion';

import { useTheme } from '../../../context/ThemeContext';
import { SceneReady } from './SceneReady';
import { SceneLayout } from './SceneLayout';
import { ShowcaseUI } from './ShowcaseUI';
import { COLOR_SCHEMES, SPEED_LEVELS } from './types';

export const SymbolShowcaseSection = () => {
  const { theme } = useTheme();
  const targetRotation = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isSceneReady, setIsSceneReady] = useState(false);

  const [colorIdx, setColorIdx] = useState(0);
  const [symbolSpin, setSymbolSpin] = useState(false);
  const [atomSpin, setAtomSpin] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(1);
  const [glowIntensity, setGlowIntensity] = useState(1.0);
  const [scattered, setScattered] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { margin: "200px 0px 200px 0px" });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isTablet = windowWidth < 1024;
  const isMobile = windowWidth < 768;

  const scheme = COLOR_SCHEMES[colorIdx];
  const speed = SPEED_LEVELS[speedIdx];

  const handleReset = () => {
    setIsResetting(true);
    targetRotation.current = { x: 0, y: 0 };
    setSymbolSpin(false); setAtomSpin(false); setSpeedIdx(1); setGlowIntensity(1.0); setScattered(false);
    setTimeout(() => setIsResetting(false), 800);
  };

  const needsAnimation = symbolSpin || atomSpin || isResetting;

  return (
    <section ref={containerRef} className="relative min-h-[700px] w-full bg-background border-t border-border/10 flex flex-col lg:flex-row items-center justify-between px-6 md:px-24 pt-20 pb-32 md:pb-24 overflow-hidden">
      
      {/* 3D Canvas */}
      {/* Pointer-Events CSS Lock via Vanilla DOM */}
      <div id="ss-canvas-wrapper" dir="ltr" className={`ss-canvas-wrapper absolute inset-0 z-0 pointer-events-auto ${isDragging ? 'cursor-grabbing' : 'cursor-move'}`}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 65% 50%, ${scheme.glow.replace('0.4', '0.15')}, transparent 60%)` }} />
        
        {/* Loader while Canvas initializes */}
        {isInView && !isSceneReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
            <span className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">Initializing 3D Engine...</span>
          </div>
        )}

        <Canvas 
          frameloop={!isSceneReady || (isInView && needsAnimation) ? 'always' : 'demand'} 
          dpr={[1, 1.5]} 
          performance={{ min: 0.5 }} 
          camera={{ position: [0, 0, 10], fov: 45 }}
          resize={{ scroll: false, offsetSize: true }}
          className={isSceneReady ? 'opacity-100' : 'opacity-0'}
          style={{ transition: 'opacity 0.5s ease-in-out', zIndex: 1 }}
        >
          <Suspense fallback={
            <Html center><div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></Html>
          }>
            <SceneReady onReady={() => setIsSceneReady(true)} />
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 10]} intensity={2.5 * glowIntensity} color={scheme.mid} />
            <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={4 * glowIntensity} color={scheme.light} />
            <pointLight position={[0, 0, 5]} intensity={1.5 * glowIntensity} color={scheme.front} />
            <pointLight position={[0, -5, 3]} intensity={1 * glowIntensity} color={scheme.ring} />
            
            <SceneLayout 
              targetRotation={targetRotation} isDragging={isDragging} setIsDragging={setIsDragging}
              isMobileCheck={isMobile} isTabletCheck={isTablet} colorScheme={scheme}
              symbolSpin={symbolSpin} atomSpin={atomSpin} speedValue={speed.value} glowIntensity={glowIntensity} scattered={scattered}
            />
            
            {showParticles && theme === 'dark' && <Stars radius={50} depth={50} count={isMobile ? 150 : 500} factor={3} saturation={1} fade speed={1.5} />}
            {showParticles && <Sparkles count={isMobile ? 20 : 80} scale={20} size={8} speed={0.4} opacity={0.6} color={scheme.spark} />}

            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      <ShowcaseUI 
        scheme={scheme} colorIdx={colorIdx} setColorIdx={setColorIdx}
        symbolSpin={symbolSpin} setSymbolSpin={setSymbolSpin}
        atomSpin={atomSpin} setAtomSpin={setAtomSpin}
        speedIdx={speedIdx} setSpeedIdx={setSpeedIdx}
        glowIntensity={glowIntensity} setGlowIntensity={setGlowIntensity}
        scattered={scattered} setScattered={setScattered}
        isResetting={isResetting} handleReset={handleReset}
        showParticles={showParticles} setShowParticles={setShowParticles}
      />

      <style>{`
        .ss-ctrl-btn {
          display: flex; align-items: center; justify-content: center; gap: 5px;
          width: 40px; height: 40px; border-radius: 12px;
          border: 1px solid var(--border);
          background: rgba(128,128,128,0.08);
          backdrop-filter: blur(12px);
          color: var(--muted-foreground);
          font-size: 12px; font-weight: 600;
          cursor: pointer; transition: all 0.25s ease;
        }
        .ss-ctrl-btn:hover {
          background: rgba(128,128,128,0.15); color: var(--foreground);
          border-color: ${scheme.mid}50;
          box-shadow: 0 0 18px ${scheme.glow};
          transform: translateY(-2px);
        }
        .ss-ctrl-wide { width: auto; padding: 0 14px; }
        .ss-ctrl-active {
          background: ${scheme.mid}22; color: ${scheme.mid};
          border-color: ${scheme.mid}55; box-shadow: 0 0 14px ${scheme.glow};
        }
        .ss-canvas-wrapper {
          touch-action: auto !important;
        }
        .ss-canvas-wrapper canvas {
          touch-action: auto !important;
        }
      `}</style>
    </section>
  );
};
