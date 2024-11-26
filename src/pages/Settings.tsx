import React from 'react';
import PageContainer from '../components/common/PageContainer';

const Settings: React.FC = () => {
  return (
    <PageContainer
      title="Settings"
      description="Customize your FinRisk experience"
    >
      <div className="grid gap-6">
        {/* Settings content will go here */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Coming soon: Customize your dashboard, notifications, and preferences.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default Settings;
