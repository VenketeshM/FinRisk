import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';

interface OptionChain {
  strike: number;
  calls: {
    lastPrice: number;
    change: number;
    volume: number;
    openInterest: number;
    iv: number;
  };
  puts: {
    lastPrice: number;
    change: number;
    volume: number;
    openInterest: number;
    iv: number;
  };
}

const mockOptionChain: OptionChain[] = [
  {
    strike: 150,
    calls: { lastPrice: 5.25, change: 0.35, volume: 1250, openInterest: 5000, iv: 0.32 },
    puts: { lastPrice: 0.75, change: -0.15, volume: 850, openInterest: 3500, iv: 0.28 }
  },
  {
    strike: 155,
    calls: { lastPrice: 3.15, change: 0.25, volume: 980, openInterest: 4200, iv: 0.30 },
    puts: { lastPrice: 1.25, change: -0.10, volume: 720, openInterest: 2800, iv: 0.29 }
  },
  {
    strike: 160,
    calls: { lastPrice: 1.85, change: 0.15, volume: 750, openInterest: 3800, iv: 0.29 },
    puts: { lastPrice: 2.15, change: -0.20, volume: 680, openInterest: 2500, iv: 0.31 }
  },
  {
    strike: 165,
    calls: { lastPrice: 0.95, change: -0.10, volume: 520, openInterest: 2900, iv: 0.28 },
    puts: { lastPrice: 3.45, change: 0.25, volume: 890, openInterest: 3200, iv: 0.32 }
  },
  {
    strike: 170,
    calls: { lastPrice: 0.45, change: -0.15, volume: 380, openInterest: 2100, iv: 0.27 },
    puts: { lastPrice: 4.85, change: 0.35, volume: 1100, openInterest: 4100, iv: 0.33 }
  }
];

const expiryDates = ['2024-03-15', '2024-03-22', '2024-03-29', '2024-04-05', '2024-04-12'];

const OptionsAnalysis: React.FC = () => {
  const [selectedExpiry, setSelectedExpiry] = useState(expiryDates[0]);
  const [showGreeks, setShowGreeks] = useState(false);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm 
                   border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Expiry Date
            </label>
            <select
              value={selectedExpiry}
              onChange={(e) => setSelectedExpiry(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 
                     dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 
                     focus:ring-blue-500"
            >
              {expiryDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowGreeks(!showGreeks)}
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 
                     dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {showGreeks ? 'Hide Greeks' : 'Show Greeks'}
            </button>
          </div>
        </div>
      </div>

      {/* Option Chain */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm 
                 border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Option Chain
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                  <th colSpan={5} className="pb-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                    Calls
                  </th>
                  <th className="pb-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                    Strike
                  </th>
                  <th colSpan={5} className="pb-3 text-center text-sm font-medium text-red-600 dark:text-red-400">
                    Puts
                  </th>
                </tr>
                <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Last</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Change</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Volume</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">OI</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">IV</th>
                  <th className="pb-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Price</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Last</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Change</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Volume</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">OI</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">IV</th>
                </tr>
              </thead>
              <tbody>
                {mockOptionChain.map((option) => (
                  <tr key={option.strike} className="border-b border-gray-100 dark:border-gray-700/50 
                                                 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-300">
                      {option.calls.lastPrice.toFixed(2)}
                    </td>
                    <td className={`py-3 text-sm ${
                      option.calls.change >= 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {option.calls.change >= 0 ? '+' : ''}{option.calls.change.toFixed(2)}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-300">
                      {option.calls.volume.toLocaleString()}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-300">
                      {option.calls.openInterest.toLocaleString()}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-300">
                      {(option.calls.iv * 100).toFixed(1)}%
                    </td>
                    <td className="py-3 text-sm text-center font-medium text-gray-900 dark:text-gray-100">
                      {option.strike.toFixed(2)}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-300">
                      {option.puts.lastPrice.toFixed(2)}
                    </td>
                    <td className={`py-3 text-sm ${
                      option.puts.change >= 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {option.puts.change >= 0 ? '+' : ''}{option.puts.change.toFixed(2)}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-300">
                      {option.puts.volume.toLocaleString()}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-300">
                      {option.puts.openInterest.toLocaleString()}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-300">
                      {(option.puts.iv * 100).toFixed(1)}%
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
        {/* IV Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm 
                   border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Implied Volatility
          </h2>
          <div className="h-[200px] flex items-center justify-center text-gray-500 dark:text-gray-400">
            <ChartBarIcon className="h-12 w-12 mr-2" />
            <span>IV Smile Chart Coming Soon</span>
          </div>
        </motion.div>

        {/* Volume Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm 
                   border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Volume Analysis
          </h2>
          <div className="h-[200px] flex items-center justify-center text-gray-500 dark:text-gray-400">
            <ChartBarIcon className="h-12 w-12 mr-2" />
            <span>Volume Distribution Chart Coming Soon</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OptionsAnalysis;
