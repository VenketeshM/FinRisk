import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface OrderType {
  type: 'market' | 'limit';
  side: 'buy' | 'sell';
  symbol: string;
  quantity: number;
  price?: number;
}

const TradingInterface: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState(178.45);
  const [priceHistory, setPriceHistory] = useState<number[]>([]);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);

  // Generate initial price history
  useEffect(() => {
    const generatePriceHistory = () => {
      const history: number[] = [];
      const labels: string[] = [];
      let price = currentPrice - 5;

      for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setMinutes(date.getMinutes() - i);
        labels.push(date.toLocaleTimeString());
        
        price = price + (Math.random() - 0.48) * 0.5;
        history.push(price);
      }

      setPriceHistory(history);
      setTimeLabels(labels);
    };

    generatePriceHistory();
  }, [currentPrice]);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newPrice = currentPrice + (Math.random() - 0.48) * 0.5;
      setCurrentPrice(newPrice);
      
      setPriceHistory(prev => [...prev.slice(1), newPrice]);
      setTimeLabels(prev => {
        const newTime = new Date().toLocaleTimeString();
        return [...prev.slice(1), newTime];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPrice]);

  const chartData = {
    labels: timeLabels,
    datasets: [
      {
        label: selectedSymbol,
        data: priceHistory,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  const handleSubmitOrder = () => {
    const order: OrderType = {
      type: orderType,
      side: orderSide,
      symbol: selectedSymbol,
      quantity: Number(quantity),
      ...(orderType === 'limit' && { price: Number(limitPrice) }),
    };

    console.log('Submitting order:', order);
    // Here you would typically send the order to your backend
  };

  return (
    <div className="space-y-6">
      {/* Price Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {selectedSymbol}
            </h3>
            <div className="flex items-center mt-1">
              <span className="text-2xl font-bold text-gray-900 dark:text-white mr-2">
                ${currentPrice.toFixed(2)}
              </span>
              <div
                className={`flex items-center ${
                  priceHistory[priceHistory.length - 1] > priceHistory[priceHistory.length - 2]
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {priceHistory[priceHistory.length - 1] > priceHistory[priceHistory.length - 2] ? (
                  <ArrowUpIcon className="h-5 w-5" />
                ) : (
                  <ArrowDownIcon className="h-5 w-5" />
                )}
                <span className="text-sm font-medium ml-1">
                  {(((priceHistory[priceHistory.length - 1] - priceHistory[priceHistory.length - 2]) /
                    priceHistory[priceHistory.length - 2]) *
                    100).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
          <select
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
            className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
          >
            <option value="AAPL">AAPL</option>
            <option value="MSFT">MSFT</option>
            <option value="GOOGL">GOOGL</option>
            <option value="AMZN">AMZN</option>
          </select>
        </div>
        <div className="h-64">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Trading Form */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Place Order
        </h3>
        <div className="space-y-4">
          {/* Order Type Selection */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setOrderType('market')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                orderType === 'market'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Market Order
            </button>
            <button
              onClick={() => setOrderType('limit')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                orderType === 'limit'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Limit Order
            </button>
          </div>

          {/* Buy/Sell Selection */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setOrderSide('buy')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                orderSide === 'buy'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setOrderSide('sell')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                orderSide === 'sell'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Sell
            </button>
          </div>

          {/* Quantity Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
              placeholder="Enter quantity"
            />
          </div>

          {/* Limit Price Input (only for limit orders) */}
          {orderType === 'limit' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Limit Price
              </label>
              <input
                type="number"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                placeholder="Enter limit price"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmitOrder}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              orderSide === 'buy'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {orderSide === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradingInterface;
