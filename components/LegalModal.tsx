
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
      **INTELLECTUAL PROPERTY DISCLOSURE AGREEMENT**
      **RADEST PROPRIETARY LICENSING FRAMEWORK v4.0**

      **1. PARTIES & SCOPE**
      This Intellectual Property Disclosure Agreement ("Agreement") is entered into by and between the User ("Ally") and Eric Daniel Malley / Radest Publishing Co. ("Owner"). This Agreement governs the access, viewing, and potential usage of the proprietary Intellectual Property (IP) contained within the RADEST ALLY VAULT v4.0.

      **2. DEFINITION OF INTELLECTUAL PROPERTY**
      "Intellectual Property" includes, but is not limited to:
      *   **Proprietary Algorithms:** The Kindraai Guardian PI Engine, Emotional Proof-of-Work (PoW) consensus mechanisms, and deepfake detection logic.
      *   **Theoretical Frameworks:** The "Double Quadruple Helix" propulsion system, Zero-Point Energy applications, and non-fungible sovereign identity protocols.
      *   **Source Code:** All frontend and backend codebases, including the Application Bridge, Web Bridge, and FortiFile™ schemas.
      *   **Creative Assets:** The Quantum Seal design, RADEST trademarks, and all visual/audio content.

      **3. CONFIDENTIALITY & TRADE SECRETS**
      The Ally acknowledges that the IP constitutes valuable "Trade Secrets" of the Owner. The Ally agrees to hold all such IP in strict confidence and shall not disclose, reproduce, distribute, reverse engineer, or decompile any portion of the System without the Owner's express, cryptographically signed written consent.

      **4. LIMITED LICENSE**
      Access to this Vault grants a limited, revocable, non-exclusive license to *view* the IP for the purpose of authorized ecosystem participation. This is NOT a transfer of title or ownership.

      **5. NON-CIRCUMVENTION**
      The Ally agrees not to bypass, disable, or interfere with any security features of the Vault, including but not limited to the Kindraai Guardian, FortiFile™ Notary, or Quantum Seal verification.

      **6. ENFORCEMENT & REMEDIES**
      Violation of this Agreement constitutes a breach of the Sovereign EULA. The Owner reserves the right to:
      *   Immediately revoke Ally status and all associated licenses.
      *   Enforce the **$500,000.00 USD** liquidated damages clause pursuant to the Sovereign EULA.
      *   Pursue injunctive relief and all other remedies available under applicable law.

      **BY ACCESSING THIS DOCUMENT, YOU ACKNOWLEDGE AND AGREE TO THESE TERMS.**
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
