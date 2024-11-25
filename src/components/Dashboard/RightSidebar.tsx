import React from 'react';
import { motion } from 'framer-motion';
import { BellIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const RightSidebar = () => {
  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'AAPL Price Alert',
      message: 'Apple Inc. is up 5% today',
      time: '5m ago',
    },
    {
      id: 2,
      type: 'news',
      title: 'Market Update',
      message: 'Fed announces interest rate decision',
      time: '15m ago',
    },
  ];

  const watchlist = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 178.45, change: 2.34 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 334.23, change: -1.23 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 134.56, change: 0.45 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4"
    >
      {/* Notifications Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h2>
          <span className="text-sm text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
            View All
          </span>
        </div>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div className="flex items-start">
                <BellIcon className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Watchlist Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Watchlist</h2>
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
            <ChartBarIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-3">
          {watchlist.map((stock) => (
            <motion.div
              key={stock.symbol}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {stock.symbol}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {stock.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    ${stock.price}
                  </p>
                  <p
                    className={`text-xs font-medium ${
                      stock.change >= 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {stock.change >= 0 ? '+' : ''}
                    {stock.change}%
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RightSidebar;
