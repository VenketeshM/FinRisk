import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, Trash2 } from 'lucide-react';
import { useWatchlistStore } from '../../stores/watchlistStore';
import toast from 'react-hot-toast';

interface PortfolioModalProps {
  symbol: string;
  currentPrice: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function PortfolioModal({
  symbol,
  currentPrice,
  isOpen,
  onClose,
}: PortfolioModalProps) {
  const { assets, updatePortfolio, removePortfolio } = useWatchlistStore();
  const asset = assets.find((a) => a.symbol === symbol);
  const [quantity, setQuantity] = useState<string>(
    asset?.portfolio?.quantity.toString() || ''
  );
  const [averagePrice, setAveragePrice] = useState<string>(
    asset?.portfolio?.averagePrice.toString() || currentPrice.toString()
  );

  const handleUpdatePortfolio = () => {
    const qty = parseFloat(quantity);
    const price = parseFloat(averagePrice);

    if (isNaN(qty) || qty <= 0) {
      toast.error('Please enter a valid quantity');
      return;
    }

    if (isNaN(price) || price <= 0) {
      toast.error('Please enter a valid average price');
      return;
    }

    updatePortfolio(symbol, qty, price);
    toast.success('Portfolio position updated successfully');
  };

  const calculatePositionValue = () => {
    const qty = parseFloat(quantity);
    if (isNaN(qty)) return 0;
    return qty * currentPrice;
  };

  const calculateProfitLoss = () => {
    const qty = parseFloat(quantity);
    const avgPrice = parseFloat(averagePrice);
    if (isNaN(qty) || isNaN(avgPrice)) return 0;
    return qty * (currentPrice - avgPrice);
  };

  const calculateProfitLossPercentage = () => {
    const pl = calculateProfitLoss();
    const avgPrice = parseFloat(averagePrice);
    const qty = parseFloat(quantity);
    if (isNaN(avgPrice) || isNaN(qty) || avgPrice * qty === 0) return 0;
    return (pl / (avgPrice * qty)) * 100;
  };

  if (!isOpen) return null;

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
                     md:w-[500px] bg-background rounded-xl shadow-xl z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <Wallet className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-text">Portfolio Position - {symbol}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-6">
              {/* Position Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-primary">Quantity</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="input-primary w-full"
                      placeholder="Enter quantity..."
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="label-primary">Average Price</label>
                    <input
                      type="number"
                      value={averagePrice}
                      onChange={(e) => setAveragePrice(e.target.value)}
                      className="input-primary w-full"
                      placeholder="Enter average price..."
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Position Summary */}
                {quantity && averagePrice && (
                  <div className="bg-surface p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Current Value:</span>
                      <span className="font-medium text-text">
                        ${calculatePositionValue().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Profit/Loss:</span>
                      <span className={`font-medium ${
                        calculateProfitLoss() >= 0 ? 'text-success' : 'text-error'
                      }`}>
                        ${calculateProfitLoss().toFixed(2)} ({calculateProfitLossPercentage().toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    onClick={handleUpdatePortfolio}
                    className="btn-primary flex-1"
                  >
                    Update Position
                  </button>
                  {asset?.portfolio && (
                    <button
                      onClick={() => {
                        removePortfolio(symbol);
                        toast.success('Portfolio position removed');
                        onClose();
                      }}
                      className="btn-error px-4"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
