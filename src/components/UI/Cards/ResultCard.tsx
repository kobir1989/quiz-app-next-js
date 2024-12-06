import Button from '@/components/UI/Button'
import BaseCard from '@/components/UI/Cards/BaseCard'
import { ResultCardProps } from '@/types/global'

const ResultCard = ({
  percentage,
  incorrectAnswers,
  onTryAgain,
  totalQuestions
}: ResultCardProps) => {
  const renderTitleText = (): string => {
    switch (true) {
      case incorrectAnswers === 0:
        return 'Congratulations! You got all questions right.'
      case percentage >= 80:
        return 'Almost there! You are doing great.'
      default:
        return `Oops! Not so good, Try again.`
    }
  }
  return (
    <BaseCard className='flex flex-col gap-4 border border-solid border-sky-200 rounded-lg'>
      <h1 className='text-[1.2rem] font-bold'>{renderTitleText()}</h1>
      <div className='flex flex-col gap-2'>
        <p className='text-md text-gray-700'>
          Total questions: {totalQuestions}
        </p>
        <p className='text-md text-green-700'>
          Correct answers: {totalQuestions - incorrectAnswers}
        </p>
        <p className='text-md text-red-500'>
          Incorrect answers: {incorrectAnswers}
        </p>
        <p className='text-md text-gray-700'> Percentage: {percentage}%</p>
      </div>
      <Button variant='primary' onClick={onTryAgain}>
        Try Again?
      </Button>
    </BaseCard>
  )
}

export default ResultCard
