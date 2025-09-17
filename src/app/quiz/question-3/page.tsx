'use client'

import { useState } from 'react'
import QuizLayout from '@/app/components/QuizLayout'
import { useQuiz } from '@/context/QuizContext'

export default function Question3() {
  const { answers, updateLocationPreference } = useQuiz()
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [specificLocation, setSpecificLocation] = useState<string>('')

  const handleOptionSelect = (option: string) => {
    let newSelectedOptions: string[]
    if (selectedOptions.includes(option)) {
      // Remove option if already selected
      newSelectedOptions = selectedOptions.filter(opt => opt !== option)
      // Clear location input if removing specific-location
      if (option === 'specific-location') {
        setSpecificLocation('')
      }
    } else {
      // Add option if not selected
      newSelectedOptions = [...selectedOptions, option]
    }
    setSelectedOptions(newSelectedOptions)
    
    // Update context with the first selected option (for backward compatibility)
    if (newSelectedOptions.length > 0) {
      updateLocationPreference(newSelectedOptions[0], newSelectedOptions.includes('specific-location') ? specificLocation : undefined)
    } else {
      updateLocationPreference('', '')
    }
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpecificLocation(e.target.value)
    if (selectedOptions.includes('specific-location')) {
      updateLocationPreference(selectedOptions[0], e.target.value)
    }
  }

  const isNextDisabled = selectedOptions.length === 0 || (selectedOptions.includes('specific-location') && !specificLocation.trim())

  const locationOptions = [
    {
      id: 'family',
      title: 'Family & Friends',
      icon: (
        <img 
          src="/images/quiz-question3-family-icon.svg" 
          alt="Family & Friends" 
          style={{ width: '70px', height: '70px' }}
        />
      )
    },
    {
      id: 'specific-location',
      title: 'A Specific City Or State Outside Where I Live',
      icon: (
        <img 
          src="/images/quiz-question3-location-icon.svg" 
          alt="Specific Location" 
          style={{ width: '50px', height: '50px' }}
        />
      )
    },
    {
      id: 'travel',
      title: 'Convenient Location For Travel',
      icon: (
        <img 
          src="/images/quiz-question3-travel-icon.svg" 
          alt="Travel" 
          style={{ width: '50px', height: '50px' }}
        />
      )
    },
    {
      id: 'nature',
      title: 'Natural Surroundings',
      icon: (
        <img 
          src="/images/quiz-question3-tree-icon.svg" 
          alt="Natural Surroundings" 
          style={{ width: '50px', height: '50px' }}
        />
      )
    },
    {
      id: 'city',
      title: 'Vibrant City Lifestyle',
      icon: (
        <img 
          src="/images/quiz-question3-city-icon.svg" 
          alt="City Lifestyle" 
          style={{ width: '50px', height: '50px' }}
        />
      )
    },
    {
      id: 'open',
      title: "I'm Open To Different Options",
      icon: (
        <img 
          src="/images/quiz-question3-sparkle-icon.svg" 
          alt="Open Options" 
          style={{ width: '50px', height: '50px' }}
        />
      )
    }
  ]

  return (
    <QuizLayout
      questionText="Finish this sentence: I want my home to be close to... (Select all that apply)"
      currentQuestion={3}
      totalQuestions={8}
      previousHref="/quiz/question-2"
      nextHref="/quiz/question-4"
      isNextDisabled={isNextDisabled}
    >
      <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
        {locationOptions.map((option) => (
          <div key={option.id} className={`${option.id === 'specific-location' && selectedOptions.includes('specific-location') ? 'h-80' : 'h-48'}`}>
            <button
              onClick={() => handleOptionSelect(option.id)}
              className={`w-full h-full p-6 rounded-sm transition-all duration-200 flex flex-col items-center justify-center space-y-4 ${
                selectedOptions.includes(option.id)
                  ? 'border-2 border-accent-green bg-primary-yellow bg-opacity-20'
                  : 'border border-[#B5B5B5] bg-white hover:border-gray-400 hover:shadow-md'
              }`}
            >
              <div className="text-gray-700 flex-shrink-0">
                {option.icon}
              </div>
              <span className={`font-proxima-nova text-black text-center text-lg leading-tight ${
                selectedOptions.includes(option.id) ? 'font-bold' : 'font-normal'
              }`}>
                {option.title}
              </span>
              
              {/* Conditional text input for specific location - now inside the button */}
              {selectedOptions.includes('specific-location') && option.id === 'specific-location' && (
                <div className="w-full mt-4">
                  <input
                    type="text"
                    value={specificLocation}
                    onChange={handleLocationChange}
                    placeholder="Enter city or state outside where you live..."
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
