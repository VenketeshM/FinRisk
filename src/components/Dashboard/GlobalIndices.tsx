import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

interface IndexData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  lastUpdate?: number;
}

const GlobalIndices = () => {
  const [indices, setIndices] = useState<IndexData[]>([
    { symbol: 'SPX', name: 'S&P 500', price: 4532.12, change: 23.45, changePercent: 0.52 },
    { symbol: 'DJI', name: 'Dow Jones', price: 35234.56, change: -123.45, changePercent: -0.35 },
    { symbol: 'IXIC', name: 'NASDAQ', price: 14123.45, change: 45.67, changePercent: 0.32 },
    { symbol: 'FTSE', name: 'FTSE 100', price: 7345.67, change: 34.56, changePercent: 0.47 },
    { symbol: 'N225', name: 'Nikkei 225', price: 28456.78, change: -234.56, changePercent: -0.82 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndices(prevIndices => 
        prevIndices.map(index => {
          const randomChange = (Math.random() - 0.5) * 10;
          const newPrice = index.price + randomChange;
          const newChange = index.change + randomChange;
          const newChangePercent = (newChange / newPrice) * 100;
          
          return {
            ...index,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
            lastUpdate: Date.now(),
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-full mx-auto">
        <div className="flex items-center h-12 overflow-x-auto">
          {indices.map((index, i) => (
            <motion.div
              key={index.symbol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.1 }}
              className="flex items-center space-x-4 px-6 border-r border-gray-200 dark:border-gray-700 min-w-max"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {index.symbol}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {index.name}
                </span>
              </div>
              
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {index.price.toLocaleString(undefined, { 
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2 
                  })}
                </span>
                <div className="flex items-center space-x-1">
                  {index.change >= 0 ? (
                    <ArrowTrendingUpIcon className="h-3 w-3 text-green-500" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-3 w-3 text-red-500" />
                  )}
                  <span
                    className={`text-xs ${
                      index.change >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {index.change >= 0 ? '+' : ''}
                    {index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalIndices;
