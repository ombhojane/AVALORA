'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '@/app/providers'
import SimpleNav from '@/components/navigation/SimpleNav'
import { BookOpen, Scroll, Zap, Shield, Snowflake, Crown, Sword, Gem, Star, Lock, ChevronRight, Play, Pause, RotateCcw, Trophy, Target } from 'lucide-react'
import Image from 'next/image'

interface CodexEntry {
  id: string
  title: string
  category: 'lore' | 'blockchain' | 'characters' | 'items' | 'quests'
  content: string
  unlocked: boolean
  image?: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  xpReward: number
}

const codexEntries: CodexEntry[] = [
  {
    id: 'avalora-realm',
    title: 'The Eternal Winter Realm',
    category: 'lore',
    content: 'AVALORA is a mystical realm trapped in eternal winter, where the boundaries between the digital and physical worlds blur. The realm is powered by the ancient Avalanche blockchain, which maintains the delicate balance between order and chaos.',
    unlocked: true,
    image: '/ImageAssets/RedSky.jpg',
    rarity: 'common',
    xpReward: 25
  },
  {
    id: 'emperor-avaxim',
    title: 'Emperor Avaxim',
    category: 'characters',
    content: 'The Unyielding Avalanche, ruler of AVALORA. Emperor Avaxim sits upon his throne of ice and fire, wielding the power of the blockchain to maintain order in the realm. His wisdom spans centuries, and his strength is legendary.',
    unlocked: true,
    image: '/Artworks-Characters/AVALANCH.png',
    rarity: 'legendary',
    xpReward: 100
  },
  {
    id: 'avalanche-blockchain',
    title: 'Avalanche Consensus',
    category: 'blockchain',
    content: 'The Avalanche consensus protocol is a revolutionary approach to blockchain consensus that achieves high throughput, low latency, and energy efficiency. It uses a novel voting mechanism where validators sample other validators to reach consensus.',
    unlocked: true,
    image: '/WebsiteAssets/CrystalGroup.png',
    rarity: 'epic',
    xpReward: 75
  },
  {
    id: 'gems-of-eternity',
    title: 'Gems of Eternity',
    category: 'items',
    content: 'Mystical crystals that power the AVALORA realm. These gems contain concentrated blockchain energy and can be used to enhance abilities, unlock new areas, and trade with other warriors.',
    unlocked: false,
    image: '/WebsiteAssets/CrystalGroup.png',
    rarity: 'rare',
    xpReward: 50
  },
  {
    id: 'crimson-quest',
    title: 'The Crimson Realm Quest',
    category: 'quests',
    content: 'The first major quest in AVALORA, where warriors must face the Meron Devil and prove their worth. This quest introduces the fundamental concepts of blockchain technology through engaging battles.',
    unlocked: false,
    image: '/VillainAssets/MeronDevil.jpg',
    rarity: 'epic',
    xpReward: 80
  },
  {
    id: 'subnets-explained',
    title: 'Avalanche Subnets',
    category: 'blockchain',
    content: 'Subnets are sovereign networks that define their own rules regarding membership and token economics. They benefit from Avalanche security while maintaining flexibility in governance and virtual machine choice.',
    unlocked: false,
    rarity: 'rare',
    xpReward: 60
  }
]

const categories = [
  { id: 'all', name: 'All Entries', icon: BookOpen, color: 'text-white' },
  { id: 'lore', name: 'Realm Lore', icon: Scroll, color: 'text-purple-400' },
  { id: 'blockchain', name: 'Blockchain Tech', icon: Zap, color: 'text-blue-400' },
  { id: 'characters', name: 'Characters', icon: Crown, color: 'text-yellow-400' },
  { id: 'items', name: 'Items & Artifacts', icon: Gem, color: 'text-green-400' },
  { id: 'quests', name: 'Quest Chronicles', icon: Sword, color: 'text-red-400' }
]

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'border-gray-400 text-gray-400'
    case 'rare': return 'border-blue-400 text-blue-400'
    case 'epic': return 'border-purple-400 text-purple-400'
    case 'legendary': return 'border-yellow-400 text-yellow-400'
    default: return 'border-gray-400 text-gray-400'
  }
}

