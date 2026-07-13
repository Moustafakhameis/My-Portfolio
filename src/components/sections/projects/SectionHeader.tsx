import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  description: string;
  delay?: number;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ type: "tween", ease: "easeOut", duration: 0.8, delay }}
    className="mb-10 mt-20 first:mt-0"
  >
    <h3 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
      {title}
    </h3>
    <p className="text-muted-foreground text-lg">{description}</p>
  </motion.div>
);
