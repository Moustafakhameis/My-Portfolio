import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import type { ColorScheme } from './types';

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
      if (atomSpin) {
        angle.current += speed * delta;
        pulseTime.current += delta;
      }
      meshRef.current.position.x = Math.cos(angle.current) * radius;
      meshRef.current.position.y = Math.sin(angle.current) * radius;
      meshRef.current.position.z = 0;
      const pulse = 1 + Math.sin(pulseTime.current * 6) * 0.25;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group rotation={rotation} ref={trailGroupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={10 * intensity} toneMapped={false} />
      </mesh>
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

export const ExtrudedSymbol = ({ 
  targetRotation, isDragging, setIsDragging, controlsRef, isMobile,
  colorScheme, symbolSpin, atomSpin, speedValue, glowIntensity, scattered,
}: { 
  targetRotation: React.MutableRefObject<{ x: number, y: number }>,
  isDragging: boolean,
  setIsDragging: (v: boolean) => void,
  isMobile: boolean,
  colorScheme: ColorScheme,
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
        invalidate(); 
      }
    };
    const handlePointerUp = () => {
      if (isDragging) {
        setIsDragging(false);
        document.body.style.cursor = '';
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
  }, [isDragging, targetRotation, setIsDragging, invalidate]);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    
    if (groupRef.current) {
      if (!isDragging) {
        if (symbolSpin) {
          targetRotation.current.y += speedValue * delta;
        } else if (!atomSpin) {
          const AESTHETIC_X = 0.15;
          const AESTHETIC_Y = -0.3;
          
          const currentY = targetRotation.current.y;
          let dY = AESTHETIC_Y - (currentY % (Math.PI * 2));
          if (dY > Math.PI) dY -= Math.PI * 2;
          if (dY < -Math.PI) dY += Math.PI * 2;
          
          const dX = AESTHETIC_X - targetRotation.current.x;
          
          if (Math.abs(dX) < 0.01 && Math.abs(dY) < 0.01) {
            targetRotation.current.x = AESTHETIC_X;
            targetRotation.current.y = currentY + dY;
          } else {
            targetRotation.current.x += dX * 2 * delta;
            targetRotation.current.y += dY * 2 * delta;
          }
        }
      }

      const diffX = targetRotation.current.x - groupRef.current.rotation.x;
      const diffY = targetRotation.current.y - groupRef.current.rotation.y;
      const dist = diffX * diffX + diffY * diffY;
      
      if (dist > 0.001 || isDragging || symbolSpin) {
        groupRef.current.rotation.x += diffX * (isDragging ? 0.3 : 0.1);
        groupRef.current.rotation.y += diffY * (isDragging ? 0.3 : 0.1);
        invalidate();
      } else {
        groupRef.current.rotation.x = targetRotation.current.x;
        groupRef.current.rotation.y = targetRotation.current.y;
      }
    }

    if (atomGroupRef.current) {
      if (atomSpin) {
        atomGroupRef.current.rotation.y += speedValue * delta * 1.5;
        atomGroupRef.current.rotation.z += speedValue * delta * 0.2;
        invalidate();
      } else if (!symbolSpin) {
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
    <group>
      <group 
        ref={groupRef}
        onPointerDown={(e) => { e.stopPropagation(); setIsDragging(true); document.body.style.cursor = 'grabbing'; }}
      >
        <group ref={atomGroupRef} rotation={[Math.PI / 4, 0, Math.PI / 6]}>
          <AtomicRing radius={4.2} tube={0.05} color={colorScheme.ring} rotation={[0, 0, 0]} intensity={glowIntensity} />
          <AtomicElectron radius={4.2} speed={1.2} color={colorScheme.ring} rotation={[0, 0, 0]} phase={0} intensity={glowIntensity} atomSpin={atomSpin} />
          <AtomicRing radius={4.2} tube={0.05} color={colorScheme.mid} rotation={[0, Math.PI / 3, 0]} intensity={glowIntensity} />
          <AtomicElectron radius={4.2} speed={1.2} color={colorScheme.mid} rotation={[0, Math.PI / 3, 0]} phase={Math.PI / 2} intensity={glowIntensity} atomSpin={atomSpin} />
          <AtomicRing radius={4.2} tube={0.05} color={colorScheme.light} rotation={[0, 2 * Math.PI / 3, 0]} intensity={glowIntensity} />
          <AtomicElectron radius={4.2} speed={1.2} color={colorScheme.light} rotation={[0, 2 * Math.PI / 3, 0]} phase={Math.PI} intensity={glowIntensity} atomSpin={atomSpin} />
        </group>

        <Text position={[0, 0, 0]} fontSize={4.5} color={colorScheme.front} anchorX="center" anchorY="middle" material-toneMapped={false}>
          𖤍
        </Text>

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

        <Text position={[0, 0, -(layers + 1) * depth]} rotation={[0, Math.PI, 0]} fontSize={4.5} color={colorScheme.front} anchorX="center" anchorY="middle" material-toneMapped={false}>
          𖤍
        </Text>

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
    </group>
  );
};
