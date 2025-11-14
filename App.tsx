
import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
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
      <footer className="text-center p-4 text-xs text-gray-500">
        <p>RADEST PROPRIETARY LICENSING FRAMEWORK v4.0 | Owner: Eric Daniel Malley | Entity: Radest Publishing Co.</p>
      </footer>
    </div>
  );
};

export default App;
