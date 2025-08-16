'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { avalanche, avalancheFuji } from 'viem/chains';

export default function PrivyProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        // Set Avalanche as default chain
        defaultChain: avalanche,
        // Support both Avalanche mainnet and testnet
        supportedChains: [avalanche, avalancheFuji],
        
        // Disable automatic wallet creation completely
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'none', // Disable automatic creation
            noPromptOnSignature: true,
          }
        },
        
        // Customize appearance to prioritize Google login
        appearance: {
          theme: 'light',
          landingHeader: 'Welcome to Avalora',
          loginMessage: 'Connect to Avalanche ecosystem with your preferred method',
          showWalletLoginFirst: false, // Show social logins first
          accentColor: '#dc2626', // Red accent to match Avalanche theme
        },
        
        // Prioritize Google login, then wallets, then email
        loginMethods: ['google', 'wallet', 'email'],
        
        // Enable specific wallet connectors
        walletConnectors: {
          metamask: { enabled: true },
          coinbaseWallet: { enabled: true },
          rainbow: { enabled: true },
          walletConnect: { enabled: true },
        },

        // Enhanced wallet creation settings
        defaultWallet: 'privy', // Prefer embedded wallet
        supportedWallets: ['privy', 'metamask', 'coinbase', 'rainbow', 'walletconnect'],
        
        // Auto-redirect after login
        redirectUrl: typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : undefined,
      }}
    >
      {children}
    </PrivyProvider>
  );
}
