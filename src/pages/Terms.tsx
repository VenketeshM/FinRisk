import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Shield,
  AlertCircle,
  Bell,
  Book,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  ChevronRight
} from 'lucide-react';
import PageLayout from '../components/PageLayout';

const Terms = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const sections = [
    {
      id: 'acceptance',
      icon: CheckCircle,
      title: 'Acceptance of Terms',
      content: 'By accessing or using FinRisk services, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.'
    },
    {
      id: 'services',
      icon: Shield,
      title: 'Services Description',
      content: 'FinRisk provides financial risk management tools and services. We reserve the right to modify, suspend, or discontinue any part of our services at any time.'
    },
    {
      id: 'account',
      icon: Book,
      title: 'Account Responsibilities',
      content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of any unauthorized use.'
    },
    {
      id: 'restrictions',
      icon: XCircle,
      title: 'Use Restrictions',
      content: 'You agree not to misuse our services or help anyone else do so. This includes unauthorized access, interference with services, or violation of any laws.'
    },
    {
      id: 'data',
      icon: Shield,
      title: 'Data Usage',
      content: 'Your use of our services is also governed by our Privacy Policy. By using FinRisk, you agree to our data collection and usage practices as described in the Privacy Policy.'
    },
    {
      id: 'intellectual',
      icon: FileText,
      title: 'Intellectual Property',
      content: 'All content, features, and functionality of FinRisk services are owned by us and protected by international copyright, trademark, and other intellectual property laws.'
    },
    {
      id: 'disclaimer',
      icon: AlertTriangle,
      title: 'Disclaimers',
      content: 'FinRisk services are provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or timeliness of any information.'
    },
    {
      id: 'liability',
      icon: AlertCircle,
      title: 'Limitation of Liability',
      content: 'We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.'
    },
    {
      id: 'termination',
      icon: XCircle,
      title: 'Termination',
      content: 'We may terminate or suspend your access to our services immediately, without prior notice, for any breach of these Terms of Use.'
    },
    {
      id: 'changes',
      icon: Bell,
      title: 'Changes to Terms',
      content: 'We may modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.'
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
            Terms of Use
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Please read these terms carefully before using our services.
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
            to="/legal-disclaimer"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Legal Disclaimer
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

export default Terms;
