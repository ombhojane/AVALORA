'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const characters = [
  {
    src: '/Artworks-Characters/AVAXIM - EMPEROR OF AVALAND.png',
    title: 'AVAXIM - Emperor of AVALAND',
    description: 'The supreme ruler of the digital realm, AVAXIM commands unmatched power over the Avalanche network. His mastery of blockchain protocols and ancient wisdom makes him the ultimate authority in AVALORA.',
    role: 'Supreme Emperor',
    element: 'Lightning'
  },
  {
    src: '/Artworks-Characters/AVALANCH.png',
    title: 'AVALANCH - Ambassador of AVALORA',
    description: 'The trusted ambassador who guides warriors through their journey. AVALANCH possesses deep knowledge of Web3 technologies and serves as the bridge between the mortal and digital realms.',
    role: 'Ambassador',
    element: 'Ice'
  },
  {
    src: '/Artworks-Characters/Cutter.png',
    title: 'Cutter - The Blade Master',
    description: 'A legendary warrior whose typing speed cuts through any challenge like a razor-sharp blade. Cutter specializes in precision strikes and lightning-fast combat techniques.',
    role: 'Blade Master',
    element: 'Steel'
  },
  {
    src: '/Artworks-Characters/Ghosty.png',
    title: 'Ghosty - The Phantom Hacker',
    description: 'A mysterious entity that phases between the digital and physical realms. Ghosty excels in stealth operations and possesses unparalleled knowledge of blockchain security.',
    role: 'Phantom Hacker',
    element: 'Shadow'
  }
]

export function ArtworkSection() {
  return (
    <section 
      className="section-blend min-h-screen py-20 relative"
      style={{
        backgroundImage: 'url(/ImageAssets/Tree.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-80" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-manga font-bold mb-6 text-white">
            Meet the <span className="smoky-text">Legendary Characters</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the heroes, guardians, and legends that inhabit the mystical Avalanche realm
          </p>
        </motion.div>

        <div className="space-y-20">
          {characters.map((character, index) => (
            <motion.div
              key={character.title}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
            >
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="manga-border p-6 bg-black bg-opacity-60 backdrop-blur-sm relative overflow-hidden group">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={character.src}
                      alt={character.title}
                      width={400}
                      height={500}
                      className="w-full h-auto rounded-lg group-hover:shadow-2xl transition-shadow duration-300"
                    />
                  </motion.div>
                  
                  {/* Character stats overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-80 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-avalanche-red font-bold text-sm">{character.role}</p>
                        <p className="text-gray-400 text-xs">Element: {character.element}</p>
                      </div>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-yellow-400 rounded-full" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="bg-black bg-opacity-70 backdrop-blur-sm p-8 rounded-2xl border border-avalanche-red relative overflow-hidden">
                  <div className="relative z-10">
                    <motion.h3 
                      className="text-3xl font-manga font-bold mb-4 text-avalanche-red"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      viewport={{ once: true }}
                    >
                      {character.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-lg text-gray-300 leading-relaxed mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                      viewport={{ once: true }}
                    >
                      {character.description}
                    </motion.p>
                    
                    <motion.div
                      className="flex items-center space-x-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="bg-avalanche-red bg-opacity-20 px-4 py-2 rounded-full">
                        <span className="text-avalanche-red font-bold text-sm">{character.role}</span>
                      </div>
                      <div className="bg-blue-500 bg-opacity-20 px-4 py-2 rounded-full">
                        <span className="text-blue-400 font-bold text-sm">{character.element}</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Group artwork showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-manga font-bold mb-8 text-white">
            The <span className="text-avalanche-red">United Alliance</span>
          </h3>
          <div className="manga-border p-8 bg-black bg-opacity-60 backdrop-blur-sm">
            <Image
              src="/Artworks-Characters/GroupofCharactersArtwork.png"
              alt="Group of Characters"
              width={800}
              height={400}
              className="w-full h-auto rounded-lg"
            />
            <p className="text-gray-300 mt-6 text-lg">
              When the realm faces its greatest threats, these legendary warriors unite as one. 
              Their combined power and wisdom form an unbreakable bond that protects AVALORA from all evil.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}