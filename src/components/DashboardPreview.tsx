import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';

interface QuickStat {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
}

const DashboardPreview: React.FC = () => {
  const quickStats: QuickStat[] = [
    {
      label: 'Portfolio Value',
      value: '$124,532.89',
      change: 2.4,
      trend: 'up'
    },
    {
      label: 'Today\'s P&L',
      value: '$1,245.20',
      change: 1.8,
      trend: 'up'
    },
    {
      label: 'Risk Score',
      value: '72/100',
      change: -5,
      trend: 'down'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Quick Dashboard Overview
        </h2>
        <Link
          to="/dashboard"
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Full Dashboard
          <svg
            className="ml-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
              <span
                className={`inline-flex items-center px-2 py-1 rounded text-sm ${
                  stat.trend === 'up'
                    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                    : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                }`}
              >
                {stat.trend === 'up' ? (
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                )}
                {Math.abs(stat.change)}%
              </span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Recent Alerts
          </h3>
          <ul className="space-y-3">
            <li className="text-sm text-gray-600 dark:text-gray-300">
              • AAPL exceeded target price of $180
            </li>
            <li className="text-sm text-gray-600 dark:text-gray-300">
              • Portfolio risk level increased to moderate
            </li>
            <li className="text-sm text-gray-600 dark:text-gray-300">
              • New AI insight: Potential market correction
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm"
            >
              Place Trade
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors text-sm"
            >
              View Portfolio
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors text-sm"
            >
              Risk Analysis
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg transition-colors text-sm"
            >
              AI Insights
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPreview;
