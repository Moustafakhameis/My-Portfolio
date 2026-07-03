import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Copy, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { AnimatedButton } from '../ui/AnimatedButton';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

export const ContactSection = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  
  const email = 'moustafakhameis@gmail.com';
  const phone = '+201129482206';

  const { t } = useLanguage();
  const { toast } = useToast();

  const handleCopy = (text: string, setCopied: React.Dispatch<React.SetStateAction<boolean>>, message: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(message);
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
    <section id="contact" className="py-24 px-6 md:px-12 max-w-5xl mx-auto text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[100px] -z-10 rounded-full blob-blur" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-2 pb-8 pt-2 flex flex-wrap justify-center gap-x-3 gap-y-2">
            {t('contact', 'title').split(' ').map((word: string, i: number, arr: string[]) => {
              const isLast = i === arr.length - 1;
              return (
                <span 
                  key={i} 
                  className={isLast ? "text-transparent bg-clip-text bg-gradient-to-r from-primary via-fuchsia-500 to-pink-500 drop-shadow-[0_0_20px_rgba(217,70,239,0.3)]" : "text-foreground"}
                >
                  {word}
                </span>
              );
            })}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-2xl mx-auto">
            {t('contact', 'description')}
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-20 flex-wrap w-full">
          
          {/* Email Group */}
          <motion.div variants={itemVariants} className="relative group flex items-center gap-3 md:gap-0 w-full max-w-[320px] md:max-w-none md:w-auto mx-auto md:mx-0">
            <div className="flex-1 md:flex-none hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200 ease-out">
              <AnimatedButton
                href={`mailto:${email}`}
                variant="primary"
                className="w-full justify-center !py-3.5 !px-6 !text-base md:!px-7 md:!text-lg shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.6)] transition-shadow duration-300"
              >
                <Mail size={20} className="me-2" />
                {t('contact', 'sayHello')}
              </AnimatedButton>
            </div>
            <button
              onClick={() => handleCopy(email, setCopiedEmail, 'Email address copied to clipboard')}
              className="flex-shrink-0 md:ms-6 w-[50px] h-[50px] flex items-center justify-center rounded-full bg-muted/80 text-muted-foreground hover:text-primary hover:bg-primary/10 border border-border/50 hover:border-primary/50 transition-all duration-200 ease-out hover:scale-110 hover:rotate-6 active:scale-90 shadow-sm"
              title={t('contact', 'copyEmail')}
            >
              {copiedEmail ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
            </button>
          </motion.div>

          {/* Gmail Group */}
          <motion.div variants={itemVariants} className="relative group flex items-center gap-3 md:gap-0 w-full max-w-[320px] md:max-w-none md:w-auto mx-auto md:mx-0">
            <div className="flex-1 md:flex-none hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200 ease-out">
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
            </div>
            {/* Invisible spacer on mobile to perfectly align the Gmail button with the others */}
            <div className="w-[50px] flex-shrink-0 md:hidden pointer-events-none opacity-0" />
          </motion.div>

          {/* Phone Group */}
          <motion.div variants={itemVariants} className="relative group flex items-center gap-3 md:gap-0 w-full max-w-[320px] md:max-w-none md:w-auto mx-auto md:mx-0">
            <div className="flex-1 md:flex-none hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200 ease-out">
              <AnimatedButton
                onClick={() => handleCopy(phone, setCopiedPhone, 'Phone number copied to clipboard')}
                variant="outline"
                className="w-full justify-center !py-3.5 !px-6 !text-base md:!px-7 md:!text-lg border-primary/30 hover:border-primary/80 hover:bg-primary/5 transition-colors duration-300 cursor-pointer"
              >
                <Phone size={18} className="me-3 text-primary" />
                <span className="font-bold tracking-wider" dir="ltr">{phone}</span>
              </AnimatedButton>
            </div>
            <button
              onClick={() => handleCopy(phone, setCopiedPhone, 'Phone number copied to clipboard')}
              className="flex-shrink-0 md:ms-6 w-[50px] h-[50px] flex items-center justify-center rounded-full bg-muted/80 text-muted-foreground hover:text-primary hover:bg-primary/10 border border-border/50 hover:border-primary/50 transition-all duration-200 ease-out hover:scale-110 hover:-rotate-6 active:scale-90 shadow-sm"
              title={t('contact', 'copyPhone')}
            >
              {copiedPhone ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
            </button>
          </motion.div>
          
        </div>

        <motion.div variants={itemVariants} className="flex justify-center items-center gap-12 border-t border-border/30 pt-16 mt-8 relative">
          {/* Subtle glow on the separator line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-[1px] blob-blur" />
          
          <a
            href="https://www.linkedin.com/in/moustafaly"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-all duration-200 flex flex-col items-center gap-3 group"
          >
            <div 
              className="p-5 rounded-full bg-muted/30 group-hover:bg-primary/10 border border-transparent group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all duration-200 ease-out group-hover:scale-110 group-hover:-translate-y-1 group-active:scale-95"
            >
              <LinkedinIcon size={32} />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity duration-200">LinkedIn</span>
          </a>
          <a
            href="https://github.com/Moustafakhameis"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-all duration-200 flex flex-col items-center gap-3 group"
          >
            <div 
              className="p-5 rounded-full bg-muted/30 group-hover:bg-primary/10 border border-transparent group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all duration-200 ease-out group-hover:scale-110 group-hover:-translate-y-1 group-active:scale-95"
            >
              <GithubIcon size={32} />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity duration-200">GitHub</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
