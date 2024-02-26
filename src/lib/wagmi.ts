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
  projectId: 'tilt',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
