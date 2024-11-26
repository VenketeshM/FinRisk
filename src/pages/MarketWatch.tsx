import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  MinusIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  StarIcon as StarOutline
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

// Mock data - will be replaced with API data
const mockMarketData = {
  stocks: [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 175.50,
      change: 2.35,
      changePercent: 1.36,
      volume: '45.2M',
      pinned: true
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: 310.20,
      change: -1.25,
      changePercent: -0.40,
      volume: '22.1M',
      pinned: false
    }
  ],
  crypto: [
    {
      symbol: 'BTC/USD',
      name: 'Bitcoin',
      price: 40000.00,
      change: 1200.00,
      changePercent: 3.09,
      volume: '28.5B',
      pinned: true
    }
  ],
  forex: [
    {
      symbol: 'EUR/USD',
      name: 'Euro/US Dollar',
      price: 1.0925,
      change: -0.0015,
      changePercent: -0.14,
      volume: '98.2B',
      pinned: false
    }
  ],
  commodities: [
    {
      symbol: 'GC=F',
      name: 'Gold Futures',
      price: 1950.30,
      change: 12.50,
      changePercent: 0.65,
      volume: '145.2K',
      pinned: true
    }
  ]
};

const assetCategories = [
  { id: 'stocks', name: 'Stocks' },
  { id: 'crypto', name: 'Crypto' },
  { id: 'forex', name: 'Forex' },
  { id: 'commodities', name: 'Commodities' },
  { id: 'etfs', name: 'ETFs' },
  { id: 'bonds', name: 'Bonds' },
  { id: 'futures', name: 'Futures' },
  { id: 'options', name: 'Options' }
];

const MarketWatch: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('stocks');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddAsset, setShowAddAsset] = useState(false);

  const renderAssetRow = (asset: any) => (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b border-gray-100 dark:border-gray-700/50 
                 hover:bg-gray-50 dark:hover:bg-gray-700/50 
                 transition-colors duration-200"
    >
      <td className="py-4 pl-6">
        <button
          className="text-gray-400 hover:text-blue-500 dark:text-gray-500 
                     dark:hover:text-blue-400 transition-colors duration-200"
        >
          {asset.pinned ? (
            <StarSolid className="h-5 w-5" />
          ) : (
            <StarOutline className="h-5 w-5" />
          )}
        </button>
      </td>
      <td className="py-4">
        <div>
          <div className="font-medium text-gray-900 dark:text-gray-100">{asset.symbol}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{asset.name}</div>
        </div>
      </td>
      <td className="py-4 text-right">
        <div className="font-medium text-gray-900 dark:text-gray-100">
          ${typeof asset.price === 'number' ? asset.price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }) : asset.price}
        </div>
      </td>
      <td className={`py-4 text-right ${
        asset.change >= 0 
          ? 'text-green-600 dark:text-green-400' 
          : 'text-red-600 dark:text-red-400'
      }`}>
        <div className="flex items-center justify-end space-x-1">
          {asset.change >= 0 ? (
            <ArrowTrendingUpIcon className="h-4 w-4" />
          ) : (
            <ArrowTrendingDownIcon className="h-4 w-4" />
          )}
          <span>
            {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)} ({asset.changePercent.toFixed(2)}%)
          </span>
        </div>
      </td>
      <td className="py-4 text-right text-gray-600 dark:text-gray-300">{asset.volume}</td>
      <td className="py-4 pr-6">
        <div className="flex justify-end space-x-2">
          <button className="p-1.5 rounded-lg bg-green-50 dark:bg-green-900/30 
                         text-green-600 dark:text-green-400 hover:bg-green-100 
                         dark:hover:bg-green-900/50 transition-colors duration-200">
            <PlusIcon className="h-4 w-4" />
          </button>
          <button className="p-1.5 rounded-lg bg-red-50 dark:bg-red-900/30 
                         text-red-600 dark:text-red-400 hover:bg-red-100 
                         dark:hover:bg-red-900/50 transition-colors duration-200">
            <MinusIcon className="h-4 w-4" />
          </button>
        </div>
      </td>
    </motion.tr>
  );

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm 
                    border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-lg">
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-200 
                       dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50
                       text-gray-900 dark:text-gray-100 placeholder-gray-500
                       dark:placeholder-gray-400 focus:outline-none focus:ring-2
                       focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
          <button
            onClick={() => setShowAddAsset(true)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600
                     dark:hover:bg-blue-700 text-white rounded-lg transition-colors
                     duration-200 flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add to Watch</span>
          </button>
        </div>
      </div>

      {/* Asset Categories */}
      <div className="flex flex-wrap gap-2">
        {assetCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              activeCategory === category.id
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Market Watch Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm 
                    border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 pl-6 w-10"></th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Symbol</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400 text-right">Price</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400 text-right">Change</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400 text-right">Volume</th>
                <th className="pb-3 pr-6 w-24"></th>
              </tr>
            </thead>
            <tbody>
              {mockMarketData[activeCategory as keyof typeof mockMarketData]?.map(renderAssetRow)}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Asset Modal */}
      {showAddAsset && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Add Asset to Watch
            </h3>
            {/* Add asset form will go here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketWatch;
