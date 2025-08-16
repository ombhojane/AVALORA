'use client';

import { useEnhancedAuth } from '@/hooks/useEnhancedAuth';
import { useState } from 'react';

export default function WalletCreation() {
  const { 
    isWalletCreating, 
    walletCreationStep, 
    createEmbeddedWallet, 
    userPreferredLogin 
  } = useEnhancedAuth();
  
  const [error, setError] = useState<string | null>(null);

  const handleCreateWallet = async () => {
    setError(null);
    try {
      await createEmbeddedWallet();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create wallet');
    }
  };

  if (walletCreationStep === 'created') {
    return (
      <div className="bg-green-500/20 rounded-xl border border-green-500/30 p-6">
        <div className="text-center">
          <div className="text-green-300 text-3xl mb-3">✅</div>
          <h3 className="text-lg font-semibold text-white mb-2">Wallet Ready!</h3>
          <p className="text-white/60 text-sm">
            Your Avalanche wallet has been created successfully.
          </p>
        </div>
      </div>
    );
  }

  if (walletCreationStep === 'failed') {
    return (
      <div className="bg-red-500/20 rounded-xl border border-red-500/30 p-6">
        <div className="text-center">
          <div className="text-red-300 text-3xl mb-3">❌</div>
          <h3 className="text-lg font-semibold text-white mb-2">Wallet Creation Failed</h3>
          <p className="text-white/60 text-sm mb-4">
            {error || 'There was an error creating your wallet. Please try again.'}
          </p>
          <button
            onClick={handleCreateWallet}
            disabled={isWalletCreating}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white text-sm font-medium rounded-md transition-colors"
          >
            {isWalletCreating ? 'Creating...' : 'Try Again'}
          </button>
        </div>
      </div>
    );
  }

  if (walletCreationStep === 'external') {
    return (
      <div className="bg-blue-500/20 rounded-xl border border-blue-500/30 p-6">
        <div className="text-center">
          <div className="text-blue-300 text-3xl mb-3">🔗</div>
          <h3 className="text-lg font-semibold text-white mb-2">External Wallet Detected</h3>
          <p className="text-white/60 text-sm">
            You connected with an external wallet. You can use this wallet or create a new embedded wallet.
          </p>
        </div>
      </div>
    );
  }

  if (walletCreationStep === 'checking') {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-3"></div>
          <h3 className="text-lg font-semibold text-white mb-2">Checking Wallet Status</h3>
          <p className="text-white/60 text-sm">
            Verifying your wallet configuration...
          </p>
        </div>
      </div>
    );
  }

  // Show wallet creation prompt for off-chain login methods
  const isOffChainLogin = userPreferredLogin && ['google', 'github', 'email', 'phone'].includes(userPreferredLogin);

  if (!isOffChainLogin) {
    return null; // Don't show wallet creation for direct wallet connections
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
      <div className="text-center">
        <div className="text-white/60 text-3xl mb-3">🏦</div>
        <h3 className="text-lg font-semibold text-white mb-2">Create Avalanche Wallet</h3>
        <p className="text-white/60 text-sm mb-6">
          You logged in with {userPreferredLogin}. To interact with Avalanche dApps, 
          you need an Avalanche wallet. We can create a secure embedded wallet for you.
        </p>
        
        <button
          onClick={handleCreateWallet}
          disabled={isWalletCreating}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-medium rounded-md transition-colors"
        >
          {isWalletCreating ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creating Wallet...
            </div>
          ) : (
            'Create Wallet'
          )}
        </button>
        
        {error && (
          <p className="text-red-300 text-sm mt-3">{error}</p>
        )}
      </div>
    </div>
  );
}
