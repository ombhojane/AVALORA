'use client'

import { motion } from 'framer-motion'
import { useGame } from '@/app/providers'
import { useRouter } from 'next/navigation'
import { Sword, Target, ShoppingBag, Trophy, User, BookOpen, Heart, Gem, Wallet, Plus } from 'lucide-react'
import Image from 'next/image'
import { usePrivy } from '@privy-io/react-auth'
import { useEnhancedAuth } from '@/hooks/useEnhancedAuth'
import WalletDisplay from '@/components/wallet/wallet-display'
import WalletCreation from '@/components/wallet/wallet-creation'
import LoginButton from '@/components/auth/login-button'

const quickLinks = [
  { 
    icon: Sword, 
    title: 'Quests', 
    description: 'Embark on epic adventures', 
    href: '/quest', 
    bgImage: '/WebsiteAssets/MiniSword.png',
    accentColor: 'border-red-400 shadow-red-500/20'
  },
  { 
    icon: Target, 
    title: 'Training', 
    description: 'Hone your skills', 
    href: '/training', 
    bgImage: '/WebsiteAssets/MiniFlash.png',
    accentColor: 'border-blue-400 shadow-blue-500/20'
  },
  { 
    icon: ShoppingBag, 
    title: 'Marketplace', 
    description: 'Trade and shop', 
    href: '/marketplace', 
    bgImage: '/WebsiteAssets/CrystalGroup.png',
    accentColor: 'border-green-400 shadow-green-500/20'
  },
  { 
    icon: Trophy, 
    title: 'Leaderboard', 
    description: 'Compete globally', 
    href: '/leaderboard', 
    bgImage: '/BadgeAssets/SpartanAttack.png',
    accentColor: 'border-yellow-400 shadow-yellow-500/20'
  },
  { 
    icon: User, 
    title: 'Profile', 
    description: 'Customize character', 
    href: '/profile', 
    bgImage: '/WebsiteAssets/UnknownNamePlateCard.png',
    accentColor: 'border-purple-400 shadow-purple-500/20'
  },
  { 
    icon: BookOpen, 
    title: 'Codex', 
    description: 'Learn Web3 & Avalanche', 
    href: '/codex', 
    bgImage: '/WebsiteAssets/KeysandLock.png',
    accentColor: 'border-indigo-400 shadow-indigo-500/20'
  }
]

