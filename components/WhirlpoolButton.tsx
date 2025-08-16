'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export function WhirlpoolButton() {
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Don't show on landing page
  if (pathname === '/') return null

  const handleClick = () => {
    setIsAnimating(true)
    
    setTimeout(() => {
      router.push('/')
    }, 1000)

    setTimeout(() => {
      setIsAnimating(false)
    }, 1500)
  }

  return (
    <>
      <motion.button
        onClick={handleClick}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            fill="currentColor"
          />
          <path
            d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
            fill="currentColor"
          />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 20, rotate: 720 }}
            exit={{ scale: 0, rotate: 1080 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-red-600 to-red-800 rounded-full z-[100]"
            style={{ transformOrigin: 'center' }}
          />
        )}
      </AnimatePresence>
    </>
  )
}