import React from 'react';
import SovereignOverview from './SovereignOverview';
import IpPortfolio from './IpPortfolio';
import KindraaiGuardian from './KindraaiGuardian';
import AllyPortal from './AllyPortal';
import TreasuryMint from './TreasuryMint';
import SecureVideoChat from './SecureVideoChat';
import EcosystemStatus from './EcosystemStatus';
import BackendGuru from './BackendGuru';
import AiChatNexus from './AiChatNexus';
import FortiFileNotary from './FortiFileNotary';
import FileBridge from './FileBridge';
import ApiSyncEngine from './ApiSyncEngine';
import OfficeWorksCommand from './OfficeWorksCommand';
import SecureMedApp from './SecureMedApp';
import SoulSyncVault from './SoulSyncVault';
import PatentFiling from './PatentFiling';

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* --- SOVEREIGN & AI CORE --- */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <SovereignOverview color="blue" />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <AiChatNexus />
      </div>
      
      {/* --- IP MANAGEMENT --- */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <IpPortfolio color="blue" />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <KindraaiGuardian color="blue" />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <FortiFileNotary color="blue" />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <PatentFiling />
      </div>

      {/* --- SYSTEMS & INFRASTRUCTURE --- */}
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <EcosystemStatus color="indigo" />
      </div>
      <div className="col-span-1 md:col-span-1 lg:col-span-1">
        <ApiSyncEngine color="indigo" />
      </div>
      <div className="col-span-1 md:col-span-1 lg:col-span-1">
        <SoulSyncVault color="indigo" />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <BackendGuru color="indigo" />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <FileBridge color="indigo" />
      </div>

      {/* --- SOVEREIGN APPLICATIONS --- */}
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <OfficeWorksCommand color="green" />
      </div>
       <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <TreasuryMint color="green" />
      </div>
      
      {/* --- PERSONAL & SECURE COMMS --- */}
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <SecureMedApp color="amber" />
      </div>
      <div className="col-span-1 md:col-span-1 lg:col-span-1">
        <AllyPortal color="amber" />
      </div>
      <div className="col-span-1 md:col-span-1 lg:col-span-1">
        <SecureVideoChat color="amber" />
      </div>
    </div>
  );
};

export default Dashboard;