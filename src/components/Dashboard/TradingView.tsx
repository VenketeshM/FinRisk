import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

interface OrderBook {
  bids: Array<[number, number]>;
  asks: Array<[number, number]>;
}

const mockOrderBook: OrderBook = {
  bids: [
    [41250.5, 1.2],
    [41249.8, 0.8],
    [41249.0, 2.5],
    [41248.5, 1.5],
    [41247.2, 3.0],
  ],
  asks: [
    [41251.2, 1.0],
    [41252.0, 1.5],
    [41252.8, 2.0],
    [41253.5, 1.8],
    [41254.2, 2.2],
  ],
};

const TradingView: React.FC = () => {
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [price, setPrice] = useState<string>('41250.50');
  const [amount, setAmount] = useState<string>('1');

  return (
    <div className="space-y-6">
      {/* Trading Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm 
                   border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Place Order
          </h2>

          <div className="space-y-4">
            {/* Order Type Selection */}
            <div className="flex space-x-2">
              <button
                onClick={() => setOrderType('market')}
                className={`flex-1 px-4 py-2 rounded-lg border ${
                  orderType === 'market'
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                Market
              </button>
              <button
                onClick={() => setOrderType('limit')}
                className={`flex-1 px-4 py-2 rounded-lg border ${
                  orderType === 'limit'
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                Limit
              </button>
            </div>

            {/* Buy/Sell Selection */}
            <div className="flex space-x-2">
              <button
                onClick={() => setSide('buy')}
                className={`flex-1 px-4 py-2 rounded-lg border ${
                  side === 'buy'
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setSide('sell')}
                className={`flex-1 px-4 py-2 rounded-lg border ${
                  side === 'sell'
                    ? 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                Sell
              </button>
            </div>

            {/* Price Input */}
            {orderType === 'limit' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 
                         border border-gray-300 dark:border-gray-600 
                         rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-blue-500"
                  placeholder="Enter price"
                />
              </div>
            )}

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 
                       border border-gray-300 dark:border-gray-600 
                       rounded-lg focus:outline-none focus:ring-2 
                       focus:ring-blue-500"
                placeholder="Enter amount"
              />
            </div>

            {/* Place Order Button */}
            <button
              className={`w-full py-2 px-4 rounded-lg ${
                side === 'buy'
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-red-500 hover:bg-red-600'
              } text-white font-medium transition-colors duration-200`}
            >
              {side === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
            </button>
          </div>
        </motion.div>

        {/* Order Book */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm 
                   border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Order Book
          </h2>

          <div className="space-y-4">
            {/* Asks */}
            <div className="space-y-1">
              {mockOrderBook.asks.map(([price, size], index) => (
                <div
                  key={`ask-${index}`}
                  className="flex justify-between text-sm"
                >
                  <span className="text-red-500 dark:text-red-400">
                    {price.toFixed(2)}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {size.toFixed(4)}
                  </span>
                </div>
              ))}
            </div>

            {/* Spread */}
            <div className="text-sm text-center text-gray-500 dark:text-gray-400 py-2 border-y border-gray-200 dark:border-gray-700">
              Spread: {(mockOrderBook.asks[0][0] - mockOrderBook.bids[0][0]).toFixed(2)} (
              {((mockOrderBook.asks[0][0] - mockOrderBook.bids[0][0]) / mockOrderBook.bids[0][0] * 100).toFixed(3)}%)
            </div>

            {/* Bids */}
            <div className="space-y-1">
              {mockOrderBook.bids.map(([price, size], index) => (
                <div
                  key={`bid-${index}`}
                  className="flex justify-between text-sm"
                >
                  <span className="text-green-500 dark:text-green-400">
                    {price.toFixed(2)}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {size.toFixed(4)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Market Depth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm 
                   border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Market Depth
          </h2>
          
          <div className="h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
            <ChartBarIcon className="h-12 w-12 mr-2" />
            <span>Market Depth Chart Coming Soon</span>
          </div>
        </motion.div>
      </div>

      {/* Recent Trades */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm 
                 border border-gray-200 dark:border-gray-700 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Recent Trades
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Time</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Type</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Price</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-gray-700/50">
                <td className="py-3 text-sm text-gray-600 dark:text-gray-300">12:30:45</td>
                <td className="py-3 text-sm text-green-500">Buy</td>
                <td className="py-3 text-sm text-gray-600 dark:text-gray-300">41,250.50</td>
                <td className="py-3 text-sm text-gray-600 dark:text-gray-300">0.5</td>
                <td className="py-3 text-sm text-gray-600 dark:text-gray-300">20,625.25</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-700/50">
                <td className="py-3 text-sm text-gray-600 dark:text-gray-300">12:30:42</td>
                <td className="py-3 text-sm text-red-500">Sell</td>
                <td className="py-3 text-sm text-gray-600 dark:text-gray-300">41,249.80</td>
                <td className="py-3 text-sm text-gray-600 dark:text-gray-300">0.8</td>
                <td className="py-3 text-sm text-gray-600 dark:text-gray-300">32,999.84</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default TradingView;
