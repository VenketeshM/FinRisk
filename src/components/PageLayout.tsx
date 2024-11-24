import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Add mt-16 for navbar height and pt-8 for additional spacing */}
      <div className="mt-16 pt-8">
        {children}
      </div>
    </div>
  );
}
