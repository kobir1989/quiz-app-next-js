'use client'

import NavLinks from '@/components/UI/NavBar/NavLinks'
import UserDropdown from '@/components/UI/NavBar/UserDropdown'
import { isAdmin } from '@/utils'
import { signOut, useSession } from 'next-auth/react'

export const NavBar = () => {
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' })
  }

  return (
    <div className='flex justify-between items-center p-4 border-b border-solid border-gray-200 fixed top-0 left-0 right-0 z-50 bg-white'>
      <h2 className='text-lg font-bold'>Next.js Quiz App</h2>
      <div className='flex gap-4'>
        {isAdmin(session?.user?.role) && (
          <NavLinks href='/dashboard' text='Dashboard' />
        )}
        {session && (
          <>
            <NavLinks href='/quiz' text='Quiz' />
            <UserDropdown handleSignOut={handleSignOut} />
          </>
        )}
      </div>
    </div>
  )
}

export default NavBar
