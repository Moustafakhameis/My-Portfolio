import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, User, Target, Download, Briefcase, Rocket, Users } from 'lucide-react';
import { AnimatedButton } from '../ui/AnimatedButton';
import BorderGlow from '../ui/BorderGlow';
import { useLanguage } from '../../context/LanguageContext';
import LogoLoop from '../ui/LogoLoop';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, 
  SiFramer, SiThreedotjs, SiJavascript, SiHtml5, 
  SiCss, SiGreensock, SiGithub, SiBootstrap 
} from 'react-icons/si';

const TechStyle = () => (
  <style>{`
    .tech-card {
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .tech-card:hover {
      border-color: rgba(255, 255, 255, 0.1);
      background-color: rgba(255, 255, 255, 0.05);
      transform: translateY(-8px);
    }
    .tech-card .tech-icon {
      color: rgba(156, 163, 175, 0.4);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .tech-card:hover .tech-icon {
      color: var(--hover-color);
      filter: drop-shadow(0 0 15px var(--glow-color)) drop-shadow(0 0 30px var(--glow-color));
      transform: scale(1.15);
    }
    .tech-card .tech-bg {
      opacity: 0;
      transition: opacity 0.5s ease;
      background-color: var(--hover-color);
    }
    .tech-card:hover .tech-bg {
      opacity: 0.1;
    }
    .tech-card .tech-glow {
      opacity: 0;
      transition: opacity 0.5s ease;
      box-shadow: inset 0 0 20px var(--glow-color);
    }
    .tech-card:hover .tech-glow {
      opacity: 1;
    }
    .tech-card .tech-reflection {
      opacity: 0;
      transition: opacity 0.5s ease;
      background-color: var(--hover-color);
    }
    .tech-card:hover .tech-reflection {
      opacity: 0.6;
    }
    /* Mobile & Tablet Optimizations */
    @media (max-width: 1023px) {
      .tech-card {
        border-color: rgba(255, 255, 255, 0.15);
        background-color: rgba(255, 255, 255, 0.05);
      }
      .tech-card .tech-icon {
        color: var(--hover-color) !important; /* Always vibrant */
        filter: none !important; /* REMOVE BLURRY GLOW FOR CRISP LOOK */
        transform: scale(1) !important;
      }
      .tech-card .tech-bg {
        display: none !important; /* Remove muddy tint on mobile */
      }
      .tech-card .tech-glow {
        opacity: 0 !important; /* Remove inner shadow for pure clean glass */
      }
      .tech-card .tech-reflection {
        display: none !important; /* Hide floor reflection completely */
      }
      /* Tactile tap press effect for touch devices */
      .tech-card:hover, .tech-card:active {
        transform: scale(0.95) !important;
        border-color: rgba(255, 255, 255, 0.3) !important;
      }
    }
  `}</style>
);

const IconWrapper = ({ icon: Icon, hoverColor, glowColor }: { icon: React.ElementType, hoverColor: string, glowColor: string }) => (
  <div 
    className="tech-card relative flex items-center justify-center w-[4.5rem] h-[4.5rem] sm:w-[5.5rem] sm:h-[5.5rem] md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-2xl sm:rounded-[1.5rem] lg:rounded-[2rem] bg-card/20 border border-border/30 backdrop-blur-md cursor-pointer shadow-sm"
    style={{ '--hover-color': hoverColor, '--glow-color': glowColor } as React.CSSProperties}
  >
    {/* Inner background tint */}
    <div className="tech-bg absolute inset-0 rounded-2xl sm:rounded-[1.5rem] lg:rounded-[2rem]" />
    {/* Inner glow shadow */}
    <div className="tech-glow absolute inset-0 rounded-2xl sm:rounded-[1.5rem] lg:rounded-[2rem]" />
    {/* Bottom glow reflection */}
    <div className="tech-reflection absolute -bottom-4 w-1/2 h-4 blur-xl rounded-full hidden lg:block" />
    
    {/* The Icon */}
    <Icon className="tech-icon relative z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16" />
  </div>
);

