import TanstackProvider from '@/providers/TanStackProvider'
import NextAuthSessionProvider from '@/providers/sessionProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Biflux',
  description: 'Your personal billets dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <TanstackProvider>
            {children}
          </TanstackProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
