import React from "react";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-icon">💗</span>
          <span className="logo-text">Ammi's Voice</span>
        </div>

        <div className="navbar-menu">
          <a href="#home" className="menu-item active">
            Home
          </a>
          <a href="#about" className="menu-item">
            About
          </a>
          <a href="#resources" className="menu-item">
            Resources
          </a>
          <a href="#contact" className="menu-item">
            Contact
          </a>
        </div>

        <div className="navbar-actions">
          <button className="action-button secondary">Sign Up</button>
          <button className="action-button primary">Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
