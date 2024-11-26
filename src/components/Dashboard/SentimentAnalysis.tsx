import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SentimentData {
  date: string;
  sentiment: number;
  volume: number;
  source: string;
  keywords: string[];
}

const SentimentAnalysis: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M'>('1W');
  
  // Mock sentiment data
  const mockSentimentData: SentimentData[] = [
    { date: '2024-01-01', sentiment: 0.8, volume: 1200, source: 'Twitter', keywords: ['growth', 'earnings'] },
    { date: '2024-01-02', sentiment: 0.6, volume: 1500, source: 'News', keywords: ['market', 'forecast'] },
    { date: '2024-01-03', sentiment: 0.3, volume: 2000, source: 'Reddit', keywords: ['risk', 'volatility'] },
    { date: '2024-01-04', sentiment: 0.7, volume: 1800, source: 'Twitter', keywords: ['bullish', 'tech'] },
    { date: '2024-01-05', sentiment: 0.5, volume: 1600, source: 'News', keywords: ['economy', 'rates'] },
    { date: '2024-01-06', sentiment: 0.9, volume: 2200, source: 'Reddit', keywords: ['rally', 'stocks'] },
    { date: '2024-01-07', sentiment: 0.4, volume: 1900, source: 'Twitter', keywords: ['bearish', 'correction'] },
  ];

  const chartData = {
    labels: mockSentimentData.map(d => d.date),
    datasets: [
      {
        label: 'Market Sentiment',
        data: mockSentimentData.map(d => d.sentiment * 100),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.4
      },
      {
        label: 'Volume',
        data: mockSentimentData.map(d => (d.volume / 30)),
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        tension: 0.4,
        yAxisID: 'y1'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Sentiment Score (%)'
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Volume'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const getOverallSentiment = () => {
    const avgSentiment = mockSentimentData.reduce((acc, curr) => acc + curr.sentiment, 0) / mockSentimentData.length;
    if (avgSentiment >= 0.7) return { text: 'Bullish', color: 'text-green-600' };
    if (avgSentiment >= 0.4) return { text: 'Neutral', color: 'text-yellow-600' };
    return { text: 'Bearish', color: 'text-red-600' };
  };

  const sentiment = getOverallSentiment();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Market Sentiment Analysis
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Real-time sentiment analysis from social media and news sources
          </p>
        </div>
        <div className="flex space-x-2">
          {(['1D', '1W', '1M'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 rounded ${
                timeframe === t
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Overall Sentiment</h3>
          <p className={`text-2xl font-bold mt-1 ${sentiment.color}`}>
            {sentiment.text}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Volume</h3>
          <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
            {mockSentimentData.reduce((acc, curr) => acc + curr.volume, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Top Sources</h3>
          <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
            Twitter, News
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <div className="h-80">
          <Line options={chartOptions} data={chartData} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h3 className="text-lg font-medium mb-4">Trending Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(mockSentimentData.flatMap(d => d.keywords))).map((keyword) => (
            <span
              key={keyword}
              className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm dark:bg-blue-900 dark:text-blue-200"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysis;
