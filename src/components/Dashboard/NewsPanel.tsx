import React from 'react';
import { motion } from 'framer-motion';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  impact: 'positive' | 'negative' | 'neutral';
}

const NewsPanel: React.FC = () => {
  // Simulated news data
  const news: NewsItem[] = [
    {
      id: '1',
      title: 'Federal Reserve Holds Interest Rates Steady',
      source: 'Financial Times',
      time: '2h ago',
      impact: 'neutral'
    },
    {
      id: '2',
      title: 'Tech Stocks Rally on Strong Earnings Reports',
      source: 'Bloomberg',
      time: '3h ago',
      impact: 'positive'
    },
    {
      id: '3',
      title: 'Oil Prices Drop Amid Global Supply Concerns',
      source: 'Reuters',
      time: '4h ago',
      impact: 'negative'
    },
    {
      id: '4',
      title: 'Major Merger Announced in Banking Sector',
      source: 'WSJ',
      time: '5h ago',
      impact: 'positive'
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'negative':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <div className="mt-1 flex items-center space-x-2 text-xs">
                <span className="text-gray-500 dark:text-gray-400">{item.source}</span>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <span className="text-gray-500 dark:text-gray-400">{item.time}</span>
              </div>
            </div>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(
                item.impact
              )}`}
            >
              {item.impact.charAt(0).toUpperCase() + item.impact.slice(1)}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default NewsPanel;
