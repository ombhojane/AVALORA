'use client'

import { motion } from 'framer-motion'
import { Gamepad2, BookOpen, Trophy, Gem } from 'lucide-react'

export function AboutSection() {
  return (
    <section 
      className="relative py-20 overflow-hidden scroll-section"
      style={{
        backgroundImage: 'url(/ImageAssets/SunsetLikeScene.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-85" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-manga font-bold text-white mb-6">
            About <span className="text-avalanche-red smoky-text">AVALORA</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Welcome to AVALORA, the ultimate anime-inspired Web3 gaming platform built on the Avalanche blockchain. 
              Experience the perfect fusion of entertainment and education as you embark on epic quests, master blockchain technology, 
              and compete with warriors from around the world.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Gamepad2,
              title: 'Epic Gaming',
              description: 'Immerse yourself in anime-style adventures with engaging mini-games and quests.',
              color: 'text-red-400'
            },
            {
              icon: BookOpen,
              title: 'Learn Web3',
              description: 'Master Avalanche blockchain technology through interactive lessons.',
              color: 'text-blue-400'
            },
            {
              icon: Trophy,
              title: 'Compete Globally',
              description: 'Compete with warriors worldwide and climb the leaderboards.',
              color: 'text-yellow-400'
            },
            {
              icon: Gem,
              title: 'Earn Rewards',
              description: 'Collect gems, gain XP, and unlock exclusive content.',
              color: 'text-purple-400'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-6 border-2 border-gray-600 hover:border-gray-400 transition-all duration-300 group"
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-current/20 ${feature.color}`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}