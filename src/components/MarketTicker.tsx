import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function MarketTicker() {
  const [marketData, setMarketData] = useState<MarketData[]>([
    { symbol: 'BTC/USD', price: 43250.50, change: 1250.75, changePercent: 2.98 },
    { symbol: 'ETH/USD', price: 2280.25, change: -45.50, changePercent: -1.96 },
    { symbol: 'S&P 500', price: 4780.85, change: 23.45, changePercent: 0.49 },
    { symbol: 'NASDAQ', price: 15234.75, change: -89.30, changePercent: -0.58 },
    { symbol: 'EUR/USD', price: 1.0925, change: 0.0045, changePercent: 0.41 },
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMarketData(prevData =>
        prevData.map(item => ({
          ...item,
          price: item.price + (Math.random() - 0.5) * (item.price * 0.001),
          change: item.change + (Math.random() - 0.5) * 0.5,
          changePercent: item.changePercent + (Math.random() - 0.5) * 0.1,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-surface border-y border-border overflow-hidden">
      <div className="animate-ticker flex whitespace-nowrap">
        {marketData.concat(marketData).map((item, index) => (
          <div
            key={index}
            className="inline-flex items-center px-4 py-2 space-x-2"
          >
            <span className="font-semibold text-text">{item.symbol}</span>
            <span className="text-text-secondary">
              {item.price.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <div
              className={`flex items-center ${
                item.change >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {item.change >= 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              <span>
                {item.changePercent >= 0 ? '+' : ''}
                {item.changePercent.toFixed(2)}%
              </span>
            </div>
            <span className="mx-4 text-border">|</span>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes ticker {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-ticker {
            animation: ticker 30s linear infinite;
          }
          
          .animate-ticker:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </div>
  );
}
