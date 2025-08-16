'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '@/app/providers'
import { useRouter } from 'next/navigation'
import { Sword, Heart, Gem, ArrowRight, RotateCcw } from 'lucide-react'

interface Battle {
  id: number
  type: 'typing' | 'jumble' | 'trivia'
  challenge: string
  answer: string
  options?: string[]
  reward: { gems: number; xp: number }
}

const sampleBattles: Battle[] = [
  {
    id: 1,
    type: 'typing',
    challenge: 'AVALANCHE',
    answer: 'AVALANCHE',
    reward: { gems: 10, xp: 25 }
  },
  {
    id: 2,
    type: 'jumble',
    challenge: 'HCNALAVA',
    answer: 'AVALANCHE',
    reward: { gems: 15, xp: 30 }
  },
  {
    id: 3,
    type: 'trivia',
    challenge: 'What is the native token of Avalanche?',
    answer: 'AVAX',
    options: ['AVAX', 'ETH', 'BTC', 'ADA'],
    reward: { gems: 20, xp: 40 }
  }
]

export default function QuestPage() {
  const [currentBattle, setCurrentBattle] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [battleResult, setBattleResult] = useState<'win' | 'lose' | null>(null)
  const [showComic, setShowComic] = useState(true)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isActive, setIsActive] = useState(false)

  const { gameState, updateGameState } = useGame()
  const router = useRouter()

  const battle = sampleBattles[currentBattle]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && timeLeft > 0 && !battleResult) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && !battleResult) {
      handleBattleEnd(false)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, battleResult])

  const startBattle = () => {
    setShowComic(false)
    setIsActive(true)
    setTimeLeft(30)
  }

  const handleBattleEnd = (won: boolean) => {
    setIsActive(false)
    setBattleResult(won ? 'win' : 'lose')
    
    if (won) {
      updateGameState({
        player: {
          ...gameState.player,
          gems: gameState.player.gems + battle.reward.gems,
          xp: gameState.player.xp + battle.reward.xp
        }
      })
    } else {
      updateGameState({
        player: {
          ...gameState.player,
          hp: Math.max(0, gameState.player.hp - 20)
        }
      })
    }
  }

  const checkAnswer = () => {
    let isCorrect = false
    
    switch (battle.type) {
      case 'typing':
        isCorrect = userInput.toUpperCase() === battle.answer.toUpperCase()
        break
      case 'jumble':
        isCorrect = userInput.toUpperCase() === battle.answer.toUpperCase()
        break
      case 'trivia':
        isCorrect = selectedOption === battle.answer
        break
    }
    
    handleBattleEnd(isCorrect)
  }

  const nextBattle = () => {
    if (currentBattle < sampleBattles.length - 1) {
      setCurrentBattle(currentBattle + 1)
      setUserInput('')
      setSelectedOption('')
      setBattleResult(null)
      setShowComic(true)
      setTimeLeft(30)
      setIsActive(false)
    } else {
      router.push('/dashboard')
    }
  }

  const retryBattle = () => {
    setUserInput('')
    setSelectedOption('')
    setBattleResult(null)
    setTimeLeft(30)
    setIsActive(true)
  }

  if (showComic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-4"
        >
          <div className="manga-border bg-black bg-opacity-90 backdrop-blur-sm p-8 text-center">
            <h1 className="text-4xl font-manga font-bold text-white mb-6">
              Chapter {currentBattle + 1}: The Challenge Awaits
            </h1>
            <div className="text-lg text-gray-300 mb-8 leading-relaxed">
              <p>
                The ancient guardian blocks your path, its eyes glowing with digital fire. 
                To proceed, you must prove your mastery of the Avalanche arts through combat.
              </p>
              <p className="mt-4">
                "Show me your skills, young warrior. Only those who can type with lightning speed, 
                unscramble the chaos, and answer the riddles of Web3 may pass."
              </p>
            </div>
            <motion.button
              onClick={startBattle}
              className="bg-gradient-to-r from-avalanche-red to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 manga-border"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Begin Battle
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Battle Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Heart className="w-6 h-6 text-red-500 mr-2" />
              <span className="text-white font-bold">{gameState.player.hp}/{gameState.player.maxHp}</span>
            </div>
            <div className="flex items-center">
              <Gem className="w-6 h-6 text-blue-400 mr-2" />
              <span className="text-white font-bold">{gameState.player.gems}</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white">
            Time: {timeLeft}s
          </div>
        </motion.div>

        {/* Battle Arena */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="manga-border bg-black bg-opacity-90 backdrop-blur-sm p-8 mb-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-manga font-bold text-white mb-4">
              {battle.type === 'typing' && 'Typing Challenge'}
              {battle.type === 'jumble' && 'Word Jumble'}
              {battle.type === 'trivia' && 'Web3 Trivia'}
            </h2>
            <div className="text-xl text-gray-300 mb-6">
              {battle.challenge}
            </div>
          </div>

          {!battleResult && (
            <div className="space-y-6">
              {battle.type === 'trivia' && battle.options ? (
                <div className="grid grid-cols-2 gap-4">
                  {battle.options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedOption(option)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        selectedOption === option
                          ? 'border-avalanche-red bg-red-900 bg-opacity-50'
                          : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-white font-semibold">{option}</span>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your answer..."
                    className="w-full p-4 text-2xl text-center bg-gray-800 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-avalanche-red focus:outline-none transition-colors"
                    autoFocus
                  />
                </div>
              )}

              <div className="text-center">
                <motion.button
                  onClick={checkAnswer}
                  disabled={!userInput && !selectedOption}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit Answer
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Battle Result */}
        <AnimatePresence>
          {battleResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`manga-border p-8 text-center ${
                battleResult === 'win' 
                  ? 'bg-green-900 bg-opacity-50' 
                  : 'bg-red-900 bg-opacity-50'
              }`}
            >
              <h3 className={`text-4xl font-bold mb-4 ${
                battleResult === 'win' ? 'text-green-400' : 'text-red-400'
              }`}>
                {battleResult === 'win' ? 'Victory!' : 'Defeat!'}
              </h3>
              
              {battleResult === 'win' ? (
                <div className="space-y-4">
                  <p className="text-xl text-white">
                    Excellent work! You've proven your skills.
                  </p>
                  <div className="flex justify-center space-x-6">
                    <div className="flex items-center">
                      <Gem className="w-6 h-6 text-blue-400 mr-2" />
                      <span className="text-white font-bold">+{battle.reward.gems} Gems</span>
                    </div>
                    <div className="flex items-center">
                      <Sword className="w-6 h-6 text-yellow-400 mr-2" />
                      <span className="text-white font-bold">+{battle.reward.xp} XP</span>
                    </div>
                  </div>
                  <motion.button
                    onClick={nextBattle}
                    className="bg-gradient-to-r from-avalanche-red to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 flex items-center mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {currentBattle < sampleBattles.length - 1 ? 'Next Battle' : 'Return to Dashboard'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xl text-white">
                    The guardian's power overwhelms you. Try again!
                  </p>
                  <p className="text-red-400">-20 HP</p>
                  <div className="flex justify-center space-x-4">
                    <motion.button
                      onClick={retryBattle}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Retry
                    </motion.button>
                    <motion.button
                      onClick={() => router.push('/dashboard')}
                      className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Retreat
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}