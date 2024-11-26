import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  BellIcon,
  NewspaperIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface NewsItem {
  id: number;
  title: string;
  source: string;
  time: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
}

interface AlertItem {
  id: number;
  title: string;
  description: string;
  type: 'price' | 'volume' | 'news';
  time: string;
  asset: string;
}

const RightSidebar: React.FC = () => {
  const news: NewsItem[] = [
    {
      id: 1,
      title: "Fed Signals Potential Rate Cuts in 2024",
      source: "Financial Times",
      time: "2h ago",
      sentiment: "bullish"
    },
    {
      id: 2,
      title: "Tech Stocks Face Pressure Amid Valuation Concerns",
      source: "Bloomberg",
      time: "3h ago",
      sentiment: "bearish"
    },
    {
      id: 3,
      title: "Global Markets Show Mixed Performance",
      source: "Reuters",
      time: "4h ago",
      sentiment: "neutral"
    }
  ];

  const alerts: AlertItem[] = [
    {
      id: 1,
      title: "Price Alert",
      description: "AAPL has crossed your target price of $180",
      type: "price",
      time: "5m ago",
      asset: "AAPL"
    },
    {
      id: 2,
      title: "Volume Alert",
      description: "Unusual trading volume detected in TSLA",
      type: "volume",
      time: "15m ago",
      asset: "TSLA"
    },
    {
      id: 3,
      title: "News Alert",
      description: "Major announcement expected for NVDA",
      type: "news",
      time: "1h ago",
      asset: "NVDA"
    }
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      {/* Market News */}
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <NewspaperIcon className="h-5 w-5 mr-2" />
            Market News
          </h2>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {news.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {item.source}
                </span>
                <div className="flex items-center space-x-2">
                  {item.sentiment === 'bullish' && (
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                  )}
                  {item.sentiment === 'bearish' && (
                    <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.time}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Market Alerts */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <BellIcon className="h-5 w-5 mr-2" />
            Alerts
          </h2>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            View All
          </button>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {alert.title}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {alert.time}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {alert.description}
              </p>
              <div className="mt-2">
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                  {alert.asset}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
