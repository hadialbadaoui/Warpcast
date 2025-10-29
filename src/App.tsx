import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isConnected } = useAccount();  // Check if the user is connected

  useEffect(() => {
    if (isConnected) {
      const initializeSdk = async () => {
        try {
          // Initialize the SDK first
          await sdk.init();
          console.log("✅ SDK initialized");

          // Now that the SDK is initialized, call ready
          await sdk.actions.ready();
          console.log("✅ sdk.actions.ready() called successfully");

          setLoading(false); // Indicate loading is complete
        } catch (err) {
          console.error("❌ SDK initialization or ready() failed", err);
          setError(err);
          setLoading(false); // Even if there's an error, stop loading
        }
      };

      initializeSdk();
    } else {
      console.log("❌ User is not connected, waiting for connection...");
    }
  }, [isConnected]); // Dependency on the user's connection state

  return (
    <div>
      <h2>Mini App + Vite + TS + React + Wagmi</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default App;
