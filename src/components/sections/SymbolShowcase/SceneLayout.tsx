import React from 'react';
import { useThree } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import type { ColorScheme } from './types';
import { ExtrudedSymbol } from './ExtrudedSymbol';

export const SceneLayout = (props: {
  targetRotation: React.MutableRefObject<{ x: number, y: number }>;
  isDragging: boolean;
  setIsDragging: (v: boolean) => void;
  isMobileCheck: boolean;
  isTabletCheck: boolean;
  colorScheme: ColorScheme;
  symbolSpin: boolean;
  atomSpin: boolean;
  speedValue: number;
  glowIntensity: number;
  scattered: boolean;
}) => {
  const xPos = props.isTabletCheck ? 0 : 3.5; 
  const yPos = props.isMobileCheck ? -2.2 : (props.isTabletCheck ? -1 : 0);
  const scale = props.isMobileCheck ? 0.45 : (props.isTabletCheck ? 0.55 : 0.65);
  
  return (
    <group position={[xPos, yPos, 0]} scale={scale}>
      <ExtrudedSymbol 
        targetRotation={props.targetRotation}
        isDragging={props.isDragging}
        setIsDragging={props.setIsDragging}
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
