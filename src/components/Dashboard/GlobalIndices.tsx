import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';

interface MarketIndex {
  id: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

const GlobalIndices: React.FC = () => {
  const [indices, setIndices] = useState<MarketIndex[]>([
    {
      id: 'sp500',
      name: 'S&P 500',
      value: 4185.82,
      change: 23.45,
      changePercent: 0.56
    },
    {
      id: 'nasdaq',
      name: 'NASDAQ',
      value: 14356.78,
      change: -45.67,
      changePercent: -0.32
    },
    {
      id: 'dow',
      name: 'Dow Jones',
      value: 34567.89,
      change: 156.78,
      changePercent: 0.45
    },
    {
      id: 'ftse',
      name: 'FTSE 100',
      value: 7456.23,
      change: -23.45,
      changePercent: -0.31
    },
    {
      id: 'nikkei',
      name: 'Nikkei 225',
      value: 28789.45,
      change: 234.56,
      changePercent: 0.82
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIndices(prevIndices =>
        prevIndices.map(index => ({
          ...index,
          value: index.value + (Math.random() - 0.5) * 10,
          change: index.change + (Math.random() - 0.5) * 2,
          changePercent: index.changePercent + (Math.random() - 0.5) * 0.1
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div className="flex overflow-x-auto py-2 px-4 space-x-8 whitespace-nowrap">
            {indices.map((index) => (
              <motion.div
                key={index.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2"
              >
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {index.name}
                  </h3>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {index.value.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </span>
                    <div
                      className={`flex items-center ml-2 ${
                        index.change >= 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {index.change >= 0 ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      )}
                      <span className="text-sm ml-1">
                        {Math.abs(index.changePercent).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gradient fade effect on edges */}
          <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-gray-50 dark:from-gray-900" />
          <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-gray-50 dark:from-gray-900" />
        </div>
      </div>
    </div>
  );
};

export default GlobalIndices;
