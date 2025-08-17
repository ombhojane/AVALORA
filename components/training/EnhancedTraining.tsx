'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sword, Target, Brain, Zap, Shield, Crown, Star, Trophy, 
  Clock, Heart, Gem, Play, Pause, RotateCcw, ChevronRight,
  Gamepad2, Eye, MousePointer, Keyboard, Timer, Lock
} from 'lucide-react'

interface TrainingModule {
  id: string
  title: string
  description: string
  type: 'combat' | 'knowledge' | 'skill' | 'strategy'
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  unlockLevel: number
  xpReward: number
  gemsReward: number
  challenges: Challenge[]
}

interface Challenge {
  id: string
  name: string
  type: 'typing' | 'memory' | 'reaction' | 'puzzle' | 'quiz' | 'rhythm'
  description: string
  timeLimit: number
  targetScore: number
  rewards: { xp: number; gems: number }
}

const trainingModules: TrainingModule[] = [
  {
    id: 'basic-combat',
    title: 'Basic Combat Training',
    description: 'Master the fundamentals of digital warfare',
    type: 'combat',
    difficulty: 'beginner',
    unlockLevel: 1,
    xpReward: 100,
    gemsReward: 25,
    challenges: [
      {
        id: 'sword-basics',
        name: 'Sword Fundamentals',
        type: 'typing',
        description: 'Type weapon names as they appear',
        timeLimit: 60,
        targetScore: 80,
        rewards: { xp: 25, gems: 5 }
      },
      {
        id: 'defense-patterns',
        name: 'Defense Patterns',
        type: 'memory',
        description: 'Remember and repeat shield formations',
        timeLimit: 45,
        targetScore: 75,
        rewards: { xp: 30, gems: 7 }
      }
    ]
  },
  {
    id: 'advanced-combat',
    title: 'Advanced Combat Mastery',
    description: 'Become a legendary warrior of AVALORA',
    type: 'combat',
    difficulty: 'advanced',
    unlockLevel: 10,
    xpReward: 300,
    gemsReward: 75,
    challenges: [
      {
        id: 'combo-master',
        name: 'Combo Mastery',
        type: 'rhythm',
        description: 'Execute perfect attack combinations',
        timeLimit: 90,
        targetScore: 95,
        rewards: { xp: 75, gems: 20 }
      },
      {
        id: 'tactical-warfare',
        name: 'Tactical Warfare',
        type: 'puzzle',
        description: 'Solve battlefield strategy puzzles',
        timeLimit: 120,
        targetScore: 85,
        rewards: { xp: 100, gems: 25 }
      }
    ]
  },
  {
    id: 'blockchain-fundamentals',
    title: 'Blockchain Fundamentals',
    description: 'Learn the core concepts of Web3 technology',
    type: 'knowledge',
    difficulty: 'beginner',
    unlockLevel: 1,
    xpReward: 150,
    gemsReward: 35,
    challenges: [
      {
        id: 'crypto-basics',
        name: 'Cryptocurrency Basics',
        type: 'quiz',
        description: 'Answer questions about digital currencies',
        timeLimit: 300,
        targetScore: 80,
        rewards: { xp: 50, gems: 12 }
      },
      {
        id: 'wallet-security',
        name: 'Wallet Security',
        type: 'puzzle',
        description: 'Secure virtual wallets from attacks',
        timeLimit: 180,
        targetScore: 90,
        rewards: { xp: 60, gems: 15 }
      }
    ]
  },
  {
    id: 'defi-mastery',
    title: 'DeFi Protocol Mastery',
    description: 'Master decentralized finance protocols',
    type: 'knowledge',
    difficulty: 'expert',
    unlockLevel: 20,
    xpReward: 500,
    gemsReward: 125,
    challenges: [
      {
        id: 'liquidity-pools',
        name: 'Liquidity Pool Management',
        type: 'puzzle',
        description: 'Optimize liquidity pool strategies',
        timeLimit: 240,
        targetScore: 95,
        rewards: { xp: 150, gems: 40 }
      },
      {
        id: 'yield-farming',
        name: 'Yield Farming Strategies',
        type: 'quiz',
        description: 'Maximize yield farming returns',
        timeLimit: 180,
        targetScore: 90,
        rewards: { xp: 120, gems: 30 }
      }
    ]
  },
  {
    id: 'reaction-training',
    title: 'Lightning Reflexes',
    description: 'Develop superhuman reaction speeds',
    type: 'skill',
    difficulty: 'intermediate',
    unlockLevel: 5,
    xpReward: 200,
    gemsReward: 50,
    challenges: [
      {
        id: 'lightning-strike',
        name: 'Lightning Strike',
        type: 'reaction',
        description: 'React to visual cues as fast as possible',
        timeLimit: 30,
        targetScore: 95,
        rewards: { xp: 60, gems: 15 }
      },
      {
        id: 'multi-target',
        name: 'Multi-Target Tracking',
        type: 'reaction',
        description: 'Track and click multiple moving targets',
        timeLimit: 60,
        targetScore: 85,
        rewards: { xp: 80, gems: 20 }
      }
    ]
  }
]

