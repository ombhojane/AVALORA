'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gem, Zap, AlertCircle, CheckCircle } from 'lucide-react'

interface BuyGemsDialogProps {
  isOpen: boolean
  onClose: () => void
  onPurchase: (avaxAmount: number, gemsAmount: number) => void
  currentGems: number
}

export default function BuyGemsDialog({ isOpen, onClose, onPurchase, currentGems }: BuyGemsDialogProps) {
  const [avaxAmount, setAvaxAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const GEMS_PER_AVAX = 10000
  const gemsAmount = avaxAmount ? parseFloat(avaxAmount) * GEMS_PER_AVAX : 0

  const handlePurchase = async () => {
    if (!avaxAmount || parseFloat(avaxAmount) <= 0) return
    
    setIsProcessing(true)
    
    // Simulate transaction processing
    setTimeout(() => {
      onPurchase(parseFloat(avaxAmount), gemsAmount)
      setIsProcessing(false)
      setShowSuccess(true)
      
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
        setAvaxAmount('')
      }, 2000)
    }, 2000)
  }

  const quickAmounts = [
    { avax: 0.1, gems: 1000 },
    { avax: 0.5, gems: 5000 },
    { avax: 1.0, gems: 10000 },
    { avax: 2.0, gems: 20000 }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-lg rounded-2xl p-8 border-2 border-blue-400/50 shadow-2xl shadow-blue-500/20 max-w-md w-full mx-4 overflow-hidden"
          >
            {/* Anime corner decorations */}
            <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-blue-400 opacity-60" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-blue-400 opacity-60" />
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-300" />
            </button>

            {/* Success State */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                >
                  <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Purchase Successful!</h3>
                    <p className="text-green-300">+{gemsAmount.toLocaleString()} Gems added to your account</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Gem className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-manga font-bold text-white mb-2">Buy Gems</h2>
              <p className="text-gray-400">Exchange AVAX for precious gems</p>
            </div>

            {/* Current Balance */}
            <div className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-xl p-4 mb-6 border border-gray-600">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Current Balance:</span>
                <div className="flex items-center">
                  <Gem className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-white font-bold text-lg">{currentGems.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Exchange Rate */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 mb-6 border border-blue-400/30">
              <div className="text-center">
                <div className="text-blue-300 font-semibold mb-1">Exchange Rate</div>
                <div className="text-2xl font-bold text-white">1 AVAX = 10,000 Gems</div>
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-3">Quick Select:</label>
              <div className="grid grid-cols-2 gap-3">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount.avax}
                    onClick={() => setAvaxAmount(amount.avax.toString())}
                    className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-blue-600 hover:to-purple-600 border border-gray-600 hover:border-blue-400 rounded-lg p-3 transition-all duration-300 group"
                  >
                    <div className="text-white font-bold">{amount.avax} AVAX</div>
                    <div className="text-gray-400 group-hover:text-blue-300 text-sm">{amount.gems.toLocaleString()} Gems</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Input */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">Custom Amount (AVAX):</label>
              <div className="relative">
                <input
                  type="number"
                  value={avaxAmount}
                  onChange={(e) => setAvaxAmount(e.target.value)}
                  placeholder="0.0"
                  step="0.01"
                  min="0"
                  className="w-full bg-gray-800 border-2 border-gray-600 focus:border-blue-400 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">
                  AVAX
                </div>
              </div>
              {gemsAmount > 0 && (
                <div className="mt-2 text-center">
                  <span className="text-gray-400">You will receive: </span>
                  <span className="text-blue-400 font-bold">{gemsAmount.toLocaleString()} Gems</span>
                </div>
              )}
            </div>

            {/* Warning */}
            <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-3 mb-6">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-yellow-300 text-sm">
                  <strong>Mock Transaction:</strong> This is a demonstration. No real AVAX will be charged.
                </div>
              </div>
            </div>

            {/* Purchase Button */}
            <button
              onClick={handlePurchase}
              disabled={!avaxAmount || parseFloat(avaxAmount) <= 0 || isProcessing}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Purchase Gems
                </>
              )}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}