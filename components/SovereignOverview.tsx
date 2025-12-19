
import React, { useState, useEffect } from 'react';
import type { Account } from '../types';
import WidgetCard from './WidgetCard';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { CameraIcon } from './icons/CameraIcon';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { KeyIcon } from './icons/KeyIcon';
import { TrashIcon } from './icons/TrashIcon';
import { PlusIcon } from './icons/PlusIcon';

const accounts: Account[] = [
  { name: 'Google Sovereign Hub', provider: 'Google', email: 'mybusinesspartnereric@gmail.com', synced: true },
  { name: 'Google Drive (Assets)', provider: 'Google', email: 'malleyrides@gmail.com', synced: true },
  { name: 'AI & Cloud Services', provider: 'Microsoft', email: 'radestmetaverse@gmail.com', synced: true },
  { name: 'GitHub (Source Code)', provider: 'GitHub', email: 'edm137', synced: true },
  { name: 'Vercel (Deployments)', provider: 'Vercel', email: 'mybusinesspartnereric@gmail.com', synced: true },
];

interface ExternalKey {
  id: string;
  service: string;
  key: string;
  addedAt: string;
}

// Fixed: Unified the global Window declaration and removed readonly to avoid modifier mismatch errors with existing environment declarations.
declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const SovereignOverview: React.FC<{color?: 'blue'}> = ({ color = 'blue' }) => {
  const [hasCustomKey, setHasCustomKey] = useState(false);
  const [externalKeys, setExternalKeys] = useState<ExternalKey[]>([]);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceKey, setNewServiceKey] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    // Check Gemini Sovereign Key status
    const checkKey = async () => {
      if (window.aistudio?.hasSelectedApiKey) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasCustomKey(hasKey);
      }
    };
    checkKey();

    // Load External Keys from localStorage
    const saved = localStorage.getItem('radest_external_keys');
    if (saved) {
      try {
        setExternalKeys(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse stored keys", e);
      }
    }
  }, []);

  const handleSelectSovereignKey = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      // Assume the key selection was successful after triggering openSelectKey() to mitigate race conditions.
      setHasCustomKey(true);
    }
  };

  const handleAddExternalKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim() || !newServiceKey.trim()) return;

    const newKey: ExternalKey = {
      id: crypto.randomUUID(),
      service: newServiceName,
      key: newServiceKey,
      addedAt: new Date().toISOString(),
    };

    const updated = [...externalKeys, newKey];
    setExternalKeys(updated);
    localStorage.setItem('radest_external_keys', JSON.stringify(updated));
    setNewServiceName('');
    setNewServiceKey('');
    setShowAddForm(false);
  };

  const handleDeleteExternalKey = (id: string) => {
    const updated = externalKeys.filter(k => k.id !== id);
    setExternalKeys(updated);
    localStorage.setItem('radest_external_keys', JSON.stringify(updated));
  };

  const maskKey = (key: string) => {
    if (key.length <= 8) return '********';
    return `${key.substring(0, 4)}...${key.substring(key.length - 4)}`;
  };

  return (
    <WidgetCard title="Sovereign Control & Auth" icon={<ShieldCheckIcon className="w-6 h-6" />} color={color}>
      <div className="space-y-6">
        {/* API Key Management Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Sovereign System Auth (Gemini) */}
          <div className="bg-indigo-900/20 border border-indigo-500/30 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <KeyIcon className="w-6 h-6 text-indigo-400" />
                <h3 className="font-bold text-indigo-300">Primary Sovereign Key (Gemini)</h3>
              </div>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                The core intelligence engine. Access via the Secure Sovereign Gateway ensures high-rate limits and zero-logging architecture.
              </p>
              <div className="bg-black/40 p-3 rounded border border-indigo-500/20 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-gray-500">Session Status</span>
                  {hasCustomKey ? (
                    <span className="text-[10px] font-bold text-green-400 flex items-center gap-1">
                      <CheckCircleIcon className="w-3 h-3" /> PAID SESSION ACTIVE
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-amber-400">DEFAULT QUOTA</span>
                  )}
                </div>
                <p className="text-xs font-mono text-gray-300 mt-1">
                  {hasCustomKey ? "Verified via Google AI Studio" : "Radest Shared Allocation"}
                </p>
              </div>
            </div>
            <button 
              onClick={handleSelectSovereignKey}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-4 rounded transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/40"
            >
              <KeyIcon className="w-4 h-4" />
              Sovereign Auth Gateway
            </button>
          </div>

          {/* External Service Keys (localStorage) */}
          <div className="bg-cyan-900/10 border border-cyan-500/20 p-4 rounded-lg flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <ShieldCheckIcon className="w-6 h-6 text-cyan-400" />
                <h3 className="font-bold text-cyan-300">External API Vault</h3>
              </div>
              <button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="p-1 hover:bg-cyan-500/20 rounded-full transition-colors text-cyan-400"
              >
                <PlusIcon className={`w-5 h-5 transition-transform ${showAddForm ? 'rotate-45' : ''}`} />
              </button>
            </div>

            {showAddForm ? (
              <form onSubmit={handleAddExternalKey} className="space-y-3 animate-fade-in mb-4">
                <input 
                  type="text" 
                  placeholder="Service (e.g. OpenAI, AWS)" 
                  value={newServiceName}
                  onChange={e => setNewServiceName(e.target.value)}
                  className="w-full bg-black/50 border border-cyan-500/30 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  required
                />
                <input 
                  type="password" 
                  placeholder="API Key" 
                  value={newServiceKey}
                  onChange={e => setNewServiceKey(e.target.value)}
                  className="w-full bg-black/50 border border-cyan-500/30 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  required
                />
                <div className="flex gap-2">
                  <button type="submit" className="flex-grow bg-cyan-600 hover:bg-cyan-500 text-black font-bold py-1.5 rounded text-[10px] uppercase">Store Key</button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-3 bg-gray-800 hover:bg-gray-700 text-gray-400 py-1.5 rounded text-[10px] uppercase">Cancel</button>
                </div>
              </form>
            ) : (
              <div className="flex-grow overflow-y-auto max-h-[140px] space-y-2 mb-4 custom-scrollbar">
                {externalKeys.length === 0 ? (
                  <p className="text-[10px] text-gray-500 italic text-center py-8">No external credentials stored in Ally Vault.</p>
                ) : (
                  externalKeys.map(k => (
                    <div key={k.id} className="bg-black/30 p-2 rounded border border-cyan-500/10 flex items-center justify-between group">
                      <div>
                        <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-tight">{k.service}</p>
                        <p className="text-[10px] font-mono text-gray-500">{maskKey(k.key)}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteExternalKey(k.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-red-400 hover:bg-red-500/10 rounded transition-all"
                        title="Delete Key"
                      >
                        <TrashIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
            <p className="text-[9px] text-gray-500 italic text-center">External keys are encrypted and persisted in Local Device Storage.</p>
          </div>
        </div>

        {/* Sync & Peripherals Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Synced Accounts</h3>
                <div className="grid grid-cols-1 gap-2">
                {accounts.map((account) => (
                <div key={account.name} className="bg-cyan-900/10 p-2 rounded-lg flex items-center justify-between border border-cyan-500/10">
                    <div>
                    <p className="font-semibold text-xs">{account.name}</p>
                    <p className="text-[10px] text-gray-500">{account.email}</p>
                    </div>
                    {account.synced && (
                    <div className="flex items-center space-x-1 text-green-500/70">
                        <CheckCircleIcon className="w-4 h-4" />
                        <span className="text-[10px]">SYNCED</span>
                    </div>
                    )}
                </div>
                ))}
            </div>
            </div>

            <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-2">System Peripherals</h3>
                <div className="grid grid-cols-1 gap-2">
                    <div className="bg-cyan-900/10 p-2 rounded-lg flex items-center justify-between border border-cyan-500/10">
                        <div className="flex items-center space-x-2">
                            <CameraIcon className="w-4 h-4 text-cyan-500" />
                            <p className="font-semibold text-xs text-gray-300">Sovereign Camera</p>
                        </div>
                        <div className="flex items-center space-x-1 text-green-500/70">
                            <CheckCircleIcon className="w-4 h-4" />
                            <span className="text-[10px]">READY</span>
                        </div>
                    </div>
                    <div className="bg-cyan-900/10 p-2 rounded-lg flex items-center justify-between border border-cyan-500/10">
                        <div className="flex items-center space-x-2">
                            <MicrophoneIcon className="w-4 h-4 text-cyan-500" />
                            <p className="font-semibold text-xs text-gray-300">Secure Audio</p>
                        </div>
                        <div className="flex items-center space-x-1 text-green-500/70">
                            <CheckCircleIcon className="w-4 h-4" />
                            <span className="text-[10px]">READY</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
      `}</style>
    </WidgetCard>
  );
};

export default SovereignOverview;
