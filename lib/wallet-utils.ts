import { avalanche, avalancheFuji } from 'viem/chains';

export interface NetworkInfo {
  id: number;
  name: string;
  rpcUrl: string;
  explorerUrl: string;
  isTestnet: boolean;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export const AVALANCHE_NETWORKS: Record<string, NetworkInfo> = {
  mainnet: {
    id: avalanche.id,
    name: 'Avalanche Mainnet',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    explorerUrl: 'https://snowtrace.io',
    isTestnet: false,
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
  },
  fuji: {
    id: avalancheFuji.id,
    name: 'Avalanche Fuji Testnet',
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    explorerUrl: 'https://testnet.snowtrace.io',
    isTestnet: true,
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
  },
};

export const getNetworkInfo = (chainId: string): NetworkInfo | null => {
  const chainIdNumber = parseInt(chainId.replace('eip155:', ''));
  
  if (chainIdNumber === avalanche.id) {
    return AVALANCHE_NETWORKS.mainnet;
  } else if (chainIdNumber === avalancheFuji.id) {
    return AVALANCHE_NETWORKS.fuji;
  }
  
  return null;
};

export const formatBalance = (balanceWei: string, decimals: number = 18): string => {
  try {
    const balance = BigInt(balanceWei);
    const divisor = BigInt(10 ** decimals);
    const wholePart = balance / divisor;
    const fractionalPart = balance % divisor;
    
    if (fractionalPart === BigInt(0)) {
      return wholePart.toString();
    }
    
    // Format fractional part with proper decimal places
    const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
    const trimmedFractional = fractionalStr.replace(/0+$/, ''); // Remove trailing zeros
    
    return `${wholePart}.${trimmedFractional}`;
  } catch (error) {
    console.error('Error formatting balance:', error);
    return '0';
  }
};

export const formatAVAXBalance = (balanceWei: string): string => {
  const balance = formatBalance(balanceWei, 18);
  const numBalance = parseFloat(balance);
  
  if (numBalance === 0) return '0.0000';
  if (numBalance < 0.0001) return '< 0.0001';
  if (numBalance < 1) return numBalance.toFixed(4);
  if (numBalance < 1000) return numBalance.toFixed(2);
  
  return numBalance.toLocaleString('en-US', { maximumFractionDigits: 2 });
};

export const shortenAddress = (address: string, chars: number = 6): string => {
  if (!address) return '';
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const getFaucetUrl = (network: 'mainnet' | 'fuji'): string => {
  if (network === 'fuji') {
    return 'https://faucet.avax.network/';
  }
  return 'https://docs.avax.network/quickstart/fund-a-fuji-testnet-address';
};

export const getExplorerUrl = (address: string, network: 'mainnet' | 'fuji'): string => {
  const baseUrl = network === 'mainnet' 
    ? 'https://snowtrace.io/address/'
    : 'https://testnet.snowtrace.io/address/';
  return `${baseUrl}${address}`;
};
