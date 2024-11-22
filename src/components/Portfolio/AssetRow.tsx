import { useState } from 'react';
import { Asset, deleteAsset, updateAsset } from '../../lib/api/portfolio';
import { usePortfolioStore } from '../../stores/portfolioStore';

interface AssetRowProps {
  asset: Asset;
}

export default function AssetRow({ asset }: AssetRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(asset.quantity.toString());
  const updateAssetInStore = usePortfolioStore((state) => state.updateAsset);
  const deleteAssetFromStore = usePortfolioStore((state) => state.deleteAsset);

  const handleUpdate = async () => {
    if (!asset.id) return;

    try {
      await updateAsset(asset.id, { quantity: Number(quantity) });
      updateAssetInStore(asset.id, { quantity: Number(quantity) });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating asset:', error);
    }
  };

  const handleDelete = async () => {
    if (!asset.id) return;

    try {
      await deleteAsset(asset.id);
      deleteAssetFromStore(asset.id);
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {asset.symbol}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {asset.type}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {isEditing ? (
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-24 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        ) : (
          asset.quantity
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${asset.purchasePrice.toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${(asset.quantity * asset.purchasePrice).toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        $0.00
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {isEditing ? (
          <div className="space-x-2">
            <button
              onClick={handleUpdate}
              className="text-indigo-600 hover:text-indigo-900"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-indigo-600 hover:text-indigo-900"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-900"
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}