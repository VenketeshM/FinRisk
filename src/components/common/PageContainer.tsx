import React from 'react';

interface PageContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
