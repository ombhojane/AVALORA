'use client';

import React, { useEffect, useState } from 'react';
import { PrivyProvider, usePrivy } from '@privy-io/react-auth';
import { avalanche, avalancheFuji } from 'viem/chains';
import { useRouter } from 'next/navigation';

function AutoRedirectOnLogin() {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();
  const [didRedirect, setDidRedirect] = useState(false);

  useEffect(() => {
    // Wait until Privy is initialized
    if (!ready) return;

    // When a user becomes authenticated, redirect once
    if (authenticated && !didRedirect) {
      setDidRedirect(true);
      // push to dashboard (Next.js app router)
      router.push('/dashboard');
    }
  }, [ready, authenticated, didRedirect, router]);

  return null; // no UI — purely side-effect
}

export default function PrivyProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      // optional clientId if you're using app clients in Dashboard
      // clientId={process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID}
      config={{
        // Default and supported EVM chains
        defaultChain: avalanche,
        supportedChains: [avalanche, avalancheFuji],

        // Embedded wallet settings
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'off', // 'all-users' | 'users-without-wallets' | 'off'
            // showWalletUIs: false, // uncomment to suppress confirmation modals globally
          },
        },

        // Appearance & ordering of wallets shown in the modal
        appearance: {
          theme: 'light',
          landingHeader: 'Welcome to Avalora',
          loginMessage:
            'Connect to the Avalanche ecosystem with your preferred method',
          showWalletLoginFirst: false,
          accentColor: '#dc2626',
          walletList: [
            'metamask',
            'rainbow',
            'wallet_connect',
            'coinbase_wallet',
          ],
        },

        // Which login methods to show (socials, wallet, email, etc.)
        loginMethods: ['google', 'wallet', 'email'],

        // Per-external-wallet config (example)
        externalWallets: {
          coinbaseWallet: {
            connectionOptions: 'all', // 'all' | 'eoaOnly' | 'smartWalletOnly'
          },
        },

        // other valid config keys can go here...
      }}
    >
      {/* put redirect handler inside provider so usePrivy() is available */}
      <AutoRedirectOnLogin />
      {children}
    </PrivyProvider>
  );
}
