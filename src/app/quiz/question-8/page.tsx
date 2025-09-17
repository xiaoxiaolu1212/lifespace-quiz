'use client'

import { useState } from 'react'
import QuizLayout from '@/app/components/QuizLayout'
import { useQuiz } from '@/context/QuizContext'

export default function Question8() {
  const { answers, updateCareNeeds } = useQuiz()
  const [selectedCare, setSelectedCare] = useState<string>('')
  const [careDetails, setCareDetails] = useState<string>('')

  const handleCareSelect = (care: string) => {
    setSelectedCare(care)
    if (care === 'no') {
      setCareDetails('')
      updateCareNeeds(care)
    } else {
      updateCareNeeds(care, careDetails)
    }
  }

  const handleCareDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCareDetails(e.target.value)
    if (selectedCare === 'yes') {
      updateCareNeeds(selectedCare, e.target.value)
    }
  }

  const careOptions = [
    {
      id: 'yes',
      title: 'Yes'
    },
    {
      id: 'no',
      title: 'No'
    }
  ]

  const isNextDisabled = selectedCare === '' || (selectedCare === 'yes' && !careDetails.trim())

  return (
    <QuizLayout
      questionText="Do you have any specific health considerations?"
      currentQuestion={8}
      totalQuestions={8}
      previousHref="/quiz/question-7"
      nextHref="/results"
      isNextDisabled={isNextDisabled}
    >
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
        {careOptions.map((option) => (
          <div key={option.id} className={`${option.id === 'yes' && selectedCare === 'yes' ? 'h-80' : 'h-48'}`}>
            <button
              onClick={() => handleCareSelect(option.id)}
              className={`w-full h-full p-6 rounded-sm transition-all duration-200 flex flex-col items-center justify-center ${
                selectedCare === option.id
                  ? 'border-2 border-accent-green bg-primary-yellow bg-opacity-20'
                  : 'border border-[#B5B5B5] bg-white hover:border-gray-400 hover:shadow-md'
              }`}
            >
              <span className={`font-proxima-nova text-black text-center text-lg leading-tight ${
                selectedCare === option.id ? 'font-bold' : 'font-normal'
              }`}>
                {option.title}
              </span>
              
              {/* Conditional text input for care details - now inside the button */}
              {selectedCare === 'yes' && option.id === 'yes' && (
                <div className="w-full mt-4">
                  <input
                    type="text"
                    value={careDetails}
                    onChange={handleCareDetailsChange}
                    placeholder="Please specify your care needs..."
                    className="w-full p-3 border-2 border-gray-200 rounded-sm font-proxima-nova text-base focus:outline-none focus:border-accent-green transition-all duration-200"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
            </button>
          </div>
        ))}
      </div>
    </QuizLayout>
  )
}
