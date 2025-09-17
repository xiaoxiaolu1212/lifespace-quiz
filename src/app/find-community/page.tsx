import Link from 'next/link'
import Image from 'next/image'
import TwoColumnLayout from '@/app/components/TwoColumnLayout'

export default function FindCommunity() {
  return (
    <div className="min-h-screen bg-off-white">
      {/* Header Section */}
      <header className="border-b border-gray-200 shadow-nav-shadow" style={{ backgroundColor: '#D4C799' }}>
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center justify-between">
            {/* Left - Menu */}
            <div className="text-black font-proxima-nova font-semibold">
              MENU
            </div>
            
            {/* Center - Brand */}
            <Link href="/" className="text-center hover:opacity-80 transition-opacity p-2">
              <Image
                src="/images/find-community-logo.svg"
                alt="LifeSpace Communities"
                width={210}
                height={63}
                className="mx-auto object-contain"
              />
            </Link>
            
            {/* Right - Empty space for balance */}
            <div className="text-black font-proxima-nova font-semibold opacity-0">
              MENU
            </div>
          </div>
        </div>
      </header>

      {/* Map Section with Search Overlay */}
      <div className="relative w-full" style={{ height: '700px' }}>
        <Image
          src="/images/find-community-map.png"
          alt="Find Community Map"
          fill
          className="object-cover"
        />
        
        {/* Search Bar Overlay */}
        <div className="absolute top-6 left-0 right-0 z-10 py-6">
          <div className="max-w-3xl mx-auto px-6">
            <div className="flex items-center justify-center space-x-4 bg-white p-4 shadow-nav-shadow rounded-lg">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Enter your zipcode" 
                  className="border-none outline-none font-proxima-nova text-black bg-transparent border-b-2 border-gray-400 focus:border-gray-600"
                />
              </div>
              
              <span className="text-gray-500 font-proxima-nova">or</span>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  placeholder="Enter state" 
                  className="border-none outline-none font-proxima-nova text-black bg-transparent border-b-2 border-gray-400 focus:border-gray-600"
                />
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              <button className="bg-white border border-accent-green text-black px-6 py-2 font-proxima-nova font-bold hover:bg-gray-50 transition-all duration-200" style={{ letterSpacing: '0.12em', borderRadius: '6px' }}>
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-off-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <TwoColumnLayout 
            imageUrl="/images/find-community-takequizimage.png"
            altText="Take the quiz to find your community"
          >
            <div>
              <h2 className="text-4xl font-proxima-nova font-bold text-black mb-6">
                COMMUNITY MATCHMAKER
              </h2>
              <p className="text-lg text-gray-700 font-proxima-nova mb-8 leading-relaxed">
                Every journey is unique. Take our Senior Living Options Quiz to see which living option is the best fit for you or someone you love.
              </p>
              <Link 
                href="/quiz/question-1"
                className="inline-flex items-center text-white px-8 py-4 font-proxima-nova hover:opacity-90 transition-all duration-200 transform hover:scale-105"
                style={{ 
                  backgroundColor: '#19211C', 
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  letterSpacing: '0.12em'
                }}
              >
                TAKE THE QUIZ 
                <Image
                  src="/images/light_arrow-right.svg"
                  alt="Arrow right"
                  width={22}
                  height={22}
                  className="ml-2"
                />
              </Link>
            </div>
          </TwoColumnLayout>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-[#2C2C2C] text-[#D4C799]">
        {/* Top Section */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Left Column - About/Resources */}
              <div className="space-y-4 text-center md:text-left">
                <a href="#" className="block font-proxima-nova text-[#D4C799] hover:text-white transition-colors">
                  ABOUT
                </a>
                <a href="#" className="block font-proxima-nova text-[#D4C799] hover:text-white transition-colors">
                  MISSION
                </a>
                <a href="#" className="block font-proxima-nova text-[#D4C799] hover:text-white transition-colors">
                  NEWS
                </a>
                <a href="#" className="block font-proxima-nova text-[#D4C799] hover:text-white transition-colors">
                  RESOURCES
                </a>
              </div>

              {/* Middle Column - Get Support */}
              <div className="flex items-start justify-center">
                <a href="#" className="font-proxima-nova text-[#D4C799] hover:text-white transition-colors">
                  GET SUPPORT
                </a>
              </div>

              {/* Right Column - Follow Us */}
              <div className="text-center md:text-right">
                <h4 className="font-proxima-nova text-[#D4C799] mb-6">
                  FOLLOW US
                </h4>
                <div className="flex space-x-4 justify-center md:justify-end">
                  {/* Twitter/X Icon */}
                  <a href="#" className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  {/* Facebook Icon */}
                  <a href="#" className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 py-6">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-sm font-proxima-nova text-[#D4C799] text-center">
              © 2025 Lifespace Communities, Inc.® | All Rights Reserved | Privacy Policy | Federal Transparency in Coverage
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}