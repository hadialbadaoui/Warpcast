/// <reference types="vite/client" />

// Extend the built-in Vite ImportMetaEnv type to include your custom VITE_ environment variables.
interface ImportMetaEnv {
  readonly VITE_RPC_PROVIDER_URL: string;
  readonly VITE_NFT_CONTRACT_ADDRESS: string;
  readonly VITE_NFT_TOKEN_ID: string;
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_BET_FEE_PERCENT: string;
  // Add other VITE_ variables you introduce below, e.g.:
  // readonly VITE_SOME_OTHER_KEY: string;
}

// Tell TypeScript that import.meta.env is of type ImportMetaEnv
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
