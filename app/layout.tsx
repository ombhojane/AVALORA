import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { FloatingParticles } from '@/components/FloatingParticles'
import { WhirlpoolButton } from '@/components/WhirlpoolButton'
import { PageTransition } from '@/components/PageTransition'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AVALORA - Shiro no Kizuna',
  description: 'Bonds of the White Snow - An Avalanche blockchain adventure game',
  keywords: 'AVALORA, Avalanche, blockchain, anime, game, Web3, typing, adventure',
  authors: [{ name: 'AVALORA Team' }],
  openGraph: {
    title: 'AVALORA - Shiro no Kizuna',
    description: 'Bonds of the White Snow - An Avalanche blockchain adventure game',
    type: 'website',
    images: ['/LogoAssets/MainLogo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <FloatingParticles />
          <PageTransition>
            {children}
          </PageTransition>
          <WhirlpoolButton />
        </Providers>
      </body>
    </html>
  )
}