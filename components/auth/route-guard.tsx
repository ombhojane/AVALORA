'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { usePrivy } from '@privy-io/react-auth'
import { useEnhancedAuth } from '@/hooks/useEnhancedAuth'
import { useGame } from '@/app/providers'

interface RouteGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export default function RouteGuard({ 
  children, 
  requireAuth = false, 
  redirectTo = '/auth' 
}: RouteGuardProps) {
  const router = useRouter()
  const { ready, authenticated } = usePrivy()
  const { hasAvalancheWallet } = useEnhancedAuth()
  const { gameState } = useGame()
  const redirectingRef = useRef(false)

  useEffect(() => {
    if (!ready) return

    const isFullyAuthenticated = authenticated && hasAvalancheWallet && gameState.isAuthenticated
    console.log('Route guard check:', { 
      requireAuth, 
      isFullyAuthenticated, 
      authenticated, 
      hasAvalancheWallet, 
      gameAuthenticated: gameState.isAuthenticated,
      redirecting: redirectingRef.current 
    })
    
    // Only redirect if user is clearly not authenticated (not just waiting for game login)
    const shouldRedirect = requireAuth && !isFullyAuthenticated && !redirectingRef.current
    
    if (shouldRedirect) {
      // Add a small delay to prevent race conditions with auth page login
      const timeoutId = setTimeout(() => {
        if (!gameState.isAuthenticated && !redirectingRef.current) {
          console.log('Route guard redirecting to:', redirectTo)
          redirectingRef.current = true
          router.replace(redirectTo)
        }
      }, 500) // Give auth page time to complete login
      
      return () => clearTimeout(timeoutId)
    }
  }, [ready, authenticated, hasAvalancheWallet, gameState.isAuthenticated, requireAuth, redirectTo, router])

  // Show loading state while checking authentication
  if (!ready || (requireAuth && (!authenticated || !hasAvalancheWallet || !gameState.isAuthenticated))) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-avalanche-red mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}