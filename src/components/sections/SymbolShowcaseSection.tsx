import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Text, Sparkles, Stars, ContactShadows, Html, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { RotateCcw, Compass, Play, Pause, Sun, Gauge, Atom } from 'lucide-react';

/* ─── Color Schemes ─── */
const COLOR_SCHEMES = [
  { name: 'Violet',  front: '#f3e8ff', mid: '#a855f7', back: '#4c1d95', glow: 'rgba(168,85,247,0.4)', ring: '#c084fc', spark: '#e9d5ff', light: '#ec4899' },
  { name: 'Cyan',    front: '#e0f7fa', mid: '#06b6d4', back: '#0e4f5c', glow: 'rgba(6,182,212,0.4)',   ring: '#22d3ee', spark: '#a5f3fc', light: '#0ea5e9' },
  { name: 'Rose',    front: '#ffe4e6', mid: '#f43f5e', back: '#881337', glow: 'rgba(244,63,94,0.4)',    ring: '#fb7185', spark: '#fecdd3', light: '#f97316' },
  { name: 'Amber',   front: '#fef3c7', mid: '#f59e0b', back: '#78350f', glow: 'rgba(245,158,11,0.4)',   ring: '#fbbf24', spark: '#fde68a', light: '#ef4444' },
  { name: 'Emerald', front: '#a7f3d0', mid: '#059669', back: '#064e3b', light: '#d1fae5', glow: 'rgba(5,150,105,0.4)', ring: '#34d399', spark: '#ecfdf5' },
  { name: 'Plasma', front: '#f9a8d4', mid: '#db2777', back: '#831843', light: '#fbcfe8', glow: 'rgba(219,39,119,0.4)', ring: '#f472b6', spark: '#fdf2f8' },
  { name: 'Electric', front: '#93c5fd', mid: '#3b82f6', back: '#1e3a8a', light: '#bfdbfe', glow: 'rgba(59,130,246,0.4)', ring: '#60a5fa', spark: '#eff6ff' },
  { name: 'Toxic', front: '#d9f99d', mid: '#84cc16', back: '#3f6212', light: '#ecfccb', glow: 'rgba(132,204,22,0.4)', ring: '#a3e635', spark: '#f7fee7' }
];

const SPEED_LEVELS = [
  { label: '0.5×', value: 0.15 },
  { label: '1×',   value: 0.3  },
  { label: '2×',   value: 0.6  },
  { label: '3×',   value: 1.0  },
];

/* ─── Atomic Ring (Perfect circular glossy tube) ─── */
const AtomicRing = ({ radius, tube, color, rotation, intensity = 1 }: { 
  radius: number; tube: number; color: string; rotation: [number, number, number]; intensity?: number;
}) => {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[radius, tube, 64, 128]} />
      <meshPhysicalMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.8 * intensity} 
        roughness={0.1} 
        metalness={0.6}
        transparent 
        opacity={0.85}
        clearcoat={1}
        clearcoatRoughness={0.1}
        toneMapped={false} 
      />
    </mesh>
  );
};

