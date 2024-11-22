import { motion } from 'framer-motion';
import { BarChart2, PieChart, Wallet } from 'lucide-react';
import MarketNews from './MarketNews';
import PortfolioChart from './PortfolioChart';
import PortfolioValue from './PortfolioValue';
import RiskAnalysis from './RiskAnalysis';
import RiskMetrics from './RiskMetrics';

export default function Dashboard() {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <PortfolioValue
            title="Total Portfolio Value"
            value="$124,500.00"
            change="+2.5%"
            icon={Wallet}
          />
          <PortfolioValue
            title="Today's Return"
            value="$3,240.00"
            change="+2.1%"
            icon={BarChart2}
          />
          <PortfolioValue
            title="Total Return"
            value="$24,500.00"
            change="+24.5%"
            icon={PieChart}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PortfolioChart />
            <RiskAnalysis />
          </div>
          <div className="space-y-6">
            <RiskMetrics />
            <MarketNews />
          </div>
        </div>
      </motion.div>
    </div>
  );
}