import React, { useState, useEffect } from 'react';
import { useMarketData } from '../../hooks/useMarketData';
import { useWatchlistStore, WatchlistAsset } from '../../stores/watchlistStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Trash2, Plus, Search, Wallet } from 'lucide-react';
import AddAssetModal from './AddAssetModal';
import PriceAlertModal from './PriceAlertModal';
import PortfolioModal from './PortfolioModal';
import toast from 'react-hot-toast';

export default function WatchlistPanel() {
  const { assets, removeAsset, markAlertTriggered } = useWatchlistStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [showAddAsset, setShowAddAsset] = useState(false);
  const [showPriceAlert, setShowPriceAlert] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const { data: marketData, isLoading, error } = useMarketData(
    assets.map((a) => a.symbol)
  );

  // Check for triggered alerts
  useEffect(() => {
    assets.forEach((asset) => {
      const price = marketData?.[asset.symbol]?.price;
      if (!price) return;

      asset.alerts.forEach((alert) => {
        if (alert.triggered) return;

        const triggered =
          (alert.type === 'above' && price >= alert.price) ||
          (alert.type === 'below' && price <= alert.price);

        if (triggered) {
          markAlertTriggered(asset.symbol, alert.id);
          toast.success(
            `Price Alert: ${asset.symbol} is ${
              alert.type === 'above' ? 'above' : 'below'
            } $${alert.price}`
          );
        }
      });
    });
  }, [marketData, assets, markAlertTriggered]);

  const filteredAssets = assets.filter((asset) =>
    asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateTotalValue = () => {
    return assets.reduce((total, asset) => {
      const price = marketData?.[asset.symbol]?.price || 0;
      const quantity = asset.portfolio?.quantity || 0;
      return total + price * quantity;
    }, 0);
  };

  const calculateTotalProfitLoss = () => {
    return assets.reduce((total, asset) => {
      const price = marketData?.[asset.symbol]?.price || 0;
      const quantity = asset.portfolio?.quantity || 0;
      const avgPrice = asset.portfolio?.averagePrice || 0;
      return total + quantity * (price - avgPrice);
    }, 0);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text">Watchlist</h2>
          <button
            onClick={() => setShowAddAsset(true)}
            className="btn-primary px-3 py-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Asset
          </button>
        </div>

        {/* Portfolio Summary */}
        {assets.some((a) => a.portfolio) && (
          <div className="bg-surface p-4 rounded-lg mb-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary">Total Value:</span>
              <span className="font-medium text-text">
                ${calculateTotalValue().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Total P/L:</span>
              <span
                className={`font-medium ${
                  calculateTotalProfitLoss() >= 0 ? 'text-success' : 'text-error'
                }`}
              >
                ${calculateTotalProfitLoss().toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assets..."
            className="input-primary pl-10 w-full"
          />
        </div>
      </div>

      {/* Asset List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {isLoading ? (
          <div className="text-center py-4 text-text-secondary">
            Loading assets...
          </div>
        ) : error ? (
          <div className="text-center py-4 text-error">
            Error loading market data
          </div>
        ) : filteredAssets.length === 0 ? (
          <div className="text-center py-4 text-text-secondary">
            No assets found
          </div>
        ) : (
          filteredAssets.map((asset) => {
            const data = marketData?.[asset.symbol];
            if (!data) return null;

            const priceChange = data.price - data.previousClose;
            const percentChange = (priceChange / data.previousClose) * 100;

            return (
              <motion.div
                key={asset.symbol}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-surface p-4 rounded-lg"
              >
                {/* Asset Header */}
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-text">{asset.symbol}</h3>
                    <p className="text-sm text-text-secondary">{asset.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Price Alert Button */}
                    <button
                      onClick={() => {
                        setSelectedAsset(asset.symbol);
                        setShowPriceAlert(true);
                      }}
                      className={`p-2 hover:bg-background rounded-lg transition-colors ${
                        asset.alerts.length > 0 ? 'text-primary' : 'text-text-secondary'
                      }`}
                    >
                      <Bell className="w-4 h-4" />
                    </button>

                    {/* Portfolio Button */}
                    <button
                      onClick={() => {
                        setSelectedAsset(asset.symbol);
                        setShowPortfolio(true);
                      }}
                      className={`p-2 hover:bg-background rounded-lg transition-colors ${
                        asset.portfolio ? 'text-primary' : 'text-text-secondary'
                      }`}
                    >
                      <Wallet className="w-4 h-4" />
                    </button>

                    {/* Remove Button */}
                    <button
                      onClick={() => {
                        removeAsset(asset.symbol);
                        toast.success('Asset removed from watchlist');
                      }}
                      className="p-2 hover:bg-background rounded-lg transition-colors text-error"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Price Information */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-text">
                    ${data.price.toFixed(2)}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      percentChange >= 0 ? 'text-success' : 'text-error'
                    }`}
                  >
                    {percentChange >= 0 ? '+' : ''}
                    {percentChange.toFixed(2)}%
                  </span>
                </div>

                {/* Portfolio Summary (if exists) */}
                {asset.portfolio && (
                  <div className="mt-2 pt-2 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Position:</span>
                      <span className="text-text">
                        {asset.portfolio.quantity} @ ${asset.portfolio.averagePrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Value:</span>
                      <span className="text-text">
                        ${(asset.portfolio.quantity * data.price).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">P/L:</span>
                      <span
                        className={
                          asset.portfolio.quantity * (data.price - asset.portfolio.averagePrice) >= 0
                            ? 'text-success'
                            : 'text-error'
                        }
                      >
                        ${(
                          asset.portfolio.quantity *
                          (data.price - asset.portfolio.averagePrice)
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })
        )}
      </div>

      {/* Modals */}
      <AddAssetModal isOpen={showAddAsset} onClose={() => setShowAddAsset(false)} />

      {selectedAsset && marketData?.[selectedAsset] && (
        <>
          <PriceAlertModal
            symbol={selectedAsset}
            currentPrice={marketData[selectedAsset].price}
            isOpen={showPriceAlert}
            onClose={() => {
              setShowPriceAlert(false);
              setSelectedAsset(null);
            }}
          />

          <PortfolioModal
            symbol={selectedAsset}
            currentPrice={marketData[selectedAsset].price}
            isOpen={showPortfolio}
            onClose={() => {
              setShowPortfolio(false);
              setSelectedAsset(null);
            }}
          />
        </>
      )}
    </div>
  );
}
