'use client';

import { motion } from 'framer-motion';
import { useAvalancheWallet } from '@/hooks/useAvalancheWallet';
import { usePrivy } from '@privy-io/react-auth';
import { useGame } from '@/app/providers';

interface WalletDisplayProps {
  onNetworkSwitch?: () => void;
}

export default function WalletDisplay({ onNetworkSwitch }: WalletDisplayProps) {
  const { 
    walletInfo, 
    isLoading, 
    error, 
    refreshBalance, 
    hasAvalancheWallet 
  } = useAvalancheWallet();
  
  const { logout } = usePrivy();
  const { logout: gameLogout } = useGame();



  const handleDisconnect = async () => {
    try {
      await logout();
      gameLogout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleAddFunds = () => {
    // Open faucet for testnet or exchange for mainnet
    if (walletInfo?.network === 'fuji') {
      window.open('https://faucet.avax.network/', '_blank');
    } else {
      window.open('https://www.coinbase.com/buy/avalanche', '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-purple-400 shadow-lg shadow-purple-500/20 min-w-[280px]">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-600 rounded w-1/3 mb-4"></div>
          <div className="h-8 bg-gray-600 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error || !walletInfo) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-red-400 shadow-lg shadow-red-500/20 min-w-[280px]">
        <div className="text-center">
          <div className="text-red-400 mb-2">❌</div>
          <h3 className="text-lg font-semibold text-white mb-2">Wallet Error</h3>
          <p className="text-red-300 text-sm mb-4">{error || 'No wallet connected'}</p>
          <button
            onClick={refreshBalance}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-purple-400 shadow-lg shadow-purple-500/20 min-w-[280px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center">
          <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse" />
          Wallet Connected
        </h3>
        <div className="w-6 h-6 border-l-2 border-t-2 border-purple-400 opacity-60" />
      </div>
      
      <div className="space-y-3">
        <div className="bg-purple-500/10 border border-purple-400/30 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <span className="text-purple-300 text-sm">AVAX Balance</span>
            <span className="text-white font-bold">
              {hasAvalancheWallet ? walletInfo.balanceFormatted : '0.0000 AVAX'}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddFunds}
            className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-2 px-3 rounded-lg text-sm transition-all duration-300"
          >
            Add Funds
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDisconnect}
            className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-3 rounded-lg text-sm transition-all duration-300"
          >
            Disconnect
          </motion.button>
        </div>
      </div>
    </div>
  );
}
