'use client';

import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useCallback, useState, useEffect } from 'react';
import { avalanche, avalancheFuji } from 'viem/chains';

export interface UserAuthState {
  isAuthenticated: boolean;
  isWalletCreating: boolean;
  hasAvalancheWallet: boolean;
  walletCreationStep: 'checking' | 'creating' | 'created' | 'failed' | 'external';
  userPreferredLogin: string | null;
  embeddedWalletAddress: string | null;
  externalWalletAddress: string | null;
}

export const useEnhancedAuth = () => {
  const { ready, authenticated, user, createWallet, linkWallet } = usePrivy();
  const { wallets } = useWallets();
  
  const [authState, setAuthState] = useState<UserAuthState>({
    isAuthenticated: false,
    isWalletCreating: false,
    hasAvalancheWallet: false,
    walletCreationStep: 'checking',
    userPreferredLogin: null,
    embeddedWalletAddress: null,
    externalWalletAddress: null,
  });

  // Determine user's preferred login method
  const getUserPreferredLogin = useCallback(() => {
    if (!user?.linkedAccounts || user.linkedAccounts.length === 0) return null;
    
    // Prioritize OAuth methods
    const oauthAccount = user.linkedAccounts.find(account => 
      account.type?.includes('oauth')
    );
    
    if (oauthAccount) {
      return oauthAccount.type?.replace('_oauth', '');
    }
    
    // Fallback to first available method
    return user.linkedAccounts[0]?.type || null;
  }, [user]);

  // Check if user has an Avalanche wallet
  const checkAvalancheWallet = useCallback(() => {
    console.log('Checking for Avalanche wallet...');
    console.log('Available wallets:', wallets);
    
    if (wallets.length === 0) {
      console.log('No wallets found');
      return false;
    }
    
    // Find the FIRST Avalanche wallet
    const avalancheWallet = wallets.find(wallet => {
      const chainId = wallet.chainId;
      console.log('Checking wallet:', wallet.address, 'chainId:', chainId);
      const isAvalanche = chainId === `eip155:${avalanche.id}` || chainId === `eip155:${avalancheFuji.id}`;
      console.log('Is Avalanche wallet:', isAvalanche);
      return isAvalanche;
    });
    
    const hasWallet = !!avalancheWallet;
    console.log('Has Avalanche wallet:', hasWallet);
    
    if (hasWallet && avalancheWallet) {
      setAuthState(prev => ({
        ...prev,
        embeddedWalletAddress: avalancheWallet.address,
      }));
    }
    
    return hasWallet;
  }, [wallets]);

  // Create embedded wallet for user
  const createEmbeddedWallet = useCallback(async () => {
    if (!ready || !authenticated) {
      throw new Error('User not authenticated');
    }

    setAuthState(prev => ({ ...prev, isWalletCreating: true, walletCreationStep: 'creating' }));

    try {
      console.log('Creating embedded wallet for off-chain user...');
      const wallet = await createWallet();
      
      if (wallet) {
        console.log('Embedded wallet created successfully:', wallet.address);
        setAuthState(prev => ({
          ...prev,
          isWalletCreating: false,
          walletCreationStep: 'created',
          embeddedWalletAddress: wallet.address,
          hasAvalancheWallet: true,
        }));
        return wallet;
      } else {
        throw new Error('Failed to create wallet');
      }
    } catch (error) {
      console.error('Wallet creation failed:', error);
      setAuthState(prev => ({
        ...prev,
        isWalletCreating: false,
        walletCreationStep: 'failed',
      }));
      throw error;
    }
  }, [ready, authenticated, createWallet]);

  // Link external wallet
  const linkExternalWallet = useCallback(async (walletAddress: string) => {
    if (!ready || !authenticated) {
      throw new Error('User not authenticated');
    }

    try {
      setAuthState(prev => ({
        ...prev,
        externalWalletAddress: walletAddress,
        hasAvalancheWallet: true,
      }));
    } catch (error) {
      console.error('Wallet linking failed:', error);
      throw error;
    }
  }, [ready, authenticated]);

  // Auto-create wallet if user doesn't have one
  const ensureWalletExists = useCallback(async () => {
    if (!ready || !authenticated) return;

    console.log('Ensuring wallet exists...');
    console.log('Current wallets:', wallets);
    console.log('User login method:', getUserPreferredLogin());

    // Only create wallets for off-chain login methods
    const loginMethod = getUserPreferredLogin();
    const isOffChainLogin = loginMethod && ['google', 'github', 'email', 'phone'].includes(loginMethod);
    
    if (!isOffChainLogin) {
      console.log('User connected with wallet directly, skipping wallet creation');
      return;
    }

    console.log('User has off-chain login, checking if wallet needed...');

    // Wait a bit for Privy to fully load existing wallets
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check for ANY existing wallets first
    if (wallets.length > 0) {
      console.log(`Found ${wallets.length} existing wallets, checking for Avalanche compatibility...`);
      
      const hasAvalancheWallet = checkAvalancheWallet();
      
      if (hasAvalancheWallet) {
        console.log('User already has Avalanche wallet, using existing wallet');
        setAuthState(prev => ({
          ...prev,
          hasAvalancheWallet: true,
          walletCreationStep: 'created',
        }));
        return;
      } else {
        console.log('User has wallets but none are on Avalanche, checking if we can switch them');
        
        const externalWallet = wallets.find(wallet => wallet.walletClientType !== 'privy');
        
        if (externalWallet) {
          console.log('External wallet detected, setting to external state');
          setAuthState(prev => ({
            ...prev,
            walletCreationStep: 'external',
            externalWalletAddress: externalWallet.address,
            hasAvalancheWallet: false,
          }));
          return;
        }
        
        console.log('User has embedded wallets but none are on Avalanche, will create new one');
      }
    } else {
      console.log('No existing wallets found');
    }

    // Only create new wallet if user truly has none or none are compatible
    console.log('Proceeding with wallet creation for off-chain user...');
    try {
      await createEmbeddedWallet();
    } catch (error) {
      console.error('Auto wallet creation failed:', error);
    }
  }, [ready, authenticated, wallets, checkAvalancheWallet, createEmbeddedWallet, getUserPreferredLogin]);

  // Update auth state when dependencies change
  useEffect(() => {
    if (!ready) return;

    const preferredLogin = getUserPreferredLogin();
    const hasWallet = checkAvalancheWallet();

    setAuthState(prev => ({
      ...prev,
      isAuthenticated: authenticated,
      userPreferredLogin: preferredLogin,
      hasAvalancheWallet: hasWallet,
      walletCreationStep: hasWallet ? 'created' : 'checking',
    }));
  }, [ready, authenticated, user, wallets, getUserPreferredLogin, checkAvalancheWallet]);

  // Immediate wallet detection when wallets change
  useEffect(() => {
    if (ready && authenticated && wallets.length > 0) {
      const loginMethod = getUserPreferredLogin();
      const isOffChainLogin = loginMethod && ['google', 'github', 'email', 'phone'].includes(loginMethod);
      
      if (isOffChainLogin) {
        console.log('Wallets changed for off-chain user, checking for Avalanche compatibility...');
        const hasWallet = checkAvalancheWallet();
        
        if (hasWallet) {
          console.log('Avalanche wallet detected immediately, updating state');
          setAuthState(prev => ({
            ...prev,
            hasAvalancheWallet: true,
            walletCreationStep: 'created',
          }));
        }
      } else {
        console.log('Direct wallet connection, skipping immediate wallet detection');
      }
    }
  }, [wallets, ready, authenticated, checkAvalancheWallet, getUserPreferredLogin]);

  // Auto-ensure wallet exists when user authenticates
  useEffect(() => {
    if (ready && authenticated) {
      const timer = setTimeout(() => {
        ensureWalletExists();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [ready, authenticated, ensureWalletExists]);

  // Get wallet creation status
  const getWalletCreationStatus = useCallback(() => {
    if (wallets.length === 0) return 'no-wallet';
    if (checkAvalancheWallet()) return 'avalanche-ready';
    return 'needs-switch';
  }, [wallets.length, checkAvalancheWallet]);

  return {
    ...authState,
    ready,
    user,
    wallets,
    createEmbeddedWallet,
    linkExternalWallet,
    ensureWalletExists,
    checkAvalancheWallet,
  };
};
