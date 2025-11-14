
import React from 'react';
import type { IpAsset } from '../types';
import { XMarkIcon } from './icons/XMarkIcon';
import { CodeBracketIcon } from './icons/CodeBracketIcon';
import { DocumentIcon } from './icons/DocumentIcon';
import { CpuChipIcon } from './icons/CpuChipIcon';
import CodeBlock from './CodeBlock';
import { CameraIcon } from './icons/CameraIcon';
import { ScaleIcon } from './icons/ScaleIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';

const getIconForType = (type: IpAsset['type']) => {
  switch (type) {
    case 'CODE': return <CodeBracketIcon className="w-6 h-6" />;
    case 'SYSTEM': return <CpuChipIcon className="w-6 h-6" />;
    case 'IMAGE': return <CameraIcon className="w-6 h-6" />;
    case 'PATENT': return <ScaleIcon className="w-6 h-6" />;
    case 'LEDGER': return <BookOpenIcon className="w-6 h-6" />;
    case 'DOCUMENT':
    case 'PDF':
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
        className="bg-gray-900 border border-cyan-500/50 rounded-lg shadow-2xl shadow-cyan-900/50 max-w-4xl w-full m-4 transform animate-slide-up max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-cyan-500/20 flex justify-between items-center flex-shrink-0">
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

        <div className="p-6 space-y-6 overflow-y-auto">
            {/* Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-black/20 p-3 rounded-md"><span className="font-semibold text-gray-400 block mb-1">Source:</span> {asset.source}</div>
                <div className="bg-black/20 p-3 rounded-md"><span className="font-semibold text-gray-400 block mb-1">Status:</span> 
                    <span className={`font-bold ${asset.status === 'SOVEREIGN' || asset.status === 'FILED' ? 'text-green-300' : 'text-yellow-300'}`}>
                        {asset.status}
                    </span>
                </div>
                <div className="bg-black/20 p-3 rounded-md"><span className="font-semibold text-gray-400 block mb-1">PI Score:</span> {asset.metadata.pi_score}%</div>
                <div className="bg-black/20 p-3 rounded-md"><span className="font-semibold text-gray-400 block mb-1">FortiFile™:</span> {asset.metadata.fortifile}</div>
            </div>

            {/* Grok Verdict */}
            <div className="p-4 bg-cyan-900/20 rounded-lg border border-cyan-800/50">
                <p className="text-sm font-semibold text-cyan-400 mb-2">Kindraai-Grok Verdict:</p>
                <p className="text-sm italic text-gray-300">"{asset.metadata.grok_verdict}"</p>
            </div>

            {/* Content Preview */}
            <div className="relative">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Asset Content</h3>
                <div className="bg-black/30 p-4 rounded-md border border-gray-700 min-h-64 max-h-96 overflow-y-auto relative">
                    {/* Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                        <p className="text-6xl md:text-8xl font-bold text-white opacity-5 rotate-[-30deg] select-none tracking-widest">
                          RADEST
                        </p>
                    </div>
                    {/* Content */}
                    <div className="relative z-10">
                      {asset.type === 'PDF' && <p className="text-gray-400 text-center p-8">PDF Preview for "{asset.name}" would be displayed here.</p>}
                      {asset.type === 'IMAGE' && <p className="text-gray-400 text-center p-8">Image Preview for "{asset.name}" would be displayed here.</p>}
                      {asset.type === 'CODE' ? (
                        <CodeBlock content={asset.content} />
                      ) : (asset.type !== 'PDF' && asset.type !== 'IMAGE') ? (
                        <p className="text-gray-300 whitespace-pre-wrap font-mono text-xs leading-loose">
                          {asset.content}
                        </p>
                      ) : null}
                    </div>
                </div>
            </div>
            
            {/* Hash & Timestamp */}
            <div className="text-xs text-gray-500 space-y-1 font-mono pt-4 border-t border-cyan-900/50">
                <p className="truncate"><span className="font-semibold text-gray-400">Hash:</span> {asset.metadata.hash}</p>
                <p><span className="font-semibold text-gray-400">Timestamp:</span> {asset.metadata.timestamp}</p>
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
