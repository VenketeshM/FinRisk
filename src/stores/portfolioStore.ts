import { create } from 'zustand';
import { Asset } from '../lib/api/portfolio';

interface PortfolioState {
  assets: Asset[];
  setAssets: (assets: Asset[]) => void;
  addAsset: (asset: Asset) => void;
  updateAsset: (id: string, data: Partial<Asset>) => void;
  deleteAsset: (id: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  assets: [],
  setAssets: (assets) => set({ assets }),
  addAsset: (asset) =>
    set((state) => ({ assets: [...state.assets, asset] })),
  updateAsset: (id, data) =>
    set((state) => ({
      assets: state.assets.map((asset) =>
        asset.id === id ? { ...asset, ...data } : asset
      ),
    })),
  deleteAsset: (id) =>
    set((state) => ({
      assets: state.assets.filter((asset) => asset.id !== id),
    })),
}));