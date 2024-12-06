import { ContainerProps } from '@/types/global'
import { twMerge } from '@/utils'

const Container = ({ children, className }: ContainerProps) => {
  return (
    <section
      className={twMerge('max-w-[1024px] mx-auto h-screen p-4', className)}
    >
      {children}{' '}
    </section>
  )
}

export default Container
