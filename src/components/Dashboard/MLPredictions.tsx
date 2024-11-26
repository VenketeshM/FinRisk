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
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/20/solid';

// Register ChartJS components
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

interface PredictionData {
  symbol: string;
  currentPrice: number;
  predictedPrice: number;
  confidence: number;
  timeline: string;
  trend: 'up' | 'down';
  priceHistory: number[];
  predictedRange: {
    upper: number[];
    lower: number[];
    mean: number[];
  };
}

const MLPredictions: React.FC = () => {
  // Mock data - replace with actual ML predictions
  const [predictions] = useState<PredictionData[]>([
    {
      symbol: 'AAPL',
      currentPrice: 178.32,
      predictedPrice: 185.45,
      confidence: 0.85,
      timeline: '7 days',
      trend: 'up',
      priceHistory: [176.2, 177.1, 178.3, 177.8, 178.32],
      predictedRange: {
        upper: [179, 180, 182, 184, 186],
        lower: [177, 176, 177, 178, 180],
        mean: [178, 178.5, 179.5, 181, 183]
      }
    },
    {
      symbol: 'GOOGL',
      currentPrice: 142.65,
      predictedPrice: 138.20,
      confidence: 0.78,
      timeline: '7 days',
      trend: 'down',
      priceHistory: [145.2, 144.1, 143.5, 142.9, 142.65],
      predictedRange: {
        upper: [143, 142, 141, 140, 139],
        lower: [141, 140, 138, 137, 136],
        mean: [142, 141, 139.5, 138.5, 137.5]
      }
    }
  ]);

  const getChartData = (prediction: PredictionData) => {
    const labels = [...Array(5)].map((_, i) => `Day ${i + 1}`);
    
    return {
      labels,
      datasets: [
        {
          label: 'Historical',
          data: prediction.priceHistory,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'Predicted Range',
          data: prediction.predictedRange.mean,
          borderColor: 'rgba(53, 162, 235, 0.5)',
          backgroundColor: 'rgba(53, 162, 235, 0.1)',
          fill: true,
          tension: 0.1
        }
      ]
    };
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
        ticks: {
          callback: (value: number) => `$${value.toFixed(2)}`
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {predictions.map((prediction) => (
        <motion.div
          key={prediction.symbol}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {prediction.symbol}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {prediction.timeline} Forecast
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                ${prediction.currentPrice.toFixed(2)}
              </div>
              <div
                className={`flex items-center space-x-1 ${
                  prediction.trend === 'up'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {prediction.trend === 'up' ? (
                  <ArrowTrendingUpIcon className="h-5 w-5" />
                ) : (
                  <ArrowTrendingDownIcon className="h-5 w-5" />
                )}
                <span className="font-medium">
                  ${Math.abs(prediction.predictedPrice - prediction.currentPrice).toFixed(2)}
                  {prediction.trend === 'up' ? ' ↑' : ' ↓'}
                </span>
              </div>
            </div>
          </div>

          <div className="h-64">
            <Line data={getChartData(prediction)} options={chartOptions} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Predicted Price
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                ${prediction.predictedPrice.toFixed(2)}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Confidence Level
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {(prediction.confidence * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MLPredictions;
