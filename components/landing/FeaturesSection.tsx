'use client'

import { motion } from 'framer-motion'
import { Sword, Target, ShoppingBag, Trophy, User, BookOpen } from 'lucide-react'

const features = [
  {
    icon: Sword,
    title: '伝説の冒険',
    subtitle: 'Epic Quests',
    description: 'Journey through comic-style story chapters filled with adventure and mystery in the eternal winter realm.',
    color: 'from-red-500 to-red-700',
    bgImage: '/WebsiteAssets/MiniSword.png',
    accent: 'border-red-400 shadow-red-500/30'
  },
  {
    icon: Target,
    title: '修行道場',
    subtitle: 'Training Dojo',
    description: 'Master your combat skills and learn Web3 concepts through engaging challenges and battles.',
    color: 'from-blue-500 to-blue-700',
    bgImage: '/WebsiteAssets/MiniFlash.png',
    accent: 'border-blue-400 shadow-blue-500/30'
  },
  {
    icon: ShoppingBag,
    title: '商人の市場',
    subtitle: 'Mystic Marketplace',
    description: 'Trade legendary items, avatars, and rare artifacts with warriors using precious gems.',
    color: 'from-green-500 to-green-700',
    bgImage: '/WebsiteAssets/CrystalGroup.png',
    accent: 'border-green-400 shadow-green-500/30'
  },
  {
    icon: Trophy,
    title: '栄光の階級',
    subtitle: 'Honor Rankings',
    description: 'Compete with warriors worldwide and climb the ranks to become a legendary champion.',
    color: 'from-yellow-500 to-yellow-700',
    bgImage: '/BadgeAssets/SpartanAttack.png',
    accent: 'border-yellow-400 shadow-yellow-500/30'
  },
  {
    icon: User,
    title: '戦士の姿',
    subtitle: 'Warrior Identity',
    description: 'Forge your unique identity with legendary outfits, mystical skins, and powerful accessories.',
    color: 'from-purple-500 to-purple-700',
    bgImage: '/WebsiteAssets/UnknownNamePlateCard.png',
    accent: 'border-purple-400 shadow-purple-500/30'
  },
  {
    icon: BookOpen,
    title: '知識の書',
    subtitle: 'Blockchain Codex',
    description: 'Unlock the secrets of Avalanche blockchain and cryptocurrency through ancient wisdom.',
    color: 'from-indigo-500 to-indigo-700',
    bgImage: '/WebsiteAssets/KeysandLock.png',
    accent: 'border-indigo-400 shadow-indigo-500/30'
  }
]

export function FeaturesSection() {
  return (
    <section 
      className="section-blend min-h-screen py-20 relative"
      style={{
        backgroundImage: 'url(/ImageAssets/CyberLines.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-85" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-manga font-bold mb-6 text-white">
            Game <span className="smoky-text">Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the rich gameplay mechanics that make AVALORA an unforgettable adventure
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.03, 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className={`relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-2xl p-8 border-2 ${feature.accent} shadow-2xl hover:shadow-3xl transition-all duration-500 group overflow-hidden`}
            >
              {/* Background decoration image */}
              <div className="absolute top-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <img src={feature.bgImage} alt="" className="w-full h-full object-contain" />
              </div>

              {/* Manga-style corner decorations */}
              <div className="absolute top-3 left-3 w-8 h-8 border-l-3 border-t-3 border-current opacity-60" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-r-3 border-b-3 border-current opacity-60" />

              {/* Anime glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500 rounded-2xl`} />
              
              {/* Speed lines effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-current to-transparent transform -rotate-12" />
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-current to-transparent transform rotate-12" />
              </div>
              
              <div className="relative z-10">
                {/* Icon with anime-style background */}
                <div className="flex justify-center mb-6">
                  <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-white/20`}>
                    <feature.icon className="w-10 h-10 text-white drop-shadow-lg" />
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                
                {/* Dual language titles */}
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-manga font-bold text-white mb-1 group-hover:text-current transition-colors duration-300">
                    {feature.subtitle}
                  </h3>
                  <div className="text-sm text-gray-400 font-semibold mb-1">
                    {feature.title}
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed text-sm text-center group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Manga speech bubble tail */}
                <div className="absolute -bottom-2 left-8 w-4 h-4 bg-current rotate-45 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="manga-border bg-black bg-opacity-70 backdrop-blur-sm p-8 max-w-2xl mx-auto relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-manga font-bold mb-4 text-white">
                Ready to Begin Your <span className="text-avalanche-red">Legend</span>?
              </h3>
              <p className="text-gray-300 text-lg mb-6">
                Master these features and become the ultimate warrior of AVALORA. 
                Your journey to greatness starts with a single step.
              </p>
              
              <div className="flex justify-center space-x-4">
                <div className="bg-avalanche-red bg-opacity-30 px-6 py-3 rounded-full border border-avalanche-red">
                  <span className="text-white font-bold text-base drop-shadow-lg">6 Core Features</span>
                </div>
                <div className="bg-blue-500 bg-opacity-30 px-6 py-3 rounded-full border border-blue-400">
                  <span className="text-white font-bold text-base drop-shadow-lg">Endless Adventures</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}