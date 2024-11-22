import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Welcome back, {user?.email}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Portfolio Summary Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Portfolio Summary
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">Total Value: $100,000</p>
              <p className="text-gray-600 dark:text-gray-300">Daily Change: +2.5%</p>
              <p className="text-gray-600 dark:text-gray-300">Assets: 12</p>
            </div>
          </div>

          {/* Risk Metrics Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Risk Metrics
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">VaR (95%): $1,200</p>
              <p className="text-gray-600 dark:text-gray-300">Beta: 1.2</p>
              <p className="text-gray-600 dark:text-gray-300">Sharpe Ratio: 1.8</p>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Portfolio Rebalanced</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">2h ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Risk Alert: High Volatility</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">5h ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">New Asset Added</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">1d ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Portfolio Performance
            </h2>
            <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded">
              <p className="text-gray-500 dark:text-gray-400">Chart placeholder</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Asset Allocation
            </h2>
            <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded">
              <p className="text-gray-500 dark:text-gray-400">Chart placeholder</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
