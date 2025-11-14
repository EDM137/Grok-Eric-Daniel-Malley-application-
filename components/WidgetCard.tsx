
import React, { ReactNode } from 'react';

interface WidgetCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-gray-900/50 border border-cyan-500/30 rounded-lg shadow-lg shadow-cyan-900/20 backdrop-blur-md h-full flex flex-col ${className}`}>
      <div className="p-4 border-b border-cyan-500/20 flex items-center space-x-3">
        <div className="text-cyan-400">{icon}</div>
        <h2 className="font-bold text-lg text-cyan-400 tracking-wide">{title}</h2>
      </div>
      <div className="p-4 flex-grow">
        {children}
      </div>
    </div>
  );
};

export default WidgetCard;
