
import React from 'react';
import WidgetCard from './WidgetCard';
import { CubeTransparentIcon } from './icons/CubeTransparentIcon';

const TreasuryMint: React.FC = () => {
  return (
    <WidgetCard title="Sovereign Treasury" icon={<CubeTransparentIcon className="w-6 h-6" />}>
      <div className="text-center space-y-4">
        <p className="text-sm text-gray-400">RADESTToken v2 Balance</p>
        <p className="text-5xl font-bold text-cyan-400 tracking-widest">
            42,000.137
        </p>
        <p className="text-xs text-gray-500">Minted per kWh of Emotional PoW</p>
      </div>
    </WidgetCard>
  );
};

export default TreasuryMint;
