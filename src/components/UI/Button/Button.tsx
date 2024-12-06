import { twMerge } from '@/utils'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'text'
  disabled?: boolean
}

const variantClasses = {
  primary:
    'bg-blue-500 text-white px-6 py-[6px] font-bold rounded-md hover:shadow-lg',
  secondary:
    'bg-gray-500 text-white px-6 py-[6px] font-bold rounded-md hover:shadow-lg',
  danger:
    'bg-red-500 text-white px-6 py-[6px] font-bold rounded-md hover:shadow-lg',
  outline:
    'bg-transparent text-black px-6 py-[6px] font-bold rounded-md border border-solid border-sky-500 hover:shadow-lg',
  text: 'bg-transparent text-black px-6 py-[6px] font-medium text-[1rem]'
}

const Button = ({
  children,
  className,
  variant = 'primary',
  disabled = false,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        className,
        variantClasses[variant],
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
