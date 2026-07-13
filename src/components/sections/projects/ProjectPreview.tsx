import React, { useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectPreviewProps {
  image?: string;
  images?: string[];
  title: string;
  category: 'featured' | 'professional' | 'practice' | 'learning';
}

export const ProjectPreview: React.FC<ProjectPreviewProps> = ({ image, images, title, category }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Determine the array of images to display
  const displayImages = images && images.length > 0 ? images : (image ? [image] : []);
  const hasMultipleImages = displayImages.length > 1;

  // Auto-play the carousel every 3 seconds if there are multiple images and not hovered
  useEffect(() => {
    if (!hasMultipleImages || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % displayImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [displayImages.length, hasMultipleImages, isHovered]);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Fallback CSS gradient placeholder based on category
  const getGradient = () => {
    switch (category) {
      case 'featured': return 'from-purple-500/20 via-fuchsia-500/20 to-pink-500/20 dark:from-purple-900/40 dark:via-fuchsia-900/40 dark:to-pink-900/40';
      case 'professional': return 'from-blue-500/20 via-cyan-500/20 to-teal-500/20 dark:from-blue-900/40 dark:via-cyan-900/40 dark:to-teal-900/40';
      case 'practice': return 'from-emerald-500/20 via-green-500/20 to-lime-500/20 dark:from-emerald-900/40 dark:via-green-900/40 dark:to-lime-900/40';
      case 'learning': return 'from-orange-500/20 via-red-500/20 to-rose-500/20 dark:from-orange-900/40 dark:via-red-900/40 dark:to-rose-900/40';
      default: return 'from-primary/20 to-primary/10';
    }
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden bg-card/40 flex items-center justify-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setIsHovered(false); mouseX.set(0); mouseY.set(0); }}
    >
      {displayImages.length > 0 ? (
        <>
          {/* Invisible placeholder to perfectly match the image's natural aspect ratio without arbitrary cropping */}
          <img 
            src={displayImages[0]} 
            alt="aspect-ratio-placeholder" 
            className="w-full h-auto opacity-0 pointer-events-none block" 
            aria-hidden="true" 
          />
          
          <AnimatePresence mode="popLayout">
            <motion.img 
              key={currentIndex}
              src={displayImages[currentIndex]} 
              alt={`${title} screenshot ${currentIndex + 1}`} 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          </AnimatePresence>
          
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-background/5 to-transparent opacity-40 group-hover:opacity-0 transition-opacity duration-500 z-10 pointer-events-none" />
          
          {/* Navigation Buttons */}
          {hasMultipleImages && (
            <>
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length); }}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-background/60 hover:bg-primary/60 text-foreground hover:text-white backdrop-blur-md transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 border border-border/30 hover:border-primary/50 shadow-xl"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} className="md:w-6 md:h-6" />
              </button>
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % displayImages.length); }}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-background/60 hover:bg-primary/60 text-foreground hover:text-white backdrop-blur-md transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 border border-border/30 hover:border-primary/50 shadow-xl"
                aria-label="Next image"
              >
                <ChevronRight size={20} className="md:w-6 md:h-6" />
              </button>
            </>
          )}

          
          {/* Pagination Indicators */}
          {hasMultipleImages && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {displayImages.map((_, idx) => (
                <div 
                  key={`indicator-${idx}`} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-6 bg-primary shadow-[0_0_10px_rgba(168,85,247,0.8)]' : 'w-2 bg-white/40'}`}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${getGradient()}`}>
          <div className="absolute inset-0 opacity-20 dark:opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-foreground dark:from-white via-transparent to-transparent blur-2xl" />
          <h3 className="text-2xl md:text-4xl font-black text-foreground/30 dark:text-white/50 tracking-widest uppercase text-center px-4 relative z-10 drop-shadow-lg">
            {title}
          </h3>
        </div>
      )}

      {/* Interactive Hover Glow specific to the image area */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-20"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.1) 0%,
              transparent 80%
            )
          `
        }}
      />
    </div>
  );
};