/* ─── Glowing Electron (Orbiting perfectly along the atomic rings) ─── */
const AtomicElectron = ({ radius, speed, color, rotation, phase = 0, intensity = 1, atomSpin }: { 
  radius: number; speed: number; color: string; rotation: [number, number, number]; phase?: number; intensity?: number; atomSpin: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const trailGroupRef = useRef<THREE.Group>(null!);
  const angle = useRef(phase);
  const pulseTime = useRef(0);
  
  useFrame((state, delta) => {
    if (meshRef.current && trailGroupRef.current) {
      // Only increment time variables if the animation is actually spinning
      if (atomSpin) {
        angle.current += speed * delta;
        pulseTime.current += delta;
      }
      
      // Orbit in the XY plane matching the TorusGeometry
      meshRef.current.position.x = Math.cos(angle.current) * radius;
      meshRef.current.position.y = Math.sin(angle.current) * radius;
      meshRef.current.position.z = 0;
      
      const pulse = 1 + Math.sin(pulseTime.current * 6) * 0.25;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group rotation={rotation} ref={trailGroupRef}>
      <Trail
        width={1.2}
        length={8}
        color={new THREE.Color(color)}
        attenuation={(w) => w * w}
      >
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.15, 24, 24]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive={color} 
            emissiveIntensity={10 * intensity} 
            toneMapped={false} 
          />
        </mesh>
      </Trail>
    </group>
  );
};

/* ─── Orbiting Mini 𖤍 ─── */
const OrbitingMiniSymbol = ({ radius, speed, color, tilt, phase = 0, size = 0.4, atomSpin }: {
  radius: number; speed: number; color: string; tilt: [number, number, number]; phase?: number; size?: number; atomSpin: boolean;
}) => {
  const ref = useRef<THREE.Group>(null);
  const angle = useRef(phase);
  const rotZ = useRef(0);
  const rotY = useRef(0);

  useFrame((state, delta) => {
    if (ref.current) {
      if (atomSpin) {
        angle.current += speed * delta;
        rotZ.current += 2 * delta;
        rotY.current += 1.2 * delta;
      }
      ref.current.position.x = Math.cos(angle.current) * radius;
      ref.current.position.y = Math.sin(angle.current) * radius;
      ref.current.position.z = Math.sin(angle.current * 0.5) * (radius * 0.4);
      ref.current.rotation.z = rotZ.current;
      ref.current.rotation.y = rotY.current;
    }
  });

  return (
    <group rotation={tilt}>
      <group ref={ref}>
        <Text fontSize={size} anchorX="center" anchorY="middle">
          <meshBasicMaterial color={color} toneMapped={false} />
          𖤍
        </Text>
      </group>
    </group>
  );
};

/* ─── Scene Ready Tracker ─── */
function SceneReady({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    // Wait a brief moment after mounting to ensure the first frame renders
    const timer = setTimeout(onReady, 100);
    return () => clearTimeout(timer);
  }, [onReady]);
  return null;
}

/* ─── Extruded Symbol ─── */
const ExtrudedSymbol = ({ 
  targetRotation, isDragging, setIsDragging, controlsRef, isMobile,
  colorScheme, symbolSpin, atomSpin, speedValue, glowIntensity, scattered,
}: { 
  targetRotation: React.MutableRefObject<{ x: number, y: number }>,
  isDragging: boolean,
  setIsDragging: (v: boolean) => void,
  controlsRef: React.RefObject<OrbitControlsImpl>,
  isMobile: boolean,
  colorScheme: typeof COLOR_SCHEMES[0],
  symbolSpin: boolean,
  atomSpin: boolean,
  speedValue: number,
  glowIntensity: number,
  scattered: boolean,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const atomGroupRef = useRef<THREE.Group>(null);
  const { invalidate } = useThree();

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        targetRotation.current.y += e.movementX * 0.01;
        targetRotation.current.x += e.movementY * 0.01;
        invalidate(); // Force frame render for smooth drag under demand mode
      }
    };
    const handlePointerUp = () => {
      if (isDragging) {
        setIsDragging(false);
        document.body.style.cursor = '';
        if (controlsRef.current) controlsRef.current.enabled = true;
      }
    };
    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, controlsRef, targetRotation, setIsDragging]);

  useFrame((state, rawDelta) => {
    // If the delta is suspiciously large (> 0.1s), it means the tab was just focused or the canvas just scrolled back into view.
    // Instead of clamping it to 0.1s (which still causes a tiny 'jump' movement), we set it to 0 so it resumes perfectly smoothly.
    const delta = rawDelta > 0.1 ? 0 : rawDelta;
    
    if (groupRef.current) {
      if (!isDragging) {
        if (symbolSpin) {
          // Full 360-degree continuous spin restored
          targetRotation.current.y += speedValue * delta;
        } else if (!atomSpin) {
          // Aesthetic pause pose: Slightly tilted up, rotated slightly left
          const AESTHETIC_X = 0.15;
          const AESTHETIC_Y = -0.3;
          
          targetRotation.current.x = THREE.MathUtils.lerp(targetRotation.current.x, AESTHETIC_X, 2 * delta);
          
          const currentY = targetRotation.current.y;
          let diffY = AESTHETIC_Y - (currentY % (Math.PI * 2));
          if (diffY > Math.PI) diffY -= Math.PI * 2;
          if (diffY < -Math.PI) diffY += Math.PI * 2;
          targetRotation.current.y += diffY * 2 * delta;
        }
      }

      const diffX = targetRotation.current.x - groupRef.current.rotation.x;
      const diffY = targetRotation.current.y - groupRef.current.rotation.y;
      const dist = diffX * diffX + diffY * diffY;
      
      // Only lerp and force frames if distance is significant to prevent micro-drifts and stutter
      if (dist > 0.00001 || isDragging || symbolSpin) {
        groupRef.current.rotation.x += diffX * (isDragging ? 0.3 : 0.1);
        groupRef.current.rotation.y += diffY * (isDragging ? 0.3 : 0.1);
        invalidate();
      } else {
        // Snap exactly to target when close enough to completely decouple from React state changes
        groupRef.current.rotation.x = targetRotation.current.x;
        groupRef.current.rotation.y = targetRotation.current.y;
      }
    }

    if (atomGroupRef.current) {
      if (atomSpin) {
        // The atom rings also spin continuously for dynamic energy
        atomGroupRef.current.rotation.y += speedValue * delta * 1.5;
        atomGroupRef.current.rotation.z += speedValue * delta * 0.2;
        invalidate();
      } else if (!symbolSpin) {
        // Return atom rings to aesthetic pose
        const AESTHETIC_ATOM_Y = 0;
        const AESTHETIC_ATOM_Z = 0;
        const currentY = atomGroupRef.current.rotation.y;
        const currentZ = atomGroupRef.current.rotation.z;
        
        let dY = AESTHETIC_ATOM_Y - (currentY % (Math.PI * 2));
        if (dY > Math.PI) dY -= Math.PI * 2;
        if (dY < -Math.PI) dY += Math.PI * 2;
        
        let dZ = AESTHETIC_ATOM_Z - (currentZ % (Math.PI * 2));
        if (dZ > Math.PI) dZ -= Math.PI * 2;
        if (dZ < -Math.PI) dZ += Math.PI * 2;
        
        if (Math.abs(dY) > 0.001 || Math.abs(dZ) > 0.001) {
          atomGroupRef.current.rotation.y += dY * 2 * delta;
          atomGroupRef.current.rotation.z += dZ * 2 * delta;
          invalidate();
        } else {
          atomGroupRef.current.rotation.y = Math.round(currentY / (Math.PI*2)) * (Math.PI*2) + AESTHETIC_ATOM_Y;
          atomGroupRef.current.rotation.z = Math.round(currentZ / (Math.PI*2)) * (Math.PI*2) + AESTHETIC_ATOM_Z;
        }
      }
    }
  });

  // Reduced layer count to 40. 100 layers caused a WebGL crash due to too many Troika text instances.
  // 40 layers with 0.01 depth provides a solid 0.4 thickness with decent performance.
  const layers = 40;
  const depth = 0.01;
  const middleColor = new THREE.Color(colorScheme.mid);
  const backColor = new THREE.Color(colorScheme.back);

  const miniSymbols = useMemo(() => {
    const items = [];
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      items.push({
        radius: 2.8 + Math.random() * 2.5,
        speed: (0.4 + Math.random() * 0.6) * (i % 2 === 0 ? 1 : -1),
        tilt: [Math.random() * Math.PI, Math.random() * Math.PI, angle] as [number, number, number],
        phase: angle,
        size: 0.25 + Math.random() * 0.35,
      });
    }
    return items;
  }, []);

  return (
    <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1.5}>
      <group 
        ref={groupRef}
        onPointerMissed={() => { if (controlsRef.current) controlsRef.current.enabled = false; }}
        onPointerDown={(e) => { e.stopPropagation(); setIsDragging(true); document.body.style.cursor = 'grabbing'; if (controlsRef.current) controlsRef.current.enabled = false; }}
      >
        {/* ─── Atomic Structure ─── */}
        {/* We wrap the atom rings in a group to tilt the entire structure to look good on camera */}
        <group ref={atomGroupRef} rotation={[Math.PI / 4, 0, Math.PI / 6]}>
          {/* Ring 1 - Flat */}
          <AtomicRing radius={4.2} tube={0.05} color={colorScheme.ring} rotation={[0, 0, 0]} intensity={glowIntensity} />
          <AtomicElectron radius={4.2} speed={1.2} color={colorScheme.ring} rotation={[0, 0, 0]} phase={0} intensity={glowIntensity} atomSpin={atomSpin} />

          {/* Ring 2 - Rotated 60 degrees around Y */}
          <AtomicRing radius={4.2} tube={0.05} color={colorScheme.mid} rotation={[0, Math.PI / 3, 0]} intensity={glowIntensity} />
          <AtomicElectron radius={4.2} speed={1.2} color={colorScheme.mid} rotation={[0, Math.PI / 3, 0]} phase={Math.PI / 2} intensity={glowIntensity} atomSpin={atomSpin} />

          {/* Ring 3 - Rotated 120 degrees around Y */}
          <AtomicRing radius={4.2} tube={0.05} color={colorScheme.light} rotation={[0, 2 * Math.PI / 3, 0]} intensity={glowIntensity} />
          <AtomicElectron radius={4.2} speed={1.2} color={colorScheme.light} rotation={[0, 2 * Math.PI / 3, 0]} phase={Math.PI} intensity={glowIntensity} atomSpin={atomSpin} />
        </group>

        {/* ─── Inner Symbol (The "Nucleus") ─── */}
        {/* Front Face */}
        <Text position={[0, 0, 0]} fontSize={4.5} color={colorScheme.front} anchorX="center" anchorY="middle" material-toneMapped={false}>
          𖤍
        </Text>

        {/* Core Extrusion Layers */}
        {[...Array(layers)].map((_, i) => (
          <Text
            key={`core-${i}`}
            position={[0, 0, -(i + 1) * depth]}
            fontSize={4.5}
            color={middleColor.clone().lerp(backColor, i / layers)}
            anchorX="center"
            anchorY="middle"
            material-toneMapped={false}
          >
            𖤍
          </Text>
        ))}

        {/* Back Face */}
        <Text position={[0, 0, -(layers + 1) * depth]} rotation={[0, Math.PI, 0]} fontSize={4.5} color={colorScheme.front} anchorX="center" anchorY="middle" material-toneMapped={false}>
          𖤍
        </Text>

        {/* ─── Scattered Mini 𖤍 (toggled by Atom button) ─── */}
        {scattered && miniSymbols.map((ms, i) => (
          <OrbitingMiniSymbol
            key={`mini-${i}`}
            radius={ms.radius}
            speed={ms.speed}
            color={i % 3 === 0 ? colorScheme.front : i % 3 === 1 ? colorScheme.ring : colorScheme.mid}
            tilt={ms.tilt}
            phase={ms.phase}
            size={ms.size}
            atomSpin={atomSpin}
          />
        ))}
      </group>
    </Float>
  );
};

