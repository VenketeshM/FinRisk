import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Cookie,
  Settings,
  Activity,
  Target,
  Shield,
  Info,
  ToggleLeft
} from 'lucide-react';
import PageLayout from '../components/PageLayout';

const CookieSettings = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    functional: true,
    analytics: true,
    advertising: false,
  });

  const sections = [
    {
      id: 'necessary',
      title: 'Necessary Cookies',
      icon: Cookie,
      required: true,
      description: 'Essential cookies that enable basic functionality and security features of our platform. These cookies are strictly necessary and cannot be disabled.',
      examples: [
        'Session management',
        'Load balancing',
        'Security tokens',
        'User authentication'
      ]
    },
    {
      id: 'functional',
      title: 'Functional Cookies',
      icon: Settings,
      required: false,
      description: 'Cookies that enhance the functionality of our platform by storing your preferences and settings.',
      examples: [
        'Language preferences',
        'Dark/light mode settings',
        'UI customizations',
        'Recently viewed items'
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics Cookies',
      icon: Activity,
      required: false,
      description: 'Cookies that help us understand how visitors interact with our platform by collecting and reporting anonymous information.',
      examples: [
        'Page view statistics',
        'User behavior patterns',
        'Feature usage metrics',
        'Performance monitoring'
      ]
    },
    {
      id: 'advertising',
      title: 'Advertising Cookies',
      icon: Target,
      required: false,
      description: 'Cookies used to deliver personalized advertisements based on your interests and browsing patterns.',
      examples: [
        'Ad personalization',
        'Campaign effectiveness',
        'Interest tracking',
        'Retargeting features'
      ]
    }
  ];

  const handleToggle = (cookieType: string) => {
    if (cookieType === 'necessary') return; // Cannot toggle necessary cookies
    setCookiePreferences(prev => ({
      ...prev,
      [cookieType]: !prev[cookieType]
    }));
  };

  const handleSavePreferences = () => {
    // Here you would typically save the preferences to your backend
    // and update the actual cookie settings
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    alert('Your cookie preferences have been saved successfully!');
  };

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 pb-12"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Cookie Settings
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Manage your cookie preferences and understand how we use cookies.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Last updated: 24/11/2024
          </p>
        </div>

        {/* Cookie Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <section.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                    {section.required && (
                      <span className="text-sm text-blue-600 dark:text-blue-400">
                        Required
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleToggle(section.id)}
                  disabled={section.required}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                    section.required ? 'bg-blue-600 cursor-not-allowed' :
                    cookiePreferences[section.id as keyof typeof cookiePreferences]
                      ? 'bg-blue-600'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      cookiePreferences[section.id as keyof typeof cookiePreferences]
                        ? 'translate-x-5'
                        : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {section.description}
              </p>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Examples:
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  {section.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSavePreferences}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
          >
            Save Preferences
          </button>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            to="/privacy"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Privacy Policy
          </Link>
          <span className="text-gray-300 dark:text-gray-700">•</span>
          <Link
            to="/terms"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Terms of Use
          </Link>
          <span className="text-gray-300 dark:text-gray-700">•</span>
          <Link
            to="/legal-disclaimer"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Legal Disclaimer
          </Link>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default CookieSettings;
