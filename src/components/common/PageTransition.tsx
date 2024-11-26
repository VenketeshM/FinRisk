import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  mode?: 'fade' | 'slide' | 'reveal' | 'scale' | 'elegant';
  direction?: 'up' | 'down' | 'left' | 'right';
}

const easings = {
  smooth: [0.4, 0.0, 0.2, 1], // Smooth, professional easing
  gentle: [0.4, 0.14, 0.3, 1], // Gentle, refined movement
  elegant: [0.65, 0, 0.35, 1], // Elegant, sophisticated motion
};

const transitions = {
  smooth: {
    duration: 0.5,
    ease: easings.smooth,
  },
  gentle: {
    duration: 0.7,
    ease: easings.gentle,
  },
  elegant: {
    duration: 0.6,
    ease: easings.elegant,
  },
};

const variants = {
  fade: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: easings.smooth,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: easings.smooth,
      },
    },
  },
  slide: {
    initial: (direction: string) => ({
      opacity: 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
    }),
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        ...transitions.smooth,
        opacity: { duration: 0.4 },
      },
    },
    exit: (direction: string) => ({
      opacity: 0,
      x: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
      y: direction === 'up' ? -30 : direction === 'down' ? 30 : 0,
      transition: {
        ...transitions.smooth,
        opacity: { duration: 0.3 },
      },
    }),
  },
  reveal: {
    initial: (direction: string) => ({
      opacity: 0,
      clipPath: direction === 'left' || direction === 'right'
        ? 'inset(0 100% 0 0)'
        : 'inset(100% 0 0 0)',
    }),
    animate: {
      opacity: 1,
      clipPath: 'inset(0 0 0 0)',
      transition: {
        ...transitions.elegant,
        clipPath: { duration: 0.7, ease: easings.gentle },
      },
    },
    exit: (direction: string) => ({
      opacity: 0,
      clipPath: direction === 'left' || direction === 'right'
        ? 'inset(0 0 0 100%)'
        : 'inset(0 0 100% 0)',
      transition: {
        ...transitions.elegant,
        clipPath: { duration: 0.5, ease: easings.gentle },
      },
    }),
  },
  scale: {
    initial: {
      opacity: 0,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        ...transitions.gentle,
        opacity: { duration: 0.4 },
      },
    },
    exit: {
      opacity: 0,
      scale: 1.02,
      transition: {
        ...transitions.gentle,
        opacity: { duration: 0.3 },
      },
    },
  },
  elegant: {
    initial: (direction: string) => ({
      opacity: 0,
      scale: 0.99,
      x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
    }),
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        ...transitions.elegant,
        opacity: { duration: 0.5, ease: easings.smooth },
        scale: { duration: 0.6, ease: easings.gentle },
      },
    },
    exit: (direction: string) => ({
      opacity: 0,
      scale: 0.99,
      x: direction === 'left' ? -20 : direction === 'right' ? 20 : 0,
      y: direction === 'up' ? -20 : direction === 'down' ? 20 : 0,
      transition: {
        ...transitions.elegant,
        opacity: { duration: 0.4, ease: easings.smooth },
      },
    }),
  },
};

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  mode = 'elegant',
  direction = 'right',
}) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants[mode]}
      custom={direction}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
