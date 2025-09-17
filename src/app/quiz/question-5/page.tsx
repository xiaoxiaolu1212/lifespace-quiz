'use client'

import { useState } from 'react'
import QuizLayout from '@/app/components/QuizLayout'
import { useQuiz } from '@/context/QuizContext'

export default function Question5() {
  const { answers, updateDailyPace } = useQuiz()
  const [selectedPace, setSelectedPace] = useState<string>('')

  const handlePaceSelect = (pace: string) => {
    setSelectedPace(pace)
    updateDailyPace(pace)
  }

  const paceOptions = [
    {
      id: 'relaxed',
      title: 'Relaxed and quiet',
      icon: (
        <img 
          src="/images/quiz-question5-relaxed-icon.svg" 
          alt="Relaxed icon" 
          style={{ width: '50px', height: '50px' }}
        />
      )
    },
    {
      id: 'active',
      title: 'Active and busy',
      icon: (
        <img 
          src="/images/quiz-question4-sports-icon.svg" 
          alt="Active and busy" 
          style={{ width: '50px', height: '50px' }}
        />
      )
    },
    {
      id: 'mixed',
      title: 'Mix of everything',
      icon: (
        <img 
          src="/images/quiz-question5-mix-icon.svg" 
          alt="Mix of everything" 
          style={{ width: '50px', height: '50px' }}
        />
      )
    }
  ]

  return (
    <QuizLayout
      questionText="What's your ideal daily pace?"
      currentQuestion={5}
      totalQuestions={8}
      previousHref="/quiz/question-4"
      nextHref="/quiz/question-6"
      isNextDisabled={selectedPace === ''}
    >
      <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
        {paceOptions.map((option) => (
          <div key={option.id} className="h-48">
            <button
              onClick={() => handlePaceSelect(option.id)}
              className={`w-full h-full p-6 rounded-sm transition-all duration-200 flex flex-col items-center justify-center space-y-4 ${
                selectedPace === option.id
                  ? 'border-2 border-accent-green bg-primary-yellow bg-opacity-20'
                  : 'border border-[#B5B5B5] bg-white hover:border-gray-400 hover:shadow-md'
              }`}
            >
              <div className="text-gray-700 flex-shrink-0">
                {option.icon}
              </div>
              <span className={`font-proxima-nova text-black text-center text-lg leading-tight ${
                selectedPace === option.id ? 'font-bold' : 'font-normal'
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