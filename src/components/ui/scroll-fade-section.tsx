'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

type AnimationVariant = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'blur';

interface ScrollFadeSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: AnimationVariant;
  duration?: number;
  once?: boolean;
}

const variants: Record<AnimationVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 }
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 }
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: { opacity: 1, filter: 'blur(0px)' }
  }
};

export function ScrollFadeSection({ 
  children, 
  className = '', 
  delay = 0,
  variant = 'fadeUp',
  duration = 0.6,
  once = true
}: ScrollFadeSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={variants[variant]}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger container for animating children in sequence
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({ 
  children, 
  className = '',
  staggerDelay = 0.1
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ staggerChildren: staggerDelay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Individual stagger item
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  variant?: AnimationVariant;
}

export function StaggerItem({ 
  children, 
  className = '',
  variant = 'fadeUp'
}: StaggerItemProps) {
  return (
    <motion.div
      variants={variants[variant]}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
