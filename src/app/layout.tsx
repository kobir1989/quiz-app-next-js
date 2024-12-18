import NavBar from '@/components/UI/NavBar'
import QuizContextProvider from '@/context'
import NextAuthProvider from '@/Providers'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: 'Quiz App',
  description: 'Quiz App'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          <QuizContextProvider>
            <NavBar />
            {children}
          </QuizContextProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
