'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '@/app/providers'
import SimpleNav from '@/components/navigation/SimpleNav'
import { ShoppingBag, Gem, Star, Filter, Sparkles } from 'lucide-react'
import Image from 'next/image'

interface MarketplaceItem {
  id: number
  name: string
  description: string
  price: number
  category: 'avatar' | 'weapon' | 'accessory' | 'background'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  image: string
}

const marketplaceItems: MarketplaceItem[] = [
  {
    id: 1,
    name: 'AVAXIM Emperor',
    description: 'The legendary Emperor of AVALAND avatar with supreme power.',
    price: 500,
    category: 'avatar',
    rarity: 'legendary',
    image: '/Artworks-Characters/AVAXIM - EMPEROR OF AVALAND.png'
  },
  {
    id: 2,
    name: 'AVALANCH Ambassador',
    description: 'The trusted ambassador avatar with Web3 mastery.',
    price: 350,
    category: 'avatar',
    rarity: 'epic',
    image: '/Artworks-Characters/AVALANCH.png'
  },
  {
    id: 3,
    name: 'Cutter Blade Master',
    description: 'Lightning-fast warrior avatar with precision strikes.',
    price: 250,
    category: 'avatar',
    rarity: 'epic',
    image: '/Artworks-Characters/Cutter.png'
  },
  {
    id: 4,
    name: 'Ghosty Phantom',
    description: 'Mysterious phantom hacker avatar with stealth abilities.',
    price: 200,
    category: 'avatar',
    rarity: 'rare',
    image: '/Artworks-Characters/Ghosty.png'
  },
  {
    id: 5,
    name: 'Golden Snake Guardian',
    description: 'Ancient crypto guardian with golden wisdom.',
    price: 300,
    category: 'avatar',
    rarity: 'epic',
    image: '/Artworks-Characters/GoldenSnake.png'
  },
  {
    id: 6,
    name: 'Panda Gold Fortune',
    description: 'Mystical fortune keeper bringing prosperity.',
    price: 150,
    category: 'avatar',
    rarity: 'rare',
    image: '/Artworks-Characters/PandaGold.png'
  }
]

const rarityColors = {
  common: 'border-gray-400 shadow-gray-500/20',
  rare: 'border-blue-400 shadow-blue-500/20',
  epic: 'border-purple-400 shadow-purple-500/20',
  legendary: 'border-yellow-400 shadow-yellow-500/20'
}

const rarityBadges = {
  common: 'bg-gray-500/20 text-gray-300 border-gray-400',
  rare: 'bg-blue-500/20 text-blue-300 border-blue-400',
  epic: 'bg-purple-500/20 text-purple-300 border-purple-400',
  legendary: 'bg-yellow-500/20 text-yellow-300 border-yellow-400'
}

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedRarity, setSelectedRarity] = useState<string>('all')
  const [purchasedItems, setPurchasedItems] = useState<number[]>([])
  
  const { gameState, updateGameState } = useGame()

  const filteredItems = marketplaceItems.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory
    const rarityMatch = selectedRarity === 'all' || item.rarity === selectedRarity
    return categoryMatch && rarityMatch
  })

  const handlePurchase = (item: MarketplaceItem) => {
    if (gameState.player.gems >= item.price && !purchasedItems.includes(item.id)) {
      updateGameState({
        player: {
          ...gameState.player,
          gems: gameState.player.gems - item.price
        }
      })
      setPurchasedItems([...purchasedItems, item.id])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23E84142' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <SimpleNav currentPage="Marketplace" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-manga font-bold text-white mb-4">
            <span className="smoky-text">Marketplace</span>
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Trade legendary avatars and rare items with gems
          </p>
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400 rounded-full px-6 py-3">
              <Gem className="w-6 h-6 text-blue-400 mr-2 inline" />
              <span className="text-2xl font-bold text-white">{gameState.player.gems} Gems</span>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 mb-8 border-2 border-gray-600 shadow-lg"
        >
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 text-avalanche-red mr-2" />
            <h3 className="text-xl font-bold text-white">Filters</h3>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-avalanche-red to-transparent ml-4" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-semibold mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white focus:border-avalanche-red focus:outline-none transition-colors"
              >
                <option value="all">All Categories</option>
                <option value="avatar">Avatars</option>
                <option value="weapon">Weapons</option>
                <option value="accessory">Accessories</option>
                <option value="background">Backgrounds</option>
              </select>
            </div>
            
            <div>
              <label className="block text-white font-semibold mb-2">Rarity</label>
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="w-full p-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white focus:border-avalanche-red focus:outline-none transition-colors"
              >
                <option value="all">All Rarities</option>
                <option value="common">Common</option>
                <option value="rare">Rare</option>
                <option value="epic">Epic</option>
                <option value="legendary">Legendary</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 ${rarityColors[item.rarity]} shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden`}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <Sparkles className="w-full h-full text-current" />
              </div>
              
              {/* Manga corners */}
              <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-current opacity-60" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-current opacity-60" />
              
              {/* Rarity badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold border ${rarityBadges[item.rarity]}`}>
                {item.rarity.toUpperCase()}
              </div>
              
              <div className="relative mb-4">
                <div className="w-full h-48 rounded-xl overflow-hidden border-2 border-current/20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-manga font-bold text-white mb-2 group-hover:text-current transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-blue-500/20 border border-blue-400/30 rounded-full px-3 py-2">
                    <Gem className="w-4 h-4 text-blue-400 mr-1" />
                    <span className="text-white font-bold">{item.price}</span>
                  </div>
                  
                  {purchasedItems.includes(item.id) ? (
                    <div className="bg-green-500/20 border border-green-400 text-green-300 px-4 py-2 rounded-full font-semibold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Owned
                    </div>
                  ) : (
                    <motion.button
                      onClick={() => handlePurchase(item)}
                      disabled={gameState.player.gems < item.price}
                      className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 flex items-center ${
                        gameState.player.gems >= item.price
                          ? 'bg-gradient-to-r from-avalanche-red to-red-600 hover:from-red-600 hover:to-red-700 text-white border border-red-400 shadow-lg hover:shadow-red-500/20'
                          : 'bg-gray-600/20 border border-gray-500 text-gray-400 cursor-not-allowed'
                      }`}
                      whileHover={gameState.player.gems >= item.price ? { scale: 1.05 } : {}}
                      whileTap={gameState.player.gems >= item.price ? { scale: 0.95 } : {}}
                    >
                      <ShoppingBag className="w-4 h-4 mr-1" />
                      Buy
                    </motion.button>
                  )}
                </div>
              </div>
              
              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border-2 border-gray-600 max-w-md mx-auto">
              <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-400">No items found matching your filters.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}