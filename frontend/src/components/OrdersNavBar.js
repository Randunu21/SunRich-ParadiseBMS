import React, { useState } from "react";
import "../css/ordersNavBar.css"; // Import the CSS file for styles

function Navbar() {
  const [activeLink, setActiveLink] = useState("");

  const handleClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav
      className="navbar"
      style={{ backgroundColor: "green", color: "white" }}
    >
      <a href="#" className="navbar-brand" style={{ color: "white" }}>
        Orders
      </a>
      <div className="navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              href="/customer-order-tracking"
              className={`nav-link ${activeLink === "home" ? "active" : ""}`}
              onClick={() => handleClick("home")}
            >
              Ongoing
            </a>
          </li>
          <li className="nav-item">
            <a
              href="customer-order-history"
              className={`nav-link ${
                activeLink === "features" ? "active" : ""
              }`}
              onClick={() => handleClick("features")}
            >
              Completed
            </a>
          </li>
          <li className="nav-item">
            <a
              href="customer-quotations"
              className={`nav-link ${activeLink === "pricing" ? "active" : ""}`}
              onClick={() => handleClick("pricing")}
            >
              Quotations
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
