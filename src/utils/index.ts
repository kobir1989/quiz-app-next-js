import { ROLES } from '@/constants'
import { UserRole } from '@/types/auth'
import { GenericObject, LoginFormInputs } from '@/types/global'

/**
 * Checks if the user role is admin
 * @param role - UserRole
 * @returns boolean
 */
export const isAdmin = (role: UserRole) => role === ROLES.ADMIN
export const isUser = (role: UserRole) => role === ROLES.USER

/**
 * Merges multiple class names into a single string, filtering out falsy values
 * @param classNames - Array of class names, which can include strings, undefined, or null
 * @returns Combined class names string with falsy values removed
 */
export const twMerge = (
  ...classNames: (string | undefined | null)[]
): string => {
  return classNames.filter(Boolean).join(' ')
}

/**
 * Validates the input values
 * @param inputValue - LoginFormInputs
 * @returns Error Object
 */
export const inputValidator = (inputValue: LoginFormInputs): GenericObject => {
  const error: GenericObject = {}
  if (inputValue.password.length < 6) {
    error.password = 'Password should be more than 6 characters.'
  }
  if (!inputValue.email) {
    error.email = 'Email is required.'
  }
  return error
}

/**
 * Calculates the percentage of correct answers
 * @param score - number
 * @param totalQuestions - number
 * @returns number
 */
export const getPercentage = (
  score: number,
  totalQuestions: number
): number => {
  return Number(((score / totalQuestions) * 100).toFixed(2))
}

/**
 * AddAndEditQuestions - Validates the options (4 options are required)
 * @param options - string[]
 * @returns string[] | null
 */
export const validateOptions = (options: string[]): string[] | null => {
  const filledOptions = options.filter(option => option.trim())
  if (filledOptions.length < 4) {
    const optionErrors = Array(4).fill('This option is required')
    options.forEach((option, index) => {
      if (option.trim()) {
        optionErrors[index] = ''
      }
    })
    return optionErrors
  }
  return null
}

/**
 * AddAndEditQuestions - Validates the answer
 * @param answer - string
 * @param options - string[]
 * @returns string | null
 */
export const validateAnswer = (
  answer: string,
  options: string[]
): string | null => {
  if (!answer.trim()) {
    return 'Answer is required'
  }
  if (!options.includes(answer)) {
    return 'Answer must match one of the options'
  }
  return null
}
