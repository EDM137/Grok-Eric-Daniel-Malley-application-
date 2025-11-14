
import React from 'react';
import WidgetCard from './WidgetCard';
import { HandshakeIcon } from './icons/HandshakeIcon';
import { QrCodeIcon } from './icons/QrCodeIcon';

const AllyPortal: React.FC = () => {
    
    const PAYPAL_BUTTON_ID = "BXEQSD9HXKY2A";
    const PAYPAL_URL = `https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=${PAYPAL_BUTTON_ID}`;

  return (
    <WidgetCard title="Ally Portal" icon={<HandshakeIcon className="w-6 h-6" />}>
      <div className="space-y-4 text-sm">
        <p>License sovereign IP and receive a Quantum Seal NFT to validate your alliance.</p>
        <div className="p-3 bg-cyan-900/20 rounded-md">
            <p className="font-bold">RADEST Sovereign Treasury EULA</p>
            <p className="text-xs text-gray-400">Includes $500,000 theft clause.</p>
        </div>
        <a 
          href={PAYPAL_URL}
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full bg-blue-600 hover:bg-blue-500 transition-colors duration-300 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center space-x-2"
        >
          <QrCodeIcon className="w-5 h-5"/>
          <span>License via PayPal & Mint Quantum Seal</span>
        </a>
      </div>
    </WidgetCard>
  );
};

export default AllyPortal;
