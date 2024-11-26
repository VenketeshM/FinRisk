import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.645, 0.045, 0.355, 1.000],
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.645, 0.045, 0.355, 1.000]
    }
  }
};

const childVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.645, 0.045, 0.355, 1.000]
    }
  },
  exit: {
    opacity: 0,
    y: -20
  }
};

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      className="w-full h-full"
    >
      <motion.div variants={childVariants}>
        {children}
      </motion.div>
    </motion.div>
  );
}
