import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import PageLayout from '../components/PageLayout';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: "Getting Started",
    question: "How do I get started with FinRisk?",
    answer: "Getting started with FinRisk is easy! First, create an account using your email. Then, complete our quick onboarding process where you'll specify your risk preferences and financial goals. Our platform will guide you through setting up your first risk assessment and portfolio analysis."
  },
  {
    category: "Getting Started",
    question: "What types of financial instruments can I analyze?",
    answer: "FinRisk supports a wide range of financial instruments including stocks, bonds, derivatives, ETFs, mutual funds, and cryptocurrencies. You can analyze individual assets or entire portfolios, with support for custom instruments and complex financial products."
  },
  {
    category: "Pricing & Plans",
    question: "What subscription plans do you offer?",
    answer: "We offer three main subscription tiers: Basic (free), Professional ($49/month), and Enterprise (custom pricing). Each tier includes different features and capabilities, with the ability to upgrade or downgrade at any time. Annual subscriptions receive a 20% discount."
  },
  {
    category: "Pricing & Plans",
    question: "Can I try FinRisk before subscribing?",
    answer: "Yes! We offer a 14-day free trial of our Professional plan with full access to all features. No credit card is required for the trial. You can also use our Basic plan indefinitely with limited features."
  },
  {
    category: "Security",
    question: "How secure is my financial data?",
    answer: "Security is our top priority. We use bank-level encryption (256-bit SSL), multi-factor authentication, and regular security audits. Your data is stored in secure, redundant data centers with 24/7 monitoring. We're compliant with major financial regulations including GDPR and SOC 2."
  },
  {
    category: "Security",
    question: "Can I export or delete my data?",
    answer: "Yes, you have full control over your data. You can export your data in various formats (CSV, JSON, PDF) at any time. You can also request complete deletion of your account and associated data through your account settings or by contacting support."
  },
  {
    category: "Features",
    question: "What risk metrics do you calculate?",
    answer: "We calculate comprehensive risk metrics including Value at Risk (VaR), Sharpe Ratio, Beta, Alpha, Maximum Drawdown, and many more. Our platform also provides custom risk metrics, stress testing, and scenario analysis capabilities."
  },
  {
    category: "Features",
    question: "Do you provide real-time market data?",
    answer: "Yes, we provide real-time market data through partnerships with major data providers. Data updates vary by subscription tier: Basic users get 15-minute delayed data, while Professional and Enterprise users get real-time data with additional premium data sources."
  },
  {
    category: "Technical",
    question: "Does FinRisk offer API access?",
    answer: "Yes, we provide a comprehensive REST API for Professional and Enterprise users. The API allows you to integrate FinRisk's risk analytics into your own applications, automate workflows, and access data programmatically. Detailed API documentation is available."
  },
  {
    category: "Technical",
    question: "What programming languages do you support for custom analytics?",
    answer: "Our platform supports custom analytics in Python, R, and JavaScript. You can upload your own models, use our Jupyter notebook integration, or leverage our built-in code editor for custom calculations and analysis."
  }
];

const categories = Array.from(new Set(faqData.map(item => item.category)));

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [openQuestions, setOpenQuestions] = useState<Set<number>>(new Set());

  const toggleQuestion = (index: number) => {
    const newOpenQuestions = new Set(openQuestions);
    if (openQuestions.has(index)) {
      newOpenQuestions.delete(index);
    } else {
      newOpenQuestions.add(index);
    }
    setOpenQuestions(newOpenQuestions);
  };

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-4 pb-12"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Frequently Asked Questions</h1>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqData
            .filter((item) => item.category === activeCategory)
            .map((item, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{ backgroundColor: openQuestions.has(index) ? 'rgba(59, 130, 246, 0.1)' : 'transparent' }}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left"
                >
                  <span className="font-medium text-gray-900 dark:text-white">{item.question}</span>
                  {openQuestions.has(index) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>

                <AnimatePresence>
                  {openQuestions.has(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our support team is here to help. Contact us through any of these channels:
          </p>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              📧 Email: support@finrisk.com
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              💬 Live Chat: Available 24/7 through the app
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              📱 Phone: +1 (555) 123-4567 (Mon-Fri, 9AM-6PM EST)
            </p>
          </div>
        </div>
      </motion.div>
    </PageLayout>
  );
}
