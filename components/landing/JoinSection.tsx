'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export function JoinSection() {
  const router = useRouter()

  const handleJoinNow = () => {
    router.push('/auth')
  }

  return (
    <section
      className="section-blend min-h-screen flex items-center relative"
      style={{
        backgroundImage: 'url(/ImageAssets/GirlHitting.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-75" />



      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-6xl font-manga font-bold mb-6 text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join the <span className="smoky-text">Adventure</span>
          </motion.h2>

          <motion.p
            className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            The Avalanche realm awaits your arrival. Will you answer the call and become
            the hero this world desperately needs?
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={handleJoinNow}
              className="bg-gradient-to-r from-avalanche-red to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-12 rounded-full text-xl transition-all duration-300 manga-border relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Start Your Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            <motion.button
              onClick={() => router.push('/auth?mode=wallet')}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold py-4 px-12 rounded-full text-xl transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Connect Wallet</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>

          {/* Stats showcase */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="text-center manga-border bg-black bg-opacity-80 backdrop-blur-sm p-6 border-2 border-avalanche-red"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl font-bold text-avalanche-red mb-3 drop-shadow-lg">1000+</div>
              <div className="text-white font-semibold text-lg mb-2">Active Warriors</div>
              <div className="text-gray-300 text-sm">Ready for battle</div>
            </motion.div>

            <motion.div
              className="text-center manga-border bg-black bg-opacity-80 backdrop-blur-sm p-6 border-2 border-avalanche-red"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl font-bold text-avalanche-red mb-3 drop-shadow-lg">50+</div>
              <div className="text-white font-semibold text-lg mb-2">Epic Chapters</div>
              <div className="text-gray-300 text-sm">Stories to explore</div>
            </motion.div>

            <motion.div
              className="text-center manga-border bg-black bg-opacity-80 backdrop-blur-sm p-6 border-2 border-avalanche-red"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl font-bold text-avalanche-red mb-3 drop-shadow-lg">∞</div>
              <div className="text-white font-semibold text-lg mb-2">Adventures</div>
              <div className="text-gray-300 text-sm">Limitless possibilities</div>
            </motion.div>
          </motion.div>

          {/* Character group finale */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
            viewport={{ once: true }}
          >
            <div className="manga-border bg-black bg-opacity-80 backdrop-blur-sm p-8 max-w-4xl mx-auto border-2 border-avalanche-red">
              <Image
                src="/Artworks-Characters/GroupChractersArtwork2.png"
                alt="United Heroes"
                width={800}
                height={300}
                className="w-full h-auto rounded-lg mb-6"
              />
              <p className="text-xl text-white italic mb-4 drop-shadow-lg">
                "When heroes unite, even the darkest forces cannot prevail. Join us, and become part of the legend."
              </p>
              <p className="text-avalanche-red font-bold text-lg drop-shadow-lg">- The Guardians of AVALORA</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}