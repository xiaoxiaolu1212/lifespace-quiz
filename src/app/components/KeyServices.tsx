'use client';

import { useState } from 'react';
import Image from 'next/image';

export const servicesData = [
  {
    title: 'ON-SITE PHYSICIANS',
    description: 'Access to qualified medical professionals right on campus for your convenience and peace of mind.',
    imageUrl: '/images/results-eyservices-onsite.png'
  },
  {
    title: '24/7 NURSING OVERSIGHT',
    description: 'Round-the-clock nursing care and monitoring to ensure your health and safety at all times.',
    imageUrl: '/images/results-nursingoversee.png'
  },
  {
    title: 'SKILLED NURSING CARE',
    description: 'Professional nursing services for rehabilitation, recovery, and ongoing medical support.',
    imageUrl: '/images/results-skillednursescare.png'
  }
];

export default function KeyServices() {
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);

  const handleServiceClick = (index: number) => {
    setSelectedServiceIndex(index);
  };

  return (
    <div className="w-full mx-auto" style={{ width: '1230px', height: '732px', marginTop: '50px' }}>
      <div className="grid grid-cols-2">
        {/* Left Column - Image */}
        <div className="flex items-center justify-center" style={{ height: '732px' }}>
          <Image
            src={servicesData[selectedServiceIndex].imageUrl}
            alt={servicesData[selectedServiceIndex].title}
            width={615}
            height={732}
            className="w-full h-full object-fill rounded-sm"
          />
        </div>

        {/* Right Column - Text Content */}
        <div className="p-12 flex flex-col justify-end" style={{ backgroundColor: '#525E56', paddingBottom: '40px', height: '732px' }}>
          <h2 className="font-proxima-nova mb-12" style={{ fontSize: '41px', fontWeight: '500', letterSpacing: '0.1em', color: '#D4C799' }}>
            KEY SERVICES
          </h2>
          <div className="space-y-8">
            {servicesData.map((service, index) => (
              <div key={index}>
                <h3 
                  className="font-proxima-nova text-white mb-4 cursor-pointer hover:text-gray-300 transition-colors"
                  style={{ fontSize: '20px', fontWeight: '600', letterSpacing: '0.12em' }}
                  onClick={() => handleServiceClick(index)}
                >
                  {service.title}
                </h3>
                {selectedServiceIndex === index && (
                  <p className="text-lg font-proxima-nova text-white">
                    {service.description}
                  </p>
                )}
                {index < servicesData.length - 1 && (
                  <div className="flex justify-start mt-8">
                    <div style={{ width: '335px', height: '1px', backgroundColor: '#969579' }}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
