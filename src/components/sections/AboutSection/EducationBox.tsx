import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

const eduReveal = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { type: "tween", ease: "easeOut", duration: 1.2 } 
  },
};

export const EducationBox = () => {
  const { t, language } = useLanguage();

  return (
    <motion.div 
      variants={eduReveal} 
      className="glass p-6 md:p-10 rounded-3xl border border-border/50 relative overflow-hidden group hover:border-primary/30 transition-colors duration-500 hover:shadow-2xl hover:shadow-primary/5 isolate"
    >
      <div className={`absolute top-0 w-64 h-64 bg-blue-500/10 dark:bg-primary/5 rounded-full blur-3xl -translate-y-1/2 group-hover:bg-blue-500/20 dark:group-hover:bg-primary/10 transition-colors duration-500 blob-blur ${language === 'ar' ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'}`} />
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
  );
};
