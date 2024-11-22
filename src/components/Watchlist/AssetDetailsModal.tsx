import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, DollarSign, BarChart2, TrendingUp } from 'lucide-react';
import { MarketData } from '../../hooks/useMarketData';
import { AssetChart } from '../TradingView/AssetChart';

interface AssetDetailsModalProps {
  asset: MarketData;
  isOpen: boolean;
  onClose: () => void;
}

export default function AssetDetailsModal({ asset, isOpen, onClose }: AssetDetailsModalProps) {
  if (!isOpen) return null;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                     md:w-[800px] md:h-[600px] bg-background rounded-xl shadow-xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-text">{asset.symbol}</h2>
                <span className="text-text-secondary">{asset.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`https://www.tradingview.com/symbols/${asset.symbol}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-surface rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-text-secondary" />
                </a>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-surface rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-text-secondary" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
              {/* Chart */}
              <div className="md:col-span-2 bg-surface rounded-lg p-4">
                <AssetChart symbol={asset.symbol} />
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div className="bg-surface rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-text mb-4">Market Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-text-secondary">
                        <DollarSign className="w-4 h-4" />
                        <span>Price</span>
                      </div>
                      <span className="font-medium text-text">
                        ${asset.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-text-secondary">
                        <TrendingUp className="w-4 h-4" />
                        <span>24h Change</span>
                      </div>
                      <span className={`font-medium ${
                        asset.change >= 0 ? 'text-success' : 'text-error'
                      }`}>
                        {asset.changePercent.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-text-secondary">
                        <BarChart2 className="w-4 h-4" />
                        <span>Volume</span>
                      </div>
                      <span className="font-medium text-text">
                        ${(asset.volume / 1e6).toFixed(2)}M
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-text-secondary">
                        <Calendar className="w-4 h-4" />
                        <span>Last Updated</span>
                      </div>
                      <span className="font-medium text-text">
                        {formatDate(asset.lastUpdated)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-text mb-4">Trading Range</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">24h High</span>
                      <span className="font-medium text-text">
                        ${asset.high24h.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">24h Low</span>
                      <span className="font-medium text-text">
                        ${asset.low24h.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">24h Open</span>
                      <span className="font-medium text-text">
                        ${asset.open24h.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
