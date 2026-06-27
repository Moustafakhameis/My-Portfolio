import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Copy, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedButton } from '../ui/AnimatedButton';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

export const ContactSection = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  
  const email = 'moustafakhameis@gmail.com';
  const phone = '+201129482206';

  const { t } = useLanguage();

  const handleCopy = (text: string, setCopied: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "tween", ease: "easeOut", duration: 1 } 
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-5xl mx-auto text-center relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[100px] -z-10 rounded-full blob-blur" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-foreground to-primary/80 pb-8 pt-2">
            {t('contact', 'title')}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-2xl mx-auto">
            {t('contact', 'description')}
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-20 flex-wrap w-full">
          
          {/* Email Group */}
          <motion.div variants={itemVariants} className="relative group flex items-center gap-3 md:gap-0 w-full max-w-[320px] md:max-w-none md:w-auto mx-auto md:mx-0">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 md:flex-none">
              <AnimatedButton
                href={`mailto:${email}`}
                variant="primary"
                className="w-full justify-center !py-3.5 !px-6 !text-base md:!px-7 md:!text-lg shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.6)] transition-shadow duration-300"
              >
                <Mail size={20} className="me-2" />
                {t('contact', 'sayHello')}
              </AnimatedButton>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCopy(email, setCopiedEmail)}
              className="flex-shrink-0 md:ms-6 w-[50px] h-[50px] flex items-center justify-center rounded-full bg-muted/80 text-muted-foreground hover:text-primary hover:bg-primary/10 border border-border/50 hover:border-primary/50 transition-all duration-300 shadow-sm"
              title={t('contact', 'copyEmail')}
            >
              {copiedEmail ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
            </motion.button>
          </motion.div>

          {/* Gmail Group */}
          <motion.div variants={itemVariants} className="relative group flex items-center gap-3 md:gap-0 w-full max-w-[320px] md:max-w-none md:w-auto mx-auto md:mx-0">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 md:flex-none">
              <AnimatedButton
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                className="w-full justify-center !py-3.5 !px-6 !text-base md:!px-7 md:!text-lg border-primary/30 hover:border-primary/80 hover:bg-primary/5 transition-colors duration-300"
              >
                <Mail size={20} className="me-2 text-primary" />
                {t('contact', 'openGmail')}
              </AnimatedButton>
            </motion.div>
            {/* Invisible spacer on mobile to perfectly align the Gmail button with the others */}
            <div className="w-[50px] flex-shrink-0 md:hidden pointer-events-none opacity-0" />
          </motion.div>

          {/* Phone Group */}
          <motion.div variants={itemVariants} className="relative group flex items-center gap-3 md:gap-0 w-full max-w-[320px] md:max-w-none md:w-auto mx-auto md:mx-0">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 md:flex-none">
              <AnimatedButton
                href={`tel:${phone.replace('+', '')}`}
                variant="outline"
                className="w-full justify-center !py-3.5 !px-6 !text-base md:!px-7 md:!text-lg border-primary/30 hover:border-primary/80 hover:bg-primary/5 transition-colors duration-300"
              >
                <Phone size={18} className="me-3 text-primary" />
                <span className="font-bold tracking-wider" dir="ltr">{phone}</span>
              </AnimatedButton>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCopy(phone, setCopiedPhone)}
              className="flex-shrink-0 md:ms-6 w-[50px] h-[50px] flex items-center justify-center rounded-full bg-muted/80 text-muted-foreground hover:text-primary hover:bg-primary/10 border border-border/50 hover:border-primary/50 transition-all duration-300 shadow-sm"
              title={t('contact', 'copyPhone')}
            >
              {copiedPhone ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
            </motion.button>
          </motion.div>
          
        </div>

        <motion.div variants={itemVariants} className="flex justify-center items-center gap-12 border-t border-border/30 pt-16 mt-8 relative">
          {/* Subtle glow on the separator line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-[1px] blob-blur" />
          
          <a
            href="https://www.linkedin.com/in/moustafaly"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-all duration-300 flex flex-col items-center gap-3 group"
          >
            <motion.div 
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-5 rounded-full bg-muted/30 group-hover:bg-primary/10 border border-transparent group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all duration-300"
            >
              <LinkedinIcon size={32} />
            </motion.div>
            <span className="text-sm font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100">LinkedIn</span>
          </a>
          <a
            href="https://github.com/Moustafakhameis"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-all duration-300 flex flex-col items-center gap-3 group"
          >
            <motion.div 
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-5 rounded-full bg-muted/30 group-hover:bg-primary/10 border border-transparent group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all duration-300"
            >
              <GithubIcon size={32} />
            </motion.div>
            <span className="text-sm font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100">GitHub</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
