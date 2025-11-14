
import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import LegalModal from './components/LegalModal';
import type { LegalDoc } from './types';

const App: React.FC = () => {
  const [legalDoc, setLegalDoc] = useState<LegalDoc | null>(null);

  const handleShowLegal = (doc: LegalDoc) => {
    setLegalDoc(doc);
  };

  const handleCloseLegal = () => {
    setLegalDoc(null);
  };

  return (
    <div className="min-h-screen bg-black bg-opacity-80 backdrop-blur-sm text-cyan-300">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-grid-cyan-500/[0.2] -z-10"
        style={{
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black, transparent 70%)',
          backgroundSize: '40px 40px',
        }}
      ></div>
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <Dashboard />
      </main>
      <footer className="text-center p-4 text-xs text-gray-500 border-t border-cyan-900/50">
        <p className="mb-2">RADEST PROPRIETARY LICENSING FRAMEWORK v4.0 | Owner: Eric Daniel Malley | Entity: Radest Publishing Co.</p>
        <div className="flex justify-center items-center space-x-4">
          <button onClick={() => handleShowLegal('Terms of Service')} className="hover:text-cyan-300 transition-colors">Terms of Service</button>
          <span className="opacity-50">|</span>
          <button onClick={() => handleShowLegal('Privacy Policy')} className="hover:text-cyan-300 transition-colors">Privacy Policy</button>
           <span className="opacity-50">|</span>
          <button onClick={() => handleShowLegal('Sovereign EULA')} className="hover:text-cyan-300 transition-colors">Sovereign EULA</button>
        </div>
      </footer>
      {legalDoc && <LegalModal docType={legalDoc} onClose={handleCloseLegal} />}
    </div>
  );
};

export default App;
