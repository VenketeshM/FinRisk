import React from 'react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Pricing Plans
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                <span className="text-gray-600 dark:text-gray-300">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-colors"
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const plans = [
  {
    name: 'Basic',
    price: 29,
    features: [
      'Basic risk analysis',
      'Portfolio tracking',
      'Market data access',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    price: 79,
    features: [
      'Advanced risk metrics',
      'Real-time alerts',
      'API access',
      'Priority support',
      'Custom reports',
    ],
  },
  {
    name: 'Enterprise',
    price: 199,
    features: [
      'Full feature access',
      'Custom integrations',
      'Dedicated support',
      'Team collaboration',
      'Advanced AI insights',
      'White-label options',
    ],
  },
];
