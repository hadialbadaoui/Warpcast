// src/types/index.ts

// User summary type returned by your backend or SDK
export interface UserSummary {
  address: string;       // User's wallet address
  username?: string;     // Optional display name
  avatarUrl?: string;    // Optional avatar image URL
  wins: number;          // Number of wins the user has
  points: number;        // Points earned by the user
  rank?: number;         // Optional leaderboard rank
}

// Leaderboard entry type
export interface LeaderboardEntry {
  address: string;
  username?: string;
  avatarUrl?: string;
  wins: number;
  points: number;
  rank: number;
}

// Challenge payload for creating a new challenge
export interface ChallengeCreatePayload {
  issuer: string;
  opponent: string;
  type: string;
  target: number;
  bet?: number;
}

// Challenge result submission payload
export interface ChallengeResultPayload {
  challengeId: string;
  score: number;
  success: boolean;
}

// Generic API error type
export interface ApiError {
  message: string;
  code?: number;
}
