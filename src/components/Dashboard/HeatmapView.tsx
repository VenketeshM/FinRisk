import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

interface MarketData {
  name: string;
  sector: string;
  change: number;
  marketCap: number;
  volume: number;
}

const mockMarketData: MarketData[] = [
  { name: 'Technology', sector: 'Tech', change: 2.5, marketCap: 2500000000000, volume: 15000000 },
  { name: 'Healthcare', sector: 'Health', change: -1.2, marketCap: 1800000000000, volume: 12000000 },
  { name: 'Financials', sector: 'Finance', change: 0.8, marketCap: 2200000000000, volume: 18000000 },
  { name: 'Consumer', sector: 'Consumer', change: 1.5, marketCap: 1600000000000, volume: 14000000 },
  { name: 'Energy', sector: 'Energy', change: -2.1, marketCap: 1200000000000, volume: 16000000 },
  { name: 'Materials', sector: 'Materials', change: 0.5, marketCap: 900000000000, volume: 11000000 },
  { name: 'Industrials', sector: 'Industrial', change: 1.8, marketCap: 1400000000000, volume: 13000000 },
  { name: 'Utilities', sector: 'Utilities', change: -0.6, marketCap: 800000000000, volume: 9000000 },
  { name: 'Real Estate', sector: 'Real Estate', change: -1.5, marketCap: 700000000000, volume: 8000000 },
];

const regions = ['Global', 'Americas', 'Europe', 'Asia', 'Emerging Markets'];
const timeframes = ['1D', '1W', '1M', '3M', 'YTD', '1Y'];

const HeatmapView: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('Global');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

  const getColorIntensity = (change: number) => {
    const absChange = Math.abs(change);
    const intensity = Math.min(absChange * 20, 100);
    return change >= 0
      ? `rgba(34, 197, 94, ${intensity / 100})`  // green
      : `rgba(239, 68, 68, ${intensity / 100})`; // red
  };

  const formatMarketCap = (value: number) => {
    if (value >= 1000000000000) {
      return `$${(value / 1000000000000).toFixed(1)}T`;
    }
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    }
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm 
                   border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          {/* Region Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Region
            </label>
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3 py-1.5 text-sm rounded-lg border ${
                    selectedRegion === region
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Timeframe Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Timeframe
            </label>
            <div className="flex flex-wrap gap-2">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-3 py-1.5 text-sm rounded-lg border ${
                    selectedTimeframe === timeframe
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm 
                 border border-gray-200 dark:border-gray-700 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Market Heatmap - {selectedRegion}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockMarketData.map((item) => (
            <div
              key={item.name}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700"
              style={{
                backgroundColor: getColorIntensity(item.change),
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  {item.name}
                </h3>
                <div
                  className={`flex items-center ${
                    item.change >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {item.change >= 0 ? (
                    <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(item.change)}%
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Market Cap: {formatMarketCap(item.marketCap)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Volume: {(item.volume / 1000000).toFixed(1)}M
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Performance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm 
                 border border-gray-200 dark:border-gray-700 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Performance Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
            <div className="text-sm text-green-600 dark:text-green-400 mb-1">Top Gainer</div>
            <div className="font-medium text-gray-900 dark:text-gray-100">Technology</div>
            <div className="flex items-center text-green-600 dark:text-green-400">
              <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              2.5%
            </div>
          </div>

          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
            <div className="text-sm text-red-600 dark:text-red-400 mb-1">Top Loser</div>
            <div className="font-medium text-gray-900 dark:text-gray-100">Energy</div>
            <div className="flex items-center text-red-600 dark:text-red-400">
              <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
              2.1%
            </div>
          </div>

          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
            <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">Most Active</div>
            <div className="font-medium text-gray-900 dark:text-gray-100">Financials</div>
            <div className="text-blue-600 dark:text-blue-400">18M Volume</div>
          </div>

          <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800">
            <div className="text-sm text-purple-600 dark:text-purple-400 mb-1">Market Cap</div>
            <div className="font-medium text-gray-900 dark:text-gray-100">Technology</div>
            <div className="text-purple-600 dark:text-purple-400">$2.5T</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeatmapView;
