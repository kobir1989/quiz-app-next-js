import { BaseCardProps } from '@/types/global'

const BaseCard = ({ children, className = '' }: BaseCardProps) => {
  return (
    <div className={`w-full p-6 rounded-lg shadow-lg ${className}`}>
      {children}
    </div>
  )
}

export default BaseCard
