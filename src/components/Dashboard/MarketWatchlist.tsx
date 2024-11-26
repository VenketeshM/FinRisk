import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon, StarIcon } from '@heroicons/react/24/solid';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  volume: number;
  favorite: boolean;
  priceHistory: number[];
}

const MarketWatchlist: React.FC = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 178.45,
      change: 3.24,
      changePercent: 1.85,
      marketCap: 2850000000000,
      volume: 58900000,
      favorite: true,
      priceHistory: []
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: 334.78,
      change: -2.34,
      changePercent: -0.69,
      marketCap: 2500000000000,
      volume: 42300000,
      favorite: true,
      priceHistory: []
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 134.67,
      change: 1.45,
      changePercent: 1.09,
      marketCap: 1680000000000,
      volume: 31200000,
      favorite: false,
      priceHistory: []
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      price: 145.23,
      change: -0.89,
      changePercent: -0.61,
      marketCap: 1490000000000,
      volume: 45600000,
      favorite: true,
      priceHistory: []
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      price: 456.78,
      change: 12.34,
      changePercent: 2.78,
      marketCap: 1120000000000,
      volume: 38900000,
      favorite: false,
      priceHistory: []
    }
  ]);

  // Generate price history for mini charts
  useEffect(() => {
    const generatePriceHistory = () => {
      setWatchlist(prevList =>
        prevList.map(item => ({
          ...item,
          priceHistory: Array.from({ length: 20 }, (_, i) => {
            const basePrice = item.price - (item.change * 10);
            return basePrice + (Math.random() - 0.45) * (item.price * 0.02);
          })
        }))
      );
    };

    generatePriceHistory();
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWatchlist(prevList =>
        prevList.map(item => {
          const priceChange = (Math.random() - 0.48) * 2;
          const newPrice = item.price + priceChange;
          const newHistory = [...item.priceHistory.slice(1), newPrice];
          
          return {
            ...item,
            price: newPrice,
            change: priceChange,
            changePercent: (priceChange / item.price) * 100,
            priceHistory: newHistory
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleFavorite = (symbol: string) => {
    setWatchlist(prevList =>
      prevList.map(item =>
        item.symbol === symbol ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    return num.toString();
  };

  const getMiniChartData = (priceHistory: number[]) => ({
    labels: Array.from({ length: priceHistory.length }, (_, i) => ''),
    datasets: [
      {
        data: priceHistory,
        borderColor: '#3B82F6',
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  });

  const miniChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Market Watchlist
        </h3>
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
          Add Symbol
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Change
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Market Cap
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Volume
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Trend
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {watchlist.map((item, index) => (
              <motion.tr
                key={item.symbol}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.symbol}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {item.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    ${item.price.toFixed(2)}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div
                    className={`flex items-center text-sm ${
                      item.change >= 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {item.change >= 0 ? (
                      <ArrowUpIcon className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 mr-1" />
                    )}
                    <span>
                      {item.changePercent >= 0 ? '+' : ''}
                      {item.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    ${formatLargeNumber(item.marketCap)}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {formatLargeNumber(item.volume)}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="w-24 h-12">
                    <Line
                      data={getMiniChartData(item.priceHistory)}
                      options={miniChartOptions}
                    />
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => toggleFavorite(item.symbol)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <StarIcon
                      className={`h-5 w-5 ${
                        item.favorite
                          ? 'text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketWatchlist;
