import React from 'react';
import PageContainer from '../components/common/PageContainer';

const Reports: React.FC = () => {
  return (
    <PageContainer
      title="Reports"
      description="Comprehensive financial reports and analytics"
    >
      <div className="grid gap-6">
        {/* Reports content will go here */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Financial Reports</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Coming soon: Detailed financial reports with customizable analytics and insights.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default Reports;
