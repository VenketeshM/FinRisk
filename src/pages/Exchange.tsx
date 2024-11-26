import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowsRightLeftIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';

// Mock exchange rate data - will be replaced with API data
const mockExchangeRates = {
  'USD': {
    'EUR': 0.92,
    'GBP': 0.79,
    'JPY': 149.50,
    'AUD': 1.52,
    'CAD': 1.35,
    'CHF': 0.88,
    'CNY': 7.23,
    'INR': 83.25,
  },
  'EUR': {
    'USD': 1.09,
    'GBP': 0.86,
    'JPY': 162.50,
    'AUD': 1.65,
    'CAD': 1.47,
    'CHF': 0.96,
    'CNY': 7.86,
    'INR': 90.50,
  }
};

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
];

const Exchange: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('1000');
  const [showCurrencyFrom, setShowCurrencyFrom] = useState(false);
  const [showCurrencyTo, setShowCurrencyTo] = useState(false);

  const rate = mockExchangeRates[fromCurrency as keyof typeof mockExchangeRates]?.[toCurrency] || 0;
  const convertedAmount = parseFloat(amount) * rate;

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="space-y-6">
      {/* Exchange Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm 
                   border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Currency Exchange
          </h2>

          <div className="space-y-6">
            {/* From Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                From
              </label>
              <div className="relative">
                <div className="flex">
                  <button
                    onClick={() => setShowCurrencyFrom(!showCurrencyFrom)}
                    className="flex-shrink-0 px-4 py-2.5 border border-r-0 border-gray-200 
                             dark:border-gray-700 rounded-l-lg bg-gray-50 dark:bg-gray-900/50
                             text-gray-900 dark:text-gray-100 hover:bg-gray-100 
                             dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{fromCurrency}</span>
                      <ChevronDownIcon className="h-4 w-4" />
                    </div>
                  </button>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 
                             rounded-r-lg bg-white dark:bg-gray-900/30 text-gray-900 
                             dark:text-gray-100 focus:outline-none focus:ring-2 
                             focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                </div>
                {showCurrencyFrom && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 
                               rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 
                               py-1 z-10">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setFromCurrency(currency.code);
                          setShowCurrencyFrom(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 
                                 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {currency.code} - {currency.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSwapCurrencies}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 
                         text-gray-600 dark:text-gray-300 hover:bg-gray-200 
                         dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <ArrowsRightLeftIcon className="h-5 w-5" />
              </button>
            </div>

            {/* To Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                To
              </label>
              <div className="relative">
                <div className="flex">
                  <button
                    onClick={() => setShowCurrencyTo(!showCurrencyTo)}
                    className="flex-shrink-0 px-4 py-2.5 border border-r-0 border-gray-200 
                             dark:border-gray-700 rounded-l-lg bg-gray-50 dark:bg-gray-900/50
                             text-gray-900 dark:text-gray-100 hover:bg-gray-100 
                             dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{toCurrency}</span>
                      <ChevronDownIcon className="h-4 w-4" />
                    </div>
                  </button>
                  <div className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 
                              rounded-r-lg bg-gray-50 dark:bg-gray-900/30 text-gray-900 
                              dark:text-gray-100">
                    {convertedAmount.toFixed(2)}
                  </div>
                </div>
                {showCurrencyTo && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 
                               rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 
                               py-1 z-10">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setToCurrency(currency.code);
                          setShowCurrencyTo(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 
                                 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {currency.code} - {currency.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Exchange Rate Info */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Exchange Rate</span>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-900 dark:text-gray-100">
                    1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
                  </span>
                  <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700
                                 text-gray-500 dark:text-gray-400 transition-colors duration-200">
                    <ArrowPathIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Rates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm 
                   border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Recent Rates
          </h2>

          <div className="space-y-4">
            {Object.entries(mockExchangeRates[fromCurrency as keyof typeof mockExchangeRates] || {}).map(([currency, rate]) => (
              <div
                key={currency}
                className="flex items-center justify-between p-3 rounded-lg
                         hover:bg-gray-50 dark:hover:bg-gray-700/50 
                         transition-colors duration-200"
              >
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {fromCurrency}/{currency}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {currencies.find(c => c.code === currency)?.name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {rate.toFixed(4)}
                  </div>
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                    <span>+0.12%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Exchange;
