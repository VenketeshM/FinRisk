import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle,
  AlertCircle,
  Scale,
  FileText,
  DollarSign,
  Shield,
  Gavel,
  Info,
  ChevronRight
} from 'lucide-react';
import PageLayout from '../components/PageLayout';

const LegalDisclaimer = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const sections = [
    {
      id: 'general',
      icon: AlertTriangle,
      title: 'General Disclaimer',
      content: 'The information provided on FinRisk is for general informational purposes only. We make no representations or warranties about the accuracy, completeness, or reliability of any content.'
    },
    {
      id: 'financial',
      icon: DollarSign,
      title: 'Financial Disclaimer',
      content: 'FinRisk does not provide financial advice. All financial information is for educational purposes only. Past performance is not indicative of future results. Always consult with qualified professionals before making investment decisions.'
    },
    {
      id: 'risk',
      icon: AlertCircle,
      title: 'Risk Warning',
      content: 'Financial markets involve substantial risks, including complete loss of funds. You should carefully consider whether trading or investing is appropriate for you in light of your financial condition.'
    },
    {
      id: 'accuracy',
      icon: Scale,
      title: 'Data Accuracy',
      content: 'While we strive to provide accurate and up-to-date information, we cannot guarantee that all information is accurate or current at all times. Market data may be delayed or incorrect.'
    },
    {
      id: 'liability',
      icon: Shield,
      title: 'Limitation of Liability',
      content: 'FinRisk shall not be liable for any damages arising from the use of our platform, including but not limited to direct, indirect, incidental, punitive, and consequential damages.'
    },
    {
      id: 'compliance',
      icon: Gavel,
      title: 'Regulatory Compliance',
      content: 'Our services are subject to various financial regulations. Users are responsible for ensuring their use of FinRisk complies with all applicable laws and regulations in their jurisdiction.'
    },
    {
      id: 'thirdparty',
      icon: FileText,
      title: 'Third-Party Content',
      content: 'Links to third-party websites and content are provided for convenience only. We do not endorse or control third-party content and are not responsible for any damage or loss caused by third-party services.'
    },
    {
      id: 'changes',
      icon: Info,
      title: 'Changes to Service',
      content: 'We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without notice. We are not liable for any modification, suspension, or discontinuation.'
    }
  ];

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
            Legal Disclaimer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Important information about the use of FinRisk services and platform.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Last updated: 24/11/2024
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Navigation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <section.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">{section.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={false}
              animate={{
                height: selectedSection === section.id ? 'auto' : '80px',
                opacity: 1
              }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => setSelectedSection(selectedSection === section.id ? null : section.id)}
                className="w-full p-6 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <section.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h3>
                </div>
                <ChevronRight
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    selectedSection === section.id ? 'rotate-90' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {selectedSection === section.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-600 dark:text-gray-400">
                      {section.content}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
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
            to="/cookie-settings"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Cookie Settings
          </Link>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default LegalDisclaimer;
