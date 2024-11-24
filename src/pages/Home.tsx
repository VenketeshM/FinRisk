import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Shield, 
  BarChart3, 
  PieChart,
  Zap,
  RefreshCw,
  Users,
  Lock,
  CheckCircle2,
  ArrowRight, 
  BarChart2, 
  LineChart, 
  Bell, 
  CheckCircle,
  Activity,
  DollarSign,
  User,
  Star,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import ReviewCarousel from "../components/ReviewCarousel";

export default function Home() {
  const { user } = useAuth();

  // Memoize static content
  const reviews = useMemo(() => [
    {
      name: "Rajesh Sharma",
      role: "Senior Portfolio Manager",
      company: "Axis Mutual Fund",
      image: "/avatars/rajesh.jpg",
      content: "FinRisk has transformed how we manage risk at Axis. The AI-powered insights have helped us make better investment decisions.",
      rating: 5,
      helpfulCount: 156,
      isVerified: true,
      date: "1 week ago"
    },
    {
      name: "Priya Patel",
      role: "Research Analyst",
      company: "HDFC Securities",
      image: "/avatars/priya.jpg",
      content: "The real-time monitoring and custom alerts have made our risk management process much more efficient and proactive.",
      rating: 5,
      helpfulCount: 142,
      isVerified: true,
      date: "2 weeks ago"
    },
    {
      name: "Arun Mehta",
      role: "Risk Manager",
      company: "Kotak Mahindra Bank",
      image: "/avatars/arun.jpg",
      content: "FinRisk's portfolio optimization tools have consistently helped us achieve better risk-adjusted returns for our clients.",
      rating: 5,
      helpfulCount: 98,
      isVerified: true,
      date: "3 weeks ago"
    }
  ], []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <AnimatePresence>
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-8"
              >
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8"
                >
                  Advanced{" "}
                  <span className="relative">
                    <span className="text-blue-600">Financial Risk</span>
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                    />
                  </span>
                  <br />Management
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                  className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12"
                >
                  AI-powered portfolio analysis and risk management platform for modern investors
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                  className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
                >
                  <Link
                    to={user ? '/dashboard' : '/signup'}
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span>Get Started</span>
                    <motion.span 
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </Link>
                  <Link
                    to="#features"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stats Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
              >
                {[
                  { value: '10K+', label: 'Active Users' },
                  { value: '95%', label: 'Success Rate' },
                  { value: '24/7', label: 'Support' },
                  { value: '$1B+', label: 'Assets Managed' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    className="text-center"
                  >
                    <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatePresence>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features for Smart Investing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Advanced tools and analytics to help you make informed investment decisions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "AI-Powered Risk Analysis",
                description: "Advanced machine learning algorithms analyze market patterns and predict potential risks with high accuracy",
                icon: "/icons/brain-circuit.svg",
                color: "bg-blue-100 dark:bg-blue-900/20",
              },
              {
                title: "Portfolio Optimization",
                description: "Smart allocation strategies to maximize returns while minimizing risk exposure",
                icon: "/icons/line-chart.svg",
                color: "bg-green-100 dark:bg-green-900/20",
              },
              {
                title: "Real-time Monitoring",
                description: "24/7 tracking of your investments with instant updates on market movements",
                icon: "/icons/activity.svg",
                color: "bg-red-100 dark:bg-red-900/20",
              },
              {
                title: "Custom Alerts",
                description: "Personalized notifications for price changes, risk levels, and market opportunities",
                icon: "/icons/bell-ring.svg",
                color: "bg-yellow-100 dark:bg-yellow-900/20",
              },
              {
                title: "Market Intelligence",
                description: "Comprehensive market insights and analysis from global financial experts",
                icon: "/icons/globe.svg",
                color: "bg-purple-100 dark:bg-purple-900/20",
              },
              {
                title: "Secure Infrastructure",
                description: "Bank-grade security measures to protect your sensitive financial data",
                icon: "/icons/shield-check.svg",
                color: "bg-indigo-100 dark:bg-indigo-900/20",
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <img 
                      src={feature.icon} 
                      alt={feature.title}
                      className={`w-8 h-8 text-gray-900 dark:text-white`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Transparent Pricing for Every Need
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the perfect plan that aligns with your financial goals. All plans include our core risk management features.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$49",
                period: "per month",
                description: "Perfect for individual investors and beginners",
                features: [
                  "Basic Risk Analysis",
                  "Portfolio Tracking",
                  "Market Alerts",
                  "Email Support",
                  "Mobile App Access"
                ],
                highlighted: false,
                cta: "Get Started"
              },
              {
                name: "Professional",
                price: "$99",
                period: "per month",
                description: "Ideal for active traders and investment professionals",
                features: [
                  "Advanced Risk Analytics",
                  "Real-time Portfolio Monitoring",
                  "Custom Alert Configuration",
                  "Priority Support",
                  "API Access",
                  "Advanced Reports",
                  "Team Collaboration"
                ],
                highlighted: true,
                cta: "Start Free Trial"
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "custom billing",
                description: "For large organizations and institutional investors",
                features: [
                  "Enterprise Risk Management",
                  "Dedicated Account Manager",
                  "Custom Integration",
                  "24/7 Premium Support",
                  "Unlimited Users",
                  "Custom Analytics",
                  "SLA Guarantee"
                ],
                highlighted: false,
                cta: "Contact Sales"
              }
            ].map((plan) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`relative rounded-2xl ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white shadow-xl scale-105'
                    : 'bg-white dark:bg-gray-800 shadow-lg'
                } p-8`}
              >
                {plan.highlighted && (
                  <span className="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                )}
                <div className="text-center">
                  <h3 className={`text-2xl font-bold mb-2 ${!plan.highlighted && 'text-gray-900 dark:text-white'}`}>
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className={`text-sm ${plan.highlighted ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`mb-6 ${plan.highlighted ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}`}>
                    {plan.description}
                  </p>
                  <ul className="mb-8 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center justify-center">
                        <CheckCircle2 className={`w-5 h-5 mr-2 ${
                          plan.highlighted ? 'text-blue-100' : 'text-blue-500'
                        }`} />
                        <span className={plan.highlighted ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
                      plan.highlighted
                        ? 'bg-white text-blue-600 hover:bg-blue-50'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Trusted by India's Top Financial Institutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              See what leading professionals from India's premier financial institutions say about FinRisk
            </p>
          </motion.div>

          <ReviewCarousel reviews={reviews} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have questions about our platform? Message us directly on WhatsApp.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <form onSubmit={(e) => {
                e.preventDefault();
                const name = (document.getElementById('name') as HTMLInputElement).value;
                const email = (document.getElementById('email') as HTMLInputElement).value;
                const message = (document.getElementById('message') as HTMLTextAreaElement).value;
                
                // Format the message for WhatsApp
                const whatsappMessage = `*New Message from FinRisk Contact Form*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A%0A*Message:*%0A${message}`;
                
                // Open WhatsApp with the formatted message
                window.open(`https://wa.me/917907758505?text=${whatsappMessage}`, '_blank');
                
                // Reset form
                (e.target as HTMLFormElement).reset();
              }} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label 
                    htmlFor="message" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 font-medium text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <span>Send via WhatsApp</span>
                  <Send className="w-5 h-5" />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
