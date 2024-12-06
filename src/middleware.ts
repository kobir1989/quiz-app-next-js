import { TokenType, UserRole } from '@/types/auth'
import { isUser } from '@/utils'
import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server'

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = (await getToken({ req })) as TokenType
    const path = req.nextUrl.pathname

    if (token && path === '/login') {
      return NextResponse.redirect(new URL('/', req.url))
    }

    if (path === '/login') {
      return NextResponse.next()
    }

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    const userRole = token.role as UserRole

    // Protect dashboard routes for admin only
    if (path.startsWith('/dashboard') && isUser(userRole)) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (!req) return !!token
        return true
      }
    }
  }
)

export const config = {
  matcher: ['/dashboard', '/', '/login']
}
