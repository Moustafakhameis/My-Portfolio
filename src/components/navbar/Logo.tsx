import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  language: string;
  theme: string;
}

export const Logo: React.FC<LogoProps> = ({ language, theme }) => {
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024);
  return (
    <motion.a 
      href="#" 
      className="flex items-center gap-2 text-2xl font-bold tracking-tighter"
      initial="idle"
      animate="idle"
      whileHover={isTouchDevice ? undefined : "hover"}
      whileTap="tap"
      variants={{
        idle: { scale: 1 },
        hover: { scale: 1.02 },
        tap: { scale: 0.95 }
      }}
    >
      <motion.span 
        className="inline-block"
        variants={{
          idle: {
            y: 0,
            filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.3))",
            transition: { duration: 0.3 }
          },
          hover: {
            y: -2,
            filter: "drop-shadow(0px 8px 16px rgba(59,130,246,0.4))",
            transition: { type: "spring", stiffness: 400, damping: 25 }
          }
        }}
      >
        <motion.span 
          className="bg-clip-text text-transparent inline-block bg-[length:200%_auto] animate-bg-pan"
          animate={{ 
            backgroundImage: `linear-gradient(120deg, ${theme === 'dark' ? '#ffffff' : '#000000'} 40%, rgba(59,130,246,0.5) 50%, ${theme === 'dark' ? '#ffffff' : '#000000'} 60%)`
          }}
          transition={{ 
            backgroundImage: { duration: 0.5, ease: "easeInOut" }
          }}
          variants={{
            idle: { backgroundSize: "200% auto" },
            hover: {
              backgroundImage: "linear-gradient(90deg, #2563eb, #38bdf8, #2563eb)",
              backgroundSize: "200% auto",
            }
          }}
        >
          {language === 'ar' ? 'مُصْطَفَى' : '𝐌𝐎𝐔𝐒𝐓𝐀𝐅𝐀'}
        </motion.span>
      </motion.span>
      
      <div style={{ perspective: 1000 }} className="ml-2">
        <motion.div
          animate={{ y: [-2, 2], rotateY: [0, 360] }}
          transition={{ 
            y: { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            rotateY: { duration: 8, repeat: Infinity, ease: "linear" }
          }}
          className="inline-block origin-center"
        >
          <motion.span 
            className="inline-block"
            animate={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}
            transition={{ color: { duration: 0.5, ease: "easeInOut" } }}
            variants={{
              idle: {
                scale: 1,
                filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.3))",
                transition: { duration: 0.3 }
              },
              hover: {
                scale: 1.15,
                color: "#3b82f6",
                filter: "drop-shadow(0px 0px 15px rgba(59,130,246,0.8))",
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }
            }}
          >
            𖤍
          </motion.span>
        </motion.div>
      </div>
    </motion.a>
  );
};
