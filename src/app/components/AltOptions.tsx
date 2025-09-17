import Image from 'next/image';

interface Community {
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}

interface AltOptionsProps {
  options: Community[];
}

export default function AltOptions({ options }: AltOptionsProps) {
  // Randomly show 1 or 2 options
  const displayOptions = options.slice(0, Math.random() > 0.5 ? 1 : 2);

  return (
    <div className="w-full mx-auto" style={{ width: '1230px', marginTop: '50px' }}>
      <div className="grid grid-cols-2">
        {/* Left Column - Text Content */}
        <div className="p-12 flex flex-col justify-start" style={{ backgroundColor: '#F1ECDD', paddingTop: '40px', height: '600px' }}>
          <div>
            <h2 className="font-proxima-nova mb-6" style={{ fontSize: '41px', fontWeight: '500', letterSpacing: '0.04em', color: '#222222' }}>
              OTHER GREAT OPTIONS
            </h2>
            <p className="text-lg font-proxima-nova" style={{ color: '#222222' }}>
              These communities also align well with your preferences and lifestyle needs.
            </p>
          </div>
        </div>

        {/* Right Column - Community Images */}
        <div className="flex flex-col">
          {displayOptions.length === 1 ? (
            // Single option - full height
            <div className="relative" style={{ height: '600px' }}>
              <a href={displayOptions[0].linkUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                <Image
                  src={displayOptions[0].imageUrl}
                  alt={displayOptions[0].name}
                  width={738}
                  height={620}
                  className="w-full h-full object-cover rounded-sm"
                />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 100%)'
                  }}
                />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-proxima-nova font-bold mb-2 underline">
                    {displayOptions[0].name.toUpperCase()}
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-proxima-nova">{displayOptions[0].location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <span className="font-proxima-nova">{displayOptions[0].description}</span>
                  </div>
                </div>
              </a>
            </div>
          ) : (
            // Two options - split vertically
            displayOptions.map((option, index) => (
              <div key={index} className="relative" style={{ height: '300px' }}>
                <a href={option.linkUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <Image
                    src={option.imageUrl}
                    alt={option.name}
                    width={738}
                    height={310}
                    className="w-full h-full object-cover rounded-sm"
                  />
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 100%)'
                    }}
                  />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-proxima-nova font-bold mb-2 underline">
                      {option.name.toUpperCase()}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-proxima-nova">{option.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span className="font-proxima-nova">{option.description}</span>
                    </div>
                  </div>
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
