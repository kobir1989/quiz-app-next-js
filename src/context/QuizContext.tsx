'use client'

import { DUMMY_QUIZ_DATA } from '@/dummyData'
import { ChildrenProps, QuestionType, QuizContextType } from '@/types/global'
import { createContext, useContext, useEffect, useState } from 'react'

const QuizContext = createContext<QuizContextType | null>(null)

export const useQuiz = () => {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuiz must be used within a QuizContextProvider')
  }
  return context
}

const QuizContextProvider = ({ children }: ChildrenProps) => {
  const [listOfQuestions, setListOfQuestions] =
    useState<QuestionType[]>(DUMMY_QUIZ_DATA)

  useEffect(() => {
    const savedQuestions = localStorage.getItem('quizQuestions')
    if (savedQuestions) {
      setListOfQuestions(JSON.parse(savedQuestions))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('quizQuestions', JSON.stringify(listOfQuestions))
  }, [listOfQuestions])

  return (
    <QuizContext.Provider value={{ listOfQuestions, setListOfQuestions }}>
      {children}
    </QuizContext.Provider>
  )
}

export default QuizContextProvider
