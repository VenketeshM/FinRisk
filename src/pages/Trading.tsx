import React from 'react';
import PageContainer from '../components/common/PageContainer';

const Trading: React.FC = () => {
  return (
    <PageContainer
      title="Trading"
      description="Execute trades and manage your orders"
    >
      <div className="grid gap-6">
        {/* Trading content will go here */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Trading Platform</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Coming soon: Advanced trading platform with real-time order execution.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default Trading;
