'use client'

import type { ChildrenProps } from '@/types/global'
import { SessionProvider } from 'next-auth/react'

export const NextAuthProvider = ({ children }: ChildrenProps) => {
  return (
    <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
  )
}
