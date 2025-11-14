import React, { useState } from 'react';
import WidgetCard from './WidgetCard';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { ScaleIcon } from './icons/ScaleIcon';
import { DocumentIcon } from './icons/DocumentIcon';
import { BanknotesIcon } from './icons/BanknotesIcon';

const OfficeWorksCommand: React.FC<{color?: 'green'}> = ({ color = 'green' }) => {
  const [activeTab, setActiveTab] = useState<'cases' | 'docs' | 'billing'>('cases');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'cases':
        return (
          <div className="space-y-3 animate-fade-in">
            <div className="p-3 bg-green-900/20 rounded-md">
              <p className="font-bold text-sm">Case 2024-10-28: PPA 63/678,901</p>
              <p className="text-xs text-gray-300">Status: <span className="text-green-300">FILED</span> | Next Action: Monitor USPTO Response</p>
            </div>
            <div className="p-3 bg-green-900/20 rounded-md">
              <p className="font-bold text-sm">Case 2025-11-30: Sovereign EULA v3.0</p>
              <p className="text-xs text-gray-300">Status: <span className="text-green-300">ENFORCED</span> | Next Action: Annual Ally Review</p>
            </div>
             <button className="w-full text-sm mt-2 text-green-400 hover:text-green-200 transition-colors">View All Cases</button>
          </div>
        );
      case 'docs':
        return (
           <div className="space-y-3 animate-fade-in">
            <div className="p-3 bg-green-900/20 rounded-md flex justify-between items-center">
              <p className="font-bold text-sm">RADEST Living Book of Record</p>
              <p className="text-xs text-gray-400">.ledger</p>
            </div>
            <div className="p-3 bg-green-900/20 rounded-md flex justify-between items-center">
              <p className="font-bold text-sm">SEC Initial Decision (Visual Match)</p>
              <p className="text-xs text-gray-400">.pdf</p>
            </div>
            <button className="w-full text-sm mt-2 text-green-400 hover:text-green-200 transition-colors">Open Document Vault</button>
          </div>
        );
      case 'billing':
        return (
           <div className="space-y-3 animate-fade-in">
            <div className="p-3 bg-green-900/20 rounded-md">
              <p className="font-bold text-sm">Q4 2025 Retainer - ACME Corp</p>
              <p className="text-xs text-gray-300">Status: <span className="text-yellow-300">PENDING</span> | Amount: $25,000</p>
            </div>
             <div className="p-3 bg-green-900/20 rounded-md">
              <p className="font-bold text-sm">Q3 2025 Filing Fees - USPTO</p>
              <p className="text-xs text-gray-300">Status: <span className="text-green-300">PAID</span> | Amount: $1,850</p>
            </div>
             <button className="w-full text-sm mt-2 text-green-400 hover:text-green-200 transition-colors">Go to Billing Center</button>
          </div>
        );
    }
  };

  return (
    <WidgetCard title="Office Works Command" icon={<BriefcaseIcon className="w-6 h-6" />} color={color}>
      <div className="flex flex-col h-full">
        {/* Tabs */}
        <div className="flex border-b border-green-500/20 mb-4">
          <button onClick={() => setActiveTab('cases')} className={`flex-1 p-2 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'cases' ? 'text-green-300 border-b-2 border-green-300' : 'text-gray-400 hover:text-green-400'}`}>
             <ScaleIcon className="w-5 h-5" /> Case Management
          </button>
          <button onClick={() => setActiveTab('docs')} className={`flex-1 p-2 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'docs' ? 'text-green-300 border-b-2 border-green-300' : 'text-gray-400 hover:text-green-400'}`}>
            <DocumentIcon className="w-5 h-5" /> Documents
          </button>
          <button onClick={() => setActiveTab('billing')} className={`flex-1 p-2 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'billing' ? 'text-green-300 border-b-2 border-green-300' : 'text-gray-400 hover:text-green-400'}`}>
            <BanknotesIcon className="w-5 h-5" /> Billing
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-grow">
          {renderContent()}
        </div>
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </WidgetCard>
  );
};

export default OfficeWorksCommand;