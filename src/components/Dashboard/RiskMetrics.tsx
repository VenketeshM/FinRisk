import { motion } from 'framer-motion';

const metrics = [
  { name: 'Value at Risk (VaR)', value: '$12,450', description: '95% confidence' },
  { name: 'Sharpe Ratio', value: '1.8', description: 'Risk-adjusted return' },
  { name: 'Beta', value: '0.85', description: 'Market correlation' },
];

export default function RiskMetrics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm 
                 border border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-gray-900 dark:text-gray-100 font-semibold mb-4">Risk Metrics</h3>
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.name} 
               className="border-b border-gray-100 dark:border-gray-700 
                        pb-4 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 
                        rounded-lg transition-colors duration-200">
            <div className="flex justify-between items-baseline mb-1 px-3 pt-2">
              <span className="text-gray-600 dark:text-gray-300">{metric.name}</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {metric.value}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 px-3">{metric.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}