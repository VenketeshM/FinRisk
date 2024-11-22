import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { RiskMetrics, formatRiskMetrics } from '../../lib/analysis/riskMetrics';

interface RiskMetricsCardProps {
  metrics: RiskMetrics;
  title: string;
}

export default function RiskMetricsCard({ metrics, title }: RiskMetricsCardProps) {
  const formattedMetrics = formatRiskMetrics(metrics);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <Activity className="w-5 h-5 text-blue-500" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(formattedMetrics).map(([key, value]) => (
          <div key={key} className="space-y-1">
            <p className="text-sm text-gray-500">{key}</p>
            <p className="text-lg font-medium text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Last updated</span>
          <span className="text-sm text-gray-900">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
