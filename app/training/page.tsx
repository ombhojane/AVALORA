'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '@/app/providers'
import SimpleNav from '@/components/navigation/SimpleNav'
import { Target, Clock, Zap, BookOpen, Trophy, Star, Flame, Shield, Sword, Award, ChevronRight, Lock, CheckCircle, Play, Pause, RotateCcw } from 'lucide-react'
import Image from 'next/image'

const typingChallenges = [
  {
    id: 1,
    title: 'Avalanche Basics',
    difficulty: 'Beginner',
    text: 'Avalanche is a decentralized platform for launching applications and enterprise blockchain deployments in one interoperable, highly scalable ecosystem.',
    xpReward: 50,
    gemsReward: 10,
    unlocked: true
  },
  {
    id: 2,
    title: 'Smart Contracts',
    difficulty: 'Intermediate',
    text: 'Smart contracts on Avalanche can be written in Solidity and deployed using familiar tools like Remix, Truffle, and Hardhat for seamless development.',
    xpReward: 75,
    gemsReward: 15,
    unlocked: true
  },
  {
    id: 3,
    title: 'Consensus Protocol',
    difficulty: 'Advanced',
    text: 'The Avalanche consensus protocol achieves high throughput and low latency by combining the benefits of classical and Nakamoto consensus mechanisms.',
    xpReward: 100,
    gemsReward: 25,
    unlocked: false
  },
  {
    id: 4,
    title: 'AVAX Token',
    difficulty: 'Expert',
    text: 'AVAX is the native token of the Avalanche platform used for staking, paying transaction fees, and securing the network through validator participation.',
    xpReward: 150,
    gemsReward: 35,
    unlocked: false
  }
]

