'use client'

import AddAndEditQuestions from '@/components/AddAndEditQuestions'
import Button from '@/components/UI/Button'
import { DashboardCard } from '@/components/UI/Cards'
import NotFound from '@/components/UI/NotFound'
import { useQuiz } from '@/context/QuizContext'
import { QuestionType } from '@/types/global'
import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'

const DashboardQuizList = () => {
  const { listOfQuestions, setListOfQuestions } = useQuiz()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType | null>(
    null
  )

  const handleEditQuestion = (question: QuestionType): void => {
    setSelectedQuestion(question)
    setIsModalOpen(true)
  }

  const handleRemove = (id: string | number): void => {
    setListOfQuestions(prev => prev.filter(question => question.id !== id))
  }

  const handleCloseModal = (): void => {
    setIsModalOpen(false)
    setSelectedQuestion(null)
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold text-center'>
          Welcome to the Dashboard
        </h1>
        <p className='text-md text-gray-500 text-center mt-2'>
          Here you can add and edit questions.
        </p>
        <div className='mt-4 '>
          <Button
            onClick={() => setIsModalOpen(true)}
            className='flex items-center'
          >
            <IoMdAdd />
            Add New Question
          </Button>
        </div>
      </div>
      <div className='mt-10'>
        {listOfQuestions.length > 0 ? (
          listOfQuestions.map(quiz => (
            <div key={quiz.id} className='md:w-[80%] mx-auto my-8 w-full'>
              <DashboardCard
                quiz={quiz}
                onEditQuestion={() => handleEditQuestion(quiz)}
                onDeleteQuestion={() => handleRemove(quiz.id)}
              />
            </div>
          ))
        ) : (
          <NotFound label='No questions found! Please add a question.' />
        )}
      </div>
      {isModalOpen && (
        <AddAndEditQuestions
          onClose={handleCloseModal}
          selectedQuestion={selectedQuestion}
        />
      )}
    </>
  )
}

export default DashboardQuizList
