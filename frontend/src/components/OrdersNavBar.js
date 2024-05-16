import React from "react";
import { NavLink } from "react-router-dom";
import "../css/ordersNavBar.css"; // Import the CSS file for styles

function OrdersNavbar() {
  return (
    <nav className="navbar">
      <NavLink
        to="/orders/customer-order-tracking"
        className="navbar-brand"
        style={{ color: "white" }}
      >
        Orders
      </NavLink>
      <div className="navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              to="/orders/customer-order-tracking"
              className="nav-link"
              activeClassName="active"
            >
              Ongoing
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/orders/customer-order-history"
              className="nav-link"
              activeClassName="active"
            >
              Completed
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/orders/customer-quotations"
              className="nav-link"
              activeClassName="active"
            >
              Quotations
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default OrdersNavbar;
