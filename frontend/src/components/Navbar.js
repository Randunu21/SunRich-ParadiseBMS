import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/employee-admin-dashboard">
                  <i class="bi bi-house-fill"></i>
                  <span style={{ marginLeft: "5px" }}>Return to Dashboard</span>
                </a>
              </li>
            </ul>
          </div>
          <span className="navbar-brand mx-4">Employee Management</span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
