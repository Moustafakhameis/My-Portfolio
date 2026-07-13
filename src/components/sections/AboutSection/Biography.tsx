import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { AnimatedButton } from '../../ui/AnimatedButton';
import BorderGlow from '../../ui/BorderGlow';
import { useLanguage } from '../../../context/LanguageContext';

const textReveal = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { type: "tween", ease: "easeOut", duration: 1.2 } 
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { type: "tween", ease: "easeOut", duration: 1 } 
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const Biography = () => {
  const { t } = useLanguage();

  return (
    <>
      <motion.div variants={textReveal} className="relative">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 flex flex-wrap gap-x-3 gap-y-2">
          {t('about', 'title').split(' ').map((word: string, i: number, arr: string[]) => {
            const isLast = i === arr.length - 1;
            return (
              <span 
                key={i} 
                className={isLast ? "text-transparent bg-clip-text bg-gradient-to-r from-primary via-fuchsia-500 to-pink-500 drop-shadow-[0_0_20px_rgba(217,70,239,0.3)] pr-2 pb-3" : "text-foreground"}
              >
                {word}
              </span>
            );
          })}
        </h2>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
          className="h-1.5 w-24 bg-gradient-to-r from-primary to-pink-500 rounded-full mb-6 origin-left"
        />
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
          {t('about', 'description')}
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <AnimatedButton
            href="https://drive.google.com/file/d/1Ag3F96cLTrUmhtpmM013niF3Oe4cMalK/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="!py-3.5 !px-8 shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:shadow-[0_0_40px_rgba(var(--primary),0.8)] transition-all duration-500 group"
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="me-2"
            >
              <Download size={20} className="group-hover:scale-110 transition-transform duration-300" />
            </motion.div>
            {t('about', 'downloadResume')}
          </AnimatedButton>
        </div>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <motion.div variants={cardReveal}>
          <BorderGlow
            className="w-full h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]"
            backgroundColor="rgba(255,255,255,0.02)"
            glowColor="160 84 45"
            colors={['#10b981', '#34d399', '#6ee7b7']}
            borderRadius={32}
            animated={true}
            glowIntensity={1.2}
            glowRadius={60}
            edgeSensitivity={30}
            coneSpread={20}
            fillOpacity={0.05}
          >
            <div className="relative p-6 md:p-8 w-full h-full flex flex-col items-center justify-center text-center group cursor-pointer overflow-hidden rounded-[32px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col items-center w-full transform transition-transform duration-300 group-hover:scale-105">
                <h3 className="text-6xl md:text-7xl font-black mb-2 text-foreground/90 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-b group-hover:from-foreground group-hover:to-primary transition-all duration-500 drop-shadow-sm group-hover:drop-shadow-[0_0_20px_rgba(var(--primary),0.8)]">
                  1+
                </h3>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.25em] group-hover:text-foreground transition-colors duration-500 mt-2">{t('about', 'yearsOfExperience')}</p>
              </div>
            </div>
          </BorderGlow>
        </motion.div>
        
        <motion.div variants={cardReveal}>
          <BorderGlow
            className="w-full h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]"
            backgroundColor="rgba(255,255,255,0.02)"
            glowColor="270 95 65"
            colors={['#a855f7', '#c084fc', '#d8b4fe']}
            borderRadius={32}
            animated={true}
            glowIntensity={1.2}
            glowRadius={60}
            edgeSensitivity={30}
            coneSpread={20}
            fillOpacity={0.05}
          >
            <div className="relative p-6 md:p-8 w-full h-full flex flex-col items-center justify-center text-center group cursor-pointer overflow-hidden rounded-[32px]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col items-center w-full transform transition-transform duration-300 group-hover:scale-105">
                <h3 className="text-6xl md:text-7xl font-black mb-2 text-foreground/90 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-b group-hover:from-foreground group-hover:to-purple-500 transition-all duration-500 drop-shadow-sm group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
                  20+
                </h3>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.25em] group-hover:text-foreground transition-colors duration-500 mt-2">{t('about', 'projectsCompleted')}</p>
              </div>
            </div>
          </BorderGlow>
        </motion.div>

        <motion.div variants={cardReveal} className="sm:col-span-2">
          <BorderGlow
            className="w-full h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]"
            backgroundColor="rgba(255,255,255,0.02)"
            glowColor="190 95 60"
            colors={['#06b6d4', '#22d3ee', '#67e8f9']}
            borderRadius={32}
            animated={true}
            glowIntensity={1.2}
            glowRadius={60}
            edgeSensitivity={30}
            coneSpread={20}
            fillOpacity={0.05}
          >
            <div className="relative p-6 md:p-8 w-full h-full flex flex-col items-center justify-center text-center group cursor-pointer overflow-hidden rounded-[32px]">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute right-0 top-0 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 flex flex-col items-center w-full justify-center text-center transform transition-transform duration-300 group-hover:scale-105">
                <h3 className="text-6xl md:text-7xl font-black mb-2 text-foreground/90 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-b group-hover:from-foreground group-hover:to-cyan-400 transition-all duration-500 drop-shadow-sm group-hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]">
                  10+
                </h3>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.25em] group-hover:text-foreground transition-colors duration-500 mt-2">{t('about', 'happyClients')}</p>
              </div>
            </div>
          </BorderGlow>
        </motion.div>
      </motion.div>
    </>
  );
};
