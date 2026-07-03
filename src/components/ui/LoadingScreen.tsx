import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    // Smoother, faster increments
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 4) + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            setTimeout(onComplete, 800); // Allow smooth exit animation
          }, 500);
          return 100;
        }
        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  const text = language === 'ar' ? 'مُصْطَفَى.' : 'MOUSTAFA.';
  const letters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { type: "spring", stiffness: 200, damping: 20 }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030014] text-foreground overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Animated Background Ambient Glows */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/3 left-1/3 w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] bg-fuchsia-500/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          
          <div className="flex flex-col items-center gap-10 relative z-10 w-full max-w-md px-6">
            {/* Animated Logo Text */}
            <motion.div
              className="text-5xl md:text-7xl font-black tracking-tighter flex justify-center drop-shadow-[0_0_25px_rgba(217,70,239,0.4)]"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {letters.map((letter, i) => (
                <motion.span 
                  key={i} 
                  variants={letterVariants}
                  className="text-transparent bg-clip-text bg-gradient-to-br from-white via-fuchsia-300 to-pink-500 pb-2"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            {/* Progress Container */}
            <motion.div 
              className="flex flex-col items-center gap-4 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-md border border-white/5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)] relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-fuchsia-400 to-pink-500 rounded-full shadow-[0_0_20px_rgba(217,70,239,0.9)]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
              
              <div className="flex justify-between w-full px-1 items-center">
                <motion.span 
                  className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-white/50"
                  animate={{ opacity: progress === 100 ? 0 : 1 }}
                >
                  Initializing...
                </motion.span>
                <motion.span 
                  className="text-sm sm:text-base font-bold text-white tabular-nums tracking-wider"
                >
                  {progress}%
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
