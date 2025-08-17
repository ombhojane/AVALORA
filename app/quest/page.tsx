'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '@/app/providers'
import { useRouter } from 'next/navigation'
import SimpleNav from '@/components/navigation/SimpleNav'
import { 
  Sword, Heart, Gem, ArrowRight, RotateCcw, Play, ChevronLeft, ChevronRight, 
  Star, Trophy, Lock, CheckCircle, X, Zap, Target, Clock, Shield, Crown,
  Gamepad2, Brain, Eye, MousePointer, Keyboard, Timer, AlertCircle
} from 'lucide-react'
import Image from 'next/image'

interface Chapter {
  id: number
  title: string
  description: string
  videoIntro: string
  completed: boolean
  unlocked: boolean
  comicPages: number[]
  battles: Battle[]
  unlockCost: number
  storyText: string[]
}

interface Battle {
  id: number
  type: 'typing' | 'jumble' | 'trivia' | 'memory' | 'reaction' | 'sequence' | 'math'
  challenge: string
  answer: string | string[]
  options?: string[]
  reward: { gems: number; xp: number }
  hero: string
  villain: string
  timeLimit: number
}

const chapterStories = {
  0: [
    "In a dimension woven from code and frost, the realm of Avalora existed in serene beauty.",
    "The Avaland Citadel stood at its center, ruled by the formidable Emperor AVAXIM.",
    "AVALANCH served as loyal ambassador, guiding warriors across digital realms.",
    "Cutter practiced his craft in the mountains, his keystrokes a dance of precision.",
    "Yet shadows lingered... Lady Virexia spun illusions in dark corners.",
    "The Crimson Sentinel waited dormant, a war machine of terrifying power.",
    "Dr. Malgrave watched from fractured timelines with calculating eyes.",
    "And Smirk moved like a ghost through the deepest data streams.",
    "For a thousand cycles, the Gems of Eternity bathed Avalora in peace.",
    "Everything was in balance... until now."
  ],
  1: [
    "The eternal winter of Avalora was a symphony of silence, broken only by howling winds.",
    "In the heart of the realm, the Avaland Citadel glowed with crimson light.",
    "Emperor Avaxim sat upon his throne of ice and fire, sensing disturbance.",
    "Avalanch felt the same tremor in the blockchain that underpinned reality.",
    "The network feels strained, like a river before a storm.",
    "The Shards of Corruption are no longer a distant threat.",
    "They are at our gates, hungry for the Gems of Eternity.",
    "A discordant hum echoed from the valley below.",
    "It was a sound alien to Avalora's perfect harmony.",
    "A note of pure chaos had entered their world."
  ],
  2: [
    "Cutter moved with impossible speed in his mountain dojo.",
    "His fingers blurred across holographic interfaces, forming digital blades.",
    "Lady Virexia emerged from shadows, her horned mask gleaming.",
    "Your skills are wasted in this frozen wasteland, she purred.",
    "Imagine the power you could command if you joined us.",
    "Her shadows lashed out with whispers of doubt and fear.",
    "Visions of the Citadel in ruins flickered at the edge of sight.",
    "My mind is my own, Sorceress, Cutter declared.",
    "Pure energy erupted from him, shattering the shadow-copies.",
    "Even the strongest wills can be broken, she warned before vanishing."
  ],
  3: [
    "The Crimson Sentinel descended from storm-wracked skies.",
    "Its T-shaped visor glowed with malevolent red light.",
    "Energy blasts erupted from its gauntlets, devastating the outpost.",
    "Warriors fought bravely but were outmatched by the enforcer.",
    "From the Citadel, AVAXIM watched the destructive advance.",
    "It seeks not just to conquer, but to break our spirit.",
    "Then it will fail, the Emperor declared with cold fire.",
    "He rose from his throne, power surging around him.",
    "Prepare the defenses. The Emperor is going to war."
  ],
  4: [
    "In the depths of a fractured laboratory, Dr. Malgrave plotted.",
    "His cold calculations had found weakness in Avalora's defenses.",
    "The network's harmony could be turned into discord.",
    "With surgical precision, he began his digital assault.",
    "Each strike was calculated, methodical, devastating.",
    "The very foundations of reality began to crack.",
    "But even the best plans have unexpected variables.",
    "And AVALORA had guardians Dr. Malgrave had not accounted for."
  ],
  5: [
    "The final confrontation approached as all forces converged.",
    "Heroes and villains, order and chaos, all would be decided.",
    "In the heart of the Avaland Citadel, the ultimate battle began.",
    "The fate of the eternal winter realm hung in the balance.",
    "Would AVALORA survive, or would darkness consume all?",
    "Only the bravest warriors could determine the outcome.",
    "The legend of AVALORA would be written in this moment.",
    "Victory or defeat - everything depended on you."
  ]
}

