'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

// Define the quiz answer types
export interface QuizAnswers {
  zipCode: string
  spaceSize: string[]
  locationPreference: {
    selected: string
    specificLocation?: string
  }
  hobbies: string[]
  dailyPace: string
  pets: string
  careLevel: string
  careNeeds: {
    hasCareNeeds: string
    careDetails?: string
  }
}

// Define the context type
interface QuizContextType {
  answers: QuizAnswers
  updateZipCode: (zipCode: string) => void
  updateSpaceSize: (spaceSize: string[]) => void
  updateLocationPreference: (preference: string, specificLocation?: string) => void
  updateHobbies: (hobbies: string[]) => void
  updateDailyPace: (dailyPace: string) => void
  updatePets: (pets: string) => void
  updateCareLevel: (careLevel: string) => void
  updateCareNeeds: (hasCareNeeds: string, careDetails?: string) => void
  resetQuiz: () => void
}

// Initial state
const initialAnswers: QuizAnswers = {
  zipCode: '',
  spaceSize: [],
  locationPreference: {
    selected: '',
    specificLocation: ''
  },
  hobbies: [],
  dailyPace: '',
  pets: '',
  careLevel: '',
  careNeeds: {
    hasCareNeeds: '',
    careDetails: ''
  }
}

// Create the context
const QuizContext = createContext<QuizContextType | undefined>(undefined)

// Provider component
export function QuizProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers)

  const updateZipCode = (zipCode: string) => {
    setAnswers(prev => ({
      ...prev,
      zipCode
    }))
  }

  const updateSpaceSize = (spaceSize: string[]) => {
    setAnswers(prev => ({
      ...prev,
      spaceSize
    }))
  }

  const updateLocationPreference = (preference: string, specificLocation?: string) => {
    setAnswers(prev => ({
      ...prev,
      locationPreference: {
        selected: preference,
        specificLocation: specificLocation || ''
      }
    }))
  }

  const updateHobbies = (hobbies: string[]) => {
    setAnswers(prev => ({
      ...prev,
      hobbies
    }))
  }

  const updateDailyPace = (dailyPace: string) => {
    setAnswers(prev => ({
      ...prev,
      dailyPace
    }))
  }

  const updatePets = (pets: string) => {
    setAnswers(prev => ({
      ...prev,
      pets
    }))
  }

  const updateCareLevel = (careLevel: string) => {
    setAnswers(prev => ({
      ...prev,
      careLevel
    }))
  }

  const updateCareNeeds = (hasCareNeeds: string, careDetails?: string) => {
    setAnswers(prev => ({
      ...prev,
      careNeeds: {
        hasCareNeeds,
        careDetails: careDetails || ''
      }
    }))
  }

  const resetQuiz = () => {
    setAnswers(initialAnswers)
  }

  const value: QuizContextType = {
    answers,
    updateZipCode,
    updateSpaceSize,
    updateLocationPreference,
    updateHobbies,
    updateDailyPace,
    updatePets,
    updateCareLevel,
    updateCareNeeds,
    resetQuiz
  }

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  )
}

// Custom hook to use the context
export function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
}

