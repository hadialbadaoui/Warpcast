// src/pages/LeaderboardScreen.tsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import UserCard from "../components/UserCard";
import { useAccount } from "wagmi";

interface LeaderboardEntry {
  address: string;
  username?: string;
  avatarUrl?: string;
  rank: number;
  wins: number;
  points: number;
}

const LeaderboardScreen: React.FC = () => {
  const { address } = useAccount();
  const entries: LeaderboardEntry[] = [];
  const userRank: number | null = null;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        console.log("Fetch full leaderboard placeholder");
        console.log("Fetch user rank placeholder for", address);
        // setEntries(...) and setUserRank(...) accordingly
      } catch (err) {
        console.error("Error loading leaderboard:", err);
        setError("Unable to load leaderboard data.");
      }
    })();
  }, [address]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
      <Header />
      <main style={{ flex: 1, padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "600px", margin: "0 auto" }}>
        <h2>Leaderboard</h2>

        {userRank !== null && (
          <p style={{ fontSize: "1.125rem", fontWeight: 600, textAlign: "center", color: "#007bff" }}>
            Your Rank: #{userRank}
          </p>
        )}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <div style={{ marginTop: "1rem", display: "grid", gap: "0.75rem" }}>
          {entries.map(entry => (
            <UserCard
              key={entry.address}
              avatarUrl={entry.avatarUrl}
              username={entry.username || entry.address}
              rank={entry.rank}
              wins={entry.wins}
              points={entry.points}
              onClick={() => console.log("Challenge user placeholder:", entry.address)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default LeaderboardScreen;
