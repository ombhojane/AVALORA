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

  // Get the primary wallet (embedded wallet preferred, like backend)
  const getPrimaryWallet = useCallback(() => {
    if (wallets.length === 0) return null;
    
    // Prefer embedded wallet (like backend logic)
    const embeddedWallet = wallets.find(wallet => wallet.walletClientType === 'privy');
    const externalWallet = wallets.find(wallet => wallet.walletClientType !== 'privy');
    
    return embeddedWallet || externalWallet || wallets[0];
  }, [wallets]);

  // Fetch AVAX balance for a given address
  const fetchBalance = useCallback(async (address: string, chainId: string): Promise<string> => {
    console.log('fetchBalance called with:', { address, chainId });
    
    try {
      const networkInfo = getNetworkInfo(chainId);
      console.log('Network info:', networkInfo);
      
      if (!networkInfo) {
        console.error('Unsupported network for chainId:', chainId);
        throw new Error(`Unsupported network: ${chainId}`);
      }

      // Try the primary RPC endpoint
      console.log('Trying primary RPC:', networkInfo.rpcUrl);
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
        console.log('RPC response:', data);
        
        if (data.error) {
          console.error('RPC error:', data.error);
          throw new Error(data.error.message);
        }

        const formattedBalance = formatAVAXBalance(data.result);
        console.log('Formatted balance:', formattedBalance);
        return formattedBalance;
      } catch (primaryError) {
        console.warn('Primary RPC failed, trying fallback:', primaryError);
        
        // Fallback to Avalanche's official RPC
        const fallbackUrl = chainId.includes('43114') 
          ? 'https://api.avax.network/ext/bc/C/rpc'
          : 'https://api.avax-test.network/ext/bc/C/rpc';
          
        console.log('Trying fallback RPC:', fallbackUrl);
          
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
        console.log('Fallback RPC response:', fallbackData);
        
        if (fallbackData.error) {
          console.error('Fallback RPC error:', fallbackData.error);
          throw new Error(fallbackData.error.message);
        }

        const fallbackBalance = formatAVAXBalance(fallbackData.result);
        console.log('Fallback formatted balance:', fallbackBalance);
        return fallbackBalance;
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
      // Check if wallet is embedded
      const isEmbedded = wallet.walletClientType === 'privy';

      console.log('Getting wallet info for:', { address, chainId, isEmbedded, walletClientType: wallet.walletClientType });

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
      console.log('Fetching balance for address:', address, 'on chain:', chainId);
      const balance = await fetchBalance(address, chainId);
      console.log('Balance fetched:', balance);
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

  // Auto-refresh wallet info when wallet changes or becomes ready
  useEffect(() => {
    console.log('useAvalancheWallet effect:', { ready, authenticated, walletsCount: wallets.length, wallets });
    
    if (ready && authenticated && wallets.length > 0) {
      console.log('Conditions met, calling getWalletInfo');
      getWalletInfo();
    } else {
      console.log('Conditions not met, clearing wallet info');
      setWalletInfo(null);
    }
  }, [ready, authenticated, wallets, getWalletInfo]);

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
