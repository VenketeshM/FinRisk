import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import LandingFooter from '../components/LandingFooter';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-16" // Add padding top to account for fixed navbar
      >
        {children}
      </motion.main>
      <LandingFooter />
    </div>
  );
};

export default MainLayout;
