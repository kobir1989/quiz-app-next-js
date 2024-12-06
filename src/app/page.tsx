import QuestionList from '@/components/Quiz/QuestionList'
import Container from '@/components/UI/Container'

const QuizPage = () => {
  return (
    <main>
      <Container className='flex flex-col items-center justify-center'>
        <QuestionList />
      </Container>
    </main>
  )
}

export default QuizPage
