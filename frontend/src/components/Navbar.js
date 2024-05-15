import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../images/logo.png";

const NavBar = () => {


    return (
        <nav
            className="navbar navbar-expand-lg navbar-light"
            style={{
                backgroundColor: "#60c294",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "55px",
                zIndex: 1000,
            }}
        >
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/employee-admin-dashboard">
                                <i class="bi bi-house-fill"></i>
                                <span style={{ marginLeft: "5px", color: "white" }}>Return to Dashboard</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="d-flex justify-content-between align-items-center flex-grow-1">
                    <div className="d-flex align-items-center" style={{ marginRight: '150px' }}>
                        <img src={logoImage} alt="Logo" style={{ height: "113px", marginTop: "10px" }} />
                        <span className="navbar-brand" style={{ fontWeight: "bold" }} >SunRich Paradise Private Ltd</span>
                    </div>
                    <span style={{ fontSize: "1.2rem", color: "white" }}>Employee Management</span>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;