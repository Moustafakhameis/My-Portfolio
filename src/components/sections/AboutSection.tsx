import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, User, Target, Download } from 'lucide-react';
import { AnimatedButton } from '../ui/AnimatedButton';
import { useLanguage } from '../../context/LanguageContext';

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
          <motion.div variants={textReveal}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              {t('about', 'title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              {t('about', 'description')}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <AnimatedButton
                href="https://drive.google.com/file/d/19Ny6-7ZgrcbdwP98RSb9D_moc9PJOkVW/view?usp=drive_link"
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
            <motion.div 
              variants={cardReveal} 
              whileHover={{ scale: 1.05, y: -5 }} 
              className="p-8 rounded-3xl glass text-center border border-border/50 transition-colors duration-300 hover:border-primary/40 hover:bg-primary/5 group"
            >
              <h3 className="text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/70 group-hover:from-primary group-hover:to-primary/60 transition-all duration-300">
                0+
              </h3>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{t('about', 'yearsOfExperience')}</p>
            </motion.div>
            
            <motion.div 
              variants={cardReveal} 
              whileHover={{ scale: 1.05, y: -5 }} 
              className="p-8 rounded-3xl glass text-center border border-border/50 transition-colors duration-300 hover:border-primary/40 hover:bg-primary/5 group"
            >
              <h3 className="text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/70 group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
                20+
              </h3>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{t('about', 'projectsCompleted')}</p>
            </motion.div>

            <motion.div 
              variants={cardReveal} 
              whileHover={{ scale: 1.03, y: -5 }} 
              className="p-8 rounded-3xl glass text-center sm:col-span-2 border border-border/50 transition-colors duration-300 hover:border-primary/40 hover:bg-primary/5 group"
            >
              <h3 className="text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/70 group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300">
                0+
              </h3>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{t('about', 'happyClients')}</p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          variants={eduReveal} 
          className="glass p-10 rounded-3xl border border-border/50 relative overflow-hidden group hover:border-primary/30 transition-colors duration-500 hover:shadow-2xl hover:shadow-primary/5 isolate"
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
    </section>
  );
};
