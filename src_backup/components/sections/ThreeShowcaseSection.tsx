import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, MeshDistortMaterial, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useLanguage } from '../../context/LanguageContext';

const GlassCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <RoundedBox ref={meshRef} args={[2, 2, 2]} radius={0.1} smoothness={4}>
        <MeshDistortMaterial
          color="#a855f7"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          transmission={1}
          thickness={0.5}
        />
      </RoundedBox>
    </Float>
  );
};

export const ThreeShowcaseSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[600px] w-full bg-background flex flex-col md:flex-row items-center justify-between px-6 md:px-24 py-20 overflow-hidden border-t border-border/10">
      {/* Left side: Text Container */}
      <div className="w-full md:w-1/2 z-10 flex flex-col justify-center text-center md:text-start mb-12 md:mb-0">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground drop-shadow-md">
          {t('threeShowcase', 'title1')} <br />
          <span className="text-primary text-gradient">{t('threeShowcase', 'title2')}</span>
        </h2>
        <p className="mt-4 text-xl text-muted-foreground font-medium drop-shadow-sm">{t('threeShowcase', 'description')}</p>
      </div>
      
      {/* Right side: 3D Canvas Container */}
      <div dir="ltr" className="w-full md:w-1/2 h-[400px] md:h-[600px] z-0">
        <Canvas dpr={[1, 1]} performance={{ min: 0.5 }} camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <GlassCube />
          <Environment preset="city" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
      </div>
    </section>
  );
};
