
import React from 'react';
import WidgetCard from './WidgetCard';
import { DocumentCheckIcon } from './icons/DocumentCheckIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

const licenses = [
  {
    name: 'Ally License Framework',
    type: 'Sovereign EULA',
    status: 'ACTIVE',
    description: 'Standard license for all verified allies.'
  },
  {
    name: 'Technology & API License',
    type: 'Commercial Use',
    status: 'TEMPLATE READY',
    description: 'For integrating Radest tech into external apps.'
  },
  {
    name: 'IP Use & Content License',
    type: 'Creative Commons (Modified)',
    status: 'ACTIVE',
    description: 'For approved use of creative and media assets.'
  },
  {
    name: 'Patent & Trade Secret License',
    type: 'Exclusive Grant',
    status: 'NEGOTIATION',
    description: 'High-level agreements for core technologies.'
  }
];

const LicensingSuite: React.FC = () => {
  return (
    <WidgetCard title="Radest Licensing Suite" icon={<DocumentCheckIcon className="w-6 h-6" />}>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        <p className="text-xs text-gray-400 pb-2 border-b border-cyan-900/50">
          All licenses are exclusive to Eric Daniel Malley & Radest Publishing Co.
        </p>
        {licenses.map((license) => (
          <div key={license.name} className="bg-cyan-900/20 p-3 rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">{license.name}</p>
                <p className="text-xs text-gray-400">{license.description}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                license.status === 'ACTIVE' ? 'bg-green-500/20 text-green-300' : 
                license.status === 'TEMPLATE READY' ? 'bg-blue-500/20 text-blue-300' : 'bg-yellow-500/20 text-yellow-300'
              }`}>
                {license.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
};

export default LicensingSuite;
