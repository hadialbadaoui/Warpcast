import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect } from "react";
import { useAccount, useConnect, useSignMessage } from "wagmi";

function App() {
  useEffect(() => {
    console.log("Calling sdk.actions.ready()");
    
    const callReady = async () => {
      try {
        await sdk.actions.ready();
        console.log("✅ sdk.actions.ready() called successfully");
      } catch (err) {
        console.error("❌ sdk.actions.ready() failed", err);
      }
    };

    callReady();
  }, []);

  console.log("App.tsx is rendering");

  return (
    <>
      <div>
        <h2>Mini App + Vite + TS + React + Wagmi</h2>
      </div>
    </>
  );
}

export default App;