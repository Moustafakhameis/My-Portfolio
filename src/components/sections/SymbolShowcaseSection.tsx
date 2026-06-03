import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Text, Sparkles, Stars, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Compass } from 'lucide-react';

const ExtrudedSymbol = ({ 
  targetRotation, 
  isDragging, 
  setIsDragging, 
  controlsRef 
}: { 
  targetRotation: React.MutableRefObject<{ x: number, y: number }>,
  isDragging: boolean,
  setIsDragging: (v: boolean) => void,
  controlsRef: React.RefObject<OrbitControlsImpl>
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        targetRotation.current.y += e.movementX * 0.01;
        targetRotation.current.x += e.movementY * 0.01;
      }
    };
    const handlePointerUp = () => {
      if (isDragging) {
        setIsDragging(false);
        document.body.style.cursor = hovered ? 'grab' : 'auto';
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
  }, [isDragging, hovered, controlsRef, targetRotation, setIsDragging]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Auto spin slowly if not dragging, but keep it constrained within limits
      if (!isDragging) {
        // Create a bouncing auto-rotation so it doesn't just hit the wall and stop
        targetRotation.current.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.4;
      }
      
      // Smooth interpolation towards target rotation
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotation.current.x, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation.current.y, 0.1);
    }
  });

  const layers = 80;
  const depth = 0.008;
  const middleColor = new THREE.Color("#a855f7");
  const backColor = new THREE.Color("#4c1d95");

  return (
    <Float speed={2.5} rotationIntensity={0.5} floatIntensity={2}>
      <group 
        ref={groupRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          if (!isDragging) document.body.style.cursor = 'grab';
        }}
        onPointerOut={(e) => {
          setHovered(false);
          if (!isDragging) document.body.style.cursor = 'auto';
        }}
        onPointerDown={(e) => {
          e.stopPropagation(); // Stop OrbitControls from getting the event
          setIsDragging(true);
          document.body.style.cursor = 'grabbing';
          if (controlsRef.current) controlsRef.current.enabled = false; // Disable background rotation
        }}
      >
        {/* Mr-Eagle Hover Label (Hidden on mobile for cleaner UI) */}
        {!isMobile && (
          <Html position={[0, 2.6, 0]} center zIndexRange={[100, 0]} className="pointer-events-none">
            <AnimatePresence>
              {hovered && (
                <motion.div 
                  initial={{ opacity: 0, y: 30, scale: 0.5, rotateX: 45 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, y: 15, scale: 0.8, rotateX: -30 }}
                  transition={{ type: "spring" as any, stiffness: 400, damping: 15 }}
                >
                  <motion.div 
                    animate={{ 
                      boxShadow: [
                        "0px 0px 15px rgba(168,85,247,0.4)", 
                        "0px 0px 35px rgba(168,85,247,0.9)", 
                        "0px 0px 15px rgba(168,85,247,0.4)"
                      ] 
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-background/90 backdrop-blur-xl text-foreground font-black tracking-[0.2em] px-8 py-3 rounded-full border border-primary/50 whitespace-nowrap uppercase"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">
                      Mr-Eagle
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </Html>
        )}

        {/* Front Face */}
        <Text
          position={[0, 0, 0]}
          fontSize={4.5}
          color="#f3e8ff"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          𖤍
        </Text>

        {/* Core Extrusion Layers (High Density for Solid Illusion) */}
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

        {/* Back Face (Rotated to read correctly from behind) */}
        <Text
          position={[0, 0, -(layers + 1) * depth]}
          rotation={[0, Math.PI, 0]}
          fontSize={4.5}
          color="#f3e8ff"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          𖤍
        </Text>
      </group>
    </Float>
  );
};

const SceneLayout = ({ targetRotation, isDragging, setIsDragging, controlsRef }: any) => {
  const { viewport } = useThree();
  const isMobile = window.innerWidth < 768;
  
  return (
    <group position={[isMobile ? 0 : viewport.width / 4, isMobile ? -5.5 : 0, 0]}>
      <ExtrudedSymbol 
        targetRotation={targetRotation} 
        isDragging={isDragging} 
        setIsDragging={setIsDragging} 
        controlsRef={controlsRef} 
      />
      <ContactShadows position={[0, -4.5, 0]} opacity={0.6} scale={25} blur={2.5} far={10} color="#7e22ce" />
    </group>
  );
};

export const SymbolShowcaseSection = () => {
  const { theme } = useTheme();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  
  // Independent rotation state for the figure
  const targetRotation = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const [isResetting, setIsResetting] = useState(false);

  const handleReset = () => {
    setIsResetting(true);
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    targetRotation.current = { x: 0, y: 0 };
    
    // Stop the spinning animation after the transition
    setTimeout(() => setIsResetting(false), 800);
  };



  return (
    <section className="relative min-h-[700px] w-full bg-background border-t border-border/10 flex flex-col md:flex-row items-center justify-between px-6 md:px-24 py-20 overflow-hidden">
      
      {/* Full-width 3D Canvas Background */}
      <div className={`absolute inset-0 z-0 pointer-events-auto ${isDragging ? 'cursor-grabbing' : 'cursor-move'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        
        <Canvas dpr={[1, 1.5]} performance={{ min: 0.5 }} camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={2} color="#c084fc" />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={3} color="#ec4899" />
          <pointLight position={[0, 0, 5]} intensity={1} color={theme === 'dark' ? "#f3e8ff" : "#9333ea"} />
          
          <SceneLayout 
            targetRotation={targetRotation}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            controlsRef={controlsRef}
          />
          
          {theme === 'dark' && <Stars radius={50} depth={50} count={window.innerWidth < 768 ? 800 : 3000} factor={3} saturation={1} fade speed={1.5} />}
          <Sparkles count={window.innerWidth < 768 ? 100 : 300} scale={20} size={6} speed={0.5} opacity={theme === 'dark' ? 0.5 : 0.8} color={theme === 'dark' ? "#e9d5ff" : "#9333ea"} />
          
          <Environment preset="city" />
          <OrbitControls 
            ref={controlsRef}
            makeDefault
            enableZoom={false} 
            enablePan={false} 
            enableRotate={true}
            maxDistance={20}
            minDistance={3}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Canvas>
      </div>

      {/* Foreground Text Overlay */}
      <div className="relative w-full md:w-1/2 z-10 flex flex-col justify-start pt-4 md:pt-0 md:justify-center text-center md:text-left pointer-events-none mt-10 md:mt-0">
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground drop-shadow-sm">
          The Mark of <br className="hidden md:block" />
          <span className="text-primary text-gradient drop-shadow-[0_0_40px_rgba(168,85,247,0.3)]">Excellence</span>
        </h2>
        <p className="mt-4 md:mt-6 text-xl md:text-2xl text-muted-foreground font-medium tracking-wide drop-shadow-sm">Interactive 3D typography</p>
        
        {/* Action & Control Buttons */}
        <div className="mt-8 md:mt-12 flex flex-col items-center md:items-start gap-6 pointer-events-auto">
          
          {/* Primary Actions */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <motion.button 
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05, y: -2 }} 
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center gap-2"
            >
              <Compass size={18} /> Explore Work
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(168,85,247,0.15)" }} 
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              disabled={isResetting}
              className="px-8 py-3 bg-card/40 backdrop-blur-md border border-primary/30 text-foreground font-semibold rounded-full shadow-sm flex items-center gap-2 transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] group overflow-hidden"
            >
              <motion.div
                animate={{ rotate: isResetting ? -360 : 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
              >
                <RotateCcw size={18} className="text-primary group-hover:text-pink-400 transition-colors" />
              </motion.div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground group-hover:from-primary group-hover:to-pink-500 transition-colors duration-300">
                {isResetting ? "Resetting..." : "Reset"}
              </span>
            </motion.button>
          </div>



        </div>
      </div>
    </section>
  );
};
