import React from 'react';
import { motion } from 'framer-motion';

interface Insight {
  id: string;
  title: string;
  description: string;
  confidence: number;
  type: 'opportunity' | 'risk' | 'trend';
  timestamp: string;
}

const AIInsights: React.FC = () => {
  // Simulated AI insights
  const insights: Insight[] = [
    {
      id: '1',
      title: 'Potential Market Correction',
      description: 'Technical indicators suggest a possible 5-7% market correction in the next 2-3 weeks.',
      confidence: 85,
      type: 'risk',
      timestamp: 'Updated 1h ago'
    },
    {
      id: '2',
      title: 'Emerging Tech Sector Opportunity',
      description: 'AI and quantum computing stocks show strong momentum with increasing institutional investment.',
      confidence: 92,
      type: 'opportunity',
      timestamp: 'Updated 2h ago'
    },
    {
      id: '3',
      title: 'ESG Investment Trend',
      description: 'Growing institutional focus on ESG metrics indicates potential outperformance in sustainable energy sector.',
      confidence: 78,
      type: 'trend',
      timestamp: 'Updated 3h ago'
    }
  ];

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'opportunity':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'risk':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default:
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
    }
  };

  return (
    <div className="space-y-4">
      {insights.map((insight) => (
        <motion.div
          key={insight.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              {insight.title}
            </h3>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${getTypeStyles(
                insight.type
              )}`}
            >
              {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {insight.description}
          </p>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 dark:text-gray-400">Confidence:</span>
              <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 dark:bg-blue-400 rounded-full"
                  style={{ width: `${insight.confidence}%` }}
                />
              </div>
              <span className="text-gray-700 dark:text-gray-300">{insight.confidence}%</span>
            </div>
            <span className="text-gray-500 dark:text-gray-400">{insight.timestamp}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AIInsights;
