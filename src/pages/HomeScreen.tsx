// src/pages/HomeScreen.tsx
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

const HomeScreen: React.FC = () => {
  const { address } = useAccount();
  const yourWins = 0;
  const top3: LeaderboardEntry[] = [];
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // Replace with your backend or SDK logic
        console.log("Fetch user summary placeholder for", address);
        console.log("Fetch top 3 leaderboard placeholder");
        // setYourWins(...) and setTop3(...) accordingly
      } catch (err) {
        console.error("Error loading home screen data:", err);
        setError("Failed to load data. Please retry.");
      }
    })();
  }, [address]);

  const handleSeeAll = () => {
    console.log("Navigate to Leaderboard screen placeholder");
  };

  const handleCreateChallenge = () => {
    console.log("Navigate to CreateChallengeScreen placeholder");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
      <Header />
      <main style={{ flex: 1, padding: "1rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <section style={{ textAlign: "center" }}>
          <h2>Your Wins</h2>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0.5rem 0", color: "#007bff" }}>
            {yourWins}
          </p>
        </section>

        <section style={{ flex: 1 }}>
          <h3>Current Leaderboard (Top 3)</h3>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {top3.map(entry => (
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
          <button onClick={handleSeeAll} style={{ marginTop: "1rem", padding: "0.5rem 1rem", fontSize: "1rem", cursor: "pointer" }}>
            See All
          </button>
        </section>

        <section style={{ textAlign: "center", marginTop: "auto" }}>
          <button onClick={handleCreateChallenge} style={{ fontSize: "1.2rem", padding: "0.75rem 1.5rem", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Create Challenge
          </button>
        </section>
      </main>
    </div>
  );
};

export default HomeScreen;
