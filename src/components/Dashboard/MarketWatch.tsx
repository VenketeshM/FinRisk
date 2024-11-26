import React, { useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
}

const MarketWatch: React.FC = () => {
  const [stocks] = useState<StockData[]>([
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries',
      price: 2456.75,
      change: 1.25,
      volume: '2.5M'
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      price: 3567.80,
      change: -0.75,
      volume: '1.8M'
    },
    {
      symbol: 'HDFC',
      name: 'HDFC Bank',
      price: 1678.90,
      change: 2.15,
      volume: '3.2M'
    },
    {
      symbol: 'INFY',
      name: 'Infosys Limited',
      price: 1456.30,
      change: -1.45,
      volume: '2.1M'
    },
    {
      symbol: 'WIPRO',
      name: 'Wipro Limited',
      price: 567.45,
      change: 0.85,
      volume: '1.5M'
    }
  ]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Market Watch</h2>
          <button className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 dark:bg-blue-900/30 
                         dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50
                         transition-colors duration-200">
            Add Symbol
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                <th className="pb-2 text-left font-medium">Symbol</th>
                <th className="pb-2 text-left font-medium">Price</th>
                <th className="pb-2 text-right font-medium">Change</th>
                <th className="pb-2 text-right font-medium">Volume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {stocks.map((stock) => (
                <tr key={stock.symbol} className="group hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-3">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{stock.symbol}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{stock.name}</div>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      ₹{stock.price.toFixed(2)}
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <div className={`inline-flex items-center space-x-1 
                                ${stock.change >= 0 
                                  ? 'text-green-600 dark:text-green-400' 
                                  : 'text-red-600 dark:text-red-400'}`}>
                      {stock.change >= 0 ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      )}
                      <span>{Math.abs(stock.change)}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-right text-gray-900 dark:text-gray-100">{stock.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarketWatch;
