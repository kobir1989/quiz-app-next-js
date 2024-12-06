import Button from '@/components/UI/Button'
import BaseCard from '@/components/UI/Cards/BaseCard'
import CardTitle from '@/components/UI/Cards/CardTitle'
import { DashboardCardProps } from '@/types/global'

const DashboardCard = ({
  quiz,
  onDeleteQuestion,
  onEditQuestion
}: DashboardCardProps) => {
  return (
    <BaseCard>
      <div className='mb-6'>
        <CardTitle title={quiz.question} />
        <div className='flex flex-col gap-4 mt-4'>
          {quiz.options.map((option: string, index: number) => (
            <ul className='flex items-center  gap-2' key={option}>
              <li className='p-0 m-0 leading-none'>
                {index + 1}. {option}
              </li>
            </ul>
          ))}
          <div className='flex items-center gap-2'>
            <p className='p-0 m-0 leading-none text-green-500 font-bold'>
              Answer: {quiz.answer}
            </p>
          </div>
        </div>
      </div>
      <div className='flex justify-end gap-2'>
        <Button variant='danger' onClick={() => onDeleteQuestion(quiz.id)}>
          Delete
        </Button>
        <Button variant='primary' onClick={() => onEditQuestion(quiz)}>
          Edit
        </Button>
      </div>
    </BaseCard>
  )
}

export default DashboardCard
