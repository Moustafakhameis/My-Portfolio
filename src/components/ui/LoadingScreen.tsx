import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { language, t } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    // Smoother increments at a less aggressive interval to reduce React re-renders
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 6) + 2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            setTimeout(onComplete, 400); // Allow smooth exit animation
          }, 500);
          return 100;
        }
        return next;
      });
    }, 80);

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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 200, damping: 20 }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${theme === 'light' ? 'bg-[#f8fafc]' : 'bg-[#030014]'} text-foreground overflow-hidden`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Ambient Glows — static radial gradients instead of animated blur shaders */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full pointer-events-none"
            style={{
              background: theme === 'light'
                ? 'radial-gradient(circle, rgba(var(--primary), 0.25) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(var(--primary), 0.25) 0%, transparent 70%)',
              mixBlendMode: theme === 'light' ? 'multiply' : 'screen',
            }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/3 left-1/3 w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] rounded-full pointer-events-none"
            style={{
              background: theme === 'light'
                ? 'radial-gradient(circle, rgba(217, 70, 239, 0.25) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(217, 70, 239, 0.25) 0%, transparent 70%)',
              mixBlendMode: theme === 'light' ? 'multiply' : 'screen',
            }}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          
          <div className="flex flex-col items-center gap-10 relative z-10 w-full max-w-md px-6">
            {/* Animated Logo Text */}
            <motion.div
              className={`text-5xl md:text-7xl font-black ${language === 'ar' ? '' : 'tracking-tighter'} flex justify-center`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {language === 'ar' ? (
                <motion.span 
                  variants={letterVariants}
                  className={`text-transparent bg-clip-text pb-2 ${theme === 'light' ? 'bg-gradient-to-br from-purple-800 via-fuchsia-600 to-pink-500' : 'bg-gradient-to-br from-white via-fuchsia-300 to-pink-500'}`}
                >
                  {text}
                </motion.span>
              ) : (
                letters.map((letter, i) => (
                  <motion.span 
                    key={i} 
                    variants={letterVariants}
                    className={`text-transparent bg-clip-text pb-2 ${theme === 'light' ? 'bg-gradient-to-br from-purple-800 via-fuchsia-600 to-pink-500' : 'bg-gradient-to-br from-white via-fuchsia-300 to-pink-500'}`}
                  >
                    {letter}
                  </motion.span>
                ))
              )}
            </motion.div>

            {/* Progress Container */}
            <motion.div 
              className="flex flex-col items-center gap-4 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              <div className={`w-full h-1 rounded-full overflow-hidden relative ${theme === 'light' ? 'bg-black/10 border border-black/5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]' : 'bg-white/10 border border-white/5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]'}`}>
                <motion.div
                  className={`absolute top-0 h-full rounded-full shadow-[0_0_20px_rgba(217,70,239,0.9)] ${
                    language === 'ar' 
                      ? 'right-0 bg-gradient-to-l from-primary via-fuchsia-400 to-pink-500' 
                      : 'left-0 bg-gradient-to-r from-primary via-fuchsia-400 to-pink-500'
                  }`}
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
              
              <div className={`flex w-full px-1 items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                <motion.span 
                  className={`text-[10px] sm:text-xs font-semibold ${language === 'ar' ? '' : 'uppercase tracking-[0.3em]'} ${theme === 'light' ? 'text-black/50' : 'text-white/50'}`}
                  animate={{ opacity: progress === 100 ? 0 : 1 }}
                >
                  {t('loading', 'initializing')}
                </motion.span>
                <motion.span 
                  className={`text-sm sm:text-base font-bold ${language === 'ar' ? '' : 'tabular-nums tracking-wider'} ${theme === 'light' ? 'text-black' : 'text-white'}`}
                >
                  {language === 'ar' ? `${new Intl.NumberFormat('ar-EG').format(progress)}٪` : `${progress}%`}
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
