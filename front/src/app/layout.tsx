import TanstackProvider from '@/providers/TanStackProvider';
import NextAuthSessionProvider from '@/providers/sessionProvider';
import CookieConsent from '@/components/PopUps/CookieConsent';
import { roboto, outfit } from './fonts';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Biflux',
  description: 'Seu painel pessoal de boletos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${roboto.variable} ${outfit.variable}`}>
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
