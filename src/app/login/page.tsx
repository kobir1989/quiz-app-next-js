import LoginForm from '@/components/LoginForm'
import Container from '@/components/UI/Container'

const LoginPage = () => {
  return (
    <main>
      <Container className='flex flex-col items-center justify-center'>
        <div className='flex flex-col gap-4 max-w-md mx-auto border p-4 rounded-md lg:w-[80%] w-full'>
          <h1 className='text-2xl font-bold'>Welcome To Quiz App</h1>
          <p className='text-sm text-gray-500'>
            Sign in to your account to continue
          </p>
          <LoginForm />
        </div>
      </Container>
    </main>
  )
}

export default LoginPage
