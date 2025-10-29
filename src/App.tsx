import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect } from "react";
import { useAccount, useConnect, useSignMessage } from "wagmi";

function App() {
  useEffect(() => {
	console.log("Calling sdk.actions.ready()");
    await sdk.actions.ready();
  }, []);

	console.log("App.tsx is rendering"); // <--- add this at top level
	
  return (
    <>
      <div>
		<h2>Mini App + Vite + TS + React + Wagmi</h2>
      </div>
    </>
  );
}

export default App;