export default function CodexPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedEntry, setSelectedEntry] = useState<CodexEntry | null>(null)
  const [unlockedEntries, setUnlockedEntries] = useState<string[]>(['avalora-realm', 'emperor-avaxim', 'avalanche-blockchain'])
  const [showReward, setShowReward] = useState(false)
  const [rewardData, setRewardData] = useState({ xp: 0 })
  const [readingProgress, setReadingProgress] = useState(0)
  const [isReading, setIsReading] = useState(false)

  const { gameState, updateGameState } = useGame()

  // Simulate reading progress
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isReading && selectedEntry && readingProgress < 100) {
      interval = setInterval(() => {
        setReadingProgress(prev => {
          const newProgress = prev + 2
          if (newProgress >= 100) {
            completeReading()
            return 100
          }
          return newProgress
        })
      }, 100)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isReading, selectedEntry, readingProgress])

  const filteredEntries = selectedCategory === 'all' 
    ? codexEntries 
    : codexEntries.filter(entry => entry.category === selectedCategory)

  const unlockEntry = (entryId: string) => {
    if (!unlockedEntries.includes(entryId)) {
      setUnlockedEntries(prev => [...prev, entryId])
      const entry = codexEntries.find(e => e.id === entryId)
      if (entry) {
        // Award XP for unlocking
        const updatedPlayer = {
          ...gameState.player,
          xp: gameState.player.xp + entry.xpReward
        }
        updateGameState({
          ...gameState,
          player: updatedPlayer
        })
        
        setRewardData({ xp: entry.xpReward })
        setShowReward(true)
        setTimeout(() => setShowReward(false), 3000)
      }
    }
  }

  const startReading = () => {
    setIsReading(true)
    setReadingProgress(0)
  }

  const pauseReading = () => {
    setIsReading(false)
  }

  const resetReading = () => {
    setIsReading(false)
    setReadingProgress(0)
  }

  const completeReading = () => {
    setIsReading(false)
    if (selectedEntry) {
      // Award additional XP for completing reading
      const bonusXP = Math.floor(selectedEntry.xpReward * 0.5)
      const updatedPlayer = {
        ...gameState.player,
        xp: gameState.player.xp + bonusXP
      }
      updateGameState({
        ...gameState,
        player: updatedPlayer
      })
      
      setRewardData({ xp: bonusXP })
      setShowReward(true)
      setTimeout(() => setShowReward(false), 3000)
    }
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: 'url(/ImageAssets/LinesTest.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-90" />
      
      {/* Anime floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`codex-particle-${i}`}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          >
            {i % 3 === 0 ? (
              <BookOpen className="w-4 h-4 text-purple-300 opacity-30" />
            ) : i % 3 === 1 ? (
              <Scroll className="w-3 h-3 text-blue-300 opacity-25" />
            ) : (
              <div className="w-2 h-2 bg-yellow-400 rounded-full opacity-40" />
            )}
          </div>
        ))}
      </div>

      {/* Reward Animation */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 text-center shadow-2xl border-4 border-yellow-300">
              <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Knowledge Gained!</h3>
              <div className="flex items-center justify-center">
                <Star className="w-6 h-6 text-white mr-2" />
                <span className="text-xl font-bold text-white">+{rewardData.xp} XP</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SimpleNav currentPage="Codex" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {!selectedEntry ? (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-6xl font-manga font-bold text-white mb-4">
                <span className="smoky-text">AVALORA CODEX</span>
              </h1>
              <p className="text-xl text-gray-300">
                Discover the secrets of the eternal winter realm
              </p>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-6 py-3 rounded-xl border-2 transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-gray-700 to-gray-800 border-avalanche-red text-white shadow-lg shadow-red-500/20'
                      : 'bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <category.icon className={`w-5 h-5 mr-2 ${selectedCategory === category.id ? 'text-avalanche-red' : category.color}`} />
                  {category.name}
                </motion.button>
              ))}
            </motion.div>

            {/* Entries Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEntries.map((entry, index) => {
                const isUnlocked = unlockedEntries.includes(entry.id)
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => isUnlocked ? setSelectedEntry(entry) : unlockEntry(entry.id)}
                    className={`relative cursor-pointer bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border-2 transition-all duration-300 group overflow-hidden ${
                      isUnlocked 
                        ? 'border-gray-600 hover:border-gray-400 shadow-lg hover:shadow-xl' 
                        : 'border-gray-700 opacity-75 hover:opacity-90'
                    }`}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    {/* Rarity indicator */}
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold border ${getRarityColor(entry.rarity)}`}>
                      {entry.rarity.toUpperCase()}
                    </div>

                    {/* Lock indicator */}
                    {!isUnlocked && (
                      <div className="absolute top-2 left-2">
                        <Lock className="w-6 h-6 text-gray-500" />
                      </div>
                    )}

                    {/* Entry image */}
                    {entry.image && (
                      <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={entry.image}
                          alt={entry.title}
                          fill
                          className={`object-cover transition-all duration-300 ${
                            isUnlocked ? 'group-hover:scale-110' : 'grayscale'
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className={`text-xl font-bold mb-2 ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                        {entry.title}
                      </h3>
                      <p className={`text-sm mb-4 line-clamp-3 ${isUnlocked ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isUnlocked ? entry.content : 'This entry is locked. Click to unlock and gain knowledge!'}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className={`w-4 h-4 mr-1 ${isUnlocked ? 'text-yellow-400' : 'text-gray-500'}`} />
                          <span className={`text-sm ${isUnlocked ? 'text-yellow-400' : 'text-gray-500'}`}>
                            +{entry.xpReward} XP
                          </span>
                        </div>
                        {isUnlocked && (
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                        )}
                      </div>
                    </div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent transform -rotate-12" />
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent transform rotate-12" />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </>
        ) : (
          /* Entry Detail View */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back button */}
            <motion.button
              onClick={() => {
                setSelectedEntry(null)
                resetReading()
              }}
              className="flex items-center mb-8 px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl border-2 border-gray-600 hover:border-gray-500 text-white transition-all duration-300"
              whileHover={{ scale: 1.05, x: -2 }}
            >
              ← Back to Codex
            </motion.button>

            {/* Entry content */}
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl p-8 border-2 border-gray-600 shadow-2xl backdrop-blur-sm">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{selectedEntry.title}</h1>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold border ${getRarityColor(selectedEntry.rarity)}`}>
                    {selectedEntry.rarity.toUpperCase()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-yellow-400 mb-2">
                    <Star className="w-5 h-5 mr-1" />
                    <span className="font-bold">+{selectedEntry.xpReward} XP</span>
                  </div>
                  <div className="text-gray-400 text-sm">Knowledge Reward</div>
                </div>
              </div>

              {/* Image */}
              {selectedEntry.image && (
                <div className="relative w-full h-64 mb-8 rounded-xl overflow-hidden">
                  <Image
                    src={selectedEntry.image}
                    alt={selectedEntry.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              )}

              {/* Reading Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">Reading Progress</span>
                  <span className="text-gray-400">{Math.round(readingProgress)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 border border-gray-600">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${readingProgress}%` }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-lg text-gray-300 leading-relaxed">
                  {selectedEntry.content}
                </p>
              </div>

              {/* Reading Controls */}
              <div className="flex justify-center space-x-4">
                {!isReading && readingProgress < 100 ? (
                  <motion.button
                    onClick={startReading}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    {readingProgress > 0 ? 'Continue Reading' : 'Start Reading'}
                  </motion.button>
                ) : isReading ? (
                  <motion.button
                    onClick={pauseReading}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold rounded-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Pause className="w-5 h-5 mr-2" />
                    Pause Reading
                  </motion.button>
                ) : (
                  <motion.div
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-xl"
                  >
                    <Trophy className="w-5 h-5 mr-2" />
                    Reading Complete!
                  </motion.div>
                )}

                {readingProgress > 0 && (
                  <motion.button
                    onClick={resetReading}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold rounded-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Reset
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}