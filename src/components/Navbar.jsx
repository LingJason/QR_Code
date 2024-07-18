import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-name">QRify</span>
        <img
          src="https://www.svgrepo.com/show/308831/qr-code-scanner-phone-qr-code-smartphone.svg"
          alt="logo"
          className="navbar-logo"
        />
      </div>
    </nav>
  );
}
