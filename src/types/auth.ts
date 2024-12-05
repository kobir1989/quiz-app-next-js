import { DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      role?: string
    } & DefaultSession['user']
  }

  interface User {
    role?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
  }
}

export type UserCredentials = {
  name: string
  email: string
  password: string
  role: string
  id: string
}

export type Credentials = {
  email: { label: string; type: string }
  password: { label: string; type: string }
}

export type UserRole = string | undefined

export type TokenType = JWT | null
