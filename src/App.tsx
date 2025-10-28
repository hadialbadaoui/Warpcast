import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect } from "react";
import { useAccount, useConnect, useSignMessage } from "wagmi";

function App() {
  useEffect(() => {
	if (typeof window !== "undefined") {
      sdk.actions.ready();
      console.log("SDK Ready called");
    }
  }, []);

  return (
    <>
      <div>
		<h2>Mini App + Vite + TS + React + Wagmi</h2>
        <ConnectMenu />
      </div>
    </>
  );
}

function ConnectMenu() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

  if (isConnected) {
    return (
      <>
        <div>Connected account:</div>
        <div>{address}</div>
        <SignButton />
      </>
    );
  }

  return (
    <button type="button" onClick={() => connect({ connector: connectors[0] })}>
      Connect
    </button>
  );
}

function SignButton() {
  const { signMessage, isPending, data, error } = useSignMessage();

  return (
    <>
      <button type="button" onClick={() => signMessage({ message: "hello world" })} disabled={isPending}>
        {isPending ? "Signing..." : "Sign message"}
      </button>
      {data && (
        <>
          <div>Signature</div>
          <div>{data}</div>
        </>
      )}
      {error && (
        <>
          <div>Error</div>
          <div>{error.message}</div>
        </>
      )}
    </>
  );
}

export default App;
