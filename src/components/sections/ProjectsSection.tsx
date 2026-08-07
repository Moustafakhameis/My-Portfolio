import React, { useMemo, useState, useEffect, useRef, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { 
  projects, 
  groupProjectsByCategory, 
  FeaturedProjectCard, 
  ProjectCard,
  SectionHeader,
  SectionDivider
} from './projects';

const CircularGallery = lazy(() => import('../ui/CircularGallery'));
const LightRays = lazy(() => import('../ui/LightRays'));


export const ProjectsSection = () => {
  const { t } = useLanguage();
  const [shouldLoad3D, setShouldLoad3D] = useState(false);
  const galleryContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Preload WebGL in the background after 2000ms idle time so shader compilation never freezes the scroll
    const timer = setTimeout(() => {
      setShouldLoad3D(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  
  // Memoize grouped projects for performance
  const groupedProjects = useMemo(() => groupProjectsByCategory(projects), []);

  const galleryItems = useMemo(() => {
    return projects
      .filter(p => p.image)
      .map(p => {
        // Create a shorter, but distinct title for the 3D gallery
        const parts = p.title.split(' - ');
        let shortTitle = parts[0].trim();
        
        // If it's a Zar3a sub-project, keep the 'Ui' or 'UseCase' part to differentiate them
        if (shortTitle === 'Zar3a' && parts.length > 1) {
          const subType = parts[1].trim();
          if (subType === 'Ui' || subType === 'UseCase') {
            shortTitle = `Zar3a ${subType}`;
          }
        }
        
        return {
          image: p.image as string,
          text: shortTitle
        };
      });
  }, []);

  return (
    <section id="work" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Main Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
        className="mb-20 relative"
      >
        <motion.h2 
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
          }}
          className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-6 flex flex-wrap gap-x-3 gap-y-2"
        >
          {t('projects', 'title').split(' ').map((word, i, arr) => {
            const isLast = i === arr.length - 1;
            return (
              <span 
                key={`${word}-${i}`} 
                className={isLast ? "text-transparent bg-clip-text bg-gradient-to-r from-primary via-fuchsia-500 to-pink-500 drop-shadow-[0_0_20px_rgba(217,70,239,0.3)] pr-2 pb-3" : "text-foreground"}
              >
                {word}
              </span>
            );
          })}
        </motion.h2>
        <motion.div
          variants={{
            hidden: { opacity: 0, scaleX: 0 },
            visible: { opacity: 1, scaleX: 1, transition: { type: "spring", stiffness: 300, damping: 25 } }
          }}
          className="h-1.5 w-24 bg-gradient-to-r from-primary to-pink-500 rounded-full mb-6 origin-left"
        />
        <motion.p 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
          }}
          className="text-muted-foreground max-w-2xl text-lg md:text-xl leading-relaxed"
        >
          {t('projects', 'description')}
        </motion.p>
      </motion.div>

      {/* 3D Circular Gallery */}
      {galleryItems.length > 0 && (
        <div ref={galleryContainerRef}>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full h-[500px] md:h-[600px] relative mb-32 rounded-[2.5rem] overflow-hidden border border-primary/20 shadow-[0_0_50px_-12px_rgba(168,85,247,0.15)] bg-slate-950 hidden lg:block"
          >
            {shouldLoad3D ? (
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-primary">Loading 3D Engine...</div>}>
                {/* Interactive LightRays Background */}
                <div className="absolute inset-0 z-0">
                  <LightRays
                    raysOrigin="top-center"
                    raysColor="#a855f7" // Primary purple theme
                    raysSpeed={1.5}
                    lightSpread={0.8}
                    rayLength={1.5}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0.05}
                    distortion={0.05}
                    pulsating={true}
                    fadeDistance={1}
                    saturation={1}
                  />
                </div>

                {/* Foreground Circular Gallery */}
                <div className="relative z-10 w-full h-full">
                  <CircularGallery
                    items={galleryItems}
                    bend={2}
                    textColor="rgba(255, 255, 255, 0.9)"
                    borderRadius={0.05}
                    scrollEase={0.05}
                    font="bold 24px Inter, sans-serif"
                  />
                </div>
              </Suspense>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-primary/50 text-sm">
                Loading Interactive Gallery...
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Featured Projects */}
      {groupedProjects.featured.length > 0 && (
        <div className="mb-32">
          <SectionHeader 
            title="Featured Projects" 
            description="My largest and most technically advanced full-stack applications, featuring complex architectures and production-level UI/UX."
            icon="⭐"
            gradientClass="from-zinc-800 dark:from-white via-amber-400 dark:via-amber-300 to-orange-500"
          />
          <div className="flex flex-col gap-16 md:gap-24">
            {groupedProjects.featured.map((project, index) => (
              <FeaturedProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Divider: Featured → Professional */}
      {groupedProjects.featured.length > 0 && groupedProjects.professional.length > 0 && (
        <SectionDivider gradientFrom="from-amber-400/60" gradientTo="to-cyan-400/60" />
      )}

      {/* Professional Projects */}
      {groupedProjects.professional.length > 0 && (
        <div className="mb-24">
          <SectionHeader 
            title="Professional Projects" 
            description="Production-quality frontend architecture and reusable development skills."
            icon="💼"
            gradientClass="from-zinc-800 dark:from-white via-cyan-400 dark:via-cyan-300 to-blue-600"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {groupedProjects.professional.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Divider: Professional → Practice */}
      {groupedProjects.professional.length > 0 && groupedProjects.practice.length > 0 && (
        <SectionDivider gradientFrom="from-cyan-400/60" gradientTo="to-emerald-400/60" />
      )}

      {/* Practice Projects */}
      {groupedProjects.practice.length > 0 && (
        <div className="mb-24">
          <SectionHeader 
            title="Advanced Practice Projects" 
            description="Demonstrating advanced frontend concepts, reusable architecture, animations, and modern UI."
            icon="🧪"
            gradientClass="from-zinc-800 dark:from-white via-emerald-400 dark:via-emerald-300 to-teal-600"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {groupedProjects.practice.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Divider: Practice → Learning */}
      {groupedProjects.practice.length > 0 && groupedProjects.learning.length > 0 && (
        <SectionDivider gradientFrom="from-emerald-400/60" gradientTo="to-pink-400/60" />
      )}

      {/* Learning Projects */}
      {groupedProjects.learning.length > 0 && (
        <div className="mb-12">
          <SectionHeader 
            title="Learning Projects" 
            description="Projects that helped build my frontend fundamentals and JavaScript skills."
            icon="📚"
            gradientClass="from-zinc-800 dark:from-white via-pink-400 dark:via-pink-300 to-rose-600"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedProjects.learning.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
