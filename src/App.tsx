import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

function App() {
  useEffect(() => {
    (async () => {
      try {
        await sdk.actions.ready();
        console.log("✅ sdk.actions.ready() called");
      } catch (err) {
        console.error("❌ Error calling sdk.actions.ready()", err);
      }
    })();
  }, []);

  return (
    <div>
      <h2>App is ready inside Farcaster Mini App!</h2>
    </div>
  );
}

export default App;