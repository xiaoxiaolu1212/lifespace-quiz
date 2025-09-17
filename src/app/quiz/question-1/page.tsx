'use client'

import { useState } from 'react'
import { useQuiz } from '@/context/QuizContext'
import QuizLayout from '@/app/components/QuizLayout'

export default function Question1() {
  const { answers, updateZipCode } = useQuiz()
  const [zipCode, setZipCode] = useState(['', '', '', '', ''])

  const handleZipCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newZipCode = [...zipCode]
      newZipCode[index] = value
      setZipCode(newZipCode)
      
      // Save to context when zip code is complete
      const completeZipCode = newZipCode.join('')
      if (completeZipCode.length === 5) {
        updateZipCode(completeZipCode)
      }
      
      // Auto-focus next input
      if (value && index < 4) {
        const nextInput = document.getElementById(`zip-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !zipCode[index] && index > 0) {
      const prevInput = document.getElementById(`zip-${index - 1}`)
      prevInput?.focus()
    }
  }

  const isZipCodeComplete = zipCode.every(digit => digit !== '')

  return (
    <QuizLayout 
      questionText="Enter your zip code"
      currentQuestion={1}
      totalQuestions={8}
      showPrevious={false}
      nextHref="/quiz/question-2"
      isNextDisabled={!isZipCodeComplete}
    >
      <div className="flex items-center justify-center space-x-2 mb-12">
        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <button className="text-gray-500 font-proxima-nova hover:text-gray-700 transition-colors">
          Why does this matter?
        </button>
      </div>
      
      <div className="flex justify-center" style={{ gap: '16px' }}>
        {zipCode.map((digit, index) => (
          <input
            key={index}
            id={`zip-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleZipCodeChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="text-center text-3xl font-proxima-nova font-semibold border border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent flex items-center justify-center rounded"
            style={{ width: '120px', height: '160px', borderRadius: '4px' }}
            maxLength={1}
          />
        ))}
      </div>
    </QuizLayout>
  )
}
