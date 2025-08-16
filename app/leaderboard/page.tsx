'use client'

import { motion } from 'framer-motion'
import { Trophy, Medal, Crown, Gem, Zap } from 'lucide-react'

interface Player {
  id: number
  name: string
  level: number
  xp: number
  gems: number
  avatar: string
  rank: number
}

const leaderboardData: Player[] = [
  { id: 1, name: 'SnowMaster', level: 25, xp: 12500, gems: 2500, avatar: '/Artworks-Characters/MainCharacter.png', rank: 1 },
  { id: 2, name: 'CryptoNinja', level: 23, xp: 11200, gems: 2200, avatar: '/Artworks-Characters/MainCharacter.png', rank: 2 },
  { id: 3, name: 'BlockchainSamurai', level: 22, xp: 10800, gems: 2100, avatar: '/Artworks-Characters/MainCharacter.png', rank: 3 },
  { id: 4, name: 'DigitalWarrior', level: 20, xp: 9500, gems: 1900, avatar: '/Artworks-Characters/MainCharacter.png', rank: 4 },
  { id: 5, name: 'WebThreeHero', level: 19, xp: 9200, gems: 1800, avatar: '/Artworks-Characters/MainCharacter.png', rank: 5 },
  { id: 6, name: 'AvaxLegend', level: 18, xp: 8800, gems: 1700, avatar: '/Artworks-Characters/MainCharacter.png', rank: 6 },
  { id: 7, name: 'TypeMaster', level: 17, xp: 8200, gems: 1600, avatar: '/Artworks-Characters/MainCharacter.png', rank: 7 },
  { id: 8, name: 'QuizChampion', level: 16, xp: 7800, gems: 1500, avatar: '/Artworks-Characters/MainCharacter.png', rank: 8 },
  { id: 9, name: 'CodeBreaker', level: 15, xp: 7200, gems: 1400, avatar: '/Artworks-Characters/MainCharacter.png', rank: 9 },
  { id: 10, name: 'ChainGuardian', level: 14, xp: 6800, gems: 1300, avatar: '/Artworks-Characters/MainCharacter.png', rank: 10 }
]

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-8 h-8 text-yellow-400" />
    case 2:
      return <Medal className="w-8 h-8 text-gray-300" />
    case 3:
      return <Medal className="w-8 h-8 text-amber-600" />
    default:
      return <Trophy className="w-6 h-6 text-gray-500" />
  }
}

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return 'border-yellow-400 bg-yellow-900 bg-opacity-20'
    case 2:
      return 'border-gray-300 bg-gray-800 bg-opacity-20'
    case 3:
      return 'border-amber-600 bg-amber-900 bg-opacity-20'
    default:
      return 'border-gray-600 bg-black bg-opacity-50'
  }
}

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-manga font-bold text-white mb-4">
            Leaderboard
          </h1>
          <p className="text-xl text-gray-300">
            Compete with warriors from across the Avalanche realm
          </p>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {leaderboardData.slice(0, 3).map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`manga-border backdrop-blur-sm p-6 text-center ${getRankColor(player.rank)} ${
                player.rank === 1 ? 'md:order-2 transform md:scale-110' : 
                player.rank === 2 ? 'md:order-1' : 'md:order-3'
              }`}
            >
              <div className="flex justify-center mb-4">
                {getRankIcon(player.rank)}
              </div>
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-avalanche-red">
                <img
                  src={player.avatar}
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{player.name}</h3>
              <div className="space-y-1 text-sm">
                <div className="flex items-center justify-center text-gray-300">
                  <span>Level {player.level}</span>
                </div>
                <div className="flex items-center justify-center text-blue-400">
                  <Zap className="w-4 h-4 mr-1" />
                  <span>{player.xp.toLocaleString()} XP</span>
                </div>
                <div className="flex items-center justify-center text-purple-400">
                  <Gem className="w-4 h-4 mr-1" />
                  <span>{player.gems.toLocaleString()} Gems</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="manga-border bg-black bg-opacity-50 backdrop-blur-sm overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-avalanche-red" />
              Global Rankings
            </h2>
            
            <div className="space-y-2">
              {leaderboardData.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`flex items-center p-4 rounded-lg transition-all duration-300 hover:bg-opacity-70 ${
                    player.rank <= 3 ? getRankColor(player.rank) : 'bg-gray-800 bg-opacity-30 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-center w-12 h-12 mr-4">
                    {player.rank <= 3 ? (
                      getRankIcon(player.rank)
                    ) : (
                      <span className="text-2xl font-bold text-gray-400">#{player.rank}</span>
                    )}
                  </div>
                  
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-avalanche-red mr-4">
                    <img
                      src={player.avatar}
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{player.name}</h3>
                    <p className="text-gray-400">Level {player.level}</p>
                  </div>
                  
                  <div className="text-right space-y-1">
                    <div className="flex items-center text-blue-400">
                      <Zap className="w-4 h-4 mr-1" />
                      <span className="font-semibold">{player.xp.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center text-purple-400">
                      <Gem className="w-4 h-4 mr-1" />
                      <span className="font-semibold">{player.gems.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Player Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="manga-border bg-black bg-opacity-50 backdrop-blur-sm p-6 text-center">
            <h3 className="text-lg font-bold text-white mb-2">Total Players</h3>
            <p className="text-3xl font-bold text-avalanche-red">1,247</p>
          </div>
          <div className="manga-border bg-black bg-opacity-50 backdrop-blur-sm p-6 text-center">
            <h3 className="text-lg font-bold text-white mb-2">Active Today</h3>
            <p className="text-3xl font-bold text-green-400">892</p>
          </div>
          <div className="manga-border bg-black bg-opacity-50 backdrop-blur-sm p-6 text-center">
            <h3 className="text-lg font-bold text-white mb-2">Battles Won</h3>
            <p className="text-3xl font-bold text-blue-400">15,623</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}