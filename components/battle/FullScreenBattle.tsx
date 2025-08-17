'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sword, Shield, Heart, Zap, Star, Crown, Flame, 
  Target, Clock, Trophy, X, RotateCcw 
} from 'lucide-react'
import Image from 'next/image'

interface BattleCharacter {
  name: string
  title: string
  image: string
  hp: number
  maxHp: number
  mp: number
  maxMp: number
  attack: number
  defense: number
  speed: number
  abilities: Ability[]
}

interface Ability {
  id: string
  name: string
  description: string
  damage: number
  mpCost: number
  cooldown: number
  type: 'attack' | 'defense' | 'special'
  animation: string
}

interface BattleProps {
  hero: BattleCharacter
  villain: BattleCharacter
  onBattleEnd: (winner: 'hero' | 'villain') => void
  onClose: () => void
}

const heroAbilities: Ability[] = [
  {
    id: 'basic-attack',
    name: 'Frost Strike',
    description: 'A basic ice-infused sword attack',
    damage: 25,
    mpCost: 0,
    cooldown: 0,
    type: 'attack',
    animation: 'slash'
  },
  {
    id: 'avalanche-slash',
    name: 'Avalanche Slash',
    description: 'Powerful ice attack that deals massive damage',
    damage: 45,
    mpCost: 20,
    cooldown: 3,
    type: 'special',
    animation: 'avalanche'
  },
  {
    id: 'ice-barrier',
    name: 'Ice Barrier',
    description: 'Creates a protective ice shield',
    damage: 0,
    mpCost: 15,
    cooldown: 4,
    type: 'defense',
    animation: 'shield'
  },
  {
    id: 'blizzard-fury',
    name: 'Blizzard Fury',
    description: 'Ultimate attack with multiple strikes',
    damage: 70,
    mpCost: 35,
    cooldown: 6,
    type: 'special',
    animation: 'blizzard'
  }
]

const villainAbilities: Ability[] = [
  {
    id: 'shadow-strike',
    name: 'Shadow Strike',
    description: 'Dark energy attack',
    damage: 30,
    mpCost: 0,
    cooldown: 0,
    type: 'attack',
    animation: 'dark-slash'
  },
  {
    id: 'corruption-wave',
    name: 'Corruption Wave',
    description: 'Spreads corrupting energy',
    damage: 40,
    mpCost: 25,
    cooldown: 4,
    type: 'special',
    animation: 'corruption'
  }
]

