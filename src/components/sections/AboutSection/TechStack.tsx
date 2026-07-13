import React from 'react';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, 
  SiFramer, SiThreedotjs, SiJavascript, SiHtml5, 
  SiCss, SiGreensock, SiGithub, SiBootstrap 
} from 'react-icons/si';
import LogoLoop from '../../ui/LogoLoop';
import { useLanguage } from '../../../context/LanguageContext';
import { motion } from 'framer-motion';

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

    /* ─── Light Mode ─── */
    .light .tech-card {
      background-color: rgba(255, 255, 255, 0.8);
      border-color: rgba(0, 0, 0, 0.08);
      box-shadow: 
        0 1px 3px rgba(0, 0, 0, 0.06),
        0 4px 12px rgba(0, 0, 0, 0.04),
        inset 0 1px 0 rgba(255, 255, 255, 0.9);
    }
    .light .tech-card:hover {
      background-color: rgba(255, 255, 255, 0.95);
      border-color: rgba(0, 0, 0, 0.1);
      box-shadow: 
        0 4px 20px rgba(0, 0, 0, 0.08),
        0 8px 32px var(--glow-color),
        inset 0 1px 0 rgba(255, 255, 255, 1);
      transform: translateY(-8px);
    }
    .light .tech-card .tech-icon {
      color: var(--light-hover-color);
      opacity: 0.7;
      filter: none;
    }
    .light .tech-card:hover .tech-icon {
      color: var(--light-hover-color);
      opacity: 1;
      filter: drop-shadow(0 0 10px var(--glow-color));
      transform: scale(1.15);
    }
    .light .tech-card:hover .tech-bg {
      opacity: 0.06;
      background-color: var(--light-hover-color);
    }
    .light .tech-card .tech-glow {
      box-shadow: inset 0 0 20px var(--glow-color);
    }
    .light .tech-card:hover .tech-glow {
      opacity: 0.4;
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
      /* Light mode mobile */
      .light .tech-card {
        background-color: rgba(255, 255, 255, 0.9);
        border-color: rgba(0, 0, 0, 0.08);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      }
      .light .tech-card .tech-icon {
        opacity: 0.85 !important;
        color: var(--light-hover-color) !important;
      }
      .light .tech-card:hover, .light .tech-card:active {
        border-color: rgba(0, 0, 0, 0.12) !important;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08) !important;
      }
    }
  `}</style>
);

const IconWrapper = ({ icon: Icon, hoverColor, glowColor, lightHoverColor }: { icon: React.ElementType, hoverColor: string, glowColor: string, lightHoverColor?: string }) => (
  <div 
    className="tech-card relative flex items-center justify-center w-[4.5rem] h-[4.5rem] sm:w-[5.5rem] sm:h-[5.5rem] md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-2xl sm:rounded-[1.5rem] lg:rounded-[2rem] bg-card/20 border border-border/30 cursor-pointer shadow-sm transform-gpu will-change-transform"
    style={{ '--hover-color': hoverColor, '--light-hover-color': lightHoverColor || hoverColor, '--glow-color': glowColor } as React.CSSProperties}
  >
    <div className="tech-bg absolute inset-0 rounded-2xl sm:rounded-[1.5rem] lg:rounded-[2rem]" />
    <div className="tech-glow absolute inset-0 rounded-2xl sm:rounded-[1.5rem] lg:rounded-[2rem]" />
    <div className="tech-reflection absolute -bottom-4 w-1/2 h-4 blur-xl rounded-full hidden lg:block transform-gpu will-change-transform" />
    <Icon className="tech-icon relative z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 transform-gpu" />
  </div>
);

const techLogos = [
  { node: <IconWrapper icon={SiReact} hoverColor="#61DAFB" glowColor="rgba(97,218,251,0.5)" />, title: "React 19", href: "https://react.dev" },
  { node: <IconWrapper icon={SiNextdotjs} hoverColor="#FFFFFF" lightHoverColor="#000000" glowColor="rgba(0,0,0,0.3)" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <IconWrapper icon={SiTypescript} hoverColor="#3178C6" glowColor="rgba(49,120,198,0.5)" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <IconWrapper icon={SiTailwindcss} hoverColor="#06B6D4" glowColor="rgba(6,182,212,0.5)" />, title: "Tailwind v4", href: "https://tailwindcss.com" },
  { node: <IconWrapper icon={SiFramer} hoverColor="#0055FF" glowColor="rgba(0,85,255,0.5)" />, title: "Framer Motion", href: "https://www.framer.com/motion/" },
  { node: <IconWrapper icon={SiThreedotjs} hoverColor="#FFFFFF" lightHoverColor="#000000" glowColor="rgba(0,0,0,0.3)" />, title: "Three.js", href: "https://threejs.org" },
  { node: <IconWrapper icon={SiJavascript} hoverColor="#F7DF1E" glowColor="rgba(247,223,30,0.5)" />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <IconWrapper icon={SiHtml5} hoverColor="#E34F26" glowColor="rgba(227,79,38,0.5)" />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { node: <IconWrapper icon={SiCss} hoverColor="#1572B6" glowColor="rgba(21,114,182,0.5)" />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { node: <IconWrapper icon={SiGreensock} hoverColor="#88CE02" glowColor="rgba(136,206,2,0.5)" />, title: "GSAP", href: "https://gsap.com" },
  { node: <IconWrapper icon={SiGithub} hoverColor="#FFFFFF" lightHoverColor="#000000" glowColor="rgba(0,0,0,0.3)" />, title: "GitHub", href: "https://github.com" },
  { node: <IconWrapper icon={SiBootstrap} hoverColor="#7952B3" glowColor="rgba(121,82,179,0.5)" />, title: "Bootstrap", href: "https://getbootstrap.com" },
];

export const TechStack = () => {
  const { t } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.5 }}
      className="mt-32 pt-16 border-t border-border/10 relative"
    >
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
          fadeOut={false}
          className="transition-colors duration-500"
        />
      </div>
    </motion.div>
  );
};
