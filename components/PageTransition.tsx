'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

const smokeVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    scale: 1.1,
    filter: 'blur(5px)',
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const overlayVariants = {
  initial: {
    scaleX: 0,
    originX: 0,
  },
  animate: {
    scaleX: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    scaleX: 0,
    originX: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 800)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          variants={smokeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Anime-style transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <>
            {/* Red smoke overlay */}
            <motion.div
              variants={overlayVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 z-[9999] bg-gradient-to-r from-red-900 via-red-600 to-red-900"
              style={{
                background: `
                  radial-gradient(circle at 30% 50%, rgba(232, 65, 66, 0.8) 0%, transparent 50%),
                  radial-gradient(circle at 70% 50%, rgba(255, 0, 0, 0.6) 0%, transparent 50%),
                  linear-gradient(45deg, rgba(0, 0, 0, 0.9), rgba(232, 65, 66, 0.7), rgba(0, 0, 0, 0.9))
                `
              }}
            />

            {/* Animated particles */}
            <div className="fixed inset-0 z-[10000] pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  initial={{
                    x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1920,
                    y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1080,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1920,
                    y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1080,
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.05,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Glitch effect lines */}
            <motion.div
              className="fixed inset-0 z-[10001] pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.3, repeat: 2 }}
            >
              <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-white opacity-80" />
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-400 opacity-60" />
              <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-white opacity-80" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}