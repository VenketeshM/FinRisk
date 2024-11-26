import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  AdjustmentsHorizontalIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  price: number;
  quantity: number;
  timestamp: Date;
  status: 'pending' | 'executed' | 'cancelled';
}

interface Position {
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercentage: number;
}

const AdvancedTrading: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop' | 'trailing'>('market');
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [isSimulationMode, setIsSimulationMode] = useState(false);

  // Mock data
  const recentTrades: Trade[] = [
    {
      id: '1',
      symbol: 'AAPL',
      type: 'buy',
      price: 150.25,
      quantity: 10,
      timestamp: new Date(),
      status: 'executed'
    },
    {
      id: '2',
      symbol: 'GOOGL',
      type: 'sell',
      price: 2750.50,
      quantity: 5,
      timestamp: new Date(),
      status: 'pending'
    }
  ];

  const positions: Position[] = [
    {
      symbol: 'AAPL',
      quantity: 100,
      averagePrice: 145.75,
      currentPrice: 150.25,
      pnl: 450,
      pnlPercentage: 3.09
    },
    {
      symbol: 'GOOGL',
      quantity: 25,
      averagePrice: 2700.00,
      currentPrice: 2750.50,
      pnl: 1262.50,
      pnlPercentage: 1.87
    }
  ];

  const tabs = [
    { name: 'Trading', icon: CurrencyDollarIcon },
    { name: 'Positions', icon: ChartBarIcon },
    { name: 'Orders', icon: AdjustmentsHorizontalIcon },
  ];

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement order submission logic
    console.log('Order submitted:', { symbol, quantity, price, orderType });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Advanced Trading</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsSimulationMode(!isSimulationMode)}
            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1
              ${isSimulationMode 
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}
          >
            <ArrowPathIcon className="h-4 w-4" />
            <span>Simulation Mode</span>
          </button>
        </div>
      </div>

      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-700 p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Tab
                key={tab.name}
                className={({ selected }) => `
                  w-full py-2.5 text-sm font-medium leading-5 rounded-md
                  flex items-center justify-center space-x-2
                  ${selected
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </Tab>
            );
          })}
        </Tab.List>

        <Tab.Panels className="mt-4">
          <Tab.Panel>
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Symbol
                  </label>
                  <input
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                             dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., AAPL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                             dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter quantity"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Order Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['market', 'limit', 'stop', 'trailing'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setOrderType(type as any)}
                      className={`px-4 py-2 rounded-md text-sm font-medium capitalize
                        ${orderType === type
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {orderType !== 'market' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Price
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                             dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter price"
                  />
                </div>
              )}

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 
                           focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Buy
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Sell
                </button>
              </div>
            </form>
          </Tab.Panel>

          <Tab.Panel>
            <div className="space-y-4">
              {positions.map((position) => (
                <motion.div
                  key={position.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {position.symbol}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Qty: {position.quantity} @ ${position.averagePrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${
                        position.pnl >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        ${position.pnl.toFixed(2)}
                      </p>
                      <p className={`text-sm ${
                        position.pnlPercentage >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {position.pnlPercentage.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="space-y-4">
              {recentTrades.map((trade) => (
                <motion.div
                  key={trade.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {trade.symbol}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          trade.type === 'buy' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {trade.type.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {trade.quantity} shares @ ${trade.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        trade.status === 'executed' 
                          ? 'text-green-600' 
                          : trade.status === 'pending'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}>
                        {trade.status.toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {trade.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default AdvancedTrading;
