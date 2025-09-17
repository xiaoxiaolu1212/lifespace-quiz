'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import QuizLayout from '@/app/components/QuizLayout'
import { useQuiz } from '@/context/QuizContext'

export default function Question2() {
  const { answers, updateSpaceSize } = useQuiz()
  const [selectedOption, setSelectedOption] = useState<string>('')

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    updateSpaceSize([option])
  }

  const spaceOptions = [
    {
      id: 'one-bedroom',
      title: 'One-Bedroom',
      icon: (
        <Image
          src="/images/quiz-question2-bedroom-icon.svg"
          alt="One bedroom"
          width={80}
          height={80}
          className="w-20 h-20"
        />
      )
    },
    {
      id: 'two-bedroom',
      title: 'Two-Bedroom',
      icon: (
        <div className="flex space-x-0">
          <Image
            src="/images/quiz-question2-bedroom-icon.svg"
            alt="Bedroom 1"
            width={80}
            height={80}
            className="w-20 h-20"
          />
          <Image
            src="/images/quiz-question2-bedroom-icon.svg"
            alt="Bedroom 2"
            width={80}
            height={80}
            className="w-20 h-20"
          />
        </div>
      )
    },
    {
      id: 'three-bedroom',
      title: 'Three-Bedroom',
      icon: (
        <div className="flex space-x-0">
          <Image
            src="/images/quiz-question2-bedroom-icon.svg"
            alt="Bedroom 1"
            width={80}
            height={80}
            className="w-20 h-20"
          />
          <Image
            src="/images/quiz-question2-bedroom-icon.svg"
            alt="Bedroom 2"
            width={80}
            height={80}
            className="w-20 h-20"
          />
          <Image
            src="/images/quiz-question2-bedroom-icon.svg"
            alt="Bedroom 3"
            width={80}
            height={80}
            className="w-20 h-20"
          />
        </div>
      )
    },
    {
      id: 'not-sure',
      title: "I'm not sure yet",
      icon: (
        <Image
          src="/images/quiz-question2-notsure-icon.svg"
          alt="Not sure"
          width={80}
          height={80}
          className="w-20 h-20"
        />
      )
    }
  ]

  return (
    <QuizLayout
      questionText="What size space are you interested in moving into?"
      currentQuestion={2}
      totalQuestions={8}
      previousHref="/quiz/question-1"
      nextHref="/quiz/question-3"
      isNextDisabled={selectedOption === ''}
    >
      <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
        {spaceOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
            className={`p-6 rounded-sm transition-all duration-200 flex flex-col items-center space-y-4 ${
              selectedOption === option.id
                ? 'border-2 border-accent-green bg-primary-yellow bg-opacity-20'
                : 'border border-[#B5B5B5] bg-white hover:border-gray-400 hover:shadow-md'
            }`}
          >
            <div className="text-gray-700">
              {option.icon}
            </div>
            <span className={`font-proxima-nova text-black text-lg ${
              selectedOption === option.id ? 'font-bold' : 'font-normal'
            }`}>
              {option.title}
            </span>
          </button>
        ))}
      </div>
    </QuizLayout>
  )
}
