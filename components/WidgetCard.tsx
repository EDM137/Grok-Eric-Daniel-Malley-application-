import React, { ReactNode } from 'react';

type CardColor = 'blue' | 'indigo' | 'green' | 'amber';

interface WidgetCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  color?: CardColor;
}

const colorSchemes: Record<CardColor, { border: string; shadow: string; text: string; headerBg: string; }> = {
  blue: {
    border: 'border-cyan-500/30',
    shadow: 'shadow-cyan-900/20',
    text: 'text-cyan-400',
    headerBg: 'bg-gradient-to-r from-cyan-900/50 to-gray-900/30',
  },
  indigo: {
    border: 'border-indigo-500/30',
    shadow: 'shadow-indigo-900/20',
    text: 'text-indigo-400',
    headerBg: 'bg-gradient-to-r from-indigo-900/50 to-gray-900/30',
  },
  green: {
    border: 'border-green-500/30',
    shadow: 'shadow-green-900/20',
    text: 'text-green-400',
    headerBg: 'bg-gradient-to-r from-green-900/50 to-gray-900/30',
  },
  amber: {
    border: 'border-amber-500/30',
    shadow: 'shadow-amber-900/20',
    text: 'text-amber-400',
    headerBg: 'bg-gradient-to-r from-amber-900/50 to-gray-900/30',
  },
};


const WidgetCard: React.FC<WidgetCardProps> = ({ title, icon, children, className = '', color = 'blue' }) => {
  const scheme = colorSchemes[color];
  return (
    <div className={`bg-gray-900/80 border ${scheme.border} rounded-lg shadow-lg ${scheme.shadow} backdrop-blur-lg h-full flex flex-col ${className}`}>
      <div className={`p-4 border-b ${scheme.border} flex items-center space-x-3 ${scheme.headerBg}`}>
        <div className={scheme.text}>{icon}</div>
        <h2 className={`font-bold text-lg ${scheme.text} tracking-wide`}>{title}</h2>
      </div>
      <div className="p-4 flex-grow">
        {children}
      </div>
    </div>
  );
};

export default WidgetCard;