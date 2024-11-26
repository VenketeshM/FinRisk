import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  CubeTransparentIcon,
  UserCircleIcon,
  CogIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

interface MobileNavProps {
  currentPath: string;
}

const MobileNav: React.FC<MobileNavProps> = ({ currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', icon: ChartBarIcon, label: 'Dashboard' },
    { path: '/trading', icon: CubeTransparentIcon, label: 'Trading' },
    { path: '/profile', icon: UserCircleIcon, label: 'Profile' },
    { path: '/settings', icon: CogIcon, label: 'Settings' },
  ];

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-gray-800/50 backdrop-blur-lg border border-gray-700 lg:hidden"
      >
        <Bars3Icon className="h-6 w-6 text-white" />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 right-0 bottom-0 w-64 bg-gray-900 border-l border-gray-800 z-50 lg:hidden"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-white">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-800"
                >
                  <XMarkIcon className="h-6 w-6 text-white" />
                </button>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        currentPath === item.path
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="absolute bottom-8 left-0 right-0 px-4">
                <button
                  onClick={() => {
                    // Handle logout
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
