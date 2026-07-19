import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Heart, IdCard, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import ReflectiveCard from './ReflectiveCard';

export const Footer = () => {
  const { t, language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { type: "tween", ease: "easeOut", duration: 0.8 }
    }
  };

  return (
    <footer className="relative mt-24 pt-20 pb-10 overflow-hidden border-t border-border/10">
      {/* Background animated glows */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-t from-primary/10 via-purple-500/5 to-transparent blur-[100px] -z-10 blob-blur" />
      <div className="absolute -bottom-[250px] -left-[100px] w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full -z-10 pointer-events-none blob-blur opacity-40" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center justify-center text-center gap-16"
        >
          {/* Main Footer Title */}
          <motion.div variants={itemVariants} className="space-y-8 flex flex-col items-center">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight drop-shadow-2xl">
              {t('footer', 'letCreate1')} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-fuchsia-500 to-pink-500 inline-block pt-2 pb-3 drop-shadow-[0_0_20px_rgba(217,70,239,0.3)]">
                {t('footer', 'letCreate2')}
              </span>
            </h2>

            {/* Toggle Card Button (Mobile Only) */}
            <motion.button
              onClick={() => setShowCard(!showCard)}
              className={`mt-4 md:hidden group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 ${
                showCard
                  ? 'bg-slate-200 border border-slate-300 text-slate-900 dark:bg-white/10 dark:border-white/20 dark:text-white'
                  : 'bg-gradient-to-r from-violet-600 to-pink-600 border border-transparent shadow-[0_0_30px_rgba(124,58,237,0.4)] text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showCard ? (
                <>
                  <X size={20} />
                  <span className="tracking-wide">{language === 'ar' ? 'إغلاق' : 'Close'}</span>
                </>
              ) : (
                <>
                  <IdCard size={20} />
                  <span className="tracking-wide">{language === 'ar' ? 'بطاقة التعريف' : 'View My Card'}</span>
                </>
              )}
              {/* Shine sweep */}
              {!showCard && (
                <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                  <motion.div
                    className="absolute top-0 bottom-0 w-[150%] bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg]"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
                  />
                </div>
              )}
            </motion.button>
          </motion.div>

          {/* Reflective Card - Smooth Slide Toggle */}
          <div className="md:hidden">
            <motion.div
              initial={false}
              animate={{
                maxHeight: showCard ? 700 : 0,
                opacity: showCard ? 1 : 0,
                marginTop: showCard ? 16 : 0,
                marginBottom: showCard ? 16 : 0,
              }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: 'hidden', paddingTop: showCard ? 40 : 0, paddingBottom: showCard ? 60 : 0 }}
            >
              <motion.div
                initial={false}
                animate={{
                  y: showCard ? 0 : -40,
                }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="flex justify-center"
              >
                <ReflectiveCard
                  isVisible={showCard}
                  overlayColor="rgba(0, 0, 0, 0.15)"
                  blurStrength={0}
                  glassDistortion={0}
                  metalness={0.6}
                  roughness={0.3}
                  displacementStrength={3}
                  noiseScale={2}
                  specularConstant={0.8}
                  grayscale={0.3}
                  color="#ffffff"
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

          {/* Bottom Area */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-10">
            <motion.div variants={itemVariants} className="flex items-center flex-wrap justify-center gap-2 text-sm md:text-base text-muted-foreground font-medium">
              <span>{t('footer', 'designedAndBuilt')}</span>
              <div className="animate-pulse-heart transform-gpu">
                <Heart size={18} className="text-red-500 fill-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              </div>
              <span>{t('footer', 'by')}</span>
              <motion.a 
                href="#"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative font-bold text-foreground overflow-hidden px-3 py-1.5 group rounded-lg"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-primary-foreground tracking-widest">
                  {language === 'ar' ? 'مُصْطَفَى 𖤍' : '𝐌𝐎𝐒𝐓𝐀𝐅𝐀 𖤍'}
                </span>
                <motion.div 
                  initial={{ y: "100%" }}
                  animate={{ y: isHovered ? "0%" : "100%" }}
                  transition={{ type: "tween", ease: "easeOut", duration: 0.4 }}
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
              className="relative p-[2px] rounded-full group"
              aria-label="Scroll to top"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #ec4899, #7c3aed)',
                backgroundSize: '200% 200%',
              }}
            >
              <div className="p-4 rounded-full bg-background group-hover:bg-transparent transition-all duration-300">
                <div className="animate-arrow-bob transform-gpu">
                  <ArrowUp size={22} className="text-foreground group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
