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
        <img 
          src="/images/quiz-question7-independent.svg" 
          alt="Independent Living" 
          className="w-16 h-16"
        />
      )
    },
    {
      id: 'assisted',
      title: 'Assisted Living',
      icon: (
        <img 
          src="/images/quiz-question4-giveback-icon.svg" 
          alt="Assisted Living" 
          className="w-16 h-16"
        />
      )
    },
    {
      id: 'skilled',
      title: 'Skilled Nursing/Rehabilitation',
      icon: (
        <img 
          src="/images/quiz-question7-Rehabilitation.svg" 
          alt="Rehabilitation" 
          className="w-16 h-16"
        />
      )
    },
    {
      id: 'notsure',
      title: "I'm not sure yet",
      icon: (
        <img 
          src="/images/quiz-question2-notsure-icon.svg" 
          alt="Not Sure" 
          className="w-16 h-16"
        />
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
          <div key={option.id} className="h-52">
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