'use client'

import { motion } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import { ArrowLeft, Home, Sword, Target, ShoppingBag, Trophy, User, BookOpen, Zap } from 'lucide-react'

interface DashboardNavProps {
  currentPage?: string
}

export default function DashboardNav({ currentPage }: DashboardNavProps) {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard', color: 'text-blue-400' },
    { icon: Sword, label: 'Quests', href: '/quest', color: 'text-red-400' },
    { icon: Target, label: 'Training', href: '/training', color: 'text-green-400' },
    { icon: ShoppingBag, label: 'Marketplace', href: '/marketplace', color: 'text-purple-400' },
    { icon: Trophy, label: 'Leaderboard', href: '/leaderboard', color: 'text-yellow-400' },
    { icon: User, label: 'Profile', href: '/profile', color: 'text-pink-400' },
    { icon: BookOpen, label: 'Codex', href: '/codex', color: 'text-indigo-400' }
  ]

  const isActive = (href: string) => pathname === href

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-40 bg-gradient-to-r from-gray-800/95 to-gray-900/95 backdrop-blur-lg border-b-2 border-gray-600 shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Back/Home Button */}
          <motion.button
            onClick={() => router.push('/dashboard')}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl border-2 border-gray-600 hover:border-gray-500 text-white transition-all duration-300 group"
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            <span className="font-semibold">Arsenal</span>
          </motion.button>

          {/* Current Page Indicator */}
          {currentPage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-avalanche-red/20 to-red-600/20 rounded-xl border-2 border-avalanche-red/50"
            >
              <Zap className="w-6 h-6 text-avalanche-red mr-3 animate-pulse" />
              <div>
                <div className="text-white font-bold text-lg">{currentPage}</div>
                <div className="text-gray-300 text-sm">Current Location</div>
              </div>
            </motion.div>
          )}

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={`relative p-3 rounded-xl border-2 transition-all duration-300 group ${
                  isActive(item.href)
                    ? 'bg-gradient-to-br from-gray-700 to-gray-800 border-avalanche-red text-white shadow-lg shadow-red-500/20'
                    : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                title={item.label}
              >
                {/* Anime glow effect for active item */}
                {isActive(item.href) && (
                  <div className="absolute inset-0 bg-avalanche-red/20 rounded-xl animate-pulse" />
                )}
                
                {/* Action lines on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-current to-transparent transform -rotate-12" />
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-current to-transparent transform rotate-12" />
                </div>
                
                <item.icon className={`w-6 h-6 relative z-10 ${isActive(item.href) ? 'text-avalanche-red' : item.color} group-hover:animate-pulse`} />
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                  {item.label}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}