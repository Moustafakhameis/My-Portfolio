import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from './types';
import { ProjectPreview } from './ProjectPreview';
import { ProjectBadge } from './ProjectBadge';
import { TechStack } from './TechStack';
import { ProjectActions } from './ProjectActions';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const isLearning = project.category === 'learning';
  const isPractice = project.category === 'practice';
  const isProfessional = project.category === 'professional';

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
        whileHover={{ y: -5 }} 
        transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
        className="h-full"
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-border/40 bg-card/40 md:bg-card/20 md:backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col group/card">
          
          {/* Image */}
          <div className="h-48 sm:h-56 w-full relative overflow-hidden border-b border-border/20">
            <ProjectPreview image={project.image} images={project.images} title={project.title} category={project.category} />
          </div>

          {/* Content Section */}
          <div className={`flex flex-col flex-1 ${isLearning ? 'p-5' : 'p-6 md:p-8'}`}>
            <div className="flex justify-between items-start mb-4 gap-4">
              <h3 className={`${isLearning ? 'text-xl' : 'text-2xl md:text-3xl'} font-black text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-pink-500 transition-all duration-300 line-clamp-2`}>
                {project.title}
              </h3>
              <div className="shrink-0 mt-1">
                <ProjectBadge category={project.category} />
              </div>
            </div>

            <p className={`text-muted-foreground ${isLearning ? 'text-sm mb-4 line-clamp-3' : 'text-base mb-6 leading-relaxed line-clamp-4'} group-hover:text-foreground/90 transition-colors duration-300 flex-1`}>
              {project.description}
            </p>

            <div className="mt-auto space-y-6">
              <TechStack tech={project.tech} category={project.category} />
              
              <div className="pt-6 border-t border-border/20 group-hover:border-primary/30 transition-colors duration-300">
                <ProjectActions link={project.link} github={project.github} category={project.category} />
              </div>
            </div>
          </div>
          
        </div>
      </motion.div>
    </motion.div>
  );
};
