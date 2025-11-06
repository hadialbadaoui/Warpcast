// src/components/Header.tsx
import React, { useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

const Header: React.FC = () => {
  const [user, setUser] = useState<{ pfpUrl?: string; username?: string } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const context = await sdk.context; // sdk.context is a Promise<MiniAppContext> per docs :contentReference[oaicite:1]{index=1}
        setUser(context.user);
      } catch (err) {
        console.error("Failed to load mini app context:", err);
      }
    })();
  }, []);

  // Define styles here
  const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#111",
    color: "#fff",
  };
  const avatarStyle: React.CSSProperties = {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
  };
  const connectButtonStyle: React.CSSProperties = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <header style={headerStyle}>
      <h1>Challenge Me</h1>
      {user?.pfpUrl ? (
        <img src={user.pfpUrl} alt="User avatar" style={avatarStyle} />
      ) : (
        <button style={connectButtonStyle} onClick={() => {
          console.log("Connect wallet placeholder");
          // Replace with correct wallet connect logic as per your setup
        }}>
          Connect Wallet
        </button>
      )}
    </header>
  );
};

export default Header;
