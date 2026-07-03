import React, { useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';

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

  // Determine the array of images to display
  const displayImages = images && images.length > 0 ? images : (image ? [image] : []);
  const hasMultipleImages = displayImages.length > 1;

  // Auto-play the carousel every 3 seconds if there are multiple images
  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % displayImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [displayImages.length, hasMultipleImages]);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Fallback CSS gradient placeholder based on category
  const getGradient = () => {
    switch (category) {
      case 'featured': return 'from-purple-900/40 via-fuchsia-900/40 to-pink-900/40';
      case 'professional': return 'from-blue-900/40 via-cyan-900/40 to-teal-900/40';
      case 'practice': return 'from-emerald-900/40 via-green-900/40 to-lime-900/40';
      case 'learning': return 'from-orange-900/40 via-red-900/40 to-rose-900/40';
      default: return 'from-primary/20 to-primary/10';
    }
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden bg-card/40 flex items-center justify-center group"
      onMouseMove={handleMouseMove}
    >
      {displayImages.length > 0 ? (
        <>
          <AnimatePresence mode="popLayout">
            <motion.img 
              key={currentIndex}
              src={displayImages[currentIndex]} 
              alt={`${title} screenshot ${currentIndex + 1}`} 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
          </AnimatePresence>
          
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-background/5 to-transparent opacity-40 group-hover:opacity-0 transition-opacity duration-500 z-10" />
          
          {/* Pagination Indicators */}
          {hasMultipleImages && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {displayImages.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-6 bg-primary shadow-[0_0_10px_rgba(168,85,247,0.8)]' : 'w-2 bg-white/40'}`}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${getGradient()}`}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent blur-2xl" />
          <h3 className="text-2xl md:text-4xl font-black text-white/50 tracking-widest uppercase text-center px-4 relative z-10 drop-shadow-lg">
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
