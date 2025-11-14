
import React, { useState } from 'react';
import type { IpAsset } from '../types';
import WidgetCard from './WidgetCard';
import { FolderIcon } from './icons/FolderIcon';
import { DocumentIcon } from './icons/DocumentIcon';
import { CodeBracketIcon } from './icons/CodeBracketIcon';
import { CpuChipIcon } from './icons/CpuChipIcon';
import IpAssetDetailModal from './IpAssetDetailModal';

const ipAssets: IpAsset[] = [
  { id: '1', name: 'Anti-Gravity Propulsion System', type: 'SYSTEM', source: 'Google Drive', status: 'SECURE', content: 'Technical specifications for the Double Quadruple Helix propulsion system, leveraging zero-point energy and Emotional PoW. Includes flux dynamics, energy schematics, and material requirements.' },
  { id: '2', name: 'Kindraai AI Guardian', type: 'CODE', source: 'GitHub: edm137', status: 'SECURE', content: 'Source code for the Kindraai AI Guardian, PI Engine (PI > 97.5%), Deepfake Scan, and integration with ORCID + Saint Registry. Written in Python with PyTorch.' },
  { id: '3', name: 'RADEST Sovereign Treasury EULA', type: 'DOCUMENT', source: 'OneDrive', status: 'SECURE', content: 'End-User License Agreement for the RADEST Sovereign Treasury. Specifies the $500,000 theft clause, Quantum Seal revocation terms, and licensing protocols for allies.' },
  { id: '4', name: 'SEC Initial Decision', type: 'DOCUMENT', source: 'Google Drive', status: 'SECURE', content: 'Official document confirming the visual match in the SEC initial decision. This document serves as a key legal precedent for IP verification.' },
  { id: '5', name: 'RADEST_The_Word_Declaration.pdf', type: 'LEDGER', source: 'IPFS', status: 'SECURE', content: "The Founder's Ledger and declaration of sovereign intent. Stored immutably on the InterPlanetary File System (IPFS) for permanent, verifiable record-keeping." },
  { id: '6', name: 'PPA 63/678,901', type: 'PATENT', source: 'USPTO', status: 'FILED', content: 'Provisional Patent Application for the core anti-gravity technology. Filed with the USPTO, securing the priority date for the invention.' },
];

const getIconForType = (type: IpAsset['type']) => {
  switch (type) {
    case 'CODE': return <CodeBracketIcon className="w-5 h-5" />;
    case 'SYSTEM': return <CpuChipIcon className="w-5 h-5" />;
    default: return <DocumentIcon className="w-5 h-5" />;
  }
};

const IpPortfolio: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<IpAsset | null>(null);

  const handleAssetClick = (asset: IpAsset) => {
    setSelectedAsset(asset);
  };

  const handleCloseModal = () => {
    setSelectedAsset(null);
  };

  return (
    <>
      <WidgetCard title="IP Portfolio" icon={<FolderIcon className="w-6 h-6" />}>
        <div className="space-y-2">
          {ipAssets.map((asset) => (
            <button 
              key={asset.id}
              onClick={() => handleAssetClick(asset)}
              className="w-full bg-cyan-900/20 p-3 rounded-md flex justify-between items-center text-sm text-left hover:bg-cyan-900/40 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <div className="flex items-center space-x-3">
                  <div className="text-cyan-400">{getIconForType(asset.type)}</div>
                  <div>
                      <p className="font-semibold">{asset.name}</p>
                      <p className="text-xs text-gray-400">Source: {asset.source}</p>
                  </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                asset.status === 'FILED' ? 'bg-green-500/30 text-green-300' : 'bg-blue-500/30 text-blue-300'
              }`}>
                {asset.status}
              </span>
            </button>
          ))}
        </div>
      </WidgetCard>
      {selectedAsset && (
        <IpAssetDetailModal asset={selectedAsset} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default IpPortfolio;