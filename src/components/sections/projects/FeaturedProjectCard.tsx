import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import type { Project } from './types';
import { ProjectPreview } from './ProjectPreview';
import { ProjectBadge } from './ProjectBadge';
import { TechStack } from './TechStack';
import { ProjectActions } from './ProjectActions';

interface FeaturedProjectCardProps {
  project: Project;
  index: number;
}

export const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({ project, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (isTouchDevice) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "tween", ease: "easeOut", duration: 1, delay: index * 0.2 } 
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="w-full relative group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
    >
      <motion.div 
        whileHover={{ y: -10 }} 
        transition={{ type: "tween", ease: "easeOut", duration: 0.4 }}
      >
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/30 md:bg-card/20 shadow-2xl hover:shadow-[0_30px_60px_-15px_rgba(168,85,247,0.4)] transition-all duration-700">
          
          {/* Intense glow on hover based on mouse position */}
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-10 rounded-[2.5rem]"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  800px circle at ${mouseX}px ${mouseY}px,
                  rgba(168, 85, 247, 0.15) 0%,
                  transparent 80%
                )
              `
            }}
          />

          <div className="flex flex-col h-full relative z-20">
            {/* Image Top */}
            <div className="w-full max-h-[24rem] sm:max-h-[30rem] lg:max-h-[40rem] shrink-0 border-b border-border/20 relative overflow-hidden bg-black/20">
              <ProjectPreview image={project.image} images={project.images} title={project.title} category={project.category} />
            </div>

            {/* Content Bottom */}
            <div className="w-full p-6 md:p-10 lg:p-16 flex flex-col justify-center max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <ProjectBadge category={project.category} />
                <span className="h-px flex-1 bg-gradient-to-r from-border/50 to-transparent" />
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60 mb-6 group-hover:from-primary group-hover:via-purple-400 group-hover:to-pink-500 transition-all duration-700">
                {project.title}
              </h3>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 group-hover:text-foreground/90 transition-colors duration-500 max-w-4xl">
                {project.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-background/40 border border-border/30 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-300"
                >
                  <span className="text-xs uppercase tracking-widest font-black text-primary block mb-2">Challenges Solved</span>
                  <p className="text-sm md:text-base text-muted-foreground group-hover:text-foreground/80 transition-colors">{project.challenges}</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-background/40 border border-border/30 group-hover:border-pink-500/40 group-hover:bg-pink-500/5 transition-all duration-300"
                >
                  <span className="text-xs uppercase tracking-widest font-black text-pink-500 block mb-2">Technical Results</span>
                  <p className="text-sm md:text-base text-muted-foreground group-hover:text-foreground/80 transition-colors">{project.results}</p>
                </motion.div>
              </div>

              <div className="mt-auto space-y-8">
                <TechStack tech={project.tech} category={project.category} />
                
                <div className="pt-8 border-t border-border/20 group-hover:border-primary/40 transition-colors duration-500">
                  <ProjectActions link={project.link} github={project.github} category={project.category} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
