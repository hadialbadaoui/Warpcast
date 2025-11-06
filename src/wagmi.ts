// src/wagmi.ts
import { http, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [mainnet],
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http(),
  },
  ssr: true, // optional if using SSR
});