export default function FullScreenBattle({ hero: initialHero, villain: initialVillain, onBattleEnd, onClose }: BattleProps) {
  const [hero, setHero] = useState<BattleCharacter>({
    ...initialHero,
    abilities: heroAbilities
  })
  const [villain, setVillain] = useState<BattleCharacter>({
    ...initialVillain,
    abilities: villainAbilities
  })
  
  const [turn, setTurn] = useState<'hero' | 'villain'>('hero')
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null)
  const [battleLog, setBattleLog] = useState<string[]>([])
  const [animating, setAnimating] = useState(false)
  const [battlePhase, setBattlePhase] = useState<'select' | 'animate' | 'result'>('select')
  const [abilityCooldowns, setAbilityCooldowns] = useState<{[key: string]: number}>({})
  const [turnTimer, setTurnTimer] = useState(30)
  const [battleEffects, setBattleEffects] = useState<string[]>([])

  useEffect(() => {
    if (battlePhase === 'select' && turnTimer > 0) {
      const timer = setTimeout(() => setTurnTimer(turnTimer - 1), 1000)
      return () => clearTimeout(timer)
    } else if (turnTimer === 0) {
      // Auto-select basic attack if time runs out
      handleAbilitySelect(turn === 'hero' ? heroAbilities[0] : villainAbilities[0])
    }
  }, [turnTimer, battlePhase, turn])

  useEffect(() => {
    if (hero.hp <= 0) {
      onBattleEnd('villain')
    } else if (villain.hp <= 0) {
      onBattleEnd('hero')
    }
  }, [hero.hp, villain.hp, onBattleEnd])

  const handleAbilitySelect = async (ability: Ability) => {
    if (animating || abilityCooldowns[ability.id] > 0) return
    
    setSelectedAbility(ability)
    setBattlePhase('animate')
    setAnimating(true)
    
    // Add battle effect
    setBattleEffects([...battleEffects, ability.animation])
    
    // Calculate damage and apply effects
    setTimeout(() => {
      if (turn === 'hero') {
        if (ability.type === 'attack' || ability.type === 'special') {
          const damage = Math.max(1, ability.damage - villain.defense)
          setVillain(prev => ({ ...prev, hp: Math.max(0, prev.hp - damage) }))
          setBattleLog(prev => [...prev, `${hero.name} used ${ability.name} for ${damage} damage!`])
        } else if (ability.type === 'defense') {
          setHero(prev => ({ ...prev, defense: prev.defense + 10 }))
          setBattleLog(prev => [...prev, `${hero.name} increased defense with ${ability.name}!`])
        }
        
        // Consume MP
        setHero(prev => ({ ...prev, mp: Math.max(0, prev.mp - ability.mpCost) }))
        
        // Set cooldown
        if (ability.cooldown > 0) {
          setAbilityCooldowns(prev => ({ ...prev, [ability.id]: ability.cooldown }))
        }
      } else {
        // Villain turn (AI)
        const damage = Math.max(1, ability.damage - hero.defense)
        setHero(prev => ({ ...prev, hp: Math.max(0, prev.hp - damage) }))
        setBattleLog(prev => [...prev, `${villain.name} used ${ability.name} for ${damage} damage!`])
        setVillain(prev => ({ ...prev, mp: Math.max(0, prev.mp - ability.mpCost) }))
      }
      
      // Clear effects and switch turns
      setTimeout(() => {
        setBattleEffects([])
        setAnimating(false)
        setBattlePhase('select')
        setTurn(turn === 'hero' ? 'villain' : 'hero')
        setTurnTimer(30)
        setSelectedAbility(null)
        
        // Reduce cooldowns
        setAbilityCooldowns(prev => {
          const updated = { ...prev }
          Object.keys(updated).forEach(key => {
            if (updated[key] > 0) updated[key]--
          })
          return updated
        })
        
        // Regenerate MP
        setHero(prev => ({ ...prev, mp: Math.min(prev.maxMp, prev.mp + 5) }))
        setVillain(prev => ({ ...prev, mp: Math.min(prev.maxMp, prev.mp + 5) }))
        
      }, 1000)
    }, 2000)
  }

  // AI turn logic
  useEffect(() => {
    if (turn === 'villain' && battlePhase === 'select' && !animating) {
      setTimeout(() => {
        const availableAbilities = villainAbilities.filter(ability => 
          villain.mp >= ability.mpCost && !abilityCooldowns[ability.id]
        )
        const randomAbility = availableAbilities[Math.floor(Math.random() * availableAbilities.length)]
        handleAbilitySelect(randomAbility)
      }, 1500)
    }
  }, [turn, battlePhase, animating, villain.mp, abilityCooldowns])

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-black to-red-900">
      {/* Battle Effects Overlay */}
      <AnimatePresence>
        {battleEffects.map((effect, index) => (
          <motion.div
            key={`${effect}-${index}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            {effect === 'slash' && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent transform rotate-45" />
            )}
            {effect === 'avalanche' && (
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -100, x: Math.random() * window.innerWidth }}
                    animate={{ y: window.innerHeight + 100 }}
                    transition={{ duration: 2, delay: i * 0.1 }}
                    className="absolute w-4 h-4 bg-blue-300 rounded-full opacity-70"
                  />
                ))}
              </div>
            )}
            {effect === 'blizzard' && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-white/10 animate-pulse" />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Battle Arena */}
      <div className="h-full flex flex-col">
        {/* Top UI - Turn Timer and Battle Info */}
        <div className="flex items-center justify-center p-4 bg-black/50">
          <div className="flex items-center space-x-8">
            <div className="text-white font-bold">
              {turn === 'hero' ? 'Your Turn' : 'Enemy Turn'}
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-2xl font-bold text-white">{turnTimer}s</span>
            </div>
          </div>
        </div>

        {/* Main Battle Area */}
        <div className="flex-1 flex items-center justify-between px-8">
          {/* Hero Card */}
          <motion.div
            animate={{ 
              scale: turn === 'hero' ? 1.05 : 1,
              x: animating && turn === 'hero' ? 50 : 0
            }}
            className="relative"
          >
            <div className="w-80 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border-2 border-blue-400 shadow-2xl shadow-blue-500/30 p-6 backdrop-blur-sm">
              {/* Character Image */}
              <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                <Image
                  src={hero.image}
                  alt={hero.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              {/* Character Info */}
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-white">{hero.name}</h3>
                <p className="text-blue-300 text-sm">{hero.title}</p>
              </div>
              
              {/* Stats */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 text-red-400 mr-2" />
                    <span className="text-white text-sm">HP</span>
                  </div>
                  <span className="text-white font-bold">{hero.hp}/{hero.maxHp}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(hero.hp / hero.maxHp) * 100}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 text-blue-400 mr-2" />
                    <span className="text-white text-sm">MP</span>
                  </div>
                  <span className="text-white font-bold">{hero.mp}/{hero.maxMp}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(hero.mp / hero.maxMp) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* VS Indicator */}
          <div className="text-center">
            <motion.div
              animate={{ rotate: animating ? 360 : 0 }}
              transition={{ duration: 2 }}
              className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mb-4 shadow-2xl"
            >
              <span className="text-white font-bold text-2xl">VS</span>
            </motion.div>
            <div className="text-white font-bold">BATTLE</div>
          </div>

          {/* Villain Card */}
          <motion.div
            animate={{ 
              scale: turn === 'villain' ? 1.05 : 1,
              x: animating && turn === 'villain' ? -50 : 0
            }}
            className="relative"
          >
            <div className="w-80 h-96 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-2xl border-2 border-red-400 shadow-2xl shadow-red-500/30 p-6 backdrop-blur-sm">
              {/* Character Image */}
              <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                <Image
                  src={villain.image}
                  alt={villain.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              {/* Character Info */}
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-white">{villain.name}</h3>
                <p className="text-red-300 text-sm">{villain.title}</p>
              </div>
              
              {/* Stats */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 text-red-400 mr-2" />
                    <span className="text-white text-sm">HP</span>
                  </div>
                  <span className="text-white font-bold">{villain.hp}/{villain.maxHp}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(villain.hp / villain.maxHp) * 100}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 text-purple-400 mr-2" />
                    <span className="text-white text-sm">MP</span>
                  </div>
                  <span className="text-white font-bold">{villain.mp}/{villain.maxMp}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(villain.mp / villain.maxMp) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom UI - Abilities and Battle Log */}
        <div className="h-64 bg-black/70 p-6">
          <div className="grid grid-cols-3 gap-6 h-full">
            {/* Abilities Panel */}
            <div className="col-span-2">
              <h3 className="text-white font-bold mb-4 flex items-center">
                <Sword className="w-5 h-5 mr-2 text-yellow-400" />
                Combat Abilities
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {hero.abilities.map((ability) => {
                  const onCooldown = abilityCooldowns[ability.id] > 0
                  const canAfford = hero.mp >= ability.mpCost
                  const canUse = turn === 'hero' && !animating && canAfford && !onCooldown
                  
                  return (
                    <button
                      key={ability.id}
                      onClick={() => canUse && handleAbilitySelect(ability)}
                      disabled={!canUse}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        canUse
                          ? 'border-blue-400 bg-blue-500/20 hover:bg-blue-500/30 cursor-pointer'
                          : 'border-gray-600 bg-gray-800/50 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-bold text-sm">{ability.name}</h4>
                        <div className="flex items-center space-x-2 text-xs">
                          {ability.mpCost > 0 && (
                            <span className="text-blue-400">{ability.mpCost} MP</span>
                          )}
                          {onCooldown && (
                            <span className="text-red-400">{abilityCooldowns[ability.id]}T</span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-300 text-xs">{ability.description}</p>
                      {ability.damage > 0 && (
                        <div className="flex items-center mt-2">
                          <Sword className="w-3 h-3 text-red-400 mr-1" />
                          <span className="text-red-400 text-xs">{ability.damage} DMG</span>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
            
            {/* Battle Log */}
            <div>
              <h3 className="text-white font-bold mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                Battle Log
              </h3>
              <div className="bg-gray-900/50 rounded-xl p-4 h-40 overflow-y-auto">
                {battleLog.slice(-8).map((log, index) => (
                  <div key={index} className="text-gray-300 text-sm mb-2">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}