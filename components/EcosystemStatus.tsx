import React from 'react';
import WidgetCard from './WidgetCard';
import { GlobeAltIcon } from './icons/GlobeAltIcon';
import { WalletIcon } from './icons/WalletIcon';
import { ArrowsRightLeftIcon } from './icons/ArrowsRightLeftIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { BrainCircuitIcon } from './icons/BrainCircuitIcon';
import { BuildingOfficeIcon } from './icons/BuildingOfficeIcon';
import { HeartIcon } from './icons/HeartIcon';

const ecosystemComponents = [
  {
    name: 'Kindraai Metaverse',
    icon: <GlobeAltIcon className="w-5 h-5 text-indigo-400" />,
    status: 'OPERATIONAL',
    description: 'Sovereign digital environment for IP interaction.'
  },
  {
    name: 'Office Works Command',
    icon: <BuildingOfficeIcon className="w-5 h-5 text-green-400" />,
    status: 'OPERATIONAL',
    description: 'Sovereign business management suite.'
  },
  {
    name: 'Secure Med App',
    icon: <HeartIcon className="w-5 h-5 text-amber-400" />,
    status: 'ENCRYPTED',
    description: 'HIPAA-compliant personal health command center.'
  },
  {
    name: 'High Tower Application',
    icon: <BuildingOfficeIcon className="w-5 h-5 text-gray-400" />,
    status: 'SECURE',
    description: 'High-level executive command and control.'
  },
  {
    name: 'RadestPay',
    icon: <WalletIcon className="w-5 h-5 text-green-400" />,
    status: 'SECURE',
    description: 'On-chain payment and treasury gateway.'
  },
  {
    name: 'Microsoft Co-Pilot',
    icon: <BrainCircuitIcon className="w-5 h-5 text-sky-400" />,
    status: 'INTEGRATED',
    description: 'AI-assisted development and analysis.'
  },
  {
    name: 'Grok AI',
    icon: <BrainCircuitIcon className="w-5 h-5 text-purple-400" />,
    status: 'INTEGRATED',
    description: 'Verdict and reasoning engine.'
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
    description: 'Encrypted connectivity to external services.'
  },
  {
    name: 'File Bridge',
    icon: <ArrowsRightLeftIcon className="w-5 h-5 text-cyan-400" />,
    status: 'SYNCED',
    description: 'Verifiable asset transfer across networks.'
  },
  {
    name: 'FortiFile™ Bridge',
    icon: <ArrowsRightLeftIcon className="w-5 h-5 text-teal-400" />,
    status: 'SECURE',
    description: 'Immutable IP asset registration.'
  },
  {
    name: 'SoulSync Vault',
    icon: <ArrowsRightLeftIcon className="w-5 h-5 text-teal-400" />,
    status: 'ENCRYPTED',
    description: 'Trade secret and ledger synchronization.'
  },
];

const EcosystemStatus: React.FC<{color?: 'indigo'}> = ({ color = 'indigo' }) => {
  return (
    <WidgetCard title="Radest Ecosystem Status" icon={<GlobeAltIcon className="w-6 h-6" />} color={color}>
        <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
            {ecosystemComponents.map((component) => (
                <div key={component.name} className="bg-indigo-900/20 p-3 rounded-md flex items-center justify-between border border-indigo-500/10">
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