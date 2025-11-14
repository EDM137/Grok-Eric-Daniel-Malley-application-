import React from 'react';
import SovereignOverview from './SovereignOverview';
import IpPortfolio from './IpPortfolio';
import KindraaiGuardian from './KindraaiGuardian';
import AllyPortal from './AllyPortal';
import PatentFiling from './PatentFiling';
import TreasuryMint from './TreasuryMint';
import MedicalRecords from './MedicalRecords';
import SecureVideoChat from './SecureVideoChat';
import EcosystemStatus from './EcosystemStatus';
import LicensingSuite from './LicensingSuite';
import BackendGuru from './BackendGuru';
import AiChatNexus from './AiChatNexus';
import FortiFileNotary from './FortiFileNotary';
import FileBridge from './FileBridge';
import ApiSyncEngine from './ApiSyncEngine';

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Row 1: High Level */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <SovereignOverview />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <AiChatNexus />
      </div>
      
      {/* Row 2: IP Core */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <IpPortfolio />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <KindraaiGuardian />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <FortiFileNotary />
      </div>

      {/* Row 3: Systems & Infrastructure */}
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <EcosystemStatus />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <ApiSyncEngine />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <BackendGuru />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <FileBridge />
      </div>

      {/* Row 4: Legal & Finance */}
      <div className="col-span-1 md:col-span-1 lg:col-span-1">
        <PatentFiling />
      </div>
      <div className="col-span-1 md:col-span-1 lg:col-span-1">
        <LicensingSuite />
      </div>
      <div className="col-span-1 md:col-span-1 lg:col-span-1">
        <AllyPortal />
      </div>
      <div className="col-span-1 md:col-span-1 lg:col-span-1">
        <TreasuryMint />
      </div>
      
      {/* Row 5: Personal */}
      <div className="col-span-1 md:col-span-1 lg:col-span-2">
        <MedicalRecords />
      </div>
      <div className="col-span-1 md:col-span-1 lg:col-span-2">
        <SecureVideoChat />
      </div>
    </div>
  );
};

export default Dashboard;