const chapters: Chapter[] = [
  {
    id: 0,
    title: 'Prologue: The Awakening',
    description: 'The beginning of your journey in AVALORA',
    videoIntro: '/QuestAssets/Chapter0/Chapter0Intro.mp4',
    completed: false,
    unlocked: true,
    comicPages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    unlockCost: 0,
    storyText: chapterStories[0],
    battles: [
      {
        id: 1,
        type: 'typing',
        challenge: 'Type: AVALORA',
        answer: 'AVALORA',
        reward: { gems: 10, xp: 20 },
        hero: '/Artworks-Characters/AVALANCH.png',
        villain: '/VillainAssets/MeronDevil.jpg',
        timeLimit: 30
      }
    ]
  },
  {
    id: 1,
    title: 'Chapter 1: The Crimson Realm',
    description: 'Enter the eternal winter and face your first challenge',
    videoIntro: '/QuestAssets/Chapter1/Chapter1Intro.mp4',
    completed: false,
    unlocked: false,
    comicPages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    unlockCost: 100,
    storyText: chapterStories[1],
    battles: [
      {
        id: 1,
        type: 'jumble',
        challenge: 'HCNALAVA',
        answer: 'AVALANCHE',
        reward: { gems: 15, xp: 30 },
        hero: '/Artworks-Characters/AVALANCH.png',
        villain: '/VillainAssets/MeronDevil.jpg',
        timeLimit: 30
      },
      {
        id: 2,
        type: 'trivia',
        challenge: 'What is the name of the eternal winter realm?',
        answer: 'AVALORA',
        options: ['AVALORA', 'ETHEREUM', 'BITCOIN', 'SOLANA'],
        reward: { gems: 20, xp: 40 },
        hero: '/Artworks-Characters/AVALANCH.png',
        villain: '/VillainAssets/MeronDevil.jpg',
        timeLimit: 45
      },
      {
        id: 3,
        type: 'trivia',
        challenge: 'AVALORA is inspired by which blockchain token?',
        answer: 'AVAX',
        options: ['AVAX', 'ETH'],
        reward: { gems: 25, xp: 50 },
        hero: '/Artworks-Characters/AVALANCH.png',
        villain: '/VillainAssets/MeronDevil.jpg',
        timeLimit: 60
      }
    ]
  },
  {
    id: 2,
    title: 'Chapter 2: The Shadow Blade',
    description: 'Cutter faces the temptation of Lady Virexia',
    videoIntro: '/QuestAssets/Chapter2/Chapter2.mp4',
    completed: false,
    unlocked: false,
    comicPages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    unlockCost: 200,
    storyText: chapterStories[2],
    battles: [
      {
        id: 1,
        type: 'typing',
        challenge: 'Type: CUTTER',
        answer: 'CUTTER',
        reward: { gems: 20, xp: 40 },
        hero: '/Artworks-Characters/Cutter.png',
        villain: '/VillainAssets/MeronWitch.jpg',
        timeLimit: 25
      },
      {
        id: 2,
        type: 'jumble',
        challenge: 'DOHWASS',
        answer: 'SHADOWS',
        reward: { gems: 25, xp: 50 },
        hero: '/Artworks-Characters/Cutter.png',
        villain: '/VillainAssets/MeronWitch.jpg',
        timeLimit: 30
      },
      {
        id: 3,
        type: 'trivia',
        challenge: 'What is Cutter\'s specialty?',
        answer: 'Digital Blades',
        options: ['Digital Blades', 'Fire Magic', 'Ice Powers', 'Lightning'],
        reward: { gems: 30, xp: 60 },
        hero: '/Artworks-Characters/Cutter.png',
        villain: '/VillainAssets/MeronWitch.jpg',
        timeLimit: 45
      }
    ]
  },
  {
    id: 3,
    title: 'Chapter 3: The Crimson Sentinel',
    description: 'Face the devastating war machine from the skies',
    videoIntro: '/QuestAssets/Chapter3/Chapter3.mp4',
    completed: false,
    unlocked: false,
    comicPages: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    unlockCost: 300,
    storyText: chapterStories[3],
    battles: [
      {
        id: 1,
        type: 'typing',
        challenge: 'Type: SENTINEL',
        answer: 'SENTINEL',
        reward: { gems: 25, xp: 50 },
        hero: '/Artworks-Characters/AVAXIM - EMPEROR OF AVALAND.png',
        villain: '/VillainAssets/MeronEmperor.jpg',
        timeLimit: 20
      },
      {
        id: 2,
        type: 'trivia',
        challenge: 'What color is the Sentinel\'s visor?',
        answer: 'Red',
        options: ['Red', 'Blue', 'Green', 'Purple'],
        reward: { gems: 30, xp: 60 },
        hero: '/Artworks-Characters/AVAXIM - EMPEROR OF AVALAND.png',
        villain: '/VillainAssets/MeronEmperor.jpg',
        timeLimit: 40
      },
      {
        id: 3,
        type: 'jumble',
        challenge: 'EPMRERO',
        answer: 'EMPEROR',
        reward: { gems: 35, xp: 70 },
        hero: '/Artworks-Characters/AVAXIM - EMPEROR OF AVALAND.png',
        villain: '/VillainAssets/MeronEmperor.jpg',
        timeLimit: 35
      }
    ]
  },
  {
    id: 4,
    title: 'Chapter 4: The Mad Scientist',
    description: 'Dr. Malgrave\'s calculated assault on reality',
    videoIntro: '/QuestAssets/Chapter4/Chapter4.mp4',
    completed: false,
    unlocked: false,
    comicPages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    unlockCost: 400,
    storyText: chapterStories[4],
    battles: [
      {
        id: 1,
        type: 'math',
        challenge: 'Calculate: 25 + 15 = ?',
        answer: '40',
        reward: { gems: 30, xp: 60 },
        hero: '/Artworks-Characters/AVALANCH.png',
        villain: '/VillainAssets/MeronWizard.jpg',
        timeLimit: 30
      },
      {
        id: 2,
        type: 'trivia',
        challenge: 'What does Dr. Malgrave seek to turn harmony into?',
        answer: 'Discord',
        options: ['Discord', 'Peace', 'Love', 'Order'],
        reward: { gems: 35, xp: 70 },
        hero: '/Artworks-Characters/AVALANCH.png',
        villain: '/VillainAssets/MeronWizard.jpg',
        timeLimit: 45
      },
      {
        id: 3,
        type: 'typing',
        challenge: 'Type: LABORATORY',
        answer: 'LABORATORY',
        reward: { gems: 40, xp: 80 },
        hero: '/Artworks-Characters/AVALANCH.png',
        villain: '/VillainAssets/MeronWizard.jpg',
        timeLimit: 25
      }
    ]
  },
  {
    id: 5,
    title: 'Chapter 5: The Final Battle',
    description: 'The ultimate confrontation for AVALORA\'s fate',
    videoIntro: '/QuestAssets/Chapter5/Chapter5.mp4',
    completed: false,
    unlocked: false,
    comicPages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    unlockCost: 500,
    storyText: chapterStories[5],
    battles: [
      {
        id: 1,
        type: 'typing',
        challenge: 'Type: FINAL BATTLE',
        answer: 'FINAL BATTLE',
        reward: { gems: 40, xp: 80 },
        hero: '/Artworks-Characters/AVAXIM - EMPEROR OF AVALAND.png',
        villain: '/VillainAssets/MeronDragon.jpg',
        timeLimit: 20
      },
      {
        id: 2,
        type: 'trivia',
        challenge: 'Where does the final battle take place?',
        answer: 'Avaland Citadel',
        options: ['Avaland Citadel', 'Mountain Dojo', 'Laboratory', 'Valley'],
        reward: { gems: 45, xp: 90 },
        hero: '/Artworks-Characters/AVAXIM - EMPEROR OF AVALAND.png',
        villain: '/VillainAssets/MeronDragon.jpg',
        timeLimit: 50
      },
      {
        id: 3,
        type: 'jumble',
        challenge: 'NDGELE',
        answer: 'LEGEND',
        reward: { gems: 50, xp: 100 },
        hero: '/Artworks-Characters/AVAXIM - EMPEROR OF AVALAND.png',
        villain: '/VillainAssets/MeronDragon.jpg',
        timeLimit: 30
      }
    ]
  }
]

