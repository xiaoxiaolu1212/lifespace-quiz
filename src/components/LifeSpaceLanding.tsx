import Link from 'next/link'
import Image from 'next/image'

export default function LifeSpaceLanding() {
  return (
    <div className="min-h-screen bg-off-white">
      {/* Header Section */}
      <header className="bg-off-white">
        {/* Brand Logo */}
        <div className="text-center py-8">
          <Image
            src="/images/landing-logo.svg"
            alt="LifeSpace Communities"
            width={400}
            height={120}
            className="mx-auto object-contain"
          />
        </div>
        
        {/* Separator Line */}
        <div className="h-px bg-black mx-auto" style={{ width: '1385px', marginBottom: '64px' }}></div>
        
        {/* Navigation Section */}
        <div className="flex items-center" style={{ width: '1385px', margin: '0 auto', minHeight: '80px' }}>
          <div className="flex items-center justify-between w-full">
                  {/* Left Side - Section Title */}
                  <div className="flex items-center justify-center">
                    <div className="mr-6">
                      <Image
                        src="/images/senior living.svg"
                        alt="Senior Living"
                        width={200}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                    <div className="w-px bg-black" style={{ height: '80px' }}></div>
                  </div>
            
            {/* Center - Navigation Links */}
            <div className="flex items-center justify-center">
              <div className="flex items-center" style={{ gap: '50px' }}>
                <Link 
                  href="/our-community" 
                  className="text-black font-proxima-nova hover:text-accent-green transition-colors"
                  style={{ fontSize: '18px', fontWeight: 'bold', textDecoration: 'underline', textUnderlineOffset: '12px' }}
                >
                  OUR COMMUNITY
                </Link>
                <Link 
                  href="/living-options" 
                  className="text-black font-proxima-nova hover:text-accent-green transition-colors"
                  style={{ fontSize: '18px', fontWeight: 'bold', textDecoration: 'underline', textUnderlineOffset: '12px' }}
                >
                  LIVING OPTIONS
                </Link>
                <Link 
                  href="/understanding-pricing" 
                  className="text-black font-proxima-nova hover:text-accent-green transition-colors"
                  style={{ fontSize: '18px', fontWeight: 'bold', textDecoration: 'underline', textUnderlineOffset: '12px' }}
                >
                  UNDERSTANDING PRICING
                </Link>
              </div>
            </div>
            
            {/* Right Side - CTA Button */}
            <div className="flex items-center">
              <div className="w-px bg-black mr-6" style={{ height: '80px' }}></div>
              <Link 
                href="/find-community"
                className="text-white px-8 py-3 font-proxima-nova hover:opacity-90 transition-all duration-200 transform hover:scale-105"
                style={{ 
                  backgroundColor: '#19211C', 
                  borderRadius: '6px',
                  width: '100%',
                  textAlign: 'center',
                  display: 'block',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  letterSpacing: '0.12em'
                }}
              >
                FIND MY COMMUNITY
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image Section */}
      <main className="relative" style={{ marginTop: '64px' }}>
        <div className="relative h-[90vh] overflow-hidden mx-auto" style={{ width: '1385px' }}>
          {/* Hero Image */}
          <Image
            src="/images/lifespace-landing-hero-image.jpg"
            alt="LifeSpace Communities - Senior living lifestyle"
            fill
            className="object-cover"
            priority
          />
          
          {/* Overlay for better text readability if needed */}
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        </div>
      </main>
    </div>
  )
}
