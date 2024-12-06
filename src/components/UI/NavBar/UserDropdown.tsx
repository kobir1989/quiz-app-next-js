import Button from '@/components/UI/Button'
import { useOutsideClick } from '@/hooks'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRef, useState } from 'react'

const UserDropdown = ({ handleSignOut }: { handleSignOut: () => void }) => {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useOutsideClick(dropdownRef, () => setIsOpen(false))

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        className='flex gap-2 items-center cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='rounded-full border border-solid border-gray-300 p-2'>
          <Image
            src='/images/placeholder.jpeg'
            alt='admin'
            width={20}
            height={20}
          />
        </div>
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-4 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200'>
          <div className='px-4 py-2 border-b border-gray-200'>
            <p className='text-sm font-medium'>{session?.user?.name}</p>
            <p className='text-xs text-gray-500'>
              Email: {session?.user?.email}
            </p>
            <p className='text-xs text-gray-500'>
              Role: {session?.user?.role?.toLowerCase()}
            </p>
          </div>
          <div className='px-4 py-2'>
            <Button
              variant='danger'
              className='w-full font-medium'
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDropdown
