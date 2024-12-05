import { LoginFormInputs } from '@/components/LoginForm/types'
import { ROLES } from '@/constants'
import { UserRole } from '@/types/auth'
import { GenericObject } from '@/types/global'

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
export const twMerge = (...classNames: (string | undefined | null)[]) => {
  return classNames.filter(Boolean).join(' ')
}

/**
 * Validates the input values
 * @param inputValue - LoginFormInputs
 * @returns GenericObject
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
