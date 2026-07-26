import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedButton } from '../ui/AnimatedButton';
import profilePic from '../../assets/Moustafa Ali Emam Optimized.png';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "tween", ease: "easeOut", duration: 1.2 } 
  }
};

const floatingBubbleVariants = {
  initial: { opacity: 0 },
  animate: (i: number) => ({
    y: [0, -60, 0],
    x: [0, i % 2 === 0 ? 40 : -40, 0],
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 10 + i * 2,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 2.0 + i * 0.5
    }
  })
};

// Robust Typewriter using React state with looping (clears and rewrites)
const TypewriterText = ({ text, delay = 1500, active = true }: { text: string, delay?: number, active?: boolean }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    if (!active) return; // Don't start typing until hero is visible

    let timeout: NodeJS.Timeout;
    let isDeleting = false;
    let i = 0;

    const type = () => {
      if (!isDeleting && i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        timeout = setTimeout(type, 100);
      } else if (!isDeleting && i === text.length) {
        timeout = setTimeout(() => {
          isDeleting = true;
          type();
        }, 2500); // Wait 2.5s at the end before deleting
      } else if (isDeleting && i > 0) {
        setDisplayedText(text.substring(0, i - 1));
        i--;
        timeout = setTimeout(type, 50); // Delete faster
      } else if (isDeleting && i === 0) {
        isDeleting = false;
        timeout = setTimeout(type, 800); // Wait 0.8s before re-typing
      }
    };

    timeout = setTimeout(type, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, active]);

  return (
    <span className="inline-flex items-center min-h-[1.5em] text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
      <span>{displayedText}</span>
      <span className="inline-block w-1 md:w-1.5 h-[1.1em] bg-primary ml-1 animate-blink" />
    </span>
  );
};

