'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { usePrivy } from '@privy-io/react-auth'
import { useEnhancedAuth } from '@/hooks/useEnhancedAuth'
import { useGame } from '@/app/providers'
import WalletDisplay from '@/components/wallet/wallet-display'
import WalletCreation from '@/components/wallet/wallet-creation'
import LoginButton from '@/components/auth/login-button'
import { Wallet } from 'lucide-react'

export default function AuthPage() {
  const router = useRouter()
  const { ready, authenticated } = usePrivy()
  const { hasAvalancheWallet } = useEnhancedAuth()
  const { login, gameState } = useGame()
  const redirectingRef = useRef(false)

  const [isLoading, setIsLoading] = useState(false)

  // Handle auto-login and redirect when wallet is ready
  useEffect(() => {
    console.log('Auth page effect:', { ready, authenticated, hasAvalancheWallet, gameAuthenticated: gameState.isAuthenticated, redirecting: redirectingRef.current })

    if (ready && authenticated && hasAvalancheWallet) {
      if (!gameState.isAuthenticated && !redirectingRef.current) {
        console.log('Starting auto-login process')
        redirectingRef.current = true

        // Auto-login to game
        login({
          name: 'Avalanche Warrior',
          level: 1,
          hp: 100,
          maxHp: 100,
          gems: 250,
          xp: 0,
          avatar: '/Artworks-Characters/MainCharacter.png'
        })
      } else if (gameState.isAuthenticated) {
        console.log('Game authenticated, redirecting to dashboard')
        router.replace('/dashboard')
      }
    }
  }, [ready, authenticated, hasAvalancheWallet, gameState.isAuthenticated, login, router])

  // Simulated wallet connect (like old file)
  const handleWalletConnect = async () => {
    setIsLoading(true)
    setTimeout(() => {
      login({
        name: 'Crypto Warrior',
        level: 1,
        hp: 100,
        maxHp: 100,
        gems: 250,
        xp: 0,
        avatar: '/Artworks-Characters/MainCharacter.png'
      })
      setIsLoading(false)
      router.push('/dashboard')
    }, 2000)
  }

  // If user is already authenticated and has wallet, show redirecting state
  if (ready && authenticated && hasAvalancheWallet && (gameState.isAuthenticated || redirectingRef.current)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-avalanche-red mx-auto mb-4"></div>
          <p>Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: 'url(/ImageAssets/RedSky.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-80" />

      {/* Floating anime particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <div className="w-2 h-2 bg-avalanche-red rounded-full opacity-30" />
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="manga-border bg-black bg-opacity-90 backdrop-blur-sm p-8 rounded-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-manga font-bold text-white mb-2">
              Welcome to AVALORA
            </h1>
            <p className="text-gray-300">
              Connect your wallet to begin your adventure
            </p>
          </div>

          {/* Wallet Connection Panel */}
          <div className="space-y-6">
            {!ready ? (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-gray-600 shadow-lg">
                <div className="animate-pulse text-center">
                  <div className="h-4 bg-gray-600 rounded w-1/3 mb-4 mx-auto"></div>
                  <div className="h-8 bg-gray-600 rounded w-2/3 mb-2 mx-auto"></div>
                  <div className="h-4 bg-gray-600 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            ) : !authenticated ? (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-avalanche-red shadow-lg shadow-red-500/20">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Choose Your Connection Method</h3>
                  <p className="text-gray-400 text-sm">Select how you'd like to connect to AVALORA</p>
                </div>
                <div className="flex flex-col space-y-4">
                  <LoginButton />
                  <motion.button
                    onClick={handleWalletConnect}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center shadow-lg shadow-purple-500/20 relative overflow-hidden group"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {/* Anime shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <Wallet className="w-5 h-5 mr-3 relative z-10" />
                    <span className="relative z-10">
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          接続中...
                        </div>
                      ) : (
                        <>
                          ウォレット接続
                          <div className="text-xs opacity-75">Connect Wallet</div>
                        </>
                      )}
                    </span>
                  </motion.button>
                </div>
              </div>
            ) : !hasAvalancheWallet ? (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-yellow-400 shadow-lg shadow-yellow-500/20">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-white mb-2">Setting Up Your Wallet</h3>
                  <p className="text-gray-400 text-sm">Creating your Avalanche wallet...</p>
                </div>
                <WalletCreation />
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-green-400 shadow-lg shadow-green-500/20">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-white mb-2">Wallet Connected!</h3>
                  <p className="text-gray-400 text-sm">Redirecting to dashboard...</p>
                </div>
                <WalletDisplay />
              </div>
            )}
          </div>

          {/* Connection Options Info */}
          <div className="mt-8 text-center">
            <div className="text-gray-500 text-sm mb-4">Available connection methods:</div>
            <div className="flex justify-center space-x-4 text-xs text-gray-400">
              <span>🔗 Wallet</span>
              <span>📧 Email</span>
              <span>🔍 Google</span>
              <span>📱 Phone</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}