export default function DashboardPage() {
  const { gameState } = useGame()
  const router = useRouter()
  const { ready, authenticated } = usePrivy()
  const { hasAvalancheWallet, walletCreationStep } = useEnhancedAuth()

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: 'url(/ImageAssets/CyberLines.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-80" />
      
      {/* Floating anime particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
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

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with Wallet Info */}
        <div className="flex justify-between items-start mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h1 className="text-5xl font-manga font-bold text-white mb-4">
              Welcome back, <span className="text-avalanche-red smoky-text">{gameState.player.name}</span>
            </h1>
            <p className="text-xl text-gray-300">Ready for your next adventure?</p>
          </motion.div>

          {/* Wallet Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="min-w-[320px]"
          >
            {!ready ? (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-gray-600 shadow-lg">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-600 rounded w-1/3 mb-4"></div>
                  <div className="h-8 bg-gray-600 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            ) : !authenticated ? (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-red-400 shadow-lg shadow-red-500/20">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white mb-4">Connect Your Wallet</h3>
                  <LoginButton />
                </div>
              </div>
            ) : !hasAvalancheWallet ? (
              <WalletCreation />
            ) : (
              <WalletDisplay />
            )}
          </motion.div>
        </div>

        {/* Player Stats - Anime Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {/* Avatar Card */}
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-center border-2 border-avalanche-red shadow-lg shadow-red-500/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
              <Image src="/WebsiteAssets/AncientDesign.png" alt="" fill className="object-contain" />
            </div>
            <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-avalanche-red" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-avalanche-red" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-3">
                <div className="relative">
                  <Image
                    src={gameState.player.avatar}
                    alt="Player Avatar"
                    width={60}
                    height={60}
                    className="rounded-full border-3 border-avalanche-red shadow-lg"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">Level {gameState.player.level}</div>
              <div className="text-avalanche-red font-semibold">Warrior</div>
            </div>
          </div>

          {/* HP Card */}
          <div className="relative bg-gradient-to-br from-red-900/30 to-red-800/30 rounded-2xl p-6 text-center border-2 border-red-400 shadow-lg shadow-red-500/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
              <Heart className="w-full h-full text-red-400" />
            </div>
            <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-red-400" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-red-400" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-3">
                <Heart className="w-8 h-8 text-red-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">{gameState.player.hp}/{gameState.player.maxHp}</div>
              <div className="text-red-300 font-semibold mb-2">Health Points</div>
              <div className="w-full bg-gray-700 rounded-full h-3 border border-red-400">
                <div 
                  className="bg-gradient-to-r from-red-500 to-red-400 h-3 rounded-full transition-all duration-300 shadow-sm"
                  style={{ width: `${(gameState.player.hp / gameState.player.maxHp) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Gems Card */}
          <div className="relative bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-2xl p-6 text-center border-2 border-blue-400 shadow-lg shadow-blue-500/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
              <Gem className="w-full h-full text-blue-400" />
            </div>
            <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-blue-400" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-blue-400" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-3">
                <Gem className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{gameState.player.gems}</div>
              <div className="text-blue-300 font-semibold">Gems</div>
            </div>
          </div>

          {/* XP Card */}
          <div className="relative bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 rounded-2xl p-6 text-center border-2 border-yellow-400 shadow-lg shadow-yellow-500/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
              <Trophy className="w-full h-full text-yellow-400" />
            </div>
            <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-yellow-400" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-yellow-400" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-3">
                <Trophy className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{gameState.player.xp}</div>
              <div className="text-yellow-300 font-semibold">Experience</div>
            </div>
          </div>
        </motion.div>

        {/* Quick Links - Anime Style Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation(link.href)}
              className={`cursor-pointer relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border-2 ${link.accentColor} shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden`}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <Image src={link.bgImage} alt="" fill className="object-contain" />
              </div>
              
              {/* Manga corners */}
              <div className="absolute top-2 left-2 w-8 h-8 border-l-3 border-t-3 border-current opacity-60" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-r-3 border-b-3 border-current opacity-60" />
              
              {/* Action lines on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-current to-transparent transform -rotate-12" />
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-current to-transparent transform rotate-12" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 border border-current/20">
                    <link.icon className="w-7 h-7 text-current" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-manga font-bold text-white group-hover:text-current transition-colors duration-300">
                      {link.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {link.description}
                </p>
                
                {/* Speech bubble tail */}
                <div className="absolute -bottom-2 left-8 w-4 h-4 bg-current rotate-45 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Activity - Anime Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-manga font-bold text-white mb-6 flex items-center">
            <span className="mr-3">Recent Activity</span>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-avalanche-red to-transparent" />
          </h2>
          
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-gray-600 shadow-lg overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
              <Image src="/WebsiteAssets/NewsLogo.png" alt="" fill className="object-contain" />
            </div>
            
            <div className="relative z-10 space-y-4">
              {[
                { icon: Sword, title: 'Quest Completed', desc: 'Chapter 1: The Awakening', reward: '+50 XP', color: 'green' },
                { icon: Target, title: 'Training Session', desc: 'Typing Speed: 65 WPM', reward: '+25 XP', color: 'blue' },
                { icon: Gem, title: 'Daily Login Bonus', desc: 'Welcome back reward', reward: '+10 Gems', color: 'purple' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-4 border-b border-gray-700 last:border-b-0">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-xl bg-${activity.color}-500/20 border border-${activity.color}-400/30 flex items-center justify-center mr-4`}>
                      <activity.icon className={`w-6 h-6 text-${activity.color}-400`} />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{activity.title}</div>
                      <div className="text-gray-400 text-sm">{activity.desc}</div>
                    </div>
                  </div>
                  <div className={`text-${activity.color}-400 font-bold px-3 py-1 rounded-full bg-${activity.color}-500/10 border border-${activity.color}-400/20`}>
                    {activity.reward}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}