
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
    <div className="min-h-screen bg-gray-900 text-gray-200 relative">
      {/* Background Grid */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] -z-10"
        style={{
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)',
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 bg-black/30 backdrop-blur-sm min-h-screen">
        <Header />
        <main className="container mx-auto p-4 md:p-8">
          <Dashboard />
        </main>
        <footer className="text-center p-4 text-xs text-gray-500 border-t border-gray-800">
          <p className="mb-2">RADEST PROPRIETARY LICENSING FRAMEWORK v4.0 | Owner: Eric Daniel Malley | Entity: Radest Publishing Co.</p>
          <div className="flex justify-center items-center space-x-4 flex-wrap">
            <button onClick={() => handleShowLegal('Terms of Service')} className="hover:text-cyan-300 transition-colors">Terms of Service</button>
            <span className="opacity-50">|</span>
            <button onClick={() => handleShowLegal('Privacy Policy')} className="hover:text-cyan-300 transition-colors">Privacy Policy</button>
            <span className="opacity-50">|</span>
            <button onClick={() => handleShowLegal('Sovereign EULA')} className="hover:text-cyan-300 transition-colors">Sovereign EULA</button>
            <span className="opacity-50">|</span>
            <button onClick={() => handleShowLegal('Intellectual Property Disclosure Agreement')} className="hover:text-cyan-300 transition-colors">IP Disclosure Agreement</button>
          </div>
        </footer>
        {legalDoc && <LegalModal docType={legalDoc} onClose={handleCloseLegal} />}
      </div>
    </div>
  );
};

export default App;
