import { ReactNode } from 'react'
import Image from 'next/image'

interface TwoColumnLayoutProps {
  children: ReactNode
  imageUrl: string
  altText: string
}

export default function TwoColumnLayout({ children, imageUrl, altText }: TwoColumnLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left Column - Image */}
      <div className="relative">
        <Image
          src={imageUrl}
          alt={altText}
          width={600}
          height={400}
          className="w-full h-auto object-cover"
        />
      </div>
      
      {/* Right Column - Content */}
      <div>
        {children}
      </div>
    </div>
  )
}
