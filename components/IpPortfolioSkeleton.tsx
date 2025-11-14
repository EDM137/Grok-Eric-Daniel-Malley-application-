
import React from 'react';

const SkeletonRow: React.FC = () => (
  <div className="w-full p-3 bg-gray-900 rounded-lg border border-gray-800 flex items-center gap-4">
    <div className="h-5 w-5 rounded bg-gray-700 animate-pulse flex-shrink-0"></div>
    <div className="flex-grow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 w-2/3">
          <div className="w-5 h-5 rounded-full bg-gray-700 animate-pulse"></div>
          <div>
            <div className="h-4 w-48 bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-3 w-32 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-6 w-20 bg-gray-700 rounded-full animate-pulse"></div>
          <div className="h-8 w-16 bg-gray-700 rounded-md animate-pulse"></div>
          <div className="h-5 w-5 bg-gray-700 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

const IpPortfolioSkeleton: React.FC = () => {
  return (
    <div className="space-y-3">
      <div className="w-full h-[50px] bg-gray-800 rounded-md animate-pulse"></div>
      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonRow key={index} />
        ))}
      </div>
    </div>
  );
};

export default IpPortfolioSkeleton;
