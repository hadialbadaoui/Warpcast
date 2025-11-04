// src/pages/ChallengePlayScreen.tsx
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import UserCard from "../components/UserCard";
// import { sdk } from "@farcaster/miniapp-sdk";

interface ChallengePlayScreenProps {
  opponentAddress: string;
  challengeType: string;
  target: number;
  betAmount?: number;
  onComplete: (result: { success: boolean; points: number }) => void;
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
};

const mainStyle: React.CSSProperties = {
  flex: 1,
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const infoSectionStyle: React.CSSProperties = {
  textAlign: "center",
  margin: "1rem 0",
};

const scoreSectionStyle: React.CSSProperties = {
  margin: "1rem 0",
};

const inputStyle: React.CSSProperties = {
  padding: "0.5rem",
  fontSize: "1rem",
  width: "100px",
  textAlign: "center",
};

const submitButtonStyle: React.CSSProperties = {
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const postResultSectionStyle: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
};

const buttonStyle: React.CSSProperties = {
  padding: "0.5rem 1.25rem",
  fontSize: "0.9rem",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const ChallengePlayScreen: React.FC<ChallengePlayScreenProps> = ({
  opponentAddress,
  challengeType,
  target,
  betAmount,
  onComplete
}) => {
  const [score, setScore] = useState<number>(0);
  const [hasFinished, setHasFinished] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (betAmount && betAmount > 0) {
      console.log("Reserve bet placeholder:", betAmount);
      // Optionally call backend or sdk
    }
  }, [betAmount]);

  const handleSubmitResult = async () => {
    try {
      console.log("Submit result placeholder:", { opponentAddress, challengeType, score });
      setHasFinished(true);
      onComplete({ success: true, points: score });
    } catch (err) {
      console.error("Failed to submit result:", err);
      setError("Failed to submit result.");
      onComplete({ success: false, points: 0 });
    }
  };

  return (
    <div style={containerStyle}>
      <Header />
      <main style={mainStyle}>
        <UserCard username={opponentAddress} />
        <section style={infoSectionStyle}>
          <h2>Challenge: {challengeType}</h2>
          <p>Target: {target} pts</p>
          {betAmount && <p>Bet: {betAmount} tokens</p>}
        </section>
        <section style={scoreSectionStyle}>
          <input
            type="number"
            value={score}
            onChange={e => setScore(Number(e.target.value))}
            disabled={hasFinished}
            style={inputStyle}
          />
        </section>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!hasFinished ? (
          <button onClick={handleSubmitResult} style={submitButtonStyle}>
            Submit Result
          </button>
        ) : (
          <div style={postResultSectionStyle}>
            <button onClick={() => console.log("View leaderboard placeholder")} style={buttonStyle}>
              View Leaderboard
            </button>
            <button onClick={() => console.log("Share your win placeholder")} style={buttonStyle}>
              Share Your Win
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ChallengePlayScreen;
