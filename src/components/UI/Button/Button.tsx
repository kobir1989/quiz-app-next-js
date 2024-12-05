import { twMerge } from '@/utils'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        className,
        'bg-blue-500 text-white px-6 py-[6px] font-bold rounded-md'
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
