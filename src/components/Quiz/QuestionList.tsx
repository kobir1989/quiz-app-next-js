'use client'

import { QuestionCard, ResultCard } from '@/components/UI/Cards'
import NotFound from '@/components/UI/NotFound'
import { useQuiz } from '@/context/QuizContext'
import React, { useState } from 'react'

const WRAPPER_CLASS = 'md:w-[60%] w-full'

const QuestionList = () => {
  const { listOfQuestions } = useQuiz()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const currentQuestion = listOfQuestions[currentQuestionIndex]
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string[]>
  >({})
  const [isShowResult, setIsShowResult] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set()
  )

  const handleSelectAnswer = (answer: string): void => {
    setSelectedAnswers(prevAnswers => {
      const currentAnswers = prevAnswers[currentQuestionIndex] || []
      const updatedAnswers = currentAnswers.includes(answer)
        ? currentAnswers.filter(a => a !== answer)
        : [...currentAnswers, answer]

      return {
        ...prevAnswers,
        [currentQuestionIndex]: updatedAnswers
      }
    })
  }

  const handleNextQuestion = () => {
    // Only count the answer if this question hasn't been answered before
    if (!answeredQuestions.has(currentQuestionIndex)) {
      const isCorrect = selectedAnswers[currentQuestionIndex]?.includes(
        currentQuestion.answer
      )
      if (isCorrect) {
        setCorrectAnswers(prev => prev + 1)
      }
      setAnsweredQuestions(prev => new Set([...prev, currentQuestionIndex]))
    }

    if (currentQuestionIndex < listOfQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1)
    } else {
      setIsShowResult(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1)
    }
  }

  const handleTryAgain = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setIsShowResult(false)
    setCorrectAnswers(0)
    setAnsweredQuestions(new Set())
  }

  const percentage = Math.round((correctAnswers / listOfQuestions.length) * 100)
  const incorrectAnswers = listOfQuestions.length - correctAnswers

  return (
    <React.Fragment>
      {listOfQuestions.length > 0 ? (
        !isShowResult ? (
          <div className={WRAPPER_CLASS}>
            <QuestionCard
              key={currentQuestion.id}
              {...currentQuestion}
              onSelectAnswer={handleSelectAnswer}
              selectedAnswers={selectedAnswers[currentQuestionIndex] || []}
              onNextQuestion={handleNextQuestion}
              onPreviousQuestion={handlePreviousQuestion}
              currentQuestionIndex={currentQuestionIndex}
            />
          </div>
        ) : (
          <div className={WRAPPER_CLASS}>
            <ResultCard
              percentage={percentage}
              incorrectAnswers={incorrectAnswers}
              onTryAgain={handleTryAgain}
              totalQuestions={listOfQuestions.length}
            />
          </div>
        )
      ) : (
        <NotFound label='No questions found!' />
      )}
    </React.Fragment>
  )
}

export default QuestionList
