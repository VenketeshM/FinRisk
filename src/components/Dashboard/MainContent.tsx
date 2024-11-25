import React from 'react';
import { motion } from 'framer-motion';

const MainContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6"
    >
      <div className="grid grid-cols-12 gap-6">
        {/* Portfolio Overview Card */}
        <div className="col-span-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Portfolio Overview
          </h2>
          <div className="h-[400px] bg-gray-100 dark:bg-gray-700 rounded-lg">
            {/* TradingView Chart will go here */}
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              TradingView Chart Loading...
            </div>
          </div>
        </div>

        {/* Asset Allocation Card */}
        <div className="col-span-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Asset Allocation
          </h2>
          <div className="h-[400px] bg-gray-100 dark:bg-gray-700 rounded-lg">
            {/* Pie Chart will go here */}
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              Pie Chart Loading...
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="col-span-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Transactions
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 dark:text-gray-400">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 dark:text-gray-400">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 dark:text-gray-400">Asset</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 dark:text-gray-400">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 dark:text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample transaction row */}
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">2023-12-01</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Buy</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">AAPL</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">$1,234.56</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MainContent;
