// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericObject = Record<string, any>
export type ChangeEventType = React.ChangeEvent<HTMLInputElement>
export type SubmitEventType = React.FormEvent<HTMLFormElement>

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
