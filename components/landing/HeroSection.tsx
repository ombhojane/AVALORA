'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  const handleEnterQuest = () => {
    router.push('/auth')
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/VideoAssets/MainHeroVideo.mp4" type="video/mp4" />
      </video>

      {/* Seamless blend overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80 z-10" />


      {/* Content */}
      <div className="relative z-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Main Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="mb-8"
          >
            <Image
              src="/LogoAssets/MainLogoWithoutBG-Photoroom.png"
              alt="AVALORA Logo"
              width={250}
              height={150}
              className="mx-auto drop-shadow-2xl logo-transparent"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(232, 65, 66, 0.5))',
                background: 'transparent',
                mixBlendMode: 'normal'
              }}
              priority
            />
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-8 text-white drop-shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <span className="text-avalanche-red font-manga">Shiro no Kizuna</span> – Bonds of the White Snow
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Embark on an epic anime adventure through the Avalanche realm.
            Battle enemies, master typing challenges, and earn your place among legends.
          </motion.p>

          <motion.button
            onClick={handleEnterQuest}
            className="bg-gradient-to-r from-avalanche-red to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 manga-border relative overflow-hidden mb-16"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <span className="relative z-10">Enter the REALM</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>

      {/* Seamless bottom blend */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-15" />
    </section>
  )
}