const ChallengeComponent = ({ 
  challenge, 
  onComplete 
}: { 
  challenge: Challenge, 
  onComplete: (score: number) => void 
}) => {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(challenge.timeLimit)
  const [score, setScore] = useState(0)
  const [gameData, setGameData] = useState<any>({})

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setIsActive(false)
      onComplete(score)
    }
  }, [isActive, timeLeft, score, onComplete])

  const startChallenge = () => {
    setIsActive(true)
    setScore(0)
    setTimeLeft(challenge.timeLimit)
    
    // Initialize challenge-specific data
    switch (challenge.type) {
      case 'memory':
        setGameData({ 
          sequence: generateRandomSequence(5),
          userSequence: [],
          showingSequence: true
        })
        break
      case 'reaction':
        setGameData({
          targets: [],
          nextTargetTime: Date.now() + Math.random() * 3000 + 1000
        })
        break
      case 'rhythm':
        setGameData({
          beats: generateRhythmPattern(8),
          currentBeat: 0,
          accuracy: []
        })
        break
    }
  }

  const generateRandomSequence = (length: number) => {
    const symbols = ['⚔️', '🛡️', '⚡', '❄️', '🔥', '💎']
    return Array.from({ length }, () => symbols[Math.floor(Math.random() * symbols.length)])
  }

  const generateRhythmPattern = (length: number) => {
    return Array.from({ length }, (_, i) => ({
      time: i * 500 + 1000,
      hit: false
    }))
  }

  return (
    <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl p-6 border-2 border-blue-400/50 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{challenge.name}</h3>
          <p className="text-gray-400 text-sm">{challenge.description}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{timeLeft}s</div>
          <div className="text-yellow-400">Score: {score}</div>
        </div>
      </div>

      {/* Challenge-specific UI */}
      <div className="bg-black/50 rounded-xl p-6 mb-4 min-h-[200px] flex items-center justify-center">
        {!isActive ? (
          <button
            onClick={startChallenge}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl flex items-center text-lg"
          >
            <Play className="w-6 h-6 mr-2" />
            Start Challenge
          </button>
        ) : (
          <div className="text-center w-full">
            {challenge.type === 'typing' && (
              <div>
                <div className="text-2xl text-white mb-4">Type the words as they appear!</div>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-800 border-2 border-gray-600 rounded-xl text-white text-xl text-center focus:border-blue-400 focus:outline-none"
                  placeholder="Start typing..."
                  autoFocus
                />
              </div>
            )}

            {challenge.type === 'memory' && (
              <div>
                <div className="text-xl text-white mb-4">Remember the sequence:</div>
                <div className="text-4xl space-x-4">
                  {gameData.sequence?.map((symbol: string, index: number) => (
                    <span key={index} className="inline-block">{symbol}</span>
                  ))}
                </div>
              </div>
            )}

            {challenge.type === 'reaction' && (
              <div>
                <div className="text-xl text-white mb-4">Click the targets as they appear!</div>
                <div className="relative w-full h-32 bg-gray-700 rounded-lg">
                  {/* Reaction targets would appear here */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-500 rounded-full animate-pulse cursor-pointer"></div>
                  </div>
                </div>
              </div>
            )}

            {challenge.type === 'rhythm' && (
              <div>
                <div className="text-xl text-white mb-4">Hit the beats in rhythm!</div>
                <div className="flex justify-center space-x-4">
                  {gameData.beats?.map((beat: any, index: number) => (
                    <div
                      key={index}
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
                        beat.hit ? 'bg-green-500 border-green-400' : 'bg-gray-600 border-gray-500'
                      }`}
                    >
                      ♪
                    </div>
                  ))}
                </div>
              </div>
            )}

            {challenge.type === 'quiz' && (
              <div>
                <div className="text-xl text-white mb-4">Answer the questions correctly!</div>
                <div className="space-y-4">
                  <div className="text-lg text-gray-300">What is the native token of Avalanche?</div>
                  <div className="grid grid-cols-2 gap-4">
                    {['AVAX', 'ETH', 'BTC', 'SOL'].map((option) => (
                      <button
                        key={option}
                        className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Progress and rewards */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Target: {challenge.targetScore}% accuracy
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center text-blue-400">
            <Star className="w-4 h-4 mr-1" />
            +{challenge.rewards.xp} XP
          </div>
          <div className="flex items-center text-purple-400">
            <Gem className="w-4 h-4 mr-1" />
            +{challenge.rewards.gems} Gems
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EnhancedTraining({ 
  playerLevel, 
  onComplete 
}: { 
  playerLevel: number, 
  onComplete: (rewards: { xp: number; gems: number }) => void 
}) {
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null)
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([])

  const availableModules = trainingModules.filter(module => 
    playerLevel >= module.unlockLevel
  )

  const handleChallengeComplete = (score: number) => {
    if (!selectedChallenge) return

    const passed = score >= selectedChallenge.targetScore
    if (passed) {
      setCompletedChallenges([...completedChallenges, selectedChallenge.id])
      onComplete(selectedChallenge.rewards)
    }
    
    setSelectedChallenge(null)
  }

  return (
    <div className="space-y-8">
      {!selectedModule ? (
        /* Module Selection */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedModule(module)}
              className="cursor-pointer bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl p-6 border-2 border-gray-600 hover:border-gray-400 transition-all duration-300 group"
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                  module.type === 'combat' ? 'bg-red-500' :
                  module.type === 'knowledge' ? 'bg-blue-500' :
                  module.type === 'skill' ? 'bg-green-500' : 'bg-purple-500'
                }`}>
                  {module.type === 'combat' && <Sword className="w-6 h-6 text-white" />}
                  {module.type === 'knowledge' && <Brain className="w-6 h-6 text-white" />}
                  {module.type === 'skill' && <Target className="w-6 h-6 text-white" />}
                  {module.type === 'strategy' && <Crown className="w-6 h-6 text-white" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{module.title}</h3>
                  <p className="text-gray-400 text-sm capitalize">{module.difficulty}</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">{module.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center text-blue-400">
                    <Star className="w-4 h-4 mr-1" />
                    +{module.xpReward} XP
                  </div>
                  <div className="flex items-center text-purple-400">
                    <Gem className="w-4 h-4 mr-1" />
                    +{module.gemsReward} Gems
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      ) : !selectedChallenge ? (
        /* Challenge Selection */
        <div>
          <button
            onClick={() => setSelectedModule(null)}
            className="mb-6 text-blue-400 hover:text-blue-300 flex items-center"
          >
            ← Back to Modules
          </button>
          
          <h2 className="text-3xl font-bold text-white mb-6">{selectedModule.title}</h2>
          
          <div className="grid gap-6">
            {selectedModule.challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedChallenge(challenge)}
                className="cursor-pointer bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl p-6 border-2 border-gray-600 hover:border-gray-400 transition-all duration-300 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{challenge.name}</h3>
                  <p className="text-gray-400">{challenge.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm">
                    <span className="text-yellow-400">⏱️ {challenge.timeLimit}s</span>
                    <span className="text-green-400">🎯 {challenge.targetScore}%</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  {completedChallenges.includes(challenge.id) && (
                    <Trophy className="w-6 h-6 text-yellow-400 mr-4" />
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        /* Challenge Execution */
        <div>
          <button
            onClick={() => setSelectedChallenge(null)}
            className="mb-6 text-blue-400 hover:text-blue-300 flex items-center"
          >
            ← Back to Challenges
          </button>
          
          <ChallengeComponent
            challenge={selectedChallenge}
            onComplete={handleChallengeComplete}
          />
        </div>
      )}
    </div>
  )
}