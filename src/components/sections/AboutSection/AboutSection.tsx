import React from 'react';
import { motion } from 'framer-motion';
import { TechStack } from './TechStack';
import { Biography } from './Biography';
import { EducationBox } from './EducationBox';

export const AboutSection = () => {
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
          <Biography />
        </div>
        <EducationBox />
      </motion.div>
      <TechStack />
    </section>
  );
};
