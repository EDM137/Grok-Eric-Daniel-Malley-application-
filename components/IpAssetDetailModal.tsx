import React, { useState } from 'react';
import type { IpAsset } from '../types';
import { XMarkIcon } from './icons/XMarkIcon';
import { CodeBracketIcon } from './icons/CodeBracketIcon';
import { DocumentIcon } from './icons/DocumentIcon';
import { CpuChipIcon } from './icons/CpuChipIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { KeyIcon } from './icons/KeyIcon';
import CodeBlock from './CodeBlock';

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

const statusTooltips: Record<IpAsset['status'], string> = {
  SECURE: 'Asset is verified and stored securely within the sovereign vault.',
  PENDING: 'Asset is awaiting verification or processing.',
  FILED: 'Asset has been successfully filed with the relevant authority (e.g., USPTO).',
};

const IpAssetDetailModal: React.FC<IpAssetDetailModalProps> = ({ asset, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isHashCopied, setIsHashCopied] = useState(false);

  const handleCopyContent = () => {
    navigator.clipboard.writeText(asset.content).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy asset content: ', err);
    });
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(asset.hash).then(() => {
      setIsHashCopied(true);
      setTimeout(() => setIsHashCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy asset hash: ', err);
    });
  };

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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-black/20 p-2 rounded-md md:col-span-2"><span className="font-semibold text-gray-400 block">Source:</span> {asset.source}</div>
                <div className="bg-black/20 p-2 rounded-md"><span className="font-semibold text-gray-400 block">Type:</span> {asset.type}</div>
                 <div className="bg-black/20 p-2 rounded-md">
                   <span className="font-semibold text-gray-400 block">Status:</span>
                   <div className="relative group inline-block">
                      <span className={`px-2 py-0.5 text-xs rounded-full cursor-help ${
                          asset.status === 'FILED' ? 'bg-green-500/30 text-green-300' : 'bg-blue-500/30 text-blue-300'
                        }`}>
                          {asset.status}
                      </span>
                      <div className="absolute bottom-full -left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs p-2 text-xs text-white bg-gray-800 border border-cyan-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible z-10 pointer-events-none">
                        {statusTooltips[asset.status]}
                      </div>
                   </div>
                 </div>
                 <div className="bg-black/20 p-2 rounded-md col-span-full"><span className="font-semibold text-gray-400 block">Asset Hash:</span> <span className="font-mono text-xs break-all">{asset.hash}</span></div>
            </div>

            <div className="bg-black/30 p-4 rounded-md border border-gray-700 max-h-80 overflow-y-auto">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-gray-400 font-semibold">Asset Content</h3>
                    <div className="flex items-center space-x-2">
                        <button
                          onClick={handleCopyHash}
                          disabled={isHashCopied}
                          className="flex items-center space-x-1.5 text-xs text-cyan-400 hover:text-cyan-200 bg-cyan-900/50 hover:bg-cyan-900/80 px-2 py-1 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-wait focus:outline-none focus:ring-2 focus:ring-cyan-600"
                        >
                          <KeyIcon className="w-4 h-4" />
                          <span>{isHashCopied ? 'Copied!' : 'Copy Hash'}</span>
                        </button>
                        <button
                          onClick={handleCopyContent}
                          disabled={isCopied}
                          className="flex items-center space-x-1.5 text-xs text-cyan-400 hover:text-cyan-200 bg-cyan-900/50 hover:bg-cyan-900/80 px-2 py-1 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-wait focus:outline-none focus:ring-2 focus:ring-cyan-600"
                        >
                          <ClipboardIcon className="w-4 h-4" />
                          <span>{isCopied ? 'Copied!' : 'Copy Content'}</span>
                        </button>
                    </div>
                </div>
                {asset.type === 'CODE' ? (
                  <CodeBlock content={asset.content} />
                ) : (
                  <p className="text-gray-300 whitespace-pre-wrap font-mono text-xs leading-loose">
                    {asset.content}
                  </p>
                )}
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