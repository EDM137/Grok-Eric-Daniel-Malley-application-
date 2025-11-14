
import React from 'react';
import SovereignOverview from './SovereignOverview';
import IpPortfolio from './IpPortfolio';
import KindraaiGuardian from './KindraaiGuardian';
import AllyPortal from './AllyPortal';
import PatentFiling from './PatentFiling';
import TreasuryMint from './TreasuryMint';

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
        <SovereignOverview />
      </div>
      <div className="lg:col-span-2 xl:col-span-2">
        <IpPortfolio />
      </div>
      <div className="lg:col-span-1 xl:col-span-2">
        <KindraaiGuardian />
      </div>
      <div className="xl:col-span-1">
         <PatentFiling />
      </div>
       <div className="xl:col-span-2">
        <AllyPortal />
      </div>
      <div className="xl:col-span-1">
        <TreasuryMint />
      </div>
    </div>
  );
};

export default Dashboard;
