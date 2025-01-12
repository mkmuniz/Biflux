import TanstackProvider from '@/providers/TanStackProvider';
import NextAuthSessionProvider from '@/providers/sessionProvider';
import CookieConsent from '@/components/PopUps/CookieConsent';

import type { Metadata } from 'next';

import { Roboto } from 'next/font/google';

import './globals.css'

export const metadata: Metadata = {
  title: 'Biflux',
  description: 'Your personal billets dashboard',
}

const roboto = Roboto({ weight: '700', subsets: ['latin']});

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
      <body className={roboto.className}>
        <NextAuthSessionProvider>
          <TanstackProvider>
            {children}
          </TanstackProvider>
        </NextAuthSessionProvider>
        <CookieConsent />
      </body>
    </html>
  )
}
