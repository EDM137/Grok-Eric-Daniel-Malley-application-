import React, { useState } from 'react';
import WidgetCard from './WidgetCard';
import { HandshakeIcon } from './icons/HandshakeIcon';
import { QrCodeIcon } from './icons/QrCodeIcon';
import { sendOfficialReceipt } from '../services/emailService';
import { EnvelopeIcon } from './icons/EnvelopeIcon';

const AllyPortal: React.FC<{color?: 'amber'}> = ({ color = 'amber' }) => {
    
    const PAYPAL_BUTTON_ID = "BXEQSD9HXKY2A";
    const PAYPAL_URL = `https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=${PAYPAL_BUTTON_ID}`;
    const [emailStatus, setEmailStatus] = useState<'IDLE' | 'SENDING' | 'SENT'>('IDLE');


    const handleLicenseClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setEmailStatus('SENDING');

        const subject = "Official Receipt: RADEST Sovereign IP License";
        const body = `
            <p>Dear Ally,</p>
            <p>Thank you for licensing sovereign IP from the Radest Publishing Co. ecosystem. Your transaction is being processed via PayPal.</p>
            <p>Upon successful payment, your <strong>Quantum Seal NFT</strong> will be minted and transferred to your designated wallet, validating your status as a verified ally.</p>
            <p>This email serves as your official receipt. The RADEST Sovereign Treasury EULA, including the $500,000 theft clause, is now in effect.</p>
            <p>Sincerely,</p>
            <p><strong>Eric Daniel Malley</strong><br/>Radest Publishing Co.</p>
        `;
        
        await sendOfficialReceipt(subject, body, 'mybusinesspartnereric@gmail.com');
        
        setEmailStatus('SENT');
        setTimeout(() => {
            setEmailStatus('IDLE');
            window.open(PAYPAL_URL, '_blank', 'noopener,noreferrer');
        }, 2000);
    };


  return (
    <WidgetCard title="Ally Portal" icon={<HandshakeIcon className="w-6 h-6" />} color={color}>
      <div className="space-y-4 text-sm">
        <p>License sovereign IP and receive a Quantum Seal NFT to validate your alliance.</p>
        <div className="p-3 bg-amber-900/20 rounded-md border border-amber-500/20">
            <p className="font-bold">RADEST Sovereign Treasury EULA</p>
            <p className="text-xs text-gray-400">Includes $500,000 theft clause.</p>
        </div>
        <a 
          href={PAYPAL_URL}
          onClick={handleLicenseClick}
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full bg-amber-600 hover:bg-amber-500 transition-colors duration-300 text-black font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
        >
          <QrCodeIcon className="w-5 h-5"/>
          <span>License via PayPal & Mint Quantum Seal</span>
        </a>
        {emailStatus === 'SENT' && (
            <div className="flex items-center justify-center space-x-2 text-green-400 text-xs animate-pulse">
                <EnvelopeIcon className="w-4 h-4" />
                <span>Official receipt sent to your primary email.</span>
            </div>
        )}
      </div>
    </WidgetCard>
  );
};

export default AllyPortal;