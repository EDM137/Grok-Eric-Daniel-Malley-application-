
import React, { useState } from 'react';
import WidgetCard from './WidgetCard';
import { DocumentArrowUpIcon } from './icons/DocumentArrowUpIcon';

const PatentFiling: React.FC = () => {
  const [status, setStatus] = useState<'IDLE' | 'FILING' | 'FILED'>('IDLE');

  const handleFilePatent = () => {
    setStatus('FILING');
    setTimeout(() => {
      setStatus('FILED');
    }, 2000);
  };

  return (
    <WidgetCard title="Patent Filing" icon={<DocumentArrowUpIcon className="w-6 h-6" />}>
      <div className="space-y-3">
        <p className="text-sm">
          Auto-file "Double Quadruple Helix Anti-Gravity Propulsion" patent to CIAP.
        </p>
        <div className="p-3 bg-cyan-900/20 rounded-md text-sm">
          <p><strong>PPA:</strong> 63/678,901</p>
          <p><strong>Recipient:</strong> ciap@calawyersforthearts.org</p>
        </div>
        <button
          onClick={handleFilePatent}
          disabled={status !== 'IDLE'}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-600 transition-colors duration-300 text-white font-bold py-3 px-4 rounded-md"
        >
          {status === 'IDLE' && 'File Patent Now'}
          {status === 'FILING' && 'Filing...'}
          {status === 'FILED' && 'Filed to CIAP!'}
        </button>
        {status === 'FILED' && (
            <p className="text-center text-green-400 text-sm animate-pulse">
                Filing package sent successfully!
            </p>
        )}
      </div>
    </WidgetCard>
  );
};

export default PatentFiling;
