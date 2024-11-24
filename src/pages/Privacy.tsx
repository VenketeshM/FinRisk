import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  Eye, 
  Server, 
  Share2, 
  Key, 
  Bell, 
  User, 
  Download, 
  Mail,
  FileText,
  AlertCircle,
  ChevronRight,
  X
} from 'lucide-react';
import PageLayout from '../components/PageLayout';

const Privacy = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const sections = [
    {
      id: 'data-collection',
      icon: Shield,
      title: 'Data Collection',
      content: 'We collect information that you provide directly to us, including personal information such as your name, email address, and any other information you choose to provide. We also automatically collect certain information about your device when you use our services.'
    },
    {
      id: 'data-usage',
      icon: Lock,
      title: 'Data Usage',
      content: 'We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect FinRisk and our users. We also use this information to offer you tailored content and to better understand the effectiveness of our services.'
    },
    {
      id: 'data-sharing',
      icon: Share2,
      title: 'Data Sharing',
      content: 'We do not share your personal information with companies, organizations, or individuals outside of FinRisk except in specific circumstances outlined in this policy. We may share non-personal information publicly and with our partners.'
    },
    {
      id: 'data-security',
      icon: Key,
      title: 'Data Security',
      content: 'We use industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. This includes encryption, secure servers, and regular security audits.'
    },
    {
      id: 'data-retention',
      icon: Server,
      title: 'Data Retention',
      content: 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law.'
    },
    {
      id: 'user-rights',
      icon: User,
      title: 'Your Rights',
      content: 'You have the right to access, correct, or delete your personal information. You can also object to or restrict certain processing of your information. Contact us to exercise these rights.'
    },
    {
      id: 'cookies',
      icon: Eye,
      title: 'Cookies & Tracking',
      content: 'We use cookies and similar tracking technologies to collect and track information about your usage of our services. You can control cookies through your browser settings.'
    },
    {
      id: 'notifications',
      icon: Bell,
      title: 'Communications',
      content: 'We may send you emails about our services, updates to our policies, or other administrative purposes. You can opt out of non-essential communications.'
    },
    {
      id: 'data-downloads',
      icon: Download,
      title: 'Data Downloads',
      content: 'You can request a copy of your personal data that we hold. We will provide this in a structured, commonly used format.'
    },
    {
      id: 'contact',
      icon: Mail,
      title: 'Contact Us',
      content: 'If you have any questions about this privacy policy or our practices, please contact our Data Protection Officer at privacy@finrisk.com.'
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
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            At FinRisk, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.
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

export default Privacy;
