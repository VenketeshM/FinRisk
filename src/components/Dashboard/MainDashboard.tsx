import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  ChartBarIcon,
  BanknotesIcon,
  GlobeAltIcon,
  NewspaperIcon,
  LightBulbIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import TradingView from './TradingView';
import AIInsights from './AIInsights';
import NewsPanel from './NewsPanel';
import PortfolioAllocation from './PortfolioAllocation';
import RiskMetrics from './RiskMetrics';
import MarketHeatmap from './MarketHeatmap';
import EconomicCalendar from './EconomicCalendar';

const MainDashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Enhanced mock data
  const portfolioStats = {
    totalValue: 125750.82,
    dayChange: 1250.43,
    dayChangePercent: 2.35,
    investedCapital: 100000,
    sharpeRatio: 1.8,
    beta: 0.95,
    var: -2.5,
    topGainer: { symbol: 'AAPL', change: 5.2 },
    topLoser: { symbol: 'TSLA', change: -3.1 }
  };

  const marketIndices = [
    { name: 'S&P 500', value: '4,185.82', change: '+1.25%', trending: 'up' },
    { name: 'NASDAQ', value: '12,643.01', change: '+0.95%', trending: 'up' },
    { name: 'DOW', value: '32,945.33', change: '+0.75%', trending: 'up' },
    { name: 'BTC/USD', value: '43,250.00', change: '-0.50%', trending: 'down' }
  ];

  const aiInsights = [
    { title: 'Sector Rotation', description: 'Technology sector showing strong momentum', confidence: 85 },
    { title: 'Market Sentiment', description: 'Bullish signals in emerging markets', confidence: 75 },
    { title: 'Risk Alert', description: 'Increased volatility in crypto markets', confidence: 90 }
  ];

  const upcomingEvents = [
    { time: '10:30 AM', event: 'Fed Interest Rate Decision' },
    { time: '2:00 PM', event: 'AAPL Earnings Call' },
    { time: '4:30 PM', event: 'US GDP Data Release' }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Portfolio Value</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                ${portfolioStats.totalValue.toLocaleString()}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Invested: ${portfolioStats.investedCapital.toLocaleString()}
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <BanknotesIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className={`mt-4 flex items-center ${
            portfolioStats.dayChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">
              {portfolioStats.dayChangePercent}% Today
            </span>
          </div>
        </motion.div>

        {marketIndices.map((index, i) => (
          <motion.div
            key={index.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (i + 1) }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{index.name}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                  {index.value}
                </h3>
              </div>
              <div className="h-12 w-12 bg-purple-50 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <ChartBarIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className={`mt-4 flex items-center ${
              index.trending === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {index.trending === 'up' ? (
                <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              ) : (
                <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
              )}
              <span className="text-sm font-medium">{index.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Trading View and Portfolio Allocation */}
        <div className="xl:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Market Overview</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm rounded-lg bg-gray-100 dark:bg-gray-700">1D</button>
                <button className="px-3 py-1 text-sm rounded-lg bg-blue-500 text-white">1W</button>
                <button className="px-3 py-1 text-sm rounded-lg bg-gray-100 dark:bg-gray-700">1M</button>
                <button className="px-3 py-1 text-sm rounded-lg bg-gray-100 dark:bg-gray-700">1Y</button>
              </div>
            </div>
            <TradingView />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Portfolio Allocation</h2>
            <PortfolioAllocation />
          </motion.div>
        </div>

        {/* Right Column - AI Insights, News, and Calendar */}
        <div className="space-y-6">
          {/* Risk Metrics Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Risk Metrics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Sharpe Ratio</span>
                <span className="font-medium">{portfolioStats.sharpeRatio}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Beta</span>
                <span className="font-medium">{portfolioStats.beta}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Value at Risk (1d)</span>
                <span className="font-medium text-red-500">{portfolioStats.var}%</span>
              </div>
            </div>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Insights</h2>
              <LightBulbIcon className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{insight.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{insight.description}</p>
                  <div className="mt-2 flex items-center">
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                      <div 
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${insight.confidence}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-500">{insight.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Economic Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Upcoming Events</h2>
              <BellIcon className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-20 text-sm text-gray-500">{event.time}</div>
                  <div className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100">{event.event}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
