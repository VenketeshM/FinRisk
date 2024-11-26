import React from 'react';
import PageContainer from '../components/common/PageContainer';

const MarketHeatmap: React.FC = () => {
  return (
    <PageContainer
      title="Market Heatmap"
      description="Visual representation of market performance"
    >
      <div className="grid gap-6">
        {/* Market Heatmap content will go here */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Market Performance Heatmap</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Coming soon: Interactive market heatmap with sector and industry performance visualization.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default MarketHeatmap;
