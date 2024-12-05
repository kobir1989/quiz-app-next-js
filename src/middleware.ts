import { TokenType, UserRole } from '@/types/auth'
import { isUser } from '@/utils'
import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server'

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = (await getToken({ req })) as TokenType

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    const path = req.nextUrl.pathname
    const userRole = token.role as UserRole

    // Protect dashboard routes for admin only
    if (path.startsWith('/dashboard') && isUser(userRole)) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }: { token: TokenType }) => !!token
    }
  }
)

export const config = {
  matcher: ['/dashboard', '/quiz']
}
