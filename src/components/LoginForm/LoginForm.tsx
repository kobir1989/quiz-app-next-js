'use client'

import { LoginFormInputs } from '@/components/LoginForm/types'
import Button from '@/components/UI/Button'
import Input from '@/components/UI/Input'
import { ChangeEventType, GenericObject, SubmitEventType } from '@/types/global'
import { inputValidator } from '@/utils'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const INITIAL_STATE = {
  formInputs: { email: '', password: '' } as LoginFormInputs,
  errors: {} as GenericObject
}

const LoginForm = () => {
  const [formState, setFormState] = useState(INITIAL_STATE)
  const router = useRouter()

  const updateFormInput = (name: string, value: string): void => {
    setFormState(prev => ({
      ...prev,
      formInputs: { ...prev.formInputs, [name]: value },
      errors: {}
    }))
  }

  const handleInputChange = (e: ChangeEventType): void => {
    updateFormInput(e.target.name, e.target.value)
  }

  const setFormErrors = (errors: GenericObject): void => {
    setFormState(prev => ({
      ...prev,
      errors
    }))
  }

  const validateForm = (): boolean => {
    const validationErrors = inputValidator(formState.formInputs)
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors)
      return false
    }
    return true
  }

  const handleSubmit = async (e: SubmitEventType): Promise<void> => {
    try {
      e.preventDefault()

      if (!validateForm()) return

      const requestBody = {
        email: formState.formInputs.email,
        password: formState.formInputs.password
      } as LoginFormInputs

      const response = await signIn('credentials', {
        ...requestBody,
        redirect: false
      })

      if (response?.status === 200) {
        router.push('/quiz')
      } else {
        setFormErrors({
          email: 'Invalid email or password',
          password: 'Invalid email or password'
        })
      }
    } catch (error: unknown) {
      throw error
    }
  }

  return (
    <form className='flex flex-col gap-4 w-full' onSubmit={handleSubmit}>
      <Input
        placeholder='Email'
        type='email'
        name='email'
        value={formState.formInputs.email}
        onChange={handleInputChange}
        error={formState.errors.email}
        autoComplete='off'
      />
      <Input
        placeholder='Password'
        type='password'
        name='password'
        value={formState.formInputs.password}
        onChange={handleInputChange}
        error={formState.errors.password}
        autoComplete='off'
      />
      <div>
        <Button type='submit'>Login</Button>
      </div>
    </form>
  )
}

export default LoginForm
