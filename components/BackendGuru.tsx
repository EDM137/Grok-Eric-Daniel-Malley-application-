import React, { useState } from 'react';
import WidgetCard from './WidgetCard';
import { ServerStackIcon } from './icons/ServerStackIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

const services = [
    { name: 'Sovereign Auth API', status: 'ONLINE' },
    { name: 'IPFS Bridge Service', status: 'ONLINE' },
    { name: 'Treasury Ledger API', status: 'ONLINE' },
    { name: 'Kindraai Guardian Core', status: 'ONLINE' },
    { name: 'SoulSync Vault Endpoint', status: 'DEGRADED' },
    { name: 'RadestPay Gateway', status: 'ONLINE' },
];

const BackendGuru: React.FC<{color?: 'indigo'}> = ({ color = 'indigo' }) => {
    const [deployStatus, setDeployStatus] = useState<'IDLE' | 'DEPLOYING' | 'SUCCESS'>('IDLE');

    const handleDeploy = () => {
        setDeployStatus('DEPLOYING');
        setTimeout(() => {
            setDeployStatus('SUCCESS');
            setTimeout(() => setDeployStatus('IDLE'), 3000);
        }, 2500);
    };
    
    const getDeployButtonText = () => {
        switch(deployStatus) {
            case 'DEPLOYING': return 'Deploying...';
            case 'SUCCESS': return 'Deployed!';
            default: return 'Deploy to Production';
        }
    };

  return (
    <WidgetCard title="Backend Guru Portal" icon={<ServerStackIcon className="w-6 h-6" />} color={color}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Services */}
        <div className="lg:col-span-1">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Live Microservices</h3>
          <div className="space-y-2">
            {services.map(service => (
              <div key={service.name} className="flex items-center justify-between text-sm bg-indigo-900/10 p-2 rounded-md">
                <p className="text-gray-300">{service.name}</p>
                <span className={`text-xs font-bold flex items-center space-x-1 ${service.status === 'ONLINE' ? 'text-green-400' : 'text-yellow-400 animate-pulse'}`}>
                  <span>●</span>
                  <span>{service.status}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Systems & Deployment */}
        <div className="lg:col-span-2 space-y-4">
            <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Core Systems</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-indigo-900/20 p-3 rounded-md border border-indigo-500/20">
                        <p className="text-xs text-gray-400">Primary Database</p>
                        <p className="font-semibold">PostgreSQL (Sovereign Cluster)</p>
                        <p className="text-green-400 text-sm font-bold mt-1">HEALTH: OPTIMAL</p>
                    </div>
                    <div className="bg-indigo-900/20 p-3 rounded-md border border-indigo-500/20">
                        <p className="text-xs text-gray-400">Deployment Target</p>
                        <p className="font-semibold">Vercel (Global Edge Network)</p>
                         <p className="text-green-400 text-sm font-bold mt-1">STATUS: SYNCED</p>
                    </div>
                </div>
            </div>
             <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Deployment Pipeline</h3>
                <div className="p-3 bg-black/30 rounded-md border border-gray-700 font-mono text-xs">
                   <p><span className="text-green-400">✓</span> GitHub Push (main)</p>
                   <p><span className="text-green-400">✓</span> Build & Test Runner</p>
                   <p><span className="text-cyan-400">{'>'}</span> Ready for Production Deployment</p>
                </div>
            </div>
             <div className="pt-2">
                <button 
                    onClick={handleDeploy}
                    disabled={deployStatus !== 'IDLE'}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
                >
                     {deployStatus === 'DEPLOYING' && (
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                     )}
                     {deployStatus === 'SUCCESS' && <CheckCircleIcon className="w-5 h-5 mr-2" />}
                    <span>{getDeployButtonText()}</span>
                </button>
            </div>
        </div>
      </div>
    </WidgetCard>
  );
};

export default BackendGuru;