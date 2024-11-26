import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AssetAllocation {
  type: string;
  percentage: number;
  value: number;
  change24h: number;
}

const PortfolioOverview: React.FC = () => {
  const [totalValue, setTotalValue] = useState(125000);
  const [dailyChange, setDailyChange] = useState(2150.75);
  const [dailyPercentage, setDailyPercentage] = useState(1.75);
  const [historicalData, setHistoricalData] = useState<number[]>([]);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);

  const assetAllocation: AssetAllocation[] = [
    { type: 'Stocks', percentage: 45, value: 56250, change24h: 2.3 },
    { type: 'Bonds', percentage: 30, value: 37500, change24h: 0.5 },
    { type: 'Crypto', percentage: 15, value: 18750, change24h: -3.2 },
    { type: 'Cash', percentage: 10, value: 12500, change24h: 0 }
  ];

  // Generate mock historical data
  useEffect(() => {
    const generateHistoricalData = () => {
      const data: number[] = [];
      const labels: string[] = [];
      let baseValue = totalValue - 5000;

      for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString());
        
        baseValue = baseValue + (Math.random() - 0.45) * 1000;
        data.push(baseValue);
      }

      setHistoricalData(data);
      setTimeLabels(labels);
    };

    generateHistoricalData();
  }, [totalValue]);

  // Chart configuration
  const chartData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Portfolio Value',
        data: historicalData,
        fill: true,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Value Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Total Portfolio Value
          </h3>
          <div className="flex items-baseline space-x-4">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ${totalValue.toLocaleString()}
            </span>
            <div
              className={`flex items-center ${
                dailyChange >= 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {dailyChange >= 0 ? (
                <ArrowUpIcon className="h-5 w-5" />
              ) : (
                <ArrowDownIcon className="h-5 w-5" />
              )}
              <span className="text-lg font-semibold ml-1">
                {dailyChange >= 0 ? '+' : ''}${Math.abs(dailyChange).toLocaleString()} (
                {dailyPercentage >= 0 ? '+' : ''}
                {dailyPercentage}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-64">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Asset Allocation Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Asset Allocation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {assetAllocation.map((asset) => (
            <motion.div
              key={asset.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
            >
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {asset.type}
              </h4>
              <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                ${asset.value.toLocaleString()}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {asset.percentage}%
                </span>
                <div
                  className={`flex items-center ${
                    asset.change24h > 0
                      ? 'text-green-600 dark:text-green-400'
                      : asset.change24h < 0
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {asset.change24h > 0 ? (
                    <ArrowUpIcon className="h-4 w-4" />
                  ) : asset.change24h < 0 ? (
                    <ArrowDownIcon className="h-4 w-4" />
                  ) : null}
                  <span className="text-sm ml-1">
                    {asset.change24h > 0 ? '+' : ''}
                    {asset.change24h}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                <div
                  className="bg-blue-600 h-1.5 rounded-full"
                  style={{ width: `${asset.percentage}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverview;
