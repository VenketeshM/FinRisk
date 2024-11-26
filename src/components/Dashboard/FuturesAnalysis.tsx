import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

interface FuturesContract {
  contract: string;
  lastPrice: number;
  change: number;
  volume: number;
  openInterest: number;
  high: number;
  low: number;
}

const mockFuturesData: FuturesContract[] = [
  {
    contract: 'ES-MAR24',
    lastPrice: 4785.25,
    change: 12.75,
    volume: 125000,
    openInterest: 450000,
    high: 4790.50,
    low: 4770.25
  },
  {
    contract: 'ES-JUN24',
    lastPrice: 4805.50,
    change: 13.25,
    volume: 85000,
    openInterest: 380000,
    high: 4810.75,
    low: 4790.50
  },
  {
    contract: 'ES-SEP24',
    lastPrice: 4825.75,
    change: 14.50,
    volume: 45000,
    openInterest: 220000,
    high: 4830.25,
    low: 4810.75
  },
  {
    contract: 'ES-DEC24',
    lastPrice: 4845.25,
    change: -8.75,
    volume: 25000,
    openInterest: 150000,
    high: 4855.50,
    low: 4835.25
  },
  {
    contract: 'ES-MAR25',
    lastPrice: 4865.50,
    change: -10.25,
    volume: 15000,
    openInterest: 85000,
    high: 4875.75,
    low: 4855.50
  }
];

const FuturesAnalysis: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y'];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm 
                   border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Timeframe
            </label>
            <div className="flex space-x-2">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-3 py-1.5 text-sm rounded-lg ${
                    selectedTimeframe === timeframe
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Futures Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm 
                 border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Futures Contracts
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Contract</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Last</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Change</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">High</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Low</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Volume</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">OI</th>
                </tr>
              </thead>
              <tbody>
                {mockFuturesData.map((contract) => (
                  <tr key={contract.contract} className="border-b border-gray-100 dark:border-gray-700/50 
                                                    hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                      {contract.contract}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-300">
                      {contract.lastPrice.toFixed(2)}
                    </td>
                    <td className={`py-3 text-sm ${
                      contract.change >= 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {contract.change >= 0 ? '+' : ''}{contract.change.toFixed(2)}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-300">
                      {contract.high.toFixed(2)}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-300">
                      {contract.low.toFixed(2)}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-300">
                      {contract.volume.toLocaleString()}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-300">
                      {contract.openInterest.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Term Structure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm 
                   border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Term Structure
          </h2>
          <div className="h-[200px] flex items-center justify-center text-gray-500 dark:text-gray-400">
            <ChartBarIcon className="h-12 w-12 mr-2" />
            <span>Term Structure Chart Coming Soon</span>
          </div>
        </motion.div>

        {/* Volume Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm 
                   border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Volume Profile
          </h2>
          <div className="h-[200px] flex items-center justify-center text-gray-500 dark:text-gray-400">
            <ChartBarIcon className="h-12 w-12 mr-2" />
            <span>Volume Profile Chart Coming Soon</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FuturesAnalysis;
