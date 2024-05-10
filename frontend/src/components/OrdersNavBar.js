import React, { useState } from "react";
import "../css/ordersNavBar.css"; // Import the CSS file for styles

function OrdersNavbar() {
  const [activeLink, setActiveLink] = useState("");

  const handleClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="navbar">
      <a href="#" className="navbar-brand" style={{ color: "white" }}>
        Orders
      </a>
      <div className="navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              href="/orders/customer-order-tracking"
              className={`nav-link ${activeLink === "home" ? "active" : ""}`}
              onClick={() => handleClick("home")}
            >
              Ongoing
            </a>
          </li>
          <li className="nav-item">
            <a
              href="/orders/customer-order-history"
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
              href="/orders/customer-quotations"
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

export default OrdersNavbar;
