import { ButtonProps } from '@/types/global'
import { twMerge } from '@/utils'

const baseClasses = 'px-6 py-[6px] rounded-md hover:shadow-lg'
const boldClasses = 'font-bold'

const variantClasses = {
  primary: twMerge(baseClasses, boldClasses, 'bg-blue-500 text-white'),
  secondary: twMerge(baseClasses, boldClasses, 'bg-gray-500 text-white'),
  danger: twMerge(baseClasses, boldClasses, 'bg-red-500 text-white'),
  outline: twMerge(
    baseClasses,
    boldClasses,
    'bg-transparent text-black border border-solid border-sky-500'
  ),
  text: twMerge(
    baseClasses,
    'bg-transparent text-black font-medium text-[1rem]'
  )
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
