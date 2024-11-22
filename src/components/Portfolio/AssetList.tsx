import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserAssets } from '../../lib/api/portfolio';
import { usePortfolioStore } from '../../stores/portfolioStore';
import AssetRow from './AssetRow';

export default function AssetList() {
  const { user } = useAuth();
  const { assets, setAssets } = usePortfolioStore();

  useEffect(() => {
    if (user) {
      const loadAssets = async () => {
        try {
          const userAssets = await getUserAssets(user.uid);
          setAssets(userAssets);
        } catch (error) {
          console.error('Error loading assets:', error);
        }
      };
      loadAssets();
    }
  }, [user, setAssets]);

  if (!assets.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No assets in your portfolio. Add some to get started!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Symbol
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Purchase Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Current Value
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gain/Loss
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {assets.map((asset) => (
            <AssetRow key={asset.id} asset={asset} />
          ))}
        </tbody>
      </table>
    </div>
  );
}