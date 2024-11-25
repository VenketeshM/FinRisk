import React from 'react';
import { motion } from 'framer-motion';

const BackgroundDoodles: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      {/* Stock Chart Doodle */}
      <motion.svg
        className="absolute top-[20%] right-[10%] w-48 h-48 text-blue-500/30 dark:text-blue-400/30"
        viewBox="0 0 100 100"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <path
          d="M10 70 L30 50 L50 60 L70 30 L90 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
      </motion.svg>

      {/* Math Formula Doodle */}
      <motion.div
        className="absolute top-[30%] left-[5%] text-4xl font-serif text-green-500/30 dark:text-green-400/30"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        ∑(x₍ᵢ₎)²
      </motion.div>

      {/* Pie Chart Doodle */}
      <motion.svg
        className="absolute bottom-[30%] right-[15%] w-40 h-40 text-purple-500/30 dark:text-purple-400/30"
        viewBox="0 0 100 100"
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M50 50 L90 50 A40 40 0 0 1 50 90 Z"
          fill="currentColor"
        />
      </motion.svg>

      {/* Bar Chart Doodle */}
      <motion.svg
        className="absolute top-[60%] left-[20%] w-32 h-32 text-red-500/30 dark:text-red-400/30"
        viewBox="0 0 100 100"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <rect x="10" y="40" width="15" height="60" fill="currentColor" />
        <rect x="35" y="20" width="15" height="80" fill="currentColor" />
        <rect x="60" y="50" width="15" height="50" fill="currentColor" />
        <rect x="85" y="30" width="15" height="70" fill="currentColor" />
      </motion.svg>

      {/* Statistics Formula */}
      <motion.div
        className="absolute top-[15%] right-[30%] text-3xl font-serif text-indigo-500/30 dark:text-indigo-400/30"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        σ = √(Σ(x-μ)²/N)
      </motion.div>

      {/* Dollar Signs */}
      <motion.div
        className="absolute bottom-[20%] left-[10%] text-5xl font-bold text-emerald-500/30 dark:text-emerald-400/30"
        initial={{ opacity: 0, scale: 1.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        $
      </motion.div>
    </div>
  );
};

export default BackgroundDoodles;
