'use client';

import { useWallets, usePrivy } from '@privy-io/react-auth';
import { useCallback, useState, useEffect } from 'react';
import { avalanche, avalancheFuji } from 'viem/chains';
import { getNetworkInfo, formatAVAXBalance, getExplorerUrl } from '@/lib/wallet-utils';

export interface WalletInfo {
  address: string;
  balance: string;
  balanceFormatted: string;
  network: 'mainnet' | 'fuji' | 'other';
  networkName: string;
  isEmbedded: boolean;
  chainId: string;
  explorerUrl: string;
}

export const useAvalancheWallet = () => {
  const { wallets } = useWallets();
  const { ready, authenticated } = usePrivy();
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the primary wallet (embedded wallet preferred)
  const getPrimaryWallet = useCallback(() => {
    // For direct wallet connections, use the first wallet
    if (wallets.length > 0) {
      return wallets[0];
    }
    
    return null;
  }, [wallets]);

  // Fetch AVAX balance for a given address
  const fetchBalance = useCallback(async (address: string, chainId: string): Promise<string> => {
    try {
      const networkInfo = getNetworkInfo(chainId);
      if (!networkInfo) {
        throw new Error('Unsupported network');
      }

      // Try the primary RPC endpoint
      try {
        const response = await fetch(networkInfo.rpcUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_getBalance',
            params: [address, 'latest'],
            id: 1,
          }),
        });

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error.message);
        }

        return formatAVAXBalance(data.result);
      } catch (primaryError) {
        // Fallback to Avalanche's official RPC
        const fallbackUrl = chainId.includes('43114') 
          ? 'https://api.avax.network/ext/bc/C/rpc'
          : 'https://api.avax-test.network/ext/bc/C/rpc';
          
        const fallbackResponse = await fetch(fallbackUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_getBalance',
            params: [address, 'latest'],
            id: 1,
          }),
        });

        const fallbackData = await fallbackResponse.json();
        
        if (fallbackData.error) {
          throw new Error(fallbackData.error.message);
        }

        return formatAVAXBalance(fallbackData.result);
      }
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      return '0.0000';
    }
  }, []);

  // Get comprehensive wallet information
  const getWalletInfo = useCallback(async (): Promise<WalletInfo | null> => {
    const wallet = getPrimaryWallet();
    if (!wallet) {
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const address = wallet.address;
      const chainId = wallet.chainId;
      // For direct wallet connections, they're not embedded
      const isEmbedded = false;

      // Get network information
      const networkInfo = getNetworkInfo(chainId);
      let network: 'mainnet' | 'fuji' | 'other';
      let networkName: string;
      let explorerUrl: string;

      if (networkInfo) {
        network = networkInfo.isTestnet ? 'fuji' : 'mainnet';
        networkName = networkInfo.name;
        explorerUrl = getExplorerUrl(address, network);
      } else {
        network = 'other';
        networkName = 'Other Network';
        explorerUrl = '';
      }

      // Fetch balance
      const balance = await fetchBalance(address, chainId);
      const balanceFormatted = `${balance} AVAX`;

      const info: WalletInfo = {
        address,
        balance,
        balanceFormatted,
        network,
        networkName,
        isEmbedded,
        chainId,
        explorerUrl,
      };

      setWalletInfo(info);
      return info;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get wallet info';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [getPrimaryWallet, fetchBalance]);

  // Auto-refresh wallet info when wallet changes
  useEffect(() => {
    if (ready && authenticated && wallets.length > 0) {
      getWalletInfo();
    } else {
      setWalletInfo(null);
    }
  }, [ready, authenticated, wallets.length]);

  // Refresh balance manually
  const refreshBalance = useCallback(async () => {
    if (walletInfo) {
      setIsLoading(true);
      try {
        const newBalance = await fetchBalance(walletInfo.address, walletInfo.chainId);
        setWalletInfo(prev => prev ? {
          ...prev,
          balance: newBalance,
          balanceFormatted: `${newBalance} AVAX`
        } : null);
      } catch {
        setError('Failed to refresh balance');
      } finally {
        setIsLoading(false);
      }
    }
  }, [walletInfo, fetchBalance]);

  // Check if user has an Avalanche wallet
  const hasAvalancheWallet = useCallback(() => {
    return walletInfo && (walletInfo.network === 'mainnet' || walletInfo.network === 'fuji');
  }, [walletInfo]);

  // Get wallet creation status
  const getWalletCreationStatus = useCallback(() => {
    if (wallets.length === 0) return 'no-wallet';
    if (hasAvalancheWallet()) return 'avalanche-ready';
    return 'needs-switch';
  }, [wallets.length, hasAvalancheWallet]);

  return {
    walletInfo,
    isLoading,
    error,
    refreshBalance,
    getWalletInfo,
    hasAvalancheWallet: hasAvalancheWallet(),
    primaryWallet: getPrimaryWallet(),
    walletCreationStatus: getWalletCreationStatus(),
  };
};
