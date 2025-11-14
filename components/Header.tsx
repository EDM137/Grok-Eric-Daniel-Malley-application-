
import React from 'react';
import { UserCircleIcon } from './icons/UserCircleIcon';

const Header: React.FC = () => {
  return (
    <header className="p-4 md:p-6 border-b border-cyan-500/30 flex justify-between items-center">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold tracking-wider text-cyan-400">
          RADEST ALLY VAULT <span className="text-xl align-top opacity-70">v4.0</span>
        </h1>
        <p className="text-xs text-gray-400">SOVEREIGN COMMAND CENTER</p>
      </div>
      <div className="text-right flex items-center space-x-3">
        <div>
          <p className="font-semibold text-cyan-400">Eric Daniel Malley</p>
          <p className="text-xs text-gray-500">mybusinesspartnereric@gmail.com</p>
        </div>
        <UserCircleIcon className="w-10 h-10 text-cyan-500"/>
      </div>
    </header>
  );
};

export default Header;