/* ─── Camera Rig for Responsive Offset ─── */
const CameraRig = ({ isTabletCheck }: { isTabletCheck: boolean }) => {
  const { size, camera } = useThree();
  
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      if (!isTabletCheck) {
        // Shift the viewport left by 25%, causing the center (and our model) to move 25% right
        camera.setViewOffset(size.width, size.height, -size.width * 0.25, 0, size.width, size.height);
      } else {
        camera.clearViewOffset();
      }
      camera.updateProjectionMatrix();
    }
  }, [size.width, size.height, isTabletCheck, camera]);
  
  return null;
};

/* ─── Scene Layout ─── */
const SceneLayout = (props: any) => {
  const { viewport } = useThree();
  const { language } = useLanguage();
  
  const xPos = 0; // Handled perfectly by the camera offset now
  const yPos = props.isMobileCheck ? -2.2 : 0;
  // Adjusted scale for better responsive fit
  const scale = props.isMobileCheck ? 0.45 : (props.isTabletCheck ? 0.55 : 0.65);
  
  return (
    <group position={[xPos, yPos, 0]} scale={scale}>
      <ExtrudedSymbol 
        targetRotation={props.targetRotation}
        isDragging={props.isDragging}
        setIsDragging={props.setIsDragging}
        controlsRef={props.controlsRef}
        isMobile={props.isMobileCheck}
        colorScheme={props.colorScheme}
        symbolSpin={props.symbolSpin}
        atomSpin={props.atomSpin}
        speedValue={props.speedValue}
        glowIntensity={props.glowIntensity}
        scattered={props.scattered}
      />
      <ContactShadows position={[0, -3.5, 0]} opacity={0.6} scale={25} blur={2.5} far={10} color={props.colorScheme.back} />
    </group>
  );
};

