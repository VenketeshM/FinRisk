import { useState } from 'react';
import { Plus } from 'lucide-react';
import AddAssetModal from './AddAssetModal';
import AssetList from './AssetList';

export default function Portfolio() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Portfolio</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Asset
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm">
        <AssetList />
      </div>

      {showAddModal && <AddAssetModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}