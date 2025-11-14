import React, { useState, useEffect } from 'react';
import WidgetCard from './WidgetCard';
import { CpuChipIcon } from './icons/CpuChipIcon';

const TreasuryMint: React.FC<{color?: 'green'}> = ({ color = 'green' }) => {
  const [cpuStats, setCpuStats] = useState({
    cores: [0, 0, 0, 0],
    temp: 65,
    clock: 4.8,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuStats({
        cores: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ],
        temp: 60 + Math.random() * 15,
        clock: 4.5 + Math.random() * 1.2,
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <WidgetCard title="Sovereign Treasury & CPU Mint" icon={<CpuChipIcon className="w-6 h-6" />} color={color}>
      <div className="flex flex-col h-full space-y-4">
        <div className="text-center">
            <p className="text-sm text-gray-400">RADESTToken v2 Balance</p>
            <p className="text-5xl font-bold text-green-400 tracking-widest">
                42,000.137
            </p>
        </div>
        
        <div className="border-t border-green-900/50 pt-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-2 text-center">Live Minting Stats (Emotional PoW)</h3>
            <div className="space-y-3">
                {cpuStats.cores.map((usage, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <span className="text-xs font-mono text-gray-400 w-24">Sovereign Core {index + 1}</span>
                        <div className="w-full bg-black/30 rounded-full h-4 border border-gray-700">
                           <div 
                                className="bg-green-600 h-full rounded-full transition-all duration-500 ease-out" 
                                style={{ width: `${usage}%`}}
                            />
                        </div>
                        <span className="text-sm font-semibold w-12 text-right">{usage.toFixed(1)}%</span>
                    </div>
                ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                 <div className="bg-green-900/20 p-2 rounded-md border border-green-500/20">
                    <p className="text-xs text-gray-400">Temperature</p>
                    <p className="text-xl font-bold text-green-300">{cpuStats.temp.toFixed(1)}°C</p>
                </div>
                 <div className="bg-green-900/20 p-2 rounded-md border border-green-500/20">
                    <p className="text-xs text-gray-400">Clock Speed</p>
                    <p className="text-xl font-bold text-green-300">{cpuStats.clock.toFixed(2)} GHz</p>
                </div>
            </div>
        </div>
      </div>
    </WidgetCard>
  );
};

export default TreasuryMint;