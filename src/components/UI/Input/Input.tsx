import { twMerge } from '@/utils'
import { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string
}

const Input = ({
  placeholder,
  value,
  onChange,
  error,
  className,
  ...rest
}: InputProps) => {
  return (
    <div className={twMerge('relative', className)}>
      <input
        className={twMerge(
          'w-full px-4 py-[6px] border rounded focus:outline-none focus:ring-2 bg-white',
          error ? 'border-red-500' : 'border-gray-300'
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  )
}

export default Input