const web3Courses = [
  {
    id: 1,
    title: 'Introduction to Web3',
    description: 'Learn the fundamentals of decentralized web and blockchain technology',
    lessons: [
      { id: 1, title: 'What is Web3?', completed: false, content: 'Web3 represents the third generation of the internet, built on blockchain technology and decentralized protocols. Unlike Web2, which is controlled by centralized platforms, Web3 gives users ownership of their data and digital assets.' },
      { id: 2, title: 'Blockchain Basics', completed: false, content: 'A blockchain is a distributed ledger that maintains a continuously growing list of records, called blocks, which are linked and secured using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data.' },
      { id: 3, title: 'Decentralization', completed: false, content: 'Decentralization in Web3 means no single entity controls the network. Instead, control is distributed among many participants, making the system more resilient, transparent, and resistant to censorship.' }
    ],
    xpReward: 200,
    gemsReward: 50,
    unlocked: true
  },
  {
    id: 2,
    title: 'Avalanche Ecosystem',
    description: 'Deep dive into Avalanche blockchain and its unique features',
    lessons: [
      { id: 1, title: 'Avalanche Architecture', completed: false, content: 'Avalanche consists of three built-in blockchains: Exchange Chain (X-Chain) for creating and trading assets, Platform Chain (P-Chain) for coordinating validators and creating subnets, and Contract Chain (C-Chain) for smart contracts.' },
      { id: 2, title: 'Subnets Explained', completed: false, content: 'Subnets are sovereign networks that define their own rules regarding membership and token economics. They benefit from Avalanche security while maintaining flexibility in governance and virtual machine choice.' },
      { id: 3, title: 'AVAX Tokenomics', completed: false, content: 'AVAX serves multiple purposes: paying for transactions and services, staking for network security, and providing a common unit of account between subnets. The token has a capped supply with a deflationary mechanism.' }
    ],
    xpReward: 300,
    gemsReward: 75,
    unlocked: false
  },
  {
    id: 3,
    title: 'DeFi Fundamentals',
    description: 'Understanding Decentralized Finance protocols and applications',
    lessons: [
      { id: 1, title: 'What is DeFi?', completed: false, content: 'Decentralized Finance (DeFi) refers to financial services built on blockchain networks that operate without traditional intermediaries like banks. DeFi protocols use smart contracts to automate financial transactions.' },
      { id: 2, title: 'Liquidity Pools', completed: false, content: 'Liquidity pools are smart contracts that hold funds and enable decentralized trading. Users can provide liquidity by depositing tokens and earn fees from trades that occur in the pool.' },
      { id: 3, title: 'Yield Farming', completed: false, content: 'Yield farming involves lending or staking cryptocurrency to earn rewards. Farmers move their funds between different protocols to maximize returns, often receiving governance tokens as additional incentives.' }
    ],
    xpReward: 400,
    gemsReward: 100,
    unlocked: false
  }
]

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState<'typing' | 'learning'>('typing')
  const [selectedChallenge, setSelectedChallenge] = useState(typingChallenges[0])
  const [userInput, setUserInput] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null)
  const [showReward, setShowReward] = useState(false)
  const [rewardData, setRewardData] = useState({ xp: 0, gems: 0 })
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { gameState, updateGameState } = useGame()

  // Prevent text selection and copying
  useEffect(() => {
    const preventCopy = (e: Event) => {
      e.preventDefault()
      return false
    }
    
    const preventSelect = (e: Event) => {
      e.preventDefault()
      return false
    }

    document.addEventListener('copy', preventCopy)
    document.addEventListener('selectstart', preventSelect)
    document.addEventListener('contextmenu', preventCopy)

    return () => {
      document.removeEventListener('copy', preventCopy)
      document.removeEventListener('selectstart', preventSelect)
      document.removeEventListener('contextmenu', preventCopy)
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      finishTypingTest()
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  const startTypingTest = () => {
    setIsActive(true)
    setStartTime(Date.now())
    setUserInput('')
    setTimeLeft(60)
  }

  const finishTypingTest = () => {
    setIsActive(false)
    if (startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60 // minutes
      const wordsTyped = userInput.trim().split(' ').length
      const calculatedWpm = Math.round(wordsTyped / timeElapsed)
      setWpm(calculatedWpm)

      // Calculate accuracy
      const correctChars = userInput.split('').filter((char, index) => 
        char === selectedChallenge.text[index]
      ).length
      const calculatedAccuracy = Math.round((correctChars / userInput.length) * 100) || 0
      setAccuracy(calculatedAccuracy)

      // Award XP and gems based on performance and challenge
      const performanceMultiplier = (calculatedAccuracy / 100) * (calculatedWpm / 60)
      const xpGained = Math.floor(selectedChallenge.xpReward * performanceMultiplier)
      const gemsGained = Math.floor(selectedChallenge.gemsReward * performanceMultiplier)
      
      const updatedPlayer = {
        ...gameState.player,
        xp: gameState.player.xp + xpGained,
        gems: gameState.player.gems + gemsGained
      }
      
      updateGameState({
        ...gameState,
        player: updatedPlayer
      })

      // Show reward animation
      setRewardData({ xp: xpGained, gems: gemsGained })
      setShowReward(true)
      setTimeout(() => setShowReward(false), 3000)
    }
  }

  const resetTest = () => {
    setUserInput('')
    setStartTime(null)
    setWpm(0)
    setAccuracy(100)
    setIsActive(false)
    setTimeLeft(60)
  }

  const completeLesson = (courseId: number, lessonId: number) => {
    const xpGained = 100
    const gemsGained = 20
    
    const updatedPlayer = {
      ...gameState.player,
      xp: gameState.player.xp + xpGained,
      gems: gameState.player.gems + gemsGained
    }
    
    updateGameState({
      ...gameState,
      player: updatedPlayer
    })

    setRewardData({ xp: xpGained, gems: gemsGained })
    setShowReward(true)
    setTimeout(() => setShowReward(false), 3000)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 border-green-400'
      case 'Intermediate': return 'text-yellow-400 border-yellow-400'
      case 'Advanced': return 'text-orange-400 border-orange-400'
      case 'Expert': return 'text-red-400 border-red-400'
      default: return 'text-gray-400 border-gray-400'
    }
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: 'url(/ImageAssets/CyberLines.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-90" />
      
      {/* Anime-style floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating energy orbs */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-pulse" />
          </div>
        ))}
        
        {/* Speed lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent transform -rotate-12" />
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent transform rotate-6" />
          <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent transform -rotate-6" />
        </div>
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
              <h3 className="text-2xl font-bold text-white mb-2">Reward Earned!</h3>
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center">
                  <Star className="w-6 h-6 text-white mr-2" />
                  <span className="text-xl font-bold text-white">+{rewardData.xp} XP</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-400 rounded-full mr-2" />
                  <span className="text-xl font-bold text-white">+{rewardData.gems} Gems</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SimpleNav currentPage="Training & Literacy" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-manga font-bold text-white mb-4">
            <span className="smoky-text">Training & Literacy</span>
          </h1>
          <p className="text-xl text-gray-300">
            Master combat skills and expand your knowledge in the ultimate dojo
          </p>
        </motion.div>

        {/* Player Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-4 mb-8 border-2 border-purple-400 shadow-lg shadow-purple-500/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Star className="w-6 h-6 text-yellow-400 mr-2" />
                <span className="text-white font-bold">Level {gameState.player.level}</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-6 h-6 text-blue-400 mr-2" />
                <span className="text-white font-bold">{gameState.player.xp} XP</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-400 rounded-full mr-2" />
                <span className="text-white font-bold">{gameState.player.gems} Gems</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold">{gameState.player.name}</div>
              <div className="text-gray-400 text-sm">Warrior</div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-800 rounded-2xl p-2 border-2 border-gray-600">
            <button
              onClick={() => setActiveTab('typing')}
              className={`px-8 py-4 rounded-xl transition-all duration-300 flex items-center font-bold ${
                activeTab === 'typing'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Sword className="w-6 h-6 mr-3" />
              Combat Training
            </button>
            <button
              onClick={() => setActiveTab('learning')}
              className={`px-8 py-4 rounded-xl transition-all duration-300 flex items-center font-bold ${
                activeTab === 'learning'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <BookOpen className="w-6 h-6 mr-3" />
              Knowledge Academy
            </button>
          </div>
        </div>

        {/* Typing Practice Tab */}
        {activeTab === 'typing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Challenge Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {typingChallenges.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  onClick={() => challenge.unlocked && setSelectedChallenge(challenge)}
                  className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    challenge.unlocked
                      ? selectedChallenge.id === challenge.id
                        ? 'border-yellow-400 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 shadow-lg shadow-yellow-500/20'
                        : 'border-gray-600 bg-gradient-to-br from-gray-800 to-gray-900 hover:border-gray-400'
                      : 'border-gray-700 bg-gradient-to-br from-gray-900 to-black opacity-50'
                  }`}
                  whileHover={challenge.unlocked ? { scale: 1.02 } : {}}
                  whileTap={challenge.unlocked ? { scale: 0.98 } : {}}
                >
                  {!challenge.unlocked && (
                    <div className="absolute top-2 right-2">
                      <Lock className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h3 className={`text-lg font-bold mb-2 ${challenge.unlocked ? 'text-white' : 'text-gray-500'}`}>
                      {challenge.title}
                    </h3>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mb-3 ${
                      challenge.unlocked ? getDifficultyColor(challenge.difficulty) : 'text-gray-500 border-gray-500'
                    }`}>
                      {challenge.difficulty}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={challenge.unlocked ? 'text-blue-400' : 'text-gray-500'}>
                        +{challenge.xpReward} XP
                      </span>
                      <span className={challenge.unlocked ? 'text-green-400' : 'text-gray-500'}>
                        +{challenge.gemsReward} Gems
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-2 border-blue-400 rounded-2xl p-4 text-center">
                <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">{timeLeft}s</div>
                <div className="text-blue-300 font-semibold">Time Left</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-2 border-yellow-400 rounded-2xl p-4 text-center">
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">{wpm}</div>
                <div className="text-yellow-300 font-semibold">WPM</div>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-400 rounded-2xl p-4 text-center">
                <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">{accuracy}%</div>
                <div className="text-green-300 font-semibold">Accuracy</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-2 border-purple-400 rounded-2xl p-4 text-center">
                <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">{selectedChallenge.difficulty}</div>
                <div className="text-purple-300 font-semibold">Difficulty</div>
              </div>
            </div>

            {/* Typing Arena */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border-2 border-red-400 shadow-lg shadow-red-500/20 relative overflow-hidden">
              {/* Anime corner decorations */}
              <div className="absolute top-2 left-2 w-8 h-8 border-l-3 border-t-3 border-red-400 opacity-60" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-r-3 border-b-3 border-red-400 opacity-60" />
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white flex items-center">
                    <Flame className="w-6 h-6 mr-2 text-red-400" />
                    {selectedChallenge.title} Challenge
                  </h3>
                  <div className={`px-4 py-2 rounded-full border-2 font-bold ${getDifficultyColor(selectedChallenge.difficulty)}`}>
                    {selectedChallenge.difficulty}
                  </div>
                </div>
                
                <div 
                  className="bg-gray-900 p-6 rounded-xl text-lg leading-relaxed border-2 border-gray-600 select-none"
                  style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none' }}
                >
                  {selectedChallenge.text.split('').map((char, index) => {
                    let className = 'text-gray-400'
                    if (index < userInput.length) {
                      className = userInput[index] === char ? 'text-green-400 bg-green-400/20' : 'text-red-400 bg-red-400/20'
                    } else if (index === userInput.length) {
                      className = 'text-white bg-white/20 animate-pulse'
                    }
                    return (
                      <span key={index} className={className}>
                        {char}
                      </span>
                    )
                  })}
                </div>
              </div>

              <div className="mb-6">
                <textarea
                  ref={textareaRef}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Begin your training here..."
                  className="w-full h-32 p-4 bg-gray-800 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-red-400 focus:outline-none transition-colors resize-none text-lg"
                  disabled={!isActive}
                  onCopy={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>

              <div className="flex justify-center space-x-4">
                {!isActive ? (
                  <motion.button
                    onClick={startTypingTest}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 flex items-center shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-6 h-6 mr-2" />
                    Begin Training
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={finishTypingTest}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 flex items-center shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Pause className="w-6 h-6 mr-2" />
                    Complete Training
                  </motion.button>
                )}
                <motion.button
                  onClick={resetTest}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 flex items-center shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="w-6 h-6 mr-2" />
                  Reset
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Learning Tab */}
        {activeTab === 'learning' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {selectedCourse === null ? (
              /* Course Selection */
              <div className="grid gap-6">
                {web3Courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => course.unlocked && setSelectedCourse(course.id)}
                    className={`relative p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      course.unlocked
                        ? 'border-blue-400 bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:border-blue-300 shadow-lg shadow-blue-500/20'
                        : 'border-gray-700 bg-gradient-to-br from-gray-900 to-black opacity-50'
                    }`}
                    whileHover={course.unlocked ? { scale: 1.02 } : {}}
                  >
                    {!course.unlocked && (
                      <div className="absolute top-4 right-4">
                        <Lock className="w-8 h-8 text-gray-500" />
                      </div>
                    )}
                    
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className={`text-3xl font-bold mb-2 ${course.unlocked ? 'text-white' : 'text-gray-500'}`}>
                          {course.title}
                        </h3>
                        <p className={`text-lg ${course.unlocked ? 'text-gray-300' : 'text-gray-600'}`}>
                          {course.description}
                        </p>
                      </div>
                      {course.unlocked && (
                        <ChevronRight className="w-8 h-8 text-blue-400" />
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className={`text-sm ${course.unlocked ? 'text-gray-400' : 'text-gray-600'}`}>
                          {course.lessons.length} Lessons
                        </span>
                        <div className="flex items-center space-x-2">
                          <Star className={`w-5 h-5 ${course.unlocked ? 'text-yellow-400' : 'text-gray-500'}`} />
                          <span className={course.unlocked ? 'text-yellow-400' : 'text-gray-500'}>
                            +{course.xpReward} XP
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-5 h-5 rounded-full ${course.unlocked ? 'bg-blue-400' : 'bg-gray-500'}`} />
                          <span className={course.unlocked ? 'text-blue-400' : 'text-gray-500'}>
                            +{course.gemsReward} Gems
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Course Content */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="text-blue-400 hover:text-blue-300 flex items-center text-lg font-semibold"
                  >
                    ← Back to Courses
                  </button>
                </div>
                
                {(() => {
                  const course = web3Courses.find(c => c.id === selectedCourse)
                  if (!course) return null
                  
                  return (
                    <div>
                      <h2 className="text-4xl font-bold text-white mb-4">{course.title}</h2>
                      <p className="text-xl text-gray-300 mb-8">{course.description}</p>
                      
                      <div className="grid gap-4">
                        {course.lessons.map((lesson, index) => (
                          <motion.div
                            key={lesson.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-gray-600 hover:border-gray-400 transition-all duration-300"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                                  lesson.completed ? 'bg-green-500' : 'bg-gray-600'
                                }`}>
                                  {lesson.completed ? (
                                    <CheckCircle className="w-5 h-5 text-white" />
                                  ) : (
                                    <span className="text-white font-bold">{index + 1}</span>
                                  )}
                                </div>
                                <h3 className="text-xl font-bold text-white">{lesson.title}</h3>
                              </div>
                              {!lesson.completed && (
                                <motion.button
                                  onClick={() => completeLesson(course.id, lesson.id)}
                                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  Complete
                                </motion.button>
                              )}
                            </div>
                            <p className="text-gray-300 leading-relaxed">{lesson.content}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}