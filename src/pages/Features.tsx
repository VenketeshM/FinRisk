import React from 'react';

export default function Features() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Features
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const features = [
  {
    title: 'Risk Analysis',
    description: 'Advanced risk metrics including VaR, Sharpe Ratio, and Beta calculations.',
  },
  {
    title: 'Portfolio Tracking',
    description: 'Real-time portfolio monitoring and performance analytics.',
  },
  {
    title: 'AI Predictions',
    description: 'Machine learning-powered market trend analysis and predictions.',
  },
  {
    title: 'Custom Alerts',
    description: 'Set up personalized alerts for price movements and risk thresholds.',
  },
  {
    title: 'Data Visualization',
    description: 'Interactive charts and graphs for better data understanding.',
  },
  {
    title: 'API Integration',
    description: 'Connect with major financial data providers and exchanges.',
  },
];
