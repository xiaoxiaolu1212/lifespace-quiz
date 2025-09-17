'use client';

import React from 'react';

interface PreferenceCardProps {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}

export default function PreferenceCard({ icon, label, value }: PreferenceCardProps) {
  if (value) {
    // Value provided - styled card with large circular icon
    return (
      <div className="bg-[#E8EDEE] flex items-center space-x-6" style={{ width: '575px', height: '119px', padding: '24px', borderRadius: '4px' }}>
        {/* Large circular icon */}
        <div className="bg-[#525E56] rounded-full flex items-center justify-center flex-shrink-0" style={{ width: '58px', height: '58px' }}>
          <div className="w-8 h-8 text-white">
            {icon}
          </div>
        </div>
        
        {/* Text content */}
        <div className="flex flex-col">
          <span className="font-proxima-nova text-gray-600 text-base mb-1">
            {label}
          </span>
          <span className="font-proxima-nova text-black font-bold" style={{ fontSize: '20px' }}>
            {value}
          </span>
        </div>
      </div>
    );
  }

  // Value missing - simple grayed out card
  return (
    <div style={{ backgroundColor: '#EDEDED', width: '575px', height: '119px', padding: '24px', borderRadius: '4px' }} className="flex items-center space-x-3">
      <div className="w-5 h-5 text-gray-400">
        {icon}
      </div>
      <span className="font-proxima-nova text-gray-700">
        {label}: Not Specified
      </span>
    </div>
  );
}
