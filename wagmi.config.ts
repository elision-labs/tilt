import { Config } from 'wagmi';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum, base, mainnet, optimism, polygon, sepolia, zora } from 'wagmi/chains';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

const { wallets } = getDefaultWallets()

export const config: Config = getDefaultConfig({
  appName: 'RainbowKit App',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
  ssr: true,
  wallets: [...wallets]
});
