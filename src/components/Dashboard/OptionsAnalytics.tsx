import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';

interface OptionGreeks {
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
}

interface OptionData {
  strike: number;
  expiryDate: string;
  type: 'call' | 'put';
  premium: number;
  greeks: OptionGreeks;
}

const OptionsAnalytics: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<OptionData>({
    strike: 15000,
    expiryDate: '2024-03-28',
    type: 'call',
    premium: 250.75,
    greeks: {
      delta: 0.65,
      gamma: 0.02,
      theta: -0.45,
      vega: 0.15
    }
  });

  const categories = [
    { name: 'Option Chain', icon: ChartBarIcon },
    { name: 'Greeks', icon: ChartPieIcon },
    { name: 'Payoff', icon: ArrowTrendingUpIcon },
    { name: 'Strategy Builder', icon: CurrencyDollarIcon }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Options Analytics
          </h2>
          <button className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 
                         dark:bg-blue-900/30 dark:text-blue-400 rounded-lg 
                         hover:bg-blue-100 dark:hover:bg-blue-900/50
                         transition-colors duration-200">
            New Strategy
          </button>
        </div>

        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-700/50 p-1">
            {categories.map((category) => (
              <Tab
                key={category.name}
                className={({ selected }) =>
                  `w-full py-2 text-sm font-medium leading-5 rounded-lg
                  ${selected
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/[0.12] hover:text-blue-600'
                  }
                  `
                }
              >
                <div className="flex items-center justify-center space-x-2">
                  <category.icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </div>
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-4">
            {/* Option Chain Panel */}
            <Tab.Panel>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Strike Price
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        value={selectedOption.strike}
                        onChange={(e) => setSelectedOption({
                          ...selectedOption,
                          strike: parseFloat(e.target.value)
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 
                               border border-gray-300 dark:border-gray-600 
                               rounded-lg focus:outline-none focus:ring-2 
                               focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Expiry Date
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        value={selectedOption.expiryDate}
                        onChange={(e) => setSelectedOption({
                          ...selectedOption,
                          expiryDate: e.target.value
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 
                               border border-gray-300 dark:border-gray-600 
                               rounded-lg focus:outline-none focus:ring-2 
                               focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>

            {/* Greeks Panel */}
            <Tab.Panel>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(selectedOption.greeks).map(([greek, value]) => (
                  <div key={greek} className="bg-gray-50 dark:bg-gray-700/50 
                                          rounded-lg p-3">
                    <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {greek}
                    </div>
                    <div className="mt-1 text-lg font-medium text-gray-900 dark:text-gray-100">
                      {value.toFixed(3)}
                    </div>
                  </div>
                ))}
              </div>
            </Tab.Panel>

            {/* Payoff Panel */}
            <Tab.Panel>
              <div className="h-64 flex items-center justify-center 
                           bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Payoff diagram will be rendered here
                </span>
              </div>
            </Tab.Panel>

            {/* Strategy Builder Panel */}
            <Tab.Panel>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Selected Strategy
                  </div>
                  <select
                    className="px-3 py-1.5 bg-white dark:bg-gray-700 
                           border border-gray-300 dark:border-gray-600 
                           rounded-lg text-sm focus:outline-none focus:ring-2 
                           focus:ring-blue-500"
                  >
                    <option>Bull Call Spread</option>
                    <option>Bear Put Spread</option>
                    <option>Iron Condor</option>
                    <option>Butterfly</option>
                  </select>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Strategy Details
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Max Profit: ₹5,000 | Max Loss: ₹2,000
                    <br />
                    Break-even: ₹15,250
                  </div>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default OptionsAnalytics;
