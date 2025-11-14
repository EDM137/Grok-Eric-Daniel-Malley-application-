import React, { useState, useRef, useMemo } from 'react';
import WidgetCard from './WidgetCard';
import { ArrowsRightLeftIcon } from './icons/ArrowsRightLeftIcon';
import { ComputerDesktopIcon } from './icons/ComputerDesktopIcon';
import { CloudIcon } from './icons/CloudIcon';
import { ServerStackIcon } from './icons/ServerStackIcon';
import { FolderOpenIcon } from './icons/FolderOpenIcon';

const fileSources = [
  { id: 'device', name: 'Device Storage', icon: <ComputerDesktopIcon className="w-6 h-6 text-cyan-400" />, status: 'AVAILABLE' },
  { id: 'google_drive', name: 'Google Drive', icon: <CloudIcon className="w-6 h-6 text-blue-400" />, status: 'CONNECTED' },
  { id: 'onedrive', name: 'Microsoft OneDrive', icon: <CloudIcon className="w-6 h-6 text-sky-400" />, status: 'CONNECTED' },
  { id: 'github', name: 'GitHub Repository', icon: <ServerStackIcon className="w-6 h-6 text-gray-300" />, status: 'CONNECTED' },
  { id: 'vercel', name: 'Vercel Projects', icon: <ServerStackIcon className="w-6 h-6 text-white" />, status: 'CONNECTED' },
];

const FileBridge: React.FC<{color?: 'indigo'}> = ({ color = 'indigo' }) => {
  const [selectedSourceId, setSelectedSourceId] = useState<string>(fileSources[0].id);
  const [browseStatus, setBrowseStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedSource = useMemo(() => {
    return fileSources.find(s => s.id === selectedSourceId);
  }, [selectedSourceId]);

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSourceId(e.target.value);
    setBrowseStatus(null); // Reset status on source change
  };

  const handleBrowseClick = () => {
    if (selectedSourceId === 'device') {
      fileInputRef.current?.click();
    } else {
      setBrowseStatus(`Simulating connection to ${selectedSource?.name}...`);
      setTimeout(() => {
        setBrowseStatus(`Successfully connected. You can now browse files from ${selectedSource?.name}.`);
      }, 1500);
    }
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBrowseStatus(`File selected: ${e.target.files[0].name}`);
    }
  };

  return (
    <WidgetCard title="File Bridge" icon={<ArrowsRightLeftIcon className="w-6 h-6" />} color={color}>
      <div className="space-y-4">
        <p className="text-xs text-gray-400 pb-2 border-b border-indigo-900/50">
          Select a source to transfer assets across sovereign and external networks.
        </p>
        
        {/* Source Selector */}
        <div>
            <label htmlFor="file-source" className="block text-sm font-medium text-gray-300 mb-1">File Source</label>
            <select
                id="file-source"
                value={selectedSourceId}
                onChange={handleSourceChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                {fileSources.map(source => (
                    <option key={source.id} value={source.id}>{source.name}</option>
                ))}
            </select>
        </div>

        {/* Selected Source Info & Action */}
        {selectedSource && (
            <div className="p-4 bg-indigo-900/20 rounded-lg flex flex-col items-center text-center space-y-4 border border-indigo-500/20">
                <div className="w-16 h-16 bg-black/30 rounded-full flex items-center justify-center border-2 border-indigo-700/50">
                    {selectedSource.icon}
                </div>
                <div>
                    <p className="font-bold text-lg">{selectedSource.name}</p>
                    <p className={`text-xs font-semibold ${selectedSource.status === 'CONNECTED' || selectedSource.status === 'AVAILABLE' ? 'text-green-400' : 'text-yellow-400'}`}>
                        Status: {selectedSource.status}
                    </p>
                </div>
                
                <input type="file" ref={fileInputRef} onChange={handleFileSelected} className="hidden" />
                <button
                    onClick={handleBrowseClick}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 transition-colors duration-300 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
                >
                    <FolderOpenIcon className="w-5 h-5" />
                    <span>Browse Files</span>
                </button>
            </div>
        )}

        {/* Status Display */}
        {browseStatus && (
            <div className="text-center text-indigo-300 text-sm p-3 bg-gray-800/50 rounded-lg animate-fade-in">
                <p>{browseStatus}</p>
            </div>
        )}
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </WidgetCard>
  );
};

export default FileBridge;