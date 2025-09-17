'use client'

import { useState } from 'react'
import QuizLayout from '@/app/components/QuizLayout'
import { useQuiz } from '@/context/QuizContext'

export default function Question6() {
  const { answers, updatePets } = useQuiz()
  const [selectedPets, setSelectedPets] = useState<string>('')

  const handlePetsSelect = (pets: string) => {
    setSelectedPets(pets)
    updatePets(pets)
  }

  const petsOptions = [
    {
      id: 'yes',
      title: 'Yes'
    },
    {
      id: 'no',
      title: 'No'
    }
  ]

  return (
    <QuizLayout
      questionText="Do you have pets you'd like to bring to your new home?"
      currentQuestion={6}
      totalQuestions={8}
      previousHref="/quiz/question-5"
      nextHref="/quiz/question-7"
      isNextDisabled={selectedPets === ''}
    >
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
        {petsOptions.map((option) => (
          <div key={option.id} className="h-48">
            <button
              onClick={() => handlePetsSelect(option.id)}
              className={`w-full h-full p-6 rounded-sm transition-all duration-200 flex flex-col items-center justify-center ${
                selectedPets === option.id
                  ? 'border-2 border-accent-green bg-primary-yellow bg-opacity-20'
                  : 'border border-[#B5B5B5] bg-white hover:border-gray-400 hover:shadow-md'
              }`}
            >
              <span className={`font-proxima-nova text-black text-center text-lg leading-tight ${
                selectedPets === option.id ? 'font-bold' : 'font-normal'
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