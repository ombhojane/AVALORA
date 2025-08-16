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

  // This effect is now handled in the auth page to control the flow better

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
    <div className="space-y-4">
      <button
        onClick={handleLogin}
        className="w-full px-6 py-4 bg-gradient-to-r from-avalanche-red to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center"
      >
        <span className="mr-2">🚀</span>
        Connect to AVALORA
      </button>
      
      <div className="text-center text-gray-400 text-sm">
        <p>Choose from multiple connection options:</p>
        <div className="flex justify-center space-x-4 mt-2">
          <span>🔗 MetaMask</span>
          <span>📧 Email</span>
          <span>🔍 Google</span>
        </div>
      </div>
    </div>
  );
}
