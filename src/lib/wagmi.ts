import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zora,
} from 'wagmi/chains';
import { Config } from 'wagmi';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

export const config: Config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: '66f788605cfc854158ab7b084690b624',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  wallets: [],
  ssr: true,
});

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
