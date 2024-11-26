import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bars3Icon as MenuIcon, XMarkIcon as XIcon } from '@heroicons/react/24/outline';
import LeftSidebar from '../components/dashboard/LeftSidebar';
import RightSidebar from '../components/dashboard/RightSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardFooter from '../components/dashboard/DashboardFooter';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        {/* Mobile menu button */}
        <div className="lg:hidden fixed bottom-4 left-4 z-50">
          <button
            onClick={() => setShowLeftSidebar(!showLeftSidebar)}
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            {showLeftSidebar ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Left Sidebar */}
        <motion.div
          initial={false}
          animate={{
            width: showLeftSidebar ? 'auto' : '0',
            opacity: showLeftSidebar ? 1 : 0,
          }}
          className={`fixed lg:relative lg:block z-40 h-full ${
            showLeftSidebar ? 'w-64' : 'w-0'
          } transition-all duration-300 ease-in-out`}
        >
          <LeftSidebar />
        </motion.div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </main>

        {/* Right Sidebar */}
        <motion.div
          initial={false}
          animate={{
            width: showRightSidebar ? 'auto' : '0',
            opacity: showRightSidebar ? 1 : 0,
          }}
          className={`fixed right-0 lg:relative lg:block z-40 h-full ${
            showRightSidebar ? 'w-80' : 'w-0'
          } transition-all duration-300 ease-in-out`}
        >
          <RightSidebar />
        </motion.div>

        {/* Mobile right sidebar toggle */}
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setShowRightSidebar(!showRightSidebar)}
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            {showRightSidebar ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;
