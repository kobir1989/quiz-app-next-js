import { ADMIN_CREDENTIALS, CREDENTIALS, USER_CREDENTIALS } from '@/constants'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: CREDENTIALS,
      authorize: async credentials => {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Mock admin credentials
        if (
          credentials.email === ADMIN_CREDENTIALS.email &&
          credentials.password === ADMIN_CREDENTIALS.password
        ) {
          return {
            id: ADMIN_CREDENTIALS.id,
            email: credentials.email,
            name: ADMIN_CREDENTIALS.name,
            role: ADMIN_CREDENTIALS.role
          }
        }

        // Mock regular user credentials
        if (
          credentials.email === USER_CREDENTIALS.email &&
          credentials.password === USER_CREDENTIALS.password
        ) {
          return {
            id: USER_CREDENTIALS.id,
            email: credentials.email,
            name: USER_CREDENTIALS.name,
            role: USER_CREDENTIALS.role
          }
        }

        // Return null for invalid credentials
        return null
      }
    })
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role
      }
      return token
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.role = token.role
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(options)
export { handler as GET, handler as POST }
