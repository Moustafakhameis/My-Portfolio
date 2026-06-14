import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Use framer-motion springs instead of transition prop for direct value mapping
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 });
  
  const innerSmoothX = useSpring(mouseX, { stiffness: 100, damping: 20, mass: 0.1 });
  const innerSmoothY = useSpring(mouseY, { stiffness: 100, damping: 20, mass: 0.1 });

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('magnetic')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{ 
          x: smoothX, 
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: 1,
        }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{ 
          x: innerSmoothX, 
          y: innerSmoothY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
      />
    </>
  );
};
