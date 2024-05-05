import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../Asset/logo.png";
import cart_icon from "../Asset/cart_icon.png";

const Navbar = () => {
  const [menu, setMenu] = useState("home");

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
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};

export default Navbar;
