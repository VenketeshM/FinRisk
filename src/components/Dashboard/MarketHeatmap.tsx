import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChartBarSquareIcon,
  Square3Stack3DIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  marketCap: number;
  volume: number;
}

interface SectorData {
  name: string;
  change: number;
  marketCap: number;
  volume: number;
  stocks: StockData[];
}

const MarketHeatmap: React.FC = () => {
  const [timeframe, setTimeframe] = useState('1D');
  const [view, setView] = useState('sectors');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for sectors and stocks
  const [sectors] = useState<SectorData[]>([
    {
      name: 'Technology',
      change: 2.45,
      marketCap: 1250000,
      volume: 5600000,
      stocks: [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 178.25, change: 2.8, marketCap: 450000, volume: 1200000 },
        { symbol: 'MSFT', name: 'Microsoft', price: 335.50, change: 1.9, marketCap: 420000, volume: 980000 },
        { symbol: 'GOOGL', name: 'Alphabet', price: 125.80, change: 3.2, marketCap: 380000, volume: 850000 }
      ]
    },
    {
      name: 'Finance',
      change: -1.20,
      marketCap: 980000,
      volume: 4200000,
      stocks: [
        { symbol: 'JPM', name: 'JPMorgan Chase', price: 145.80, change: -1.5, marketCap: 280000, volume: 720000 },
        { symbol: 'BAC', name: 'Bank of America', price: 32.45, change: -0.8, marketCap: 220000, volume: 650000 },
        { symbol: 'WFC', name: 'Wells Fargo', price: 42.90, change: -1.3, marketCap: 190000, volume: 580000 }
      ]
    },
    {
      name: 'Healthcare',
      change: 0.85,
      marketCap: 750000,
      volume: 3100000,
      stocks: [
        { symbol: 'JNJ', name: 'Johnson & Johnson', price: 165.20, change: 1.2, marketCap: 320000, volume: 680000 },
        { symbol: 'PFE', name: 'Pfizer', price: 38.75, change: 0.5, marketCap: 180000, volume: 520000 },
        { symbol: 'UNH', name: 'UnitedHealth', price: 485.90, change: 0.9, marketCap: 290000, volume: 420000 }
      ]
    },
    {
      name: 'Energy',
      change: -0.65,
      marketCap: 620000,
      volume: 2800000,
      stocks: [
        { symbol: 'XOM', name: 'Exxon Mobil', price: 98.45, change: -0.7, marketCap: 260000, volume: 580000 },
        { symbol: 'CVX', name: 'Chevron', price: 156.80, change: -0.4, marketCap: 220000, volume: 480000 },
        { symbol: 'COP', name: 'ConocoPhillips', price: 112.30, change: -0.8, marketCap: 180000, volume: 420000 }
      ]
    }
  ]);

  const getColorIntensity = (change: number) => {
    const absChange = Math.abs(change);
    const intensity = Math.min(absChange * 20, 100);
    return change > 0
      ? `rgba(34, 197, 94, ${intensity / 100})`
      : `rgba(239, 68, 68, ${intensity / 100})`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const filterData = (data: SectorData[]) => {
    if (!searchQuery) return data;
    
    return data.map(sector => ({
      ...sector,
      stocks: sector.stocks.filter(stock => 
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(sector => sector.stocks.length > 0);
  };

  const views = ['Treemap', 'Performance'];
  const timeframes = ['1D', '1W', '1M', '3M', 'YTD', '1Y'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4">
        {/* Header with Controls */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Market Heatmap
          </h2>
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stocks..."
                className="pl-9 pr-3 py-1.5 text-sm bg-gray-50 dark:bg-gray-700 
                         border border-gray-300 dark:border-gray-600 rounded-lg
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <MagnifyingGlassIcon className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
            </div>

            {/* View Selector */}
            <select 
              className="px-3 py-1.5 text-sm bg-gray-50 dark:bg-gray-700 
                      border border-gray-300 dark:border-gray-600 rounded-lg"
              value={view}
              onChange={(e) => setView(e.target.value)}
            >
              <option value="sectors">By Sector</option>
              <option value="marketcap">By Market Cap</option>
              <option value="volume">By Volume</option>
            </select>

            {/* Timeframe Pills */}
            <div className="flex bg-gray-100 dark:bg-gray-700/50 rounded-lg p-1">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors duration-200
                           ${timeframe === tf
                             ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow'
                             : 'text-gray-600 dark:text-gray-400 hover:bg-white/[0.12]'
                           }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-700/50 p-1 mb-4">
            {views.map((viewName) => (
              <Tab
                key={viewName}
                className={({ selected }) =>
                  `w-full py-2 text-sm font-medium leading-5 rounded-lg
                  ${selected
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/[0.12] hover:text-blue-600'
                  }
                  `
                }
              >
                <div className="flex items-center justify-center space-x-2">
                  {viewName === 'Treemap' ? (
                    <Square3Stack3DIcon className="h-4 w-4" />
                  ) : (
                    <ChartBarSquareIcon className="h-4 w-4" />
                  )}
                  <span>{viewName}</span>
                </div>
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            {/* Treemap View */}
            <Tab.Panel>
              <div className="space-y-4">
                {filterData(sectors).map((sector) => (
                  <div key={sector.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {sector.name}
                      </h3>
                      <div className={`flex items-center text-sm
                        ${sector.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {sector.change > 0 ? (
                          <ArrowUpIcon className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4 mr-1" />
                        )}
                        {Math.abs(sector.change)}%
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {sector.stocks.map((stock) => (
                        <div
                          key={stock.symbol}
                          style={{
                            backgroundColor: getColorIntensity(stock.change),
                          }}
                          className="p-3 rounded-lg transition-colors duration-200
                                   hover:opacity-90 cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {stock.symbol}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {stock.name}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {formatPrice(stock.price)}
                              </div>
                              <div className={`text-xs flex items-center justify-end
                                ${stock.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {stock.change > 0 ? (
                                  <ArrowUpIcon className="h-3 w-3 mr-0.5" />
                                ) : (
                                  <ArrowDownIcon className="h-3 w-3 mr-0.5" />
                                )}
                                {Math.abs(stock.change)}%
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Tab.Panel>

            {/* Performance View */}
            <Tab.Panel>
              <div className="space-y-6">
                {filterData(sectors).map((sector) => (
                  <div key={sector.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {sector.name}
                      </h3>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Market Cap: {formatNumber(sector.marketCap)}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {sector.stocks.map((stock) => (
                        <div
                          key={stock.symbol}
                          className="flex items-center justify-between p-3 
                                   bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                        >
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {stock.symbol} - {stock.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Vol: {formatNumber(stock.volume)}
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {formatPrice(stock.price)}
                              </div>
                              <div className={`text-sm flex items-center justify-end
                                ${stock.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {stock.change > 0 ? (
                                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                                ) : (
                                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                                )}
                                {Math.abs(stock.change)}%
                              </div>
                            </div>
                            <div
                              className="w-24 h-8 rounded"
                              style={{
                                backgroundColor: getColorIntensity(stock.change),
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default MarketHeatmap;
