import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const experiences = [
  {
    title: 'Front-End Development Trainee',
    company: 'ITI (Information Technology Institute)',
    date: 'Aug. 2025 - Sept. 2025',
    description: 'Intensive training program focusing on modern software development practices and frontend technologies.',
  },
  {
    title: 'Summer Intern',
    company: 'QNB (Qatar National Bank)',
    date: 'Jul. 2025',
    description: 'Summer internship gaining hands-on experience in corporate environments and systems.',
  },
  {
    title: 'Front-End Development Trainee',
    company: 'Route Academy',
    date: 'Feb. 2025 - Oct. 2025',
    description: 'Advanced web development bootcamp covering React, modern JavaScript, and building responsive user interfaces.',
  },
  {
    title: 'HR at Three DOS',
    company: 'Three DOS',
    date: 'Jan. 2024 - Sept. 2024',
    description: 'Handled human resources responsibilities, organizational tasks, and team coordination.',
  },
  {
    title: 'Member / Contributor',
    company: 'Enactus',
    date: 'Oct. 2023 - Nov. 2024',
    description: 'Collaborated on entrepreneurial projects aimed at creating sustainable positive impact in the community.',
  },
  {
    title: 'Mint Ambassador',
    company: 'EG BANK / Mint Ambassadors',
    date: 'Oct. 2023 - Nov. 2023',
    description: 'Represented the Mint program and engaged in various campus and community initiatives.',
  },
  {
    title: 'Summer Intern',
    company: 'CIB (Commercial International Bank)',
    date: 'Aug. 2023',
    description: 'Participated in comprehensive training covering banking operations and modern financial technologies.',
  },
];

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative group overflow-hidden rounded-3xl border border-border/30 bg-card/40 hover:border-primary/40 transition-colors duration-500 shadow-lg hover:shadow-2xl hover:shadow-primary/20 ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              var(--color-primary) 0%,
              transparent 15%
            )
          `
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const { t, language } = useLanguage();

  return (
    <section id="experience" ref={containerRef} className="py-24 px-6 md:px-12 max-w-5xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ type: "tween", ease: "easeOut", duration: 1 }}
        className="max-w-4xl mx-auto mb-20 relative"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/10 blur-[60px] -z-10 rounded-full blob-blur" />
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-center">
          {t('experience', 'title')}
        </h2>
      </motion.div>

      <div className={`relative space-y-12 pb-8 ${language === 'ar' ? 'mr-8 md:mr-12' : 'ml-8 md:ml-12'}`}>
        {/* Background faded line */}
        <div className={`absolute top-6 bottom-0 w-[2px] bg-border/20 rounded-full ${language === 'ar' ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`} />
        
        {/* Animated glowing progress line */}
        <motion.div 
          style={{ scaleY, transformOrigin: "top" }}
          className={`absolute top-6 bottom-0 w-[3px] bg-gradient-to-b from-primary via-purple-500 to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.8)] z-0 rounded-full ${language === 'ar' ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`} 
        />

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: index * 0.1 } }
            }}
            className={`relative group ${language === 'ar' ? 'pr-8 md:pr-16' : 'pl-8 md:pl-16'}`}
          >
            {/* Timeline icon */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0 },
                visible: { opacity: 1, scale: 1, transition: { type: "tween", ease: "easeOut", duration: 0.8 } }
              }}
              whileHover={{ scale: 1.2, rotate: 360, transition: { type: "tween", ease: "easeOut", duration: 0.8 } }}
              className={`absolute top-6 p-2.5 bg-background border-2 border-border group-hover:border-primary rounded-full text-muted-foreground group-hover:text-primary shadow-sm group-hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-colors z-10 ring-4 ring-background ${language === 'ar' ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`}
            >
              <Briefcase size={18} />
            </motion.div>

            {/* Experience Card */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: language === 'ar' ? -50 : 50 },
                visible: { opacity: 1, x: 0, transition: { type: "tween", ease: "easeOut", duration: 1 } }
              }}
            >
              <motion.div whileHover={{ scale: 1.01, x: language === 'ar' ? -5 : 5 }} transition={{ type: "tween", ease: "easeOut" }}>
                <SpotlightCard className="p-8 md:p-10 backdrop-blur-md">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-pink-500 transition-all duration-500">
                        {exp.title}
                      </h3>
                      <p className="text-lg md:text-xl text-primary font-semibold mt-2 opacity-90">{exp.company}</p>
                    </div>
                    <span className="inline-flex px-5 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-bold text-primary shadow-inner whitespace-nowrap">
                      {exp.date}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg opacity-90">
                    {exp.description}
                  </p>
                </SpotlightCard>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
