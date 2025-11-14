import React, { useState, useRef } from 'react';
import type { IpAsset } from '../types';
import { analyzeIpAsset } from '../services/geminiService';
import { XMarkIcon } from './icons/XMarkIcon';
import { UploadIcon } from './icons/UploadIcon';

interface CreateIpAssetModalProps {
  onClose: () => void;
  onSave: (newAsset: IpAsset) => void;
}

const assetTypes: IpAsset['type'][] = ['DOCUMENT', 'CODE', 'PATENT', 'LEDGER', 'SYSTEM', 'PDF', 'IMAGE'];

const CreateIpAssetModal: React.FC<CreateIpAssetModalProps> = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<IpAsset['type']>('DOCUMENT');
  const [source, setSource] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isFormValid = name.trim() !== '' && source.trim() !== '' && content.trim() !== '';

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setName(file.name);
    setSource('Local Upload');

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target?.result as string;
      setContent(fileContent);
    };
    reader.onerror = () => {
      setError('Failed to read the selected file.');
    };
    reader.readAsText(file);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    setError(null);
    try {
      const analysisText = await analyzeIpAsset(name, content);
      const analysisResult = JSON.parse(analysisText);

      if (!analysisResult.verdict || typeof analysisResult.piScore === 'undefined' || !analysisResult.hash || !analysisResult.reasoning) {
        throw new Error("Incomplete analysis data received from AI.");
      }

      const newAsset: IpAsset = {
        id: new Date().getTime().toString(),
        name,
        type,
        source,
        content,
        status: analysisResult.verdict === 'SOVEREIGN' ? 'SOVEREIGN' : 'QUARANTINED',
        metadata: {
          hash: analysisResult.hash,
          timestamp: new Date().toISOString(),
          fortifile: `FF-${new Date().toISOString().split('T')[0]}-${Math.random().toString(16).substring(2, 6).toUpperCase()}`,
          pi_score: analysisResult.piScore,
          grok_verdict: analysisResult.reasoning,
        }
      };
      onSave(newAsset);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze and create asset. Check the Gemini service.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-gray-900 border border-cyan-500/50 rounded-lg shadow-2xl shadow-cyan-900/50 max-w-2xl w-full m-4 transform animate-slide-up max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-cyan-500/20 flex justify-between items-center flex-shrink-0">
          <h2 className="font-bold text-xl text-cyan-400 tracking-wide">Create New IP Asset</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Close create asset form"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          <button
            type="button"
            onClick={triggerFileSelect}
            className="w-full bg-cyan-600/20 border border-cyan-500 hover:bg-cyan-500/30 transition-colors duration-300 text-cyan-300 font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
          >
            <UploadIcon className="w-5 h-5" />
            <span>Upload File to Autofill</span>
          </button>
          
          <div className="flex items-center text-xs text-gray-500">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="flex-shrink mx-4">OR FILL MANUALLY</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>
          
          <div>
            <label htmlFor="asset-name" className="block text-sm font-medium text-gray-300 mb-1">Asset Name</label>
            <input
              id="asset-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="e.g., Quantum Entanglement Protocol"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
                <label htmlFor="asset-type" className="block text-sm font-medium text-gray-300 mb-1">Asset Type</label>
                <select
                    id="asset-type"
                    value={type}
                    onChange={(e) => setType(e.target.value as IpAsset['type'])}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                    {assetTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
             </div>
             <div>
                <label htmlFor="asset-source" className="block text-sm font-medium text-gray-300 mb-1">Source</label>
                <input
                    id="asset-source"
                    type="text"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="e.g., GitHub: edm137/quantum"
                    required
                />
            </div>
          </div>
          
          <div>
            <label htmlFor="asset-content" className="block text-sm font-medium text-gray-300 mb-1">Asset Content</label>
            <textarea
              id="asset-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg p-2 text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter the document content, source code, or detailed description..."
              required
            />
             <p className="text-xs text-gray-500 mt-1">Note: Content will be analyzed by Kindraai Guardian upon creation.</p>
          </div>

          {error && <p className="text-red-400 text-sm text-center py-2">{error}</p>}
          
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="px-4 py-2 text-sm font-medium text-black bg-cyan-600 hover:bg-cyan-500 rounded-md transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center"
            >
              {isLoading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isLoading ? 'Analyzing & Saving...' : 'Save Asset'}
            </button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default CreateIpAssetModal;