import React from 'react';
import { motion } from 'framer-motion';

const DashboardFooter: React.FC = () => {
  const marketIndices = [
    { name: 'S&P 500', value: '4,185.81', change: '+0.98%' },
    { name: 'NASDAQ', value: '12,888.95', change: '+1.30%' },
    { name: 'DOW', value: '33,875.40', change: '+0.80%' },
    { name: 'FTSE 100', value: '7,256.94', change: '-0.29%' },
    { name: 'DAX', value: '15,397.62', change: '+0.50%' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      {/* Market Indices Ticker */}
      <div className="overflow-hidden py-2 bg-gray-50 dark:bg-gray-900">
        <div className="flex space-x-8 animate-marquee">
          {marketIndices.map((index) => (
            <div key={index.name} className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {index.name}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {index.value}
              </span>
              <span
                className={`text-sm ${
                  index.change.startsWith('+')
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {index.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Quick Links */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a
              href="/dashboard/portfolio"
              className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              Portfolio
            </a>
            <a
              href="/dashboard/watchlist"
              className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              Watchlist
            </a>
            <a
              href="/dashboard/settings"
              className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              Settings
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} FinRisk. All rights reserved.
          </div>

          {/* Legal Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="/privacy"
              className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              Terms
            </a>
            <a
              href="/legal-disclaimer"
              className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              Legal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
