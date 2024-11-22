import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WatchlistAsset {
  symbol: string;
  name: string;
  category: 'stock' | 'crypto' | 'forex';
  alerts: PriceAlert[];
  portfolio?: {
    quantity: number;
    averagePrice: number;
  };
}

export interface PriceAlert {
  id: string;
  type: 'above' | 'below';
  price: number;
  triggered: boolean;
  createdAt: Date;
}

interface WatchlistStore {
  assets: WatchlistAsset[];
  addAsset: (asset: Omit<WatchlistAsset, 'alerts'>) => void;
  removeAsset: (symbol: string) => void;
  addAlert: (symbol: string, alert: Omit<PriceAlert, 'id' | 'triggered' | 'createdAt'>) => void;
  removeAlert: (symbol: string, alertId: string) => void;
  updatePortfolio: (symbol: string, quantity: number, averagePrice: number) => void;
  removePortfolio: (symbol: string) => void;
  markAlertTriggered: (symbol: string, alertId: string) => void;
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set) => ({
      assets: [],
      
      addAsset: (asset) =>
        set((state) => ({
          assets: state.assets.some((a) => a.symbol === asset.symbol)
            ? state.assets
            : [...state.assets, { ...asset, alerts: [] }],
        })),

      removeAsset: (symbol) =>
        set((state) => ({
          assets: state.assets.filter((a) => a.symbol !== symbol),
        })),

      addAlert: (symbol, alert) =>
        set((state) => ({
          assets: state.assets.map((asset) =>
            asset.symbol === symbol
              ? {
                  ...asset,
                  alerts: [
                    ...asset.alerts,
                    {
                      ...alert,
                      id: Math.random().toString(36).substr(2, 9),
                      triggered: false,
                      createdAt: new Date(),
                    },
                  ],
                }
              : asset
          ),
        })),

      removeAlert: (symbol, alertId) =>
        set((state) => ({
          assets: state.assets.map((asset) =>
            asset.symbol === symbol
              ? {
                  ...asset,
                  alerts: asset.alerts.filter((alert) => alert.id !== alertId),
                }
              : asset
          ),
        })),

      updatePortfolio: (symbol, quantity, averagePrice) =>
        set((state) => ({
          assets: state.assets.map((asset) =>
            asset.symbol === symbol
              ? {
                  ...asset,
                  portfolio: {
                    quantity,
                    averagePrice,
                  },
                }
              : asset
          ),
        })),

      removePortfolio: (symbol) =>
        set((state) => ({
          assets: state.assets.map((asset) =>
            asset.symbol === symbol
              ? {
                  ...asset,
                  portfolio: undefined,
                }
              : asset
          ),
        })),

      markAlertTriggered: (symbol, alertId) =>
        set((state) => ({
          assets: state.assets.map((asset) =>
            asset.symbol === symbol
              ? {
                  ...asset,
                  alerts: asset.alerts.map((alert) =>
                    alert.id === alertId
                      ? { ...alert, triggered: true }
                      : alert
                  ),
                }
              : asset
          ),
        })),
    }),
    {
      name: 'watchlist-storage',
    }
  )
);
