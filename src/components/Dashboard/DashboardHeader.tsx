import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BellIcon, 
  CogIcon, 
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  UserCircleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

interface DashboardHeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ isDarkMode, setIsDarkMode }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const portfolioValue = 125678.45;
  const portfolioChange = 1234.56;
  const portfolioChangePercent = 0.98;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 shadow-sm p-4 border-b border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-full mx-auto flex items-center justify-between px-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-xs">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search assets, markets..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border-0 focus:ring-2 focus:ring-blue-500 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="flex items-center space-x-8 mx-8">
          <div>
            <h2 className="text-sm text-gray-500 dark:text-gray-400">Portfolio Value</h2>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${portfolioValue.toLocaleString()}
            </p>
          </div>
          <div>
            <h2 className="text-sm text-gray-500 dark:text-gray-400">Today's Change</h2>
            <p className={`text-lg font-semibold ${portfolioChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {portfolioChange >= 0 ? '+' : ''}${Math.abs(portfolioChange).toLocaleString()} 
              ({portfolioChangePercent >= 0 ? '+' : ''}{portfolioChangePercent}%)
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? (
              <SunIcon className="h-6 w-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
            )}
          </button>
          
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
            <BellIcon className="h-6 w-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <CogIcon className="h-6 w-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
          </button>

          <div className="relative">
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <UserCircleIcon className="h-6 w-6 text-gray-400" />
              <ChevronDownIcon className="h-4 w-4 text-gray-400" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</a>
                <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</a>
                <a href="#logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">Sign out</a>
              </div>
            )}
          </div>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Funds
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;
