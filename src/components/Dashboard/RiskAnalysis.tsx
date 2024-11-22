import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import { getUserAssets } from '../../lib/api/portfolio';
import { calculateVaR } from '../../lib/api/risk';

export default function RiskAnalysis() {
  const { user } = useAuth();
  
  const { data: assets } = useQuery({
    queryKey: ['assets', user?.uid],
    queryFn: () => (user ? getUserAssets(user.uid) : Promise.resolve([])),
    enabled: !!user,
  });
  
  const var95 = assets ? calculateVaR(assets, 0.95) : 0;
  const var99 = assets ? calculateVaR(assets, 0.99) : 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-sm"
    >
      <h3 className="text-gray-900 font-semibold mb-4">Risk Analysis</h3>
      
      <div className="space-y-4">
        <div className="border-b border-gray-100 pb-4">
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-gray-600">Value at Risk (95%)</span>
            <span className="text-lg font-semibold text-gray-900">
              ${var95.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Maximum potential loss at 95% confidence level
          </p>
        </div>
        
        <div className="border-b border-gray-100 pb-4">
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-gray-600">Value at Risk (99%)</span>
            <span className="text-lg font-semibold text-gray-900">
              ${var99.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Maximum potential loss at 99% confidence level
          </p>
        </div>
        
        <div>
          <button className="w-full py-2 text-indigo-600 hover:text-indigo-700">
            View Detailed Risk Report
          </button>
        </div>
      </div>
    </motion.div>
  );
}