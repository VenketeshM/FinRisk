import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
import { ArrowPathIcon, LightBulbIcon } from '@heroicons/react/20/solid';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

interface Asset {
  symbol: string;
  name: string;
  currentAllocation: number;
  suggestedAllocation: number;
  risk: number;
  return: number;
}

interface PortfolioMetrics {
  currentRisk: number;
  optimizedRisk: number;
  expectedReturn: number;
  sharpeRatio: number;
}

const PortfolioOptimizer: React.FC = () => {
  const [riskTolerance, setRiskTolerance] = useState<number>(5);
  const [optimizing, setOptimizing] = useState<boolean>(false);
  
  // Mock portfolio data
  const [assets] = useState<Asset[]>([
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      currentAllocation: 25,
      suggestedAllocation: 20,
      risk: 0.15,
      return: 0.12
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      currentAllocation: 20,
      suggestedAllocation: 25,
      risk: 0.18,
      return: 0.15
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      currentAllocation: 15,
      suggestedAllocation: 20,
      risk: 0.14,
      return: 0.11
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      currentAllocation: 40,
      suggestedAllocation: 35,
      risk: 0.20,
      return: 0.16
    }
  ]);

  const [metrics] = useState<PortfolioMetrics>({
    currentRisk: 0.16,
    optimizedRisk: 0.14,
    expectedReturn: 0.13,
    sharpeRatio: 1.8
  });

  const getAllocationChartData = (type: 'current' | 'suggested') => ({
    labels: assets.map(asset => asset.symbol),
    datasets: [
      {
        data: assets.map(asset => 
          type === 'current' ? asset.currentAllocation : asset.suggestedAllocation
        ),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  });

  const handleOptimize = () => {
    setOptimizing(true);
    // Simulate optimization process
    setTimeout(() => setOptimizing(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Portfolio Optimizer
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            AI-powered portfolio optimization suggestions
          </p>
        </div>
        <button
          onClick={handleOptimize}
          disabled={optimizing}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            optimizing
              ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <ArrowPathIcon className={`h-5 w-5 ${optimizing ? 'animate-spin' : ''}`} />
          <span>{optimizing ? 'Optimizing...' : 'Optimize'}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Current vs Suggested Allocation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <h3 className="text-lg font-medium mb-4">Current Allocation</h3>
          <div className="h-64">
            <Pie data={getAllocationChartData('current')} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <h3 className="text-lg font-medium mb-4">Suggested Allocation</h3>
          <div className="h-64">
            <Pie data={getAllocationChartData('suggested')} />
          </div>
        </div>
      </div>

      {/* Risk Tolerance Slider */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h3 className="text-lg font-medium mb-4">Risk Tolerance</h3>
        <input
          type="range"
          min="1"
          max="10"
          value={riskTolerance}
          onChange={(e) => setRiskTolerance(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>Conservative</span>
          <span>Aggressive</span>
        </div>
      </div>

      {/* Portfolio Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Current Risk
          </div>
          <div className="text-xl font-semibold text-gray-900 dark:text-white">
            {(metrics.currentRisk * 100).toFixed(1)}%
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Optimized Risk
          </div>
          <div className="text-xl font-semibold text-green-600">
            {(metrics.optimizedRisk * 100).toFixed(1)}%
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Expected Return
          </div>
          <div className="text-xl font-semibold text-gray-900 dark:text-white">
            {(metrics.expectedReturn * 100).toFixed(1)}%
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Sharpe Ratio
          </div>
          <div className="text-xl font-semibold text-gray-900 dark:text-white">
            {metrics.sharpeRatio.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Optimization Suggestions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <div className="flex items-center space-x-2 mb-4">
          <LightBulbIcon className="h-5 w-5 text-yellow-500" />
          <h3 className="text-lg font-medium">Optimization Suggestions</h3>
        </div>
        <div className="space-y-4">
          {assets.map((asset) => {
            const difference = asset.suggestedAllocation - asset.currentAllocation;
            return (
              <div
                key={asset.symbol}
                className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700"
              >
                <div>
                  <div className="font-medium">{asset.symbol}</div>
                  <div className="text-sm text-gray-500">{asset.name}</div>
                </div>
                <div className="text-right">
                  <div
                    className={`font-medium ${
                      difference > 0
                        ? 'text-green-600'
                        : difference < 0
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {difference > 0 ? '+' : ''}
                    {difference}%
                  </div>
                  <div className="text-sm text-gray-500">
                    {asset.currentAllocation}% → {asset.suggestedAllocation}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PortfolioOptimizer;
