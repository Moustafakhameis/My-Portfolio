import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedButton } from '../ui/AnimatedButton';
import { GithubIcon } from '../ui/Icons';
import { useMotionTemplate, useMotionValue } from 'framer-motion';

const projects = [
  {
    title: 'Eagle Mart',
    tech: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    description: 'Modern e-commerce platform with reusable components, responsive design, and seamless shopping experience.',
    challenges: 'State management for cart and responsive layouts.',
    results: 'Improved user retention and fast page loads.',
    link: 'https://eagle-mart-next-js.vercel.app/',
    github: 'https://github.com/Moustafakhameis/eagle-mart'
  },
  {
    title: 'Agency Website',
    tech: ['React', 'Bootstrap'],
    description: 'Agency landing page with responsive UI and smooth user experience.',
    challenges: 'Creating complex animations and maintaining performance.',
    results: 'High conversion rate and client satisfaction.',
    link: 'https://moustafakhameis.github.io/Agency-Website/',
    github: 'https://github.com/Moustafakhameis/Agency-Website'
  },
  {
    title: 'Weatherly App',
    tech: ['HTML', 'CSS', 'JavaScript', 'Weather API'],
    description: 'Weather forecasting application using real-time API data to display current and future conditions.',
    challenges: 'Handling asynchronous API calls and parsing complex JSON data.',
    results: 'Accurate and fast weather updates.',
    link: 'https://moustafakhameis.github.io/Weatherly-Elegant-Forecast/',
    github: 'https://github.com/Moustafakhameis/Weatherly-Elegant-Forecast'
  },
  {
    title: 'Bookmark Manager',
    tech: ['HTML', 'CSS', 'JavaScript'],
    description: 'Bookmark organization and management system with local storage persistence.',
    challenges: 'DOM manipulation and state persistence.',
    results: 'Clean and functional utility app.',
    link: 'https://moustafakhameis.github.io/Bookmark/',
    github: 'https://github.com/Moustafakhameis/Bookmark'
  },
  {
    title: 'Random Quote Generator',
    tech: ['HTML', 'CSS', 'JavaScript'],
    description: 'Developed a web app that displays random quotes dynamically using JavaScript.',
    challenges: 'Array manipulation and dynamic DOM updates.',
    results: 'Engaging user interface.',
    link: 'https://moustafakhameis.github.io/Random-Quote-Generator/',
    github: 'https://github.com/Moustafakhameis/Random-Quote-Generator'
  },
  {
    title: 'Login & Signup System',
    tech: ['HTML', 'CSS', 'JavaScript'],
    description: 'Developed a user authentication system with form validation using JavaScript.',
    challenges: 'Implementing robust client-side regex validation.',
    results: 'Secure and interactive user forms.',
    link: 'https://moustafakhameis.github.io/Login-Signup-Form/',
    github: 'https://github.com/Moustafakhameis/Login-Signup-Form'
  },
  {
    title: 'Daniels Portfolio',
    tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    description: 'Built a personal portfolio website with modern UI and responsive design.',
    challenges: 'Structuring responsive layouts with Bootstrap components.',
    results: 'Polished digital presence.',
    link: 'https://moustafakhameis.github.io/Bootstrap-Portfolio/',
    github: 'https://github.com/Moustafakhameis/Bootstrap-Portfolio'
  },
];

const SpotlightCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative group overflow-hidden rounded-3xl border border-border/50 bg-card/20 hover:border-primary/50 transition-colors duration-500 ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              var(--color-primary) 0%,
              transparent 15%
            )
          `
        }}
      />
      {/* Intense glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export const ProjectsSection = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { type: "tween", ease: "easeOut", duration: 1, delay: (i % 2) * 0.15 } 
    }),
  };

  return (
    <section id="work" className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ type: "tween", ease: "easeOut", duration: 1 }}
        className="mb-16 relative"
      >
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 bg-primary/10 blur-[60px] -z-10 rounded-full blob-blur" />
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
          {t('projects', 'title')}
        </h2>
        <p className="text-muted-foreground max-w-2xl text-lg md:text-xl leading-relaxed">
          {t('projects', 'description')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div 
            variants={cardVariants} 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            custom={index}
            key={index} 
            className="h-full"
          >
            <motion.div 
              whileHover={{ scale: 1.03, y: -10, rotateZ: 0.5 }} 
              transition={{ type: "tween", ease: "easeOut", damping: 20 }}
              className="h-full"
            >
              <SpotlightCard className="h-full p-8 flex flex-col justify-between glass shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.3)] group">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/80 group-hover:from-primary group-hover:to-pink-500 transition-all duration-500">
                      {project.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed text-lg group-hover:text-foreground/90 transition-colors duration-300">
                    {project.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    <motion.div 
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="p-4 rounded-xl bg-background/50 border border-border/30 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-300"
                    >
                      <span className="text-xs uppercase tracking-widest font-bold text-primary block mb-2">Challenges</span>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">{project.challenges}</p>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="p-4 rounded-xl bg-background/50 border border-border/30 group-hover:border-pink-500/30 group-hover:bg-pink-500/5 transition-all duration-300"
                    >
                      <span className="text-xs uppercase tracking-widest font-bold text-pink-500 block mb-2">Results</span>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">{project.results}</p>
                    </motion.div>
                  </div>
                </div>

                <div className="flex flex-col gap-6 mt-auto pt-6 border-t border-border/20 group-hover:border-primary/30 transition-colors duration-300">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <motion.span 
                        key={t} 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, type: "tween", ease: "easeOut" }}
                        whileHover={{ scale: 1.1, rotate: [-2, 2, -2, 0], backgroundColor: "rgba(168,85,247,1)", color: "#fff" }}
                        className="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary text-xs font-bold rounded-full transition-colors duration-300 cursor-default"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.link !== '#' && (
                      <AnimatedButton 
                        href={project.link}
                        variant="primary"
                        className="!px-5 !py-2.5 !text-sm flex-1 justify-center"
                      >
                        <ExternalLink size={16} />
                        {t('projects', 'viewProject')}
                      </AnimatedButton>
                    )}
                    {project.github !== '#' && (
                      <AnimatedButton 
                        href={project.github}
                        variant="outline"
                        className="!px-5 !py-2.5 !text-sm flex-1 justify-center"
                      >
                        <GithubIcon size={16} />
                        {t('projects', 'viewGithub')}
                      </AnimatedButton>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
