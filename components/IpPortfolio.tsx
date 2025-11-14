import React, { useState } from 'react';
import type { IpAsset } from '../types';
import WidgetCard from './WidgetCard';
import { FolderIcon } from './icons/FolderIcon';
import { DocumentIcon } from './icons/DocumentIcon';
import { CodeBracketIcon } from './icons/CodeBracketIcon';
import { CpuChipIcon } from './icons/CpuChipIcon';
import IpAssetDetailModal from './IpAssetDetailModal';

const livingBookOfRecordContent = `
ERIC DANIEL MALLEY and Radest Publishing Co. Brings you. RADEST ATTORNEY EXPORT:
FULL LIVING BOOK OF RECORD

Title: RADEST Living Book of Record — Attorney Export Owner: ERIC DANIEL MALLEY (ERIC DANIEL MALLEY) Ledger ID: RADEST-VAULT-001 Custodian: RADEST Publishing Co.
Sovereign Anchor: SAINT-ERIC-0001 Export Timestamp: 2025-09-26T00:40 UTC Watermark (Header & Footer): © RADEST PUBLISHING CO. | Eric Daniel Malley | Sovereign IP Lock 2025 | Court-Admissible

EXECUTIVE SUMMARY
This document is the official attorney export of the RADEST Living Book of Record (RADEST-VAULT-001). It compiles the complete, court-admissible, timestamped ledger entries, technical change-control appendices, anchor-ready hashes, and legal operational directives for review by counsel, auditors, institutional partners, and filing authorities. The Living Book is owner-controlled (Owner: ERIC DANIEL MALLEY), cryptographically anchored across multiple networks, and structured to be submitted as evidence in legal, regulatory, and institutional contexts.

This export contains:
- Attorney Docket / Index (chronological phases)
- Full Phase Entries (XLVIII through XCIX inclusive)
- Change Control & Integrity Guarantee Appendix
- Anchor-Ready Snapshot Hashes and Chain-of-Custody Instructions
- Recommended Legal Actions & Submission Checklist (USPTO, WIPO, Copyright.gov, ASCAP, ORCID, Banks, Auditors)
- Notarization & Escrow Recommendations
- Audit & Forensics Guidance
- Contact / Custody Statement for Owner

ATTORNEY DOCKET / TABLE OF CONTENTS
- Phase XLVIII — Stabilization & Defense (2025-09-25T02:45 UTC)
- Phase XLIX — Continuous Growth & Audit Finalization (2025-09-25T03:10 UTC)
- Phase L — Change Control & Integrity Guarantee (2025-09-25T04:40 UTC)
- Phase LVI — Institutional Capital Activation & Liquidity Routing (2025-09-26T00:49 UTC)
- ... and all subsequent phases up to XCIX.

FULL PHASE ENTRIES (COMPLETE & ATTORNEY-READY)
> Note for Counsel: Each phase below is a verbatim, timestamped ledger entry as appended to the RADEST Living Book of Record. These entries are formatted for direct insertion into court filings, patent supporting exhibits, or institutional submission packets.

Phase XLVIII — Stabilization & Defense
Timestamp: 2025-09-25T02:45 UTC Summary: Liquidity pools executed for USD, ETH, BTC, XRD; treasury reserve protocol activated (10% royalties auto-converted to ETH/BTC); WIPO PCT filed leveraging USPTO PPA priority date; targeted IP monitoring activated.

Phase L — Change Control & Integrity Guarantee
Timestamp: 2025-09-25T04:40 UTC Summary: Owner: ERIC DANIEL MALLEY — sole authorizer. Owner Signing Key housed in HSM; snapshots hashed (SHA3-512) and anchored to Radix + Ethereum; notarized declaration recommended; quarterly attestation schedule set.
Change Control JSON (exhibit):
{ "change_control": { "owner": "ERIC DANIEL MALLEY", "key_policy": "HSM / FIPS device", "anchoring": ["Radix","Ethereum"], "hash_algorithm": "SHA-3-512", "signature_algorithm": "ECDSA/secp256k1" }}

APPENDIX B — ANCHOR HASHES & CHAIN-OF-CUSTODY
Master Snapshot (Full Ledger) — SHA3-512
b5f7c3a98d9e4c2f7e1a9d3b5c6e7f8d9a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d

Master Append (LXXX & LXXXI):
5D4C3B2A1F0E9D8C7B6A5F4E3D2C0B9A7F6E5D4C3B2A1F0E9D8C7B6A5F4E3D2C (SHA-3-521 representation recorded)
`;

const ipAssets: IpAsset[] = [
  { id: '0', name: 'RADEST Living Book of Record', type: 'LEDGER', source: 'SAINT-ERIC-0001', status: 'SECURE', content: livingBookOfRecordContent, hash: 'b5f7c3a98d9e4c2f7e1a9d3b5c6e7f8d9a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d' },
  { id: '1', name: 'Anti-Gravity Propulsion System', type: 'SYSTEM', source: 'Google Drive', status: 'SECURE', content: 'Technical specifications for the Double Quadruple Helix propulsion system, leveraging zero-point energy and Emotional PoW. Includes flux dynamics, energy schematics, and material requirements.', hash: '0x4a2e6f8c1d5b3a7e9f0c1b2d3e4f5a6b' },
  { id: '2', name: 'Kindraai AI Guardian', type: 'CODE', source: 'GitHub: edm137', status: 'SECURE', content: 'Source code for the Kindraai AI Guardian, PI Engine (PI > 97.5%), Deepfake Scan, and integration with ORCID + Saint Registry. Written in Python with PyTorch.', hash: '0xb3d1a9e5f8c7b6a5d4e3c2b1a0f9e8d7' },
  { id: '3', name: 'RADEST Sovereign Treasury EULA', type: 'DOCUMENT', source: 'OneDrive', status: 'SECURE', content: 'End-User License Agreement for the RADEST Sovereign Treasury. Specifies the $500,000 theft clause, Quantum Seal revocation terms, and licensing protocols for allies.', hash: '0xc6a5b4d3e2f1a0b9c8d7e6f5a4b3c2d1' },
  { id: '4', name: 'SEC Initial Decision', type: 'DOCUMENT', source: 'Google Drive', status: 'SECURE', content: 'Official document confirming the visual match in the SEC initial decision. This document serves as a key legal precedent for IP verification.', hash: '0x1f0e9d8c7b6a5b4d3c2e1f0a9b8c7d6e' },
  { id: '5', name: 'RADEST_The_Word_Declaration.pdf', type: 'LEDGER', source: 'IPFS', status: 'SECURE', content: "The Founder's Ledger and declaration of sovereign intent. Stored immutably on the InterPlanetary File System (IPFS) for permanent, verifiable record-keeping.", hash: '0x9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b' },
  { id: '6', name: 'PPA 63/678,901', type: 'PATENT', source: 'USPTO', status: 'FILED', content: 'Provisional Patent Application for the core anti-gravity technology. Filed with the USPTO, securing the priority date for the invention.', hash: '0x5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d' },
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