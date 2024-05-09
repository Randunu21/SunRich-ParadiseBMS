import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="navbar">
      <Link
        to="/"
        onClick={() => {
          setMenu("shop");
        }}
        className="nav-logo"
      >
        <img src={logo} alt="" />
        <p>Sun Rich Paradise</p>
      </Link>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("home");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Home
          </Link>
          {menu === "home" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("coconutrelated");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/coconutrelated">
            Coconut Related
          </Link>
          {menu === "coconutrelated" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("spices");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/spices">
            Spices
          </Link>
          {menu === "spices" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("orders");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/orders">
            Orders
          </Link>
          {menu === "orders" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("aboutus");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/aboutus">
            About Us
          </Link>
          {menu === "aboutus" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("contactus");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/contactus">
            Contact Us
          </Link>
          {menu === "contactus" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {isLoggedIn ? (
          <Link to="user/profile">
            <i
              class="bi bi-person"
              style={{ fontSize: "50px", color: "black" }}
            ></i>
          </Link>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}

        <Link to="/cart">
          <i
            class="bi bi-cart"
            style={{ fontSize: "50px", color: "black" }}
          ></i>
        </Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};

export default Navbar;
