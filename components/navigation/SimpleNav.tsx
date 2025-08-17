'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Home } from 'lucide-react'

interface SimpleNavProps {
  currentPage?: string
}

export default function SimpleNav({ currentPage }: SimpleNavProps) {
  const router = useRouter()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-40 bg-black/80 backdrop-blur-sm border-b border-gray-800"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Back to Dashboard Button */}
          <motion.button
            onClick={() => router.push('/dashboard')}
            className="flex items-center px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-700 hover:border-gray-600 text-white transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <Home className="w-4 h-4 mr-2" />
            <span className="font-medium">Dashboard</span>
          </motion.button>

          {/* Current Page Indicator */}
          {currentPage && (
            <div className="text-white font-semibold">
              {currentPage}
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  )
}