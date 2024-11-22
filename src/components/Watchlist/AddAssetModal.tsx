import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Loader2 } from 'lucide-react';
import { useWatchlistStore } from '../../stores/watchlistStore';
import toast from 'react-hot-toast';
import axios from 'axios';

const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  symbol: string;
  description: string;
  type: string;
}

export default function AddAssetModal({ isOpen, onClose }: AddAssetModalProps) {
  const { assets, addAsset } = useWatchlistStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchAssets = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://finnhub.io/api/v1/search?q=${query}&token=${FINNHUB_API_KEY}`
      );

      if (response.data.result) {
        setSearchResults(
          response.data.result
            .filter((item: any) => 
              item.type === 'Common Stock' || 
              item.type === 'Crypto' || 
              item.type === 'Forex'
            )
            .slice(0, 10)
            .map((item: any) => ({
              symbol: item.symbol,
              description: item.description,
              type: item.type,
            }))
        );
      }
    } catch (err) {
      setError('Failed to search assets. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchAssets(value);
  };

  const handleAddAsset = (result: SearchResult) => {
    addAsset({
      symbol: result.symbol,
      name: result.description,
      category: result.type === 'Common Stock' 
        ? 'stock' 
        : result.type === 'Crypto' 
        ? 'crypto' 
        : 'forex',
    });
    toast.success(`${result.symbol} added to watchlist`);
    onClose();
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
              <h2 className="text-xl font-bold text-text">Add Asset to Watchlist</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            {/* Search */}
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  className="input-primary w-full pl-10"
                  placeholder="Search by symbol or company name..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
              </div>

              {/* Results */}
              <div className="mt-4 space-y-2 max-h-[300px] overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                  </div>
                ) : error ? (
                  <div className="text-center py-4 text-error">{error}</div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((result) => {
                    const isAdded = assets.some((a) => a.symbol === result.symbol);
                    return (
                      <button
                        key={result.symbol}
                        onClick={() => !isAdded && handleAddAsset(result)}
                        disabled={isAdded}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                          isAdded
                            ? 'bg-surface/50 cursor-not-allowed'
                            : 'hover:bg-surface'
                        }`}
                      >
                        <div>
                          <div className="font-medium text-text">{result.symbol}</div>
                          <div className="text-sm text-text-secondary">
                            {result.description}
                          </div>
                        </div>
                        <div className="text-sm text-text-secondary">
                          {result.type}
                        </div>
                      </button>
                    );
                  })
                ) : searchTerm ? (
                  <div className="text-center py-4 text-text-secondary">
                    No results found
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
