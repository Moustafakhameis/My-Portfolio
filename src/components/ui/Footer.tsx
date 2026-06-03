import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)', scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      scale: 1,
      transition: { type: "spring", bounce: 0.5, duration: 0.8 }
    }
  };

  return (
    <footer className="relative mt-24 pt-20 pb-10 overflow-hidden border-t border-border/10">
      {/* Background animated glows */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-t from-primary/10 via-purple-500/5 to-transparent blur-[100px] -z-10" />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[250px] -left-[100px] w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full -z-10 pointer-events-none" 
      />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          className="flex flex-col items-center justify-center text-center gap-16"
        >
          {/* Main Footer Title */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight">
              Let's create something <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                extraordinary.
              </span>
            </h2>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

          {/* Bottom Area */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-10">
            <motion.div variants={itemVariants} className="flex items-center flex-wrap justify-center gap-2 text-sm md:text-base text-muted-foreground font-medium">
              <span>Designed & Built with</span>
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <Heart size={18} className="text-red-500 fill-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              </motion.div>
              <span>by</span>
              <motion.a 
                href="#"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative font-bold text-foreground overflow-hidden px-3 py-1.5 group rounded-lg"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-primary-foreground tracking-widest">𝐌𝐎𝐒𝐓𝐀𝐅𝐀 𖤍</span>
                <motion.div 
                  initial={{ y: "100%" }}
                  animate={{ y: isHovered ? "0%" : "100%" }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 z-0 rounded-lg"
                />
              </motion.a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-6 text-sm text-muted-foreground font-bold tracking-widest uppercase">
              <span className="hover:text-primary transition-colors cursor-pointer">{t('footer', 'copyright') || "© 2026"}</span>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.15, y: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="p-5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-gradient-to-tr hover:from-primary hover:to-purple-500 hover:text-white hover:shadow-[0_0_25px_rgba(var(--primary),0.6)] hover:border-transparent transition-all duration-300 group"
              aria-label="Scroll to top"
            >
              <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
