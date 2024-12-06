'use client'

import QuestionCard from '@/components/UI/QuestionCard'
import ResultCard from '@/components/UI/ResultCard'
import { useQuiz } from '@/context/QuizContext'
import { useState } from 'react'

const QuestionList = () => {
  const { listOfQuestions } = useQuiz()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const currentQuestion = listOfQuestions[currentQuestionIndex]
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [isShowResult, setIsShowResult] = useState(false)

  const handleSelectAnswer = (answer: string): void => {
    setSelectedAnswers(prevAnswers => {
      if (prevAnswers.includes(answer)) {
        return prevAnswers.filter(a => a !== answer)
      }
      return [...prevAnswers, answer]
    })
  }

  const handleNextQuestion = () => {
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
    setSelectedAnswers([])
    setIsShowResult(false)
  }

  const percentage = (
    (currentQuestionIndex / listOfQuestions.length) *
    100
  ).toFixed(2)
  const incorrectAnswers = listOfQuestions.length - currentQuestionIndex

  return (
    <div>
      {!isShowResult ? (
        <QuestionCard
          key={currentQuestion.id}
          {...currentQuestion}
          onSelectAnswer={handleSelectAnswer}
          selectedAnswers={selectedAnswers}
          onNextQuestion={handleNextQuestion}
          onPreviousQuestion={handlePreviousQuestion}
          currentQuestionIndex={currentQuestionIndex}
        />
      ) : (
        <ResultCard
          percentage={Number(percentage)}
          incorrectAnswers={incorrectAnswers}
          onTryAgain={handleTryAgain}
          totalQuestions={listOfQuestions.length}
        />
      )}
    </div>
  )
}

export default QuestionList
