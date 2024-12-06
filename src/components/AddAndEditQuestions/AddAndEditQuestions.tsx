import Input from '@/components/UI/Input'
import Modal from '@/components/UI/Modal'
import { useQuiz } from '@/context/QuizContext'
import {
  AddAndEditQuestionsProps,
  ChangeEventType,
  ErrorType,
  QuestionType
} from '@/types/global'
import { validateAnswer, validateOptions } from '@/utils'
import { useEffect, useState } from 'react'

const INITIAL_STATE: QuestionType = {
  question: '',
  options: [],
  answer: '',
  id: ''
}

const AddAndEditQuestions = ({
  onClose,
  selectedQuestion
}: AddAndEditQuestionsProps) => {
  const [formData, setFormData] = useState<QuestionType>(INITIAL_STATE)
  const [error, setError] = useState<ErrorType>({})
  const { setListOfQuestions, listOfQuestions } = useQuiz()

  useEffect(() => {
    if (selectedQuestion) {
      setFormData(selectedQuestion)
    }
    return () => {
      setFormData(INITIAL_STATE)
    }
  }, [selectedQuestion])

  const validateForm = (): boolean => {
    const newErrors: ErrorType = {}

    if (!formData.question.trim()) {
      newErrors.question = 'Question is required'
    }

    const optionErrors = validateOptions(formData.options)
    if (optionErrors) {
      newErrors.options = optionErrors
    }

    const answerError = validateAnswer(formData.answer, formData.options)
    if (answerError) {
      newErrors.answer = answerError
    }

    setError(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validateForm()) return

    if (selectedQuestion) {
      setListOfQuestions(prev =>
        prev.map(q => (q.id === selectedQuestion.id ? formData : q))
      )
    } else {
      const newId = (listOfQuestions.length + 1).toString()
      const questionWithId = { ...formData, id: newId }
      setListOfQuestions(prev => [questionWithId, ...prev])
    }
    onClose()
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData({ ...formData, options: newOptions })

    if (error.options) {
      const newOptionErrors = [...error.options]
      newOptionErrors[index] = ''
      setError(prev => ({ ...prev, options: newOptionErrors }))
    }
  }

  const handleChange = (e: ChangeEventType) => {
    const { name, value } = e.target
    if (name === 'options') {
      const index = parseInt(e.target.dataset.index || '0')
      handleOptionChange(index, value)
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
      setError(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const renderOptionInput = (index: number) => (
    <Input
      key={`option__${index}`}
      placeholder={`Option ${index + 1}`}
      name='options'
      value={formData.options[index] || ''}
      onChange={handleChange}
      type='text'
      error={Array.isArray(error.options) ? error.options[index] : undefined}
      data-index={index.toString()}
    />
  )

  return (
    <Modal onSave={handleSave} onClose={onClose} onCancel={onClose}>
      <div className='mb-6'>
        <h1 className='text-[1.3rem] font-bold text-center'>
          {selectedQuestion ? 'Edit Question' : 'Add New Question'}
        </h1>
      </div>
      <form className='space-y-4'>
        <Input
          placeholder='Enter Question'
          name='question'
          value={formData.question}
          onChange={handleChange}
          type='text'
          error={error.question}
        />
        <div className='grid md:grid-cols-2 gap-4 grid-cols-1 w-full'>
          {[0, 1, 2, 3].map(index => renderOptionInput(index))}
        </div>
        <Input
          placeholder='Enter Answer'
          name='answer'
          value={formData.answer}
          onChange={handleChange}
          type='text'
          error={error.answer}
        />
      </form>
    </Modal>
  )
}

export default AddAndEditQuestions
