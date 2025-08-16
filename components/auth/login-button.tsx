'use client';

import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useEnhancedAuth } from '@/hooks/useEnhancedAuth';
import { useGame } from '@/app/providers';

export default function LoginButton() {
  const { login, logout, authenticated, ready } = usePrivy();
  const { isAuthenticated, hasAvalancheWallet, walletCreationStep } = useEnhancedAuth();
  const { gameState, login: gameLogin, logout: gameLogout } = useGame();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      gameLogout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Auto-login to game when Privy authentication is complete and wallet is ready
  React.useEffect(() => {
    if (ready && authenticated && hasAvalancheWallet && !gameState.isAuthenticated) {
      gameLogin({
        name: 'Avalanche Warrior',
        level: 1,
        hp: 100,
        maxHp: 100,
        gems: 0,
        xp: 0,
        avatar: '/Artworks-Characters/MainCharacter.png'
      });
    }
  }, [ready, authenticated, hasAvalancheWallet, gameState.isAuthenticated, gameLogin]);

  if (!ready) {
    return (
      <button
        disabled
        className="px-6 py-3 bg-gray-500 text-white font-medium rounded-md opacity-50 cursor-not-allowed"
      >
        Loading...
      </button>
    );
  }

  if (authenticated) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-white/80 text-sm">
          {walletCreationStep === 'created' ? '✅ Wallet Ready' : '🔄 Setting up...'}
        </div>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition-colors"
    >
      Connect Wallet
    </button>
  );
}
