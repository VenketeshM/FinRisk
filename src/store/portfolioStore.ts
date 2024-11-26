import create from 'zustand';

export interface Asset {
  symbol: string;
  name: string;
  type: 'Stock' | 'Crypto' | 'Bond' | 'Commodity' | 'Cash';
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  value: number;
  change24h: number;
  changePercentage24h: number;
}

interface PortfolioState {
  assets: Asset[];
  totalValue: number;
  dailyChange: number;
  dailyChangePercentage: number;
  riskScore: number;
  loading: boolean;
  error: string | null;
  
  // Actions
  addAsset: (asset: Asset) => void;
  updateAsset: (symbol: string, updates: Partial<Asset>) => void;
  removeAsset: (symbol: string) => void;
  fetchPortfolioData: () => Promise<void>;
}

const usePortfolioStore = create<PortfolioState>((set, get) => ({
  assets: [],
  totalValue: 0,
  dailyChange: 0,
  dailyChangePercentage: 0,
  riskScore: 0,
  loading: false,
  error: null,

  addAsset: (asset) => {
    set((state) => ({
      assets: [...state.assets, asset],
      totalValue: state.totalValue + asset.value,
    }));
  },

  updateAsset: (symbol, updates) => {
    set((state) => ({
      assets: state.assets.map((asset) =>
        asset.symbol === symbol ? { ...asset, ...updates } : asset
      ),
    }));
  },

  removeAsset: (symbol) => {
    set((state) => {
      const assetToRemove = state.assets.find((a) => a.symbol === symbol);
      return {
        assets: state.assets.filter((a) => a.symbol !== symbol),
        totalValue: state.totalValue - (assetToRemove?.value || 0),
      };
    });
  },

  fetchPortfolioData: async () => {
    set({ loading: true, error: null });
    try {
      // Replace with actual API call
      const mockData = {
        assets: [
          {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            type: 'Stock' as const,
            quantity: 100,
            averagePrice: 150.25,
            currentPrice: 175.84,
            value: 17584,
            change24h: 425,
            changePercentage24h: 2.5,
          },
          {
            symbol: 'BTC',
            name: 'Bitcoin',
            type: 'Crypto' as const,
            quantity: 0.5,
            averagePrice: 35000,
            currentPrice: 40000,
            value: 20000,
            change24h: 1000,
            changePercentage24h: 5.0,
          },
        ],
        totalValue: 37584,
        dailyChange: 1425,
        dailyChangePercentage: 3.75,
        riskScore: 7.5,
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      set({
        assets: mockData.assets,
        totalValue: mockData.totalValue,
        dailyChange: mockData.dailyChange,
        dailyChangePercentage: mockData.dailyChangePercentage,
        riskScore: mockData.riskScore,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch portfolio data',
        loading: false,
      });
    }
  },
}));

export default usePortfolioStore;