// Word reveal animation with blur and vibrant colors
const AnimatedText = ({ text, animate = true }: { text: string, animate?: boolean }) => {
  const words = text.split(' ');
  const colors = [
    "from-blue-400 to-cyan-300",
    "from-purple-400 to-pink-300",
    "from-amber-400 to-orange-300",
    "from-green-400 to-emerald-300"
  ];

  return (
    <span className="inline-block">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-visible me-4 pb-2">
          <motion.span
            initial={{ y: "50%", opacity: 0 }}
            animate={animate ? { y: 0, opacity: 1 } : { y: "50%", opacity: 0 }}
            transition={{ duration: 0.8, ease: [] as const, delay: 0.8 + i * 0.15 }}
            className={`text-transparent bg-clip-text bg-gradient-to-r ${colors[i % colors.length]} inline-block drop-shadow-sm pt-4 pb-3 transform-gpu will-change-[transform,opacity]`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export const HeroSection = ({ animate = true }: { animate?: boolean }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkTouch = () => window.matchMedia('(max-width: 1023px)').matches || ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    setIsMobile(checkTouch());
    const mql = window.matchMedia('(max-width: 1023px)');
    const handler = () => setIsMobile(checkTouch());
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Defer expensive decorative effects (blur glows, ping, drop-shadows, bg-pan)
  // until AFTER entrance animations complete to avoid GPU contention
  useEffect(() => {
    if (!animate) return;
    const id = setTimeout(() => setHeroReady(true), 2500);
    return () => clearTimeout(id);
  }, [animate]);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, isMobile || !animate ? 0 : 200]);
  const opacity = useTransform(scrollY, [300, 700], [1, isMobile || !animate ? 1 : 0]);

  const { t, language } = useLanguage();

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-6 pt-24 md:pt-28 pb-12 w-full">
      {/* Background Animated Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      {/* Floating background elements — only animate after hero entrance starts */}
      <motion.div 
        custom={1} variants={floatingBubbleVariants} initial="initial" animate={animate ? "animate" : "initial"}
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 dark:bg-primary/5 rounded-full blur-2xl -z-10 blob-blur"
      />
      <motion.div 
        custom={2} variants={floatingBubbleVariants} initial="initial" animate={animate ? "animate" : "initial"}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-primary/10 rounded-full blur-2xl -z-10 blob-blur"
      />

      <motion.div 
        style={{ y: y1, opacity }}
        className="z-10 text-center max-w-7xl mx-auto flex flex-col items-center w-full transform-gpu will-change-[transform,opacity]"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={animate ? "show" : "hidden"}
          className="flex flex-col items-center z-10 w-full"
        >
          {/* Profile Photo */}
          <motion.div 
            variants={itemVariants}
            className="mb-6 md:mb-8 relative group cursor-pointer"
          >
            <motion.div
              whileHover={isMobile ? {} : { scale: 1.05, rotate: 3 }}
              transition={{ 
                scale: { type: "tween", ease: "easeOut" },
                rotate: { type: "tween", ease: "easeOut" }
              }}
              className="relative w-40 h-40 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-primary/20 bg-background/80 z-10 transition-all duration-700 group-hover:border-primary/60 animate-float-profile transform-gpu"
              style={heroReady ? { boxShadow: '0 25px 50px -12px rgba(168,85,247,0.2)' } : undefined}
            >
              <img 
                src={profilePic} 
                alt="Moustafa Ali Emam" 
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-cover object-[center_15%] grayscale-0 md:grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 md:scale-110 group-hover:scale-100"
              />
            </motion.div>
            {/* Decorative blur glows — only render after entrance to avoid GPU contention */}
            {heroReady && (
              <>
                <div 
                  className="absolute inset-[-15%] rounded-full bg-gradient-to-tr from-primary/30 to-transparent -z-10 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 blob-blur"
                />
                <div className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-primary/20 -z-20 blur-3xl scale-150 group-hover:scale-175 transition-transform duration-500 opacity-50" />
              </>
            )}
          </motion.div>

          <motion.div variants={itemVariants} whileHover={isMobile ? {} : { scale: 1.1, y: -5 }} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 text-primary mb-6 border border-primary/20 shadow-sm cursor-default">
            <span className="relative flex h-3 w-3">
              <span className={`${heroReady ? 'animate-ping' : ''} absolute inline-flex h-full w-full rounded-full bg-primary opacity-75`}></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="text-sm md:text-base font-bold tracking-widest uppercase">{t('hero', 'basedIn')}</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className={`text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] mb-4 text-center leading-[1.1] ${language === 'ar' ? 'font-bold' : 'font-black tracking-tighter'}`}>
            <AnimatedText text={String(t('hero', 'greeting'))} animate={animate} />{' '}
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ 
                opacity: { duration: 0.8, delay: 1.5 },
                scale: { type: "tween", ease: "easeOut", delay: 1.5 },
                filter: { duration: 0.8, delay: 1.5 }
              }}
              className={`text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500 inline-block pt-4 pb-3 transform-gpu ${heroReady ? 'drop-shadow-lg animate-bg-pan' : ''}`}
            >
              {language === 'ar' ? 'مُصْطَفَى' : 'Moustafa'}
            </motion.span>
          </motion.h1>
          
          <motion.h2 variants={itemVariants} className="text-xl sm:text-2xl md:text-4xl lg:text-5xl text-muted-foreground font-semibold mb-8 text-center max-w-4xl flex justify-center min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3rem] lg:min-h-[4rem]">
            <TypewriterText text={String(t('hero', 'role'))} delay={2200} active={animate} />
          </motion.h2>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 mt-4 w-full sm:w-auto items-center justify-center z-20 pb-4">
            <motion.div whileHover={isMobile ? {} : { scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <AnimatedButton href="#work" variant="primary">
                {t('hero', 'viewWork')}
              </AnimatedButton>
            </motion.div>
            <motion.div whileHover={isMobile ? {} : { scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <AnimatedButton href="#contact" variant="outline">
                {t('hero', 'contactMe')}
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
