'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollFadeSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollFadeSection({ children, className = '', delay = 0 }: ScrollFadeSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
