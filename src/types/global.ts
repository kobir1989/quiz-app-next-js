import { ButtonHTMLAttributes, ReactNode } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericObject = Record<string, any>
export type ChangeEventType = React.ChangeEvent<HTMLInputElement>
export type SubmitEventType = React.FormEvent<HTMLFormElement>
export type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>

export interface QuestionCardProps {
  id: string
  question: string
  options: string[]
  onSelectAnswer: (_answer: string) => void
  onNextQuestion: () => void
  onPreviousQuestion: () => void
  selectedAnswers: string[]
  currentQuestionIndex: number
}

export interface ChildrenProps {
  children: React.ReactNode
}

export interface QuestionType {
  id: string
  question: string
  options: string[]
  answer: string
}

export interface QuizContextType {
  listOfQuestions: QuestionType[]
  setListOfQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>
}

export interface ResultCardProps {
  percentage: number
  incorrectAnswers: number
  onTryAgain: () => void
  totalQuestions: number
}

export interface ModalProps extends ChildrenProps {
  onClose: () => void
  onSave: () => void
  onCancel: () => void
}

export type ErrorType = Partial<QuestionType>

export interface AddAndEditQuestionsProps {
  onClose: () => void
  selectedQuestion: QuestionType | null
}

export interface DashboardCardProps {
  quiz: QuestionType
  onDeleteQuestion: (_id: string) => void
  onEditQuestion: (_question: QuestionType) => void
}

export interface CardWrapperProps extends ChildrenProps {
  className?: string
  isBorder?: boolean
  borderColor?: string
}

export interface BaseCardProps extends ChildrenProps {
  className?: string
}

export type ContainerProps = BaseCardProps

export type LoginFormInputs = {
  email: string | ''
  password: string | ''
}

export type ButtonProps = ButtonAttributes & {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'text'
  disabled?: boolean
}

export interface NavLinkProps {
  href: string
  text: string
  className?: string
}
