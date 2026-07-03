import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'premium';
  href?: string;
  className?: string;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'primary',
  href,
  className = '',
  ...props
}) => {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic effect logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Calculate distance from center
    const moveX = e.clientX - centerX;
    const moveY = e.clientY - centerY;
    // Apply a fraction of the distance for the magnetic pull
    x.set(moveX * 0.2);
    y.set(moveY * 0.2);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-8 py-4 font-medium rounded-full overflow-hidden transition-colors duration-300";
  
  const variants = {
    primary: "bg-primary text-primary-foreground border border-transparent",
    outline: "bg-transparent text-foreground border border-border hover:border-primary/50 hover:bg-muted/50",
    ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50",
    premium: "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white border border-white/20 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.6)]"
  };

  const Component = href ? motion.a : motion.button;

  return (
    // @ts-ignore
    <Component
      ref={ref}
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        x: springX,
        y: springY,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {/* Background ripple/glow effect for primary and premium buttons */}
      {(variant === 'primary' || variant === 'premium') && (
        <>
          <motion.div
            className="absolute inset-0 bg-white/20 dark:bg-white/10 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isHovered ? 1.5 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ originX: 0.5, originY: 0.5 }}
          />
          {/* Sweeping shine effect */}
          <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
            <motion.div
              className="absolute top-0 bottom-0 w-[150%] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
              initial={{ x: "-100%" }}
              animate={{ x: isHovered ? "100%" : "-100%" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
          </div>
        </>
      )}
      
      {/* Text needs to be above the absolute backgrounds */}
      <span className="relative z-10 flex items-center gap-2 pointer-events-none">
        {children}
      </span>
    </Component>
  );
};
