import React from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  NewspaperIcon,
  PresentationChartLineIcon,
  RocketLaunchIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const menuItems = [
  { icon: ChartBarIcon, label: 'Portfolio', active: true },
  { icon: ClipboardDocumentListIcon, label: 'Watchlist' },
  { icon: PresentationChartLineIcon, label: 'Risk Analysis' },
  { icon: CurrencyDollarIcon, label: 'Trading' },
  { icon: SparklesIcon, label: 'AI Insights' },
  { icon: NewspaperIcon, label: 'News' },
  { icon: RocketLaunchIcon, label: 'Learn' },
];

const LeftSidebar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4"
    >
      {menuItems.map((item, index) => (
        <motion.button
          key={item.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
            item.active
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
          }`}
        >
          <item.icon className="h-5 w-5" />
          <span className="font-medium">{item.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default LeftSidebar;
