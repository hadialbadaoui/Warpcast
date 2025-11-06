// Import React and hooks
import React, { useState, useEffect } from "react";
// Import SDK from Farcaster Mini-App
import { sdk } from "@farcaster/miniapp-sdk";
// Import your pages
import WelcomeScreen from "./pages/WelcomeScreen";
import HomeScreen from "./pages/HomeScreen";
// Import your custom hook for NFT check
import useNFTCheck from "./hooks/useNFTCheck";

function App() {
  // State: whether user owns the required NFT
  const [hasNFT, setHasNFT] = useState<boolean | null>(null);

  // Custom hook to check NFT ownership
  const checkNFT = useNFTCheck();

  useEffect(() => {
    // Immediately run SDK ready when the app mounts so the splash screen hides.
    async function initSDK() {
      try {
        await sdk.actions.ready();
        console.log("✅ sdk.actions.ready() success");
      } catch (err) {
        console.error("❌ Error calling sdk.actions.ready()", err);
      }
    }
    initSDK();
  }, []);

  useEffect(() => {
    // After SDK ready, check for NFT ownership
    async function check() {
      try {
        console.log("checking NFT");
        const owns = await checkNFT();
        setHasNFT(owns);
      } catch (err) {
        console.error("Error checking NFT", err);
        setHasNFT(false);
      }
    }
    check();
  }, [checkNFT]);

  // While we don't know yet, show a loading screen
  if (hasNFT === null) {
    return <div>Loading…</div>;
  }

  // If user has NFT → go to HomeScreen
  if (hasNFT) {
    return <HomeScreen />;
  }

  // Otherwise: show WelcomeScreen
  return <WelcomeScreen />;
}

export default App;