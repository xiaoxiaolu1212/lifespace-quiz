'use client'

import { useState } from 'react'
import QuizLayout from '@/app/components/QuizLayout'
import { useQuiz } from '@/context/QuizContext'

export default function Question4() {
  const { answers, updateHobbies } = useQuiz()
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([])
  const [otherInterests, setOtherInterests] = useState<string>('')

  const handleHobbyToggle = (hobby: string) => {
    const newHobbies = selectedHobbies.includes(hobby) 
      ? selectedHobbies.filter(item => item !== hobby)
      : [...selectedHobbies, hobby]
    
    setSelectedHobbies(newHobbies)
    
    // Handle other interests logic
    if (hobby === 'other' && !selectedHobbies.includes(hobby)) {
      // Adding other interests - keep current input
    } else if (hobby === 'other' && selectedHobbies.includes(hobby)) {
      // Removing other interests - clear input
      setOtherInterests('')
    }
    
    updateHobbies(newHobbies)
  }

  const handleOtherInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherInterests(e.target.value)
  }

  const hobbyOptions = [
    {
      id: 'sports',
      title: 'Sports & Fitness',
      icon: (
        <img 
          src="/images/quiz-question4-sports-icon.svg" 
          alt="Sports & Fitness" 
          style={{ width: '50px', height: '50px' }}
        />
      )
    },
    {
      id: 'creative',
      title: 'Creative & Performing Arts',
      icon: (
        <img 
          src="/images/quiz-question4-arts-icon.svg" 
          alt="Creative & Performing Arts" 
          style={{ width: '50px', height: '50px' }}
        />
      )
    },
    {
      id: 'nature',
      title: 'Nature & Outdoors',
      icon: (
        <img 
          src="/images/quiz-question4-park-icon.svg" 
          alt="Nature & Outdoors" 
          style={{ width: '55px', height: '55px' }}
        />
      )
    },
    {
      id: 'volunteering',
      title: 'Giving Back (Volunteering)',
      icon: (
        <img 
          src="/images/quiz-question4-giveback-icon.svg" 
          alt="Giving Back (Volunteering)" 
          style={{ width: '50px', height: '50px' }}
        />
      )
    },
    {
      id: 'other',
      title: 'Other Interests',
      icon: (
        <img 
          src="/images/quiz-question4-interests-icon.svg" 
          alt="Other Interests" 
          style={{ width: '50px', height: '50px' }}
        />
      )
    }
  ]

  return (
    <QuizLayout
      questionText="Which hobbies do you enjoy or want to explore? (Select all that apply)"
      currentQuestion={4}
      totalQuestions={8}
      previousHref="/quiz/question-3"
      nextHref="/quiz/question-5"
      isNextDisabled={selectedHobbies.length === 0}
    >
      <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
        {hobbyOptions.map((option) => (
          <div key={option.id} className={`${option.id === 'other' && selectedHobbies.includes('other') ? 'h-80' : 'h-48'}`}>
            <button
              onClick={() => handleHobbyToggle(option.id)}
              className={`w-full h-full p-6 rounded-sm transition-all duration-200 flex flex-col items-center justify-center space-y-4 ${
                selectedHobbies.includes(option.id)
                  ? 'border-2 border-accent-green bg-primary-yellow bg-opacity-20'
                  : 'border border-[#B5B5B5] bg-white hover:border-gray-400 hover:shadow-md'
              }`}
            >
              <div className="text-gray-700 flex-shrink-0">
                {option.icon}
              </div>
              <span className={`font-proxima-nova text-black text-center text-lg leading-tight ${
                selectedHobbies.includes(option.id) ? 'font-bold' : 'font-normal'
              }`}>
                {option.title}
              </span>
              
              {/* Conditional text input for other interests - now inside the button */}
              {selectedHobbies.includes('other') && option.id === 'other' && (
                <div className="w-full mt-4">
                  <input
                    type="text"
                    value={otherInterests}
                    onChange={handleOtherInterestsChange}
                    placeholder="Please specify..."
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
