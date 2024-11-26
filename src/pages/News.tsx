import React from 'react';
import PageContainer from '../components/common/PageContainer';

const News: React.FC = () => {
  return (
    <PageContainer
      title="Market News"
      description="Latest financial news and market updates"
    >
      <div className="grid gap-6">
        {/* News content will go here */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Financial News Feed</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Coming soon: Real-time financial news and market updates from trusted sources.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default News;
