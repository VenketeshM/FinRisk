import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ScaleIcon
} from '@heroicons/react/24/outline';

const MainContent: React.FC = () => {
  const portfolioStats = [
    {
      title: "Total Value",
      value: "$125,678.45",
      change: "+2.4%",
      icon: CurrencyDollarIcon,
      color: "blue"
    },
    {
      title: "Today's Return",
      value: "$1,234.56",
      change: "+0.98%",
      icon: ArrowTrendingUpIcon,
      color: "green"
    },
    {
      title: "Total Return",
      value: "$23,456.78",
      change: "+18.7%",
      icon: ChartBarIcon,
      color: "purple"
    },
    {
      title: "Risk Score",
      value: "Medium",
      change: "Balanced",
      icon: ScaleIcon,
      color: "orange"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {portfolioStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                  <p className="text-sm text-green-500">{stat.change}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Portfolio Performance
          </h2>
          <div className="h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
            Chart Component Coming Soon
          </div>
        </motion.div>

        {/* Asset Allocation Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Asset Allocation
          </h2>
          <div className="h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
            Chart Component Coming Soon
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {/* Activity items will go here */}
          <div className="text-gray-500 dark:text-gray-400">
            Activity Feed Coming Soon
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MainContent;
