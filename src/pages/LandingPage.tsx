import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChartBarIcon,
  CubeTransparentIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const LandingPage: React.FC = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <ChartBarIcon className="h-6 w-6" />,
      title: 'Advanced Analytics',
      description: 'Real-time market analysis powered by cutting-edge AI algorithms',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: <CubeTransparentIcon className="h-6 w-6" />,
      title: 'Portfolio Optimization',
      description: 'AI-driven portfolio balancing for optimal risk-adjusted returns',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      title: 'Risk Management',
      description: 'Sophisticated risk assessment and scenario analysis tools',
      color: 'from-purple-500 to-violet-600'
    }
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime' },
    { value: '<50ms', label: 'Latency' },
    { value: '256-bit', label: 'Encryption' },
    { value: '24/7', label: 'Support' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-8">
              <span className="block">Next Generation</span>
              <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Financial Intelligence
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
              Harness the power of artificial intelligence for smarter trading decisions
              and portfolio management.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                to="/dashboard"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Launch Platform
              </Link>
              <a
                href="#features"
                className="px-8 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-all duration-200 backdrop-blur-lg"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Powerful Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl transition-all duration-300 group-hover:blur-2xl" />
                <div className="relative p-8 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className={`inline-block p-3 rounded-lg bg-gradient-to-r ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 bg-gradient-to-b from-black/50 to-gray-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="mt-2 text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-8">Ready to Transform Your Trading?</h2>
            <Link
              to="/dashboard"
              className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
