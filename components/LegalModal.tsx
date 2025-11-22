
import React from 'react';
import { LegalDoc } from '../types';
import { XMarkIcon } from './icons/XMarkIcon';

interface LegalModalProps {
  docType: LegalDoc;
  onClose: () => void;
}

const legalContent: Record<LegalDoc, { title: string, content: string }> = {
  'Terms of Service': {
    title: 'Terms of Service',
    content: `
      Welcome to the RADEST ALLY VAULT v4.0. By accessing this sovereign command center, you agree to be bound by these Terms of Service.
      This system is the proprietary, non-open-source intellectual property of Eric Daniel Malley and Radest Publishing Co.
      Unauthorized access, reproduction, or distribution of any asset within this vault is strictly prohibited and will trigger automated legal enforcement under the RADEST EULA, including the $500,000 minimum theft clause.
      All interactions are logged and cryptographically signed. Your access constitutes consent to this monitoring for security and integrity purposes.
    `
  },
  'Privacy Policy': {
    title: 'Privacy Policy',
    content: `
      This Privacy Policy governs the manner in which RADEST ALLY VAULT v4.0 collects, uses, maintains, and discloses information.
      All data, including personal identification information, linked account data, and IP assets, are protected by end-to-end encryption.
      We do not sell, trade, or rent user identification information to others. All data is used exclusively for the operational integrity and security of the Radest Ecosystem.
      Biometric data used for authentication is processed on-device and is never transmitted or stored on our servers.
    `
  },
  'Sovereign EULA': {
    title: 'RADEST Sovereign Treasury End-User License Agreement',
    content: `
      This EULA grants you a limited, non-exclusive, non-transferable, revocable license to use the RADEST ALLY VAULT v4.0.
      1.  **IP ENFORCEMENT:** Any attempt to access, copy, or exfiltrate IP assets without a valid, on-chain Quantum Seal will be treated as digital theft.
      2.  **THEFT CLAUSE:** Violations will result in an immediate and non-negotiable penalty of $500,000 USD, payable to Radest Publishing Co.
      3.  **QUANTUM SEAL REVOCATION:** Any breach of this EULA will result in the immediate and permanent revocation of any and all issued Quantum Seal NFTs, terminating your status as a verified ally.
      4.  **JURISDICTION:** All disputes arising from this EULA shall be settled under the sovereign jurisdiction of the laws governing Radest Publishing Co.
    `
  },
  'Intellectual Property Disclosure Agreement': {
    title: 'Intellectual Property Disclosure Agreement',
    content: `
      THIS AGREEMENT GOVERNS THE DISCLOSURE AND PROTECTION OF ALL INTELLECTUAL PROPERTY (IP) WITHIN THE RADEST ECOSYSTEM.

      1. **ACKNOWLEDGMENT OF OWNERSHIP:** The User acknowledges that all data, algorithms, codebases (including the Kindraai Guardian), and proprietary concepts (e.g., "Emotional PoW", "Double Quadruple Helix") are the exclusive property of Eric Daniel Malley and Radest Publishing Co.

      2. **CONFIDENTIALITY & NON-DISCLOSURE:** All assets viewed, accessed, or interacted with in this Vault are classified as confidential trade secrets unless publicly released by the Owner. The User agrees to maintain strict confidentiality and shall not disclose any details to third parties without cryptographically signed authorization.

      3. **RESTRICTIONS ON USE:** The User shall not reverse engineer, decompile, or attempt to derive the source code of any software provided within the Vault. Derivative works are strictly prohibited.

      4. **ENFORCEMENT:** Breach of this agreement triggers the specific performance clauses of the Sovereign EULA, including the $500,000 penalty and immediate revocation of Ally status.
    `
  }
};

const LegalModal: React.FC<LegalModalProps> = ({ docType, onClose }) => {
  const { title, content } = legalContent[docType];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-900 border border-cyan-500/50 rounded-lg shadow-2xl shadow-cyan-900/50 max-w-2xl w-full m-4 transform animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-cyan-500/20 flex justify-between items-center">
            <h2 className="font-bold text-xl text-cyan-400 tracking-wide">{title}</h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label={`Close ${title}`}
            >
                <XMarkIcon className="w-6 h-6" />
            </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <p className="whitespace-pre-wrap text-gray-300 text-sm leading-relaxed font-sans">{content.trim()}</p>
        </div>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default LegalModal;
