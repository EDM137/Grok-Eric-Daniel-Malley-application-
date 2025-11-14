
import React from 'react';
import type { IpAsset } from '../types';
import { XMarkIcon } from './icons/XMarkIcon';
import { CodeBracketIcon } from './icons/CodeBracketIcon';
import { DocumentIcon } from './icons/DocumentIcon';
import { CpuChipIcon } from './icons/CpuChipIcon';

const getIconForType = (type: IpAsset['type']) => {
  switch (type) {
    case 'CODE': return <CodeBracketIcon className="w-6 h-6" />;
    case 'SYSTEM': return <CpuChipIcon className="w-6 h-6" />;
    default: return <DocumentIcon className="w-6 h-6" />;
  }
};

interface IpAssetDetailModalProps {
  asset: IpAsset;
  onClose: () => void;
}

const IpAssetDetailModal: React.FC<IpAssetDetailModalProps> = ({ asset, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-900 border border-cyan-500/50 rounded-lg shadow-2xl shadow-cyan-900/50 max-w-2xl w-full m-4 transform animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-cyan-500/20 flex justify-between items-center">
            <div className="flex items-center space-x-3">
                <div className="text-cyan-400">{getIconForType(asset.type)}</div>
                <h2 className="font-bold text-xl text-cyan-400 tracking-wide">{asset.name}</h2>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label="Close asset details"
            >
                <XMarkIcon className="w-6 h-6" />
            </button>
        </div>

        <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-black/20 p-2 rounded-md"><span className="font-semibold text-gray-400 block">Source:</span> {asset.source}</div>
                <div className="bg-black/20 p-2 rounded-md"><span className="font-semibold text-gray-400 block">Type:</span> {asset.type}</div>
                 <div className="bg-black/20 p-2 rounded-md">
                   <span className="font-semibold text-gray-400 block">Status:</span>
                   <span className={`px-2 py-0.5 text-xs rounded-full ${
                      asset.status === 'FILED' ? 'bg-green-500/30 text-green-300' : 'bg-blue-500/30 text-blue-300'
                    }`}>
                      {asset.status}
                    </span>
                 </div>
            </div>

            <div className="bg-black/30 p-4 rounded-md border border-gray-700 max-h-80 overflow-y-auto">
                <h3 className="text-gray-400 font-semibold mb-2">Asset Content</h3>
                <p className="text-gray-300 whitespace-pre-wrap font-mono text-xs leading-relaxed">
                  {asset.content}
                </p>
            </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px) scale(0.98); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default IpAssetDetailModal;