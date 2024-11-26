import React from 'react';

const DashboardSkeleton = () => {
  return (
    <div className="w-full h-full animate-pulse">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-24 bg-gray-200 dark:bg-gray-700/50 rounded-xl"
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-64 bg-gray-200 dark:bg-gray-700/50 rounded-xl"
          />
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="h-96 bg-gray-200 dark:bg-gray-700/50 rounded-xl" />
        <div className="h-96 bg-gray-200 dark:bg-gray-700/50 rounded-xl" />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