export default function QuestPage() {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [gamePhase, setGamePhase] = useState<'home' | 'video' | 'comic' | 'battle'>('home')
  const [currentComicPage, setCurrentComicPage] = useState(0)
  const [currentBattle, setCurrentBattle] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [battleResult, setBattleResult] = useState<'win' | 'lose' | null>(null)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isActive, setIsActive] = useState(false)
  const [battleAttempts, setBattleAttempts] = useState(0)
  const [dailyAttempts, setDailyAttempts] = useState(3)
  const [showReward, setShowReward] = useState(false)
  const [rewardData, setRewardData] = useState({ xp: 0, gems: 0 })
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const { gameState, updateGameState } = useGame()
  const router = useRouter()

  const chapter = chapters[currentChapter]
  const battle = chapter?.battles?.[currentBattle]

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

  const startQuest = () => {
    if (currentChapter === 0) {
      // Chapter 0 - just play video and mark as completed
      setGamePhase('video')
    } else {
      // Other chapters - play video then show comic
      setGamePhase('video')
    }
  }

  const onVideoEnd = () => {
    // Show comic for all chapters including Chapter 0
    setGamePhase('comic')
    setCurrentComicPage(0)
  }

  const nextComicPage = () => {
    if (chapter?.comicPages && currentComicPage < chapter.comicPages.length - 1) {
      setCurrentComicPage(currentComicPage + 1)
    } else {
      // Comic finished
      setGamePhase('home')
      chapter!.completed = true
      
      // Special handling for Chapter 0 - unlock Chapter 1
      if (currentChapter === 0) {
        chapters[1].unlocked = true
      }
    }
  }

  const prevComicPage = () => {
    if (currentComicPage > 0) {
      setCurrentComicPage(currentComicPage - 1)
    }
  }

  const enterBattle = () => {
    if (dailyAttempts <= 0) {
      alert('You have no battle attempts left today!')
      return
    }
    // Reset all battle state
    setGamePhase('battle')
    setCurrentBattle(0)
    setUserInput('')
    setSelectedOption('')
    setBattleResult(null)
    setIsActive(true)
    setTimeLeft(chapter?.battles?.[0]?.timeLimit || 30)
    setBattleAttempts(0)
  }

  const handleBattleEnd = (won: boolean) => {
    console.log('Battle ending with result:', won)
    setIsActive(false)
    setBattleResult(won ? 'win' : 'lose')
    
    if (won) {
      const updatedPlayer = {
        ...gameState.player,
        gems: gameState.player.gems + battle!.reward.gems,
        xp: gameState.player.xp + battle!.reward.xp
      }
      
      updateGameState({
        ...gameState,
        player: updatedPlayer
      })

      setRewardData({ xp: battle!.reward.xp, gems: battle!.reward.gems })
      setShowReward(true)
      setTimeout(() => setShowReward(false), 3000)
    } else {
      setBattleAttempts(prev => prev + 1)
      if (battleAttempts >= 2) {
        setDailyAttempts(prev => prev - 1)
        setGamePhase('home')
        setBattleAttempts(0)
      }
    }
  }

  const checkAnswer = () => {
    if (!battle) return
    
    console.log('Checking answer for battle:', battle.type, 'User input:', userInput, 'Selected option:', selectedOption)
    
    let isCorrect = false
    const answer = Array.isArray(battle.answer) ? battle.answer[0] : battle.answer
    
    switch (battle.type) {
      case 'typing':
        isCorrect = userInput.toUpperCase() === answer.toUpperCase()
        console.log('Typing check:', userInput.toUpperCase(), 'vs', answer.toUpperCase(), '=', isCorrect)
        break
      case 'jumble':
        isCorrect = userInput.toUpperCase() === answer.toUpperCase()
        console.log('Jumble check:', userInput.toUpperCase(), 'vs', answer.toUpperCase(), '=', isCorrect)
        break
      case 'trivia':
        isCorrect = selectedOption === answer
        console.log('Trivia check:', selectedOption, 'vs', answer, '=', isCorrect)
        break
      case 'math':
        isCorrect = userInput === answer
        console.log('Math check:', userInput, 'vs', answer, '=', isCorrect)
        break
    }
    
    console.log('Final result:', isCorrect)
    handleBattleEnd(isCorrect)
  }

  const nextBattle = () => {
    if (chapter?.battles && currentBattle < chapter.battles.length - 1) {
      setCurrentBattle(currentBattle + 1)
      setUserInput('')
      setSelectedOption('')
      setBattleResult(null)
      setTimeLeft(chapter.battles[currentBattle + 1]?.timeLimit || 30)
      setIsActive(true)
    } else {
      // All battles completed, unlock next chapter
      if (currentChapter < chapters.length - 1) {
        chapters[currentChapter + 1].unlocked = true
      }
      setGamePhase('home')
      setCurrentBattle(0)
    }
  }

  const retryBattle = () => {
    setUserInput('')
    setSelectedOption('')
    setBattleResult(null)
    setTimeLeft(battle?.timeLimit || 30)
    setIsActive(true)
  }

  // Quest Home Page
  if (gamePhase === 'home') {
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
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-80" />
        
        {/* Anime floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${4 + Math.random() * 6}s`
              }}
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-pulse" />
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
                <h3 className="text-2xl font-bold text-white mb-2">Victory!</h3>
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex items-center">
                    <Star className="w-6 h-6 text-white mr-2" />
                    <span className="text-xl font-bold text-white">+{rewardData.xp} XP</span>
                  </div>
                  <div className="flex items-center">
                    <Gem className="w-6 h-6 text-white mr-2" />
                    <span className="text-xl font-bold text-white">+{rewardData.gems} Gems</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <SimpleNav currentPage="Quest Chronicles" />
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-6xl font-manga font-bold text-white mb-4">
              <span className="smoky-text">Quest Chronicles</span>
            </h1>
            <p className="text-xl text-gray-300">
              Embark on legendary adventures through the realms of AVALORA
            </p>
          </motion.div>

          {/* Player Stats */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 rounded-2xl p-4 mb-8 border-2 border-purple-400 shadow-lg shadow-purple-500/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Heart className="w-6 h-6 text-red-400 mr-2" />
                  <span className="text-white font-bold">{gameState.player.hp}/{gameState.player.maxHp}</span>
                </div>
                <div className="flex items-center">
                  <Gem className="w-6 h-6 text-blue-400 mr-2" />
                  <span className="text-white font-bold">{gameState.player.gems}</span>
                </div>
                <div className="flex items-center">
                  <Sword className="w-6 h-6 text-yellow-400 mr-2" />
                  <span className="text-white font-bold">Attempts: {dailyAttempts}/3</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-bold">{gameState.player.name}</div>
                <div className="text-gray-400 text-sm">Level {gameState.player.level}</div>
              </div>
            </div>
          </motion.div>

          {/* Chapter Selection */}
          <div className="grid gap-6 max-w-4xl mx-auto">
            {chapters.map((chap, index) => (
              <motion.div
                key={chap.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 rounded-2xl border-2 transition-all duration-300 ${
                  chap.unlocked
                    ? chap.completed
                      ? 'border-green-400 bg-gradient-to-br from-green-500/20 to-emerald-500/20 shadow-lg shadow-green-500/20'
                      : 'border-blue-400 bg-gradient-to-br from-blue-500/20 to-purple-500/20 shadow-lg shadow-blue-500/20'
                    : 'border-gray-700 bg-gradient-to-br from-gray-900/50 to-black/50 opacity-60'
                }`}
              >
                {/* Chapter Status Icon */}
                <div className="absolute top-4 right-4">
                  {chap.completed ? (
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  ) : chap.unlocked ? (
                    <Play className="w-8 h-8 text-blue-400" />
                  ) : (
                    <Lock className="w-8 h-8 text-gray-500" />
                  )}
                </div>

                <div className="mb-6">
                  <h3 className={`text-3xl font-bold mb-2 ${chap.unlocked ? 'text-white' : 'text-gray-500'}`}>
                    {chap.title}
                  </h3>
                  <p className={`text-lg ${chap.unlocked ? 'text-gray-300' : 'text-gray-600'}`}>
                    {chap.description}
                  </p>
                </div>

                {chap.unlocked && (
                  <div className="flex justify-between items-center">
                    <motion.button
                      onClick={() => {
                        setCurrentChapter(chap.id)
                        startQuest()
                      }}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {chap.completed ? 'Replay Quest' : 'Start Quest'}
                      <div className="ml-2 text-sm opacity-75">
                        Chapter {chap.id}
                      </div>
                    </motion.button>

                    {chap.completed && chap.battles && (
                      <motion.button
                        onClick={() => {
                          setCurrentChapter(chap.id)
                          enterBattle()
                        }}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={dailyAttempts <= 0}
                      >
                        <Sword className="w-5 h-5 mr-2" />
                        Enter Battle
                      </motion.button>
                    )}
                  </div>
                )}

                {/* Chapter completion tooltip */}
                {chap.completed && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    CHAPTER {chap.id} - {chap.id === 0 ? 'INTRO' : 'QUEST'} COMPLETED
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Video Intro Phase
  if (gamePhase === 'video') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-full relative"
        >
          <video
            ref={videoRef}
            autoPlay
            className="w-full h-full object-cover"
            onEnded={onVideoEnd}
          >
            <source src={chapter?.videoIntro} type="video/mp4" />
          </video>
          
          {/* Skip button */}
          <motion.button
            onClick={onVideoEnd}
            className="absolute top-4 right-4 bg-black/50 text-white px-4 py-2 rounded-lg hover:bg-black/70 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Skip Intro
          </motion.button>
        </motion.div>
      </div>
    )
  }

  // Comic Phase
  if (gamePhase === 'comic' && chapter?.comicPages) {
    return (
      <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
        {/* Paper texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/5 to-yellow-100/5" />
        
        {/* Fixed Navigation Header */}
        <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-600 p-4">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <motion.button
              onClick={() => setGamePhase('home')}
              className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              ← Exit Comic
            </motion.button>
            
            <div className="text-white font-bold">
              Page {currentComicPage + 1} / {chapter.comicPages.length}
            </div>
            
            <div className="flex space-x-2">
              <motion.button
                onClick={prevComicPage}
                disabled={currentComicPage === 0}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                onClick={nextComicPage}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Scrollable Comic Content */}
        <div className="flex-1 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto p-4"
          >
            {/* Comic Panel */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl relative overflow-hidden mb-8">
              {/* Manga-style border */}
              <div className="absolute inset-2 border-4 border-black rounded-xl" />
              
              {/* Comic Image - Full viewport optimized */}
              <div className="relative z-10 mb-6">
                <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={`/QuestAssets/Chapter${currentChapter}/${chapter.comicPages[currentComicPage]}.png`}
                    alt={`Comic Page ${currentComicPage + 1}`}
                    fill
                    className="object-contain rounded-lg"
                    priority
                  />
                </div>
              </div>

              {/* Story Text */}
              <div className="relative z-10 bg-white/90 p-6 rounded-lg border-2 border-black">
                <p className="text-lg text-black leading-relaxed font-serif">
                  {chapter?.storyText?.[currentComicPage] || "The story continues..."}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fixed Bottom Navigation */}
        <div className="sticky bottom-0 z-50 bg-black/90 backdrop-blur-sm border-t border-gray-600 p-4">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <motion.button
              onClick={prevComicPage}
              disabled={currentComicPage === 0}
              className="flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </motion.button>

            <div className="text-white font-bold text-lg">
              {currentComicPage + 1} / {chapter.comicPages.length}
            </div>

            <motion.button
              onClick={nextComicPage}
              className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentComicPage === chapter.comicPages.length - 1 ? 'Finish' : 'Next'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </motion.button>
          </div>
        </div>

        {/* Page turn effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent transform rotate-45 translate-x-16 -translate-y-16" />
        </div>
      </div>
    )
  }

  // Battle Phase
  if (gamePhase === 'battle' && battle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-purple-900 p-4">
        <div className="container mx-auto max-w-6xl">
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

          {/* Battle Arena - Hero vs Villain */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Hero Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-400 rounded-2xl p-6 text-center"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-4">HERO</h3>
              <Image
                src={battle.hero}
                alt="Hero"
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="text-white font-bold">AVALANCH</div>
              <div className="text-blue-300">Ambassador of AVALORA</div>
            </motion.div>

            {/* Battle Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-2 border-yellow-400 rounded-2xl p-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                  Battle {currentBattle + 1}/{chapter?.battles?.length || 1}
                </h2>
                <div className="text-xl text-white mb-4">
                  {battle.type === 'typing' && 'Type the Word'}
                  {battle.type === 'jumble' && 'Unscramble the Word'}
                  {battle.type === 'trivia' && 'Answer the Question'}
                  {battle.type === 'math' && 'Solve the Equation'}
                </div>
                <div className="text-lg text-gray-300 mb-6 p-4 bg-black/50 rounded-lg">
                  {battle.challenge}
                </div>
              </div>

              {!battleResult && (
                <div className="space-y-4">
                  {battle.type === 'trivia' && battle.options ? (
                    <div className="grid gap-3">
                      {battle.options.map((option, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setSelectedOption(option)}
                          className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                            selectedOption === option
                              ? 'border-yellow-400 bg-yellow-500/20'
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
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && userInput.trim()) {
                          checkAnswer()
                        }
                      }}
                      placeholder="Type your answer..."
                      className="w-full p-4 text-xl text-center bg-gray-800 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                      autoFocus
                    />
                  )}

                  <motion.button
                    onClick={checkAnswer}
                    disabled={
                      (battle.type === 'trivia' && !selectedOption) ||
                      (battle.type !== 'trivia' && !userInput.trim())
                    }
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Attack!
                  </motion.button>
                </div>
              )}
            </motion.div>

            {/* Villain Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-red-500/20 to-purple-500/20 border-2 border-red-400 rounded-2xl p-6 text-center"
            >
              <h3 className="text-2xl font-bold text-red-400 mb-4">VILLAIN</h3>
              <Image
                src={battle.villain}
                alt="Villain"
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="text-white font-bold">MERON DEVIL</div>
              <div className="text-red-300">Chaos Bringer</div>
            </motion.div>
          </div>

          {/* Battle Result */}
          <AnimatePresence>
            {battleResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`border-2 rounded-2xl p-8 text-center ${
                  battleResult === 'win' 
                    ? 'bg-green-900/50 border-green-400' 
                    : 'bg-red-900/50 border-red-400'
                }`}
              >
                <h3 className={`text-4xl font-bold mb-4 ${
                  battleResult === 'win' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {battleResult === 'win' ? 'Victory!' : 'Defeat!'}
                </h3>
                
                {battleResult === 'win' ? (
                  <div className="space-y-4">
                    <p className="text-xl text-white">The villain has been defeated!</p>
                    <div className="flex justify-center space-x-6">
                      <div className="flex items-center">
                        <Gem className="w-6 h-6 text-blue-400 mr-2" />
                        <span className="text-white font-bold">+{battle.reward.gems} Gems</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-6 h-6 text-yellow-400 mr-2" />
                        <span className="text-white font-bold">+{battle.reward.xp} XP</span>
                      </div>
                    </div>
                    <motion.button
                      onClick={nextBattle}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all duration-300 flex items-center mx-auto"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {chapter?.battles && currentBattle < chapter.battles.length - 1 ? 'Next Battle' : 'Victory!'}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-xl text-white">
                      The villain's power overwhelms you! 
                      {battleAttempts < 2 ? ' Try again!' : ' You must retreat and try tomorrow.'}
                    </p>
                    <div className="flex justify-center space-x-4">
                      {battleAttempts < 2 ? (
                        <motion.button
                          onClick={retryBattle}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all duration-300 flex items-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <RotateCcw className="w-5 h-5 mr-2" />
                          Retry ({2 - battleAttempts} attempts left)
                        </motion.button>
                      ) : (
                        <motion.button
                          onClick={() => setGamePhase('home')}
                          className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Return to Quests
                        </motion.button>
                      )}
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

  return null
}