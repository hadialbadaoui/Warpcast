import React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Joker4Fun</div>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Challenges</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  );
};