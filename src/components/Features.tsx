import { motion } from 'framer-motion';
import {
  BarChart2,
  Brain,
  LineChart,
  Lock,
  PieChart,
  Shield,
} from 'lucide-react';
import FeatureCard from './FeatureCard';

const features = [
  {
    title: 'Portfolio Management',
    description:
      'Track and optimize your investments with our intuitive portfolio management tools. Real-time updates and automated rebalancing keep you ahead.',
    icon: PieChart,
  },
  {
    title: 'Risk Assessment',
    description:
      'Advanced risk analysis using VaR and CVaR metrics. Understand and manage your exposure with professional-grade tools.',
    icon: Shield,
  },
  {
    title: 'Backtesting Engine',
    description:
      'Test your investment strategies against historical data. Validate your approach before risking real capital.',
    icon: LineChart,
  },
  {
    title: 'Predictive Analytics',
    description:
      'AI-powered market predictions and trend analysis. Stay ahead of market movements with machine learning insights.',
    icon: Brain,
  },
  {
    title: 'Real-Time Analytics',
    description:
      'Live charts, interactive dashboards, and instant market updates. Make informed decisions with real-time data.',
    icon: BarChart2,
  },
  {
    title: 'Enterprise Security',
    description:
      'Bank-grade encryption and security protocols protect your data. Multi-factor authentication and regular security audits.',
    icon: Lock,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Smart Investing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to analyze, predict, and succeed in your investment
            journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}