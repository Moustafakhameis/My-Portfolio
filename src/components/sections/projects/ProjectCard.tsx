import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from './types';
import { ProjectPreview } from './ProjectPreview';
import { ProjectBadge } from './ProjectBadge';
import { TechStack } from './TechStack';
import { ProjectActions } from './ProjectActions';
import { useIsTouchDevice } from '../../../hooks/useIsTouchDevice';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const isLearning = project.category === 'learning';
  const isPractice = project.category === 'practice';
  const isProfessional = project.category === 'professional';
  const isTouchDevice = useIsTouchDevice();

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { type: "tween", ease: "easeOut", duration: 0.8, delay: (index % 3) * 0.1 } 
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="h-full"
    >
      <motion.div 
        whileHover={isTouchDevice ? undefined : { y: -5 }} 
        whileTap={{ scale: 0.98 }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
        className="h-full"
      >
        <div className={`relative overflow-hidden rounded-[2rem] border border-border/40 bg-card/60 md:bg-card/40 shadow-xl transition-all duration-500 h-full flex flex-col group/card ${isTouchDevice ? '' : 'hover:shadow-2xl'}`}>
          
          {/* Image */}
          <div className="w-full max-h-[16rem] sm:max-h-[20rem] lg:max-h-[24rem] relative overflow-hidden border-b border-border/20">
            <ProjectPreview image={project.image} images={project.images} title={project.title} category={project.category} />
          </div>

          {/* Content Section */}
          <div className={`flex flex-col flex-1 ${isLearning ? 'p-5' : 'p-6 md:p-8'}`}>
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <ProjectBadge category={project.category} />
              
              {/* Animated glowing line */}
              <div className="relative flex-1 h-[1px] bg-gradient-to-r from-border/30 to-transparent overflow-hidden">
                <motion.div 
                  className={`absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent ${
                    project.category === 'featured' ? 'via-amber-500' :
                    project.category === 'professional' ? 'via-blue-500' :
                    project.category === 'practice' ? 'via-emerald-500' :
                    project.category === 'learning' ? 'via-slate-400' : 'via-primary'
                  } to-transparent opacity-50`}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: Math.random() * 2 }}
                />
              </div>
            </div>
            
            <h3 className={`${isLearning ? 'text-xl' : 'text-2xl md:text-3xl'} font-black text-foreground ${isTouchDevice ? '' : 'group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-pink-500'} transition-all duration-300 line-clamp-2 mb-4`}>
              {project.title}
            </h3>
            <p className={`text-muted-foreground ${isLearning ? 'text-sm mb-4 line-clamp-3' : 'text-base mb-6 leading-relaxed line-clamp-4'} ${isTouchDevice ? '' : 'group-hover:text-foreground/90'} transition-colors duration-300 flex-1`}>
              {project.description}
            </p>

            <div className="mt-auto space-y-6">
              <TechStack tech={project.tech} category={project.category} />
              
              <div className={`pt-6 border-t border-border/20 ${isTouchDevice ? '' : 'group-hover:border-primary/30'} transition-colors duration-300`}>
                <ProjectActions link={project.link} github={project.github} category={project.category} />
              </div>
            </div>
          </div>
          
        </div>
      </motion.div>
    </motion.div>
  );
};
