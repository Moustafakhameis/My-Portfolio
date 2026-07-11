import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedButton } from '../ui/AnimatedButton';
import profilePic from '../../assets/Mostafa Ali Emam.PNG';

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
  animate: (i: number) => ({
    y: [0, -60, 0],
    x: [0, i % 2 === 0 ? 40 : -40, 0],
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 10 + i * 2,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.5
    }
  })
};

// Robust Typewriter using React state with looping (clears and rewrites)
const TypewriterText = ({ text, delay = 1500 }: { text: string, delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
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
  }, [text, delay]);

  return (
    <span className="inline-flex items-center min-h-[1.5em] text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
      <span>{displayedText}</span>
      <motion.span 
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="inline-block w-1 md:w-1.5 h-[1.1em] bg-primary ml-1"
      />
    </span>
  );
};

// Word reveal animation with blur and vibrant colors
const AnimatedText = ({ text }: { text: string }) => {
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
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [] as const, delay: 0.8 + i * 0.15 }}
            className={`text-transparent bg-clip-text bg-gradient-to-r ${colors[i % colors.length]} inline-block drop-shadow-sm pt-4 pb-3`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export const HeroSection = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, isMobile ? 0 : 200]);
  const opacity = useTransform(scrollY, [300, 700], [1, isMobile ? 1 : 0]);

  const { t, language } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-6 pt-24 md:pt-28 pb-12 w-full">
      {/* Background Animated Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      {/* Floating background elements */}
      <motion.div 
        custom={1} variants={floatingBubbleVariants} animate="animate"
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 dark:bg-primary/5 rounded-full blur-3xl -z-10 blob-blur"
      />
      <motion.div 
        custom={2} variants={floatingBubbleVariants} animate="animate"
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-primary/10 rounded-full blur-3xl -z-10 blob-blur"
      />

      <motion.div 
        style={{ y: y1, opacity }}
        className="z-10 text-center max-w-7xl mx-auto flex flex-col items-center w-full"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center z-10 w-full"
        >
          {/* Profile Photo */}
          <motion.div 
            variants={itemVariants}
            className="mb-6 md:mb-8 relative group cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              animate={{ y: [0, -15, 0] }}
              transition={{ 
                y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                scale: { type: "tween", ease: "easeOut" },
                rotate: { type: "tween", ease: "easeOut" }
              }}
              className="relative w-40 h-40 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl shadow-primary/20 bg-background/80 z-10 transition-colors duration-500 group-hover:border-primary/60 group-hover:shadow-primary/40"
            >
              <img 
                src={profilePic} 
                alt="Mostafa Ali Emam" 
                className="w-full h-full object-cover object-[center_15%] grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-110 group-hover:scale-100"
              />
            </motion.div>
            {/* Decorative elements behind photo */}
            <div 
              className="absolute inset-[-15%] rounded-full bg-gradient-to-tr from-primary/30 to-transparent -z-10 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 blob-blur"
            />
            <div className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-primary/20 -z-20 blur-3xl scale-150 group-hover:scale-175 transition-transform duration-500 opacity-50" />
          </motion.div>

          <motion.div variants={itemVariants} whileHover={{ scale: 1.1, y: -5 }} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 text-primary mb-6 border border-primary/20 shadow-sm cursor-default">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="text-sm md:text-base font-bold tracking-widest uppercase">{t('hero', 'basedIn')}</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className={`text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] mb-4 text-center leading-[1.1] ${language === 'ar' ? 'font-bold' : 'font-black tracking-tighter'}`}>
            <AnimatedText text={String(t('hero', 'greeting'))} />{' '}
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ 
                opacity: { duration: 0.8, delay: 1.5 },
                scale: { type: "tween", ease: "easeOut", delay: 1.5 },
                filter: { duration: 0.8, delay: 1.5 },
                backgroundPosition: { repeat: Infinity, duration: 4, ease: "easeInOut" } 
              }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-[length:200%_auto] inline-block drop-shadow-lg pt-4 pb-3"
            >
              {language === 'ar' ? 'مُصْطَفَى' : 'Mostafa'}
            </motion.span>
          </motion.h1>
          
          <motion.h2 variants={itemVariants} className="text-xl sm:text-2xl md:text-4xl lg:text-5xl text-muted-foreground font-semibold mb-8 text-center max-w-4xl flex justify-center h-8 sm:h-10 md:h-12 lg:h-16">
            <TypewriterText text={String(t('hero', 'role'))} delay={2200} />
          </motion.h2>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 mt-4 w-full sm:w-auto items-center justify-center z-20 pb-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <AnimatedButton href="#work" variant="primary">
                {t('hero', 'viewWork')}
              </AnimatedButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
