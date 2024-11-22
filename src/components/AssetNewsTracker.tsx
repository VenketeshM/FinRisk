import React, { useState, useEffect } from 'react';
import { Search, Clock, TrendingUp, ChartBar, DollarSign, Bitcoin, LineChart, Newspaper } from 'lucide-react';
import { motion } from 'framer-motion';

interface Asset {
  symbol: string;
  name: string;
  type: 'stock' | 'crypto' | 'forex';
  lastSearched: Date;
}

interface NewsItem {
  title: string;
  summary: string;
  source: string;
  url: string;
  relatedSymbols: string[];
  timestamp: Date;
}

export default function AssetNewsTracker() {
  const [searchHistory, setSearchHistory] = useState<Asset[]>([
    { symbol: 'AAPL', name: 'Apple Inc.', type: 'stock', lastSearched: new Date() },
    { symbol: 'BTC', name: 'Bitcoin', type: 'crypto', lastSearched: new Date() },
    { symbol: 'EUR/USD', name: 'Euro/US Dollar', type: 'forex', lastSearched: new Date() },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);

  // Simulated news data - Replace with actual API calls
  const mockNews: NewsItem[] = [
    {
      title: 'Apple's Latest Innovation Drives Stock Surge',
      summary: 'Tech giant unveils groundbreaking AI features...',
      source: 'TechNews',
      url: '#',
      relatedSymbols: ['AAPL'],
      timestamp: new Date(),
    },
    {
      title: 'Bitcoin Reaches New Heights',
      summary: 'Cryptocurrency market shows strong momentum...',
      source: 'CryptoDaily',
      url: '#',
      relatedSymbols: ['BTC'],
      timestamp: new Date(),
    },
  ];

  useEffect(() => {
    // Simulate fetching news for searched assets
    const fetchNews = () => {
      const relevantNews = mockNews.filter(news =>
        searchHistory.some(asset =>
          news.relatedSymbols.includes(asset.symbol)
        )
      );
      setRelatedNews(relevantNews);
    };

    fetchNews();
  }, [searchHistory]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // Implement actual asset search logic here
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'stock':
        return <ChartBar className="w-5 h-5 text-primary" />;
      case 'crypto':
        return <Bitcoin className="w-5 h-5 text-primary" />;
      case 'forex':
        return <DollarSign className="w-5 h-5 text-primary" />;
      default:
        return <TrendingUp className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Search and History Section */}
      <div className="card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              className="input-primary w-full pl-10"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-text mb-4">Recent Searches</h3>
        <div className="space-y-4">
          {searchHistory.map((asset, index) => (
            <motion.div
              key={asset.symbol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-background rounded-lg hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                {getAssetIcon(asset.type)}
                <div>
                  <h4 className="font-medium text-text">{asset.symbol}</h4>
                  <p className="text-sm text-text-secondary">{asset.name}</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-text-secondary">
                <Clock className="w-4 h-4 mr-1" />
                {new Date(asset.lastSearched).toLocaleTimeString()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* News Section */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text">Related News</h3>
          <div className="flex items-center text-text-secondary">
            <Newspaper className="w-5 h-5 mr-2" />
            <span>Live Updates</span>
          </div>
        </div>

        <div className="space-y-4">
          {relatedNews.map((news, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-background rounded-lg hover:shadow-md transition-all duration-300"
            >
              <h4 className="font-medium text-text mb-2">{news.title}</h4>
              <p className="text-sm text-text-secondary mb-3">{news.summary}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-primary">{news.source}</span>
                <div className="flex items-center text-text-secondary">
                  <Clock className="w-4 h-4 mr-1" />
                  {new Date(news.timestamp).toLocaleTimeString()}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {news.relatedSymbols.map((symbol) => (
                  <span
                    key={symbol}
                    className="tag"
                  >
                    {symbol}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Financial Doodles */}
        <div className="absolute -z-10 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {/* Candlestick Pattern */}
            <g transform="translate(20,20)">
              <line x1="0" y1="80" x2="160" y2="80" stroke="currentColor" strokeWidth="1" />
              {[0, 40, 80, 120].map((x, i) => (
                <g key={i} transform={`translate(${x},0)`}>
                  <line x1="10" y1="40" x2="10" y2="120" stroke="currentColor" strokeWidth="1" />
                  <rect x="5" y={60 - i * 10} width="10" height={40 + i * 20} stroke="currentColor" fill="none" />
                </g>
              ))}
            </g>

            {/* Statistical Formulas */}
            <g transform="translate(20,140)">
              <text className="text-xs" fill="currentColor">μ = Σx/n</text>
              <text className="text-xs" y="20" fill="currentColor">σ² = Σ(x-μ)²/n</text>
            </g>

            {/* Trend Lines */}
            <path
              d="M20,180 Q60,140 100,160 T180,120"
              stroke="currentColor"
              fill="none"
              className="animate-chart"
            />
          </svg>
        </div>
      </div>

      {/* Mathematical Doodles Overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 doodle-pattern opacity-[0.02]" />
      </div>
    </div>
  );
}
