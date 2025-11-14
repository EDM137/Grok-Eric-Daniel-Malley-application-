
import React from 'react';
import WidgetCard from './WidgetCard';
import { ArrowsRightLeftIcon } from './icons/ArrowsRightLeftIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

const bridgeConnections = [
  { name: 'Google Drive Sync', status: 'ACTIVE' },
  { name: 'GitHub LFS', status: 'ACTIVE' },
  { name: 'IPFS Pinner', status: 'STANDBY' },
  { name: 'SoulSync Vault Link', status: 'ACTIVE' },
];

const FileBridge: React.FC = () => {
  return (
    <WidgetCard title="File Bridge" icon={<ArrowsRightLeftIcon className="w-6 h-6" />}>
      <div className="space-y-3">
        <p className="text-xs text-gray-400 pb-2 border-b border-cyan-900/50">
          Verifiable asset transfer across sovereign and external networks.
        </p>
        {bridgeConnections.map((conn) => (
          <div key={conn.name} className="flex items-center justify-between text-sm bg-cyan-900/10 p-2 rounded-md">
            <p className="text-gray-300">{conn.name}</p>
            <span className={`text-xs font-bold flex items-center space-x-1 ${conn.status === 'ACTIVE' ? 'text-green-400' : 'text-yellow-400'}`}>
               <CheckCircleIcon className="w-4 h-4" />
              <span>{conn.status}</span>
            </span>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
};

export default FileBridge;
