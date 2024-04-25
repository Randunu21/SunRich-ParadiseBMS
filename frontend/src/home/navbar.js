import React from "react";
import logo from "../img/logo.png";
import cart from "../img/cart_icon.png";

export default function navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg  container">
        <a class="navbar-brand" href="#">
          <img src={logo} className="img-fluid w-25" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/aboutus">
                About Us
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <img src={cart} className="img-fluid w-75" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
