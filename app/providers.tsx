'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import PrivyProviderWrapper from '@/components/providers/privy-provider'

interface GameState {
  player: {
    name: string
    level: number
    hp: number
    maxHp: number
    gems: number
    xp: number
    avatar: string
  }
  isAuthenticated: boolean
  currentChapter: number
}

interface GameContextType {
  gameState: GameState
  updateGameState: (updates: Partial<GameState>) => void
  login: (playerData: any) => void
  logout: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

const initialGameState: GameState = {
  player: {
    name: 'Warrior',
    level: 1,
    hp: 100,
    maxHp: 100,
    gems: 0,
    xp: 0,
    avatar: '/Artworks-Characters/MainCharacter.png'
  },
  isAuthenticated: false,
  currentChapter: 1
}

function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(initialGameState)

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }))
  }

  const login = (playerData: any) => {
    console.log('Game login called with:', playerData)
    setGameState(prev => {
      const newState = {
        ...prev,
        isAuthenticated: true,
        player: { ...prev.player, ...playerData }
      }
      console.log('Game state updated:', newState)
      return newState
    })
  }

  const logout = () => {
    setGameState(initialGameState)
  }

  return (
    <GameContext.Provider value={{ gameState, updateGameState, login, logout }}>
      {children}
    </GameContext.Provider>
  )
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PrivyProviderWrapper>
      <GameProvider>
        {children}
      </GameProvider>
    </PrivyProviderWrapper>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}