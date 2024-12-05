import { twMerge } from '@/utils'
import { ReactNode } from 'react'

const Container = ({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <section
      className={twMerge(
        'max-w-[1024px] mx-auto flex flex-col items-center justify-center h-screen p-4',
        className
      )}
    >
      {children}{' '}
    </section>
  )
}

export default Container
