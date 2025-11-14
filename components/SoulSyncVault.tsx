import React, { useState } from 'react';
import WidgetCard from './WidgetCard';
import { KeyIcon } from './icons/KeyIcon';
import { CheckBadgeIcon } from './icons/CheckBadgeIcon';
import { ArrowPathIcon } from './icons/ArrowPathIcon';

const sealedRecords = [
    { name: 'Trade Secret: Sovereign EULA Protocol', id: 'TS-EULA-001' },
    { name: 'Trade Secret: Emotional PoW Algorithm', id: 'TS-EPOW-002' },
    { name: 'Ledger: RADEST Living Book of Record', id: 'LGR-LBR-001' },
];

const SoulSyncVault: React.FC<{color?: 'indigo'}> = ({ color = 'indigo' }) => {
    const [syncStatus, setSyncStatus] = useState<'IDLE' | 'SYNCING' | 'SYNCED'>('IDLE');

    const handleSync = () => {
        setSyncStatus('SYNCING');
        setTimeout(() => {
            setSyncStatus('SYNCED');
            setTimeout(() => setSyncStatus('IDLE'), 3000);
        }, 2500);
    };

    const getButtonText = () => {
        switch (syncStatus) {
            case 'SYNCING': return 'Syncing...';
            case 'SYNCED': return 'Sync Complete!';
            default: return 'Initiate Deep Sync';
        }
    };

    return (
        <WidgetCard title="SoulSync Vault" icon={<KeyIcon className="w-6 h-6" />} color={color}>
            <div className="flex flex-col h-full space-y-4">
                <div className="text-center p-3 bg-indigo-900/20 rounded-md border border-indigo-500/20">
                    <p className="font-semibold text-indigo-300">Vault Status</p>
                    <p className="text-sm font-bold text-green-300 flex items-center justify-center space-x-2 mt-1">
                        <CheckBadgeIcon className="w-5 h-5" />
                        <span>ENCRYPTED & SYNCED</span>
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Sealed Records</h3>
                    <div className="space-y-2">
                        {sealedRecords.map(record => (
                            <div key={record.id} className="flex items-center justify-between text-sm bg-black/30 p-2 rounded-md">
                                <p className="text-gray-300 truncate">{record.name}</p>
                                <p className="text-xs text-gray-500 font-mono flex-shrink-0 ml-2">{record.id}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-2 mt-auto">
                    <button
                        onClick={handleSync}
                        disabled={syncStatus !== 'IDLE'}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
                    >
                        {syncStatus === 'SYNCING' && <ArrowPathIcon className="w-5 h-5 animate-spin" />}
                        {syncStatus === 'SYNCED' && <CheckBadgeIcon className="w-5 h-5" />}
                        <span>{getButtonText()}</span>
                    </button>
                </div>
            </div>
        </WidgetCard>
    );
};

export default SoulSyncVault;
