import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, Rocket } from 'lucide-react';
import { AnimatedButton } from './AnimatedButton';

export const NotFound = () => {
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const parallaxX = useTransform(smoothX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-50, 50]);
  const parallaxY = useTransform(smoothY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [-50, 50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = import.meta.env.BASE_URL;
  };

  const textVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -90 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background" style={{ perspective: 1000 }}>
      
      {/* Interactive Mouse Parallax Glow */}
      <motion.div 
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/10 via-purple-500/15 to-pink-500/10 blur-[150px] rounded-full pointer-events-none" 
      />

      {/* Floating Space Elements - Positioned relative to screen */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[5%] md:top-[20%] md:left-[15%] text-primary/60 z-0 pointer-events-none"
      >
         <svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="drop-shadow-2xl opacity-80">
           <circle cx="12" cy="12" r="8" />
           <ellipse cx="12" cy="12" rx="16" ry="4" transform="rotate(-30 12 12)" />
           <ellipse cx="12" cy="12" rx="16" ry="4" transform="rotate(30 12 12)" />
         </svg>
      </motion.div>

      <motion.div
        animate={{ y: [0, 40, 0], x: [0, 20, 0], rotate: [0, 45, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[10%] right-[5%] md:bottom-[20%] md:right-[15%] text-pink-500/50 z-0 pointer-events-none"
      >
        <Rocket size={120} className="drop-shadow-2xl" />
      </motion.div>
      
      <div className="relative z-10 text-center px-4 max-w-3xl flex flex-col items-center">
        
        {/* 404 Text Stagger */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="flex gap-2 relative z-10"
        >
          {['4', '0', '4'].map((char, index) => (
            <motion.span 
              key={index}
              variants={textVariants}
              whileHover={{ scale: 1.1, rotate: (Math.random() - 0.5) * 20, color: '#a855f7' }}
              className="text-[150px] md:text-[250px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-primary via-purple-500 to-pink-500 drop-shadow-[0_0_40px_rgba(168,85,247,0.4)] cursor-default select-none inline-block transition-colors duration-300"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="relative z-10 mt-4"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-foreground tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
            Lost in Space
          </h2>
          <p className="text-muted-foreground text-xl md:text-2xl max-w-lg mx-auto mb-12 leading-relaxed">
            The page you are looking for has drifted into the cosmic void. 
            Let's get you back to familiar territory.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, type: "spring", stiffness: 100 }}
          className="relative z-10"
        >
          <div onClick={goHome} className="group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
            <AnimatedButton href={import.meta.env.BASE_URL} className="relative inline-flex items-center justify-center gap-3 !px-10 !py-5 text-xl font-bold bg-background rounded-full hover:bg-background/80 overflow-hidden shadow-2xl transition-all">
              <Home size={24} className="group-hover:text-purple-500 transition-colors" />
              <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-pink-500 transition-all duration-300">Return to Earth</span>
            </AnimatedButton>
          </div>
        </motion.div>
      </div>

      {/* Advanced Particle System (Stars) */}
      {[...Array(40)].map((_, i) => {
        const depth = Math.random();
        const size = depth * 4 + 1;
        const blur = depth > 0.8 ? 2 : depth > 0.5 ? 1 : 0;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary"
            style={{
              width: size,
              height: size,
              filter: `blur(${blur}px)`,
              opacity: depth * 0.5 + 0.1,
            }}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [null, Math.random() * -1000],
              x: [null, (Math.random() - 0.5) * 400],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * -20 // Start instantly
            }}
          />
        );
      })}
    </div>
  );
};
