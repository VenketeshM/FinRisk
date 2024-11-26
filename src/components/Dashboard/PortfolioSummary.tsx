import React from 'react';
import { ArrowTrendingUpIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';

const PortfolioSummary: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Portfolio Value</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">Today</span>
        </div>

        <div className="space-y-4">
          {/* Total Value */}
          <div>
            <div className="flex items-center space-x-2">
              <CurrencyRupeeIcon className="h-5 w-5 text-gray-400" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                ₹24,56,789.00
              </span>
            </div>
            <div className="mt-1 flex items-center space-x-2">
              <div className="flex items-center text-green-600 dark:text-green-400">
                <ArrowTrendingUpIcon className="h-4 w-4" />
                <span className="ml-1 text-sm">+2.45%</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                +₹58,765.00 today
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Invested</div>
              <div className="mt-1 text-base font-medium text-gray-900 dark:text-gray-100">
                ₹22,45,678.00
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Returns</div>
              <div className="mt-1 text-base font-medium text-green-600 dark:text-green-400">
                +₹2,11,111.00
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
