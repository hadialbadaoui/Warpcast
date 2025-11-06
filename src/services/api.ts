// src/services/api.ts

// Define your base API URL (adjust to your backend or serverless endpoint)
const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL + "/api";

// A generic error type
interface ApiError {
  message: string;
  code?: number;
}

// Wrap fetching logic
async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message = errorData?.message || response.statusText;
    const error: ApiError = { message, code: response.status };
    throw error;
  }

  const data: T = await response.json();
  return data;
}

// Example API endpoints — adapt to your domain
export const api = {
  // Get user summary: wins, points, rank
  getUserSummary: async (userAddress: string) => {
    return request<{ wins: number; points: number; rank: number }>(
      `/users/${encodeURIComponent(userAddress)}/summary`
    );
  },

  // Get leaderboard (top N)
  getLeaderboard: async (top: number = 10) => {
    return request<Array<{ address: string; username?: string; avatarUrl?: string; wins: number; points: number; rank: number }>>(
      `/leaderboard?top=${top}`
    );
  },

  // Issue a challenge
  issueChallenge: async (payload: {
    issuer: string;
    opponent: string;
    type: string;
    target: number;
    bet?: number;
  }) => {
    return request<{ challengeId: string }>(
      `/challenges`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  },

  // Submit challenge result
  submitResult: async (payload: {
    challengeId: string;
    score: number;
  }) => {
    return request<{ success: boolean }>(
      `/challenges/${encodeURIComponent(payload.challengeId)}/result`,
      {
        method: "POST",
        body: JSON.stringify({ score: payload.score }),
      }
    );
  },
};

export type {
  ApiError
};
