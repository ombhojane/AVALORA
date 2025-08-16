'use client'

import { motion } from 'framer-motion'
import { Sword, Target, ShoppingBag, Trophy, User, BookOpen } from 'lucide-react'

const features = [
  {
    icon: Sword,
    title: 'Epic Quests',
    description: 'Journey through comic-style story chapters filled with adventure and mystery.',
    color: 'from-red-500 to-red-700'
  },
  {
    icon: Target,
    title: 'Training Grounds',
    description: 'Master your typing skills and learn Web3 concepts through engaging challenges.',
    color: 'from-blue-500 to-blue-700'
  },
  {
    icon: ShoppingBag,
    title: 'Marketplace',
    description: 'Trade cosmetics, avatars, and rare items with other players using gems.',
    color: 'from-green-500 to-green-700'
  },
  {
    icon: Trophy,
    title: 'Leaderboards',
    description: 'Compete with players worldwide and climb the ranks to become a legend.',
    color: 'from-yellow-500 to-yellow-700'
  },
  {
    icon: User,
    title: 'Character Customization',
    description: 'Personalize your avatar with unique outfits, skins, and accessories.',
    color: 'from-purple-500 to-purple-700'
  },
  {
    icon: BookOpen,
    title: 'Web3 Learning',
    description: 'Earn while you learn about Avalanche blockchain and cryptocurrency.',
    color: 'from-indigo-500 to-indigo-700'
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
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="manga-border bg-black bg-opacity-70 backdrop-blur-sm p-8 hover:bg-opacity-80 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Manga-style corner decoration */}
              <div className="absolute top-2 left-2 w-8 h-8 border-l-4 border-t-4 border-avalanche-red opacity-60" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-r-4 border-b-4 border-avalanche-red opacity-60" />

              {/* Background glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10 text-center">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto shadow-lg`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-manga font-bold text-white mb-4 group-hover:text-avalanche-red transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed text-sm">
                  {feature.description}
                </p>

                {/* Manga-style action lines */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-avalanche-red to-transparent transform -rotate-12" />
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-avalanche-red to-transparent transform rotate-12" />
                </div>
              </div>

              {/* Manga-style speech bubble effect */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black rotate-45 opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
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