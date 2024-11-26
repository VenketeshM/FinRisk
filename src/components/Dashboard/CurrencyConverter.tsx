import React, { useState, useEffect } from 'react';
import { ArrowsRightLeftIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface ExchangeRate {
  currency: string;
  rate: number;
  change: number;
}

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('1000');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [result, setResult] = useState<number>(0);

  // Mock exchange rates data
  const [rates] = useState<ExchangeRate[]>([
    { currency: 'USD', rate: 1.0000, change: 0 },
    { currency: 'EUR', rate: 0.8500, change: -0.15 },
    { currency: 'GBP', rate: 0.7200, change: 0.25 },
    { currency: 'JPY', rate: 110.50, change: -0.45 },
    { currency: 'AUD', rate: 1.3500, change: 0.12 },
    { currency: 'CAD', rate: 1.2800, change: -0.08 },
    { currency: 'CHF', rate: 0.9200, change: 0.18 },
    { currency: 'CNY', rate: 6.4500, change: -0.22 },
    { currency: 'INR', rate: 74.5000, change: 0.35 }
  ]);

  useEffect(() => {
    // Convert currency whenever inputs change
    const fromRate = rates.find(r => r.currency === fromCurrency)?.rate || 1;
    const toRate = rates.find(r => r.currency === toCurrency)?.rate || 1;
    const converted = (parseFloat(amount) || 0) * (toRate / fromRate);
    setResult(converted);
  }, [amount, fromCurrency, toCurrency, rates]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    }).format(num);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Currency Converter
          </h2>
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
                         dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 
                         dark:hover:bg-gray-700">
            <ArrowPathIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 
                     border border-gray-300 dark:border-gray-600 
                     rounded-lg focus:outline-none focus:ring-2 
                     focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          {/* Currency Selection */}
          <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center">
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 
                     border border-gray-300 dark:border-gray-600 
                     rounded-lg focus:outline-none focus:ring-2 
                     focus:ring-blue-500"
            >
              {rates.map((rate) => (
                <option key={rate.currency} value={rate.currency}>
                  {rate.currency}
                </option>
              ))}
            </select>

            <button
              onClick={swapCurrencies}
              className="p-2 text-gray-500 hover:text-gray-700 
                     dark:text-gray-400 dark:hover:text-gray-300 
                     rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowsRightLeftIcon className="h-5 w-5" />
            </button>

            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 
                     border border-gray-300 dark:border-gray-600 
                     rounded-lg focus:outline-none focus:ring-2 
                     focus:ring-blue-500"
            >
              {rates.map((rate) => (
                <option key={rate.currency} value={rate.currency}>
                  {rate.currency}
                </option>
              ))}
            </select>
          </div>

          {/* Result Display */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {formatNumber(parseFloat(amount) || 0)} {fromCurrency} =
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1">
              {formatNumber(result)} {toCurrency}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              1 {fromCurrency} = {formatNumber(result / (parseFloat(amount) || 1))} {toCurrency}
            </div>
          </div>

          {/* Recent Rates */}
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Recent Rates
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {rates.slice(0, 6).map((rate) => (
                <div
                  key={rate.currency}
                  className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {rate.currency}
                  </div>
                  <div className={`text-xs ${
                    rate.change > 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {rate.change > 0 ? '+' : ''}{rate.change}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
