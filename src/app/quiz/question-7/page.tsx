'use client'

import { useState } from 'react'
import QuizLayout from '@/app/components/QuizLayout'
import { useQuiz } from '@/context/QuizContext'

export default function Question7() {
  const { answers, updateCareLevel } = useQuiz()
  const [selectedCareLevel, setSelectedCareLevel] = useState<string>('')

  const handleCareLevelSelect = (careLevel: string) => {
    setSelectedCareLevel(careLevel)
    updateCareLevel(careLevel)
  }

  const careLevelOptions = [
    {
      id: 'independent',
      title: 'Independent Living',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
        </svg>
      )
    },
    {
      id: 'assisted',
      title: 'Assisted Living',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      id: 'skilled',
      title: 'Skilled Nursing/Rehabilitation',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      id: 'notsure',
      title: "I'm not sure yet",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ]

  return (
    <QuizLayout
      questionText="What level of care are you looking for?"
      currentQuestion={7}
      totalQuestions={8}
      previousHref="/quiz/question-6"
      nextHref="/quiz/question-8"
      isNextDisabled={selectedCareLevel === ''}
    >
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
        {careLevelOptions.map((option) => (
          <div key={option.id} className="h-48">
            <button
              onClick={() => handleCareLevelSelect(option.id)}
              className={`w-full h-full p-6 rounded-sm transition-all duration-200 flex flex-col items-center justify-center space-y-4 ${
                selectedCareLevel === option.id
                  ? 'border-2 border-accent-green bg-primary-yellow bg-opacity-20'
                  : 'border border-[#B5B5B5] bg-white hover:border-gray-400 hover:shadow-md'
              }`}
            >
              <div className="text-gray-700 flex-shrink-0">
                {option.icon}
              </div>
              <span className={`font-proxima-nova text-black text-center text-lg leading-tight ${
                selectedCareLevel === option.id ? 'font-bold' : 'font-normal'
              }`}>
                {option.title}
              </span>
            </button>
          </div>
        ))}
      </div>
    </QuizLayout>
  )
}