const techLogos = [
  { node: <IconWrapper icon={SiReact} hoverColor="#61DAFB" glowColor="rgba(97,218,251,0.5)" />, title: "React 19", href: "https://react.dev" },
  { node: <IconWrapper icon={SiNextdotjs} hoverColor="#FFFFFF" glowColor="rgba(255,255,255,0.3)" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <IconWrapper icon={SiTypescript} hoverColor="#3178C6" glowColor="rgba(49,120,198,0.5)" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <IconWrapper icon={SiTailwindcss} hoverColor="#06B6D4" glowColor="rgba(6,182,212,0.5)" />, title: "Tailwind v4", href: "https://tailwindcss.com" },
  { node: <IconWrapper icon={SiFramer} hoverColor="#0055FF" glowColor="rgba(0,85,255,0.5)" />, title: "Framer Motion", href: "https://www.framer.com/motion/" },
  { node: <IconWrapper icon={SiThreedotjs} hoverColor="#FFFFFF" glowColor="rgba(255,255,255,0.3)" />, title: "Three.js", href: "https://threejs.org" },
  { node: <IconWrapper icon={SiJavascript} hoverColor="#F7DF1E" glowColor="rgba(247,223,30,0.5)" />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <IconWrapper icon={SiHtml5} hoverColor="#E34F26" glowColor="rgba(227,79,38,0.5)" />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { node: <IconWrapper icon={SiCss} hoverColor="#1572B6" glowColor="rgba(21,114,182,0.5)" />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { node: <IconWrapper icon={SiGreensock} hoverColor="#88CE02" glowColor="rgba(136,206,2,0.5)" />, title: "GSAP", href: "https://gsap.com" },
  { node: <IconWrapper icon={SiGithub} hoverColor="#FFFFFF" glowColor="rgba(255,255,255,0.3)" />, title: "GitHub", href: "https://github.com" },
  { node: <IconWrapper icon={SiBootstrap} hoverColor="#7952B3" glowColor="rgba(121,82,179,0.5)" />, title: "Bootstrap", href: "https://getbootstrap.com" },
];

export const AboutSection = () => {
  const { t, language } = useLanguage();

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

  const eduReveal = {
    hidden: { opacity: 0, x: 40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { type: "tween", ease: "easeOut", duration: 1.2 } 
    },
  };

  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-10">
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
                href="https://drive.google.com/file/d/1LE7vkiKz3AgZi7uFdRrizGO0q8zfS9tc/view?usp=sharing"
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
                    <h3 className="text-6xl md:text-7xl font-black mb-2 text-foreground/90 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-primary transition-all duration-500 drop-shadow-sm group-hover:drop-shadow-[0_0_20px_rgba(var(--primary),0.8)]">
                      1+
                    </h3>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.25em] group-hover:text-white transition-colors duration-500 mt-2">{t('about', 'yearsOfExperience')}</p>
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
                    <h3 className="text-6xl md:text-7xl font-black mb-2 text-foreground/90 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-purple-500 transition-all duration-500 drop-shadow-sm group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
                      20+
                    </h3>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.25em] group-hover:text-white transition-colors duration-500 mt-2">{t('about', 'projectsCompleted')}</p>
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
                    <h3 className="text-6xl md:text-7xl font-black mb-2 text-foreground/90 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-cyan-400 transition-all duration-500 drop-shadow-sm group-hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]">
                      10+
                    </h3>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.25em] group-hover:text-white transition-colors duration-500 mt-2">{t('about', 'happyClients')}</p>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          variants={eduReveal} 
          className="glass p-6 md:p-10 rounded-3xl border border-border/50 relative overflow-hidden group hover:border-primary/30 transition-colors duration-500 hover:shadow-2xl hover:shadow-primary/5 isolate"
        >
          <div className={`absolute top-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 group-hover:bg-primary/10 transition-colors duration-500 blob-blur ${language === 'ar' ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'}`} />
          <div className={`absolute bottom-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 group-hover:bg-purple-500/10 transition-colors duration-500 blob-blur ${language === 'ar' ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`} />
          
          <h3 className="text-3xl font-bold mb-10 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
              <GraduationCap className="w-8 h-8" />
            </div>
            {t('about', 'education')}
          </h3>
          
          <div className="relative ps-8 border-s-2 border-primary/20 space-y-10 group-hover:border-primary/40 transition-colors duration-500">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -start-[41px] top-1.5 w-5 h-5 rounded-full bg-background border-4 border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
              <div className="flex flex-col gap-2">
                <span className="text-sm font-bold text-primary tracking-wider uppercase">{t('about', 'graduated')}</span>
                <h4 className="text-2xl font-bold">{t('about', 'degree')}</h4>
                <p className="text-lg text-muted-foreground">{t('about', 'university')}</p>
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold w-fit border border-primary/20">
                  {t('about', 'gpa')}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-32 pt-16 border-t border-border/10 relative"
      >
        {/* Subtle background glow for the loop area */}
        <div className="absolute inset-0 top-16 bg-gradient-to-r from-transparent via-primary/5 to-transparent blur-3xl pointer-events-none" />
        <TechStyle />
        <p className="text-center text-sm font-black text-muted-foreground uppercase tracking-[0.3em] mb-12 drop-shadow-sm">{t('about', 'technologies') || "POWERED BY MODERN TECH"}</p>
        
        <div className="py-8 w-full block relative overflow-hidden min-h-[140px]" dir="ltr">
          <LogoLoop
            logos={techLogos}
            speed={40}
            direction="left"
            logoHeight={128}
            gap={20}
            hoverSpeed={15}
            scaleOnHover={false}
            fadeOut={true}
            fadeOutColor="var(--background)"
            className="transition-colors duration-500"
          />
        </div>
      </motion.div>
    </section>
  );
};
