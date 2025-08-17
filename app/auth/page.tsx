'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { usePrivy } from '@privy-io/react-auth'
import { useEnhancedAuth } from '@/hooks/useEnhancedAuth'
import { useGame } from '@/app/providers'
import WalletDisplay from '@/components/wallet/wallet-display'
import WalletCreation from '@/components/wallet/wallet-creation'
import LoginButton from '@/components/auth/login-button'
import { Wallet, Snowflake, Zap, Shield, Sparkles, Crown, Sword } from 'lucide-react'
import Image from 'next/image'

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
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url(/ImageAssets/RedSky.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-85" />

      {/* Anime-style floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={`auth-particle-${i}`}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          >
            {i % 4 === 0 ? (
              <Snowflake className="w-4 h-4 text-blue-300 opacity-40" />
            ) : i % 4 === 1 ? (
              <Sparkles className="w-3 h-3 text-purple-400 opacity-30" />
            ) : i % 4 === 2 ? (
              <div className="w-2 h-2 bg-avalanche-red rounded-full opacity-40" />
            ) : (
              <Zap className="w-3 h-3 text-yellow-400 opacity-35" />
            )}
          </div>
        ))}
      </div>

      {/* Speed lines effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent transform -rotate-12" />
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent transform rotate-6" />
        <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent transform -rotate-6" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        className="relative z-10 w-full max-w-lg mx-4"
      >
        {/* Main Auth Card */}
        <div className="relative bg-gradient-to-br from-slate-900/98 to-gray-900/98 backdrop-blur-2xl p-12 rounded-3xl border border-gray-600/50 shadow-2xl shadow-black/50 overflow-hidden">
          {/* Subtle corner accents */}
          <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-avalanche-red/40" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-avalanche-red/40" />

          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5 rounded-3xl" />

          {/* Header Section */}
          <div className="relative z-10 text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center mb-8"
            >
              <div className="relative">
                {/* Subtle layered logo */}
                <div className="w-24 h-24 bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl flex items-center justify-center border border-gray-600/50 shadow-xl">
                  <Snowflake className="w-12 h-12 text-avalanche-red" />
                </div>
                {/* Subtle glow */}
                <div className="absolute inset-0 bg-avalanche-red/20 rounded-2xl blur-xl opacity-50" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-6xl font-manga font-bold text-white mb-3 tracking-wide"
            >
              AVALORA
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-center space-x-2 text-avalanche-red font-semibold">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-avalanche-red" />
                <span className="text-lg">永遠の冬の領域</span>
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-avalanche-red" />
              </div>
              <p className="text-gray-400 text-lg">
                Enter the realm where legends are forged
              </p>
            </motion.div>
          </div>

          {/* Wallet Connection Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="relative z-10 space-y-6"
          >
            {!ready ? (
              <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-2xl p-8 border-2 border-gray-500 shadow-lg backdrop-blur-sm">
                <div className="animate-pulse text-center space-y-4">
                  <Shield className="w-12 h-12 text-gray-400 mx-auto animate-spin" />
                  <div className="h-4 bg-gray-500 rounded w-2/3 mx-auto"></div>
                  <div className="h-6 bg-gray-500 rounded w-1/2 mx-auto"></div>
                  <div className="text-gray-400">Initializing secure connection...</div>
                </div>
              </div>
            ) : !authenticated ? (
              <div className="bg-gradient-to-br from-gray-700/60 to-gray-800/60 rounded-2xl p-8 border-2 border-avalanche-red shadow-lg shadow-red-500/30 backdrop-blur-sm relative overflow-hidden">
                {/* Battle-style header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <Sword className="w-8 h-8 text-avalanche-red mr-3" />
                    <h3 className="text-2xl font-bold text-white">Choose Your Path</h3>
                    <Sword className="w-8 h-8 text-avalanche-red ml-3 transform scale-x-[-1]" />
                  </div>
                  <p className="text-gray-300">Select your method to enter the realm</p>
                </div>

                <div className="space-y-4">
                  <LoginButton />
                  <motion.button
                    onClick={handleWalletConnect}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center shadow-lg shadow-purple-500/30 relative overflow-hidden group border-2 border-purple-400/50"
                    whileHover={{ scale: isLoading ? 1 : 1.02, y: -2 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {/* Anime shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                    {/* Action lines */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent transform -rotate-12" />
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent transform rotate-12" />
                    </div>

                    <Wallet className="w-6 h-6 mr-3 relative z-10" />
                    <span className="relative z-10 text-lg">
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                          <div>
                            <div className="font-bold">接続中...</div>
                            <div className="text-sm opacity-75">Connecting...</div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="font-bold">ウォレット接続</div>
                          <div className="text-sm opacity-75">Connect Wallet</div>
                        </div>
                      )}
                    </span>
                  </motion.button>
                </div>
              </div>
            ) : !hasAvalancheWallet ? (
              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-8 border-2 border-yellow-400 shadow-lg shadow-yellow-500/30 backdrop-blur-sm">
                <div className="text-center mb-6">
                  <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-2xl font-bold text-white mb-2">Forging Your Wallet</h3>
                  <p className="text-gray-300">Creating your Avalanche wallet...</p>
                </div>
                <WalletCreation />
              </div>
            ) : (
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-8 border-2 border-green-400 shadow-lg shadow-green-500/30 backdrop-blur-sm">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Wallet Connected!</h3>
                  <p className="text-gray-300">Entering the realm...</p>
                </div>
                <WalletDisplay />
              </div>
            )}
          </motion.div>

          {/* Connection Methods Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="relative z-10 mt-10 text-center"
          >
            <div className="text-gray-400 text-sm mb-4 font-semibold">Available Connection Methods</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '🔗', name: 'Wallet', desc: 'Crypto Wallet' },
                { icon: '📧', name: 'Email', desc: 'Email Login' },
                { icon: '🔍', name: 'Google', desc: 'Google Auth' },
                { icon: '📱', name: 'Phone', desc: 'SMS Verify' }
              ].map((method, index) => (
                <motion.div
                  key={method.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                  className="bg-gray-800/50 rounded-lg p-3 border border-gray-600 hover:border-gray-500 transition-colors duration-300"
                >
                  <div className="text-lg mb-1">{method.icon}</div>
                  <div className="text-white text-sm font-semibold">{method.name}</div>
                  <div className="text-gray-400 text-xs">{method.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}