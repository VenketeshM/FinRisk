import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ExclamationTriangleIcon, ShieldCheckIcon } from '@heroicons/react/20/solid';

ChartJS.register(ArcElement, Tooltip, Legend);

interface RiskMetric {
  name: string;
  value: number;
  status: 'low' | 'medium' | 'high';
  description: string;
}

const RiskAnalysis: React.FC = () => {
  const [riskMetrics, setRiskMetrics] = useState<RiskMetric[]>([
    {
      name: 'Value at Risk (VaR)',
      value: 3.2,
      status: 'medium',
      description: '95% confidence, 1-day horizon'
    },
    {
      name: 'Sharpe Ratio',
      value: 1.8,
      status: 'low',
      description: 'Risk-adjusted return measure'
    },
    {
      name: 'Beta',
      value: 1.2,
      status: 'medium',
      description: 'Market sensitivity'
    },
    {
      name: 'Volatility',
      value: 15.5,
      status: 'high',
      description: '30-day rolling'
    }
  ]);

  // Risk exposure by sector
  const sectorExposure = {
    labels: ['Technology', 'Finance', 'Healthcare', 'Energy', 'Consumer'],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)'
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(139, 92, 246, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRiskMetrics(prevMetrics =>
        prevMetrics.map(metric => ({
          ...metric,
          value: metric.value + (Math.random() - 0.5) * 0.1,
          status: Math.random() > 0.8 
            ? ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high'
            : metric.status
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-800/30';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-800/30';
      case 'high':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-800/30';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {riskMetrics.map((metric) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {metric.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {metric.description}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  metric.status
                )}`}
              >
                {metric.value.toFixed(2)}
              </span>
            </div>
            <div className="mt-4">
              {metric.status === 'high' ? (
                <div className="flex items-center text-red-600 dark:text-red-400">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                  <span className="text-xs">High risk level detected</span>
                </div>
              ) : metric.status === 'low' ? (
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <ShieldCheckIcon className="h-4 w-4 mr-1" />
                  <span className="text-xs">Risk level acceptable</span>
                </div>
              ) : null}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sector Risk Exposure */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Risk Exposure by Sector
        </h3>
        <div className="h-64">
          <Doughnut data={sectorExposure} options={chartOptions} />
        </div>
      </div>

      {/* Risk Alerts */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Risk Alerts
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Portfolio volatility approaching upper threshold
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                2 hours ago
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <ShieldCheckIcon className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Sharpe ratio improved above target level
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                5 hours ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;