import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  PlayCircle, 
  FileText, 
  Code2, 
  Rocket,
  MessageCircle,
  Mail,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

const helpCategories = [
  {
    title: "Quick Start Guides",
    icon: Rocket,
    description: "Get up and running quickly with step-by-step guides",
    links: [
      { title: "Platform Overview", url: "/help/platform-overview" },
      { title: "First Risk Assessment", url: "/help/first-assessment" },
      { title: "Portfolio Setup", url: "/help/portfolio-setup" },
      { title: "Custom Analytics", url: "/help/custom-analytics" }
    ]
  },
  {
    title: "Video Tutorials",
    icon: PlayCircle,
    description: "Learn through comprehensive video walkthroughs",
    links: [
      { title: "Basic Navigation", url: "/help/video/navigation" },
      { title: "Risk Analysis Basics", url: "/help/video/risk-basics" },
      { title: "Advanced Features", url: "/help/video/advanced" },
      { title: "API Integration", url: "/help/video/api" }
    ]
  },
  {
    title: "Documentation",
    icon: FileText,
    description: "Detailed documentation for all features",
    links: [
      { title: "User Guide", url: "/help/docs/user-guide" },
      { title: "Risk Metrics", url: "/help/docs/risk-metrics" },
      { title: "Data Sources", url: "/help/docs/data-sources" },
      { title: "Best Practices", url: "/help/docs/best-practices" }
    ]
  },
  {
    title: "API Reference",
    icon: Code2,
    description: "Complete API documentation for developers",
    links: [
      { title: "Authentication", url: "/help/api/auth" },
      { title: "Endpoints", url: "/help/api/endpoints" },
      { title: "Code Examples", url: "/help/api/examples" },
      { title: "Rate Limits", url: "/help/api/limits" }
    ]
  }
];

const supportChannels = [
  {
    title: "Live Chat",
    icon: MessageCircle,
    description: "Get instant help from our support team",
    availability: "24/7",
    buttonText: "Start Chat",
    buttonUrl: "#chat"
  },
  {
    title: "Email Support",
    icon: Mail,
    description: "Send us a detailed message",
    availability: "Response within 24 hours",
    buttonText: "Email Us",
    buttonUrl: "mailto:support@finrisk.com"
  },
  {
    title: "Phone Support",
    icon: Phone,
    description: "Speak directly with our team",
    availability: "Mon-Fri, 9AM-6PM EST",
    buttonText: "Call Now",
    buttonUrl: "tel:+15551234567"
  }
];

export default function Help() {
  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto px-4 pb-12"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            How can we help you?
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find answers to your questions with our comprehensive help resources
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search help articles..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>

        {/* Help Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {helpCategories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <category.icon className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {category.description}
              </p>
              <ul className="space-y-2">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.url}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Support Channels */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Need Additional Support?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportChannels.map((channel, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center"
              >
                <channel.icon className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {channel.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {channel.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                  {channel.availability}
                </p>
                <a
                  href={channel.buttonUrl}
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {channel.buttonText}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Popular Resources
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/faq"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              FAQ
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link
              to="/help/docs/getting-started"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Getting Started Guide
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link
              to="/help/video/tutorials"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Video Tutorials
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link
              to="/help/api/docs"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              API Documentation
            </Link>
          </div>
        </div>
      </motion.div>
    </PageLayout>
  );
}
