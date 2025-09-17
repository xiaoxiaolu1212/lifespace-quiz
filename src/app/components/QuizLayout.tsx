import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface QuizLayoutProps {
  children: ReactNode
  questionText: string
  currentQuestion?: number
  totalQuestions?: number
  previousHref?: string
  nextHref?: string
  showPrevious?: boolean
  isNextDisabled?: boolean
}

export default function QuizLayout({ 
  children, 
  questionText,
  currentQuestion = 1, 
  totalQuestions = 7,
  previousHref = "/quiz/question-1",
  nextHref = "/quiz/question-2",
  showPrevious = true,
  isNextDisabled = false
}: QuizLayoutProps) {
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

      {/* Progress Indicator */}
      <div className="bg-white py-4">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 bg-gray-200 h-2">
              <div 
                className="bg-accent-green h-2 transition-all duration-300"
                style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
              ></div>
            </div>
            <span className="text-black font-proxima-nova font-semibold">
              {currentQuestion}/{totalQuestions}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-proxima-nova text-black" style={{ fontSize: '48px', fontWeight: 'normal', marginBottom: '44px' }}>
            {questionText}
          </h2>
          
          <div style={{ marginBottom: '20px' }}>
            {children}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="bg-white py-6">
        <div className="max-w-4xl mx-auto px-6 flex justify-between">
          {showPrevious ? (
            <Link 
              href={previousHref}
              className="flex items-center space-x-2 px-8 py-3 font-proxima-nova font-semibold border border-[#B5B5B5] text-gray-700 hover:border-gray-400 transition-all duration-200 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>PREVIOUS</span>
            </Link>
          ) : (
            <div></div>
          )}
          
          <Link 
            href={nextHref}
            className={`flex items-center space-x-2 px-8 py-3 font-proxima-nova font-semibold transition-all duration-200 rounded-lg ${
              isNextDisabled 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'text-white hover:bg-opacity-90'
            }`}
            style={!isNextDisabled ? { backgroundColor: '#121C21' } : {}}
          >
            <span>NEXT</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
