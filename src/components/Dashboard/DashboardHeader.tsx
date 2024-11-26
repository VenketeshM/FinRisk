import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  MagnifyingGlassIcon,
  BellIcon,
  SunIcon,
  MoonIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/20/solid';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardHeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ isDarkMode, onThemeToggle }) => {
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: 1, message: 'Portfolio value increased by 5%', time: '2m ago' },
    { id: 2, message: 'New market analysis available', time: '1h ago' },
    { id: 3, message: 'Risk alert: Market volatility high', time: '3h ago' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left section - Logo and Search */}
          <div className="flex items-center flex-1">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">FinRisk</h1>
            </div>
            <div className="ml-8 flex-1 max-w-lg">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search assets, markets, or tools..."
                />
              </div>
            </div>
          </div>

          {/* Right section - User controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isDarkMode ? (
                <SunIcon className="h-6 w-6 text-gray-400" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-600" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <BellIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-2">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <p className="text-sm text-gray-700 dark:text-gray-300">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <UserCircleIcon className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user?.email}
                </span>
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1">
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Cog6ToothIcon className="h-5 w-5 mr-2" />
                        Settings
                      </button>
                      <button
                        onClick={signOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
