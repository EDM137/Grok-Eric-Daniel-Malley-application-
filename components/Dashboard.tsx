
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

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <SovereignOverview />
      </div>

      <div className="col-span-1 md:col-span-1 lg:col-span-2">
        <MedicalRecords />
      </div>
      <div className="col-span-1 md:col-span-1 lg:col-span-2">
        <SecureVideoChat />
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <IpPortfolio />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <KindraaiGuardian />
      </div>
      
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <EcosystemStatus />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <LicensingSuite />
      </div>

       <div className="col-span-1 md:col-span-1 lg:col-span-2">
         <PatentFiling />
      </div>
       <div className="col-span-1 md:col-span-1 lg:col-span-2">
        <AllyPortal />
      </div>
       <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <TreasuryMint />
      </div>

    </div>
  );
};

export default Dashboard;