// src/components/UserCard.tsx
import React from "react";

interface UserCardProps {
  avatarUrl?: string;    // URL of the user's avatar image (optional)
  username: string;      // The user's display name (required)
  rank?: number;         // User’s rank in leaderboard (optional)
  wins?: number;         // Number of wins (optional)
  points?: number;       // Number of points (optional)
  onClick?: () => void;  // Optional click handler (e.g., challenge this user)
}

const UserCard: React.FC<UserCardProps> = ({
  avatarUrl,
  username,
  rank,
  wins,
  points,
  onClick
}) => {
  return (
    <div style={cardStyle} onClick={onClick}>
      {avatarUrl && (
        <img src={avatarUrl} alt={`${username} avatar`} style={avatarStyle} />
      )}
      <div style={infoStyle}>
        <div style={headerStyle}>
          <span style={usernameStyle}>{username}</span>
          {rank !== undefined && <span style={rankStyle}>#{rank}</span>}
        </div>

        <div style={statsStyle}>
          {wins !== undefined && <span style={statItemStyle}>{wins} wins</span>}
          {points !== undefined && <span style={statItemStyle}>{points} pts</span>}
        </div>
      </div>
    </div>
  );
};

export default UserCard;

// Inline styles (you can replace with CSS modules or styled-components)
const cardStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  padding: "0.75rem 1rem",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  marginBottom: "0.5rem",
  cursor: "pointer",
  transition: "background 0.2s",
};

const avatarStyle: React.CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  marginRight: "0.75rem",
  objectFit: "cover",
};

const infoStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  marginBottom: "0.25rem",
};

const usernameStyle: React.CSSProperties = {
  fontSize: "1rem",
  fontWeight: 600,
  marginRight: "0.5rem",
};

const rankStyle: React.CSSProperties = {
  fontSize: "0.875rem",
  color: "#555",
};

const statsStyle: React.CSSProperties = {
  display: "flex",
  gap: "0.75rem",
  fontSize: "0.875rem",
  color: "#777",
};

const statItemStyle: React.CSSProperties = {
  marginRight: "0.75rem",
};
