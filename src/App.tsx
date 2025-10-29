import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        // 1) If needed, detect if we are inside a Mini App environment
        const isMini = await sdk.isInMiniApp();
        console.log("isInMiniApp:", isMini);

        // 2) Initialize SDK (if required)
        await sdk.init();
        console.log("✅ SDK initialized");

        // 3) Call ready() to hide splash screen
        await sdk.actions.ready();
        console.log("✅ sdk.actions.ready() called");

        setLoading(false);
      } catch (err) {
        console.error("❌ Initialization or ready() failed", err);
        setError(err as Error);
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) return <p>Loading mini-app …</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>App is ready inside Farcaster Mini App!</h2>
      <p>Your environment is ready.</p>
    </div>
  );
}

export default App;