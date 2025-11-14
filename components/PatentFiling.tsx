import React, { useState } from 'react';
import WidgetCard from './WidgetCard';
import { DocumentArrowUpIcon } from './icons/DocumentArrowUpIcon';
import { ScaleIcon } from './icons/ScaleIcon';
import { KeyIcon } from './icons/KeyIcon';
import { TrademarkIcon } from './icons/TrademarkIcon';
import { CopyrightIcon } from './icons/CopyrightIcon';

const filingOptions = [
  { id: 'patent', type: 'Patent', name: 'Anti-Gravity PPA', target: 'USPTO & FortiFile™', icon: <ScaleIcon className="w-5 h-5" /> },
  { id: 'trademark', type: 'Trademark', name: 'RADEST Quantum Seal', target: 'USPTO', icon: <TrademarkIcon className="w-5 h-5" /> },
  { id: 'copyright', type: 'Copyright', name: 'Kindraai Source Code', target: 'Copyright.gov', icon: <CopyrightIcon className="w-5 h-5" /> },
  { id: 'tradesecret', type: 'Trade Secret', name: 'Living Book of Record', target: 'SoulSync Vault', icon: <KeyIcon className="w-5 h-5" /> },
];

const IpFiling: React.FC = () => {
  const [statuses, setStatuses] = useState<Record<string, 'IDLE' | 'FILING' | 'FILED'>>({});

  const handleFile = (id: string) => {
    setStatuses(prev => ({ ...prev, [id]: 'FILING' }));
    setTimeout(() => {
      setStatuses(prev => ({ ...prev, [id]: 'FILED' }));
    }, 2000);
  };

  const getButtonText = (id: string) => {
    const status = statuses[id] || 'IDLE';
    switch (status) {
      case 'FILING': return 'Filing...';
      case 'FILED': return 'Filed!';
      default: return 'File Now';
    }
  };

  return (
    <WidgetCard title="IP Filing & Registration" icon={<DocumentArrowUpIcon className="w-6 h-6" />}>
      <div className="space-y-3">
        {filingOptions.map(({ id, type, name, target, icon }) => (
          <div key={id} className="p-3 bg-cyan-900/20 rounded-md">
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center space-x-2">
                        <span className="text-cyan-400">{icon}</span>
                        <p className="font-bold text-sm">{type}</p>
                    </div>
                    <p className="text-xs text-gray-300 mt-1 pl-7">{name}</p>
                    <p className="text-xs text-gray-400 mt-1 pl-7">Target: {target}</p>
                </div>
                <button
                    onClick={() => handleFile(id)}
                    disabled={statuses[id] === 'FILING' || statuses[id] === 'FILED'}
                    className="ml-2 px-3 py-1 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-600 disabled:opacity-70 transition-colors duration-300 text-white rounded-md whitespace-nowrap"
                    >
                    {getButtonText(id)}
                </button>
            </div>
            {statuses[id] === 'FILED' && (
                <p className="text-center text-green-400 text-xs animate-pulse mt-2">
                    Filing package sent to {target}!
                </p>
            )}
          </div>
        ))}
      </div>
    </WidgetCard>
  );
};

export default IpFiling;
