
import React from 'react';
import type { Account } from '../types';
import WidgetCard from './WidgetCard';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

const accounts: Account[] = [
  { name: 'Primary Gmail', provider: 'Google', email: 'mybusinesspartnereric@gmail.com', synced: true },
  { name: 'Google Drive + Cloud', provider: 'Google', email: 'malleyrides@gmail.com', synced: true },
  { name: 'Gemini Studio + Microsoft', provider: 'Microsoft', email: 'radestmetaverse@outlook.com', synced: true },
  { name: 'GitHub', provider: 'GitHub', email: 'edm137', synced: true },
  { name: 'Vercel', provider: 'Vercel', email: 'eric@radestpublishing.co', synced: true },
];

const SovereignOverview: React.FC = () => {
  return (
    <WidgetCard title="Sovereign Overview" icon={<ShieldCheckIcon className="w-6 h-6" />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <div key={account.email} className="bg-cyan-900/20 p-3 rounded-md flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">{account.name}</p>
              <p className="text-xs text-gray-400">{account.email}</p>
            </div>
            {account.synced && (
              <div className="flex items-center space-x-1 text-green-400">
                <CheckCircleIcon className="w-5 h-5" />
                <span className="text-xs">SYNCED</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </WidgetCard>
  );
};

export default SovereignOverview;
