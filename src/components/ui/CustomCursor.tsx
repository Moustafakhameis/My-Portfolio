import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Ultra-smooth spring physics for different cursor layers
  // The outer ring is the most responsive
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20, mass: 0.1 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20, mass: 0.1 });
  
  // The inner dot drags slightly behind the ring
  const innerSmoothX = useSpring(mouseX, { stiffness: 150, damping: 25, mass: 0.1 });
  const innerSmoothY = useSpring(mouseY, { stiffness: 150, damping: 25, mass: 0.1 });

  // The massive background glow has the most drag for a fluid "trailing" effect
  const glowSmoothX = useSpring(mouseX, { stiffness: 80, damping: 30, mass: 0.1 });
  const glowSmoothY = useSpring(mouseY, { stiffness: 80, damping: 30, mass: 0.1 });

  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTextHovering, setIsTextHovering] = useState(false);

  // Track previous state to prevent redundant re-renders
  const prevHover = useRef(false);
  const prevText = useRef(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      let newHover = false;
      let newText = false;

      // Interactive elements
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('magnetic')
      ) {
        newHover = true;
      } 
      // Text elements
      else if (
        ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'li'].includes(target.tagName.toLowerCase()) && 
        !target.closest('button') && 
        !target.closest('a')
      ) {
        newText = true;
      }

      // Only trigger re-render if state actually changed
      if (newHover !== prevHover.current) {
        prevHover.current = newHover;
        setIsHovering(newHover);
      }
      if (newText !== prevText.current) {
        prevText.current = newText;
        setIsTextHovering(newText);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Massive Soft Adaptive Glow (Dark Mode Only) */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-40 hidden dark:lg:block opacity-60 blur-[100px] bg-white/10"
        style={{ 
          x: glowSmoothX, 
          y: glowSmoothY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isHovering ? 1.2 : 1,
          opacity: isHovering ? 0.8 : 0.6,
        }}
        transition={{ type: "tween", duration: 0.3 }}
      />
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white pointer-events-none z-50 mix-blend-difference hidden lg:block"
        style={{ 
          x: smoothX, 
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isMouseDown ? 0.8 : isHovering ? 1.8 : isTextHovering ? 1.5 : 1,
          borderWidth: isHovering ? '1px' : isTextHovering ? '1px' : '2px',
          opacity: isMouseDown ? 1 : isHovering ? 0.3 : isTextHovering ? 0.1 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-50 mix-blend-difference hidden lg:block"
        style={{ 
          x: innerSmoothX, 
          y: innerSmoothY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isMouseDown ? 0.5 : isHovering ? 0 : isTextHovering ? 0.3 : 1,
          opacity: isMouseDown ? 1 : isHovering ? 0 : isTextHovering ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
};
