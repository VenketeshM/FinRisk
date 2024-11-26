import React, { useState, useEffect } from 'react';
import PageContainer from '../components/common/PageContainer';
import PieChart from '../components/charts/PieChart';
import LineChart from '../components/charts/LineChart';
import usePortfolioStore from '../store/portfolioStore';

const Portfolio: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'1M' | '3M' | '6M' | '1Y' | 'ALL'>('1Y');
  const { 
    assets, 
    totalValue, 
    dailyChange, 
    dailyChangePercentage, 
    riskScore,
    loading,
    error,
    fetchPortfolioData 
  } = usePortfolioStore();

  useEffect(() => {
    fetchPortfolioData();
  }, [fetchPortfolioData]);

  // Calculate asset allocation for pie chart
  const portfolioAllocation = assets.reduce((acc, asset) => {
    const existingType = acc.find(a => a.name === asset.type);
    if (existingType) {
      existingType.value += asset.value;
    } else {
      acc.push({
        name: asset.type,
        value: asset.value,
        color: getColorForAssetType(asset.type),
      });
    }
    return acc;
  }, [] as Array<{ name: string; value: number; color: string }>);

  // Mock performance data - replace with real API data
  const performanceData = [
    { date: '2023-01', portfolio: 100000, benchmark: 100000 },
    { date: '2023-02', portfolio: 105000, benchmark: 102000 },
    { date: '2023-03', portfolio: 108000, benchmark: 103000 },
    { date: '2023-04', portfolio: 112000, benchmark: 105000 },
    { date: '2023-05', portfolio: 115000, benchmark: 106000 },
  ];

  if (loading) {
    return (
      <PageContainer title="Portfolio Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer title="Portfolio Dashboard">
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer
      title="Portfolio Dashboard"
      description="Track your investment performance and asset allocation"
    >
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Total Value</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            ${totalValue.toLocaleString()}
          </p>
          <p className={`text-sm mt-1 ${
            dailyChangePercentage >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {dailyChangePercentage >= 0 ? '+' : ''}{dailyChangePercentage.toFixed(2)}% (YTD)
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Daily Change</h3>
          <p className={`text-3xl font-bold ${
            dailyChange >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {dailyChange >= 0 ? '+' : ''}{dailyChange.toLocaleString()}
          </p>
          <p className={`text-sm mt-1 ${
            dailyChangePercentage >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {dailyChangePercentage >= 0 ? '+' : ''}{dailyChangePercentage.toFixed(2)}% today
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Risk Score</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{riskScore}/10</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {getRiskLevel(riskScore)}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <PieChart
            data={portfolioAllocation}
            title="Asset Allocation"
            height={300}
          />
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex justify-end mb-4 space-x-2">
            {['1M', '3M', '6M', '1Y', 'ALL'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period as any)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  timeframe === period
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          <LineChart
            data={performanceData}
            lines={[
              { key: 'portfolio', name: 'Portfolio', color: '#0088FE' },
              { key: 'benchmark', name: 'S&P 500', color: '#82ca9d' },
            ]}
            title="Performance History"
            height={300}
          />
        </div>
      </div>

      {/* Holdings Table */}
      <div className="p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Holdings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Asset</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Holdings</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">24h Change</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {assets.map((asset) => (
                  <tr key={asset.symbol}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {asset.symbol}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {asset.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        ${asset.currentPrice.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {asset.quantity}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        ${asset.value.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        asset.changePercentage24h >= 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {asset.changePercentage24h >= 0 ? '+' : ''}
                        {asset.changePercentage24h.toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

// Helper functions
const getColorForAssetType = (type: string): string => {
  const colors = {
    Stock: '#0088FE',
    Crypto: '#00C49F',
    Bond: '#FFBB28',
    Commodity: '#FF8042',
    Cash: '#8884d8',
  };
  return colors[type as keyof typeof colors] || '#8884d8';
};

const getRiskLevel = (score: number): string => {
  if (score <= 3) return 'Low Risk';
  if (score <= 6) return 'Moderate Risk';
  if (score <= 8) return 'Moderate-High Risk';
  return 'High Risk';
};

export default Portfolio;
