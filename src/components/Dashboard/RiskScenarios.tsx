import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ExclamationTriangleIcon, ArrowTrendingDownIcon } from '@heroicons/react/20/solid';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Scenario {
  id: string;
  name: string;
  description: string;
  impact: number;
  probability: number;
  varChange: number;
  drawdown: number;
  timeline: string;
  affectedSectors: string[];
}

interface PortfolioImpact {
  baseline: number[];
  stressed: number[];
  recovery: number[];
}

const RiskScenarios: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string>('market-crash');
  
  const scenarios: Scenario[] = [
    {
      id: 'market-crash',
      name: 'Market Crash',
      description: 'Severe market downturn similar to 2008 financial crisis',
      impact: -35,
      probability: 0.15,
      varChange: 45,
      drawdown: 40,
      timeline: '12-18 months',
      affectedSectors: ['Financials', 'Real Estate', 'Consumer Discretionary']
    },
    {
      id: 'tech-bubble',
      name: 'Tech Bubble Burst',
      description: 'Technology sector correction similar to 2000',
      impact: -25,
      probability: 0.20,
      varChange: 35,
      drawdown: 30,
      timeline: '6-12 months',
      affectedSectors: ['Technology', 'Communication Services']
    },
    {
      id: 'inflation-shock',
      name: 'Inflation Shock',
      description: 'Rapid rise in inflation leading to aggressive rate hikes',
      impact: -20,
      probability: 0.30,
      varChange: 25,
      drawdown: 25,
      timeline: '12-24 months',
      affectedSectors: ['Utilities', 'Consumer Staples', 'Real Estate']
    }
  ];

  const getScenarioImpact = (scenarioId: string): PortfolioImpact => {
    // Simulate different impact patterns based on scenario
    const baseValue = 100;
    const timeline = Array.from({ length: 12 }, (_, i) => i + 1);
    
    switch (scenarioId) {
      case 'market-crash':
        return {
          baseline: timeline.map(() => baseValue),
          stressed: timeline.map((_, i) => baseValue * (1 - 0.35 * Math.min(i / 4, 1))),
          recovery: timeline.map((_, i) => baseValue * (0.65 + 0.2 * Math.min(i / 8, 1)))
        };
      case 'tech-bubble':
        return {
          baseline: timeline.map(() => baseValue),
          stressed: timeline.map((_, i) => baseValue * (1 - 0.25 * Math.min(i / 3, 1))),
          recovery: timeline.map((_, i) => baseValue * (0.75 + 0.15 * Math.min(i / 6, 1)))
        };
      case 'inflation-shock':
        return {
          baseline: timeline.map(() => baseValue),
          stressed: timeline.map((_, i) => baseValue * (1 - 0.20 * Math.min(i / 6, 1))),
          recovery: timeline.map((_, i) => baseValue * (0.80 + 0.12 * Math.min(i / 10, 1)))
        };
      default:
        return {
          baseline: timeline.map(() => baseValue),
          stressed: timeline.map(() => baseValue),
          recovery: timeline.map(() => baseValue)
        };
    }
  };

  const currentScenario = scenarios.find(s => s.id === selectedScenario)!;
  const impact = getScenarioImpact(selectedScenario);

  const chartData = {
    labels: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
    datasets: [
      {
        label: 'Baseline',
        data: impact.baseline,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        fill: false,
        tension: 0.4
      },
      {
        label: 'Stress Scenario',
        data: impact.stressed,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        fill: false,
        tension: 0.4
      },
      {
        label: 'Recovery Path',
        data: impact.recovery,
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.1)',
        fill: false,
        tension: 0.4,
        borderDash: [5, 5]
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Portfolio Value (%)'
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Risk Scenarios
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Analyze portfolio performance under different market conditions
          </p>
        </div>
      </div>

      {/* Scenario Selection */}
      <div className="grid grid-cols-3 gap-4">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => setSelectedScenario(scenario.id)}
            className={`p-4 rounded-lg text-left transition-all ${
              selectedScenario === scenario.id
                ? 'bg-blue-50 dark:bg-blue-900 border-2 border-blue-500'
                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <h3 className="font-medium text-gray-900 dark:text-white">
              {scenario.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {scenario.description}
            </p>
          </button>
        ))}
      </div>

      {/* Impact Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h3 className="text-lg font-medium mb-4">Portfolio Impact Simulation</h3>
        <div className="h-80">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Scenario Details */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <h3 className="text-lg font-medium mb-4">Scenario Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Maximum Impact</span>
              <span className="font-medium text-red-600">
                {currentScenario.impact}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Probability</span>
              <span className="font-medium">
                {(currentScenario.probability * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">VaR Change</span>
              <span className="font-medium text-orange-600">
                +{currentScenario.varChange}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Max Drawdown</span>
              <span className="font-medium text-red-600">
                {currentScenario.drawdown}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Recovery Timeline</span>
              <span className="font-medium">
                {currentScenario.timeline}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <h3 className="text-lg font-medium mb-4">Most Affected Sectors</h3>
          <div className="space-y-4">
            {currentScenario.affectedSectors.map((sector, index) => (
              <div
                key={sector}
                className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700"
              >
                <span className="text-gray-600 dark:text-gray-400">{sector}</span>
                <div className="flex items-center text-red-600">
                  <ArrowTrendingDownIcon className="h-5 w-5 mr-1" />
                  <span>High Impact</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Warning */}
      <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4 rounded">
        <div className="flex items-center">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400 mr-2" />
          <p className="text-sm text-yellow-700 dark:text-yellow-200">
            These scenarios are based on historical events and statistical models.
            Actual market conditions may vary significantly from these simulations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskScenarios;
