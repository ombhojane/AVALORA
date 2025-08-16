'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '@/app/providers'
import { Target, Clock, Zap, BookOpen } from 'lucide-react'

const typingTexts = [
  'Avalanche is a decentralized platform for launching applications and enterprise blockchain deployments.',
  'Smart contracts on Avalanche can be written in Solidity and deployed using familiar tools.',
  'The Avalanche consensus protocol achieves high throughput and low latency.',
  'AVAX is the native token of the Avalanche platform used for staking and fees.'
]

const web3Facts = [
  {
    title: 'What is Avalanche?',
    content: 'Avalanche is a layer-1 blockchain platform that enables the creation of custom blockchain networks and decentralized applications with high throughput and low latency.'
  },
  {
    title: 'Consensus Mechanism',
    content: 'Avalanche uses a novel consensus protocol that combines the benefits of classical and Nakamoto consensus, achieving finality in under 2 seconds.'
  },
  {
    title: 'Subnets',
    content: 'Subnets are sovereign networks that define their own rules regarding membership and token economics, while benefiting from Avalanche\'s security.'
  }
]

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState<'typing' | 'learning'>('typing')
  const [currentText, setCurrentText] = useState('')
  const [userInput, setUserInput] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)

  const { gameState, updateGameState } = useGame()

  useEffect(() => {
    if (activeTab === 'typing' && !currentText) {
      setCurrentText(typingTexts[Math.floor(Math.random() * typingTexts.length)])
    }
  }, [activeTab, currentText])

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
        char === currentText[index]
      ).length
      const calculatedAccuracy = Math.round((correctChars / userInput.length) * 100) || 0
      setAccuracy(calculatedAccuracy)

      // Award XP based on performance
      const xpGained = Math.floor(calculatedWpm * (calculatedAccuracy / 100))
      updateGameState({
        player: {
          ...gameState.player,
          xp: gameState.player.xp + xpGained
        }
      })
    }
  }

  const resetTest = () => {
    setCurrentText(typingTexts[Math.floor(Math.random() * typingTexts.length)])
    setUserInput('')
    setStartTime(null)
    setWpm(0)
    setAccuracy(100)
    setIsActive(false)
    setTimeLeft(60)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-manga font-bold text-white mb-4">
            Training Grounds
          </h1>
          <p className="text-xl text-gray-300">
            Sharpen your skills and expand your knowledge
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('typing')}
              className={`px-6 py-3 rounded-lg transition-all duration-300 flex items-center ${
                activeTab === 'typing'
                  ? 'bg-avalanche-red text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Target className="w-5 h-5 mr-2" />
              Typing Practice
            </button>
            <button
              onClick={() => setActiveTab('learning')}
              className={`px-6 py-3 rounded-lg transition-all duration-300 flex items-center ${
                activeTab === 'learning'
                  ? 'bg-avalanche-red text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Web3 Learning
            </button>
          </div>
        </div>

        {/* Typing Practice Tab */}
        {activeTab === 'typing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="manga-border bg-black bg-opacity-50 backdrop-blur-sm p-4 text-center">
                <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{timeLeft}s</div>
                <div className="text-gray-400">Time Left</div>
              </div>
              <div className="manga-border bg-black bg-opacity-50 backdrop-blur-sm p-4 text-center">
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{wpm}</div>
                <div className="text-gray-400">WPM</div>
              </div>
              <div className="manga-border bg-black bg-opacity-50 backdrop-blur-sm p-4 text-center">
                <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{accuracy}%</div>
                <div className="text-gray-400">Accuracy</div>
              </div>
              <div className="manga-border bg-black bg-opacity-50 backdrop-blur-sm p-4 text-center">
                <div className="text-2xl font-bold text-avalanche-red">{gameState.player.xp}</div>
                <div className="text-gray-400">Total XP</div>
              </div>
            </div>

            {/* Typing Area */}
            <div className="manga-border bg-black bg-opacity-50 backdrop-blur-sm p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Text to Type:</h3>
                <div className="bg-gray-800 p-4 rounded-lg text-lg leading-relaxed">
                  {currentText.split('').map((char, index) => {
                    let className = 'text-gray-400'
                    if (index < userInput.length) {
                      className = userInput[index] === char ? 'text-green-400' : 'text-red-400'
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
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Start typing here..."
                  className="w-full h-32 p-4 bg-gray-800 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-avalanche-red focus:outline-none transition-colors resize-none"
                  disabled={!isActive}
                />
              </div>

              <div className="flex justify-center space-x-4">
                {!isActive ? (
                  <motion.button
                    onClick={startTypingTest}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Test
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={finishTypingTest}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Finish Test
                  </motion.button>
                )}
                <motion.button
                  onClick={resetTest}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  New Text
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
            className="space-y-6"
          >
            <div className="grid gap-6">
              {web3Facts.map((fact, index) => (
                <motion.div
                  key={fact.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="manga-border bg-black bg-opacity-50 backdrop-blur-sm p-6"
                >
                  <h3 className="text-2xl font-bold text-avalanche-red mb-4">{fact.title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{fact.content}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <motion.button
                onClick={() => {
                  updateGameState({
                    player: {
                      ...gameState.player,
                      xp: gameState.player.xp + 50
                    }
                  })
                }}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Complete Learning Session (+50 XP)
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}