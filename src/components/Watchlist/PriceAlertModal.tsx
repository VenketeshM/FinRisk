import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useWatchlistStore, PriceAlert } from '../../stores/watchlistStore';
import toast from 'react-hot-toast';

interface PriceAlertModalProps {
  symbol: string;
  currentPrice: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function PriceAlertModal({
  symbol,
  currentPrice,
  isOpen,
  onClose,
}: PriceAlertModalProps) {
  const { assets, addAlert, removeAlert } = useWatchlistStore();
  const asset = assets.find((a) => a.symbol === symbol);
  const [alertType, setAlertType] = useState<'above' | 'below'>('above');
  const [alertPrice, setAlertPrice] = useState<string>(currentPrice.toString());

  const handleAddAlert = () => {
    const price = parseFloat(alertPrice);
    if (isNaN(price)) {
      toast.error('Please enter a valid price');
      return;
    }

    if (alertType === 'above' && price <= currentPrice) {
      toast.error('Alert price must be above current price');
      return;
    }

    if (alertType === 'below' && price >= currentPrice) {
      toast.error('Alert price must be below current price');
      return;
    }

    addAlert(symbol, {
      type: alertType,
      price,
    });

    toast.success('Price alert added successfully');
    setAlertPrice(currentPrice.toString());
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
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
                <Bell className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-text">Price Alerts for {symbol}</h2>
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
              {/* Add New Alert */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text">Add New Alert</h3>
                <div className="flex items-center gap-4">
                  <select
                    value={alertType}
                    onChange={(e) => setAlertType(e.target.value as 'above' | 'below')}
                    className="input-primary flex-1"
                  >
                    <option value="above">Price goes above</option>
                    <option value="below">Price goes below</option>
                  </select>
                  <input
                    type="number"
                    value={alertPrice}
                    onChange={(e) => setAlertPrice(e.target.value)}
                    className="input-primary flex-1"
                    placeholder="Enter price..."
                    step="0.01"
                  />
                  <button
                    onClick={handleAddAlert}
                    className="btn-primary px-4 py-2"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Existing Alerts */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text">Existing Alerts</h3>
                <div className="space-y-2">
                  {asset?.alerts.length === 0 ? (
                    <p className="text-text-secondary text-center py-4">
                      No alerts set for this asset
                    </p>
                  ) : (
                    asset?.alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          alert.triggered ? 'bg-surface/50' : 'bg-surface'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {alert.type === 'above' ? (
                            <ArrowUp className={`w-4 h-4 ${
                              alert.triggered ? 'text-text-secondary' : 'text-success'
                            }`} />
                          ) : (
                            <ArrowDown className={`w-4 h-4 ${
                              alert.triggered ? 'text-text-secondary' : 'text-error'
                            }`} />
                          )}
                          <div>
                            <div className="font-medium text-text">
                              ${alert.price.toFixed(2)}
                            </div>
                            <div className="text-sm text-text-secondary">
                              {formatDate(alert.createdAt)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {alert.triggered && (
                            <span className="text-sm text-text-secondary">
                              Triggered
                            </span>
                          )}
                          <button
                            onClick={() => {
                              removeAlert(symbol, alert.id);
                              toast.success('Alert removed successfully');
                            }}
                            className="p-2 hover:bg-background rounded-lg transition-colors text-error"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
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
