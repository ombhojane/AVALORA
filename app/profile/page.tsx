'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '@/app/providers'
import { User, Edit3, Save, Camera, Award, Gem, Heart, Zap, Wallet, Plus, Minus, Settings } from 'lucide-react'
import Image from 'next/image'

const achievements = [
  { id: 1, name: 'First Steps', description: 'Complete your first quest', icon: '🎯', unlocked: true },
  { id: 2, name: 'Speed Demon', description: 'Type at 60+ WPM', icon: '⚡', unlocked: true },
  { id: 3, name: 'Web3 Scholar', description: 'Complete 10 trivia challenges', icon: '🧠', unlocked: false },
  { id: 4, name: 'Gem Collector', description: 'Collect 1000 gems', icon: '💎', unlocked: false },
  { id: 5, name: 'Marketplace Master', description: 'Purchase 5 items', icon: '🛒', unlocked: false },
  { id: 6, name: 'Leaderboard Legend', description: 'Reach top 10', icon: '👑', unlocked: false }
]

const avatarOptions = [
  '/Artworks-Characters/AVAXIM - EMPEROR OF AVALAND.png',
  '/Artworks-Characters/AVALANCH.png',
  '/Artworks-Characters/Cutter.png',
  '/Artworks-Characters/Ghosty.png'
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('')
  const [walletBalance, setWalletBalance] = useState(12.45)
  
  const { gameState, updateGameState } = useGame()

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      updateGameState({
        player: {
          ...gameState.player,
          name: editedName || gameState.player.name,
          avatar: selectedAvatar || gameState.player.avatar
        }
      })
    } else {
      // Start editing
      setEditedName(gameState.player.name)
      setSelectedAvatar(gameState.player.avatar)
    }
    setIsEditing(!isEditing)
  }

  const unlockedAchievements = achievements.filter(a => a.unlocked)
  const totalAchievements = achievements.length

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: 'url(/ImageAssets/Tree.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-85" />
      
      {/* Anime-style floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating sakura petals */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`petal-${i}`}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          >
            <div className="w-3 h-3 bg-pink-300 rounded-full opacity-20 transform rotate-45" />
          </div>
        ))}
        
        {/* Floating sparkles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <div className="w-1 h-1 bg-yellow-300 rounded-full opacity-40" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-manga font-bold text-white mb-4">
            <span className="smoky-text">Player Profile</span>
          </h1>
          <p className="text-xl text-gray-300">
            Customize your character and manage your assets
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-purple-400 shadow-lg shadow-purple-500/20 relative overflow-hidden group">
              {/* Anime-style background pattern */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <Image src="/WebsiteAssets/AncientDesign.png" alt="" fill className="object-cover" />
              </div>
              
              {/* Manga corners with glow */}
              <div className="absolute top-2 left-2 w-8 h-8 border-l-3 border-t-3 border-purple-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-r-3 border-b-3 border-purple-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Anime speed lines on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent transform -rotate-12" />
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent transform rotate-12" />
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent transform -rotate-6" />
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent transform rotate-6" />
              </div>
              
              <div className="text-center mb-6 relative z-10">
                <div className="relative inline-block">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-400 shadow-lg relative group">
                    <Image
                      src={isEditing ? selectedAvatar : gameState.player.avatar}
                      alt="Player Avatar"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Anime-style glow ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-purple-300 opacity-0 group-hover:opacity-50 animate-pulse" />
                    <div className="absolute inset-2 rounded-full border border-white opacity-0 group-hover:opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-purple-500 rounded-full p-2 hover:bg-purple-600 transition-colors shadow-lg">
                      <Camera className="w-4 h-4 text-white" />
                    </button>
                  )}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="text-2xl font-bold text-white bg-gray-700 border-2 border-purple-400 rounded-lg px-3 py-1 text-center focus:border-purple-300 focus:outline-none transition-colors"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-white mb-2">{gameState.player.name}</h2>
                )}
                
                <p className="text-purple-300 font-semibold">Level {gameState.player.level} Warrior</p>
              </div>

              {/* Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-400/30 rounded-xl">
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 text-red-400 mr-2" />
                    <span className="text-white">Health</span>
                  </div>
                  <span className="text-white font-bold">{gameState.player.hp}/{gameState.player.maxHp}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-400/30 rounded-xl">
                  <div className="flex items-center">
                    <Gem className="w-5 h-5 text-blue-400 mr-2" />
                    <span className="text-white">Gems</span>
                  </div>
                  <span className="text-white font-bold">{gameState.player.gems}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-400/30 rounded-xl">
                  <div className="flex items-center">
                    <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                    <span className="text-white">Experience</span>
                  </div>
                  <span className="text-white font-bold">{gameState.player.xp}</span>
                </div>
              </div>

              <motion.button
                onClick={handleEditToggle}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isEditing ? (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit3 className="w-5 h-5 mr-2" />
                    Edit Profile
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Middle Column - Achievements & Avatar Selection */}
          <div className="lg:col-span-1 space-y-8">
            {/* Avatar Selection (only show when editing) */}
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-blue-400 shadow-lg shadow-blue-500/20 relative overflow-hidden"
              >
                <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-blue-400 opacity-60" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-blue-400 opacity-60" />
                
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <User className="w-6 h-6 mr-2 text-blue-400" />
                  Choose Avatar
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {avatarOptions.map((avatar, index) => (
                    <motion.div
                      key={index}
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`cursor-pointer rounded-xl overflow-hidden border-3 transition-all duration-300 ${
                        selectedAvatar === avatar
                          ? 'border-blue-400 scale-105 shadow-lg shadow-blue-500/20'
                          : 'border-gray-600 hover:border-gray-400'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={avatar}
                        alt={`Avatar ${index + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-24 object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-yellow-400 shadow-lg shadow-yellow-500/20 relative overflow-hidden"
            >
              <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-yellow-400 opacity-60" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-yellow-400 opacity-60" />
              
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <Award className="w-6 h-6 mr-2 text-yellow-400" />
                  Achievements
                </h3>
                <div className="text-yellow-300 font-semibold">
                  {unlockedAchievements.length}/{totalAchievements}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      achievement.unlocked
                        ? 'border-green-400 bg-green-500/10 shadow-green-500/20'
                        : 'border-gray-600 bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-3">{achievement.icon}</span>
                      <h4 className={`font-bold ${
                        achievement.unlocked ? 'text-green-300' : 'text-gray-400'
                      }`}>
                        {achievement.name}
                      </h4>
                    </div>
                    <p className={`text-sm ${
                      achievement.unlocked ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {achievement.description}
                    </p>
                    {achievement.unlocked && (
                      <div className="mt-2">
                        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-semibold">
                          UNLOCKED
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Wallet & Funds */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 space-y-8"
          >
            {/* Wallet Panel */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-green-400 shadow-lg shadow-green-500/20 relative overflow-hidden">
              <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-green-400 opacity-60" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-green-400 opacity-60" />
              
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <Wallet className="w-6 h-6 mr-2 text-green-400" />
                  Wallet
                </h3>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse" />
                  <span className="text-green-300 text-sm font-semibold">Connected</span>
                </div>
              </div>

              {/* AVAX Balance */}
              <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-300 font-semibold">AVAX Balance</span>
                  <span className="text-2xl font-bold text-white">{walletBalance.toFixed(2)}</span>
                </div>
                <div className="text-gray-400 text-sm">≈ ${(walletBalance * 42.5).toFixed(2)} USD</div>
              </div>

              {/* Wallet Actions */}
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Funds
                </motion.button>
                
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-blue-500/20 border border-blue-400/30 hover:bg-blue-500/30 text-blue-300 font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4 mr-1" />
                    Withdraw
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gray-600/20 border border-gray-500/30 hover:bg-gray-600/30 text-gray-300 font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center"
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    Settings
                  </motion.button>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-red-500/20 border border-red-400/30 hover:bg-red-500/30 text-red-300 font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                >
                  Disconnect Wallet
                </motion.button>
              </div>
            </div>

            {/* Game Statistics */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-orange-400 shadow-lg shadow-orange-500/20 relative overflow-hidden">
              <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-orange-400 opacity-60" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-orange-400 opacity-60" />
              
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Award className="w-6 h-6 mr-2 text-orange-400" />
                Statistics
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center bg-orange-500/10 border border-orange-400/30 rounded-xl p-3">
                  <div className="text-2xl font-bold text-orange-400 mb-1">5</div>
                  <div className="text-gray-300 text-sm">Quests</div>
                </div>
                <div className="text-center bg-blue-500/10 border border-blue-400/30 rounded-xl p-3">
                  <div className="text-2xl font-bold text-blue-400 mb-1">12</div>
                  <div className="text-gray-300 text-sm">Battles</div>
                </div>
                <div className="text-center bg-green-500/10 border border-green-400/30 rounded-xl p-3">
                  <div className="text-2xl font-bold text-green-400 mb-1">65</div>
                  <div className="text-gray-300 text-sm">Best WPM</div>
                </div>
                <div className="text-center bg-purple-500/10 border border-purple-400/30 rounded-xl p-3">
                  <div className="text-2xl font-bold text-purple-400 mb-1">8</div>
                  <div className="text-gray-300 text-sm">Items</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}