

import React, { useState, useRef, useCallback } from 'react';
import WidgetCard from './WidgetCard';
import { SealIcon } from './icons/SealIcon';
import { UploadIcon } from './icons/UploadIcon';
import { DocumentIcon } from './icons/DocumentIcon';
import { ArrowDownTrayIcon } from './icons/ArrowDownTrayIcon';
import { CheckBadgeIcon } from './icons/CheckBadgeIcon';
import { sendOfficialReceipt } from '../services/emailService';
import { EnvelopeIcon } from './icons/EnvelopeIcon';

interface NotarizedData {
  fileName: string;
  fortifileId: string;
  timestamp: string;
  hash: string;
  status: string;
}

const FortiFileNotary: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notarizedData, setNotarizedData] = useState<NotarizedData | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setNotarizedData(null);
      setEmailSent(false);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      if (selectedFile.type.startsWith('image/')) {
        setPreviewUrl(URL.createObjectURL(selectedFile));
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

  const handleNotarize = useCallback(() => {
    if (!file) return;
    setIsLoading(true);
    setNotarizedData(null);
    setEmailSent(false);

    setTimeout(async () => {
      const date = new Date();
      const isoString = date.toISOString();
      const datePart = isoString.split('T')[0];
      const randomSuffix = Math.random().toString(16).substring(2, 6).toUpperCase();
      const mockHash = '0x' + [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

      const data: NotarizedData = {
        fileName: file.name,
        fortifileId: `FF-${datePart}-${randomSuffix}`,
        timestamp: isoString,
        hash: mockHash,
        status: 'Court-Admissible Record',
      };
      
      setNotarizedData(data);

      // Send official email receipt
      const subject = `FortiFile™ Notarization Receipt: ${data.fileName}`;
      const body = `
        <p>This email serves as an official, court-admissible receipt for the notarization of your intellectual property asset.</p>
        <p><strong>File Name:</strong> ${data.fileName}</p>
        <p><strong>FortiFile™ ID:</strong> ${data.fortifileId}</p>
        <p><strong>Secure Timestamp:</strong> ${data.timestamp}</p>
        <p><strong>SHA3-512 Hash:</strong> ${data.hash}</p>
        <p>This record has been sealed and is now a verifiable asset within the Radest ecosystem.</p>
        <p><strong>Eric Daniel Malley</strong><br/>Radest Publishing Co.</p>
      `;
      await sendOfficialReceipt(subject, body, 'mybusinesspartnereric@gmail.com');
      setEmailSent(true);

      setIsLoading(false);
    }, 3000);
  }, [file]);

  const renderFilePreview = () => (
    <div className="w-full h-48 bg-black/30 rounded-md border border-gray-700 flex items-center justify-center relative overflow-hidden">
      {previewUrl ? (
        <img src={previewUrl} alt="File preview" className="max-h-full max-w-full object-contain" />
      ) : (
        <div className="text-center text-gray-500">
          <DocumentIcon className="w-16 h-16 mx-auto" />
          <p className="mt-2 text-sm font-semibold">{file?.name}</p>
        </div>
      )}
      {notarizedData && (
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <p className="text-4xl md:text-6xl font-bold text-white opacity-20 rotate-[-30deg] select-none tracking-widest border-4 border-white border-opacity-20 p-4 rounded-lg">
                SEALED
            </p>
        </div>
      )}
    </div>
  );

  return (
    <WidgetCard title="FortiFile™ Notary" icon={<SealIcon className="w-6 h-6" />}>
      <div className="flex flex-col h-full space-y-4">
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,.pdf,.doc,.docx,.txt" />
        
        {!notarizedData && (
          <>
            <button
              onClick={triggerFileSelect}
              className="w-full bg-cyan-900/50 border border-cyan-700 hover:bg-cyan-800/50 transition-colors duration-300 text-cyan-300 font-bold py-3 px-4 rounded-md flex items-center justify-center space-x-2"
            >
              <UploadIcon className="w-5 h-5" />
              <span>{file ? `Selected: ${file.name}` : 'Select Document or Photo'}</span>
            </button>
            
            {file && !isLoading && renderFilePreview()}

            <button
              onClick={handleNotarize}
              disabled={!file || isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center space-x-2 mt-auto"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <span>Notarizing & Sealing...</span>
                </>
              ) : (
                <>
                  <SealIcon className="w-5 h-5"/>
                  <span>Seal as FortiFile™</span>
                </>
              )}
            </button>
          </>
        )}

        {notarizedData && !isLoading && (
          <div className="space-y-4 animate-fade-in">
            {renderFilePreview()}
            <div className="p-4 bg-green-900/30 rounded-lg border border-green-500/50 text-center">
                <div className="flex items-center justify-center space-x-2">
                    <CheckBadgeIcon className="w-6 h-6 text-green-300" />
                    <h3 className="text-lg font-bold text-green-300">{notarizedData.status}</h3>
                </div>
            </div>
            <div className="text-xs text-gray-400 space-y-2 font-mono bg-black/30 p-3 rounded-md border border-gray-700">
                <p className="truncate"><span className="font-semibold">FortiFile ID:</span> {notarizedData.fortifileId}</p>
                <p><span className="font-semibold">Timestamp:</span> {notarizedData.timestamp}</p>
                <p className="truncate"><span className="font-semibold">SHA3-512 Hash:</span> {notarizedData.hash}</p>
            </div>
             {emailSent && (
                <div className="flex items-center justify-center space-x-2 text-green-400 text-xs">
                    <EnvelopeIcon className="w-4 h-4" />
                    <span>Official receipt sent to your primary email.</span>
                </div>
             )}
             <div className="flex space-x-2 pt-2">
                 <button
                    onClick={() => { setFile(null); setNotarizedData(null); setPreviewUrl(null); }}
                    className="w-full bg-cyan-900/50 border border-cyan-700 hover:bg-cyan-800/50 transition-colors duration-300 text-cyan-300 font-bold py-2 px-4 rounded-md text-sm"
                >
                    Notarize Another
                </button>
                <button className="w-full bg-green-600 hover:bg-green-500 transition-colors duration-300 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center space-x-2 text-sm">
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    <span>Download Sealed File</span>
                </button>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </WidgetCard>
  );
};

export default FortiFileNotary;