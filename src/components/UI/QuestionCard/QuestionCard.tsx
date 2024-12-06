import Button from '@/components/UI/Button'
import Input from '@/components/UI/Input'
import { QuestionCardProps } from '@/types/global'

const QuestionCard = ({
  question = '',
  options = [],
  onSelectAnswer,
  onNextQuestion,
  onPreviousQuestion,
  selectedAnswers,
  currentQuestionIndex
}: QuestionCardProps) => {
  return (
    <div className='shadow-lg w-[20rem] p-6 rounded-lg'>
      <div className='mb-6'>
        <h1 className='text-[1.2rem] font-bold'>{question}</h1>
        <div className='flex flex-col gap-4 mt-4'>
          {options.map(option => (
            <div className='flex items-center  gap-2' key={option}>
              <Input
                type='checkbox'
                name={option}
                value={option}
                checked={selectedAnswers.some(answer => answer === option)}
                className='w-4 h-4 appearance-none border-2 border-black rounded checked:bg-black checked:border-black cursor-pointer flex items-center'
                onChange={() => onSelectAnswer(option)}
              />
              <p className='p-0 m-0 leading-none'>{option}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-between'>
        <Button
          variant='outline'
          onClick={onPreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Button
          onClick={onNextQuestion}
          disabled={!options.some(option => selectedAnswers.includes(option))}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default QuestionCard
