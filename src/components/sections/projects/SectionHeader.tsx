import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  description: string;
  delay?: number;
  icon?: React.ReactNode;
  gradientClass?: string;
  glowClass?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  description, 
  delay = 0,
  icon,
  gradientClass = "from-white via-white/90 to-white/50",
  glowClass = "shadow-white/20"
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Subtle 3D Parallax Tilt Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for buttery tilt animation
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Convert mouse position into very subtle rotation angles (max 4 degrees tilt)
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    // Normalize values between -0.5 and 0.5
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ type: "spring", stiffness: 150, damping: 25, delay }}
      className="mb-12 mt-20 first:mt-0 relative group"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="flex items-center gap-4 md:gap-5 mb-3 relative z-10 cursor-default"
      >
        {icon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: delay + 0.2 }}
            className="relative flex items-center justify-center shrink-0"
          >
            {/* The Emoji - large, bright, no heavy filters */}
            <motion.div
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.1 }}
              className="text-5xl md:text-6xl relative z-10 transition-transform duration-300"
            >
              {icon}
            </motion.div>
          </motion.div>
        )}
        
        <div className="flex flex-col relative z-20" style={{ transform: "translateZ(15px)" }}>
          {/* MAIN TEXT with elegant staggered word reveal */}
          <h3 className={`relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight flex flex-wrap gap-x-3`}>
            {title.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 20, 
                  delay: delay + 0.1 + (i * 0.1) 
                }}
                className={`inline-block bg-clip-text text-transparent bg-gradient-to-r ${gradientClass} pb-2`}
              >
                {word}
              </motion.span>
            ))}
          </h3>
          
          {/* Elegant Thin Underline */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: delay + 0.4 + (title.split(' ').length * 0.1) }}
            className={`h-[2px] w-20 md:w-32 bg-gradient-to-r ${gradientClass} rounded-full mt-0 origin-left opacity-80 group-hover:w-48 transition-all duration-700 ease-out`}
          />
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.8, delay: delay + 0.5 }}
        className="mt-6 relative z-10 flex items-start max-w-3xl"
      >
        {/* Accent line using section gradient */}
        <div className={`w-[3px] shrink-0 self-stretch rounded-full bg-gradient-to-b ${gradientClass} mr-5`} />
        
        <p className="text-white/70 text-lg md:text-xl font-medium tracking-wide leading-relaxed">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
};