/* ─── Main Section ─── */
export const SymbolShowcaseSection = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const controlsRef = useRef<OrbitControlsImpl>(null);
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
  

  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { margin: "200px 0px 200px 0px" });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Removed the unnecessary isSceneReady reset on scroll out of view.
  // The assets only need to load once via Suspense.

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
    if (controlsRef.current) controlsRef.current.reset();
    setSymbolSpin(false); setAtomSpin(false); setSpeedIdx(1); setGlowIntensity(1.0); setScattered(false);
    setTimeout(() => setIsResetting(false), 800);
  };

  const needsAnimation = symbolSpin || atomSpin;

  return (
    <section ref={containerRef} className="relative min-h-[700px] w-full bg-background border-t border-border/10 flex flex-col lg:flex-row items-center justify-between px-6 md:px-24 pt-20 pb-32 md:pb-24 overflow-hidden">
      
      {/* 3D Canvas */}
      <div dir="ltr" className={`absolute inset-0 z-0 pointer-events-auto ${isDragging ? 'cursor-grabbing' : 'cursor-move'}`}>
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
              
              <CameraRig isTabletCheck={isTablet} />
              <SceneLayout 
                targetRotation={targetRotation} isDragging={isDragging} setIsDragging={setIsDragging}
                controlsRef={controlsRef} isMobileCheck={isMobile} isTabletCheck={isTablet} colorScheme={scheme}
                symbolSpin={symbolSpin} atomSpin={atomSpin} speedValue={speed.value} glowIntensity={glowIntensity} scattered={scattered}
              />
              
              {theme === 'dark' && <Stars radius={50} depth={50} count={isMobile ? 150 : 500} factor={3} saturation={1} fade speed={1.5} />}
              <Sparkles count={isMobile ? 20 : 80} scale={20} size={8} speed={0.4} opacity={0.6} color={scheme.spark} />
              
              <Environment preset="city" />
              <OrbitControls target={[0, 0, 0]} ref={controlsRef} makeDefault enableZoom={false} enablePan={false} enableRotate maxDistance={20} minDistance={3} enableDamping dampingFactor={0.05} />
            </Suspense>
          </Canvas>
      </div>

      {/* Text Overlay */}
      <div className="relative w-full lg:w-1/2 z-10 flex flex-col justify-start pt-4 lg:pt-0 lg:justify-center text-center lg:text-start pointer-events-none mt-10 lg:mt-0">
        <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground drop-shadow-sm">
          {t('symbolShowcase', 'title1')} <br className="hidden md:block" />
          <span className="drop-shadow-xl" style={{ textShadow: `0 0 50px ${scheme.glow}`, backgroundImage: `linear-gradient(135deg, ${scheme.mid}, ${scheme.light})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {t('symbolShowcase', 'title2')}
          </span>
        </h2>
        <p className="mt-4 md:mt-6 text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium tracking-wide">{t('symbolShowcase', 'description')}</p>

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
      `}</style>
    </section>
  );
};
