import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PortfolioValueProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
}

export default function PortfolioValue({
  title,
  value,
  change,
  icon: Icon,
}: PortfolioValueProps) {
  const isPositive = change.startsWith('+');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600">{title}</h3>
        <Icon className="w-5 h-5 text-indigo-600" />
      </div>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <span
          className={`ml-2 text-sm ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {change}
        </span>
      </div>
    </motion.div>
  );
}