// src/pages/CreateChallengeScreen.tsx
import React, { useState } from "react";
import Header from "../components/Header";

const CreateChallengeScreen: React.FC = () => {
  const [opponent, setOpponent] = useState("");
  const [type, setType] = useState("");
  const [target, setTarget] = useState("");
  const [betAmount, setBetAmount] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Issue challenge:", { opponent, type, target, betAmount });
    // TODO: Replace with actual logic
  };

  return (
    <div>
      <Header />
      <main style={{ padding: "1rem" }}>
        <h2>Create a Challenge</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Opponent Address</label>
            <input value={opponent} onChange={e => setOpponent(e.target.value)} />
          </div>
          <div>
            <label>Challenge Type</label>
            <input value={type} onChange={e => setType(e.target.value)} />
          </div>
          <div>
            <label>Target</label>
            <input value={target} onChange={e => setTarget(e.target.value)} />
          </div>
          <div>
            <label>Bet Amount</label>
            <input
              type="number"
              value={betAmount}
              onChange={e => setBetAmount(Number(e.target.value))}
            />
          </div>
          <button type="submit">Issue Challenge</button>
        </form>
      </main>
    </div>
  );
};

export default CreateChallengeScreen;
