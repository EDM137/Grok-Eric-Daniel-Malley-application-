import React, { useState, useEffect } from 'react';
import WidgetCard from './WidgetCard';
import { SignalIcon } from './icons/SignalIcon';
import { ArrowPathIcon } from './icons/ArrowPathIcon';

interface ApiStatus {
  name: string;
  version: string;
  status: 'SYNCED' | 'OFFLINE' | 'OUTDATED';
}

const initialApiStatuses: ApiStatus[] = [
  { name: 'Gemini AI Core', version: 'v2.5-flash', status: 'SYNCED' },
  { name: 'Copilot Integration', version: 'v1.12.1', status: 'SYNCED' },
  { name: 'Grok Verdict Engine', version: 'v1.5-final', status: 'OUTDATED' },
  { name: 'ChatGPT Connector', version: 'v4.0-turbo', status: 'SYNCED' },
];

const ApiSyncEngine: React.FC<{color?: 'indigo'}> = ({ color = 'indigo' }) => {
  const [statuses, setStatuses] = useState<ApiStatus[]>(initialApiStatuses);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    // Check for Gemini API key and set status accordingly
    if (!process.env.API_KEY) {
      setStatuses(prev => prev.map(s => s.name === 'Gemini AI Core' ? { ...s, status: 'OFFLINE' } : s));
    }
  }, []);
  
  const handleSync = () => {
    setIsSyncing(true);
    setStatuses(prev => prev.map(s => ({ ...s, status: 'SYNCED' }))); // Visually start sync
    
    setTimeout(() => {
        // After sync, re-evaluate statuses. For simulation, just set them all to SYNCED.
        // FIX: Explicitly type `newStatuses` as `ApiStatus[]` to prevent TS from inferring status as only 'SYNCED'.
        const newStatuses: ApiStatus[] = initialApiStatuses.map(s => ({ ...s, status: 'SYNCED' }));
        
        // Re-check Gemini key
        if (!process.env.API_KEY) {
            const geminiIndex = newStatuses.findIndex(s => s.name === 'Gemini AI Core');
            if (geminiIndex !== -1) {
                newStatuses[geminiIndex].status = 'OFFLINE';
            }
        }
        
        setStatuses(newStatuses);
        setIsSyncing(false);
    }, 2000);
  };

  const getStatusClasses = (status: ApiStatus['status']) => {
    switch (status) {
      case 'SYNCED':
        return 'bg-green-500/20 text-green-300';
      case 'OFFLINE':
        return 'bg-red-500/20 text-red-400';
      case 'OUTDATED':
        return 'bg-yellow-500/20 text-yellow-300 animate-pulse';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <WidgetCard title="API Sync Engine" icon={<SignalIcon className="w-6 h-6" />} color={color}>
      <div className="flex flex-col h-full">
        <div className="space-y-3 flex-grow">
          {statuses.map((api) => (
            <div key={api.name} className="flex items-center justify-between p-3 bg-indigo-900/20 rounded-md">
              <div>
                <p className="font-semibold text-sm">{api.name}</p>
                <p className="text-xs text-gray-400 font-mono">Version: {api.version}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-bold rounded-full whitespace-nowrap ${getStatusClasses(api.status)}`}>
                {api.status}
              </span>
            </div>
          ))}
        </div>
        <div className="pt-4 mt-auto">
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
          >
            {isSyncing ? (
              <ArrowPathIcon className="w-5 h-5 animate-spin" />
            ) : (
              <ArrowPathIcon className="w-5 h-5" />
            )}
            <span>{isSyncing ? 'Syncing APIs...' : 'Resync All APIs'}</span>
          </button>
        </div>
      </div>
    </WidgetCard>
  );
};

export default ApiSyncEngine;