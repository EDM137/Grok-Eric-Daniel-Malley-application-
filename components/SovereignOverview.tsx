import React from 'react';
import type { Account } from '../types';
import WidgetCard from './WidgetCard';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { CameraIcon } from './icons/CameraIcon';
import { MicrophoneIcon } from './icons/MicrophoneIcon';

const accounts: Account[] = [
  { name: 'Google Sovereign Hub', provider: 'Google', email: 'mybusinesspartnereric@gmail.com', synced: true },
  { name: 'Google Drive (Assets)', provider: 'Google', email: 'malleyrides@gmail.com', synced: true },
  { name: 'AI & Cloud Services', provider: 'Microsoft', email: 'radestmetaverse@gmail.com', synced: true },
  { name: 'GitHub (Source Code)', provider: 'GitHub', email: 'edm137', synced: true },
  { name: 'Vercel (Deployments)', provider: 'Vercel', email: 'mybusinesspartnereric@gmail.com', synced: true },
];

const SovereignOverview: React.FC = () => {
  return (
    <WidgetCard title="Sovereign Overview" icon={<ShieldCheckIcon className="w-6 h-6" />}>
      <div className="space-y-4">
        <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Synced Accounts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account) => (
              <div key={account.name} className="bg-cyan-900/20 p-3 rounded-md flex items-center justify-between">
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
        </div>

        <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">System Peripherals</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-cyan-900/20 p-3 rounded-md flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <CameraIcon className="w-5 h-5" />
                        <p className="font-semibold text-sm">Camera</p>
                    </div>
                    <div className="flex items-center space-x-1 text-green-400">
                        <CheckCircleIcon className="w-5 h-5" />
                        <span className="text-xs">READY</span>
                    </div>
                </div>
                <div className="bg-cyan-900/20 p-3 rounded-md flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <MicrophoneIcon className="w-5 h-5" />
                        <p className="font-semibold text-sm">Microphone</p>
                    </div>
                    <div className="flex items-center space-x-1 text-green-400">
                        <CheckCircleIcon className="w-5 h-5" />
                        <span className="text-xs">READY</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </WidgetCard>
  );
};

export default SovereignOverview;