import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

function App() {
  useEffect(() => {
    const initialize = async () => {
      try {
        await sdk.actions.ready();
        console.log("✅ Farcaster Mini App ready()");
      } catch (error) {
        console.error("❌ Farcaster SDK ready() error", error);
      }
    };
    initialize();
  }, []);

  return (
    <div>
      <h2>Your Mini App Content</h2>
      {/* Add your UI: menu, home screen, challenge screen etc */}
    </div>
  );
}

export default App;
