
import React from 'react';
import WidgetCard from './WidgetCard';
import { GlobeAltIcon } from './icons/GlobeAltIcon';
import { WalletIcon } from './icons/WalletIcon';
import { ArrowsRightLeftIcon } from './icons/ArrowsRightLeftIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

const ecosystemComponents = [
  {
    name: 'Kindraai Metaverse',
    icon: <GlobeAltIcon className="w-5 h-5 text-indigo-400" />,
    status: 'OPERATIONAL',
    description: 'Sovereign digital environment for IP interaction.'
  },
  {
    name: 'RadestPay',
    icon: <WalletIcon className="w-5 h-5 text-green-400" />,
    status: 'SECURE',
    description: 'On-chain payment and treasury gateway.'
  },
  {
    name: 'Application Bridge',
    icon: <ArrowsRightLeftIcon className="w-5 h-5 text-cyan-400" />,
    status: 'SYNCED',
    description: 'Secure data flow between sovereign apps.'
  },
  {
    name: 'Web Bridge',
    icon: <ArrowsRightLeftIcon className="w-5 h-5 text-cyan-400" />,
    status: 'SYNCED',
    description: 'Encrypted connectivity to external web services.'
  },
  {
    name: 'File Bridge',
    icon: <ArrowsRightLeftIcon className="w-5 h-5 text-cyan-400" />,
    status: 'SYNCED',
    description: 'Verifiable asset transfer across networks.'
  },
];

const EcosystemStatus: React.FC = () => {
  return (
    <WidgetCard title="Radest Ecosystem Status" icon={<GlobeAltIcon className="w-6 h-6" />}>
        <div className="space-y-3">
            {ecosystemComponents.map((component) => (
                <div key={component.name} className="bg-cyan-900/20 p-3 rounded-md flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {component.icon}
                        <div>
                            <p className="font-semibold text-sm">{component.name}</p>
                            <p className="text-xs text-gray-400">{component.description}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1 text-green-400">
                        <CheckCircleIcon className="w-5 h-5" />
                        <span className="text-xs font-semibold">{component.status}</span>
                    </div>
                </div>
            ))}
        </div>
    </WidgetCard>
  );
};

export default EcosystemStatus;
