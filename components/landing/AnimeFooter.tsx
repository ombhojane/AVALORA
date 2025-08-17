'use client'

import { motion } from 'framer-motion'
import { Heart, Snowflake } from 'lucide-react'
import Link from 'next/link'

export function AnimeFooter() {
  return (
    <footer 
      className="relative overflow-hidden"
      style={{
        backgroundImage: 'url(/ImageAssets/RedSky.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-90" />
      
      {/* Anime-style floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={`footer-particle-${i}`}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <Snowflake className="w-3 h-3 text-blue-300 opacity-20" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <div className="relative w-16 h-16 mr-4">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-xl rotate-12" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl -rotate-12" />
                <div className="absolute inset-2 bg-black rounded-lg flex items-center justify-center">
                  <Snowflake className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-manga font-bold text-white">AVALORA</h3>
                <p className="text-avalanche-red font-semibold">Eternal Winter Realm</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Embark on the ultimate anime-inspired Web3 adventure. Master blockchain technology, 
              compete with warriors worldwide, and forge your legend in the eternal winter of AVALORA.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold text-white mb-6">Quick Access</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/quest" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Quests
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Training
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Profile
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Legal & Support */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold text-white mb-6">Legal & Support</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Support
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-8"
        >
          <div className="text-gray-400 text-sm mb-4 md:mb-0 flex items-center">
            © 2025 AVALORA. All rights reserved. Built with{' '}
            <Heart className="w-4 h-4 mx-1 text-red-400 animate-pulse" />{' '}
            on Avalanche
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>Powered by</span>
            <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-full border border-red-400/30">
              <Snowflake className="w-4 h-4 text-red-400" />
              <span className="text-white font-semibold">Avalanche</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}