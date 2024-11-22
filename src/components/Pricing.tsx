import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Student',
    price: 'Free',
    description: 'Perfect for learning and exploring investment strategies',
    features: [
      'Basic portfolio tracking',
      'Limited historical data (3 years)',
      'Basic risk analysis tools',
      'Educational resources',
      'Community forum access',
    ],
  },
  {
    name: 'Investor',
    price: '$29',
    description: 'Advanced tools for serious retail investors',
    features: [
      'Real-time portfolio tracking',
      'Full historical data access',
      'Advanced risk analytics',
      'Market trend analysis',
      'Basic predictive models',
      'Email support',
      'API access (100 calls/day)',
    ],
  },
  {
    name: 'Professional',
    price: '$99',
    description: 'Enterprise-grade tools for financial professionals',
    features: [
      'Everything in Investor plan',
      'AI-powered predictions',
      'Custom backtesting engine',
      'Advanced ML models',
      'Real-time alerts',
      'Priority 24/7 support',
      'Unlimited API access',
      'Custom reporting',
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that best fits your investment needs. All plans include
            our core features with varying levels of access.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="h-full p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.price !== 'Free' && (
                      <span className="text-gray-600 ml-2">/month</span>
                    )}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full py-3 px-6 text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}