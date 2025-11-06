// src/pages/WelcomeScreen.tsx
import React, { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

interface WelcomeScreenProps {
  onProceed: () => void;
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  padding: "1rem",
  textAlign: "center",
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onProceed }) => {
  useEffect(() => {
    (async () => {
      try {
        await sdk.actions.ready(); // Must call this to hide splash screen. :contentReference[oaicite:3]{index=3}
      } catch (err) {
        console.error("Error calling sdk.actions.ready()", err);
      }
      onProceed();
    })();
  }, [onProceed]);

  return (
    <div style={containerStyle}>
      <h2>Welcome to Challenge Me</h2>
      <p>Loading…</p>
    </div>
  );
};

export default WelcomeScreen;
